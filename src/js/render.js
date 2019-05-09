class Render {
    // Render 构造函数
    constructor(resData) {
        this.data = resData;
    }
    init(index) {
        // 初始化，页面开始加载就进行内容渲染
        this.renderImg(this.data[index].img);
        this.renderSongInfo(this.data[index]);
        this.renderAllTime(this.data[index].time);
    }
    renderImg(url) {
        // 渲染歌曲封面
        let img = new Image();
        let parent = document.getElementsByClassName('cover-img-wrapper')[0];
        img.src = url;
        img.onload = () => {
            document.getElementsByClassName('cover-img')[0].setAttribute('src', url);
        };
    }
    renderSongInfo(data) {
        // 渲染歌手信息
        let songDiv = document.getElementsByClassName('content-song')[0];
        let singerDiv = document.getElementsByClassName('singer')[0];
        let albumDiv = document.getElementsByClassName('album')[0];
        let {song, singer, album} = data;
        songDiv.innerText = song;
        singerDiv.innerText = singer;
        albumDiv.innerText = album;
    }
    renderTime(time) {
        // 渲染当前播放时间
        let minute = Number.parseInt(time / 60);
        let second = time - minute * 60;
        let result = null;
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10) {
            second = '0' + second;
        }
        result = minute + ':' + second;
        return result;
    }
    renderAllTime(time) {
        // 渲染歌曲总时长
        document.getElementsByClassName('all-time')[0].innerText = this.renderTime(time);
    }
}

export default Render;