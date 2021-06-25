var funcs = {
    getCurSlice(cur, start, length) {
        var bincur = this.fillUp(parseInt(cur, 10).toString(2), 26);
        var slice = bincur.substring(start, start+length);
        return parseInt(slice, 2).toString(10);
    },
    insertCurSlice(cur, insert, start, length) {
        var bincur = this.fillUp(parseInt(cur, 10).toString(2), 26);
        var bininsert = this.fillUp(parseInt(insert, 10).toString(2), length);
        var newbincur = bincur.substring(0,start) + bininsert + bincur.substring(start+length);
        return parseInt(newbincur, 2).toString(10);
    },
    fillUp(cur, digits){
        if(cur.length<digits){
            return '0'.repeat(digits-cur.length)+cur;
        }
        return cur;
    }
}

export default funcs