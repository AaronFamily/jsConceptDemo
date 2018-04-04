function Promise(executor){

    var self = this;

    self.status = 'pending';
    self.result = undefined;
    self.error = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];

    if(typeof executor !== 'function') throw TypeError(executor + ' is not a function');

    if (!(this instanceof Promise)) return new Promise(executor);

    var resolve = function(result){
        setTimeout(function(){

            if(self.status !== 'pending') return;
            
            self.status = 'resolve';
            self.result = result;

            var i = 0,
                len = self.onResolvedCallbacks.length;

            for(; i < len; i++) {
                self.onResolvedCallbacks[i]();
            }
        })
    }

    var reject = function(error){
        setTimeout(function(){

            if(self.status !== 'pending') return;

            self.status = 'reject';
            self.error = error;

            var i = 0,
                len = self.onRejectedCallbacks.length;

            for(; i < len; i++) {
                self.onRejectedCallbacks[i]();
            }
        })
    }

    try {
    
        executor(resolve,reject);
    } catch (err) {
        reject(err)
    }
}

Promise.prototype.then = function(onResolved,onRjected){

    var self = this;
    var promise2 = null;

    

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
    
    
                    if (transfer instanceof Promise) {
                        transfer.then(resolve,reject);
                    }
                    
                    resolve(transfer);
    
                }catch(err){
                    
                    reject(err);
                }
            });

            self.onRejectedCallbacks.push(function () {

                try {
                    var transfer = onRjected(self.error);
    
                    if(transfer instanceof Promise) {
                        transfer.then(resolve,reject);
                    }
                    
                } catch (err) {
                    reject(err);
                }

            });
        })
    }

    if(self.status === 'resolve') {
        promise2 = new Promise(function(resolve, reject) {
            try{
                var transfer = onResolved(self.result);


                if (transfer instanceof Promise) {
                    transfer.then(resolve,reject);
                }
                
                resolve(transfer);

            }catch(err){
                
                reject(err);
            }
        })
    }

    if(self.status === 'reject') {
        promise2 = new Promise(function(resolve, reject) {
            try {
                var transfer = onRjected(self.error);

                
                if(transfer instanceof Promise) {
                    transfer.then(resolve,reject)
                }
                
            } catch (err) {
                reject(err);
            }
        })
    }

    return promise2;
}