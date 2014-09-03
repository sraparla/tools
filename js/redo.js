var readUrl                   = "orderRedo/orderredocontroller/getRedoFrmData";
var readUserName              = "statusLog/statuslogcontroller/getEmployeeUserNameFromEmployeeTable";
var readOrderItemsWithRedoUrl = "orderRedo/orderredocontroller/orderItemWithRedo";
var submitRedoStatusFrmUrl    = "orderRedo/orderredocontroller/submitRedoStatusFrm";
var readImages                = "orderRedo/orderredocontroller/getRedoImages";
var custInfoUrl               = "orderRedo/orderredocontroller/getCustomerInfoFromOrderRedoID"

$(document).ready(function(){
    
    $("#orderRedoIDHidden").val(orderRedoID);
    $("#orderIDHidden").val(orderID);
    
    
//    $("#redoStatusFrm :input").on('change keyup',function() {
//           if($("#submitPendingRedoFrm").hasClass("hide"))
//           {
//               $("#submitPendingRedoFrm").removeClass("hide");
//               
//           }
//           if($("#topSubmitPendingRedoFrm").hasClass("hide"))
//           {
//               $("#topSubmitPendingRedoFrm").removeClass("hide");
//               
//           }  
//    });
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
    
    $("#redoStatusFrm :input").on('change keyup',function() {
        if($("#topSubmitPendingRedoFrm").hasClass("hide"))
        {
            $("#topSubmitPendingRedoFrm").removeClass("hide");
              
        }
        if($("#submitPendingRedoFrm").hasClass("hide"))
        {
            $("#submitPendingRedoFrm").removeClass("hide");
              
        } 
        
    });
    $("#topSubmitPendingRedoFrm").click(function(){
       $("#partialOrderItemsWithRedoHidden").val(
            $('.checkOrderItemsWithRedo:checked').map(function(){
                return $(this).val();
            }).get().join(',') 
        );
            
        $("#redoDeptRespHidden").val(
            $('.redoDepartmentChange:checked').map(function(){
                //alert($(this).val());
                return $(this).val();
            }).get().join(',') 
        ); 
        var resObj =$("#researchedProblem").code();
        $("#resProbHiddenVal").val(resObj);
//        for(var i=0;i<resObj.length;i++)
//        {
//            //alert("godccc: "+i+" : "+resObj[i]);
//            $("#resProbHiddenVal").val(resObj[i]);
//            
//        } 
        
        var solObj =$("#solutionProvided").code();
        $("#solutionHiddenVal").val(solObj);
//        for(var x=0;x<solObj.length;x++)
//        {
//            //alert("godccc: "+i+" : "+solObj[i]);
//            $("#solutionHiddenVal").val(solObj[x]);
//            
//        }
        
        
        $("#redoStatusFrm").valid();
        $("#redoStatusFrm").submit();
        return false;
        
    });
    
    
    
    $("#closeMyModalBtn").click(function (){
         $('#myModal').modal('hide');
         $("#redoStatusFrm").clearForm();
         window.location = "redo"+'/'+orderRedoIDHidden;
         window.location.reload(true);
         
         //window.location.href = "redolist"+'/'+orderID;
    });
    
    $('.redoDepartmentChange').change(function() {    
        var allVals=[];
        $('.redoDepartmentChange:checked').each(function() {

           //alert("department: "+$(this).val());
           allVals.push($(this).val());
           $("#redoDeptRespHidden").val(allVals);
        });
    });
    
    $('#researchedProblem').summernote({
       height: 200,
         toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          //['table', ['table']],
          //['insert', ['link', 'picture']],
          //['fullscreen', ['fullscreen']],
          //['help', ['help']]
        ],
//       onblur: function(e) {
//           alert('Editable area is focused');
//       },
        onkeyup: function(e) {
           //alert('Key is released:', e.keyCode);
            if($("#topSubmitPendingRedoFrm").hasClass("hide"))
            {
                $("#topSubmitPendingRedoFrm").removeClass("hide");
              
            }
            if($("#submitPendingRedoFrm").hasClass("hide"))
            {
                $("#submitPendingRedoFrm").removeClass("hide");

            } 
        }
//       onkeydown: function(e) {
//           alert('Key is pressed:', e.keyCode);
//       },
//       onfocus: function(e) {
//           if($("#submitPendingRedoFrm").hasClass("hide"))
//           {
//               $("#submitPendingRedoFrm").removeClass("hide");
//               
//           }
//           if($("#topSubmitPendingRedoFrm").hasClass("hide"))
//           {
//               $("#topSubmitPendingRedoFrm").removeClass("hide");
//               
//           }  
//       }
       
    });
     $('#solutionProvided').summernote({
       height: 200,
         toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          //['table', ['table']],
          //['insert', ['link', 'picture']],
          //['fullscreen', ['fullscreen']],
          //['help', ['help']]
        ],
        onkeyup: function(e) {
            if($("#topSubmitPendingRedoFrm").hasClass("hide"))
            {
                $("#topSubmitPendingRedoFrm").removeClass("hide");
              
            }
            if($("#submitPendingRedoFrm").hasClass("hide"))
            {
                $("#submitPendingRedoFrm").removeClass("hide");

            } 
        }
      
    });

    
    readOrderItemsWithRedo();
    
    readRedoFrmData();
    
    readEmployeeUserName();
    displayImages();
    custInfo();
   
    $("#displayPluploadPlugin").click(function(){
       $("#uploader").toggle("hide");
       $("#submitPendingRedoFrm").toggle("hide");
//       if(!$("#uploader").hasClass("hide"))
//       {
//           $("#photosUploaded").val("1");
//       }    
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
         //alert("submit Value:" +$("#partialOrderItemsWithRedoHidden").val() );       
    });
    $("#itemsRedo").change(function() {
        var typeRedo = $(this).val();
        if(typeRedo == "Partial")
        {
            $('#partial').modal('show');
        }
        if(typeRedo == "All Items")
        {
            //alert("hhh: "+typeRedo)
           
            $('.checkOrderItemsWithRedo').prop('checked',true);

            if(!$("#displayPartial").hasClass("hide"))
            {
                $("#displayPartial").addClass("hide");
            }
            $("#partialOrderItemsWithRedoHidden").val(
             
                $('.checkOrderItemsWithRedo:checked').map(function(){
                    //alert($(this).val());
                    return $(this).val();
                }).get().join(',') 
            ); 
            //alert("Final Value:" +$("#partialOrderItemsWithRedoHidden").val() );   
        }    
    });
    $("#orderItemsWithRedoTbl").on("click",".checkOrderItemsWithRedo", function() {
//        $("#selectedPartial").val(
//           $('.checkOrderItemsWithRedo:checked').map(function(){
//                return "-"+$('tr#'+ $(this).val()+' td')[1].textContent;
//           }).get().join(',') 
//        );
//        $("#partialOrderItemsWithRedoHidden").val(
//           $('.checkOrderItemsWithRedo:checked').map(function(){
//                return $(this).val();
//           }).get().join(',') 
//        );    
    });
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
             //alert("hi");
