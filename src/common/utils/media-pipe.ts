import { Holistic, Results } from "@mediapipe/holistic";

type ILandmarksValue = number | null;

interface ILandmarks {
  x: ILandmarksValue;
  y: ILandmarksValue;
  z: ILandmarksValue;
}

interface ILandmarksRequest {
  x: ILandmarksValue[];
  y: ILandmarksValue[];
  z: ILandmarksValue[];
}

export interface ILandmarksBodyRequest {
  data: ILandmarksRequest[];
}

interface IParquestInput {
  landmarks_data_list: any[];
}

class MediaPipeUtil {
  public bodyRequest: ILandmarksBodyRequest = {
    data: [{ x: [], y: [], z: [] }],
  };
  public captureParquet: IParquestInput = { landmarks_data_list: [] };
  private holistic: Holistic;
  public isInitialized: boolean = false;

  constructor() {
    this.resetData();
    this.holistic = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    this.holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        refineFaceLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
    this.holistic.onResults(this.frameHandler.bind(this));
  }

  resetData() {
    this.bodyRequest = { data: [{ x: [], y: [], z: [] }] };
    this.captureParquet = { landmarks_data_list: [] };
  }

  addResults(bodyRequest: ILandmarksBodyRequest, result: ILandmarks[] = []) {
    // console.log(result);
    bodyRequest.data[0].x = bodyRequest.data[0].x.concat(
      result.map((p) => p.x)
    );
    bodyRequest.data[0].y = bodyRequest.data[0].y.concat(
      result.map((p) => p.y)
    );
    bodyRequest.data[0].z = bodyRequest.data[0].z.concat(
      result.map((p) => p.z)
    );
  }

  addParquet(result: any[] = []) {
    const parquets: any[] = [];
    for (let i=0; i<result.length; i++) {
        const p = result[i];
        parquets.push(p ? [p.x, p.y, p.z] : [null, null, null]);
    }
    this.captureParquet.landmarks_data_list = this.captureParquet.landmarks_data_list.concat(parquets);
  }

  getLandmarks(source: ILandmarks[] = [], indexs: number[] = []) {
    const result: ILandmarks[] = [];
    indexs.forEach((index) => {
      result.push(source[index] || { x: null, y: null, z: null });
    });
    return result;
  }

  blankLandmarks(lenght = 0) {
    const landmarks: ILandmarks[] = [];
    for (let i = 0; i < lenght; i++) {
      landmarks.push({ x: null, y: null, z: null });
    }
    return landmarks;
  }

  async frameHandler(results: Results) {

    // console.log({ poseResult, faceResult, handResult });
    const midwayEyes = this.getLandmarks(results.faceLandmarks, [168]);
    // console.log(results.faceLandmarks);
    const leftHand = results.leftHandLandmarks || this.blankLandmarks(21);
    // console.log("LEFT: ", leftHand[0]);
    const rightHand = results.rightHandLandmarks || this.blankLandmarks(21);
    // console.log("RIGHT", rightHand[0]);
    const lipData = this.getLandmarks(
        results.faceLandmarks,
      [
        61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 146, 91, 181, 84, 17,
        314, 405, 321, 375, 78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308,
        95, 88, 178, 87, 14, 317, 402, 318, 324,
      ]
    );

    // Repeat adding data
    this.addResults(this.bodyRequest, midwayEyes);
    this.addResults(this.bodyRequest, leftHand);
    this.addResults(this.bodyRequest, rightHand);
    this.addResults(this.bodyRequest, lipData);

    this.addResults(this.bodyRequest, midwayEyes);
    this.addResults(this.bodyRequest, leftHand);
    this.addResults(this.bodyRequest, rightHand);
    this.addResults(this.bodyRequest, lipData);

    this.addResults(this.bodyRequest, midwayEyes);
    this.addResults(this.bodyRequest, leftHand);
    this.addResults(this.bodyRequest, rightHand);
    this.addResults(this.bodyRequest, lipData);

    this.addResults(this.bodyRequest, midwayEyes);
    this.addResults(this.bodyRequest, leftHand);
    this.addResults(this.bodyRequest, rightHand);
    this.addResults(this.bodyRequest, lipData);

    this.addParquet(results.faceLandmarks || this.blankLandmarks(468));
    this.addParquet(results.leftHandLandmarks || this.blankLandmarks(21));
    this.addParquet(results.rightHandLandmarks || this.blankLandmarks(21));
    this.addParquet(results.poseLandmarks || this.blankLandmarks(33));

    // console.log(this.captureParquet.landmarks_data_list.length);
    // console.log({ midwayEyes, leftHand, rightHand, lipData });
  }

  requestVideoFrameBinding(videoEl: HTMLVideoElement) {
    const frameLoop = async () => {
        await this.holistic.send({ image: videoEl });
      videoEl?.requestVideoFrameCallback(frameLoop);
    };
    videoEl?.requestVideoFrameCallback(frameLoop);
  }
}

export const mediaPipe = new MediaPipeUtil();
