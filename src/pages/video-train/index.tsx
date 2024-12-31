"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { Alert, Button, Col, ConfigProvider, Flex, Row } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import { mediaPipe } from "../../common/utils/media-pipe";
import { saveJsonFile } from "../../common/utils/functions";
import { videoTrainList } from "../../common/constants/videos-train";

export const videoTrainRouter = {
  path: "video-train",
  element: <VideoTrain></VideoTrain>,
};

let videoIndex = 0;

export default function VideoTrain() {
  let videoEl = useRef<HTMLVideoElement>(null);
  // let canvasEl = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const btnHandler = async () => {
    setVisible(true);
    setIsLoadingMedia(true);
    // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoEl.current) {
      videoEl.current.src = `/videos/train/20-12/all/${videoTrainList[videoIndex]}.MOV`;
      await videoEl.current.play();
      setIsLoadingMedia(false);
    }
  };

  useEffect(() => {
    if (videoEl.current) {
      mediaPipe.requestVideoFrameBinding(videoEl.current);
      videoEl.current.addEventListener("ended", async () => {
        saveJsonFile(mediaPipe.captureParquet, videoTrainList[videoIndex]);
        mediaPipe.resetData();
        videoIndex++;
        if (!videoTrainList[videoIndex]) {
          videoIndex = 0;
          return;
        }
        await btnHandler();
      });
    }
  }, []);

  

  return (
    <div className={styles.video_train_page}>
      <Row>
        <Col span={24}>
          <Flex justify="center">
            {visible && (
              <Alert
                message="Alert Message Text"
                type="success"
                closable
                afterClose={handleClose}
              />
            )}
          </Flex>
        </Col>
      </Row>
      <Row className={styles.video_row}>
        <Col span={24}>
          <Flex justify="center">
            <video ref={videoEl} width={1280} height={720}></video>
            {/* <canvas ref={canvasEl} width={640} height={480}></canvas> */}
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Flex justify="center">
            <ConfigProvider wave={{ disabled: true }}>
              <Button
                type="primary"
                shape="round"
                size="large"
                icon={<VideoCameraOutlined />}
                loading={isLoadingMedia}
                onClick={btnHandler}
              >
                Start
              </Button>
              <a id="downloadAnchorElem">Save</a>
            </ConfigProvider>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