//             var orderItemIDArry = $("#partialOrderItemsWithRedoHidden").val().split(",");
//             
//             $(".checkOrderItemsWithRedo").each(function(){
//                //alert("this: "+  $(this).val());
//                for(var i=0;i<orderItemIDArry.length;i++)
//                {
//                    if(orderItemIDArry[i] == $(this).val())
//                    {
//                       //alert("for loop: "+  orderItemIDArry[i]);
//                       $(this).prop('checked',true);
//                    }
//                }
//             });
        $('#partial').modal('show');
        return false;
    });
    //readOrderItemsWithRedo();
    $('#approvedBy').keyup(function() {
         if($("#redoStatusHidden").val() == "Approved" &&   $('#approvedBy').val() !="")
        {
            //get todays date and time and show the value
            if($("#approvedControlGroup").hasClass("hide"))
            {
                $("#approvedControlGroup").removeClass("hide");
                
            }
            if($("#createNewOrderControlGroup").hasClass("hide"))
            {
                $("#createNewOrderControlGroup").removeClass("hide");
                $("#dateTimeApproved").val(todayDateTime());
            }    
        }
        //alert($('#approvedBy').attr("maxlength"));
        if(($('#approvedBy').val() ==""))
        {
           if(!$("#approvedControlGroup").hasClass("hide"))
           {
                $("#approvedControlGroup").addClass("hide");
                
           }
           if(!$("#createNewOrderControlGroup").hasClass("hide"))
           {
                $("#createNewOrderControlGroup").addClass("hide");
                //$("#dateTimeApproved").val(todayDateTime());
           } 
        }    
    });
    
    $("#redoStatus").change(function(){
        //alert($(this).val());
        var redoStatus = $(this).val();
        $("#redoStatusHidden").val(redoStatus);
        if($("#redoStatusHidden").val() == "Approved" &&   $('#approvedBy').val() !="")
        {
            //get todays date and time and show the value
            if($("#approvedControlGroup").hasClass("hide"))
            {
                $("#approvedControlGroup").removeClass("hide"); 
            }
            if($("#createNewOrderControlGroup").hasClass("hide"))
            {
                $("#createNewOrderControlGroup").removeClass("hide");
                $("#dateTimeApproved").val(todayDateTime());
            }   
        }
        if($("#redoStatusHidden").val() != "Approved")
        {
            
           if(!$("#approvedControlGroup").hasClass("hide"))
           {
                $("#approvedControlGroup").addClass("hide");
                
           }
           if(!$("#createNewOrderControlGroup").hasClass("hide"))
           {
                $("#createNewOrderControlGroup").addClass("hide");
                //$("#dateTimeApproved").val(todayDateTime());
           } 
            
            
        } 
    });

    
