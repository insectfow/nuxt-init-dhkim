import Vue from 'vue';
Vue.prototype.numberConvertComma = num => {
    return num
        ? num.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : 0;
};
Vue.prototype.getTextLength = str => {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    return len;
}