// import { AuthGuard } from "../../common/components/auth-guard";
import { Alert, Button, Col, ConfigProvider, Flex, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { mediaPipe } from "../../common/utils/media-pipe";
import { deafCareAPI } from "../../services/deafcare-api";
import { VideoCameraOutlined } from "@ant-design/icons";
import "./styles.scss";
import { videoTransList } from "../../common/constants/videos-trans";

let videoIndex = 0;

export const videoTranslateRouter = {
  path: "video-call",
  element: (
    // <AuthGuard>
      <VideoCall></VideoCall>
    // </AuthGuard>
  ),
};

function VideoCall() {
  let videoEl = useRef<HTMLVideoElement>(null);
  // let canvasEl = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [message, setMessage] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const connectCamera = async () => {
    if (videoEl.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoEl.current.srcObject = stream;
    }
  };

  useEffect(() => {
    if (videoEl.current) {
      mediaPipe.requestVideoFrameBinding(videoEl.current);
      videoEl.current.addEventListener("ended", async () => {
        const result = JSON.parse(JSON.stringify(mediaPipe.bodyRequest));
        // console.log(videoTransList[videoIndex]);
        console.log(result);
        const textRes = await deafCareAPI.signLanguage(result);
        console.log(videoTransList[videoIndex], textRes[0]);
        mediaPipe.resetData();
        videoIndex++;
        if (!videoTransList[videoIndex]) {
          videoIndex = 0;
          return;
        }

        await btnHandler();
      });

      connectCamera();
    }
  }, []);

  const btnHandler = async () => {
    setVisible(true);
    setIsLoadingMedia(true);
    // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoEl.current) {
      videoEl.current.srcObject = null;
      videoEl.current.src = `/videos/test/${videoTransList[videoIndex]}.MOV`;
      await videoEl.current.play();
      setIsLoadingMedia(false);
    }
  };

  const startCapture = () => {
    setVisible(false);
    setIsCapturing(true);
    mediaPipe.resetData();
  };

  const stopCapture = async () => {
    setIsCapturing(false);
    const result = JSON.parse(JSON.stringify(mediaPipe.bodyRequest));
    const textRes = await deafCareAPI.signLanguage(result);
    console.log(textRes[0]);
    setMessage(textRes[0].Class);
    setVisible(true);
  };

  return (
    <div className="video_translate_page">
      <Row className="alert_row">
        <Col span={24}>
          <Flex justify="center">
            {visible && (
              <Alert
                message={message}
                type="success"
                closable
                afterClose={handleClose}
              />
            )}
          </Flex>
        </Col>
      </Row>
      <Row className="video_row">
        <Col span={24}>
          <Flex justify="center">
            <video ref={videoEl} width={1280} height={720} controls></video>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Flex justify="center">
            <ConfigProvider wave={{ disabled: true }}>
              <Button
                shape="round"
                size="large"
                icon={<VideoCameraOutlined />}
                loading={isLoadingMedia}
                onClick={btnHandler}
              >
                Start
              </Button>
              {isCapturing ? (
                <Button
                  color="danger"
                  variant="solid"
                  shape="round"
                  size="large"
                  icon={<VideoCameraOutlined />}
                  onClick={stopCapture}
                >
                  End Capture
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="solid"
                  shape="round"
                  size="large"
                  icon={<VideoCameraOutlined />}
                  onClick={startCapture}
                >
                  Capture
                </Button>
              )}
            </ConfigProvider>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
