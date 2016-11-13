window.onload=function(){

	$(".loading").style.display="none";
	$(".rowphoto").style.display="block";

	var config={
		nameSelector:".rowphoto",
		padding:8,
		maxheight:250,
		minImg:3,
		maxImg:7,
	};

	var rowphoto=new RowPhoto(config);
	var shade=new Shade("rowphoto");

	console.log("%cby Christopher","color:#FE7979;font-size:20px;");
}