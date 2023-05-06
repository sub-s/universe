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
chartDraw();