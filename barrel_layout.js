var RowPhoto=function(config){
	this.height=[];
	this.rowImg={};
	this.init(config);
}

RowPhoto.prototype={
	init:function(config){
		this.calHeight(config);
		this.render(config);
	},

/*****************计算每行图片数量和高度*****************/
	calHeight:function(config){

		var self=this;
		var config=config;
/*****************添加每个图片宽高之比*****************/
		function addImgWHRatio(oimg){
			for(var i=0;i<oimg.length;i++){
				oimg[i].WHRatio=oimg[i].width/oimg[i].height;
			}
		}

		function getRowImg(config,oimg){
			var temHeight,containHeight,cntRowNo=0,cntImgNo=0,sumofRatio=0,ophoto;
			ophoto=$(config.nameSelector);
			ophoto.style.padding=config.padding.toString()+"px";
			containHeight=ophoto.offsetWidth-config.padding*2-0.5;

			for(var i=0;i<oimg.length;i++){
				if(cntImgNo==0){
					self.rowImg[cntRowNo]=[];
				}//换行
				self.rowImg[cntRowNo].push(oimg[i]);
				
				sumofRatio=sumofRatio+oimg[i].WHRatio;
				cntImgNo++;

				temHeight=(containHeight-config.padding*2*cntImgNo)/sumofRatio;

				if(cntImgNo==config.maxImg){
					self.height[cntRowNo]=Math.floor(temHeight);
					cntRowNo++;
					sumofRatio=0;
					cntImgNo=0;
				}//图片数量达到最大值，换行
				else
					if(temHeight<=config.maxheight){
						if(cntImgNo==config.minImg||(cntImgNo>config.minImg&&cntImgNo<config.maxImg)){
							self.height[cntRowNo]=Math.floor(temHeight);
							cntRowNo++;
							sumofRatio=0;
							cntImgNo=0;
						}
					}//高度小于最小值且数量符合设置要求，换行
			}
			if(cntImgNo!=0){
				self.height[cntRowNo]=config.maxheight;
			}//设置最后数量未满一行的高度
		}

		var oimg;
		oimg=$(config.nameSelector).getElementsByTagName("img");
		addImgWHRatio(oimg);
		getRowImg(config,oimg);

	},

/*****************渲染*****************/
	render:function(config){

		var ophoto,tempStringRow="",tempStringImg="",imgArray=[],cntImg=0,rowArray=[],boxArray=[];
		ophoto=$(config.nameSelector);
		imgArray=ophoto.innerHTML.toString().match(/<img[^>]*>/g);
		ophoto.innerHTML="";

		for(var i=0;i<this.height.length;i++){
			for(var j=0;j<this.rowImg[i].length;j++){
				tempStringImg=tempStringImg+"<div class='imgbox'>"+imgArray[cntImg]+"</div>";
				cntImg++;
			}
			tempStringRow=tempStringRow+"<div class='row'>"+tempStringImg+"</div>";
			tempStringImg="";
		}
		ophoto.innerHTML=tempStringRow;
		rowArray=$$(".row");
		for(var i=0;i<rowArray.length;i++){
			rowArray[i].style.height=(this.height[i]+config.padding*2).toString()+"px";
		}
		boxArray=$$(".imgbox");
		for(var i=0;i<boxArray.length;i++){
			boxArray[i].style.padding=config.padding.toString()+"px";
		}

	}
}