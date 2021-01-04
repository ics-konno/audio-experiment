import ButtonComponent from "../components/ButtonComponent";
import { useState } from "react";

const Recording = () => {
  const [isRec, setIsRec] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // 録音開始
  const startRec = async () => {
    setIsRec(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();
      mediaRecorder.addEventListener("dataavailable", (evt) => {
        const blob = new Blob([evt.data], { type: evt.data.type });
        const url = window.URL.createObjectURL(blob);
        setAudioData([...audioData, url]);
      });
    } catch (e) {
      window.alert("マイクを許可してください");
    }
  };

  // 録音終了
  const stopRec = async () => {
    setIsRec(false);
    mediaRecorder.stop();
    const tracks = audioStream.getTracks();
    tracks.forEach((track: MediaStreamTrack) => {
      track.stop();
    });
    setAudioStream(null);
    setMediaRecorder(null);
  };

  return (
    <div className="p-24">
      <section className="pt-6 pb-4">
        <p className="mb-4">録音を行います</p>
        {isRec && <p>録音中...</p>}
        <ButtonComponent
          onClick={isRec ? () => stopRec() : () => startRec()}
          className={"bg-blue-500 text-white " + (isRec ? "animate-pulse" : "")}
        >
          {isRec ? "録音終了" : "録音開始"}
        </ButtonComponent>
        {audioData.map((data) => (
          <div className="mt-4" key={data}>
            <audio src={data} controls></audio>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Recording;
