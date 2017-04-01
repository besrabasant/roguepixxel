import * as WHS from "whs";

class glitchAudio {
    constructor() {
        this.audioListener = new THREE.AudioListener();

        this.audioLoader = new THREE.AudioLoader();

        this.audio = new THREE.Audio(this.audioListener);

        this.audioPath = "dist/webgl/sounds/glitch.mp3";
        this.audio.setLoop(true);
        this.audio.autoplay = false;
        this.audio.hasPlaybackControl = true;
        this.audio.startTime = 0;
        this.audioLoader.load(this.audioPath, buffer => {
            this.audio.setBuffer(buffer);
            this.audio.setVolume(0);
            this.audio.play();
        });
    }

    addListener(object) {
        object.native.add(this.audioListener);
    };

    playAudio() {
        this.audio.setVolume(1);
    };

    pauseAudio() {
        if (this.audio.isPlaying) {
            this.audio.setVolume(0);
        }
    }

}
const glitch = new glitchAudio();

export { glitch as default }