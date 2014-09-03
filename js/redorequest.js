var readOrderItemsWithRedoUrl = "orderRedo/orderredocontroller/orderItemWithRedo";
var submitOrderRedoUrl        = "orderRedo/orderredocontroller/submitOrderRedoRequest";
var readUserName              = "statusLog/statuslogcontroller/getEmployeeUserNameFromEmployeeTable";
$(document).ready(function(){
    readEmployeeUserName();
    readOrderItemsWithRedo();
    $("#orderUrgency").change(function() {
        if($(this).val() !== "")
        {
            $("#shippingUrgency").focus();
        }    
        
    });
    
    $("#shippingUrgency").change(function() {
        if($(this).val() !== "")
        {
            $("#orderUrgency").focus();
        }    
        
    });
    //var getOrderItemsWithRedo = "";
    //var selectedPartialValues = "";
   
    //$('input[type="checkbox"]').change(function() {
    $('.departmentChange').change(function() {    
        var allVals=[];
        $('.departmentChange:checked').each(function() {

           //alert("department: "+$(this).val());
           allVals.push($(this).val());
           $("#deptRespNU").val(allVals);
        });
    });
   
    $("#orderItemsWithRedoTbl").on("click",".checkOrderItemsWithRedo", function() {
//         $("#selectedPartial").val(
//            $('.checkOrderItemsWithRedo:checked').map(function(){
//                return "-"+$('tr#'+ $(this).val()+' td')[1].textContent;
//            }).get().join(',') 
//         );
//         $("#partialOrderItemsWithRedoHidden").val(
//            $('.checkOrderItemsWithRedo:checked').map(function(){
//                return $(this).val();
//            }).get().join(',') 
//         );    
    });
    
    //alert($("#redoRequestHeading").text());
    $("#orderIDHidden").val(orderID);
    $("#ordNU").val(orderID);
    $("#redoRequestHeading").text("You are requesting a Redo on Order: "+orderID);
    
    $("#itemsRedo").change(function() {
          //var typeRedo = $("#itemsRedo option:selected").text();
          //alert($(this).attr('id'));
          var typeRedo = $("#itemsRedo").val();
          if(typeRedo != "")
          {
              if($("#itemsRedo").hasClass("error"))
              {
                  $("#itemsRedo").removeClass("error");
                  if(!$("#itemsRedo").hasClass("valid"))
                  {
                      $("#itemsRedo").addClass("valid");
                     
                      if($('label[for='+$(this).attr('id')+']').hasClass('error'))
                      {
                          $('label[for='+$(this).attr('id')+']').attr('style','display: none !important');
                      }    
                  }  
              }
                  
          } 
          if(typeRedo == "")
          {
              if($("#itemsRedo").hasClass("valid"))
              {
                  $("#itemsRedo").removeClass("valid");
                  
                  $("#itemsRedo").addClass("error");
                  
                  if($('label[for='+$(this).attr('id')+']').attr('style',''))
                  {
                      $('label[for='+$(this).attr('id')+']').attr('style','display: block !important');
                  }    
              }
          }    
          if(typeRedo == "Partial")
          {
              //readOrderItemsWithRedo();
              $('#partial').modal('show');
          }
          if(typeRedo == "All Items")
          {
              //readOrderItemsWithRedo();
              $('.checkOrderItemsWithRedo:checkbox').prop('checked',true);
              if(!$("#displayPartial").hasClass("hide"))
              {
                  $("#displayPartial").addClass("hide");
              }
              $("#partialOrderItemsWithRedoHidden").val(
                $('.checkOrderItemsWithRedo:checked').map(function(){
                    return $(this).val();
                }).get().join(',') 
              ); 
                  
              //$('#partial').modal('show');
              
          }    
    });
    
    $("#closeMyModalBtn").click(function (){
         $('#myModal').modal('hide');
         $("#redoRequestFrm").clearForm();
         //alert(orderID);
         //window.location.reload(true);
         window.location.href = "redolist"+'/'+orderID;
    });
//    $("#cancelBtnOrderRedoItems").click(function (){
//         
//         $("#itemsRedo").clearForm();
//         
//         $('#partial').modal('hide');
//         
//    });
    $('#selectAllCheck').click(function () {  
        if($(this).is(':checked'))
        {
            $(".checkOrderItemsWithRedo").each(function(){
                 $(this).prop('checked',true);
            });
            
        } 
        else 
        {
            $(".checkOrderItemsWithRedo").each(function(){
                 $(this).prop('checked',false);
            });
        }
    });
    $("#changePartial").click(function(){
         $('#partial').modal('show');
         return false;
    });
    $("#submitBtnOrderRedoItems").click(function (){
         $('#partial').modal('hide');
         if($("#displayPartial").hasClass("hide"))
         {
             $("#displayPartial").removeClass("hide");
         } 
         $("#selectedPartial").val(
            $('.checkOrderItemsWithRedo:checked').map(function(){
                return "-"+$('tr#'+ $(this).val()+' td')[1].textContent;
            }).get().join(',') 
         );
         $("#partialOrderItemsWithRedoHidden").val(
            $('.checkOrderItemsWithRedo:checked').map(function(){
                return $(this).val();
            }).get().join(',') 
         ); 
    });
    $( "#picturesYesNo" ).change(function() {
     
          var picYesNo = $("#picturesYesNo").val();
  
          if(picYesNo === "1")
          {
              $("#picYesNoHidden").val("1");
              if($("#uploader").hasClass("hide"))
              {
                  $("#uploader").removeClass("hide");
                   
              }
              if(!$("#submitRedoRequestFrm").hasClass("hide"))
              {
                  $("#submitRedoRequestFrm").addClass("hide");
                   
              }
             
          }
          if(picYesNo === "0")
          {
              $("#picYesNoHidden").val("0");
              if(!$("#uploader").hasClass("hide"))
              {
                  $("#uploader").addClass("hide");
                   
              }
              if($("#submitRedoRequestFrm").hasClass("hide"))
              {
                  $("#submitRedoRequestFrm").removeClass("hide");
                   
              }  
              
          }    
    });
    $("#submitRedoRequestFrm").click(function (){
         //alert("hi");
         $("#redoRequestFrm").valid();
         $("#redoRequestFrm").submit();
         return false;
    });
    
    $("#redoRequestFrm").validate({
            rules:{
                selectedPartial:{
                     required:function() {
                         return $("[name='itemsRedo']").val() == 'Partial';
                     }  
                },
                requestBy:{
                  required:true  
                },
                orderUrgency:{
                  required:true  
                },
                shippingUrgency:{
                  required:true  
                },
                itemsRedo : {
                    required:true
                },
                customerIssue :{
                    required:true
                },
                salesIssue :{
                    required:true
                },
                'departResponsible[]':{
                   required:true,
                    minlength:1
                }
            },
            messages:{
                selectedPartial:{
                     required:"Please check atleast one OrderItem with redo"
                },
                itemsRedo:{
                     required:"Please make a selection"
                },
                customerIssue:{
                    required:"Please write your concern"
                },
                salesIssue:{
                     required:"Please write what happened!"
                },
                'departResponsible[]':{
                     required:"Please check atleast one Department"
                }
                
            },
            errorPlacement: function (error, element) {
               if (element.attr('name') == "departResponsible[]") 
               {
                   error.appendTo('#customDepartmentError');
            

               }
               else
               {
                  error.insertAfter(element); 
               }    
          },
          submitHandler: function(form){
                     //submit the form via an ajax call
                    $.ajax({
                        url: submitOrderRedoUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: $("#redoRequestFrm").serialize(),
                        success: function( response ){
                            //alert("hi");
                            window.location.href = "redolist"+'/'+orderID;
                        }
                    });
                    $("#myModal").modal({
                        backdrop: false
                    });
             
             
         }
    }); 
    $(function() {
         //setup html5 version
         var uploadInitialized = false;
       
         $("#uploader").pluploadQueue({
             
             runtimes : 'html5,flash',
             max_file_size : '1024mb',
             url : '../orderRedo/orderredocontroller/redoRequestFrmUpload',
             flash_swf_url : 'js_plupload/plupload.flash.swf',
             // Specify what files to browse for
             filters : [
                {title : "Image files", extensions : "jpg,jpeg,png"},

                {title : "Zip files", extensions : "zip"}
             ],

             init: 
             {
                StateChanged: function(up) {
                    if (!uploadInitialized && up.state == plupload.STARTED) 
                    {
                        if (!$("#redoRequestFrm").valid()) 
                        {
                            alert("Please fill the Required Fields!");
                            up.stop();
                        }
                        else 
                        {
                            //alert("hi2344");
                            uploadInitialized = true;
                            //alert("hi2345");
                        }
                    }
                },
                BeforeUpload: function(up, file) {
                    //alert("hi2346");
//                     $.ajax({
//                        url: submitOrderRedoUrl,
//                        type: 'POST',
//                        dataType: 'json',
//                        data: $("#redoRequestFrm").serialize(),
//                        success: function( response ){
//                            //alert(response);
//                            
//                            up.settings.multipart_params ={
//                                orderRedoIDHidden : response
//                            }  
//
//                        }
//                    });
                    //alert("hi2347");
//                     var allVals=[];
//                     $('input[type="checkbox"]:checked').each(function() {
//                       
//                       alert("department: "+$(this).val());
//                       allVals.push($(this).val());
//                     });
                    up.settings.multipart_params = {
//                        'itemsRedo'        : $("#itemsRedo").val(),
//                        'departResponsible': allVals.join(),
//                        'customerIssue'    : $("#customerIssue").val(),
//                        'salesIssue'       : $("#salesIssue").val(),
//                        'picturesYesNo'    : $("#picturesYesNo").val(),
                        'orderIDHidden'    : $("#orderIDHidden").val()
                         //'sportsOrderIDDashNumIDHidden': $('#sportsOrderIDDashNumIDHidden').val()
                     }
                },
                FileUploaded: function(up,file,response) {
                    // Called when a file has finished uploading
                    if(up.total.queued ===0)
                    {
                        var CountFiles = up.files.length;
                        var fileNames = "<h5>The Following Files have been uploaded</h5><br/><ul>";
                        for(var i=0; i< CountFiles; i++)
                        {
                            fileNames += "<li>"+ up.files[i].name + "</li>";
                            //alert("Files uploaded: "+ up.files[i].name);
                        }
                        fileNames         += "</ul>";
                        //alert("hi2348");
                        $.ajax({
                            url: submitOrderRedoUrl,
                            type: 'POST',
                            dataType: 'json',
                            data: $("#redoRequestFrm").serialize(),
                            success: function( response ){

                            }
                        });
                        
                        setTimeout(
                        function(){
                             $("#myModal .modal-header").html("<h3>We got your Request</h3>");
                        },1000);
                        setTimeout(
                        function(){
                             $("#myModal .modal-body #uploadedFiles").html(fileNames);
                        },1000);
                        setTimeout(
                        function(){
                             if($("#closeMyModalBtn").hasClass("hide"))
                             {
                                 $("#closeMyModalBtn").removeClass("hide");
                                 
                             }
                        },1000);
                        
                        //closeMyModalBtn
                        //$("#myModal .modal-header").html("<h3>The Following Files have been uploaded</h3>");
                        //$("#myModal .modal-body #uploadedFiles").html(fileNames);

                        $("#myModal").modal({
                            backdrop: false
                        });
                    }
                }
             }
         });
         
     });
    
    
    
    
});

function readOrderItemsWithRedo() {
                $.ajax({
                    url: readOrderItemsWithRedoUrl+'/'+orderID,
                    dataType: 'json',
                    success: function( response ) {
//                        for( var i in response ) {
//                            alert(response[ i ].orderItemID) 
//                        }
                       
                        //clear old rows
                        $( '#orderItemsWithRedoTbl tbody' ).html( '' );

                        //append new rows
                        $( '#orderItemsWithRedoTblTemplate' ).render(response).appendTo( "#orderItemsWithRedoTbl tbody" );
                    }
                });
                 
} // end readRedoListInfo/* 

function readEmployeeUserName() {
            $.ajax({
                    url: readUserName,
                    //dataType: 'json',
                    success: function( response ) {
                        var json = JSON.parse(response);
                      
                        var arrayEmployeeName = [];
                        for(var i=0;i<json.length;i++)
                        {
                           
                            arrayEmployeeName[i] =''+json[i]['t_UserName']+'';          
                        }
                        $('#requestBy').typeahead({
                            source: arrayEmployeeName,
                            items: 4
                            
                        });
                    }
            });
                 
} // end readEmployeeUserName/* 

