// 回到顶部
(function() {
    var btn = document.querySelector("#btn");
    var header = document.querySelector ('.head-nav');

    btn.addEventListener("mouseover", moveIn, false);
    btn.addEventListener("mouseout", moveOut, false);

    function moveIn() {
        btn.style.color = "#ffffff";
    }

    function moveOut() {
        btn.style.backgroundImage = "url(./image/backtop.png)";
    }

    function goTop(acceleration, time) {
        acceleration = acceleration || 0.1;
        time = time || 10;
        var speed = 1 + acceleration;

        function getScrollTop() {
            return document.documentElement.scrollTop || document.body.scrollTop;
        }

        function setScrollTop(value) {
            document.documentElement.scrollTop = value;
            document.body.scrollTop = value;
        }
        window.onscroll = function() {
            var scrollTop = getScrollTop();
            if (scrollTop > 100) {
                btn.style.display = "block";
                header.style.position = 'fixed';
                header.id = 'head-nav';
            } else {
                btn.style.display = "none";
                header.id = '';
            }
        };
        btn.onclick = function() {
            var timer = setInterval(function() {
                    setScrollTop(Math.floor(getScrollTop() / speed));
                    if (getScrollTop() == 0) clearInterval(timer);
                },
                time);
        };
    }
    goTop(0.2, 8);
})();

//轮播
function rotate(ele) {
    var imgCon = ele;
    var lis = imgCon.children;
    lis = Array.prototype.slice.call(lis);
    lis = lis.slice(2, 7);
    var leftBtn = ele.querySelector('.lefthand');
    var rightBtn = ele.querySelector('.righthand');
    var lisLen = lis.length;
    var nextIndex = 0,
        preIndex = 0;

    //重新设置lis 的 className 和 光标的 背景 
    function reset() {
        for (var i = 0; i < lisLen; i++) {
            lis[i].className = 'none';
        }
    };

    //设置自动轮播
    var setIntFun = setInterval(setInt, 2000);

    function setInt() {
        reset();
        nextIndex++;
        preIndex = nextIndex - 1;
        if (nextIndex == lisLen) {
            nextIndex = 0;
        }
        if (preIndex == lisLen) {
            preIndex = 0;
        }
        lis[nextIndex].className = 'showright';
        lis[preIndex].className = 'show';
        preIndex++;
    };
    // 添加 hover 显示左右 button 和 重设置自动轮播
    function showBtn() {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
    }

    function hideBtn() {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }

    imgCon.addEventListener('mouseover',
        function() {
            showBtn();
            clearInterval(setIntFun);
        });
    imgCon.addEventListener('mouseout',
        function() {
            hideBtn();
            setIntFun = setInterval(setInt, 2000);
        });

    //给两个 btn 添加事件
    leftBtn.addEventListener('click',
        function() {
            reset();
            if (nextIndex == 0) {
                nextIndex = lisLen;
            }
            nextIndex--;
            preIndex = nextIndex + 1;
            //如果后一张为最后一张  前一张为0
            if (nextIndex == lisLen - 1) {
                preIndex = 0;
            }
            lis[nextIndex].className = 'showleft';
            lis[preIndex].className = 'show';
            preIndex--;
        });

    rightBtn.addEventListener('click', setInt, false);
};

// 倒计时
function timeout() {
    var dCon = document.querySelector('.t_d');
    var hCon = document.querySelector('.t_h');
    var mCon = document.querySelector('.t_m');
    var sCon = document.querySelector('.t_s');
    var tCopy = [];

    function getRTime() {
        var EndTime = new Date('2016/9/12 10:00:00');
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();

        var t = [Math.floor(t / 1000 / 60 / 60 / 24), Math.floor(t / 1000 / 60 / 60 % 24), Math.floor(t / 1000 / 60 % 60), Math.floor(t / 1000 % 60)];

        

        t.forEach (function (v, i, a) {
            if (v < 10) {
                t[i] = '0' + v;
            }
        });


        t.forEach(function(value, index, arr) {
            if (tCopy[index] !== t[index]) {
                switch (index) {
                    case 0:
                        dCon.innerHTML = t[0];
                        timerAnimate(dCon, 't_d', t[0]);
                        break;
                    case 1:
                        hCon.innerHTML = t[1];
                        timerAnimate(hCon, 't_h', t[1]);
                        break;
                    case 2:
                        mCon.innerHTML = t[2];
                        timerAnimate(mCon, 't_m', t[2]);
                        break;
                    case 3:
                        sCon.innerHTML = t[3];
                        timerAnimate(sCon, 't_s', t[3]);
                        break;
                    default:
                        break;
                }
            }
        });
        tCopy = t;
    }
    setInterval(getRTime, 1000);

    function timerAnimate(container, conClass, time) {
        var ele = document.createElement('span');

        var lateTime = time;
        if (lateTime === 0) {
            lateTime = 60;
        }
        ele.className = 'CELE';
        ele.innerHTML = lateTime;

        container.parentNode.appendChild(ele);
        var startTime = new Date().getTime();
        requestAnimationFrame(function change() {
            var current = new Date() - startTime;
            var interval = Math.round(current / 10);
            ele.style.top = -interval + 'px';
            if (interval >= 36) {
                if (!('remove' in Element.prototype)) {
                    Element.prototype.remove = function() {
                        if (this.parentNode) {
                            this.parentNode.removeChild(this);
                        }
                    };
                }
                ele.remove();
            }
            requestAnimationFrame(change);
        });
    }
}

