
 $("#jobStatusDetailsPage" ).live( "pageshow", function(event) {
      //alert("hi");
      //var wi = $(window).width();
      //alert(wi);
      var orderID          = $("#getOrderIDHidden").val();
      
      var pageRequest      = $("#getPgaeRequestFrom").val();
      
      var $xl              = $("#displayOrderIDDashNum");
      var htmlxl           = "";
      $xl.html("");
      
      var $vl              = $("#displayJobStatus");
      var htmle            = "";
      $vl.html("");
      
      if(orderID != null && orderID != "")
      {
           $.ajax({
              url: "mobile/mobilecontroller/getMobileOrderItemDashNum",
              dataType: "json",
              type:"post",
              error: function(xhr,status,error){
                   alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
               },
              data: {
                orderID: orderID
              }
           })
           .then( function ( response ) {
              $.each( response, function ( i, val ) {
                          //--Start Height in Feet and Inches ---//
                          var heightFullFeet             = parseFloat(val.n_HeightInInches)/12;
                          var heightJustFeet             = Math.floor(heightFullFeet);
                          var heightDecimalFeetInInches  = Math.round((heightFullFeet - heightJustFeet) * 12);
                          //alert(heightDecimalFeetInInches);
                          //-- End Height in Feet and Inches ---//
                          
                          //--Start Width in Feet and Inches ---//
                          var widthFullFeet             = parseFloat(val.n_WidthInInches)/12;
                          var widthJustFeet             = Math.floor(widthFullFeet);
                          var widthDecimalFeetInInches  = Math.round((widthFullFeet - widthJustFeet) * 12);
                          //--End Width in Feet and Inches ---//
                          
                          var dateReceived              = val.d_Received;
                        
                          if(val.t_OrderItemImage !=null)
                          {
                              var dateReceivedArr       = dateReceived.split("-");
                              var imageurl              = "http://192.168.1.213/images/Orders/"+dateReceivedArr[0]+'/'+dateReceivedArr[1]+'/'+val.kf_OrderID+'/'+val.kp_OrderItemID+'/'+val.t_OrderItemImage;
                              htmlxl += '<li id="'+val.kp_OrderItemID+','+'orderItemChange'+','+val.kf_OrderID+'"><a id="displayOrderDashNum" href="" data-transition="slide"><img width="80" height"80" class="ui-li-thumb" src='+imageurl+'>-' +val.n_DashNum +' '+val.t_EquipAbr+' '+val.t_Name+' <h2>Qty '+val.n_Quantity+' '+Number(heightJustFeet)+'\' '+Number(heightDecimalFeetInInches)+'" x '+Number(widthJustFeet)+'\' '+Number(widthDecimalFeetInInches)+'"'+'</h2><h2> '+val.t_OiStatus+'</h2></a></li>';
                          }
                          else
                          {
                              htmlxl += '<li id="'+val.kp_OrderItemID+','+'orderItemChange'+','+val.kf_OrderID+'"><a id="displayOrderDashNum" href="" data-transition="slide">-' +val.n_DashNum +' '+val.t_EquipAbr+' '+val.t_Name+' <h2>Qty '+val.n_Quantity+' '+Number(heightJustFeet)+'\' '+Number(heightDecimalFeetInInches)+'" x '+Number(widthJustFeet)+'\' '+Number(widthDecimalFeetInInches)+'"'+'</h2><h2> '+val.t_OiStatus+'</h2></a></li>';
                              
                          }    
                         
                          
                          
                          
                          //htmlxl += '<li id="'+val.kp_OrderItemID+','+'orderItemChange'+','+val.kf_OrderID+'"><a id="displayOrderDashNum" href="" data-transition="slide">-'+ val.n_DashNum +' '+val.t_EquipAbr+' '+val.t_Name+ '<h2>    Qty '+val.n_Quantity +' '+Number(val.n_HeightInInches)+'"x'+Number(val.n_WidthInInches)+'"'+'</h2><h2>'+val.t_OiStatus+'</h2></a></li>';
              });
              $xl.html( htmlxl );
              $xl.listview("refresh");
              $xl.trigger("updatelayout");

           });
           $.ajax({
              url: "mobile/mobilecontroller/getMobileJobStatusFromOrderID",
              dataType: "json",
              type:"post",
              error: function(xhr,status,error){
                 alert("hello Please Contact IT (Error): "+ xhr.status+"-"+error);
              },
              data:  {
                 orderID: orderID
              }

           })
           .then(function(response) {
              if(response.t_JobStatus == "Multi Line Status")
              {
                  htmle ='<li id="'+response.kp_OrderID+','+'orderChange">'+response.t_JobStatus+'</li>';
                  $("#getOrderJobStaus").val("show");
              }
              else
              {
                  htmle ='<li class="li-top" id="'+response.kp_OrderID+','+'orderChange"> <a id="editJobStatusDetailsPage" href="" data-transition="slide">' +  response.t_JobStatus +'</a></li>';
                  $("#getOrderJobStaus").val("Dontshow");  
              }
              $("#displayOrderIDValue").text(orderID);
              //alert(response.n_OICSqFtSum);
              $("#orderItemCountValue").text(Number(response.n_OrderItemCount));
              $("#oicSqFtSumValue").text(parseFloat(response.n_OICSqFtSum).toFixed(2));
              //alert("SqFtSum: "+parseFloat(response.n_OICSqFtSum).toFixed(2));

              $("#durationTimeValue").text(Number(response.n_DurationTime));
              //alert("duration time: "+response.n_DurationTime)
              $("#machineAbbValue").text(response.t_MachineAb);

              $("#complexityValue").text(Number(response.n_Complexity));

              $("#orderItemAbValue").text(response.t_OrderItemAb);
              $("#ordShipValue").text(response.t_OrdShip);
              
              var jobDueDate       = response.d_JobDue;
              var jobDueDateArr    = jobDueDate.split("-");
              var jobDueDateFormat = jobDueDateArr[1]+"-"+jobDueDateArr[2]+"-"+jobDueDateArr[0];
              
              var orderInfoText =response.t_CustCompany+"\n"+response.t_JobName+"\n"+"Due: "+jobDueDateFormat+"  "+response.ti_JobDue;
              
              //----Inspection Form -------//
              $("#companyNameInspectionFrm").val(response.t_CustCompany);
              //----Inspection Form -------//
              
              $("#mobileOrderInfo").text(orderInfoText);
              
              $vl.html(htmle); 
              $('.ui-table-columntoggle-btn').hide();
              $vl.listview( "refresh");
              $("#order-table").trigger("refresh");  
              $vl.trigger( "updatelayout");
           });
           
           $('#displayJobStatus').on('click', 'li.li-top', function(e) {
                //alert("displayJobStatus: ");
                var getElements   =  $(this).attr('id');
                var getElementArr = getElements.split(",");
                
                $("#displayFormJobNumber").text("ID: "+getElementArr[0]);

                $.ajax({
                            url: "statusLog/statuslogcontroller/getJobStatus/"+getElementArr[0]+'/'+getElementArr[1],
                            dataType: 'json',
                            error: function(xhr,status,error){
                               alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                            }
                      })
                      .then(function(response) {
                          $("#currentStatus").val(response['t_JobStatus']);
                      });

                $("#orderIDHidden").val(getElementArr[0]);  

                $("#statusChangeRequestHidden").val("orderChange");

                $.mobile.changePage("#editJobStatusDetailsPage",{transition:"slide"});
                e.preventDefault();
           });
           
           
           $("#displayOrderIDDashNum").on('click','li',function(e){
               
               // -----Start Inspection Data Hidden Start-----//
               var inspectionData   = $(this).find('a').text(); //find the text inside <ul> <li> <a>
               
               $("#inspectionDataHidden").val(inspectionData);
               
               // -----End Inspection Data Hidden End-----//
               
               var getElements      =  $(this).attr('id');
               //alert(getElements);
               var getElementArr    = getElements.split(",");
               
               var $zl              = $("#displayOrderIDDashNumJobStatus");
               var vtmle            = "";
               
               var $rs              = $("#displayMobileProductBuild");
               var rstmle           = "";
               
               var $tl              = $("#inspectionFrmLink");
               var intmle           = "";
               
             
               
               $zl.html("");
               $rs.html("");
               $tl.html("");
               
               
               intmle = '<li><a  data-transition="slide" href="#mobileInspectionUploadDetailsPage">Inspection Form</a></li>';
              
               $tl.html(intmle);
              
               $.ajax({
                   url: "mobile/mobilecontroller/getMobileDisplayProductBuild/"+getElementArr[0],
                   error: function(xhr,status,error){
                               alert(xhr.status+"-"+error+" Please Contact IT (Error): ");
                   }
                   
               })
               .then( function (response) {
                   for(var x=0; x<response.length; x++)
                   {
                       //rstmle +='<li data-role="list-divider">'+response[x].t_Category+'</li><li><h2>'+response[x].DisplayName+'</h2>';
                      
                       rstmle = response;
                   }    
                   $rs.html(rstmle);
                   //$rs.listview( "refresh" );
                   //$rs.trigger( "updatelayout");
                   
               });
               $.ajax({
                   url: "statusLog/statuslogcontroller/getJobStatus/"+getElementArr[0]+'/'+getElementArr[1],
                   dataType: 'json',
                   error: function(xhr,status,error){
                               alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                   } 
               })
               .then( function ( response ) {
                  
                   if( $("#getOrderJobStaus").val() == "show")
                   {
                       vtmle ='<li  class="li-bottom" id="'+response.kp_OrderItemID+','+'orderItemChange"><a href="">'+response['orderItemJobStatus']+'</a></li>';
                       
                   }
                  
                   $("#displayHeaderOrderIDDash").text(response['kf_OrderID']+"-"+response['n_DashNum']);
                 
                   $("#mobileUploadOrderID").val(response['kf_OrderID']);
                   $("#mobileUploadDashNum").val(response['n_DashNum']);
                  
                   
                   $zl.html(vtmle); 
                  
                   //$zl.listview("refresh");
                  
                   //$zl.trigger( "updatelayout");
                  
                   
                   
                   
                   //--Start--inspection form OrderItemID Hidden -------Start---//
                   
                   $("#inspectionOrderItemID").val(getElementArr[0]);  
                   
                   //--End------inspection form OrderItemID Hidden ------End----//
                   
                   
                   
                   //--Start--Mobile Uplaod form OrderItemID Hidden -------Start---//
                   $("#mobileUploadOrderItemID").val(getElementArr[0]);
                   $("#mobileUploadPageRequest").val(pageRequest);
                   //--End------Mobile Uplaod form OrderItemID Hidden ------End----//
                   
                   $("#orderItemIDHidden").val(getElementArr[0]);  
                  
                   $("#statusChangeRequestHidden").val("orderItemChange"); 
                   //alert("hi1");
                   $.mobile.changePage("#orderItemJobStatusDetailsPage",{transition:"slide"});
                  
                   e.preventDefault();
                   
               });
               //window.location.href = "mLineItemsView/"+getElementArr[0]+"/"+getElementArr[1]+"/"+$("#getOrderJobStaus").val();
                
           });
          
      }    
      $("#jobStatusDetailsPageBackBtn").click(function(e){
          //alert($("#getPgaeRequestFrom").val());
          if($("#getPgaeRequestFrom").val() == "pageRequestFromjobDueDate")
          {
              window.location.href ="mobileOrderStatus#searchByDueDate";
              
          }
          if($("#getPgaeRequestFrom").val() == "pageRequestFromjobNumber")
          {
              window.location.href ="mobileOrderStatus#searchFromJobNumber";
              
          }    
          
      });
 });
 

     