//    function dump(obj) {
//        var out = '';
//        for (var i in obj) {
//            out += i + ": " + obj[i] + "\n";
//            alert("fuccc "+i+" : "+obj[i]);
//        }
//
//        alert("hello1"+out);
//
//        // or, if you wanted to avoid alerts...
//
//        //var pre = document.createElement('pre');
//        var pre = document.getElementById('result');
//        pre.innerHTML = out;
//        alert(out);
//        document.body.appendChild(pre);
//    }
    
    $("#createNewRedoOrder").click(function(){
        
        $("#partialOrderItemsWithRedoHidden").val(
            $('.checkOrderItemsWithRedo:checked').map(function(){
                return $(this).val();
            }).get().join(',') 
        ); 
       
        $("#redoDeptRespHidden").val(
            $('.redoDepartmentChange:checked').map(function(){
                //alert($(this).val());
                return $(this).val();
            }).get().join(',') 
        );
         
        var resObj =$("#researchedProblem").code();
        
        $("#resProbHiddenVal").val(resObj);
        
//        for(var i=0;i<resObj.length;i++)
//        {
//            //alert("godccc: "+i+" : "+resObj[i]);
//            $("#resProbHiddenVal").val(resObj[i]);
//            
//        } 
        
        var solObj =$("#solutionProvided").code();
        $("#solutionHiddenVal").val(solObj);
        
//        for(var x=0;x<solObj.length;x++)
//        {
//            //alert("godccc: "+i+" : "+solObj[i]);
//            $("#solutionHiddenVal").val(solObj[x]);
//            
//        }
       
        
        $("#redoStatusFrm").valid();
       
        
        $("#redoStatusFrm").submit();
        
        return false;
    });
    
    $("#submitPendingRedoFrm").click(function(){
       $("#partialOrderItemsWithRedoHidden").val(
            $('.checkOrderItemsWithRedo:checked').map(function(){
                return $(this).val();
            }).get().join(',') 
        );
            
        $("#redoDeptRespHidden").val(
            $('.redoDepartmentChange:checked').map(function(){
                //alert($(this).val());
                return $(this).val();
            }).get().join(',') 
        ); 
        var resObj =$("#researchedProblem").code();
        $("#resProbHiddenVal").val(resObj);
//        for(var i=0;i<resObj.length;i++)
//        {
//            //alert("godccc: "+i+" : "+resObj[i]);
//            $("#resProbHiddenVal").val(resObj[i]);
//            
//        } 
        
        var solObj =$("#solutionProvided").code();
        $("#solutionHiddenVal").val(solObj);
        
//        for(var x=0;x<solObj.length;x++)
//        {
//            //alert("godccc: "+i+" : "+solObj[i]);
//            $("#solutionHiddenVal").val(solObj[x]);
//            
//        }
        
        
        $("#redoStatusFrm").valid();
        $("#redoStatusFrm").submit();
        return false;
        
    });
    $("#redoStatusFrm").validate({
        rules:{
            approvedBy:{
                required:function() {
                         return $("[name='redoStatus']").val() == 'Approved';
                     }  
            },
            orderUrgency:{
                 required:function() {
                         return $("[name='redoStatus']").val() == 'Approved';
                     }  
                
            },
            shippingUrgency:{
                 required:function() {
                         return $("[name='redoStatus']").val() == 'Approved';
                     }  
                
            },
            resProbHiddenVal:{
                required:function() {
                         return $("[name='redoStatus']").val() == 'Approved';
                     }  
            },
            solutionHiddenVal:{
                required:function() {
                         return $("[name='redoStatus']").val() == 'Approved';
                     }  
            },
            partialOrderItemsWithRedoHidden:{
                required:true
//                required:function(){
//                    return $("[name='redoStatus']").val() == 'Approved';
//                }
                
            },
            'redoDepartResponsible[]':{
                   required:true,
                   minlength:1
            }
        },
        messages:{
             
            partialOrderItemsWithRedoHidden:{
                required:"Please check atleast one item to redo"
                
            },
            resProbHiddenVal:{
                 required:"Please write your Research"
            },
            solutionHiddenVal:{
                 required:"Please write your Solution"
            },
            'redoDepartResponsible[]':{
                     required:"Please check atleast one Department"
            }
        },
        errorPlacement: function (error, element) {
               if (element.attr('name') == "redoDepartResponsible[]") 
               {
                   error.appendTo('#customDepartmentError');
            

               }
               else if(element.attr('name') == "partialOrderItemsWithRedoHidden")
               {
                   error.appendTo('#partialAllItemRedoError');
                   
               }    
               else
               {
                  error.insertAfter(element); 
               }    
        },
        submitHandler: function(form){
             //submit the form via an ajax call
             $.ajax({
                 url: submitRedoStatusFrmUrl,
                 type: 'POST',
                 dataType: 'json',
                 error: function(xhr,status,error){
                       alert("Please Contact IT (Insert Error): "+ xhr.status+"-"+error);
                 },
                 data: $("#redoStatusFrm").serialize(),
                 success: function( response ){
                      //alert("We got your Request");
                      //if(response == "done")
                      //{
                      //window.location = "redo"+'/'+orderRedoIDHidden;
                      //window.location.reload(true);
                      
                      //alert("hi");
                      
                      
                      window.location.href = "redolist"+'/'+orderID;
                      
                      
                      
                      
                      
                      
                      //}    
                    
                 }    
             });
//             setTimeout(
//                function(){
//                     $("#myModal .modal-header").html("<h3>We got your Request</h3>");
//                },1000);
//                setTimeout(
//                function(){
//                     $("#myModal .modal-body #uploadedFiles").html("Success!");
//                },1000);
//                setTimeout(
//                function(){
//                     if($("#closeMyModalBtn").hasClass("hide"))
//                     {
//                         $("#closeMyModalBtn").removeClass("hide");
//
//                     }
//                },1000);
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
             max_file_size : '10024mb',
             url : '../orderRedo/orderredocontroller/redoRequestFrmUpload',
             flash_swf_url : 'js_plupload/plupload.flash.swf',
             
             // Specify what files to browse for
             filters : [
                {title : "Image files", extensions : "jpg,jpeg,png"},

                {title : "Zip files", extensions : "zip"}
             ],
             //chunk_size : '1mb',
             //unique_names : true,
             
             // Resize images on clientside if we can
             resize : {quality : 100},
 

             init: 
             {
                StateChanged: function(up) {
                    if (!uploadInitialized && up.state == plupload.STARTED) 
                    {
                        if (!$("#redoStatusFrm").valid()) 
                        {
                            alert("Please fill in the Required Fields!");
                            up.stop();
                        }
                        else 
                        {
                         
                            uploadInitialized = true;
                        
                        }
                    }
                },
                BeforeUpload: function(up, file) {
                    $("#photosUploaded").val("1");
                    
                    $("#partialOrderItemsWithRedoHidden").val(
                        $('.checkOrderItemsWithRedo:checked').map(function(){
                            return $(this).val();
                        }).get().join(',') 
                    ); 
                    
                    $("#redoDeptRespHidden").val(
                        $('.redoDepartmentChange:checked').map(function(){
                            //alert($(this).val());
                            return $(this).val();
                        }).get().join(',') 
                    ); 
                    var resObj =$("#researchedProblem").code();
                    
                    $("#resProbHiddenVal").val(resObj);
                    
//                    for(var i=0;i<resObj.length;i++)
//                    {
//                        //alert("godccc: "+i+" : "+resObj[i]);
//                        $("#resProbHiddenVal").val(resObj[i]);
//
//                    } 

                    var solObj =$("#solutionProvided").code();
                    $("#solutionHiddenVal").val(solObj);
                    
//                    for(var x=0;x<solObj.length;x++)
//                    {
//                        //alert("godccc: "+i+" : "+solObj[i]);
//                        $("#solutionHiddenVal").val(solObj[x]);
//
//                    }
        
                    up.settings.multipart_params = {
                        'orderIDHidden'    : $("#orderIDHidden").val()
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
                        
                        $.ajax({
                            url: submitRedoStatusFrmUrl,
                            type: 'POST',
                            dataType: 'json',
                            data: $("#redoStatusFrm").serialize(),
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
                        $("#myModal").modal({
                            backdrop: false
                        });
                    }
                }
             }
         });
         
     });
       
});

