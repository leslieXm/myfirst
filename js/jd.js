/**
 * Created by Administrator on 2016/5/19.
 */
window.onload=function(){
    var hoverArr=utils.getElementsByClass('hover');

    for(var i=0;i<hoverArr.length;i++){
        +function(i) {
            hoverArr[i].onmouseover=function(){
                utils.addClass(this, 'hoverShow');
            }
            hoverArr[i].onmouseout=function(){
                utils.removeClass(this, 'hoverShow');
            }
        }(i)
    }
    var hoverArr=utils.getElementsByClass('hover2');
    for(var i=0;i<hoverArr.length;i++){
        +function(i) {
            hoverArr[i].onmouseover=function(){

                utils.lastChild(this).style.display="block"
            }
            hoverArr[i].onmouseout=function(){
                utils.lastChild(this).style.display="none"
            }
        }(i)
    }
    //左侧话费切换
    var  center=document.getElementById("center");
    var aTite=utils.getElementsByClass('mc-title',center)[0];
    var aLis=utils.getElementsByClass("fore");
    var aDiv=utils.getElementsByClass('show-cen', center);
    var mcShow=utils.getElementsByClass('mc-show', center);
    var btn=document.getElementById('btn');
    //var hoverArr=utils.getElementsByClass('hover3');
    var flag=false;
    for(var i=0;i<4;i++) {
        +function (i) {
            aLis[i].onmouseover= function () {
                if (flag && i == 3) {
                        return;
                    } else {
                    for(var j=0;j<aDiv.length;j++){
                        aDiv[j].style.display='none';
                        utils.removeClass(aLis[j], 'select');
                    }
                        utils.addClass(this.parentNode, 'hoverShow');
                        utils.addClass(this, 'select');
                        utils.addClass(mcShow[0], 'mc-show_animate');
                        aDiv[i].style.display='block';
                        flag = false;
                }
            };
            aLis[i].onmouseout = function () {
                    //utils.removeClass(this, 'select');
                    flag = false;
                mcShow[0].onmouseover= function () {
                    utils.addClass(aLis[i], 'select');
                    fromTab(aDiv[i]);
                }
                /*mcShow[0].onmouseout= function () {
                    utils.removeClass(aLis[i], 'select');
                }*/
            };
        }(i)
    }

    btn.onclick=function(){
        setTimeout(function(){
            utils.removeClass(aTite, 'hoverShow');
            utils.removeClass(aTite.children, 'select');
        },500);

        utils.removeClass(mcShow[0], 'mc-show_animate');
        flag=true;
    };
    //
    function fromTab(ele){
        var oBtn2=utils.getElementsByClass('btn2',ele)[0];
        var aBtn2Lis=oBtn2.getElementsByTagName('li');
        console.log(aBtn2Lis.length);
        var aFrom=utils.getElementsByClass('from',ele);
        for(var i=0;i<aBtn2Lis.length;i++) {
            +function (i) {
                aBtn2Lis[i].onmouseover= function () {
                    for(var j=0;j<aFrom.length;j++){
                        aFrom[j].style.display='none';
                        console.log(aBtn2Lis[j]);
                        utils.removeClass(aBtn2Lis[j], 'cur');
                    }
                    utils.addClass(this, 'cur');
                    aFrom[i].style.display='block';
                };
                /*aBtn2Lis[i].onmouseout = function () {
                    utils.removeClass(this, 'cur');
                };*/
            }(i)
        }
    }

    //floor切换
    //var  first=document.getElementById("floor1");
    //var aLis=utils.getElementsByClass('fr-list', first)[0].getElementsByTagName('li');
    //var aDiv=utils.getElementsByClass('fr', first);
    //setTab(aLis,aDiv);
    //var aDiv=utils.getElementsByClass('mc-shown', first);

    // 楼层切换优化
    var  floors=utils.getElementsByClass("floor")
    for(var i=0;i<floors.length;i++){
        (function(i){
            var curFloor=floors[i];
            var aLis=utils.getElementsByClass('fr-list',curFloor)[0].getElementsByTagName('li');
            var aDiv=utils.getElementsByClass('fr',curFloor);
            setTab(aLis,aDiv);

        })(i)
    }






};