timeout();

// // 头部
function changeHeader() {
    var navContainer = document.querySelector('.nav-ul');
    var containerLists = navContainer.children;
        containerLists = Array.prototype.slice.call(containerLists);
    var navLine = document.querySelector('.nav-line');

    navContainer.addEventListener('mouseover',
        function(ev) {
            var target = target || ev.target;
            var index = 0;

            var width = 76 + 26;
            if (target.nodeName.toLowerCase() == 'li') {
                index = containerLists.indexOf(target);
                if (index === 0) {
                    left = 0;
                } else {
                    left = (index - 1) * width + 52;
                }
                navLine.style.left = left + 'px';
            }
            navContainer.addEventListener('mouseleave',
                function() {
                    setTimeout(function() {
                            navLine.style.left = '0px';
                        },
                        100);
                },
                false);
        },
        false);
}

changeHeader();

var addressClass = ['t-eight', 'eighty', 's-f-suqaure', 't-two', 'wind-rain', 'red-house', 'old-lib', 'lover', 'taiji', 'basketball', 'new-gate', 'xinke', 'yifulou'];

function showAddr() {

    var ChineseName = ['八教', '八十万', '春华秋实广场', '二教', '风雨', '红房子', '老图', '情人坡', '太极', '五栋篮球场', '新校门', '信科', '逸夫楼'];

    var mapContainer = document.querySelector('.map-wrapper');
    var addrName = document.querySelector('.addr-name');
    var addInforCons = document.querySelectorAll('.addr-infor');

    function showInfor(index) {
        var that = addInforCons[index];
        that.style.display = 'block';
        var el = that.querySelector('.images');
        rotate(el);

        var closeBtn = that.querySelector('.close-btn');
        closeBtn.addEventListener('click',
            function() {
                this.parentNode.parentNode.style.display = 'none';
            });
    }

    mapContainer.addEventListener('mouseover',
        function(ev) {
            var target = ev.target;
            if (target.className === 'map-img') {
                var top = window.getComputedStyle(target.parentNode).top;
                var left = window.getComputedStyle(target.parentNode).left;
                top = parseFloat(top) - 40;
                left = parseFloat(left) - 16;
                addrName.style.top = top + 'px';
                addrName.style.left = left + 'px';
                var targetClass = target.parentNode.className.slice(5);
                var nameIndex = addressClass.indexOf(targetClass);
                addrName.innerHTML = ChineseName[nameIndex];

                target.addEventListener('click',
                    function() {
                        showInfor(nameIndex);
                    },
                    false);
            }
        },
        false);
};
showAddr();

var addArr = [];
addressClass.forEach(function(v, i, a) {
    addArr[i] = document.querySelector('.' + v);
});

var addPos = document.querySelector('.addr-name');
var mapDiv = document.querySelector('#mapDiv');
var addrs = document.querySelectorAll('.map-img');
addrs = Array.prototype.slice.call(addrs);

function changeStyle(ele, style, scale) {
    return ele.style[style] = parseFloat(getComputedStyle(ele)[style]) * scale + 'px';
}

function transform(num, ele, item) {
    var w = parseFloat(getComputedStyle(ele).width);
    var h = parseFloat(getComputedStyle(ele).height);
    var styleArr = ['top', 'left', 'width', 'height'];

    addArr.forEach(function(v, i, a) {
        styleArr.forEach(function(value, index, arr) {
            changeStyle(v, value, num);
        });

    });

    ele.style.width = w * num + 'px';
    ele.style.height = h * num + 'px';

    mapDiv.style.width = parseFloat(w) * num + 'px';
    mapDiv.style.height = parseFloat(h) * num + 'px';

    styleArr.forEach(function(value, index, arr) {
        changeStyle(addPos, value, num);
    });

    changeStyle(addPos, 'fontSize', num);
    changeStyle(addPos, 'lineHeight', num);

    var scalingWidth = w * num - w;
    var scalingHeight = h * num - h;

    if (num < 1) {
        changemapPos();
    }
}

