class Progress {
    constructor(data) {
        this.data = data;
        this.newDate = 0;
        this.lastDate = 0;
        this.frameId = null;
        this.playTime = 0;
        this.percent = 0;
        this.maxPercent = -97;
        this.time = 0;
        this.barTop = document.getElementsByClassName('bar-top')[0];
        this.curTime = document.getElementsByClassName('cur-time')[0];
    }
    start(index, percent) {
        // 传入下标，开始播放音乐
        cancelAnimationFrame(this.frameId);
        this.lastDate = new Date().getTime();
        this.time = this.data[index].time;
        percent = percent ? percent : 0;
        let _this = this;
        let per = 0;
        let percentTime = 0;
        let startPer = 0;
        function frame() {
            _this.newDate = new Date().getTime() - _this.lastDate + _this.playTime;
            startPer = Number.parseFloat((_this.newDate / (_this.time * 1000) * 100).toFixed(1)) + percent;
            percentTime = Number.parseInt(startPer * _this.time / 100);
            per = _this.maxPercent + startPer;
            per = per > -1 ? -1 : per;
            _this.barTop.style.left = per + '%';
            _this.curTime.innerText = render.renderTime(percentTime);
            if (startState == false) {
                return;
            }
            if (per == -1) {
                cancelAnimationFrame(_this.frameId);
            } else {
                _this.frameId = requestAnimationFrame(frame);
            }
        }
        frame();
    }
    stop() {
        // 停止音乐播放，记录当前停止时间  从 playTime 下手
        this.playTime = this.playTime + (new Date().getTime() - this.lastDate);
        cancelAnimationFrame(this.frameId);
    }
    resetPlayTime() {
        // 在下次开始播放前，清除上个歌曲的时间缓存
        this.playTime = 0;
    }
}



export default Progress;