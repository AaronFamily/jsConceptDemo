//窗口拖动事件（resize）或者及时搜索功能都很适合使用函数节流的这种方式去处理

/**
 * 函数节流方法一
 * @param {*} callback 所要处理业务的回调函数
 * @param {*} time     所需节流时间间隔，默认50毫秒
 */

function throttling (callback,time) {

    var oTimer,
        
        oFirstTime = true,
        
        fSelf = callback;

        
    return function () {
        var aArgs = arguments,
            that = this;

        //如果是第一次执行，那将直接执行回调函数，跳过后面所有步骤
        if(oFirstTime) {
            
            //将指针调整为调用方
            fSelf.apply(that,aArgs);

            //第一次执行后讲oFirstTime改为false，这里的return什么都行
            return oFirstTime = false;
        }

        //如果定时器没有执行完那将直接return
        if(oTimer) return false;

        //设置定时器
        oTimer = setTimeout (function () {

            //清除定时器
            clearTimeout(oTimer);

            //讲oTimer变量设置为null,undefined也行，只要是可以隐性转化为false都性包括数字0
            oTimer  = null;
            
            //将指针调整为调用方
            fSelf.apply(that,aArgs);

        },time || 50)
    }
}





//调用方式，我们以窗口事件（resize）为例：

// 1. 首先初始化方法
var fInit = throttling(function (mun) {
    console.log(mun);
},500)

//调用初始化后的方法
window.onresize = function () {
    fInit(123);
}



