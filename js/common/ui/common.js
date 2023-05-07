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
    _li.classList.toggle("closed");
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
    console.log("dkdkdkdkdk")
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
    console.log("_this : ",_this)
    console.log("_pop : ",_pop)
    console.log("w : ",w)
}
function toggleModal(el){
    const _this = el;
    if(_this.delay) return;
    const checked = _this.classList.contains("open");
    const _wrap = _this.querySelector(".modal_innerWrap");
    _this.delay = true;
    _this.classList.toggle("open");
    if(checked){
        _wrap.classList.add("openModal");
    }else{
        _wrap.classList.add("closeModal");
    }
    console.log("this : ",_this)
    setTimeout(()=>{
        _wrap.classList.remove("closeModal");
        _wrap.classList.remove("openModal");
        _this.delay = null;
    },1500)
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
}
init();