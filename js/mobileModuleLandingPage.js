
$(document).on( "pageinit", "#inventory", function() {
    //alert("2");
    $('li').each(function(index){
        var elementID = $(this).attr("id");
        elementID = '#'+ elementID;
         $(function(){
             $(elementID).on('click',function(event){
                 alert(elementID);
                 //$("#displayLocation").text(elementID);
             });

         });
    });

});


$(document).on( "pageinit", "#locations", function() {
    //alert("3");
    //var localurl = "http://192.168.1.202/app/";
    $( "#autocompletelocation" ).on( "listviewbeforefilter", function ( e, data ) {
            var $ul = $( this ),
                $input = $( data.input ),
                value = $input.val(),
                html = "";
                $ul.html( "" );
            if ( value && value.length > 0 ) {
                //alert("4");
                $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
                $ul.listview( "refresh" );
                $.ajax({
                    url: "inventoryLocations/inventorylocationcontroller/getLocation",
                    dataType: "json",
                    type: "post",
                    crossDomain: true,
                    data: {
                        q: $input.val()
                    }
                })
           .then( function ( response ) {
                $.each( response, function ( i, val ) {
                    html += '<li id="'+val.kp_InventoryLocationID+'"> <a id="test"  href="#" data-transition="slide">'+ val.t_Location +'</a></li>';
                });
                $ul.html( html );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
                $(html).each(function(index){
                    var elementID = $(this).attr("id");
                    //alert("hiii"+elementID);
                    elementID= '#'+ elementID;
                     $(function(){
                         $(elementID).on('click',"#test",function(event){
                             //alert("Inside Function"+elementID);
                             //alert("heyey"+$(this).text());
                             $("#itemHeadingPage").html($(this).text());
                             //$("#itemHeadingPage").html($(this).text());
                             
                             var location = "/apps/inventoryLocationItems/inventorylocationitemcontroller/getLocation/" + elementID.replace('#','');
                             $("#inventoryLocationIDHidden").val(elementID.replace('#',''));
                             $("#itemlist").load(location,function(responseTxt,statusTxt,xhr){
                             $("#itemlist").listview( "refresh" );
                             $("#itemlist").trigger( "updatelayout");
                             });
                             $.mobile.changePage("#items",{transition:"slide"});                                 
                             });

                         });
                    });
                });
            }
       });       
});
$(document).on( "pageinit", "#items", function(e) {
     //alert("hhhghghi");
     $("#itemlist").on('click','li a',function(){
         var inventoryLocationItemsArr  = $(this).attr('id');
         var inventoryLocationItems     = inventoryLocationItemsArr.split(",");
         $("#locationInventoryItemIDEdit").html($("#itemHeadingPage").html()+" "+inventoryLocationItems[1]);
         
         $("#inventoryLocationItemIDHidden").val(inventoryLocationItems[0]);
         $("#inventoryItemIDHidden").val(inventoryLocationItems[1]);
         
         $("#sliderDynamicEdit").val(inventoryLocationItems[2]);
         
         $("#sliderDynamicEdit").slider('refresh');
         $("#editInvitemLocation").popup("open");
         return false;
     });
     
     //------------------------- Start of Add Option (POP UP WINDOW)------------------------------------------------------------------//
     $("#addInvItemLocationPopupBtn").on("click",function (){
         $("#locationInventoryItemIDAdd").html($("#itemHeadingPage").html());
         $("#addInvItemLocation").popup("open");
         //alert("hi"+$("#inventoryLocationIDHidden").val());
         
     });
     $("#incrementSlideDynamicByFiftyAdd").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicAdd").val();
         currentSliderValue     = parseFloat(currentSliderValue) +50;
         
         //-----------set slider max value --------
         //alert("Before: "+$("#sliderDynamicEdit").attr('max'));
         var currentSliderMax   = $("#sliderDynamicAdd").attr('max');
         var updatedSliderMax   = parseFloat(currentSliderMax) + 50;
         $("#sliderDynamicAdd").attr('max',updatedSliderMax);
         //alert("After: "+$("#sliderDynamicEdit").attr('max'));
         //-----------set slider max value --------
         
         $("#sliderDynamicAdd").val(currentSliderValue);
         $("#sliderDynamicAdd").slider('refresh');
         
         return false;
         
     });
     $("#incrementSlideDynamicByOneAdd").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicAdd").val();
         currentSliderValue++;
         $("#sliderDynamicAdd").val(currentSliderValue);
         $("#sliderDynamicAdd").slider('refresh');
         
         return false;
     });
     
     $("#decrementSlideDynamicByOneAdd").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicAdd").val();
         currentSliderValue--;
         $("#sliderDynamicAdd").val(currentSliderValue);
         $("#sliderDynamicAdd").slider('refresh');
         
         return false;
     });
     
     $("#incrementSlideDynamicByPointTwoFiveAdd").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicAdd").val();
         currentSliderValue= parseFloat(currentSliderValue)+0.25;
         $("#sliderDynamicAdd").val(currentSliderValue);
         $("#sliderDynamicAdd").slider('refresh');
         
         return false;
     });
     $("#incrementSlideDynamicByPointFiveAdd").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicAdd").val();
         currentSliderValue= parseFloat(currentSliderValue)+0.5;
         $("#sliderDynamicAdd").val(currentSliderValue);
         $("#sliderDynamicAdd").slider('refresh');
         
         return false;
     });
     $("#incrementSlideDynamicByPointSevenFiveAdd").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicAdd").val();
         currentSliderValue= parseFloat(currentSliderValue)+0.75;
         $("#sliderDynamicAdd").val(currentSliderValue);
         $("#sliderDynamicAdd").slider('refresh');
         
         return false;
     });
     
     
      $("#addInvItemLocationFrmSaveBtn").on("click",function (){
        //alert("Inside Save Btn:1 ");
        $.ajax({
                url: "inventoryLocationItems/inventorylocationitemcontroller/insertInvLocationItem",
                type: 'POST',
                data: $("#addInvItemLocationFrm").serialize(),
                success: function(response){
                     //alert(response);
                     
                     var inventoryLocationID = $.trim(response);
                     
                     //alert("inventoryLocationID: "+inventoryLocationID);
                     
                     //close the form
                     $("#addInvItemLocation").popup("close");
                     
                     // clear the form
                     $("#addInvItemLocation").clearForm();
                     
                     //alert("Inside Save Btn:2 ");
                     
                     var location = "/apps/inventoryLocationItems/inventorylocationitemcontroller/getLocation/" + inventoryLocationID;
                     
                     //alert("Inside Save Btn:3 ");
                     
                     $("#itemlist").load(location,function(responseTxt,statusTxt,xhr){
                     $("#itemlist").listview("refresh" );
                     
                     $("#itemlist").trigger("updatelayout");
                     
                     
                     //alert("Inside Save Btn:4 ");
                     
                     });
                }
         })
     });
     
     //------------------------- End of Add Option (POP UP WINDOW)------------------------------------------------------------------//
     
     
     //------------------------- Start of Edit Option (POP UP WINDOW)------------------------------------------------------------------//
     $("#incrementSlideDynamicByFiftyEdit").live('click',function(e){
         var currentSliderValue = $("#sliderDynamicEdit").val();
         currentSliderValue     = parseFloat(currentSliderValue) +50;
         
         
         //-----------set slider max value --------
         //alert("Before: "+$("#sliderDynamicEdit").attr('max'));
         var currentSliderMax   = $("#sliderDynamicEdit").attr('max');
         var updatedSliderMax   = parseFloat(currentSliderMax) + 50;
         $("#sliderDynamicEdit").attr('max',updatedSliderMax);
         //alert("After: "+$("#sliderDynamicEdit").attr('max'));
         //-----------set slider max value --------
         
         $("#sliderDynamicEdit").val(currentSliderValue);
         $("#sliderDynamicEdit").slider('refresh');
         
         
         return false;
          
     });
     $("#incrementSlideDynamicByOneEdit").live('click',function(e){
         //alert("hi");
         var currentSliderValue = $("#sliderDynamicEdit").val();
         currentSliderValue++;
         $("#sliderDynamicEdit").val(currentSliderValue);
         $("#sliderDynamicEdit").slider('refresh');
         
         return false;
     });
     $("#decrementSlideDynamicByOneEdit").live('click',function(e){
         //alert("hi");
         var currentSliderValue = $("#sliderDynamicEdit").val();
         currentSliderValue--;
         $("#sliderDynamicEdit").val(currentSliderValue);
         $("#sliderDynamicEdit").slider('refresh');
         
         return false;
     });
     $("#incrementSlideDynamicByPointTwoFiveEdit").live('click',function(e){
         //alert("hi");
         var currentSliderValue = $("#sliderDynamicEdit").val();
         currentSliderValue= parseFloat(currentSliderValue)+0.25;
         $("#sliderDynamicEdit").val(currentSliderValue);
         $("#sliderDynamicEdit").slider('refresh');
         
         return false;
     });
     $("#incrementSlideDynamicByPointFiveEdit").live('click',function(e){
         //alert("hi");
         var currentSliderValue = $("#sliderDynamicEdit").val();
         currentSliderValue= parseFloat(currentSliderValue)+0.5;
         $("#sliderDynamicEdit").val(currentSliderValue);
         $("#sliderDynamicEdit").slider('refresh');
         
         return false;
     });
     $("#incrementSlideDynamicByPointSevenFiveEdit").live('click',function(e){
         //alert("hi");
         var currentSliderValue = $("#sliderDynamicEdit").val();
         currentSliderValue= parseFloat(currentSliderValue)+0.75;
         $("#sliderDynamicEdit").val(currentSliderValue);
         $("#sliderDynamicEdit").slider('refresh');
         
         return false;
     });
    
     $("#editInvItemLocationFrmDeleteBtnEdit").on("click",function (){
         //alert("Inside Delete Function: ");
         $.ajax({
              url: "inventoryLocationItems/inventorylocationitemcontroller/deleteInvLocationItemRecord",
              type: 'POST',
              data: $("#editInvItemLocationFrm").serialize(),
              success: function(response){
                  var inventoryLocationID = $.trim(response);
                  //alert(response);
                  $("#editInvitemLocation").popup("close");
                  
                  // clear the form
                  $("#editInvItemLocationFrm").clearForm();
                  
                  var location = "/apps/inventoryLocationItems/inventorylocationitemcontroller/getLocation/" + inventoryLocationID;
                 
                  $("#itemlist").load(location,function(responseTxt,statusTxt,xhr){
                  $("#itemlist").listview("refresh" );
                  $("#itemlist").trigger("updatelayout");
                  }); 
                 
                  
                  //$.mobile.changePage("#locations",{transition:"slide"});
              }
             
         })
     });
     $("#editInvItemLocationFrmSaveBtnEdit").on("click",function (){
        //alert("Inside Save Btn:1 ");
        $.ajax({
                url: "inventoryLocationItems/inventorylocationitemcontroller/updateInvLocationItem",
                type: 'POST',
                data: $("#editInvItemLocationFrm").serialize(),
                success: function(response){
                     //alert(response);
                     var inventoryLocationID = $.trim(response);
                     //alert("inventoryLocationID: "+inventoryLocationID);
                     //close the form
                     $("#editInvitemLocation").popup("close");
                     
                     // clear the form
                     $("#editInvItemLocationFrm").clearForm();
                     
                     //alert("Inside Save Btn:2 ");
                     
                     var location = "/apps/inventoryLocationItems/inventorylocationitemcontroller/getLocation/" + inventoryLocationID;
                     
                     //alert("Inside Save Btn:3 ");
                     
                     $("#itemlist").load(location,function(responseTxt,statusTxt,xhr){
                     $("#itemlist").listview("refresh" );
                     
                     $("#itemlist").trigger("updatelayout");
                     
                     
                     //alert("Inside Save Btn:4 ");
                     
                     });
                }
         })
     });
     //-------------------------End of Edit Option (POP UP WINDOW)---------------------------------------------------------------------//
     
     
     
     
     
