/**
 * 通用运动框架
 */

/**
 * 获取指定属性的当前值
 * @param  {element} obj  要获取属性的元素
 * @param  {attbitute} attr 属性
 * @return {string}      属性值
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}

/**
 * 运动
 * @param  {[element]} obj   [要运动的对象]
 * @param  {[json]} attrs [属性+目标点]
 * @param  {[type]} fun   [回调函数]
 * @return {[type]}       [无]
 */
function sMove(obj, attrs, fun) {
     var bStop = true;

    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for (attr in attrs) {
            var cur = 0;
            // var value = attrs[attr];
            if (attr === "opacity") {
                cur = Math.round(parseFloat(obj.css(attr)) * 100);
            } else {
                cur = parseInt(obj.css(attr));
            }

            var speed = (attrs[attr] - cur) / 1.2;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != attrs[attr])
                bStop = false;

            if (attr === "opacity") {
                obj.css('filter','alpha(opacity:' + (cur + speed) + ')');
                obj.css('opacity',(cur + speed) / 100);
            } else {
                obj.css(attr,cur + speed + "px");
            }
        }
        // console.log(1);
        if (bStop) {
            clearInterval(obj.timer);
            if (fun) {
				fun();
			}
        }
    }, 30);
}
