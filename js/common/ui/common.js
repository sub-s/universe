var _chart = document.querySelectorAll('.top-chart .chart');
var _chartBar = document.querySelectorAll('.chart-bar');
var color = ['#9986dd','#fbb871','#bd72ac','#f599dc'] //색상
var newDeg = []; //차트 deg


// elemet index return
HTMLElement.prototype.getIndex = function(){
    let temp = -1;
    const _p = this.parentNode;
    const _c = _p.children;
    for(let i=0; i<_c.length; i++){
        const c = _c[i];
        if(c === this){
            temp = i;
            break;
        }
    }
    return temp;
}
// parents
HTMLElement.prototype.parent = function(t){
    let temp = null;
    const firstTxt = t.match(/^./g)[0];
    const check = (firstTxt === ".")?"c":(firstTxt === "#")?"i":"t"
    const txt = t.replace(/(^\.|^#)/g,'');
    const innerFn = (e)=>{
        switch(check) {
            case "c" :
                if(e.classList.contains(txt)) temp = e;
                break;
                case "i" :
                if(e.id === txt) temp = e;
                break
            default :
                if(e.tagName && e.tagName.toLowerCase() === txt) temp = e;
                break
        }
        if(temp === null && e.parentNode.tagName) innerFn(e.parentNode);
    }
    innerFn(this);
    return temp;
}

// 차트 바늘 움직이게 하는 함수
function getHalfNeedle(el){
    const _this = (el.classList.contains("half-chart"))?el:null;
    if(!_this) return;
    const _needle = _this.querySelector(".half-chart-needle");
    const _txt = _this.querySelector(".half-chart-txt");
    const getPer = ()=>{
        const p = (_this.getAttribute("p"))?Number(_this.getAttribute("p").replace(/\D/g,'')):0;
        const temp = ( p > 100)?100:p;
        return temp;
    }
    const getCounting = ()=>{
        const totalTime = Number(window.getComputedStyle(_needle)['transition-duration'].replace(/s/g,'')) * 1000;
        const len = 50;
        const num = totalTime / len;
        const onePlus = p / (len - 1);
        let txt = 0;
        let time = 0;
        if(_this.counterTimer) clearSetInterval(_this.counterTimer);
        _this.counterTimer = setInterval(()=>{
            time += num;
            txt = (txt + onePlus > p)?p:txt + onePlus;
            _txt.innerText = String(txt).replace(/(\.\d+)/g,'') + "%";
            if(time >= totalTime){
                clearInterval(_this.counterTimer);
                _this.counterTimer = null;
            }
        },num)
    }
    // const 
    const p = getPer()
    const deg = 180 * 0.01 * p;
    const styleRotate = "rotate("+ deg +"deg)";
    _txt.innerText = "0%";
    _needle.style.transition = "none";
    _needle.style.transform = "rotate(0deg)";
    setTimeout(()=>{
        _needle.style.transition = "transform ease 1.5s";
        _needle.style.transform = styleRotate;
        if(p > 0) getCounting()
    },500);
}

// 카운팅 함수
const getNumberCounting = (a)=>{
    const defaultData = {
        _this : null,
        totalTime : 1500,
        len : 50,
        p : 0,
    }
    const datas = Object.assign(defaultData,a);
    const num = datas.totalTime / datas.len;
    const onePlus = datas.p / (datas.len - 1);
    let txt = 0;
    let time = 0;
    if(datas._this.counterTimer) clearSetInterval(datas._this.counterTimer);
    datas._this.innerText = "0"
    setTimeout(()=>{
        datas._this.counterTimer = setInterval(()=>{
            time += num;
            txt = (txt + onePlus > datas.p)?datas.p:txt + onePlus;
            datas._this.innerText = String(txt).replace(/(\.\d+)/g,'');
            if(time >= datas.totalTime){
                clearInterval(datas._this.counterTimer);
                datas._this.counterTimer = null;
            }
        },num)
    },500)
}

// 탭 클릭이벤트
function tabOnClick(){
    const _this = event.currentTarget;
    const _idx = _this.getIndex();
    const _topChildren = _this.parentNode.children;
    const _conChildren = _this.parentNode.parentNode.querySelectorAll(".content > .inner");
    for(let i=0; i<_topChildren.length; i++){
        const t = _topChildren[i];
        const c = _conChildren[i];
        if(i !== _idx){
            t.classList.remove("on");
            c.classList.remove("on");
        }else{
            t.classList.add("on");
            c.classList.add("on");
        }
    }
    getTabHeight()
}
// 대시보드 탭 콘탠츠 height settong
function getTabHeight(){
    const _mainTab = document.querySelectorAll(".main-tap");
    _mainTab.forEach((t,i)=>{
        const _con = t.querySelector(".content");
        const diff = _con.scrollHeight - window.innerHeight;
        if(diff > 0){
            _con.style.height = "calc(100% - 47rem)";
        }else{
            _con.removeAttribute("style");
        }
    })
}

// tree
function treeArrClick(){
    const _this = event.currentTarget;
    const _li = _this.parentNode;
    const checked = _this.parentNode.classList.contains("file");
    if(!checked) _li.classList.toggle("closed");
}
function treeLabelClick(){
    event.preventDefault();
    if(event.stopPropagation){
        event.stopPropagation()
    }else{
        event.cancleBubble = true;
    }
    const _this = event.currentTarget;
    const tagName = _this.tagName.toLowerCase();
    const _tree = _this.parent(".tree");
    const _delBtn = _this.parent("li").querySelector(".tree_del_btn");
    const _delBtns = _tree.querySelectorAll(".tree_del_btn.on");
    let _thisLabel = _this;
    if(tagName === 'span'){
        const _checkbox = _this.parentNode.querySelector("input");
        const checked = !_checkbox.checked;
        _checkbox.checked = checked;
        _thisLabel = _this.parent("label");
    }
    const _labels = _tree.querySelectorAll("label");
    _labels.forEach((l,i)=>{
        if(l !== _thisLabel){
            l.classList.remove("active");
        }else{
            l.classList.add("active");
        }
    })
    if(!_delBtn) return;
    _delBtns.forEach((d,i)=>{
        if(d !== _delBtn)d.classList.remove("on");
    })
    _delBtn.classList.add("on");
}
function treeLabelMouseOver(){
    const _this = event.currentTarget;
    const _del = _this.parent("li").querySelector(".tree_del_btn");
    if(_del) _del.classList.add("on");
}
function treeLabelMouseOut(){
    const _this = event.currentTarget;
    const _li =  _this.parent("li");
    const _del =_li.querySelector(".tree_del_btn");
    const check = _li.querySelector("label").classList.contains("active");
    if(_del && !check) _del.classList.remove("on");
}
function treeDelClick(){
    console.log("treeDelClick")
}

/* calendar */
function calendarPopupClick(){
    const _this = event.currentTarget;
    const _pop = document.querySelector(".leftFlayingpopUp");
    const w = _pop.scrollWidth;
    const checked = _pop.classList.contains("open");
    if(!checked){
        _pop.style.width = w + "px";
    }else{
        _pop.style.width = "0px";

    }
    _pop.classList.toggle("open")
}
function toggleModal(el){
    const _this = el;
    if(_this.delay) return;
    const checked = _this.classList.contains("open");
    const _wrap = _this.querySelector(".modal_innerWrap");
    _this.delay = true;
    if(checked){
        _wrap.classList.remove("openModal");
        _wrap.classList.add("closeModal");
    }else{
        _wrap.classList.remove("closeModal");
        _wrap.classList.add("openModal");
        _this.classList.toggle("open");
    }
    setTimeout(()=>{
        _this.delay = null;
        if(checked){
            _this.classList.toggle("open");
        }
    },1000)
}
// setting
function onSettingClick(){
    const _this = document.querySelector(".setting");
    _this.classList.toggle("open");
}
// range
function getRange(){
    const _inputs = document.querySelectorAll("input[range]");
    _inputs.forEach((r,i)=>{
        const _box = document.createElement("div");
        const _trail = document.createElement("div");
        const _thumb = document.createElement("span");
        const _gage = document.createElement("span");
        const _txt = document.createElement("span");
        const w = (r.style.width === "")?"150rem":r.style.width;
        r.removeAttribute("style");
        const getFirstSet = ()=>{
            const firstVal = Number(r.value.replace(/\D/g,''));
            const temp = (firstVal <= _box.minInput)?_box.minInput:(firstVal <= _box.min)?_box.min:(firstVal >= _box.maxInput)?_box.maxInput:(firstVal >= _box.max)?_box.max:firstVal;
            r.value = temp;
            _txt.innerText = temp + _box.unit;
            const left = ((_trail.clientWidth - _thumb.clientWidth) / (_box.max - _box.min)) * (temp - _box.min);
            const width = distance(0,left,0,0);
            _thumb.style.left = left + "rem";
            _gage.style.width = width + "rem";
        }
        const distance = (x1, x2, y1, y2)=>{
            const diffX = x2 - x1;
            const diffY = y2 - y1;
            const dis = Math.sqrt(diffX * diffX + diffY * diffY);
            return dis;
        }
        const windowMouseUpEv = ()=>{
            window.removeEventListener("mousemove",windowMoveEv);
            window.removeEventListener("mouseup",windowMouseUpEv);
        }
        const windowMoveEv = ()=>{
            getMadeRage()
            if(event.pageX > window.innerWidth){
                windowMouseUpEv();
                getMadeRage()
            }
        }
        const thumbMouseDownEv = ()=>{
            event.preventDefault();
            window.addEventListener("mousemove",windowMoveEv);
            window.addEventListener("mouseup",windowMouseUpEv);
            _box.sX = event.pageX;
            _box.sY = event.pageY;
            _box.left = _thumb.offsetLeft;
            _box.top = _thumb.offsetTop;
            _box.leftMax = _trail.clientWidth - _thumb.clientWidth;
            _box.toptMax = _trail.clientHeight - _thumb.clientHeight;
        }
        const getMadeRage = ()=>{
            const minInputPosition = Math.ceil((_box.leftMax / (_box.max - _box.min)) * _box.minInput);
            const maxInputPosition = Math.ceil((_box.leftMax / (_box.max - _box.min)) * _box.maxInput);
            _box.diffX = event.pageX - _box.sX;
            _box.diffY = event.pageY - _box.sY;
            _box.calcX = _box.left + _box.diffX;
            _box.calcY = _box.top + _box.diffY;
            const l = (maxInputPosition <= _box.calcX)?maxInputPosition:(_box.leftMax <= _box.calcX)?_box.leftMax:(_box.calcX <= minInputPosition)?minInputPosition:(_box.calcX <= 0)?0:_box.calcX;
            const w = distance(0,_thumb.offsetLeft,0,_thumb.offsetTop) + (_thumb.clientWidth / 2);
            _gage.style.width = w + "rem";
            _thumb.style.left = l + "rem";
            const val = (((_box.max - _box.min) / _box.leftMax) * l) + _box.min;
            r.value = Math.round(val);
            _txt.innerText = Math.round(val) + _box.unit;
        }
        _box.classList.add("range-box");
        _trail.classList.add("trail");
        _thumb.classList.add("thumb");
        _gage.classList.add("rect_left");
        _txt.classList.add("txt");
        r.parentNode.insertBefore(_box,r);
        _box.appendChild(_trail);
        _box.appendChild(_thumb);
        _box.appendChild(_gage);
        _box.appendChild(_txt);
        _box.appendChild(r);
        _box.style.width = w;
        r.setAttribute("readonly","");
        _box.min = (r.getAttribute("min"))?Number(r.getAttribute("min")):0;
        _box.max = (r.getAttribute("max"))?Number(r.getAttribute("max")):100;
        _thumb.addEventListener("mousedown",thumbMouseDownEv);
        _box.unit = (r.getAttribute("unit") !== null)?r.getAttribute("unit"):"%";
        _box.minInput = (r.getAttribute("mininput") !== null)?Number(r.getAttribute("mininput")):_box.min;
        _box.maxInput = (r.getAttribute("maxinput") !== null)?Number(r.getAttribute("maxinput")):_box.max;
        getFirstSet();
        window.addEventListener("resize",getFirstSet)

    })
}
/* calendar day */
function logPopOpen(){
    const _this = event.currentTarget;
    const _pop = document.querySelector(".calendar-pop");
    _pop.style.display = "block";
    const style = _this.getBoundingClientRect();
    const popStyle = _pop.getBoundingClientRect();
    const dis = (_pop.style.display === "block")?"none":"block";
    const l = ((style.left + popStyle.width) >= window.innerWidth)?style.right - popStyle.width:style.left;
    const t = ((style.bottom + popStyle.height) >= window.innerHeight)?style.top - popStyle.height:style.bottom;
    _pop.style.left = l + "px";
    _pop.style.top = t + "px";
}
function logPopClose(){
    const _this = event.currentTarget;
    const _pop = document.querySelector(".calendar-pop");
    _pop.style.display = "none";
}

/* init */
function init(){
    // 차트 바늘 움직이는 함수
    const _halfChart = document.querySelectorAll(".half-chart");
    _halfChart.forEach((c,i)=>{
        const p = Math.floor(Math.random() * 100);
        c.setAttribute("p",p);
        getHalfNeedle(c)
    })

    // 대시보드 주간집게 실패 총의뢰 카운팅
    const _resultNum = document.querySelectorAll(".result-area .result");
    _resultNum.forEach((r,i)=>{
        const num = Math.floor(Math.random() * 10000);
        getNumberCounting({_this:r,p:num});
    })

    // 대시보드 탭 높이값
    getTabHeight();

    // range
    getRange();
}
init();