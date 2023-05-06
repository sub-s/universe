var _chart = document.querySelectorAll('.top-chart .chart');
var _chartBar = document.querySelectorAll('.chart-bar');
var color = ['#9986dd','#fbb871','#bd72ac','#f599dc'] //색상
var newDeg = []; //차트 deg
function chartDraw(){ 
for( var i=0;i<_chartBar.length;i++){
    var _num = _chartBar[i].dataset.deg
    newDeg.push( _num )
}
var num = newDeg.length - newDeg.length;
_chart.forEach((c,i)=>{
    c.style.background = 'conic-gradient(#6be1d5 '+
        newDeg[num] + 'deg, #bdf89c '+
        newDeg[num] + 'deg ' + newDeg[num+1]+'deg, #ffdc8a '+
        newDeg[1]+'deg '+newDeg[2]+'deg, #ff6a93 '+
        newDeg[2]+'deg )';
})

// _chart.style.background = 'conic-gradient(#6be1d5 '+
//     newDeg[num] + 'deg, #bdf89c '+
//     newDeg[num] + 'deg ' + newDeg[num+1]+'deg, #ffdc8a '+
//     newDeg[1]+'deg '+newDeg[2]+'deg, #ff6a93 '+
//     newDeg[2]+'deg )';
}

function getHalfNoodle(el){
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
            if(time >= totalTime) clearInterval(_this.counterTimer);
        },num)
    }
    // const 
    const p = getPer()
    const deg = 180 * 0.01 * p;
    const styleRotate = "rotate("+ deg +"deg)";
    _txt.innerText = "0%";
    setTimeout(()=>{
        _needle.style.transform = styleRotate;
        if(p > 0) getCounting()
    },500);
    
    
}
const _halfChart = document.querySelectorAll(".half-chart");
_halfChart.forEach((c,i)=>{
    const p = Math.floor(Math.random() * 100);
    c.setAttribute("p",p);
    getHalfNoodle(c)
})
chartDraw();