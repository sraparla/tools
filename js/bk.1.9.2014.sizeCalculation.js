$(document).ready(function(){
	// Globals
	var addTop = 1.25;
	var addBottom = 1.25;
	var addLeft = 1.25;
	var addRight = 1.25;
	
	// Hides banner form fields on load
	$("#topsize").hide();
	$("#bottomsize").hide();
	$("#leftsize").hide();
	$("#rightsize").hide();
	$("#cutfile").hide();
	$("#psv_rigid").hide();
	$("#bottomtag").hide();
	

	
	//  Shows the from that you want to use when you pick the type from drop down 
	$("#choosetype").change(function(){
	   var n = $("#choosetype").val();
	//	   alert(n);
	   if(n=="PSV"){
	   	   $("#banner").hide();
	   	   $("#prosize").hide();
	   	   $("#cutfileheaderb").hide();
	   	   $("#cutfile").show();
	   	   $("#psv_rigid").show();
	   	   $("#bottomtag").show();
	   	   $("#cutfileheader").show();
	   	   $("#enter_size").html("Enter Your Size");
	   }
	   if(n=="Banner"){
	   		$("#banner").show();
	   		$("#prosize").show();
	   		$("#cutfile").hide();
	   		$("#psv_rigid").hide();
	   		$("#bottomtag").hide();
	   		$("#enter_size").html("Enter Your Final Size");
	   }
	   if(n=="Rigid"){
	   	   	$("#banner").hide();
	   	    $("#prosize").hide();
	   		$("#bottomtag").hide();
	   		$("#cutfileheader").hide();
	   		$("#cutfile").show();
	   		$("#psv_rigid").show();
	   		$("#cutfileheaderb").show();
	   		$("#enter_size").html("Enter Your Final Size");
	   }
	});
	
	
	// Calculates the Sq.Ft.
	$("#size").change(function(){
		//function doSomeMath() {
	    //get form
	  var form = document.getElementById("size");
	    //get output
	  var out = form.elements["sqft"];	        
	    //get two numbers
	  var h = parseInt(form.elements["height"].value);
	  var w = parseInt(form.elements["width"].value);
	  if(h>0 && w>0)
	  	{
	     out.value = ((h*w)/144).toFixed(0) + " SqFt";
	    }
	
	});
	
	// Shows or hides pocket size based on choice of Hem	
	$("#toptype").change(function(){
	   var n = $("#toptype").val();
	   if(n=="Hem"){
	   $("#topsize").hide();
	   }
	   else {
		$("#topsize").show();
	   }
	});
	
	// Shows or hides pocket size based on choice of Hem
	$("#bottomtype").change(function(){
	   var n = $("#bottomtype").val();
	   if(n =="Hem"){
	   $("#bottomsize").hide();
	   }
	   else {
		$("#bottomsize").show();
	   }
	});
	
	// Shows or hides pocket size based on choice of Hem
	$("#lefttype").change(function(){
	   var n = $("#lefttype").val();
	   if(n =="Hem"){
	   $("#leftsize").hide();
	   }
	   else {
		$("#leftsize").show();
	   }
	});
	
	// Shows or hides pocket size based on choice of Hem
	$("#righttype").change(function(){
	   var n = $("#righttype").val();
	   if(n =="Hem"){
	   $("#rightsize").hide();
	   }
	   else {
		$("#rightsize").show();
	   }
	});	
	
	// Calcs Top Need to Add for Bleed and White
	$("#toptype, #topsize, #topbleed").change(function(){
	  var t = $("#toptype").val(); // Top Pocket Type
	  var o = $("#topsize").val(); // Top Pocket Opening
	  var b = $("#topbleed").val(); // Top Bleed Value
	  if( t =="Hem"){
	  $("#topwhite").html(1.25-b);
	  addTop = (1.25); 
	  }
	  else {
	  $("#topwhite").html((o-b)+1);
	  addTop = (Number(o)+1); 
	  }
	});
		
	// Calcs Bottom Need to Add for Bleed and White
	$("#bottomtype, #bottomsize, #bottombleed").change(function(){
	  var t = $("#bottomtype").val(); // Top Pocket Type
	  var o = $("#bottomsize").val(); // Top Pocket Opening
	  var b = $("#bottombleed").val(); // Top Bleed Value
	  if( t =="Hem"){
	  $("#bottomwhite").html(1.25-b);
	  addBottom = (1.25);
	  }
	  else {
	  $("#bottomwhite").html((o-b)+1);
	  addBottom = (Number(o)+1);
	  }
	});
	
	// Calcs Left Need to Add for Bleed and White
	$("#lefttype, #leftsize, #leftbleed").change(function(){
	  var t = $("#lefttype").val(); // Top Pocket Type
	  var o = $("#leftsize").val(); // Top Pocket Opening
	  var b = $("#leftbleed").val(); // Top Bleed Value
	  if( t =="Hem"){
	  $("#leftwhite").html(1.25-b);
	  addLeft = (1.25);
	  }
	  else {
	  $("#leftwhite").html((o-b)+1);
	  addLeft = (Number(o)+1);
	  }
	});
	
	// Calcs Right Need to Add for Bleed and White
	$("#righttype, #rightsize, #rightbleed").change(function(){
	  var t = $("#righttype").val(); // Top Pocket Type
	  var o = $("#rightsize").val(); // Top Pocket Opening
	  var b = $("#rightbleed").val(); // Top Bleed Value
	  if( t =="Hem"){
	  $("#rightwhite").html(1.25-b);
	  addRight = (1.25);
	  }
	  else {
	  $("#rightwhite").html((o-b)+1);
	  addRight = (Number(o)+1);
	  }
	});
	
	// Calcs Prodcution Height
	$("#height, #toptype, #topsize, #topbleed, #bottomtype, #bottomsize, #bottombleed").change(function(){
	  var h = $("#height").val(); // Height
	  var hp = Number(h);
	  var top = Number(addTop);
	  var bot = Number(addBottom);
	  if(h>0)
	  	{
	     $("#pheight").val(top + bot + hp);  
	    }
	});
	
	// Calcs Production Width
	$("#width, #lefttype, #leftsize, #leftbleed, #righttype, #rightsize, #rightbleed").change(function(){
	  var w = $("#width").val(); // Width
	  var wp = Number(w);
	  var left = Number(addLeft);
	  var right = Number(addRight);
	  if(w>0)
	  	{
	     $("#pwidth").val(left + right + wp);  
	    }
	});
	
		// Calcs PSV and Rigid Height
	$("#height").change(function(){
	  var h = $("#height").val(); // Height
	  var hp = Number(h);
	  var top = Number(.125);
	  var bot = Number(.125);
	  if(h>0)
	  	{
	     $("#psize_height").val(top + bot + hp); 
	     $("#csize_height").val(hp);   
	    }
	});
	
	// Calcs PSV and Rigid Width
	$("#width").change(function(){
	  var w = $("#width").val(); // Width
	  var wp = Number(w);
	  var left = Number(.125);
	  var right = Number(.125);
	  if(w>0)
	  	{
	     $("#psize_width").val(left + right + wp);
	     $("#csize_width").val(wp);  
	    }
	});

});