//楼层轮播图
+function(){
    var slider=document.getElementById("slider")
    var sliders=utils.children(slider);
    var inner=sliders[0];
    var tip=sliders[1];
    var btn=sliders[2];
    var btns=utils.children(btn,"a");
    var imgList=utils.children(inner,"img");
    var oImg=imgList[0];
    inner.style.width=inner.offsetWidth+oImg.offsetWidth+"px";
    var leftBtn=btns[0];
    var rightBtn=btns[1];
    var oLis=utils.children(tip,"li");
    for(var i= 0;i<oLis.length;i++){
        var oLi=oLis[i];
        oLi.i=i;
        oLi.onclick=function(){
            console.log(this)
            animate(inner,{left:this.i*-444},700);
            tipsSelect(this.i);
            step=this.i
        }
    }

    function tipsSelect(n){
        if(n==imgList.length-1)n=0;
        for(var i=0;i<oLis.length;i++){
            oLis[i].className="";
        }
        oLis[n].className="select-red";
    }
    var step=0;
    function autoMove(){
        if(step==imgList.length-1){
            inner.style.left=0;
            step=0;
        }
        step++;
        animate(inner,{left:step*-444},700);
        tipsSelect(step)
    }

    var timer= setInterval(autoMove,2000);
    leftBtn.onclick=function(){
        if(step==0){
            leftBtn.style.display=rightBtn.style.display="block";
            step=imgList.length-1;
            animate.setCss(inner,"left",step*-444);
        }
        step--;
        animate(inner,{left:step*-444},700);
        tipsSelect(step)
    };
    rightBtn.onclick=function(){
        autoMove()
    };

    slider.onmouseover=function(){
        clearInterval(timer);
        leftBtn.style.display=rightBtn.style.display="block";
    };
    slider.onmouseout=function(){
        timer= setInterval(autoMove,2000);
        leftBtn.style.display=rightBtn.style.display="none";
    };



}();

//四张图的轮播图
+function(){
    var todayR=document.getElementById("todayR")
    var todayRs=utils.children(todayR);
    var Ban=todayRs[0];
    var btn=todayRs[1];
   var onners=utils.children(Ban,"div");
    var btns =utils.children(btn,"a");
    var leftBtn=btns[0];
    var rightBtn=btns[1];
    var oImg=onners[0];
    Ban.style.width=Ban.offsetWidth+oImg.offsetWidth+"px";
    var step=0;
    function autoMove(){
        if(step==4){
            Ban.style.left=0;
            step=0;
        }
        step++;
        animate(Ban,{left:step*-990},700);

    }

    var timer= setInterval(autoMove,2000);
    leftBtn.onclick=function(){
        if(step==0){
            Ban.style.left=(onners.length-1)*-1000+"px";
            step=onners.length-1;
            animate.setCss(Ban,"left",step*-990);
        }
        step--;
        animate(Ban,{left:step*-990},700);

    };
    rightBtn.onclick=function(){
        autoMove()
    };

    todayR.onmouseover=function(){
        clearInterval(timer);
        leftBtn.style.display=rightBtn.style.display="block";
    };
    todayR.onmouseout=function(){
        clearInterval(timer);
        leftBtn.style.display=rightBtn.style.display="none";
    };




}();
+function(){
    var con=document.getElementById("content");
    var cons=utils.children(con);
    var conner=cons[0];
    var tip=cons[1];
    var btn=cons[2];
    var btns=utils.children(btn,"a");
    var imgList=utils.children( conner,"img");
    var oLis=utils.children(tip,"li");
    var oImg=imgList[0];
    var leftBtn=btns[0];
    var rightBtn=btns[1];
    oImg.style.opacity=1;

    var interval=2000,timer=null;
    var timer=window.setInterval(autoMove,interval);
    var step=0;
    function autoMove(){
        if(step===imgList.length-1){
            step=-1;
           // animate.setCss(curDiv,"zIndex",1);
        }
        step++;
        setBanner();

    }
    function setBanner(){
        for(var i=0;i<imgList.length;i++){
            var curDiv=imgList[i];
            if(i===step){
                animate.setCss(curDiv,"zIndex",1);
                animate.setCss(curDiv,"opacity",1);

                animate(curDiv,{opacity:1},1000,function(){
                    var curDivSib=utils.siblings(this);
                    for(var k=0;k<curDivSib.length;k++){
                        animate.setCss(curDivSib[k],"opacity",0);
                       animate.setCss(curDivSib[k],"zIndex",0);
                    }
                });
                continue;
            }else{
                animate.setCss(curDiv,"opacity",0);
                animate.setCss(curDiv,"zIndex",0);
            }

        }
        for(i=0;i<oLis.length;i++){
            var curLi =oLis[i];
            i===step?utils.addClass(curLi,"select"):utils.removeClass(curLi,"select");
        }
    }
    con.onmouseover=function(){
        clearInterval(timer);
        leftBtn.style.display=rightBtn.style.display="block";
    };

    con.onmouseout=function(){
        timer=window.setInterval(autoMove,interval);
        leftBtn.style.display=rightBtn.style.display="none";
    };

    !function(){
        for (var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.i=i;
            curLi.onclick=function(){
                step=this.i;
                setBanner();
            }
        }
    }()
    rightBtn .onclick=autoMove;
    leftBtn.onclick=function(){
        if(step===0){
            step=imgList.length;
        }
        step--;
        setBanner();
    }
}();

//选项卡的公用方法
function setTab(aLis,aDiv){//划过切换
    for(var i=0;i<aLis.length;i++){
        var aLi=aLis[i];
        aLi.index=i;
        aLi.onmouseover=function(){
            for(var j=0;j<aLis.length;j++){
                utils.removeClass(aLis[j], "select");
                utils.removeClass(aDiv[j], "fr_show");
            }
            utils.addClass(this, "select");
            utils.addClass(aDiv[this.index], "fr_show");
        }
    }
}


//回到顶部

(function(){
    var goLink=document.getElementById("goLink");
    goLink.onclick=function(){
        window.scrollTo(0,0)
    }
})();


