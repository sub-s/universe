var _chart = document.querySelectorAll('.top-chart .chart');
var _chartBar = document.querySelectorAll('.chart-bar');
var color = ['#9986dd','#fbb871','#bd72ac','#f599dc'] //색상
var newDeg = []; //차트 deg



const cancleBubble = ()=>{
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancleBubble = true;
    }
}



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

String.prototype.getDuble = function(){
    let temp = this.replace(/^0+/g,'');
    if(Number(temp) < 10) temp = "0" + temp;
    return temp;
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
    cancleBubble();
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
    const _trOn = document.querySelectorAll(".atmospheric-info .table.a tbody tr.active");
    _trOn.forEach((t,i)=>{
        t.classList.remove("active");
    })
    _this.classList.add("active");
    _pop.style.width = w + "px";
    _pop.classList.add("open")
}
function calendarPopupClickClose(){
    const _pop = document.querySelector(".leftFlayingpopUp");
    _pop.style.width = "0px";
    _pop.classList.remove("open")
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
    const _calWrap = _this.closest(".calendar-wrap");
    const _pop = document.querySelector(".calendar-pop");
    const _activeTds = _calWrap.querySelectorAll("td.active");
    _pop.style.display = "block";
    const style = _this.getBoundingClientRect();
    const popStyle = _pop.getBoundingClientRect();
    const dis = (_pop.style.display === "block")?"none":"block";
    const l = ((style.left + popStyle.width) >= window.innerWidth)?style.right - popStyle.width:style.left;
    const t = ((style.bottom + popStyle.height) >= window.innerHeight)?style.top - popStyle.height:style.bottom;
    _activeTds.forEach((t,i)=>{
        if(_this !== t) t.classList.remove("active");
    })
    _this.classList.add("active");
    _pop.style.left = l + "rem";
    _pop.style.top = t + "rem";
}
function logPopClose(){
    const _this = event.currentTarget;
    const _pop = document.querySelector(".calendar-pop");
    const _calWrap = document.querySelector(".calendar-wrap");
    const _activeTds = _calWrap.querySelectorAll("td.active");
    // _activeTds.forEach((t,i)=>{
    //     if(_this !== t) t.classList.remove("active");
    // })
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
}