(function(window, $, PhotoSwipe){ 
$("#orderItemJobStatusDetailsPage" ).live( "pageshow", function(e) {
    
    var $di              = $("#displayOrderItemImage");
    var oim              = ""; 
    $.ajax({
       url: "mobile/mobilecontroller/displayOrderItemImage/"+ $("#mobileUploadOrderItemID").val()+"/"+$("#getOrderIDHidden").val(),
       dataType: "json",
       error: function(xhr,status,error){
                   alert("Hell Please Contact IT (Error): "+ xhr.status+"-"+error);
       }       
    })
    .then(function(response){
        //alert(response.dateReceived);
        var dateReceived              = response.dateReceived;
        if(response.orderItemImage !=null)
        {
            var dateReceivedArr       = dateReceived.split("-");
            var imageurl              = "http://192.168.1.213/images/Orders/"+dateReceivedArr[0]+'/'+dateReceivedArr[1]+'/'+response.orderID+'/'+response.orderItemID+'/'+response.orderItemImage;
            oim                       ='<img class="ulTest" src='+imageurl+'>';
        }
        $di.html(oim);
       
        
    });
   
    
    var $zl              = $("#displayOrderIDDashNumJobStatus");
    var $rs              = $("#displayMobileProductBuild");
    var $tl              = $("#inspectionFrmLink");
  
  
  
    
    
   
    
    $zl.listview("refresh");
    $zl.trigger( "updatelayout");
    
 
    $rs.listview("refresh" );
    $rs.trigger("updatelayout");
   
    $tl.listview("refresh");
    $tl.trigger( "updatelayout");

    
    
    $("#orderItemJobStatusDetailsPageBackBtn").click(function(e){
        window.location.href ="mLineItems/"+$("#getOrderIDHidden").val()+"/"+$("#getPgaeRequestFrom").val();
    });
    
    $('#displayOrderIDDashNumJobStatus').on('click', 'li.li-bottom', function(e) {
      var getElements     =  $(this).attr('id');
      var getElementArr   = getElements.split(",");
      var currentOIStatus = $('a', this).text();
      var orderIDArr      = $("#displayHeaderOrderIDDash").text().split("-");
     
      $("#currentStatus").val(currentOIStatus);
      $("#orderItemIDHidden").val(getElementArr[0]);
      $("#statusChangeRequestHidden").val(getElementArr[1]);

      $("#displayFormJobNumber").text("ID: "+orderIDArr[0]);
      $("#orderIDHidden").val(orderIDArr[0]);  
      $.mobile.changePage("#editJobStatusDetailsPage",{transition:"slide"});
      e.preventDefault();
              
    });
                     
    var $gl              = $("#GalleryImages");
    var imgle            = "";
    $.ajax({
       url: "mobile/mobilecontroller/getImageContent/"+ $("#mobileUploadOrderItemID").val()+"/"+$("#getOrderIDHidden").val(),
       error: function(xhr,status,error){
                   alert("Hell Please Contact IT (Error): "+ xhr.status+"-"+error);
       }       
    })
   .then( function (response) {
       //alert(response.length);
       if(response.length>0)
       {
           for(var x=0; x<response.length; x++)
           {
               imgle = response;
           }
           //alert("iii4.1");
           $gl.html(imgle);
           //alert("iii4.2");
           
           
           $("#galleryNotSet").val("set");
           var currentPage = $(e.target),
           options = {},
           photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
           //alert(currentPage.attr('id'));
           //alert(photoSwipeInstance);
          // alert("iii4.3");
           $gl.listview("refresh");
           $gl.trigger( "updatelayout");
           return true;
       }
       else
       {
           //alert("galleryNS : ");
           $("#galleryNotSet").val("notSet");
           //alert("galleryNS : "+$("#galleryNotSet").val());
       }
   });
   
    
    
}).live('pagehide', function(e){
   //alert($("#galleryNotSet").val());
   if($("#galleryNotSet").val() == "set")
   {
        var currentPage = $(e.target),
        photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
        //alert(currentPage);
        //alert(photoSwipeInstance);
        if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) 
        {
            PhotoSwipe.detatch(photoSwipeInstance);
        }

        return true;
       
   }    
   
});
}(window, window.jQuery, window.Code.PhotoSwipe));

