var submitUploadFrmUrl    = "upload/uploadcontroller/submitUploadTblFrmInfo";
var sendUploadEmailUrl    = "upload/uploadcontroller/sendUploadEmail";

var fillState             = "states/statecontroller/getStatesFromStatesTableInJsonFormat";

var confirmLeaveWindow    = false;

$(document).ready(function() {
     var t_CompanyCookie      = $.cookie('the_cookie_t_Company');
     var t_NameCookie         = $.cookie('the_cookie_t_Name');
     var t_AddressCookie      = $.cookie('the_cookie_t_Address');
     var t_CityCookie         = $.cookie('the_cookie_t_City');
     var t_StateCookie        = $.cookie('the_cookie_t_State');
     var t_ZipCookie          = $.cookie('the_cookie_t_Zip');
     var t_PhoneCookie        = $.cookie('the_cookie_t_Phone');
     var t_EmailCookie        = $.cookie('the_cookie_t_Email');
     var t_IndyContactCookie  = $.cookie('the_cookie_t_IndyContact');
     
     //alert(t_CompanyCookie);
     
     if(t_CompanyCookie) $("#t_Company").val(t_CompanyCookie);
    
     if(t_NameCookie) $("#t_Name").val(t_NameCookie);
     
     if(t_AddressCookie) $("#t_Address").val(t_AddressCookie);
       
     if(t_CityCookie) $("#t_City").val(t_CityCookie);
     
     if(t_StateCookie) $("#t_State").val(t_StateCookie);
     
     if(t_ZipCookie) $("#t_Zip").val(t_ZipCookie);
     
     if(t_PhoneCookie) $("#t_Phone").val(t_PhoneCookie);
     
     if(t_EmailCookie) $("#t_Email").val(t_EmailCookie);
     
     if(t_IndyContactCookie) $("#t_IndyContact").val(t_IndyContactCookie);
     
     $("#t_Phone").mask("(999) 999-9999? x9999");
     
     if (navigator.userAgent.match(/msie/i) ){
        //alert('You are using an old Internet Explorer Browser. Some feature might not work properly. Please update your browsers to use all the features of teh website.');
         
     }
     else
     {
         $('#summernote').summernote({
                height: 155,
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

               ]
        });
         
     }    
     
    
     
     
      $.ajax({
          type: 'POST',
          dataType: 'json',
          url: fillState,
          async: false,
          success: function(response) {
                 //Fill the second selection with the returned mysql data
                 //alert(response[0]['t_StateAbbreviation']);
                 //alert(response[0].t_StateAbbreviation);
                 var sel = $("#t_State");
                 sel.empty();
                 
                 sel.append('<option value="">--Please Select one--</option>');
                 
                 $.each(response, function(key, val) {
                     
                     sel.append('<option value="'+val.t_StateAbbreviation+'">'+val.t_StateName+'</option>');
                 });
                 //alert(t_StateCookie);
                 if(t_StateCookie) $("#t_State").val(t_StateCookie);
                 //sel.append('<option value="">--Please Select one--</option>');
//                 for(var i=0; i<response.length; i++)
//                 {
//                     sel.append('<option value="' + response[i]['t_StateAbbreviation'] + '">' + response[i]['t_StateName'] + '</option>');
//                     
//                 }    
                 //$("#t_State").html(response);
                 //$("#countryStateTable").val(ShipperID);
           }
     });
     
//     $('#t_State').change(function() {
//         alert($(this).val());
//     });
     
     
//     if($("div").is("note-dropzone"))
//     {
//         alert("hi");
//     }    
     $("#closeMyModalBtn").click(function(){
        //alert("hi");
        confirmLeaveWindow = true;
        
        leaveWindow(confirmLeaveWindow);
        
        //window.location.href("localhost/newTools/upload");
        window.location.reload(true);
    });
     $("#customerUploadFrm").validate({
         rules:{
              t_Company:{
                required:true
              
            },
              t_Name:{
                required:true
               
            },
              t_Address:{
                required:true
            },
              t_City:{
                required:true
            },
              t_State:{
                required:true
                //minlength: 2
            },
              t_Zip:{
                required:true
//                zipcodeUS: true // <-- use it like this
            },
              t_Phone:{
                required:true
            },
              t_Email:{
                required:true,
                email: true
            },
              t_IndyContact:{
                required:true
            }
              
         },
         messages: {
             t_Email: "Please enter a valid email address"
             
         },
         highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
         },
         unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
         },
         errorElement: 'span',
         errorClass: 'help-block',
         errorPlacement: function(error, element) {
            if(element.parent('.input-group').length)
            {
                error.insertAfter(element.parent());
            }
            else 
            {
                error.insertAfter(element);
            }
         },
         submitHandler: function(form){
             //submit the form via an ajax call
             var notesObj = $("#summernote").code();
             $("#notesHiddenVal").val(notesObj);
             
             //Fairway Outdoor Advertising
//             if($("#t_Company").val() == "Fairway Outdoor Advertising")
//             {
//                 //alert("url path: "+$(location).attr('href')+'/uploadcontroller/uploadCustomerFiles');
//             }  
             $("#urlPath").val($(location).attr('href')+'/uploadcontroller/uploadCustomerFiles');
             $.cookie('the_cookie_t_Company',$("#t_Company").val(),{expires:90});
             $.cookie('the_cookie_t_Name',$("#t_Name").val(),{expires:90});
             $.cookie('the_cookie_t_Address',$("#t_Address").val(),{expires:90});
             $.cookie('the_cookie_t_City',$("#t_City").val(),{expires:90});
             //alert($("#t_State").val());
             $.cookie('the_cookie_t_State',$("#t_State").val(),{expires:90});
             $.cookie('the_cookie_t_Zip',$("#t_Zip").val(),{expires:90});
             $.cookie('the_cookie_t_Phone',$("#t_Phone").val(),{expires:90});
             $.cookie('the_cookie_t_Email',$("#t_Email").val(),{expires:90});
             $.cookie('the_cookie_t_IndyContact',$("#t_IndyContact").val(),{expires:90});
              
             //alert("inside beforeUpload");
             
             $.ajax({
                url: submitUploadFrmUrl,
                type: 'POST',
                dataType: 'json',
                error: function(xhr,status,error){
                      alert("Please Contact IT (Insert Error): "+ xhr.status+"-"+error);
                },
                async: false,
                data: $("#customerUploadFrm").serialize(),
                success: function(response){
                    //alert("files uploaded" + response);
                    $("#uploadFrmSubmit").val("1");
                    $("#uploadFrmID").val(response);
                    //up.settings.multipart_params = {'uploadFrmID':  $("#uploadFrmID").val()}
                    //window.location.reload(true);
                }
             });
            
         }
         
     });
     
     //leaveWindow(confirmLeaveWindow);
     function leaveWindow(confirmLeaveWindow)
     {
         //alert("inside window");
         
         //alert("confirmLeaveWindow "+ confirmLeaveWindow);
         
         window.onbeforeunload = function() 
         {
             if(!confirmLeaveWindow)
             {
                 
                 return "Please make sure your files have finished before closing the window!";
                  //return "Are you sure you want to navigate away?";
             }
         }
        
     } 
      
     //alert($(location).attr('href'));
