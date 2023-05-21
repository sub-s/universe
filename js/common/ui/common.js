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
    const _this = (el)?el:event.currentTarget.parent(".modal-popup");
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
        const _rangeWrap = document.createElement("div");
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
            const len = _box.max - _box.min;
            const price = temp - _box.min;
            const unit = 100 / len;
            const per = price * unit;
            _thumb.style.left = per + "%";
            _gage.style.width = per + "%";
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
            const len = _box.max - _box.min;
            const unit = 100 / len;
            const unit2 = len * 0.01;
            const trailUnit = _trail.clientWidth / len;
            const minInputPer = unit * (_box.minInput - _box.min);
            const maxInputPer = unit * (_box.maxInput - _box.min);
            _box.diffX = event.pageX - _box.sX;
            _box.diffY = event.pageY - _box.sY;
            _box.calcX = _box.left + _box.diffX;
            _box.calcY = _box.top + _box.diffY;
            const movePrice = _box.calcX / trailUnit;
            const calcPer = (movePrice * unit >= maxInputPer)?maxInputPer:(movePrice * unit >= 100)?100:(movePrice * unit <= minInputPer)?minInputPer:(movePrice * unit <= 0 )?0:movePrice * unit;
            const val = (calcPer * unit2) + _box.min;
            _gage.style.width = calcPer + "%";
            _thumb.style.left = calcPer + "%";
            _txt.innerText = Math.round(val) + _box.unit;
            r.value = Math.round(val);
        }
        _rangeWrap.classList.add("range-wrap");
        _box.classList.add("range-box");
        _trail.classList.add("trail");
        _thumb.classList.add("thumb");
        _gage.classList.add("rect_left");
        _txt.classList.add("txt");
        r.parentNode.insertBefore(_rangeWrap,r);
        _box.appendChild(_trail);
        _box.appendChild(_thumb);
        _box.appendChild(_gage);
        _box.appendChild(r);
        _rangeWrap.appendChild(_txt);
        _rangeWrap.appendChild(_box);
        _rangeWrap.style.width = w;
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
    _pop.style.left = l + "rem";
    _pop.style.top = t + "rem";
}
function logPopClose(){
    const _this = event.currentTarget;
    const _pop = document.querySelector(".calendar-pop");
    _pop.style.display = "none";
}
function segmentClick(){
    const _this = event.currentTarget;
    const _wrap = _this.closest("ul");
    const _children = _wrap.querySelectorAll("li");
    _children.forEach((s,i)=>{
        if(s !== _this){
            s.classList.remove("active")
        }else{
            s.classList.add("active")
        }
    })
}
/* tab */
function tabClick(){
    const _this = event.currentTarget;
    const _titParent = _this.closest(".tab-tit-wrap");
    const _conParent = _titParent.parentNode.querySelector(".tab-con-wrap");
    const idx = _this.getIndex();
    for(let i=0; i<_titParent.children.length; i++){
        const t = _titParent.children[i];
        const c = _conParent.children[i];
        if(i === idx){
            t.classList.add("active");
            c.classList.add("active");
        }else{
            t.classList.remove("active");
            c.classList.remove("active");
        }
    }
}
/* time range */
function getRangeTime(el){
    const _rangeGage = el;
    const _ruler = _rangeGage.closest(".ruler");
    const _grid =  _ruler.querySelectorAll("ul > li");
    const _gageChildren = _ruler.querySelectorAll(".range-time-box > div");
    const _timeSpan = _ruler.querySelectorAll("ul > li > .time")
    const _tooltip_cu = _ruler.querySelector(".current .tooltip-range-time")
    const _tooltip_next = _ruler.querySelector(".next .tooltip-range-time")
    const gridLen = (_grid.length - 1) * 2;
    const val = _rangeGage.getAttribute("value").split(",");
    const date = _rangeGage.getAttribute("date");
    const gridStartNum = Number(val[0]) / 2;
    const gridEnd = Number(val[1]) / 2;
    let nextLeft = 0;
    const childrenStyle = [];
    let totalVal = 0;
    val.forEach((v,i)=>{
        totalVal += Number(v);
    })
    val.forEach((v,i)=>{
        if(i === 0){
            childrenStyle[0] = "left:calc(100% / " + gridLen + " * " + v +")";
            nextLeft += Number(v);
        }else if(i === 1){
            childrenStyle[0] += "; width:calc(100% / " + gridLen + " * " + v +")";
            nextLeft += Number(v);
        }else{
            childrenStyle[1] = "left:calc(100% / " + gridLen + " * " + nextLeft +"); width:calc(100% / " + gridLen + " * " + v +")";
        }
    });
    
    _gageChildren.forEach((g,i)=>{
        g.setAttribute("style",childrenStyle[i]);
    })
    for(let i=0; i<_timeSpan.length; i++){
        const _ts = _timeSpan[i];
        if(i >= gridStartNum && i <=Math.floor(gridStartNum + gridEnd)){
            _ts.classList.add("selected");
        }else{
            _ts.classList.remove("selected");
        }
    }

    const tooltip2_num = Number(val[0]) + Number(val[1]);
    const toolTipTxt1 = (Number(val[0]) % 2 === 0)?_timeSpan[Math.floor(Number(val[0])/2)].innerText:String(_timeSpan[Math.floor(Number(val[0])/2)].innerText).replace(/\d+$/g,'30');
    const toolTipTxt2 = (tooltip2_num % 2 === 0)?_timeSpan[Math.floor(tooltip2_num/2)].innerText:String(_timeSpan[Math.floor(tooltip2_num/2)].innerText).replace(/\d+$/g,'30');
    _tooltip_cu.innerText = date + "   " + toolTipTxt1;
    _tooltip_next.innerText = date + "   " + toolTipTxt2;
}
function timerRangeMouseEv(){
    const _this = event.currentTarget;
    const checked = _this.parentNode.classList.contains("current")
    const _rangeGage = _this.closest(".range-time-box");
    const _ruler = _rangeGage.closest(".ruler");
    const _grid =  _ruler.querySelectorAll("ul > li");
    const gridLen = (_grid.length - 1) * 2;
    const val = _rangeGage.getAttribute("value").split(",");
    const windMoveEv = ()=>{
        const diff = (checked)?_this.sx - event.pageX:event.pageX - _this.sx;
        const calc = Math.ceil(diff / _this.unitOnePrice);
        let firstPrice = (checked)?(Number(val[0]) - calc > -1)?Number(val[0]) - calc:0:val[0];
        if(firstPrice > _this.moveMax) firstPrice = _this.moveMax;
        const secondPrice = (_this.moveMax <= Number(val[1]) + Number(calc))?_this.moveMax:(Number(val[1]) + Number(calc) < 0)?0:Number(val[1]) + Number(calc);
        const applyTxt = firstPrice+","+secondPrice+","+val[2];
        _rangeGage.setAttribute("value",applyTxt);
        getRangeTime(_rangeGage);
    }
    const windUpEv = ()=>{
        window.removeEventListener("mousemove",windMoveEv);
        window.removeEventListener("mouseup",windMoveEv);
    }
    _this.sx = event.pageX;
    _this.unitOnePrice = _ruler.clientWidth / gridLen;
    _this.moveMax = (checked)?Number(val[0]) + Number(val[1]):gridLen - Number(val[0]) - Number(val[2]);
    window.addEventListener("mousemove",windMoveEv);
    window.addEventListener("mouseup",windUpEv);
}
function timelineMoveEv(){
    const _this = event.currentTarget;
    const _ruler = _this.closest(".ruler");
    _this.sx = event.pageX;
    _this.len = (_ruler.querySelectorAll("ul > li").length - 1) * 2;
    console.log("------------------------------------------------------------")
    console.log("_this : ",_this)
    console.log("_ruler : ",_ruler)
    console.log("_this.sx : ",_this.sx)
    console.log("_this.len : ",_this.len)
}

