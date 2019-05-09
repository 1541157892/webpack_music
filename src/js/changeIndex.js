class ChangeIndex {
    constructor(len) {
        this.index = 0;
        this.len = len;
    }
    getIndex(num) {
        // 获取当前 index
        this.index = (num + this.len + this.index) % this.len;
        window.index = this.index;
        return this.index;
    }
    prev() {
        // 获取上一个 index
        return this.getIndex(-1);
    }
    next() {
        // 获取下一个 index
        return this.getIndex(1);
    }
}

export default ChangeIndex;