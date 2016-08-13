var tt=null;
var img;
var n=0;
var timer=0;
window.onload=function(){
    var li=document.querySelector(".btn").querySelectorAll("li");
    img=document.querySelector(".imm").querySelectorAll("a");
    for(var i=0;i<img.length;i++){
        if(i!=0){
            img[i].style.opacity=0;
        }
    }
    for(var j=0;j<li.length;j++){
        li[j].onmouseover=function(){
            var that=this;
            tt=setTimeout(function(){ var index=that.innerHTML-1;
            n=index;
            if(index <img.length){
                for(var o=0;o<li.length;o++){
                    li[o].className="";
                    img[o].style.opacity=0;
                    img[o].style.zIndex=9998;
                }
                that.className="on";
                img[index].style.opacity=1;
                img[index].style.zIndex=9999;
                img[index].style.transition="opacity 0.6s";
              
            }
            },100);

        };
        li[j].onmouseout=function(){
            clearTimeout(tt)
        }
    }
    var left=document.querySelector("#left");
    var right=document.querySelector("#right");
    var body=document.querySelector("#cont");

    timer = setInterval("autoplay()",1000);
    body.onmouseover=function(){
        
        clearInterval(timer);
    };
    body.onmouseout=function(){
        
        timer = setInterval("autoplay()",1000);
    };
    left.addEventListener('click', function(){
        if(n>0){
            n--
        }
        else if(n==0){
            n=img.length-1;
        }
        var li=document.querySelector(".btn").querySelectorAll("li");
        li[n].onmouseover()
    });
    right.addEventListener('click', function(){
        n=n>=(img.length-1)?0:++n;
        var li=document.querySelector(".btn").querySelectorAll("li");
        li[n].onmouseover()
    });
};
function autoplay(){
    n=n>=(img.length-1)?0:++n;
    var li=document.querySelector(".btn").querySelectorAll("li");
    li[n].onmouseover()
};