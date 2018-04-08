/**
 * 函数重载
 * @param {*} domination 
 * @param {*} control 
 */

function heavyLoad (domination,control) {

    if (!(domination instanceof Function)) {
        
        control = domination;

        domination = function (args) {
            
            return (function (arr, callback, pThis) {
                
                var len = arr.length;

                var rlt = new Array(len);


                for (var i = 0; i < len; i++) if (i in arr) rlt[i] = callback.call(pThis, arr[i], i, arr); 

                return rlt;
            
            }(args,function(type){
                
                return typeof type;

            })).join();
        }
    }

    return function () {
        var key = domination([].slice.apply(arguments));
        
        for (var i in control) {
        
            var pattern  = new RegExp("^" + i.replace("*", "[^,]*").replace("...", ".*") + "$");
        
            if (pattern.test(key)) return control[i].apply(this, arguments);
        }
    }
}



var Calculate = FunctionH.overload({
    
    'number,number': function () {
    
        return arguments[0] + arguments[1];
    },
    
    'number,number,number': function () {
    
        return arguments[0] * arguments[1] * arguments[2];
    }
});

console.log(Calculate(1,2,3));


var MSIE = navigator.userAgent.indexOf('MSIE') !== -1;

var foo = FunctionH.overload(function () {
    
    return MSIE ? "IE" : "NotIE";
}, {
    
    "IE": function () {
    
        console.log('this is ie');
    },
    
    "NotIE": function () {
    
        console.log('notie');
    }
});

foo();