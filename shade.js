
var Shade=function(shadeClickName){
	this.init(shadeClickName);
}

/*****************适应图片全屏显示*********************/
function adjustFrame(oimg,tolayer){
	if(oimg.width>window.screen.availWidth&&oimg.height>window.screen.availHeight){
		tolayer.style.left="0%";
		tolayer.style.top="0%";
		tolayer.style.transform="translate(0%,0%)";
		tolayer.style.position="absolute";
		return true;
	}
	else
		if(oimg.width>window.screen.availWidth&&oimg.height<window.screen.availHeight){
			tolayer.style.left="0%";
			tolayer.style.top="50%";
			tolayer.style.transform="translate(0%,-50%)";
			tolayer.style.position="absolute";
			return true;
		}
		else
			if(oimg.width<window.screen.availWidth&&oimg.height>window.screen.availHeight){
				tolayer.style.left="50%";
				tolayer.style.top="0%";
				tolayer.style.transform="translate(-50%,0%)";
				tolayer.style.position="absolute";
				return true;
			}
			else return false;

}

Shade.prototype={

	init:function(shadeClickName){

		var toLayerTarget=$("#tolayer");
		var shadeTarget=$("#shade");
		var shadeClick=$("."+shadeClickName);		

		var clickFlag=false;
		
		/**************显示浮出层*******************/
		addEvent(shadeClick,"click",function(){
			var oTarget=getEventTarget(event);
			var oimg=new Image();
			if(oTarget.tagName=="IMG"){
				toLayerTarget.style.display="block";
				shadeTarget.style.display="block";		
				oimg.src=oTarget.src;
				toLayerTarget.style.width=oimg.width.toString()+"px";
				toLayerTarget.style.height=oimg.height.toString()+"px";
				toLayerTarget.innerHTML="";
				toLayerTarget.appendChild(oimg);
				clickFlag=adjustFrame(oimg,toLayerTarget);
				toLayerTarget.getElementsByTagName("img")[0].className="showimg";
			}

		})

/**************浮出层隐藏*******************/
		shadeTarget.onclick=function(){
			toLayerTarget.style.display="none";
			shadeTarget.style.display="none";
			if(clickFlag==true){
				tolayer.style.left="50%";
				tolayer.style.top="50%";
				tolayer.style.transform="translate(-50%,-50%)";
				tolayer.style.position="fixed";
				clickFlag=false;
			}
		}

		toLayerTarget.onclick=function(){
			toLayerTarget.style.display="none";
			shadeTarget.style.display="none";
			if(clickFlag==true){
				tolayer.style.left="50%";
				tolayer.style.top="50%";
				tolayer.style.transform="translate(-50%,-50%)";
				tolayer.style.position="fixed";
				clickFlag=false;
			}
		}		
	},
}
