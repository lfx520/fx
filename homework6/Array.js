foreach

if ( !Array.prototype.forEach) {
  Array.prototype.forEach = function forEach(callback) {
     
    var len = this.length;
    if(typeof callback != "function") {
        throw new TypeError();
    }
    
    var thisArg = arguments[1];
    for(var i = 0; i < len; i++) {
        if(i in this) {
            
            callback.call(thisArg, this[i], i, this);
        }
    }
  }
}

var arr = ["1", "2", "3", "4", "5"];
arr.forEach(function(ele, index, array){
    console.log(array[index]);
});

arr.forEach((ele, index, array) => console.log(ele));


map

if (!Array.prototype.map) {
  Array.prototype.map = function(callback) {
      
      var len = this.length;
      if(typeof callback != "function") {
          throw new TypeError();
      }
      
      var newArr = new Array(len);
      
      var thisArg = arguments[1];
      for(var i = 0; i < len; i++) {
          if(i in this) {
              newArr[i] = callback.call(thisArg, this[i], i, this);
          }
      }
      return newArr;
  }    
}

var arr = ["1", "2", "3"];
arr.map(function(ele, index, array){
    ele = ele*ele;
    return ele;
});
arr.map((ele, index) => ele*ele);


Filter

if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
     
      var len = this.length;
      if(typeof callback != "function") {
          throw new TypeError();
      }
     
      var newArr = new Array();
      
      var thisArg = arguments[1];
      for(var i = 0; i < len; i++) {
          if(i in this) {
              if(callback.call(thisArg, this[i], i, this)) {
                  newArr.push(val);
              }
          }
      }
      return newArr;
  }
}

var arr = [1, 2, 3, 4];
arr.filter(function(ele, index, array){
    return ele % 3 === 0; 
});

arr.filter((ele, index) => ele % 3 === 0 );



reduce


if(! Array.prototype.reduce){
    Array.prototype.reduce = function(callback){
    
    var len = this.length;
    if(typeof callback != "function") {
          throw new TypeError();
      }
    var newArr = new Array();
    var thisArg = arguments[1];
       
    for (var i = 1; i < len; i++) {
        newArr[i] = callback.call(thisArg, this[i], i, this);
    }
    return newArr;
    };
}
var arr = [1, 2, 3, 4];
arr.Reduce(function(previousnewArr, currentnewArr, currentIndex) {
    return previousnewArr + currentnewArr;
});



ReduceRight


if(! Array.prototype.ReduceRight){
    Array.prototype.ReduceRight = function(callback){
    var len = this.length;
    if(typeof callback != "function") {
          throw new TypeError();
      }
    var newArr = new Array();
    var thisArg = this[len - 1];   
    for (var i = len - 2; i >= 0; i --) {
        newArr[i] = callback.call(thisArg, this[i], i, this);
    }
    return newArr;
    };
}

var arr = [1, 2, 3, 4]
arr.ReduceRight(function(previousnewArr, currentnewArr, currentIndex) {
    return previousnewArr * currentnewArr;
});
arr.ReduceRight( (previousnewArr, currentnewArr, currentIndex) => Math.pow(previousnewArr * currentnewArr));