// function refreshPage() {
//  $.mobile.changePage(
//        window.location.href,
//        {
//          allowSamePageTransition : true,
//          transition              : 'none',
//          showLoadMsg             : false,
//          reloadPage              : true
//        }
//  );
//}
     

     
     
     
});
$(document).on( "pageinit", "#searchItems", function() {
    $( "#autoCompleteItemDescription" ).on( "listviewbeforefilter", function ( e, data ) {
          var $ul = $( this ),
              $input = $( data.input ),
              value = $input.val(),
              html = "";
              $ul.html( "" );
              
          if (value && value.length > 2) 
          {
              //alert(value);
              var matchValue = /^(\d*"*\w*)\s*((\d*"*\w*)\s*){1,}$/;
              var matchFound  = matchValue.exec(value);
              if(matchFound)
              {
                 //alert("Matched: "+ value);
                 var processValue = "";
                 var processValueArr = value.split(" ");
                 for(var i=0;i<=processValueArr.length;i++)
                 {
                     //alert(processValueArr[i]);
                     if(processValueArr[i] != null && processValueArr[i] !="")
                     {
                          processValue += "+"+processValueArr[i]+"* ";
                         
                     }    
                    
                     
                 }    
               }    
               //alert(processValue);
               $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
               $ul.listview( "refresh" );
               $.ajax({
                   url: "inventoryItems/inventoryitemcontroller/getInventoryItemLocationInfoFromDescription",
                   dataType: "json",
                   type: "post",
                   data: {
                       x: processValue
                        //x: $input.val()
                   }
                    
               })
               .then( function ( response ) {
                    $.each( response, function ( i, val ) {
                    html += '<li class="invItemListID" id="'+val.kp_InventoryItemID+'"><a class="invItemListDetail" style="white-space: pre-wrap;" id="invItemIDDetail"  href="#" data-transition="slide">'+ val.t_description +'</a><span class="ui-li-count">'+parseFloat(val.total)+'</span> </li>';
                    });
                    $ul.html( html );
                    $ul.listview( "refresh" );
                    $ul.trigger( "updatelayout");
               });
          }
    });
    //$(".orderIDCompanyNameLi").live("click",".orderIDCompanyNameAnchor",function(){
    $(".invItemListID").live("click",".invItemListDetail",function(){
          var $xl              = $("#invBottomFrmList");
          var htmlxl           = "";
          $xl.html("");
          
         $("#inventoryItemIDHeadingPage").html("Inv# "+$(this).attr('id'));
         var invItemID        = $(this).attr('id');
         
         $.ajax({
             url: "inventoryItems/inventoryitemcontroller/getInvItemTopList/"+invItemID,
             dataType: "json",
             type:"post",
             error: function(xhr,status,error){
                 alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
             }
//             data: {
//                 inventoryItemID: invItemID
//             }
         })
         .then( function(response){
             $("#vendorName").val(response.t_CompanyName);
             $("#vendorID").val(response.t_PartNumber);
             
             $("#category").val(response.t_ItemCategory);
             $("#description").val(response.t_description);
             
             $("#inventoryName").val(response.t_InvType+" "+parseFloat(response.OH)+" "+" "+response.Min+" "+response.Max);
             
         });
         $.ajax({
             url: "inventoryItems/inventoryitemcontroller/getInvItemBottomList/"+invItemID,
             dataType: "json",
             type:"post",
             error: function(xhr,status,error){
                 alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
             }
              
         })
         .then( function(response){
             $.each( response, function ( i, val ) {
                      htmlxl += '<li id="'+val.kp_InventoryItemID+'"><a href="#" >'+val.t_Location+'<span class="ui-li-count">'+parseFloat(val.n_QntyOnHand)+'</span></a></li>';
              });
              $xl.html( htmlxl );
              $xl.listview( "refresh" );
              $xl.trigger( "updatelayout");
             
         });
         $.mobile.changePage("#invItemDetailsPage",{transition:"slide"});  
    });
    
});