//    window.onbeforeunload = function() {
//        return 'Are you sure you want to navigate away?';
//    }
    $(function() {
          
            //setup html5 version
            var uploadInitialized = false;
            $("#uploader").pluploadQueue({
            // General settings
            runtimes :  'html5, flash',
            //max_file_size : '1024mb',
            url : $(location).attr('href')+'/uploadcontroller/uploadCustomerFiles',
//            headers: {
//                'X-Requested-With': 'XMLHttpRequest'
//            },
            //url : 'uploadFiles/uploadfilescontroller/websiteUploadFiles',
            

            
            // Resize images on clientside if we can
            //resize : {quality : 100},
            
            //unique_names : true,
            //multipart: true,
            //multiple_queues: true,
           
            // Flash settings
            flash_swf_url : 'http://upload.indyimaging.com/tools/js_plupload/Moxie.swf',
          
             init: 
             {
                 StateChanged: function(up) {
                    if (!uploadInitialized && up.state == plupload.STARTED) 
                    {
                       
                        if (!$("#customerUploadFrm").valid()) 
                        {
                            //alert($("#t_State").val()); 
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
                      if(!$("#uploadFrmSubmit").val())
                      {
                          $("#customerUploadFrm").submit();
                          
                          up.settings.multipart_params = {'uploadFrmID':  $("#uploadFrmID").val()}
                       
                      }
                      else
                      {
                           up.settings.multipart_params = {'uploadFrmID':  $("#uploadFrmID").val()}
                      }    
                    
//                 up.settings.multipart_params = {'t_Company': $('#t_Company').val(),'t_Name': $('#t_Name').val(),
//                                                 't_Address': $('#t_Address').val(),'t_City': $('#t_City').val(),
//                                                 't_State': $('#t_State').val(),'t_Zip': $('#t_Zip').val(),
//                                                 't_Phone': $('#t_Phone').val(),'t_Email': $('#t_Email').val(),
//                                                 't_IndyContact': $('#t_IndyContact').val()}
                 },
                 FilesAdded: function(up, files) {
                          //alert("hi1");
                          //alert("hi 1.2");
                          //parent.scrollTo(0,0);
                          var uploader = $('#uploader').pluploadQueue();
                          leaveWindow(confirmLeaveWindow);
                          //alert("hi2");
//                         // saves the total size of all loaded files
                          var totalsize = 0;
                          //alert("hi3");
                          
                          for(var i=0; i<files.length; i++) 
                          {
                              //alert(files[i].size);  
                              totalsize += files[i].size;
                          }
                          //alert("hi4");
                          var countLoop = 0;
                          uploader.bind('UploadProgress', function(up) {
//                                if(!$("#customerUploadFrmContent").hasClass('hide'))
//                                {
//                                    //$("#customerUploadFrmContent").addClass('hide');
//
//                                }
                                if(!$("#closeMyModalBtn").hasClass("hide"))
                                {
                                    $("#closeMyModalBtn").addClass("hide");  
                                }
                                
                                $("#myModal").modal({
                                    backdrop: 'static',
                                    keyboard: false
                                });
                                
                               // displaying time remaining for all file
                               countLoop++;
                               var retTime = null;
                               var remain = 0;
                               var upBytes = 0;
                               var minutes = 0;
                               var seconds = 0;
                               //alert("total.percent"+ up.total.percent + " bytesPerSec "+up.total.bytesPerSec+ " totalSize "+totalsize);
                               if( up.total.percent > 0 && up.total.bytesPerSec > 0 && totalsize > 0) 
                               {
                                    //alert("hi4.3");
                                    // calculate the remaining bytes
                                    upBytes = totalsize - ((totalsize * up.total.percent) / 100);
                                    //alert("upBytes: "+upBytes);
                                    
                                    // calculate the remaining seconds
                                    remain = upBytes/up.total.bytesPerSec;
                                    //alert("remain: "+remain);
                                    // create min and sec string
                                    minutes = Math.floor(remain/60);
                                    seconds = Math.floor(remain % 60);
                                    retTime = minutes + " min " + seconds + " sec"; 
                                    
                                    //alert("retTime0: "+retTime);
                                    //alert(countLoop);
                                   
                               }
                               //alert("retTime1: "+retTime);
                               if($("#estTimeLeft").hasClass("hide"))
                               {
                                   $("#estTimeLeft").removeClass("hide")
                               }    
                               $(".text-muted").text("Esimated time Left (All Files): "+retTime);
    
                               
                           });
                           //alert("retTime2: "+retTime);
                          //var uploader = $("#uploader").pluploadQueue();
//                          uploader.bind('UploadProgress', function(up) {
//                              alert("hi4.1");
//                             // displaying time remaining for all file
//                             var retTime = null;
//                             var remain = 0;
//                             var upBytes = 0;
//                             var minutes = 0;
//                             var seconds = 0;
//                             alert("hi4.2");
//                             if( up.total.percent > 0 && up.total.bytesPerSec > 0 && totalsize > 0) 
//                             {
//                                 alert("hi4.3");
//                                 // calculate the remaining bytes
//                                 upBytes = totalsize - ((totalsize * up.total.percent) / 100);
//
//                                // calculate the remaining seconds
//                                remain = upBytes/up.total.bytesPerSec;
//
//                                // create min and sec string
//                                minutes = Math.floor(remain/60);
//                                seconds = Math.floor(remain % 60);
//                                retTime = minutes + " min " + seconds + " sec"; 
//                                 alert("hi4.4");
//                            } 
//                          });
                          //alert("hi5" + retTime);
                 },
                 Error: function(up,error) {
                     //alert("Error Uploading Please contact IT: "+ error.code+": " + error.message);
                     $("#myModal .modal-header").html("<h3>Error :</h3>");
                                 
                     $("#myModal .modal-body #message").html("Sorry for the inconvenience. we will get in touch with you to resolve the upload issue.");
                     
                     console.log("formData here ");
                     if($("#closeMyModalBtn").hasClass("hide"))
                     {
                         $("#closeMyModalBtn").removeClass("hide");  
                     } 
                     $("#myModal").modal({
                          backdrop: 'static',
                          keyboard: false
                     });
                      
                      var errorCode      = error.code;
                      var errorMsg       = error.message;
                      var uploadFrmID    =   $("#uploadFrmID").val();
                      var customerEmail  = $("#t_Email").val();
                      var customerName   = $("#t_Name").val();
                      
                      var customerPhone  = $("#t_Phone").val();
                      
                      var t_IndyContact  = $("#t_IndyContact").val();
                      
                      //alert("fileName:"+ up);
                      console.log("up: "+ up);
                      console.dir("up: "+ up)
                      
                      var errorData      = "";
                      errorData         += "&uploadErrCode="+errorCode;
                      errorData         += "&uploadErrMsg="+errorMsg;
                      errorData         += "&uploadFrmID="+uploadFrmID;
                      
                      errorData         += "&customerEmail="+customerEmail;
                      errorData         += "&customerName="+customerName;
                      errorData         += "&customerPhone="+customerPhone;
                      errorData         += "&t_IndyContact="+t_IndyContact;
                      
                      $.ajax({
                            url: "upload/uploadcontroller/updateError/",
                            type: 'GET',
                            error: function(xhr,status,error){
                                  alert("Please Contact IT (upload  Error): "+ xhr.status+"-"+error);
                            },
                            async: false,
                            data: errorData,
                            success: function(response){
                                
                            }
                      });
                     
                    
                      
                      // send an update to upload Table to notify that an error occured in sending the file.
                     
                     
                 },
                 FileUploaded: function(up,file,response) {
                       // Called when a file has finished uploading
                    //alert("fileUploaded outside");
                   
                    var  yx=0;
                    //$("#customerUploadFrmContent").toggleClass("hide");
                    
//                    if(!$("#customerUploadFrmContent").hasClass('hide'))
//                    {
//                      
//                        $("#customerUploadFrmContent").addClass('hide');
//                     
//                    }
//                    if(!$("#closeMyModalBtn").hasClass("hide"))
//                    {
//                        $("#closeMyModalBtn").addClass("hide");  
//                    }   
                    
                    // hide the upload form
//                    $("#myModal").modal({
//                         
//                          backdrop: 'static',
//                          keyboard: false
//                    });
                    
                    if(up.total.queued ===0)
                    {
                        //alert("fileUploaded inside");
                        var CountFiles = up.files.length;
                        var tmpfileNames = "id="+"";
                        var fileNames = "<ul>";
                        //var fileNames = "<h5>The Following Files have been uploaded</h5><br/><ul>";
                        for(var i=0; i< CountFiles; i++)
                        {
                            fileNames += "<li>"+ up.files[i].name + "</li>";
                            //alert("Files uploaded: "+ up.files[i].name);
                        }
                        fileNames         += "</ul>";
                        //alert(fileNames);
                        tmpfileNames      += fileNames;
                        
                        var customerEmail  = $("#t_Email").val();
                        var customerName   = $("#t_Name").val();
                        var notesName      = $("#notesHiddenVal").val();
                        
                        
                        var uploadFrmID    =   $("#uploadFrmID").val();
                        
                        tmpfileNames      += "&customerEmail="+customerEmail;
                        tmpfileNames      += "&customerName="+customerName;
                        tmpfileNames      += "&notesName="+notesName;
                        tmpfileNames      += "&uploadFrmID="+uploadFrmID;
                        
                        //alert(tmpfileNames);
                        
                        $.ajax({
                            url: sendUploadEmailUrl,
                            type: 'GET',
                            error: function(xhr,status,error){
                                  alert("Please Contact IT (Email Error): "+ xhr.status+"-"+error);
                            },
//                            beforeSend: function() { 
//                                $("#myModal").modal({
//                                    backdrop: false
//                                });
//                            },
                            async: false,
                            cache: false,
                            data: tmpfileNames,
                            success: function(response){
                                 if($("#closeMyModalBtn").hasClass("hide"))
                                 {
                                    $("#closeMyModalBtn").removeClass("hide");  
                                 } 
                                 $("#myModal .modal-header").html("<h3>The Following Files have been uploaded</h3>");
                                 
                                 $("#myModal .modal-body #message").html(fileNames);
                                 
//                                 $("#myModal").modal({
//                                        backdrop: 'static',
//                                        keyboard: false
//                                 });
                            }
                        });
                        
//                        setTimeout(
//                        function(){
//                             $("#myModal .modal-header").html("<h3>We got your Request</h3>");
//                        },1000);
//                        setTimeout(
//                        function(){
//                             $("#myModal .modal-body #message").html(fileNames);
//                        },1000);
//                        $("#myModal").modal({
//                             backdrop: 'static',
//                             keyboard: false
//                        });
                    }
                 }
             }
            });
        });
});


