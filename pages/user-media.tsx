import UserMediaController from "../src/userMediaController";
import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";

const userMedia = () => {
  const [userMediaController, _] = useState(new UserMediaController());
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  const stopVideo = () => {
    setIsCameraOn(false);
    userMediaController.stopVideo();
  };

  const startVideo = async () => {
    setIsCameraOn(true);
    await userMediaController.setVideoSrc();
  };

  return (
    <div className="p-24">
      <section className="pt-6 pb-4">
        <p className="mb-4">・getUserMediaでaudioデバイスを取得します</p>
        <ButtonComponent
          onClick={() => userMediaController.getAudio()}
          className="bg-blue-500 text-white"
        >
          マイクを取得する
        </ButtonComponent>
      </section>
      <hr />
      <section className="pt-6 pb-4">
        <p className="mb-4">・getUserMediaでvideoデバイスを取得します</p>
        <ButtonComponent
          onClick={() => userMediaController.getVideo()}
          className="bg-blue-500 text-white"
        >
          カメラを取得する
        </ButtonComponent>
      </section>
      <hr />
      <section className="pt-6 pb-4">
        <p className="mb-4">・audioStreamを切断します</p>
        <ButtonComponent
          onClick={() => {
            userMediaController.stopAudio();
            setIsMicOn(false);
          }}
          className="bg-blue-500 text-white"
        >
          マイクを停止する
        </ButtonComponent>
      </section>
      <hr />
      <section className="pt-6 pb-4">
        <p className="mb-4">・videoStreamを切断します</p>
        <ButtonComponent
          onClick={() => {
            userMediaController.stopVideo();
            setIsCameraOn(false);
          }}
          className="bg-blue-500 text-white"
        >
          カメラを停止する
        </ButtonComponent>
      </section>
      <hr />
      <section className="pt-6 pb-4 h-52 flex justify-between">
        <div>
          <p className="mb-4">・取得したvideoStreamをvideoのsrcにします</p>
          <ButtonComponent
            onClick={isCameraOn ? () => stopVideo() : async () => startVideo()}
            className="bg-blue-500 text-white"
          >
            {isCameraOn ? "カメラOFF" : "カメラON"}
          </ButtonComponent>
        </div>
        <video className="bg-black" width={200} height={150}></video>
      </section>
      <hr />
      <section className="pt-6 pb-4">
        <p className="mb-4">
          ・取得したaudioStreamをWeb Audio APIのAudioContextに渡し、出力します
        </p>
        <ButtonComponent
          onClick={
            isMicOn
              ? () => {
                  setIsMicOn(false);
                  userMediaController.stopAudio();
                }
              : async () => {
                  setIsMicOn(true);
                  await userMediaController.playAudioContext();
                }
          }
          className="bg-blue-500 text-white"
        >
          {isMicOn ? "マイクOFF" : "マイクON"}
        </ButtonComponent>
      </section>
    </div>
  );
};

export default userMedia;
