// import { AuthGuard } from "../../common/components/auth-guard";
import { Col, Row } from "antd";
import "./styles.scss";
import VoiceInput from "../../common/components/voice-input";

export const videoCallRouter = {
  path: "video-call",
  element: (
      <VideoCall></VideoCall>
  ),
};

function VideoCall() {

  

  return (
    <div className="video_call_page">
      <Row className="video_row">
        <Col span={24}>
        <VoiceInput></VoiceInput>
        </Col>
      </Row>
    </div>
  );
}