function lftDropdownMenuBtnEv(){
    const _this = event.currentTarget;
    const _wrap = _this.closest(".bottom-menu");
    const _menu = _wrap.querySelector(".menu-wrap");
    const checked = _wrap.classList.contains("open");
    const h = (checked)?0:_menu.querySelector(".innerWrap").clientHeight;
    if(checked){
        _wrap.classList.remove("open");
    }else{
        _wrap.classList.add("open");
    }
    _menu.style.height = h + "rem";
}
function flyingMenuBtnOpen(c){
    const _pop = document.querySelector(c);
    const checked = _pop.classList.contains("open");
    if(checked){
        _pop.classList.remove("open");
    }else{
        _pop.classList.open("open");
    }
}

/* 가시화 */
function itemBoxToggleFn(){
    const _this = event.currentTarget;
    const _item = _this.closest(".item");
    const checked = !_item.classList.contains("off");
    if(checked){
        _item.classList.add("off");
        _item.classList.remove("open");
    }else{
        _item.classList.remove("off");

    }
}
function itemBoxOpcityToggle(){
    const _this = event.currentTarget;
    const _item = _this.closest(".item");
    const checked = _item.classList.contains("off");
    if(!checked) _item.classList.toggle("open");

}
/* item move */
function itemMove(){
    const _this = event.currentTarget;
    const _wrap = _this.closest(".drag-item-wrap");
    const _item = _this.closest(".move-item");
    const idx = _item.getIndex();
    const windMoveEv = ()=>{
        _wrap.setAttribute("move-index",idx);
        _wrap.classList.add("moving");
    }
    const windowUpEv = ()=>{
        window.removeEventListener("mousemove",windMoveEv);
        window.removeEventListener("mouseup",windowUpEv);
        _wrap.classList.remove("moving");
        setTimeout(()=>{
            _wrap.setAttribute("move-index",-1);
        })
    }
    window.addEventListener("mousemove",windMoveEv);
    window.addEventListener("mouseup",windowUpEv);

}
function itemMoveUpEv(){
    const _this = event.currentTarget;
    const _wrap = _this.closest(".drag-item-wrap");
    const _items = _wrap.children;
    const idx = _this.getIndex();
    const targetIdx = Number(_wrap.getAttribute("move-index"));
    if(targetIdx === -1) return;
    if(targetIdx > idx){
        _wrap.insertBefore(_items[targetIdx],_this);
    }else if(targetIdx < idx){
        const max = _items.length - 1;
        const reIndex = idx + 1;
        if(reIndex < max){
            _wrap.insertBefore(_items[targetIdx],_items[reIndex]);
        }else{
            _wrap.appendChild(_items[targetIdx]);
        }
    }
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

    // set time range
    const today = new Date();
    const y = today.getFullYear();
    const m = ((today.getMonth() + 1) > 9)?(today.getMonth() + 1):"0"+(today.getMonth() + 1);
    const d = (today.getDate() > 9)?today.getDate():"0"+today.getDate();
    const txtDate = y+"."+m+"."+d;
    const _timeRange = document.querySelectorAll(".range-time-box").forEach((t,i)=>{
        t.setAttribute("date",txtDate)
        getRangeTime(t);
    })
}
init();