function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) {
        offset += getLeft(e.offsetParent);
    }
    return offset;
}

function getTop(e) {
    var offsettop = e.offsetTop;
    if (e.offsetParent != null) {
        offsettop += getTop(e.offsetParent);
    }
    return offsettop;
}

function getStyleDis(ele, style, fn) {
    return fn(ele) + parseFloat(getComputedStyle(ele)[style]);
}

function changemapPos() {

    var mapBorder = document.querySelector('.map-border');

    var mapLeft = getStyleDis(mapDiv, 'width', getLeft);
    var borderLeft = getStyleDis(mapBorder, 'width', getLeft) + 5;

    var mapTop = getStyleDis(mapDiv, 'height', getTop);
    var borderTop = getStyleDis(mapBorder, 'height', getTop) + 20;

    if (mapLeft < borderLeft) {
        var a = mapLeft - borderLeft;
        mapDiv.style.left = parseFloat(getComputedStyle(mapDiv).left) + Math.abs(a) + 'px';
    };

    if (mapTop < borderTop) {
        var b = mapTop - borderTop;
        mapDiv.style.top = parseFloat(getComputedStyle(mapDiv).top) + Math.abs(b) + 'px';
    };

}

var map = document.querySelector('#map-');

var scaling = 1.0,
    item = 1,
    scaleCount = 0;

function scaleMap(ele) {
    if (ele === 'enlarge') {
        scaling = 1.1;
        if (item === 0) {
            item += 2
        } else {
            item++;
        }
        if (item >= 7) {
            item = 6;
        }
        scaleCount++;
        if (scaleCount > 7) {
            scaleCount = 7;
        }
    } else {
        scaling = 1 / 1.1;
        if (item >= 1) {
            item--;
        }
        scaleCount--;
        if (scaleCount <= 0) {
            scaleCount = 0;
        }
    }
    
    if (item >= 1 && scaleCount <= 6) {
        var scalingPos = transform(scaling, map, item);
    }
}

document.querySelector('.enlarge').addEventListener('click',
    function() {
        scaleMap('enlarge');
    },
    false);

document.querySelector('.letting').addEventListener('click',
    function() {
        scaleMap('letting');
    },
    false);

