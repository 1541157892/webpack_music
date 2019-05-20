let volOptions = {
    volEle: null, // volume 元素
    volEleWidth: 0, // volume 元素的 Width
    volDownLeft: 0, // 按下事件中 e.clientX
    volMoveLeft: 0, // 移动事件中的 e.clientX
    volPercent: 0, // left 的百分比
    volStopPercent: 0, // 松开事件中，e.clientX 与 volDownLeft 两个值之间距离所占总宽度的百分比
    volMaxPercent: 0, // volume 的最大值
    volMinPercent: -88, // volume 的最小值
    volMoveRes: null, // 绑定移动事件函数的 result，removeEventListener 用
    volUpRes: null, // 绑定松开事件函数的 result，removeEventListener 用
    volDownRes: null, // 绑定按下事件函数的 result，removeEventListene 用
    volMoveFunc: function (Options) {
        // 刷新页面绑定松开事件
        document.addEventListener('mouseup', Options.volUpRes = Options.volUpFunc(Options));
        // 移动事件主要函数
        return function (e) {
            // 记录移动事件中的 e.clientX
            Options.volMoveLeft = e.clientX;
            // 改变 left 偏移量的关键：最大值 - 松开时与按下时之间占总宽的比例
            Options.volPercent = Options.volMaxPercent - Options.volStopPercent - ((Options.volDownLeft - e.clientX) * Options.volEleWidth / 100);
            // 给 left 设置区间
            Options.volPercent = Options.volPercent > Options.volMaxPercent ? Options.volMaxPercent : Options.volPercent < Options.volMinPercent ? Options.volMinPercent : Options.volPercent;
            // 改变元素偏移量
            Options.volEle.style.left = Options.volPercent + '%';
        }
    },
    volUpFunc: function (Options) {
        // 松开事件主要函数
        return function (e) {
            // 重复调节的关键：用之前的按下所记录的 e.clientX - 松开时的 e.clientX / 元素宽 * 100
            // 得用之前的 Options.volStopPercent 加上，不然每一次松开会重置
            Options.volStopPercent = Options.volStopPercent + Math.floor((Options.volDownLeft - e.clientX) / Options.volEleWidth * 100);
            // 给 Options.volStopPercent 设置区间
            Options.volStopPercent = Options.volStopPercent > -Options.volMinPercent ? -Options.volMinPercent : Options.volStopPercent < Options.volMaxPercent ? Options.volMaxPercent : Options.volStopPercent;
            // 最后执行修改 volume 元素音量函数
            audioControl.changeVolume(Math.floor(Options.volPercent / Options.volMinPercent * 100));
            // 清除 document 的 所有事件
            document.removeEventListener('mousemove', Options.volMoveRes);
            document.removeEventListener('mouseup', Options.volUpRes);
        }
    },
    volDownFunc: function (ele, Options) {
        // 将传入的需要操作的元素进行保存
        Options.volEle = ele;
        // 获取该元素的 width，用于计算百分比
        Options.volEleWidth = Options.volEle.offsetWidth;
        // 按下事件主要函数
        return function (e) {
            // 阻止默认行为
            e.preventDefault();
            // 每一次按下都记录当前按下的位置，e.clientX
            Options.volDownLeft = e.clientX;
            // 按下时绑定移动事件
            document.addEventListener
                ('mousemove', Options.volMoveRes = Options.volMoveFunc(Options));
        }
    }
}

