console.log("IndividualGraphFunctions")    

var brd = JXG.JSXGraph.initBoard('jxgbox',{boundingbox:[-10,100,100,-15],axis:true});
var color = ['blue','orange', 'green','red','magenta', 'black','yellow'];
var d;
var A;
var ABAM;
var myImg;
 var nr = 0;
 plotData(x,y,value);

/**************************************/
/*Plot data*/



function plotData(x,y,myName) {

    var c;
    var mycolor=nr%color.length;
    //var t = document.getElementById('jxgbox').value;
   // var data = t.split('\n');
  

    brd.setBoundingBox([-10,maxY+10,maxX+10,-10]);
 d = brd.create('curve',[x,y],{strokeColor:color[nr%color.length],strokeWidth: 3});

    var i=0;
    do{
        i=i+1;
    } while((img[i]=="nan") && (i<(x.length-1)));
    console.log(x.length-1) 
    
document.getElementById("BAMimg").innerHTML='<img src="BAMRaw/'+img[i]+'">';
ABAM = brd.create('glider',[x[i],y[i],d], {strokeColor:"black",fillColor:'blue',setStyle:3});
   
          
        //colorLegend.push(nr%color.length);
    A=brd.create('glider',[x[0],y[0],d], {name:'['+String(x[0])+','+String(y[0])+']', strokeColor:"black",fillColor:'white'});
  
   brd.update();
};
 
function plotMyDB(){
var value =document.getElementById("myIsothermPlot").innerHTML;
    value=value.trim();
console.log(value);
    plotData(x,y,value);
};
 

 
    
    d.on('mousemove', function(e) {

       
         brd.removeObject(A);
   var myCords= getMouseCoords(e);
          console.log(myCords)
        var myX=FindNearestImg(myCords[0],x);
        var indexData=x.indexOf(myX);
         console.log(indexData)
        var myY=y[indexData];
        
               var imgIndex=FindNearestImg(indexData,imgArray);
   brd.removeObject(ABAM);
    ABAM = brd.create('glider',[ x[imgIndex],  y[imgIndex],d], { name:"",strokeColor:"black",fillColor:'blue'});
      
    document.getElementById("BAMimg").innerHTML='<img src="BAMRaw/'+img[imgIndex]+'">';
    
   A = brd.create('glider',[myX, myY,d], {name:'['+String(myX)+','+String(myY)+']', strokeColor:"black",fillColor:'white'});
     document.getElementById("sliderVal").value=indexData;

       
}); 
     


function movePoint(){
        //Select the index of the data
    brd.suspendUpdate();
var indexData=Math.ceil(document.getElementById("sliderVal").value);
var myX=x[indexData];
var myY=y[indexData];
    console.log("PLOT VALUES")
   
    console.log( indexData)
//BAM image     
        var imgIndex=FindNearestImg(indexData,imgArray);
   brd.removeObject(ABAM);
    ABAM = brd.create('glider',[ x[imgIndex],  y[imgIndex],d], { name:"",strokeColor:"black",fillColor:'blue'});
      
    document.getElementById("BAMimg").innerHTML='<img src="BAMRaw/'+img[imgIndex]+'">';
    
         brd.removeObject(A);
       // brd.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
    A = brd.create('glider',[ myX, myY,d], {name:'['+String(myX)+','+String(myY)+']', strokeColor:"black",fillColor:'white'});
    //var point = brd.create('point', [0, 0], {withLabel: false, size: 1});


    
        brd.unsuspendUpdate();
}
   
function FindNearestImg(index,imgArray){
    var closest=imgArray.reduce(function(prev, curr) {
  return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
});
    return closest;
}

function getMouseCoords(e) {
    var i;
        var cPos = brd.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0]-cPos[0],
            dy = absPos[1]-cPos[1];
   
        var obj=new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], brd)
      
            var label=[Math.round((obj.usrCoords[1] + Number.EPSILON) * 100) / 100,Math.round((obj.usrCoords[2] + Number.EPSILON) * 100) / 100]
        return [obj.usrCoords[1], obj.usrCoords[2], label[0],label[1]];
    }