$("#editJobStatusDetailsPage" ).live( "pageshow", function(e) {
    //alert("hi");
    $("#displayOnlyToOrderItemChange").controlgroup('refresh');
    if($("#statusChangeRequestHidden").val() == "orderChange")
    {
        $("#displayOnlyToOrderItemChange").hide(); 
    }
    if($("#statusChangeRequestHidden").val() == "orderItemChange")
    {
        $("#displayOnlyToOrderItemChange").show();
    }
    
    $("#statusChangeForm select").selectmenu('refresh', true);
    
    $("#editJobStatusDetailsPageBackBtn").click(function(){
           $("#statusChangeForm").clearForm();
           statusChangeFrm.resetForm();
           window.location.href ="mLineItems/"+$("#getOrderIDHidden").val()+"/"+$("#getPgaeRequestFrom").val();
          
    });
    var sugList = $("#suggestions");
    $("#suggestions li").live("click",function(e){

    var employeeUserNameSelected =  $(this).text();
    //alert($(this).text());
    $("#userName").val(employeeUserNameSelected);
    $("#suggestions li").addClass("ui-screen-hidden");
    e.preventDefault();
    //return false;

    });
    
    var statusChangeFrm = $("#statusChangeForm").validate({
         rules: {
                newStatus : {
                                   required: true

                },
                userName : {
                                   required: true

                }

        },
        errorPlacement: function (error, element) {
               if (element.is('select')) 
               {
                    error.insertAfter(element.parents('div.ui-select'));

               }                 
               if($("#userName"))
               {
                   error.insertAfter(element.parents('div.ui-input-text.ui-shadow-inset.ui-corner-all.ui-btn-shadow.ui-body-c'));

               }
          },
        submitHandler: function(form){
                var $vl              = $("#displayJobStatus");
                var htmle            = "";
                $vl.html("");
                    $.ajax({
                    url: "statusLog/statuslogcontroller/submitStatusChange",
                    type: 'POST',
                    //dataType: 'json',
                    data: $(form).serialize(),
                    success: function(response){
                           if(response == "CONFIRM")
                           {
                               //---- store the modal hidden values ------//.
                               $("#orderIDHiddenModal").val($("#orderIDHidden").val());
                               $("#newStatusHiddenModal").val($("#newStatus").val());
                               $("#userNameHiddenModal").val($("#userName").val());
                               $("#notesHiddenModal").val($("#notes").val());


                               $("#customMessageWarning").html("This order contains orders Items with different status.If you click o.k. all Status will be set to: <em>"+  $("#newStatus").val()+"</em>");


                               $("#popupDialog").popup("open")

                           }
                           else
                           {
                                 $("#statusChangeForm").clearForm();
                                 statusChangeFrm.resetForm(); 
                                 //$.mobile.changePage("#statusUpdatePage",{transition:"slide"});
                                 if($("#statusChangeRequestHidden").val() == "orderChange")
                                 {
                                     htmle ='<li class="li-top" id="'+$("#orderIDHidden").val()+','+'orderChange"> <a id="editJobStatusDetailsPage" href="" data-transition="slide">' + response +'</a></li>';
                                     $("#getOrderJobStaus").val("Dontshow");
                                     $vl.html(htmle); 
                                     $vl.listview( "refresh");
                                     $vl.trigger( "updatelayout");
                                 }
                                 $.mobile.changePage("#jobStatusDetailsPage",{transition:"slide"});
                           }    
                    }
                });
          }


    });
    
    
    $("#confirmStatusModalBtn").on("click",function (){
         //alert("hi2");
          $.ajax({
              url: "statusLog/statuslogcontroller/statusChangeConfirmed",
              type: 'POST',
              //dataType: 'json',
              data: $("#confirmFrmModal").serialize(),
              success: function( response ) {
                    $("#popupDialog").popup("close")
                    $("#statusChangeForm").clearForm();
                    statusChangeFrm.resetForm(); 
                    $.mobile.changePage("#jobStatusDetailsPage",{transition:"slide"});
               
                }
              });
    });
    
    $( "#userName" ).on( "input", function(e){
        var text = $(this).val();
        if(text.length < 1) 
        {
             sugList.html("");
             sugList.listview("refresh");
        }
        else
        {
            //$.get(url,data,success)
            $.get("mobile/mobilecontroller/getMobileEmployeeUserName", {employeeUserName:text}, function(res,code) {
                var str = "";
                //alert(res);
                for(var i=0, len=res.length; i<len; i++) 
                {
                    //alert(res[i].t_UserName);
                    str += '<li><a href="">'+res[i].t_UserName+'</a></li>';
                    //str += "<li>"+res[i].t_UserName+"</li>";
                }
                sugList.html(str);
                sugList.listview("refresh");
              
            },"json");
            
        }    
    });
    $.ajax({
            url: "statusLog/statuslogcontroller/getNewStatusNameFromStatusesTable/",
            dataType: 'json',
            error: function(xhr,status,error){
               alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
            }
    })
    .then( function ( response ) {
            var sel = $("#newStatus");
            sel.empty();
            for (var i=0; i<response.length; i++)
            {
                if(response[i].t_StatusName == "Please Select")
                {
                    sel.append('<option value="'+'">' + "Choose One.."+ '</option>');

                }
                else
                {
                    sel.append('<option value="'+response[i].t_StatusName+'">' + response[i].t_StatusName + '</option>');

                }    


            }              
    });    
});
$("#mobileInspectionUploadDetailsPage").live( "pageshow", function(e) {
    $("#displayLabelNum").css({ width: '75px',height: '28px','line-height':'28px'});
    $("#displayLabelNum").text("2");
    $("#addLabelPrint").live('click',function(e){
        //alert("hi");
        var n_NumLabelsPrint = $("#n_NumLabelsPrint").val();
        
        n_NumLabelsPrint++;
        
        $("#n_NumLabelsPrint").val(n_NumLabelsPrint);
        $("#displayLabelNum").text(n_NumLabelsPrint);
        
        return false;
        
        
    });
    $("#minusLabelPrint").live('click',function(e){
        //alert("hi");
        var n_NumLabelsPrint = $("#n_NumLabelsPrint").val();
        n_NumLabelsPrint--;
//        if(n_NumLabelsPrint >2)
//        {
//            n_NumLabelsPrint--;
//            
//        }    
        
        
        $("#n_NumLabelsPrint").val(n_NumLabelsPrint);
        $("#displayLabelNum").text(n_NumLabelsPrint);
        
        return false;
        
        
    });
    $.ajax({
        url: "mobile/mobilecontroller/getMobileBleedWhitePocketInfo/"+$("#inspectionOrderItemID").val(),
        dataType: "json",  
        error: function(xhr,status,error){
               alert("Please hhhijj Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function(response) {
                //alert("hi");
                // change this on the server end
                $("#finalSizeDisplay").text("F: Qty "+response.Qty+" "+response.bWpData.whiteFeet+ " "+response.OiStatus);
                
                 if(response.inspectReadOrder == 1)
                 {
                     //alert("inside: "+response.inspectReadOrder);
                     $("#instruction").attr('checked', true).checkboxradio("refresh");
                         
                 }
                 if(response.nb_InspectQty == 1)
                 {
                     $("#qty").attr('checked', true).checkboxradio("refresh");
                         
                 }
                 if(response.nb_InspectSize == 1)
                 {
                     $("#size").attr('checked', true).checkboxradio("refresh");
                         
                 }
                 if(response.nb_InspectColor == 1)
                 {
                     $("#color").attr('checked', true).checkboxradio("refresh");
                         
                 }
                 if(response.nb_InspectFinishing == 1)
                 {
                     $("#finishing").attr('checked', true).checkboxradio("refresh");
                         
                 }
                 if(response.t_InspectNote != null)
                 {
                      $("#inspectionNotes").text(response.t_InspectNote);
                 }    
                 if(response.t_InspectName != null)
                 {
                     // Grab a select field
                     var el = $('#inspector');

                     // Select the relevant option, de-select any others
                     el.val(response.t_InspectName).attr('selected', true).siblings('option').removeAttr('selected');

                     // jQM refresh
                     el.selectmenu("refresh", true);
                     
                     //alert(response.t_InspectName);
                     
                     //$('#inspector[value='+response.t_InspectName+']').attr('selected','selected');
                     //("#inspector").val(response.t_InspectName);
                     //$("#mobileInspectionFrm select").selectmenu('refresh', true);
                     //("#inspector").selectmenu("refresh");
                 }
                 if(response.nb_PrintLabel !=null && response.nb_PrintLabel == "1")
                 {
                     $("#nb_PrintLabel").attr("checked",true).checkboxradio("refresh");
                 }
                 if(response.n_NumLabelsPrint !=null)
                 {
                     $("#n_NumLabelsPrint").val(response.n_NumLabelsPrint);
                     $("#displayLabelNum").text(response.n_NumLabelsPrint);
                 }    
                 
                 
                 
                         
                 
                
        }
        
    });
    //alert("hi"+ $("#inspectionOrderItemID").val());
    var inspectionData       = $("#inspectionDataHidden").val();
    
    
    
    
    //alert(inspectionData);
    
    $("#companyNameOrderIDDashNum").text($("#companyNameInspectionFrm").val()+" "+$("#mobileUploadOrderID").val()+"-"+$("#mobileUploadDashNum").val());
    
    //call the mobile controller and pass the orderItemID
    //alert(inspectionData);
    var searchQtyText        = inspectionData.indexOf("Qty");
    //alert(searchQtyText);
    //var getInspectionQtyText = inspectionData.substring(searchQtyText);
    
    var getInspectionQtyText     = inspectionData.substring(searchQtyText+4);
    var getInspectionQtyTextArry = getInspectionQtyText.split(" ");
    
    var getQty                   = getInspectionQtyTextArry[0];
    var getHeightFeet            = getInspectionQtyTextArry[1];
    var getHeightInch            = getInspectionQtyTextArry[2];
    var getX                     = getInspectionQtyTextArry[3];
    var getWidthFeet             = getInspectionQtyTextArry[4];
    var getWidthInch             = getInspectionQtyTextArry[5];
    
    //alert("lenght of the array: "+getInspectionQtyTextArry.length);
     var getOiStatus = "";
    for(var i = 6; i<getInspectionQtyTextArry.length;i++)
    {
        //alert(getInspectionQtyTextArry[i]);
        getOiStatus = getOiStatus+" "+getInspectionQtyTextArry[i];
    }    
    //alert("Qty: "+getInspectionQtyTextArry[0]);
    //alert("getHeightFeet "+getInspectionQtyTextArry[1]);
    //alert("getHeightInch: "+getInspectionQtyTextArry[2]);
    //alert("getX "+getInspectionQtyTextArry[3]);
    //alert("getWidthFeet "+getInspectionQtyTextArry[4]);
    //alert("getWidthInch "+getInspectionQtyTextArry[5]);
    //alert("getOiStatus "+getOiStatus);
   //alert(getInspectionQtyTextArry[7]);
    
    if(getHeightFeet == "0'")
    {
        
        getHeightFeet="";
    } 
    if(getHeightInch == "0\"")
    {
       
        getHeightInch="";
    } 
    if(getWidthFeet == "0'")
    {
        
        getWidthFeet="";
    } 
    if(getWidthInch == "0\"")
    {
       
        getWidthInch="";
    } 
    
    //inspectionData.substring(searchQtyText);
    
    //alert(getInspectionQtyText);
    
    // do the regular expression to match the format.
    var matchValue = /^(\d*"*\w*)\s*((\d*"*\w*)\s*){1,}$/;
    //var matchFound  = matchValue.exec(value);
    
   
    
    //$("#qtyDisplay").text(getInspectionQtyText);
    
    $("#qtyDisplay").text("Qty "+getQty+" "+getHeightFeet+" "+getHeightInch+" "+"H "+getX+" "+getWidthFeet+" "+getWidthInch+" "+"W "+getOiStatus);
    
    var getOtherText         = inspectionData.substring(0,searchQtyText);
    //alert(getOtherText);
    
    var getInitialText       = getOtherText.indexOf(" ");
    
    //alert(getInitialText);
    
    var getTnameText         = getOtherText.substring(getInitialText);
    //alert(getTnameText);
    
    $("#t_Name").text(getTnameText);
    
    // ---------Inspection form submit-------------- //
    var inspectionFrm = $("#mobileInspectionFrm").validate({
        rules: {
                
                instruction : {
                                   required: true

                },
               
                qty : {
                                   required: true

                },
                size : {
                                   required: true

                },
                color : {
                                   required: true

                },
                finishing : {
                                   required: true

                },
                inspector : {
                                   required: true

                }

        },
        messages:{
             instruction : {
                                   required: "Please check the box."

                },
               
                qty : {
                                    required: "Please check the box."

                },
                size : {
                                   required: "Please check the box."

                },
                color : {
                                   required: "Please check the box."

                },
                finishing : {
                                   required: "Please check the box."

                },
                inspector : {
                                   required: "Please check the box."

                }
            
        },
        errorPlacement: function (error, element) {
               if (element.is('select')) 
               {
                   //alert("hi1");
                   error.insertAfter(element.parents('div.ui-select'));

               }                 
               if($('input[type="checkbox"]'))
               {
                   //alert("hi");
                   error.insertAfter(element.parents('div.ui-checkbox'));

               }
        },
        submitHandler: function(form){
                   $.ajax({
                        url: "orderItems/orderitemcontroller/updateInspectionDataOrderItemTbl",
                        type: 'POST',
                        data: $(form).serialize(),
                        success: function(response){
                            $("#mobileInspectionFrm").addClass("hiddenfile");
                            $("#mobileUploadFrm").removeClass("hiddenfile");
                        
                        }
                   })
        }
    }); //end inspection form validation and submission
    
     $("#chooseFile").click(function(e){
              e.preventDefault();
              $("#divAddPhotosBtn").addClass("hiddenfile");
	      $("input[type=file]").trigger("click");
     });
     $("input[type=file]").change(function(){
         //alert("hi");
         //get the id where you would upload files
         $info = $("#info");
         
         $info.empty();
         //alert($("#mobileUploadOrderItemID").val());
         // show the uplaod button
         if(this.files.length >=1)
         {
             $("#divUploadBtn").removeClass("hiddenfile");
             //$("#divAddPhotosBtn").addClass("hiddenfile");
         }    
         //alert("hi");
         for(var i=0;i<this.files.length;i++)
         {
             if(this.files[i].name != null)
             {
                 //$info.append("<li class='mainLiFile' data-icon='delete'>"+this.files[i].name+"<a class='subAncFile' href='#'></a></li>").trigger('create');
                 $info.append("<li class='mainLiFile'>"+this.files[i].name+"</li>").trigger('create');
             }
         } 
         
         //show the files that will be uploaded
         $info.listview("refresh");
         $info.trigger("updatelayout");
         
           
     });
});