let proOptions = {
    proEle: null, // progressBar 元素
    proEleWidth: 0, // progressBar 元素的 width
    proDownLeft: 0, // 按下事件中 e.clientX
    proMoveLeft: 0, // 移动事件中的 e.clientX
    proPercent: 0, // left 的百分比
    proStopPercent: 0, // progressBar 的最大值
    proMaxPercent: -97, // left 的最大值
    proDownRes: null, // 绑定按下事件函数的 result，removeEventListene 用
    proMoveRes: null, // 绑定移动事件函数的 result，removeEventListener 用
    proUpRes: null, // 绑定松开事件函数的 result，removeEventListener 用
    proDownFunc: function (ele, Options) {
        // 将传入的元素保存
        Options.proEle = ele;
        // 按下事件函数
        return function (e) {
            // progress.stop();
            // 获取元素 width
            Options.proEleWidth = Options.proEle.offsetWidth;
            // 保存每次点击的 e.clientX
            Options.proDownLeft = e.clientX;
            // 解绑事件
            document.addEventListener('mousemove', Options.proMoveRes = Options.proMoveFunc(Options));
            document.addEventListener('mouseup', Options.proUpRes = Options.proUpFunc(Options))
        }
    },
    proMoveFunc: function (Options) {
        return function (e) {
            // progress.stop();
            // 阻止默认事件
            e.preventDefault();
            // 保存每次 move 的 left
            Options.proMoveLeft = e.clientX;
            // 计算出 移动距离占总距离的百分比
            Options.proPercent = Options.proMaxPercent + Options.proStopPercent + Math.floor((Options.proMoveLeft - Options.proDownLeft) / Options.proEleWidth * 100);
            // 设置进度条的界限
            Options.proPercent = Options.proPercent < Options.proMaxPercent ? Options.proMaxPercent : Options.proPercent > -1 ? -1 : Options.proPercent;
            // 赋值给 ele 的 left
            Options.proEle.style.left = Options.proPercent + '%';
        }
    },
    proUpFunc: function (Options) {
        return function (e) {
            // 计算出松开鼠标与上一次按下鼠标之间占总长度的百分比
            Options.proStopPercent = Options.proStopPercent + Math.floor((e.clientX - Options.proDownLeft) / Options.proEleWidth * 100);
            // 不能让移动和按下之间距离的百分占比低于 0 或大于 97
            Options.proStopPercent = Options.proStopPercent > -Options.proMaxPercent ? -Options.proMaxPercent : Options.proStopPercent < 0 ? 0 : Options.proStopPercent;
            audioControl.changeTime(Options.proStopPercent);
            progress.start(changeIndex.index, Options.proStopPercent);
            // 松开鼠标，将 document 上绑定的 mousemove mouseup 全部取消
            document.removeEventListener('mousemove', Options.proMoveRes);
            document.removeEventListener('mouseup', Options.proUpRes);
        }
    }

}

class BindEvent {
    constructor() {
        this.play = document.getElementsByClassName('btn-play')[0];
        this.next = document.getElementsByClassName('btn-next')[0];
        this.prev = document.getElementsByClassName('btn-prev')[0];

        this.proDot = document.getElementsByClassName('bar-top-dot')[0];
        this.proBarTop = document.getElementsByClassName('bar-top')[0];

        this.volumeDot = document.getElementsByClassName('bar-top-dot')[1];
        this.volBarTop = document.getElementsByClassName('bar-top')[1];
    }
    init() {
        // 初始化绑定事件
        this.play.addEventListener('click', this.playClick);
        this.prev.addEventListener('click', this.prevClick);
        this.next.addEventListener('click', this.nextClick);
        this.volumeDot.addEventListener
            ('mousedown', volOptions.volDownRes = volOptions.volDownFunc(this.volBarTop, volOptions));
        this.proDot.addEventListener
            ('mousedown', proOptions.proDownRes = proOptions.proDownFunc(this.proBarTop, proOptions));
        audioControl.getAudio();
    }
    playClick() {
        let coverImg = document.getElementsByClassName('cover-img')[0];
        // 暂停播放按钮点击事件
        if (this.classList.contains('btn-pause')) {
            startState = false;
            coverImg.style.animationPlayState = 'paused';
            this.classList.remove('btn-pause');
            audioControl.pause();
            progress.stop();
        } else {
            startState = true;
            coverImg.style.animationPlayState = 'running';
            this.classList.add('btn-pause');
            audioControl.play();
            progress.start(changeIndex.index, proOptions.proStopPercent);
        }
    }
    nextClick() {
        // 播放下一首
        proOptions.proStopPercent = 0;
        render.init(changeIndex.next());
        audioControl.getAudio();
        progress.resetPlayTime()
        progress.start(changeIndex.index);
    }
    prevClick() {
        // 播放上一首
        proOptions.proStopPercent = 0;
        render.init(changeIndex.prev());
        audioControl.getAudio();
        progress.resetPlayTime()
        progress.start(changeIndex.index);
    }
}




export default BindEvent;
