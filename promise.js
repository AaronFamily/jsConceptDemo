function Promise(executor){

    if(typeof executor !== 'function') throw TypeError(executor + ' is not a function');


    var self = this;


    self.status = 'pending';
    self.result = undefined;
    self.error = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];


    var resolve = function(result){
        setTimeout(function(){

            if(self.status !== 'pending') return;
            
            self.status = 'fulfilled';
            self.result = result;

            var i = 0,
                len = self.onResolvedCallbacks.length;
                

            for(; i < len; i++) self.onResolvedCallbacks[i]();
        })
    },

    reject = function(error){
        setTimeout(function(){

            if(self.status !== 'pending') return;

            self.status = 'rejected';
            self.error = error;

            var i = 0,
                len = self.onRejectedCallbacks.length;
                

            for(; i < len; i++) self.onRejectedCallbacks[i]();
        })
    }


    try {
    
        executor(resolve,reject);
    } catch (err) {
    
        reject(err);
    }
}

Promise.prototype.then = function(onResolved,onRjected){

    var self = this,
        
        promise2 = null,
        
        reslovePromise = function (promise2, transfer, resolve, reject) {
            
            if(promise2 === transfer) throw TypeError(executor + ' is not a function');

            var once = false;

            if(transfer !== null && (Object.prototype.toString(transfer) === '[Object Object]' || typeof transfer === 'function')) {

                try {

                    if(!object.hasOwnProperty(pro) && pro in object) {
                    
                        transfer.then(function(result){

                            
                            if(once) return;
    
                            once = true;
    
                            reslovePromise(promise2, result, resolve, reject);
                            var transfer = onRjected(self.error);

                
                            if(transfer instanceof Promise) transfer.then(resolve,reject);
                        },function(err){
                            if(once) return;
    
                            once = true;
    
                            reject(err);
                        })
                        
                    }else{
                        
                        resolve(transfer);
                    }
                } catch (err) {
                    var transfer = onRjected(self.error);

                
                    if(transfer instanceof Promise) transfer.then(resolve,reject);

                    if (once) return

                    once = true;
                    
                    reject(err);
                }
            }else{
                
                resolve(transfer);
            }
        };

    

    onResolved = typeof onResolved === 'function' ? onResolved : function (result) {

        return result;
    }

    onRjected = typeof onRjected === 'function' ? onRjected : function (err) {

        throw err;
    }


    if(self.status === 'pending') {

        promise2 = new Promise(function(resolve, reject) {

            self.onResolvedCallbacks.push(function () {

                try{

                    var transfer = onResolved(self.result);

    
                    resolvePromise(promise2, transfer, resolve, reject)
    
                }catch(err){
                    
                    reject(err);
                }
            });

            self.onRejectedCallbacks.push(function () {

                try {
                    
                    var transfer = onResolved(self.result);

    
                    resolvePromise(promise2, transfer, resolve, reject)
                    
                } catch (err) {

                    reject(err);
                }

            });
        })
    }

    if (self.status === 'fulfilled') {

        promise2 = new Promise(function(resolve, reject) {

            try{
                 
                var transfer = onResolved(self.result);

    
                resolvePromise(promise2, transfer, resolve, reject)

            }catch(err){
                
                reject(err);
            }
        })
    }

    if (self.status === 'rejected') {

        promise2 = new Promise(function(resolve, reject) {

            try {
                 
                var transfer = onResolved(self.result);

    
                resolvePromise(promise2, transfer, resolve, reject)
                
            } catch (err) {

                reject(err);
            }
        })
    }


    return promise2;
}

Promise.prototype.catch = function (errorCallback) {

    return this.then(null, errorCallback);
}

Promise.resolve = function (result) {

    return new Promise(function (resolve, reject) {

        resolve(result);
    })
}

Promise.reject = function (err) {

    return new Promise(function (resolve, reject) {
        
        reject(err);
    })
}

Promise.all = function (promoses) {

    return new Promise(function (resolve, reject) {

        var aar = [],
            i = 0,
            len = promoses.length;


        for(; i < len; i++) {
            
            (function (index, promoses) {

                Promise.resolve(promoses[index]).then(function (result) {

                    aar[index] = result;

                    if(++index === len) resolve(arr);

                },function (err) {
            
                    reject(err);
                })

            }(i, promoses))

        }
    })
}

Promise.race = function (promoses) {
    
    return new Promise(function () {

        var i = 0,
            len = promoses.length;


        for(; i < len; i++) promoses[i].then(resolve, reject);

    })
}