//function that populates the redo form
function readRedoFrmData(){
    $.ajax({
        url: readUrl+'/'+orderRedoID,
        type:"get",
        dataType: 'json',
        error: function(xhr,status,error){
           alert("Please hi Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function( response ) {
             $("#redoStatus").val(response.t_Status);
             $("#orderUrgency").val(response.t_OrderUrgency);
             $("#shippingUrgency").val(response.t_ShippingUrgency);
             if(response.t_Status == "Approved")
             {
                  //get todays date and time and show the value
                  if($("#approvedControlGroup").hasClass("hide"))
                  {
                      $("#approvedControlGroup").removeClass("hide"); 
                  }
                  
                  
                  $("#approvedBy").val(response.t_ApprovedBy);   
                  
                  var dateTimeApproved   = response.ts_DateApproved.split(" ");
                  var dateApproved       = dateTimeApproved[0].split("-");
                  var dateApprovedFormat = dateApproved[1]+"/"+dateApproved[2]+"/"+dateApproved[0];
                  
                  $("#dateTimeApproved").val(dateApprovedFormat+" "+dateTimeApproved[1]);
                  
                 
                  
                  if($("#orderIDRedoControlGroup").hasClass("hide"))
                  {
                      $("#orderIDRedoControlGroup").removeClass("hide");
                      
                  } 
                  $("#orderIDRedo").val(response.kf_OrderIDRedo);
                  
                 
             }
            
             
             $("#requestedBy").val(response.t_RequestedBy);
             
             var departmentArry = response.t_Department.split(",");
             
             
             $("#itemsRedo").val(response.t_ItemsRedo);
            
             var orderItemIDArry = response.orderItemID.split(",");
             
             $("#partialOrderItemsWithRedoHidden").val(orderItemIDArry);
             
//             $(".checkOrderItemsWithRedo").each(function(){
//                //alert("this: "+  $(this).val());
//                for(var i=0;i<orderItemIDArry.length;i++)
//                {
//                    if(orderItemIDArry[i] == $(this).val())
//                    {
//                       //alert("for loop: "+  orderItemIDArry[i]);
//                       $(this).prop('checked',true);
//                    }
//                }
//             });
             
             if(response.t_ItemsRedo == "Partial")
             {
                 
                 $("#selectedPartial").val(response.dashNum);
                   
                 if($("#displayPartial").hasClass("hide"))
                 {
                     $("#displayPartial").removeClass("hide");
                 }    
             }    
             $(".redoDepartmentChange").each(function(){
                 //alert("this: "+  $(this).val());
                 for(var i=0;i<departmentArry.length;i++)
                 {
                     if(departmentArry[i].toLowerCase() == $(this).val().toLowerCase())
                     {
                         //alert("for loop: "+  $(this).val());
                         $(this).prop('checked',true);
                     }
                 }
             });
             
             $("#customerConcern").val(response.t_CustomerIssue);
             $("#saleConcern").val(response.t_SalesViewIssue);
             
             $("#dateTimeWhenRequested").val(response.ts_DateRequested);
            
            
             $('#researchedProblem').code(response.t_ResearchedProblem);
             
             //var resObj =$("#researchedProblem").code();
             //alert(resObj.length);
             
             $('#solutionProvided').code(response.t_Solution);
             
             $('#namePrepress').val(response.t_NamePrepress);
             $('#press').val(response.t_NamePress);
             $('#inspection').val(response.t_NameInspection);

        }
    });
    
};// end of populating the redo form
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
                        $('#requestedBy').typeahead({
                            source: arrayEmployeeName,
                            items: 4
                            
                        });
                        
                        $('#approvedBy').typeahead({
                            source: arrayEmployeeName,
                            items: 4
                            
                        });
                        
                        $("#namePrepress").typeahead({
                            source: arrayEmployeeName,
                            items: 4
                        });
                        
                        $("#press").typeahead({
                            source: arrayEmployeeName,
                            items: 4
                        });
                        
                        $("#inspection").typeahead({
                            source: arrayEmployeeName,
                            items: 4
                        });
                    }
            });
                 
} // end readEmployeeUserName/* 
function todayDateTime(){
 //--------START------getting the todays Date ----------START-----------//
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output  = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '')+ day +'/'+d.getFullYear() ;
        var time    = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        var output_time = output+" "+ time;
        return output_time;
        //$("#mydate").val(output);
        
         //------END---------getting the todays Date ---------END-----------//
}
function readOrderItemsWithRedo() {
                $.ajax({
                    url: readOrderItemsWithRedoUrl+'/'+orderID+'/'+orderRedoID,
                    dataType: 'json',
                    success: function( response ) {
//                        for( var i in response ) {
//                            alert(response[ i ].orderItemID) 
//                        }
                        //alert("hi");
                        //clear old rows
                        $( '#orderItemsWithRedoTbl tbody' ).html( '' );

                        //append new rows
                        $( '#orderItemsWithRedoTblTemplate' ).render(response).appendTo( "#orderItemsWithRedoTbl tbody" );
                    }
                });
                 
} // end readRedoListInfo/* 
function displayImages(){
    //get the image by ajax call
         $.ajax({
              url: readImages+'/'+orderRedoID+'/'+orderID,
                dataType: 'json',
                error: function(xhr,status,error){
                            alert("Please 7788ello Contact IT (Error): "+ xhr.status+"-"+error);
                },
                 success: function(response) {
                   //alert(response.length); 
                   var li = "";
                   if(response.length >=1)
                   {
                        for(var i=0;i<response.length;i++)
                        {
                            //alert(response[i]['imageUrl']);
                            li +='<li><a href="'+response[i]['imagehref']+'"><img style="max-width: 280px; max-height: 350px; line-height: 350px;" src="'+response[i]['imageUrl']+'" alt="Image 01" /></a></li>';
                           
                            //arrayEmployeeName[i] =''+response[i]['imageUrl']+'';          
                        }
                        
                   }
                   $("#GalleryImages").html(li);
                   
                }
             
         });
}
function custInfo(){
    //get the image by ajax call
         $.ajax({
               url: custInfoUrl+'/'+orderRedoID,
                dataType: 'json',
                error: function(xhr,status,error){
                            alert("Please 7788ello Contact IT (Error): "+ xhr.status+"-"+error);
                },
                 success: function(response) {
                  
                   //alert(response.t_CustCompany);
                   $("#customRedoHeading").html('<a target=_blank href="orders/'+orderID+'">Redo Research for '+response.t_CustCompany+' '+orderID+'</a>');
                }
             
         });
}