function SpryMap(param) {

    function MoveMap(x, y) {
        var newX = x,
            newY = y;
        if (m.lockEdges) {
            var rightEdge = -m.map.offsetWidth + m.viewingBox.offsetWidth,
                topEdge = -m.map.offsetHeight + m.viewingBox.offsetHeight;
            newX = newX < rightEdge ? rightEdge : newX;
            newY = newY < topEdge ? topEdge : newY;
            newX = newX > 0 ? 0 : newX;
            newY = newY > 0 ? 0 : newY;
        }
        m.map.style.left = newX + "px";
        m.map.style.top = newY + "px";

        var mapImgPos = {
            left: parseFloat(getComputedStyle(map).left),
            top: parseFloat(getComputedStyle(map).top)
        };
    }

    function AddListener(element, event, f) {
        if (element.attachEvent) {
            element["e" + event + f] = f;
            element[event + f] = function() {
                element["e" + event + f](window.event)
            };
            element.attachEvent("on" + event, element[event + f])
        } else element.addEventListener(event, f, false)
    };

    function Coordinate(startX, startY) {
        this.x = startX;
        this.y = startY;
    };

    var m = this;
    m.map = document.getElementById(param.id);
    m.width = typeof param.width == "undefined" ? 800 : param.width;
    m.height = typeof param.height == "undefined" ? 800 : param.height;
    m.scrolling = typeof param.scrolling == "undefined" ? true : param.scrolling;
    m.scrollTime = typeof param.scrollTime == "undefined" ? 300 : param.scrollTime;
    m.lockEdges = typeof param.lockEdges == "undefined" ? true : param.lockEdges;
    m.viewingBox = document.createElement("div");
    if (typeof param.cssClass != "undefined") m.viewingBox.className = param.cssClass;
    m.mousePosition = new Coordinate;
    m.mouseLocations = [];
    m.velocity = new Coordinate;
    m.mouseDown = false;
    m.timerId = -1;
    m.timerCount = 0;
    m.map.parentNode.replaceChild(m.viewingBox, m.map);
    m.viewingBox.appendChild(m.map);
    m.viewingBox.style.width = m.width + "px";
    m.viewingBox.style.height = m.height + "px";
    m.viewingBox.style.position = "absolute";
    m.map.style.position = "absolute";
    MoveMap(typeof param.startX == "undefined" ? 0 : -param.startX, typeof param.startY == "undefined" ? 0 : -param.startY);

    var MouseMove = function(b) {
        var e = b.clientX - m.mousePosition.x + parseFloat(m.map.style.left),
            d = b.clientY - m.mousePosition.y + parseFloat(m.map.style.top);
        MoveMap(e, d);
        m.mousePosition.x = b.clientX;
        m.mousePosition.y = b.clientY
    };

    var OnScrollTimer = function() {
        if (m.mouseDown) {

            m.mouseLocations.unshift(new Coordinate(m.mousePosition.x, m.mousePosition.y));

            if (m.mouseLocations.length > 10) m.mouseLocations.pop();
        } else {

            var totalTics = m.scrollTime / 20;

            var fractionRemaining = (totalTics - m.timerCount) / totalTics;

            var xVelocity = m.velocity.x * fractionRemaining;
            var yVelocity = m.velocity.y * fractionRemaining;

            MoveMap(-xVelocity + parseFloat(m.map.style.left), -yVelocity + parseFloat(m.map.style.top));

            if (m.timerCount == totalTics) {
                clearInterval(m.timerId);
                m.timerId = -1
            }++m.timerCount;
        }
    };

    AddListener(m.viewingBox, "mousedown",
        function(e) {
            m.viewingBox.style.cursor = "url(data:image/x-win-bitmap;base64,AAACAAEAICACAAcABQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA/AAAAfwAAAP+AAAH/gAAB/8AAAH/AAAB/wAAA/0AAANsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gH///4B///8Af//+AD///AA///wAH//+AB///wAf//4AH//+AD///yT/////////////////////////////8=), default";

            m.mousePosition.x = e.clientX;
            m.mousePosition.y = e.clientY;

            AddListener(document, "mousemove", MouseMove);
            m.mouseDown = true;

            if (m.scrolling) {
                m.timerCount = 0;

                if (m.timerId != 0) {
                    clearInterval(m.timerId);
                    m.timerId = 0;
                }
                m.timerId = setInterval(OnScrollTimer, 20);
            };
            e.preventDefault();
        });

    AddListener(document, "mouseup",
        function() {
            if (m.mouseDown) {
                var handler = MouseMove;
                if (document.detachEvent) {
                    document.detachEvent("onmousemove", document["mousemove" + handler]);
                    document["mousemove" + handler] = null;
                } else {
                    document.removeEventListener("mousemove", handler, false);
                }
                m.mouseDown = false;

                if (m.mouseLocations.length > 0) {
                    var clickCount = m.mouseLocations.length;
                    m.velocity.x = (m.mouseLocations[clickCount - 1].x - m.mouseLocations[0].x) / clickCount;
                    m.velocity.y = (m.mouseLocations[clickCount - 1].y - m.mouseLocations[0].y) / clickCount;
                    m.mouseLocations.length = 0;
                }
            }
            m.viewingBox.style.cursor = "auto";
        });
};

window.onload = function() {
    var map = new SpryMap({
        id: "mapDiv",
        height: 503,
        width: 983,
        startX: 0,
        startY: 0,
        cssClass: "map-sliper"
    });
}

var landMark = document.querySelector('#landmark');
var bigImgCon = document.querySelector('.show-bigimg');

landMark.addEventListener('mouseover', showBigImgCon, false);

function showBigImgCon() {
    bigImgCon.style.display = 'block';
    bigImgCon.id = 'showBigImg';
}

landMark.addEventListener('mouseout',
    function() {
        setTimeout (function () {
            bigImgCon.id = '';
            bigImgCon.style.display = 'none';
        }, 1100);
    },
    false);

landMark.addEventListener('click', showBigImg, false);

function showBigImg() {

    document.querySelector('.img-loding').style.display = 'block';

    function imgLoad(img, callback) {
        var timer = setInterval(function() {
                if (img.complete) {
                    callback(img);
                    clearInterval(timer);
                }
            },
            50);
    }

    imgLoad(map,
        function() {
            map.src = document.querySelector('.lazyload').dataset.src;
            document.querySelector('.img-loding').style.display = 'none';
            landMark.removeEventListener('click', showBigImg, false);
            landMark.removeEventListener('mouseover', showBigImgCon, false);
        });

}
