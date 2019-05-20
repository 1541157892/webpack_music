import '../css/index.scss';
import Render from './render.js';
import BindEvent from './bindEvent.js';
import ChangeIndex from './changeIndex.js';
import AudioControl from './audio.js';
import Progress from './progress.js';
import data from '../../mock.json';
// 定义全局 index
window.startState = false;
(function renderAll() {
    window.bindEvent = new BindEvent();
    window.render = new Render(data);
    window.changeIndex = ChangeIndex;
    window.audioControl = new AudioControl(data);
    window.progress = new Progress(data);

    render.init(0);
    bindEvent.init();
    audioControl.getAudio();
})()

