export default class UserMediaController {
  audioStream: MediaStream;
  videoStream: MediaStream;

  constructor() {
    this.audioStream = null;
    this.videoStream = null;
  }

  // マイクを取得するメソッド
  async getAudio() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (e) {
      window.alert("マイクを許可してください");
    }
  }

  // カメラを取得するメソッド
  async getVideo() {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
    } catch (e) {
      window.alert("カメラを許可してください");
    }
  }

  // マイクを切断する処理
  stopAudio() {
    if (!this.audioStream) return;
    const tracks = this.audioStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    this.audioStream = null;
  }

  // カメラを切断する処理
  stopVideo() {
    if (!this.videoStream) return;
    const tracks = this.videoStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    this.videoStream = null;
  }

  // カメラを取得しvideo要素にstreamを描画する処理
  async setVideoSrc() {
    await this.getVideo();
    const video = document.querySelector("video") as HTMLVideoElement;
    video.srcObject = this.videoStream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  }

  // マイクから取得した音声を再生する
  async playAudioContext() {
    await this.getAudio();
    const audioContext = new AudioContext();
    const mediaStreamSource = audioContext.createMediaStreamSource(
      this.audioStream
    );
    mediaStreamSource.connect(audioContext.destination);
  }

}
