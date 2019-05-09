class AudioControl {
    constructor(data) {
        this.data = data;
        this.status = 'pause';
        this.audio = new Audio();
        this.time = this.data[index].time;
    }
    getAudio() {
        // 获取音频文件
        this.audio.src = this.data[index].url;
        this.audio.oncanplay = () => {
            if (this.status == 'play') this.audio.play();
        }
    }
    play() {
        // 开始播放
        if (this.status == 'pause') this.audio.play();
        this.status = 'play';
    }
    pause() {
        // 暂停播放
        if (this.status == 'play') this.audio.pause();
        this.status = 'pause';
    }
    changeVolume(vol) {
        // 更改音量大小，传入 volume 条整体的一个占比        
        this.audio.volume = Math.floor(100 - vol) / 100;
    }
    changeTime(percent) {
        let second = Math.floor(percent * this.time / 100);
        this.audio.currentTime = second;
        document.getElementsByClassName('cur-time')[0].innerText = render.renderTime(second);
    }

}
export default AudioControl;