function lftDropdownMenuBtnEv(){
    const _this = event.currentTarget;
    const _wrap = _this.closest(".bottom-menu");
    const _menu = _wrap.querySelector(".menu-wrap");
    const _deemed = _wrap.querySelector(".popDeemded");
    const checked = (_menu.clientHeight > 0)?true:false;
    const h = (checked)?0:_menu.querySelector(".innerWrap").clientHeight;
    if(checked){
        _wrap.classList.remove("menuOpen");
    }else{
        _wrap.classList.add("menuOpen");
    }
    const deemH = _deemed.getBoundingClientRect().bottom - 41;
    _menu.style.height = h + "rem";
    _deemed.style.height = deemH + "rem";
}
function addClOpen(c){
    const _pop = document.querySelector(c);
    _pop.classList.add("open");
}
function removeClOpen(c){
    const _pop = document.querySelector(c);
    _pop.classList.remove("open");
}
function clickDepth1ev(){
    const _this = event.currentTarget;
    const _tabWrap = _this.closest(".tab-area");
    this.setTimeout(()=>{
        const depth2 = _tabWrap.querySelector(".tab-con-wrap.depth1 .tab-con-area.active .tab-tit-wrap.depth2 .btn-tab.active");
        depth2.click();
    })
    tabClick();
}
function clickDepth2ev(){
    const _this = event.currentTarget;
    const _tabWrap = _this.closest(".tab-area")
    const depth1 = _tabWrap.querySelector(".tab-tit-wrap.depth1 .active").getIndex();
    const depth2 = _this.getIndex();
    const _bothItem = document.querySelector(".bottom-item");
    const _bar_timeLine = _bothItem.querySelector(".time-line-box");
    const _bar_current = _bothItem.querySelector(".current");
    const _bar_next = _bothItem.querySelector(".next");
    const _playBtn = document.querySelector(".satellite .left-item .date-area .btn-play");
    const _dateRange = document.querySelector(".left-item .bottom-calendar > .date-area");
    const _autoBtn = document.querySelector(".satellite .bottom-switch");
    const _dragImg = document.querySelector(".drag_horizontal_wrap");
    if((depth1 === 1 && depth2 === 0)){
        const _target = document.querySelector(".tab-area .tab-con-wrap.depth1 .tab-con-area.active .tab-con-wrap.depth2 > .tab-con-area.active");
        const checked = _target.classList.contains("searchMode");
        if(checked){
            _dateRange.classList.add("date");
            _playBtn.classList.remove("edit");
            _playBtn.classList.remove("hide");
        }else{
            _dateRange.classList.remove("date");
            _playBtn.classList.add("edit");
            _playBtn.classList.remove("hide");
        }
        _autoBtn.classList.add("hidden");
        console.log("1")
        
    }else if(depth1 === 0 ){
        console.log("2")
        _dateRange.classList.remove("date");
        _playBtn.classList.remove("edit");
        _playBtn.classList.remove("hide");
        _autoBtn.classList.remove("hidden");
    }else{
        console.log("3")
        _dateRange.classList.add("date");
        _playBtn.classList.remove("edit");
        _playBtn.classList.add("hide");
        _autoBtn.classList.add("hidden");
    }
    tabClick();
    switch(depth2){
        case 0 :
            _bar_timeLine.classList.remove("hidden_box");
            _bar_current.classList.add("hidden_bar");
            _bar_next.classList.add("hidden_box");
            removeClOpen('.bottom-menu.m1');
            _dragImg.classList.remove("active");
            break;
            case 1 :
            _bar_timeLine.classList.add("hidden_box");
            if(depth1 === 0){
                _bar_current.classList.remove("hidden_bar");
                _bar_next.classList.remove("hidden_box");
                addClOpen('.bottom-menu.m1');
                _dragImg.classList.add("active");
            }else{
                _bar_current.classList.add("hidden_bar");
                _bar_next.classList.add("hidden_box");
                removeClOpen('.bottom-menu.m1');
            }
            break;
        default :
            _bar_timeLine.classList.add("hidden_box");
            if(depth1 === 0){
                _bar_current.classList.remove("hidden_bar");
                _bar_next.classList.remove("hidden_box");
            }else{
                _bar_current.classList.add("hidden_bar");
                _bar_next.classList.add("hidden_box");
            }
            removeClOpen('.bottom-menu.m1');
            _dragImg.classList.remove("active");
            break;
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
    const itemType = (_this.closest(".thum-layer"))?1:0;
    const _wrap = (itemType === 1)?_this.closest(".thum-layer"):_this.closest(".drag-item-wrap");
    const _item = (itemType === 1)?_this.closest(".item"):_this.closest(".move-item");
    const idx = _item.getIndex();
    const windMoveEv = ()=>{
        _wrap.setAttribute("move-index",idx);
        _wrap.classList.add("moving");
    }
    const windowUpEv = ()=>{
        const itemType = (_this.closest(".thum-layer"))?1:0;
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
function itemActiveMove(){
    event.preventDefault();
    const _this = event.currentTarget;
    const dummyClass = (_this.closest(".thum-layer.c-type"))?"thum-layer c-type":(_this.closest(".thum-layer.search"))?"thum-layer search":(_this.closest(".thum-layer"))?"thum-layer":"layer-area ex";
    const h_borde = (dummyClass === "thum-layer search")?2:0;
    // console.log("-----------------------------------------------");
    // console.log("dummyClass :",dummyClass);
    // const checked = (_this.closest(".thum-layer"))?"thum-layer":(_this.closest(".thum-layer.c-type"))?"thum-layer c-type":(_this.closest(".layer-area.searchArea"))?"layer-area":"layer-area";
    const _wrap = _this.closest(".thum-layer") || _this.closest(".drag-item-wrap");
    const _items = _wrap.querySelectorAll(".item");
    _this.idx = _this.closest(".item").getIndex();
    const _clone = _items[_this.idx].cloneNode(true);
    const _dummyBox = document.createElement("div");
    const d_width = _items[_this.idx].clientWidth + 2;
    const d_height = _items[_this.idx].clientHeight;
    const d_diffTop = event.pageY - _items[_this.idx].getBoundingClientRect().top;
    const d_diffLeft = event.pageX - _items[_this.idx].getBoundingClientRect().left;
    // const dummyClass = (checked)?"layer-area":"thum-layer";
    _dummyBox.setAttribute("class",dummyClass)
    _dummyBox.classList.add("dummy-box");
    _dummyBox.style.width = d_width + "px";
    _dummyBox.style.height = (d_height + h_borde) + "px";
    _dummyBox.appendChild(_clone);
    _dummyBox.style.top = (event.pageY - d_diffTop) + "px";
    _dummyBox.style.left = (event.pageX - d_diffLeft) + "px";
    document.body.appendChild(_dummyBox);
    _items[_this.idx].classList.add("hidden");
    const winMove = ()=>{
        const pageY = event.pageY;
        _this.endIdx = -1;
        _dummyBox.style.top = (event.pageY - d_diffTop) + "px";
        _dummyBox.style.left = (event.pageX - d_diffLeft) + "px";
        for(let i=0; i<_items.length; i++){
            const m = _items[i];
            const min = m.getBoundingClientRect().top;
            const max = m.clientHeight + min;
            if(min <= pageY && max >= pageY){
                _this.endIdx = i;
                _wrap.querySelectorAll(".currentTarget").forEach((m,i)=>{
                    m.classList.remove("currentTarget");
                })
                _items[i].classList.add("currentTarget");
                break;
            }
        }
    }
    const winUp = ()=>{
        _dummyBox.classList.add('t');
        let _target = null;
        _items[_this.idx].classList.remove("hidden");
        if(_this.endIdx !== (_items.length - 1) && _this.endIdx > -1){
            const varNum = (_this.endIdx > _this.idx)?1:0
            _wrap.insertBefore(_items[_this.idx],_items[_this.endIdx + varNum])
            _target = _items[_this.endIdx + varNum];
        }else if(_this.endIdx === (_items.length - 1) && _this.endIdx > -1){
            _wrap.appendChild(_items[_this.idx]);
            _target = _items[_items.length - 1];
        }
        const targetTop = _items[_this.idx].getBoundingClientRect().top;
        const targetLeft = _items[_this.idx].getBoundingClientRect().left;
        _dummyBox.style.top = targetTop + "px";
        _dummyBox.style.left = targetLeft + "px";
        _dummyBox.style.opacity = 0;
        _wrap.querySelectorAll(".currentTarget").forEach((m,i)=>{
            m.classList.remove("currentTarget");
        })
        setTimeout(()=>{
            _dummyBox.parentNode.removeChild(_dummyBox);
        },400)


        window.removeEventListener("mousemove",winMove);
        window.removeEventListener("mouseup",winUp);
    }
    window.addEventListener("mousemove",winMove);
    window.addEventListener("mouseup",winUp);
}
function itemMoveUpEv(){
    const _this = event.currentTarget;
    const _wrap = (_this.closest(".thum-layer"))?_this.closest(".thum-layer"):_this.closest(".drag-item-wrap");
    const _items = _wrap.children;
    const idx = _this.getIndex();
    const targetIdx = Number(_wrap.getAttribute("move-index"));
    if(targetIdx === -1) return;
    if(targetIdx > idx){
        _wrap.insertBefore(_items[targetIdx],_this);
    }else if(targetIdx < idx){
        const max = _items.length - 1;
        const reIndex = idx + 1;
        if(idx < max){
            _wrap.insertBefore(_items[targetIdx],_items[reIndex]);
        }else{
            _wrap.appendChild(_items[targetIdx]);
        }
    }
}


function toggleClass(c){
    let _this = event.currentTarget;
    _this.classList.toggle(c);
}

function gnbTopSearchClick(){
    const _this = event.currentTarget;
    const _depth1_tit = document.querySelectorAll(".tab-tit-wrap.depth1 > .btn-tab");
    const _depth1_con = document.querySelectorAll(".tab-con-wrap.depth1 > .tab-con-area");
    const _depth2_tit = document.querySelectorAll(".tab-con-wrap.depth1 > .tab-con-area:nth-child(2) > .tab-tit-wrap.depth2 > .btn-tab");
    const _depth2_con = document.querySelectorAll(".tab-con-wrap.depth1 > .tab-con-area:nth-child(2) > .tab-con-wrap.depth2 > .tab-con-area");
    const _menu = document.querySelector(".tab-con-wrap.depth1 .tab-con-area:nth-child(2) .tab-con-wrap.depth2 .tab-con-area:first-child");
    const _dateRange = document.querySelector(".left-item .bottom-calendar > .date-area");
    const _playBtn = document.querySelector(".satellite .left-item .date-area .btn-play");
    const _bar_timeLine = document.querySelector(".time-line-box");
    _depth1_tit.forEach((t,i)=>{
        if(i === 0){
            _depth1_tit[i].classList.remove("active");
            _depth1_con[i].classList.remove("active");
        }else{
            _depth1_tit[i].classList.add("active");
            _depth1_con[i].classList.add("active");
            _depth1_tit[i].click();
        }
    })
    _depth2_tit.forEach((t,i)=>{
        if(i === 0){
            _depth2_tit[i].classList.add("active");
            _depth2_con[i].classList.add("active");
        }else{
            _depth2_tit[i].classList.remove("active");
            _depth2_con[i].classList.remove("active");
        }
    })
    _menu.classList.add("searchMode");
    setTimeout(()=>{
        _dateRange.classList.add("date");
        _playBtn.classList.remove("edit");
        _playBtn.classList.add("hide");
        _bar_timeLine.classList.add("hidden_box");
    })
}

function searchAreaBack(){
    const _this = event.currentTarget;
    const _wrap = _this.closest(".searchMode");
    _wrap.classList.remove("searchMode");
    const _dateRange = document.querySelector(".left-item .bottom-calendar > .date-area");
    const _playBtn = document.querySelector(".satellite .left-item .date-area .btn-play");
    _playBtn.classList.add("edit");
    _playBtn.classList.remove("hide");
    setTimeout(()=>{
        _dateRange.classList.remove("date");
    })
}

// function popCall(){
//     document.querySelector('.fixed-pop.pop2').classList.toggle('none')
// }

// function showBtn(){
//     let _this = event.currentTarget;
//     let wrap = _this.closest('.satellite');
//     let check = wrap.classList.contains('active')
//     check ? wrap.classList.remove("active") : wrap.classList.add("active");
// }


// function checkHandler(){
//     let _this = event.currentTarget;
//     let bg = (_this.checked) ? '#434f67' : 'transparent';
//     let _color = (_this.checked) ? '#fff' : '#8B8B97';

//     _this.closest('.checkbox').style.background = bg;
//     _this.nextElementSibling.style.color = _color;
// }


/* calendar */
function calendarCellClick(){

}

function mouseImgMove(){
    event.preventDefault();
    const _this = event.currentTarget;
    const _wrap = _this.closest(".drag_horizontal_wrap");
    const _map = _wrap.querySelector(".map");
    const min = 10;
    const max = 98;
    _this.sx = event.pageX;
    _this.left = (_this.style.left === '')?50:_this.style.left.match(/(\d+\.\d+|\d+)/g)[0];
    _this.unit = window.innerWidth * 0.01;
    const winMove = ()=>{
        _this.diffX = event.pageX - _this.sx;
        _this.calcX = _this.diffX / _this.unit;
        _this.applyX = (Number(_this.left) + Number(_this.calcX) <= min)?min:(Number(_this.left) + Number(_this.calcX) >= max)?max:Number(_this.left) + Number(_this.calcX);
        _this.style.left = _this.applyX + "%";
        _map.style.right = (100 - _this.applyX) + "%";
    }
    const winUp = ()=>{
        window.removeEventListener("mousemove",winMove);
        window.removeEventListener("mouseup",winUp);
    }
    window.addEventListener("mousemove",winMove);
    window.addEventListener("mouseup",winUp);
    console.log("_this.left : ",_this.left);
}

/* */
const showBtn = () => {
    let _this = event.currentTarget;
    let wrap = _this.closest('.satellite');
    let check = wrap.classList.contains('active');
    const _dragImg = document.querySelector(".drag_horizontal_wrap");
    _dragImg.classList.remove("active");
    check ? wrap.classList.remove("active") : wrap.classList.add("active");
}


const checkHandler = () => {
    let _this = event.currentTarget;
    let bg = (_this.checked) ? '#434f67' : 'transparent';
    let _color = (_this.checked) ? '#fff' : '#8B8B97';

    _this.closest('.checkbox').style.background = bg;
    _this.nextElementSibling.style.color = _color;
}

const closedFixedPop = (c)=>{
    const _pop = document.querySelector(c);
    _pop.classList.remove("show");
}
const openFixedPop = (c)=>{
    const _pop = document.querySelector(c);
    _pop.classList.add("show");
    const l = (window.innerWidth + 150) * 0.5 + _pop.clientWidth * 0.05;
    const t = window.innerHeight * 0.5 + _pop.clientHeight * 0.05;
    _pop.style.top = t+"px";
    _pop.style.left = l+"px";
}
const toggleFixedPop = (c)=>{
    const _pop = document.querySelector(c);
    const checked = _pop.classList.contains("show");
    if(checked){
        closedFixedPop(c);
    }else{
        openFixedPop(c);
    }

}

/* input */

const inputClearBtn = () => {
    let _this = event.currentTarget;
    let val = event.target.value;
    let clear = _this.closest('.field').querySelector('.clear-btn');
    const _eye = _this .closest(".field").querySelector(".eye");
    
    let _display = val ? 'block' : 'none'
    clear.style.display = _display;
    if( _eye) _eye.style.display = _display;
}

const clearBtn = () => {
    let _this = event.currentTarget;
    let _input = _this.closest('.field').querySelector('input');
    const _eye = _this .closest(".field").querySelector(".eye");
    _input.value = '';
    _input.focus()
    _this.style.display = 'none';
    _eye.style.display = 'none';
}

const eyeClicEv = ()=>{
    const _this = event.currentTarget;
    const _field =  _this.closest(".field");
    const _input = _field.querySelector("input");
    const type = (_input.type === "text")?"password":"text";
    _input.type = type;
    _input.focus();
}

/* weather  */

const popCall = () => {
    document.querySelector('.fixed-pop.pop2').classList.toggle('none')
}


/* component-calendar */
const setEventRevmoveCalendar = ()=>{
    const _main = document.querySelector(".main");
    const _wrap = document.querySelector(".wrap");
    document.body.addEventListener("click",deleteComponentCal);
    document.body.addEventListener("mousedown",deleteComponentCal);
    document.body.addEventListener("scroll",deleteComponentCal);
    if(_wrap) _wrap.addEventListener("click",deleteComponentCal);
    if(_wrap) _wrap.addEventListener("mousedown",deleteComponentCal);
    if(_wrap) _wrap.addEventListener("scroll",deleteComponentCal);
    window.addEventListener("click",deleteComponentCal);
    window.addEventListener("mousedown",deleteComponentCal);
    window.addEventListener("scroll",deleteComponentCal);
}


const deleteComponentCal = ()=>{
    const _cal = document.querySelectorAll("input[calendar]");
    _cal.forEach((c,i)=>{
        if(c.popupCalendar) c.popupCalendar.parentNode.removeChild(c.popupCalendar);
        delete c.popupCalendar;
    })
}
const addEventCalendarFocusEvent = ()=>{
    document.querySelectorAll("input[calendar]").forEach((c,i)=>{
        if(c.getAttribute("readonly")) return;
        c.setAttribute("readonly","");
        c.addEventListener("focus",()=>{
            deleteComponentCal();
            event.preventDefault();
            if(c.popupCalendar) return;
            const _this = event.currentTarget;
            const today = new Date();
            const val = (_this.value.match(/\d{4}(\-|\.)\d{1,2}(\-|\.)\d{1,2}/g))?_this.value.match(/\d{4}(\-|\.)\d{1,2}(\-|\.)\d{1,2}/g)[0]:false;
            const _fixedPosition = (c.getAttribute('fixedPosition'))?document.querySelector(c.getAttribute('fixedPosition')):null;
            let y = today.getFullYear();
            let m = today.getMonth();
            let selectdDate = -1;
            if(val){
                y = val.replace(/(\d{4})(\-|\.)\d{1,2}(\-|\.)\d{1,2}/g,'$1');
                m = Number(val.replace(/\d{4}(\-|\.)(\d{1,2})(\-|\.)\d{1,2}/g,'$2')) - 1;
                selectdDate = Number(val.replace(/\D/g,''));
            }
            const _dummy = document.createElement("div");
            const _pop = document.createElement("div");
            const top = (_fixedPosition)?_fixedPosition.getBoundingClientRect().top:_this.getBoundingClientRect().top;
            const bottom = _this.getBoundingClientRect().bottom;
            const left = (_fixedPosition)?_fixedPosition.getBoundingClientRect().left:_this.getBoundingClientRect().left;
            const window_h = window.innerHeight;
            _dummy._input = _this;
            const _draw_cal = drawCalendar(_dummy,y,m,selectdDate);
            _dummy.classList.add("dummy_create_area");
            document.body.appendChild(_dummy);
            const calc_bottom = bottom + _dummy.scrollHeight;
            _pop._input = _this;
            _pop.classList.add("pop-calendar");
            _pop.style.left = left + "px";
            document.body.appendChild(_pop);
            if(calc_bottom >= window_h || _fixedPosition){
                _pop.style.top = top + "px";
                _pop.classList.add("both");
            }else{
                _pop.style.top = bottom + "px";
            }
            _pop.appendChild(_dummy);
            _dummy.classList.remove("dummy_create_area");
            c.popupCalendar = _pop;
        })
        c.addEventListener("click",cancleBubble);
        c.addEventListener("mousedown",cancleBubble)
    })
    
}


const drawCalendar = (el,y,m,v)=>{
    el.innerHTML = "";
    el.addEventListener("click",function(){if(event.stopPropagation){event.stopPropagation();}else{event.cancleBubble = true;}});
    const today = new Date();
    const day1 = new Date(y,(Number(m) + 1),0);
    const day0 = new Date(y,(Number(m)),1);
    const day2 = new Date(y,(Number(m)),0);
    const day3 = new Date(y,(Number(m)+1),1);
    const todayPrice = Number(today.getFullYear() + String(today.getMonth()+1).getDuble() + String(today.getDate()).getDuble());
    const selectedDate = (v)?Number(v):000000;

    const defaultData = {
        weekName : ["일","월","화","수","목","금","토"]
    }
    
    const _cal = document.createElement("div");
    _cal.classList.add("component-calendar");
    _cal._input = el._input;
    _cal.addEventListener("click",cancleBubble);
    _cal.addEventListener("mousedown",cancleBubble);

    /* top */
    const _top = document.createElement("div");
    const _top_ul = document.createElement("ul");
    const _top_li_y = document.createElement("li");
    const _top_li_m = document.createElement("li");
    const _top_li_y_arr_l = document.createElement("button");
    const _top_li_y_arr_r = document.createElement("button");
    const _top_li_y_i = document.createElement("input");
    const _top_li_m_arr_l = document.createElement("button");
    const _top_li_m_arr_r = document.createElement("button");
    const _top_li_m_i = document.createElement("input");
    const clickArr = ()=>{
        const _this = event.currentTarget;
        const _cal = _this.closest(".component-calendar");
        const _input_y = _cal.querySelector(".year input");
        const _input_m = _cal.querySelector(".month input");
        const checked = _this.classList.contains("l");
        const type = (_this.closest('.year'))?'y':'m';
        const y = (type === 'y')?(checked)?Number(_input_y.value) - 1:Number(_input_y.value) + 1:_input_y.value;
        const m = (type==='m')?(checked)?Number(_input_m.value) - 2:Number(_input_m.value):Number(_input_m.value) - 1;
        drawCalendar(el,y,m,v);
    }


    /* draw top */
    _top.classList.add("top");
    _top_li_y.classList.add("year");
    _top_li_m.classList.add("month");
    _top_li_y_arr_l.setAttribute("class","arr l");
    _top_li_y_arr_r.setAttribute("class","arr r");
    _top_li_m_arr_l.setAttribute("class","arr l");
    _top_li_m_arr_r.setAttribute("class","arr r");
    _top_li_y_i.setAttribute("type","text");
    _top_li_y_i.setAttribute("readonly","");
    _top_li_y_i.value = day0.getFullYear();
    _top_li_m_i.setAttribute("type","text");
    _top_li_m_i.setAttribute("readonly","");
    _top_li_m_i.value = String(day0.getMonth()+1).getDuble();
    
    _top.appendChild(_top_ul);
    _top_ul.appendChild(_top_li_y);
    _top_ul.appendChild(_top_li_m);
    _top_li_y.appendChild(_top_li_y_arr_l);
    _top_li_y.appendChild(_top_li_y_i);
    _top_li_y.appendChild(_top_li_y_arr_r);
    _top_li_m.appendChild(_top_li_m_arr_l);
    _top_li_m.appendChild(_top_li_m_i);
    _top_li_m.appendChild(_top_li_m_arr_r);


    /* top event */
    _top_li_y_arr_l.addEventListener("click",clickArr);
    _top_li_y_arr_r.addEventListener("click",clickArr);
    _top_li_m_arr_l.addEventListener("click",clickArr);
    _top_li_m_arr_r.addEventListener("click",clickArr);


    /* con */
    const _con = document.createElement("div");
    const _name = document.createElement("ol");
    const _day = document.createElement("ol");

    /* con event */
    const dayClick = ()=>{
        const _this = event.currentTarget;
        console.log(_this);
        const _days = _this.closest("ol").children;
        const _cal = _this.closest(".component-calendar");
        const _input_y = _cal.querySelector(".year input");
        const _input_m = _cal.querySelector(".month input");
        const y = _input_y.value;
        const m = _input_m.value;
        const d = _this.innerText.getDuble();
        const _input = (!_cal._input)?_cal.closest(".outer-calendar-wrap").querySelector(".ehceked_calendar"):_cal._input;
        const checked = (_this.closest(".outer-calendar-wrap"))?true:false;
        _input.value = y+"-"+m+"-"+d;
        for(let i=0; i < _days.length; i++){
            const _d = _days[i];
            if(_d !== _this){
                _d.classList.remove("today");
                _d.classList.remove("selected");
            }else{
                _d.classList.add("selected");
            }
        }
        if(checked){
            const mm = String(Number(m) - 1).getDuble();
            drawCalendar(el,y,mm,y+m+d);
        }else{
            deleteComponentCal();
        }
    }
    const reDrawCalendar = ()=>{
        const _this = event.currentTarget;
        const _cal = _this.closest(".component-calendar");
        const _input_y = _cal.querySelector(".year input");
        const _input_m = _cal.querySelector(".month input");
        const checked = _this.classList.contains("p");
        const y = _input_y.value;
        const m = (checked)?Number(_input_m.value) - 2:Number(_input_m.value);
        drawCalendar(el,y,m,v);
    }

    /* draw content */
    _con.classList.add("content");
    _name.classList.add("week_name");
    _con.appendChild(_name);
    _con.appendChild(_day);
    console.log("selectedDate : ",selectedDate)
    // names
    for(let i=0; i<7; i++){
        const n = document.createTextNode(defaultData.weekName[i]);
        const li = document.createElement("li");
        li.appendChild(n);
        _name.appendChild(li);
    }
    // dasy
    for(let i=0, j=day2.getDate() - (day0.getDay() - 1); i<day0.getDay(); i++,j++){
        const n = document.createTextNode(j);
        const li = document.createElement("li");
        const div = document.createElement("div");
        const price = Number(day2.getFullYear() + String(day2.getMonth()+1).getDuble() + String(j).getDuble());
        if(price === todayPrice) li.classList.add("today");
        if(price === selectedDate) li.classList.add("selected");
        li.classList.add("p");
        div.appendChild(n);
        li.appendChild(div);
        li.addEventListener("click",reDrawCalendar);
        _day.appendChild(li);
    }
    for(let i=0; i<day1.getDate(); i++){
        const n = document.createTextNode((i+1));
        const li = document.createElement("li");
        const div = document.createElement("div");
        const price = Number(day1.getFullYear() + String(day1.getMonth()+1).getDuble() + String((i+1)).getDuble());
        console.log("price : ",price)
        console.log("selectedDate : ",selectedDate)
        if(price === todayPrice) li.classList.add("today");
        if(price === selectedDate) li.classList.add("selected");
        div.appendChild(n);
        li.appendChild(div);
        li.addEventListener("click",dayClick)
        _day.appendChild(li);
    }
    for(let i=0; i<(6-day1.getDay()); i++){
        const n = document.createTextNode((i+1));
        const li = document.createElement("li");
        const div = document.createElement("div");
        const price = Number(day3.getFullYear() + String(day3.getMonth()+1).getDuble() + String((i+1)).getDuble());
        if(price === todayPrice) li.classList.add("today");
        if(price === selectedDate) li.classList.add("selected");
        div.appendChild(n);
        li.appendChild(div);
        li.classList.add("n");
        li.addEventListener("click",reDrawCalendar);
        _day.appendChild(li);
    }
    
    
    _cal.appendChild(_top);
    _cal.appendChild(_con);




    el.appendChild(_cal);

    return _cal;
}

const applyCalendar = ()=>{
    const _this = event.currentTarget;
    const _children = _this.parentNode.children;
    const y = _this.value.substring(0,4);
    const m = _this.value.substring(5,7);
    const d = _this.value.substring(8,10);
    for(let i=0; i<_children.length; i++){
        const _c = _children[i];
        if(_c !== _this){
            _c.classList.remove("ehceked_calendar");
        }else{
            _c.classList.add("ehceked_calendar");
        }
    }
    const _wrap = _this.closest(".outer-calendar-wrap");
    const _cal =  _wrap.querySelector(".cal");
    const mm = String(Number(m) - 1).getDuble();
    drawCalendar(_cal,y,mm,y+m+d);
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

    // calendar input
    addEventCalendarFocusEvent();
    setEventRevmoveCalendar();
}
init();