var readUrl                        = "orderItems/orderitemcontroller/readOrderItemUpSideFrmData/";

var readCreateUrl                  = "orderItems/orderitemcontroller/readCreateOrderItemUpSideFrmData/";

var readProductBuildCategories     = "productBuilds/productbuildcontroller/getProductBuildCategoriesData/";

var readProductBuildNames          = "productBuilds/productbuildcontroller/getProductBuildNameFromCategoryData/";

var submitOrderItemUpSideFrmUrl    = "orderItems/orderitemcontroller/submitOrderItemUpSideFrmData/";

var readPagination                 = "orderItems/orderitemcontroller/getOrderItemUpSideFrmPagination/";

var readImages                     = "orderItems/orderitemcontroller/getPrepressImage/";

var uploadImages                   = "orderItems/orderitemcontroller/uploadPrepressImage/";

var submitProofModalFrm            = "orderItems/orderitemcontroller/submitProofModalData/";

var readUserName                   = "statusLog/statuslogcontroller/getEmployeeUserNameFromEmployeeTable";

var readProofImages                = "orderItems/orderitemcontroller/getProofImage/";

var deleteProofInfo                = "orderItems/orderitemcontroller/deleteProofInfo/";

var customerProofBtn               = "orderItems/orderitemcontroller/customerProofView/";

var readCurrentOrderItemJobStatus  = "statusLog/statuslogcontroller/getJobStatus/";

var readNewStatus                  = "statusLog/statuslogcontroller/getNewStatusNameFromStatusesTable/";

var submitOrderItemJobStatusChange = "statusLog/statuslogcontroller/submitStatusChange";

var submitemplateNameChange        = "orderItems/orderitemcontroller/updateOrderItemTemplateName";

var createQRCodeURL                = "orders/ordercontroller/createQRCodeFromOrderID";

var createTemplate                 = "orderItems/orderitemcontroller/createTemplateFromOrderItemID";

$(document).ready(function() {
    
    $("#requestCalledHidden").val(requestCalled);
    $("#orderItemIDHidden").val(changeID);
    
    $("#templateChangeName").live("click", function(){
            if(requestCalled == "template")
            {
                 //alert("template page" + templateName );
                 $("#templateNameInput").val(templateName);
              
                 $("#templateChangeModalForm").modal({
                    backdrop: false
                });
                
            }    
           
    });
//    $("#n_Qty").on('keyup', function(e) {
//        alert("hi");
//        if(e.keyCode == 9) {
//            var input = $(this).find('input:focus');
//            alert(input);
//            // input is the element that has focus after the tab key was pressed
//        }
//    });
    $("#validateModalTemplateChangeFrm").click(function(){
            //alert("hi");
            $("#templateChangeForm").valid();
            $("#templateChangeForm").submit();
        
    });
    $("#templateChangeForm").validate({
            rules: {
                templateNameInput : {
                    required: true              
                }
            },
            submitHandler: function(form){
                //alert(submitemplateNameChange);
                //alert(changeID);
                $.ajax({
                    url: submitemplateNameChange+'/'+changeID,
                    type: 'POST',
                    data: $(form).serialize(),
                    success: function(response){
                        if(requestCalled == "read")
                        {
                            //window.location.href = "orderItemUpSideFrm/read/"+changeID;
                            
                        }
                        if(requestCalled == "template")
                        {
                            window.location.href = "orderItemUpSideFrm/template/"+changeID;
                            
                        }  
                        
                        //window.location.reload(true);
                    }
                });
            }
     });
    //alert("hi");
    var getPath = location.href;
    //alert(getPath);
    var pathArry = getPath.split("#");
    //alert(pathArry[1]);
    if(pathArry[1] == "ph")
    {
        $("#dupOrderItem").hide();
        $("#templateBtnGroup").hide();
        $("#userAccessRow").addClass('hide');
    }
    if(pathArry[1] == "dup")
    {
        //alert($("#templateChangeName"));
        $("#templateChangeName").trigger("click");
        
    }    
    $("#customerProofBtn").click(function(){
        //alert("hi");
        $('.modal').modal('hide');
        window.open("http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports&reportUnit=%2Freports%2FindyImagingReports%2FCustomerProof&j_username=joeuser&j_password=joeuser&orderItemID="+$("#orderItemIDHidden").val()+"&output=pdf",'_blank');
//        $.ajax({
//                url: customerProofBtn+$("#orderItemIDHidden").val(),
//                error: function(xhr,status,error){
//                           alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//                           
//                },
//                success: function(response) {
//                    //hide the modal window
//                    //$('.modal').modal('hide');
//                   // window.location.href ="orderItemUpSideFrm/read/"+$("#orderItemIDHidden").val();
//                }
//
//        });
        
        return false;
        
        
    });
    
    $("#orderItemTemplateCustomerAnchor").click(function(){
        //call an ajax call to create a QR code.
        alert("this customer");
        $.ajax({
                url: createTemplate+'/'+changeID+'/'+"customer",
                //dataType: "json",
                error: function(xhr,status,error){
                   alert("Please Contact IT (Template Creation Error): "+ xhr.status+"-"+error);
                },
                async: false,
                success: function( response ) {
                    window.open ('orderItemUpSideFrm/template/'+response,'_blank');
  
                          
                 }
        });
        
        
        
        return false;
        
    });
    
    $("#orderItemTemplateRefGuideAnchor").click(function(){
        $.ajax({
                url: createTemplate+'/'+changeID+'/'+"guide",
                //dataType: "json",
                error: function(xhr,status,error){
                   alert("Please Contact IT (Template Creation Error): "+ xhr.status+"-"+error);
                },
                async: false,
                success: function( response ) {
                     window.open ('orderItemUpSideFrm/template/'+response,'_blank');
  
                          
                 }
        });
        return false;
        
    });
    
    $("#orderItemPrintTicketAnchor").click(function(){
        //call an ajax call to create a QR code.
        window.open ("http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports&reportUnit=%2Freports%2FindyImagingReports%2FpartialTicketMainReport&j_username=joeuser&j_password=joeuser&OrderItemID="+$("#orderItemIDHidden").val()+"&output=pdf",'_blank');
           
        return false;
        
    });
    
    $("#orderItemPrintImageAnchor").click(function(){
        //alert("hi");
        window.open ("http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports&reportUnit=%2Freports%2FindyImagingReports%2FPrintMaterialReport&j_username=joeuser&j_password=joeuser&OrderItemID="+$("#orderItemIDHidden").val()+"&output=pdf",'_blank');

        return false;
        
    });
    
    $("#orderItemPrintLabelAnchor").click(function(){
        //alert("hi");
        window.open ("http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports&reportUnit=%2Freports%2FindyImagingReports%2FprintImageMainReport&j_username=joeuser&j_password=joeuser&OrderItemID="+$("#orderItemIDHidden").val()+"&output=pdf",'_blank');

        return false;
        
    });
    $("#orderItemPrintTicketAllAnchor").click(function(){
        window.open ("http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports&reportUnit=%2Freports%2FindyImagingReports%2FpartialTicketAllReport%2FPartialTicketAll&j_username=joeuser&j_password=joeuser&OrderID="+orderIDView+"&output=pdf",'_blank');

        return false;
        
    });
    
    $("#orderItemReprintTicketLabelAnchor").click(function(){
        //call an ajax call to create a QR code.
        window.open ("http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports%2FreprintTicket&reportUnit=%2Freports%2FindyImagingReports%2FreprintTicket%2FreprintTicket&j_username=joeuser&j_password=joeuser&OrderItemID="+$("#orderItemIDHidden").val()+"&output=pdf",'_blank');
        return false;
        
    });
    
    $("#deleteModalProofInfoFrm").click(function(){
        // do an ajax call and update the values to null and remove the image.
        $.ajax({
                url: deleteProofInfo+$("#orderItemIDHidden").val()+'/'+orderIDView+'/',
                error: function(xhr,status,error){
                           alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                           
                },
                success: function(response) {
                    //hide the modal window
                    $('.modal').modal('hide');
                    window.location.href ="orderItemUpSideFrm/read/"+$("#orderItemIDHidden").val();
                }

        });
        
        return false;
    });
    $("#cancelModalProofInfoFrm").click(function(){
        //alert("hi");
        //hide the modal window
        $('.modal').modal('hide');
        window.location.reload(true);
        
        return false;
        
        
        
    });
    $("#validateModalProofInfoFrm").click(function(){
       
        //alert("hi1");
        
        $("#proofInfoFrm").valid();
        //$("#proofInfoFrm").submit();
        //alert("hi2");
        if($("#proofImageNotFound").val() == "1")
        {
            $("#proofInfoFrm").submit();
            
        }    
        
        //alert("hi3");
        //alert("hi4");
        return false;
       
    });
//    $('#proofInfoFrmDiv').on("submit","#proofInfoFrm",function(){
//      
//             alert("hello");
//             alert("insdieSubmit Form1");
//             //var fd = new FormData(document.getElementById("proofUploadImage"));
//             $.ajax({
//                    url: submitProofModalFrm,
//                    //dataType: "json",
//                    error: function(xhr,status,error){
//                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//                    },
//                    type: 'POST',
//                    //dataType: 'json',
//                    data: {proofCreatedBy:$("#proofCreatedBy").val(),proofNotes:$("#proofNotes").val(),proofOrderItemIDHidden:$("#proofOrderItemIDHidden").val(),proofOrderIDHidden:$("#proofOrderItemIDHidden").val()},
//                    //data: fd,
//                    //processData: false,  // tell jQuery not to process the data
//                    //contentType: false,  // tell jQuery not to set contentType
//                    //data: $(form).serialize(),
//                    success: function( response ) {
//                        alert(response);
//                        if(response == "dataOnly")
//                        {
//                            if($("#customerProofBtn").hasClass("hide"))
//                            {
//                                $("#customerProofBtn").removeClass("hide");
//                                
//                            }
//                            if(!$("#validateModalProofInfoFrm").hasClass("hide"))
//                            {
//                                $("#validateModalProofInfoFrm").addClass("hide");
//                                
//                            }    
//                        }    
//                        //--- clear form ---
//                        //$("#proofInfoFrm").clearForm();
//                       
//                        //hide the modal window
//                        //$('.modal').modal('hide');
//                    }
//             });
//     
//        
//    });
    $("#proofInfoFrm").validate({
         rules:{
             proofCreatedBy : {
                 required:true
             },
             proofImageNotFound : {
                 required:true
             }
         },
         messages:{
             proofImageNotFound : {
                 required:"Please upload an image"
                 
             }
             
         },
         errorPlacement: function (error, element) {
             if (element.attr('name') == "proofImageNotFound") 
             {
                 //alert("tttt")
                 //error.insertAfter(("#proofUploadImage"));
                 error.appendTo('#imageNotFoundError');
                 
             }
             else
             {
                 //alert("6666")
                 error.insertAfter(element); 
             }  
             
         },
         submitHandler: function(form){
             //alert("hello");
             //alert("insdieSubmit Form1");
             //var fd = new FormData(document.getElementById("proofUploadImage"));
             $.ajax({
                    url: submitProofModalFrm,
                    //dataType: "json",
                    error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                    },
                    type: 'POST',
                    //dataType: 'json',
                    data: {proofCreatedBy:$("#proofCreatedBy").val(),proofNotes:$("#proofNotes").val(),proofOrderItemIDHidden:$("#proofOrderItemIDHidden").val(),proofOrderIDHidden:$("#proofOrderItemIDHidden").val()},
                    //data: fd,
                    //processData: false,  // tell jQuery not to process the data
                    //contentType: false,  // tell jQuery not to set contentType
                    //data: $(form).serialize(),
                    success: function( response ) {
                        //alert(response);
                        if(response == "dataOnly")
                        {
                            if($("#customerProofBtn").hasClass("hide"))
                            {
                                $("#customerProofBtn").removeClass("hide");
                                
                            }
                            if(!$("#validateModalProofInfoFrm").hasClass("hide"))
                            {
                                $("#validateModalProofInfoFrm").addClass("hide");
                                
                            }
                            if($("#deleteModalProofInfoFrm").hasClass("hide"))
                            {
                                $("#deleteModalProofInfoFrm").removeClass("hide");
                            }    
                        }    
                        //--- clear form ---
                        //$("#proofInfoFrm").clearForm();
                       
                        //hide the modal window
                        //$('.modal').modal('hide');
                    }
             });
         }
        
    });
    
    $("#applyToAll").click(function(){
        if($(this).is(':checked'))
        {
            if($("#customWarningMsg").hasClass("hide"))
            {
                $("#customWarningMsg").removeClass("hide");
                $("#customWarningMsg").css({'height': '15px','margin-top': '2.5px','margin-bottom': '5px','padding-top': '2.5px','padding-bottom': '5px'});
                $("#validateModalOrderItemStatusChangeFrm").text("Save All");
            }
        }
        else
        {
            if(!$("#customWarningMsg").hasClass("hide"))
            {
                $("#customWarningMsg").addClass("hide");
                //$("#customWarningMsg").css({'margin-top': '0px','margin-bottom': '15px','padding-bottom': '15px'});
                $("#validateModalOrderItemStatusChangeFrm").text("Save");
            }
            
        } 
        
    });
    $("#orderItemStatusChangeLink").click(function(){
        readNewJobStaus();
        readEmployeeUserName("userName");
        
//        $("<input />", { text: "Hej" }).appendTo("#orderItemStatusChangeDiv");
        $.ajax({
            url: readCurrentOrderItemJobStatus+$("#orderItemIDHidden").val()+"/orderItemChange",
            dataType: 'json',
            success: function( response ) {
                //alert(response)
                $("#currentStatus").val(response['orderItemJobStatus']);

            }
            
        });
        $("#orderItemStatusChangeModalForm").modal({
               backdrop: false
        });
        return false;
        
    });
    
    
    $("#validateModalOrderItemStatusChangeFrm").click(function(){
        //alert("hi");
        $("#orderItemStatusChangeForm").valid();
        $("#orderItemStatusChangeForm").submit();
        
    });
    //form Validation for Status Change Form
    $("#orderItemStatusChangeForm").validate({
         rules: {
             newStatus : {
                 required: true
             },
             userName : {
                 required: true
             }
         },
         submitHandler: function(form){
             $.ajax({
                 url: submitOrderItemJobStatusChange,
                 type: 'POST',
                 data: $(form).serialize(),
                 success: function(response){
                     
                      if(response == "CONFIRM")
                      {
                          //submit again confirming the change in status for multiple line items
                          //alert("Testing: "+$("#orderItemStatusChangeForm #newStatus").val());
                          $.ajax({
                              url:"statusLog/statuslogcontroller/statusChangeConfirmed",
                              type: 'POST',
                              error: function(xhr,status,error){
                                     alert("Please Contact IT (Error) OrderItem Status Change Form: "+ xhr.status+"-"+error);
                              },
                              data:  {orderIDHiddenModal:orderIDView,newStatusHiddenModal:$("#orderItemStatusChangeForm #newStatus").val(),userNameHiddenModal:$("#orderItemStatusChangeForm #userName").val(),notesHiddenModal:$("#orderItemStatusChangeForm #notes").val()},
                              success: function( response ) {
                                  $('#orderItemStatusChangeModalForm .modal').modal('hide');
                                  
                                  window.location.reload(true);
                              }
                          });
                      }
                      else
                      {
                          
                          $('#orderItemStatusChangeModalForm .modal').modal('hide');
                          
                          window.location.reload(true);
                          
                      }    
                            
                 }
                 
             });
             
         }
    });
    
    $("#orderItemProofAnchor").click(function(){
        //alert("hi");
        readEmployeeUserName("proofCreatedBy");
        $("#proofNotes").val($("#proofNotesHidden").val());
        
        $("#proofOrderItemIDHidden").val(changeID);
        
        $("#proofOrderIDHidden").val(orderIDView);
        
        //get the image by ajax call
        $.ajax({
                url: readProofImages+$("#orderItemIDHidden").val()+'/'+orderIDView+'/',
                error: function(xhr,status,error){
                            alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                },
                success: function(response) {
                    if($.trim(response) == "NO PIC")
                    {
                       
                       
                    }
                    else
                    {
                        //alert(response);
                        $("#proofImageNotFound").val("1");
                        $("#deleteModalProofInfoFrm").removeClass("hide");
                        //$("#customerProofBtn").removeClass("hide");
                        $("#proofImageUploadPreview").html(response);
                           
                    }    
                }
        });
        
        
        $("#proofModalForm").modal({
               backdrop: false
        });
        return false;
    });
    $("#addProofBtnImage").click(function(){
         $("#proofUploadImage").trigger("click");
         return false;
    });
    $("#proofUploadImage").change(function(){
         if(this.files.length >=1)
         {
             var file = $("#proofUploadImage")[0].files[0];            
             $("#proofImageUploadPreview").empty();
             $("#proofImageNotFound").val("1");
	     displayAsImage3(file, "proofImageUploadPreview","proofAjaxFrmSubmtUpload");
         }
         else
         {
             $("#proofImageNotFound").val("");
         }    
    });
    $("#selectSportBtnFrm").click(function(){
         $("#sportUploadFile").trigger("click");
         return false;
    });
    $("#sportUploadFile").change(function(){
         if(this.files.length >=1)
         {
             //$("#uploadSportSubmitFrm").removeClass("hide");
             var file = $("#sportUploadFile")[0].files[0];
             //alert(file.type);
             if(file.type == "application/pdf")
             {
                 $("#sportUploadPreview").empty();
                 //./media/img/crossblack.png
                 $("#sportUploadPreview").html('<img src="./images/pdf.jpeg" />');
                 uploadFileSubmt("prepressAjaxSportFrmSubmtUpload",file);
                 
             }
             else
             {
                 $("#sportUploadPreview").empty();
                 //$("#selectBtnFrm").text("change");
                 displayAsImage3(file, "sportUploadPreview","prepressAjaxSportFrmSubmtUpload");
                 
             }    
             
         }    
    });
    $("#selectBtnFrm").click(function(){
        //alert("hi");
//        if($("#upl").hasClass("hide"))
//        {
//            //alert("has hide class");
//            //$("#upl").removeClass("hide");
//        }    
       
        $("#upl").trigger("click");
        return false;
    });
    
    $("#upl").change(function(){
         if(this.files.length >=1)
         {
             //$("#uploadSubmitFrm").removeClass("hide");
             var file = $("input[type=file]")[0].files[0];
             //alert("hi");
             $("#preview").empty();
             //$("#selectBtnFrm").text("change");
	     displayAsImage3(file, "preview","prepressAjaxFrmSubmtUpload");
         }    
    });
  
    function FileSelectHandler(evt) {
        //alert("inside FileSelectHandler");
        FileDragHover(evt);
        evt.stopPropagation();
	evt.preventDefault();
        var files = evt.dataTransfer.files;
	var count = files.length;
       
        //alert(this.id);
        var url="";
        if(count > 0)
        {
             var file;
             var containerID;
            //alert("there is a file");
            if(this.id == "preview")
            {
                file = files[0];
                containerID = this.id;
                $("#preview").empty();
                url = "prepressAjaxFrmSubmtUpload";
                displayAsImage3(file,containerID,url);
                
            }
            else if(this.id == "sportUploadPreview")
            {
                //alert("hi");
                url = "prepressAjaxSportFrmSubmtUpload";
                file = files[0];
                containerID = this.id;
                
                if(file.type == "application/pdf")
                {
                    $("#sportUploadPreview").empty();
                    $("#sportUploadPreview").html('<img src="./images/pdf.jpeg" />');
                   
                    uploadFileSubmt(url,file);
                }
                else
                {
                    $("#sportUploadPreview").empty();
                    displayAsImage3(file,containerID,url);
                }    
                
            }
            else if(this.id == "proofImageUploadPreview")
            {
                file = files[0];
                containerID = this.id;
                $("#proofImageUploadPreview").empty();
                $("#proofImageNotFound").val("1");
                url = "proofAjaxFrmSubmtUpload";
                displayAsImage3(file,containerID,url);
                
            }    
            
            
            //upload  the file
            
        }    
    };
    function FileDragHover(evt){
        evt.stopPropagation();
        evt.preventDefault();
        //alert(this.id);
        //alert(evt.target);
        evt.target.className = (evt.type == "dragenter" ? "hover" : "");
        evt.target.className = (evt.type == "dragover" ? "hover" : "");
        
    };
    
    
//    
//    function containsFiles(event) {
//
//        if (event.dataTransfer.types) {
//            for (var i = 0; i < event.dataTransfer.types.length; i++) {
//                if (event.dataTransfer.types[i] == "Files") {
//                    return true;
//                }
//            }
//        }
//    
//    return false;
//
//    }
//    function dragEnter (evt) {
//        evt.stopPropagation();
//        evt.preventDefault();
//        
//    }
//    function noopHandler(evt) {
//        evt.stopPropagation();
//        evt.preventDefault();
//    }
//    
//    function drop(evt) {
//	evt.stopPropagation();
//	evt.preventDefault();
//
//	var files = evt.dataTransfer.files;
//	var count = files.length;
//
//	// Only call the handler if 1 or more files was dropped.
//	if (count > 0)
//        {
//            //alert("hi");
//            handleFiles(files);
//            
//        }    
//		
//    }
//
//
//    function handleFiles(files) {
//            var file = files[0];
//
//            //document.getElementById("droplabel").innerHTML = "Processing " + file.name;
//            //alert("hi1");
//            
//            //alert(file);
//            
//            var reader = new FileReader();
//
//            // init the reader event handlers
//            //reader.onprogress = handleReaderProgress;
//            //reader.onloadend = handleReaderLoadEnd;
//
//            // begin the read operation
//            $("#preview").empty();
//            var container = document.getElementById("preview");
//            var img = document.createElement("img");
//            img.style.cssText = 'max-width: 280px; max-height: 150px; line-height: 150px;'
//            var reader;
//	    container.appendChild(img);
//	    reader = new FileReader();
//	    reader.onload = (function (theImg) 
//            {
//                return function (evt) {
//                    theImg.src = evt.target.result;
//				};
//            }(img));
//            reader.readAsDataURL(file);
//    }
    
    function displayAsImage3(file, containerid,url) {
		if (typeof FileReader !== "undefined") {
			var container = document.getElementById(containerid);
			var img = document.createElement("img");
                        img.style.cssText = 'max-width: 280px; max-height: 150px; line-height: 150px;'
			var reader;
			container.appendChild(img);
			reader = new FileReader();
			reader.onload = (function (theImg) 
                        {
				return function (evt) {
                                       
					theImg.src = evt.target.result;
				};
			}(img));
			reader.readAsDataURL(file);
                        
                        uploadFileSubmt(url,file);
		}
     };
     function uploadFileSubmt(url,file)
     {
         var formData = new FormData();
         if(url == "prepressAjaxFrmSubmtUpload")
         {
             
             formData.append('upl', file);
             
             formData.append('uploadOrderItemIDHidden',changeID);
         
             formData.append('uploadOrderIDHidden',orderIDView);
             
             var xhr = new XMLHttpRequest();
         
             xhr.onreadystatechange=function()
             {
                 if (xhr.readyState==4 && xhr.status==200)
                 {
                     var msg =xhr.responseText;
                     if(msg == "success")
                     {
                         //alert("hi");
                         window.location.reload(true);
                         
                     }
                     else
                     {
                         alert("Prepress Upload Error -Please contact IT");
                         
                     }    
                     
                 }    
                 
             }
             xhr.open('POST', 'orderItems/orderitemcontroller/uploadPrepressImage', true);
             
             xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) 
                    {
                        if($("#prepressUploadBar").hasClass("hide"))
                        {
                             $("#prepressUploadBar").removeClass("hide");

                        } 
                    }
             };
             
             xhr.send(formData);  // multipart/form-data
             
         }
         else if(url == "prepressAjaxSportFrmSubmtUpload")
         {
                
            
             //alert("file"+file);
             formData.append('sportUploadFile', file);
             
             formData.append('sportUploadOrderItemIDHidden',changeID);
         
             formData.append('sportUploadOrderIDHidden',orderIDView);
             
             formData.append('sportUploadImage',"1");
             
             var xhr = new XMLHttpRequest();
            
             xhr.onreadystatechange=function()
             {
                  if (xhr.readyState==4 && xhr.status==200)
                  {
                      var msg =xhr.responseText;
                      if(msg == "success")
                      {
                          //alert("hu "+msg);
                          window.location.reload(true);
                          
                      }
                      else
                      {
                          alert("DeckSheet Upload Error -Please contact IT");
                          
                      }    
                      
                  }    
                 
             }
             xhr.open('POST', 'orderItems/orderitemcontroller/uploadPrepressImage', true);
             
             //var progressBar = document.getElementById('deckSheetUploadBar');
             //var progressBar = document.getElementById('p');
             
             xhr.upload.onprogress = function(e) {
                 //alert(e);
                    if (e.lengthComputable) 
                    {
                        if($("#deckSheetUploadBar").hasClass("hide"))
                        {
                              $("#deckSheetUploadBar").removeClass("hide");

                        } 
                        //alert(e.loaded);
                        //alert(e.total);
                        //progressBar.value = (e.loaded / e.total) * 100;
                        //progressBar.max   = e.total;
                        //progressBar.value = e.loaded;
                        
                        //progressBar.value = (e.loaded / e.total) * 100;
                         //alert(progressBar.value);
                        //progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
                    }
             };
//             xhr.onloadend = function(e){
//                 progressBar.value = e.loaded;
//             }
             xhr.send(formData);  // multipart/form-data
             
         }
         else if(url == "proofAjaxFrmSubmtUpload")
         {
             formData.append('proofUploadImage', file);
             
             formData.append('proofOrderItemIDHidden',changeID);
         
             formData.append('proofOrderIDHidden',orderIDView);
             
             //formData.append('proofImageNotFound',orderIDView);
             
             var xhr = new XMLHttpRequest();
             xhr.onreadystatechange=function()
             {
                 if (xhr.readyState==4 && xhr.status==200)
                 {
                     var msg =xhr.responseText;
                     if(msg == "success")
                     {
                        if(!$("#proofUploadBar").hasClass("hide"))
                        {
                             $("#proofUploadBar").addClass("hide");

                        }
                         //$("#proofImageNotFound").val("1");
                         //window.location.reload(true);  
                     }
                     else
                     {
                         alert("Proof Upload Error -Please contact IT");
                          
                     }    
                 }   
             }
         
             xhr.open('POST', 'orderItems/orderitemcontroller/submitProofModalUpload', true);
             //xhr.open('POST', 'orderItems/orderitemcontroller/submitProofModalData', true);
             
             xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) 
                    {
                        if($("#proofUploadBar").hasClass("hide"))
                        {
                             $("#proofUploadBar").removeClass("hide");

                        } 
                        $("#imageNotFoundError").empty();
                        //alert("proofImageNotFound Value: "+$("#proofImageNotFound").val());
                    }
             };
             
             xhr.send(formData);  // multipart/form-data
         }    
         
     };
    $("#minusOrderItemDashNum").click(function(){
        //alert("totalDasNum "+$("#totalDasNum").val());
        //alert("currentDasNum "+$("#currentDasNum").val());
        
        // get the total DashNum
        var totalDashNum   = $("#totalDasNum").val();
        
        //get the current dashNum
        var currentDashNum = $("#currentDasNum").val();
        
        //find if the total is greater than current
        if(currentDashNum >= 2)
        {
            currentDashNum--;
            //alert(currentDashNum);
            $("#currentDasNum").val(currentDashNum);
            
            // get the orderItemID from OrderID and DashNum
            $.ajax({
                url: readPagination+$("#orderIDHidden").val()+'/'+currentDashNum+'/'+"minus",
                dataType: 'json',
                error: function(xhr,status,error){
                           alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                           
                },
                success: function(response) {
                    //alert(response.kp_OrderItemID);
                    //alert(response['kp_OrderItemID']);
                    window.location.href ="orderItemUpSideFrm/read/"+response['kp_OrderItemID'];
                }
            });
        }
        
    });
    $("#addOrderItemDashNum").click(function(){
        //alert("totalDasNum "+$("#totalDasNum").val());
        //alert("currentDasNum "+$("#currentDasNum").val());
        //alert("orderID "+$("#orderIDHidden").val());
        // get the total DashNum
        var totalDashNum   = parseInt($("#totalDasNum").val());
        
        //get the current dashNum
        var currentDashNum = parseInt($("#currentDasNum").val());
        
        //find if the total is greater than current
        if(currentDashNum < totalDashNum)
        {
            currentDashNum++;
            //alert(currentDashNum);
            $("#currentDasNum").val(currentDashNum);
            // get the orderItemID from OrderID and DashNum
            $.ajax({
                url: readPagination+$("#orderIDHidden").val()+'/'+currentDashNum+"/addition",
                dataType: 'json',
                error: function(xhr,status,error){
                           alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                           
                },
                success: function(response) {
                    //alert(response.kp_OrderItemID);
                    //alert(response['kp_OrderItemID']);
                    window.location.href ="orderItemUpSideFrm/read/"+response['kp_OrderItemID'];
                }

            });
        }
        
        
    });
    $("#orderItemUpSideFrm :input").on('change keyup',function() {
        if(requestCalled == "read" || requestCalled == "template")
        {
            $("#submitTypeOIUpSideFrm").show();
        } 
    });
    
    if(requestCalled == "read")
    {
        
        //alert("hi read");
        readOrderItemUpSideFrm();
        
        //create the QRcode
        createQRCodeFromOrderID();
        $("#submitTypeOIUpSideFrm").hide();
        
        $("#displayPaginationNum").css({height: '23px','cursor': 'default','margin-top': '8px','line-height':'23px'});
        
        $(".displayPagi").css({height: '23px','margin-top': '8px','line-height':'23px'});
        
        $("#mainOrderItemUpSideFrm").css({'margin-top': '5px'});
        //$("#differentSportRow").css({'margin-top': '65px'});
        
        $("#riot").css({'margin-top': '5px'});
        
        //$("#uploadFrm").css({'margin-top': '2.5px'});
        
        $("#uploadFrm").css({'margin-top': '2.5px','margin-bottom': '0px','padding-bottom': '0px'});
        
        $("#upload").css({'margin-bottom': '0px','padding-bottom': '0px'});
        
        $("#selectBtnFrm").css({'padding-bottom': '2px','padding-right': '10px'});
       
        
        
        $(".differentSportUploadRow").css({'margin-top': '17px','padding-bottom': '17px'});
        
        $("#uploadOrderItemIDHidden").val(changeID);

        $("#uploadOrderIDHidden").val(orderIDView);
        
        //upload of sport image input hidden elements
        $("#sportUploadOrderItemIDHidden").val(changeID);
        $("#sportUploadOrderIDHidden").val(orderIDView);
        
        //get the image by ajax call
         $.ajax({
                url: readImages+$("#orderItemIDHidden").val()+'/'+orderIDView,
                dataType: 'json',
                error: function(xhr,status,error){
                            alert("Please 7788ello Contact IT (Error): "+ xhr.status+"-"+error);
                },
                success: function(response) {
                    if($.trim(response) == "NO PIC")
                    {
                       
                    }
                    else
                    {
                        if(response.prepressImageFound == "yes")
                        {
                            //var li ='<a href="'+'orderItems/orderitemcontroller/imageBackBtn/'+response.orderItemID+'/'+response.orderID+'/'+response.dateReceived+'/'+response.prepressImageName+'"><img id="previewInfo" style="max-width: 280px; max-height: 150px; line-height: 150px;" src="'+response.prepressImageURL+'" alt="Image 01" /></a>';
                             //alert(response.prepressImageURL);
                             var li ='<a href="'+'orderItems/orderitemcontroller/imageBackBtn/'+response.orderItemID+'/'+response.orderID+'/'+response.dateReceived+'/'+response.prepressImageName+'"><img id="previewInfo"  src="'+response.prepressImageURL+'" alt="Image 01" /></a>';
                            $("#preview").html(li);
                            
                        }
                        if(response.sportImageFound == "yes")
                        {
                            if(response.deckSheetExtension == "pdf")
                            {
                                //alert(response.sportImageURL);
                                //alert("hi1");
                                //var si ='<a href="'+'orderItems/orderitemcontroller/imageBackBtn/'+response.orderItemID+'/'+response.orderID+'/'+response.dateReceived+'/'+response.sportImageName+'">'+response.sportImageName+'</a>';
                                //$("#sportUploadPreview").html(si);
                                
                                
                                //var si ='<a href="'+'orderItems/orderitemcontroller/imageBackBtn/'+response.orderItemID+'/'+response.orderID+'/'+response.dateReceived+'/'+response.sportImageName+'"><img id="sportUploadPreviewInfo" src="'+response.sportImageURL+'" alt="Image 01" /></a>';
                                //$("#sportUploadPreview").html(si);
                                var dateReceivedArry = response.dateReceived.split("-");
                                
                                var si ='<a href="'+'http://'+location.host+'/images/Orders/'+dateReceivedArry[0]+'/'+dateReceivedArry[1]+'/'+response.orderID+'/'+response.orderItemID+'/'+response.sportImageName+'"><img id="sportUploadPreviewInfo" src="'+response.sportImageURL+'" alt="Image 01" /></a>';
                                $("#sportUploadPreview").html(si);
                                
                            }
                            else
                            {
                                //alert("hi2");
                                //var si ='<a href="'+'orderItems/orderitemcontroller/imageBackBtn/'+response.orderItemID+'/'+response.orderID+'/'+response.dateReceived+'/'+response.sportImageName+'"><img id="sportUploadPreviewInfo" style="max-width: 280px; max-height: 150px; line-height: 150px;" src="'+response.sportImageURL+'" alt="Image 01" /></a>';
                                var si ='<a href="'+'orderItems/orderitemcontroller/imageBackBtn/'+response.orderItemID+'/'+response.orderID+'/'+response.dateReceived+'/'+response.sportImageName+'"><img id="sportUploadPreviewInfo" src="'+response.sportImageURL+'" alt="Image 01" /></a>';
                                $("#sportUploadPreview").html(si);
                                
                            }
                            
                        }    
                    }   
                }
        });
        
        dynamicProductBuildSelect();
        
//        $("#makeProductBuildClick").html('<a id="makeProductBuildActive" href="#" class=productBuildDynamicLink>Product Build</a>');
//        
//        $('#makeProductBuildActive').on('click', function(event) {
//            
//            $('#productBuildCategory').attr("disabled",false);
//           
//            $('#productBuildName').attr("disabled",false);
//            
//            var currentProductBuildCategory = $('#productBuildCategory').val();
//            
//            var currentProductBuild         = $('#productBuildName').val();
//            
//            $("#currentProductBuildID").val(currentProductBuild);
//            
//            $selectProductBuildCategory     = $('#productBuildCategory');
//            
//            $selectProductBuildName         = $('#productBuildName');
//            
//            //call the ajax call and populate the productBuild Category List
//            $.ajax({
//                url: readProductBuildCategories,
//                dataType: 'json',
//                error: function(xhr,status,error){
//                               //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//                               //if there is an error append a 'none available' option
//                               $select.html('<option value="-1">none available</option>');
//                },
//                success: function( response ) {
//                //clear the current content of the select
//                $selectProductBuildCategory.html('');
//
//                //alert(currentProductBuildCategory);
//                //$select.append('<option value="">...Categories</option>');
//
//                    //iterate over the data and append a select option
//                    $.each(response, function(key, val){
//                        if(currentProductBuildCategory == val.t_Category)
//                        {
//                            //alert("selected");
//                            $selectProductBuildCategory.append('<option value="'+ val.t_Category +'" selected>' + val.t_Category + '</option>');
//                        }
//                        else
//                        {
//                            $selectProductBuildCategory.append('<option value="'+ val.t_Category +'">' + val.t_Category + '</option>');
//                        }    
//                        
//                    });
//                }
//            });
//            
//            $.ajax({
//                    url: readProductBuildNames+currentProductBuildCategory,
//                    dataType: 'json',
//                    error: function(xhr,status,error){
//                               //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//                               //if there is an error append a 'none available' option
//                               $select.html('<option value="-1">none available</option>');
//                    },
//                    success: function( response ) {
//                         //clear the current content of the select
//                         $selectProductBuildName.html('');
//
//                         $selectProductBuildName.append('<option value="">...Product Build</option>');
//
//                         //iterate over the data and append a select option
//                         $.each(response, function(key, val){
//                            if(currentProductBuild == val.kp_ProductBuildID)
//                            {
//                                $selectProductBuildName.append('<option value="'+ val.kp_ProductBuildID +'" selected>' + val.t_Name + '</option>');
//                            }
//                            else
//                            {
//                                $selectProductBuildName.append('<option value="'+ val.kp_ProductBuildID +'">' + val.t_Name + '</option>');
//                            }
//                         })
//                         $selectProductBuildName.removeClass("hide");
//                    }
//
//            });
//            
//            // add the product Build Change function to populate the product build name depending on the productBuild Category
//            $("#productBuildCategory").change(function(){
//                $select = $('#productBuildName');
//                var productBuildCategory = $('#productBuildCategory').val();
//                $.ajax({
//                    url: readProductBuildNames+productBuildCategory,
//                    dataType: 'json',
//                    error: function(xhr,status,error){
//                               //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//                               //if there is an error append a 'none available' option
//                               $select.html('<option value="-1">none available</option>');
//                    },
//                    success: function( response ) {
//                         //clear the current content of the select
//                         $select.html('');
//
//                         $select.append('<option value="">...Product Build</option>');
//
//                         //iterate over the data and append a select option
//                         $.each(response, function(key, val){
//                            $select.append('<option value="'+ val.kp_ProductBuildID +'">' + val.t_Name + '</option>');
//                         })
//                         $select.removeClass("hide");
//                    }
//
//                });
//            });
//            event.preventDefault();
//            
//            return false;
//        });
         var dropOrderItemImage  = document.getElementById("preview");
 
        dropOrderItemImage.addEventListener("dragover", FileDragHover, false);
        dropOrderItemImage.addEventListener("dragenter", FileDragHover, false);
        dropOrderItemImage.addEventListener("dragleave", FileDragHover, false);
        dropOrderItemImage.addEventListener("drop", FileSelectHandler, false);
    
//    // Drag and Drop for DeckSheet Image
//    // get the dragdrop target element
//    // add event listeners on the target element
        var dropDeckSheetImage = document.getElementById("sportUploadPreview");

        dropDeckSheetImage.addEventListener("dragover", FileDragHover, false);
        dropDeckSheetImage.addEventListener("dragleave", FileDragHover, false);
        dropDeckSheetImage.addEventListener("drop", FileSelectHandler, false);
    
//    // Drag and Drop for DeckSheet Image
//    // get the dragdrop target element
//    // add event listeners on the target element
        var dropProofImage = document.getElementById("proofImageUploadPreview");

        dropProofImage.addEventListener("dragover", FileDragHover, false);
        dropProofImage.addEventListener("dragleave", FileDragHover, false);
        dropProofImage.addEventListener("drop", FileSelectHandler, false);
        
    };
    //alert("third Time: "+requestCalled);
    if(requestCalled == "create")
    {
        //alert("hi create");
        createOrderItemUpSideFrm();
        populateProductBuildCategories();
        $("#mainOrderItemUpSideFrm").css({'margin-top': '5px'});
        $("#productBuildCategory").change(function(){
            $select = $('#productBuildName');
            var productBuildCategory = $('#productBuildCategory').val();
            $.ajax({
                url: readProductBuildNames+productBuildCategory,
                dataType: 'json',
                error: function(xhr,status,error){
                           //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                           //if there is an error append a 'none available' option
                           $select.html('<option value="-1">none available</option>');
                },
                success: function( response ) {
                    //clear the current content of the select
                    $select.html('');

                    $select.append('<option value="">...Product Build</option>');

                    //iterate over the data and append a select option
                    $.each(response, function(key, val){
                    $select.append('<option value="'+ val.kp_ProductBuildID +'">' + val.t_Name + '</option>');
                    })
                    $select.removeClass("hide");
               }

            });
        });
        
    }
    if(requestCalled == "template")
    {
        
        readOrderItemUpSideFrm();
        $("#submitTypeOIUpSideFrm").hide();
        $("#mainOrderItemUpSideFrm").css({'margin-top': '5px'});
        
        $(".navbar-inverse .navbar-inner").css("background-color", "DarkGreen");
        $(".navbar-inverse .navbar-inner").css("background-image", "none");
        dynamicProductBuildSelect();
        
        //alert("templateName: "+templateName);
        
        if(templateName === "")
        {
            //alert("templateName0: "+templateName);
            $("#templateChangeName").trigger("click");
        }    
//        $("#templateChangeName").click(function(){
//            //alert("template page");
//            $("#templateNameInput").val(templateName);
//            $("#templateChangeModalForm").modal({
//               backdrop: false
//            });
//            //return false;
//        });
//        $("#validateModalTemplateChangeFrm").click(function(){
//            alert("hi");
//            $("#templateChangeForm").valid();
//            $("#templateChangeForm").submit();
//        
//        });
//        $("#templateChangeForm").validate({
//            rules: {
//                templateNameInput : {
//                    required: true              
//                }
//            },
//            submitHandler: function(form){
//                alert(submitemplateNameChange);
//                alert(changeID);
//                $.ajax({
//                    url: submitemplateNameChange+'/'+changeID,
//                    type: 'POST',
//                    data: $(form).serialize(),
//                    success: function(response){
//                        window.location.href = "orderItemUpSideFrm/template/"+changeID;
//                        //window.location.reload(true);
//                    }
//                });
//            }
//        });
    
        
        
    }    

    $("#submitTypeOIUpSideFrm").click(function(){
        //alert("Submit Function hi");
        $("#n_Qty").attr('required',true);
        $("#t_Description").attr('required',true);
        
        $("#productBuildCategory").attr('required',true);
        $("#productBuildName").attr('required',true);
        
        if($("#customerIDHidden").val() == "1467")
        {
            $("#t_SportItemNumber").attr('required',true);
        }
        if($("#nb_UseTotalOrderPricingHidden").val() != "1")
        {
            $("#pricingtype").attr('required',true);
            $("#priceEach").attr('required',true);
        }
        
    });
   
    $("#orderItemUpSideFrm").validate({
        submitHandler: function(form){
            //alert("submitHandler hi");
            $( '#ajaxLoadAni' ).fadeIn( 'slow' );
             $.ajax({
                  url: submitOrderItemUpSideFrmUrl,
                  type: 'POST',
                  //dataType: 'json',
                  data: $(form).serialize(),
                  success: function( response ) {
                     //alert(response);
                     //alert($("#requestCalledHidden").val());
                     
                     // clear the Duplicate form
                     //$("#orderItemUpSideFrm").clearForm();
                    
                     //hide the orderitemupside div 
                     //$("#mainOrderItemUpSideFrm").hide();
                     
                     //$("#sucess").removeClass("hide");
                     
                     if(response == "read" || response == "template")
                     {
                         //$( '#ajaxLoadAni' ).fadeOut( 'slow' );
                         //$("#typeOfAction").text('Saving..');
                         //alert(response);
                         
                         window.location = "orderItemUpSideFrm/read/"+$("#orderItemIDHidden").val();
                         
                         window.location.reload(true);
                         
                         //window.location.href ="orderItemUpSideFrm/read/"+$("#orderItemIDHidden").val();
                     } 
                     if($("#requestCalledHidden").val() == "create")
                     {
                         //$( '#ajaxLoadAni' ).fadeOut( 'slow' );
                         //$("#typeOfAction").text('Inserting..');
                         //alert(response);
                         
                         //window.location = "orderItemUpSideFrm/read/"+response;
                         //window.location.reload(true);
                         
                         window.location.href = "orderItemUpSideFrm/read/"+response;
                     }
                  }
             });
            
        }
        
    });
    
    $("#reverseHWData").css('cursor', 'pointer');
    $("#reverseHWData").click(function(){
        //---------- get the global values ------:
        var heightInches           = $("#heightHidden").val();
        var widthInches            = $("#widthHidden").val();
        //alert("h: "+heightInches);
        //alert("w: "+widthInches);
        //-----------end of global values  -------------------------------------
        
        //------------change height to width -----------------------------------
        var widthFullFeet          = parseFloat(heightInches)/12;
        var widthJustFeet          = Math.floor(widthFullFeet);
        //var heightJustFeetInInches  = Math.round((heightFullFeet - heightJustFeet)*12);
        var widthJustFeetInInches  = parseFloat((widthFullFeet - widthJustFeet)*12).toFixed(2);

        var widthFeetInInchesArr   = widthJustFeetInInches.split(".");

        if(widthFeetInInchesArr[0] == "0")
        {
            widthJustFeetInInches   = "."+widthFeetInInchesArr[1];

        }
        if(widthFeetInInchesArr[1] == "00")
        {
            widthJustFeetInInches   = widthFeetInInchesArr[0]+"";

        }

        //n_Height in the hidden value
        $("#widthHidden").val(heightInches);

        // Show the Feet' Inches'' format
        $("#n_Width").val(widthJustFeet + "'  "+ widthJustFeetInInches+ "'' ");
        //alert("w: "+$("#widthHidden").val());
        
        
        //------------------------ changing from width to height ------------------------//
        var heightFullFeet          = parseFloat(widthInches)/12;
        var heightJustFeet          = Math.floor(heightFullFeet);

        //var widthJustFeetInInches  = Math.round((widthFullFeet - widthJustFeet)*12);

        var heightJustFeetInInches  = parseFloat((heightFullFeet - heightJustFeet)*12).toFixed(2);

        var heightFeetInInchesArr   = heightJustFeetInInches.split(".");

        if(heightFeetInInchesArr[0] == "0")
        {
            heightJustFeetInInches   = "."+heightFeetInInchesArr[1];

        }
        if(heightFeetInInchesArr[1] == "00")
        {
            heightJustFeetInInches   = heightFeetInInchesArr[0]+"";
            
        }    

        //n_Width in the hidden value
        $("#heightHidden").val(widthInches);
        
        // Show the Feet' Inches'' format
        $("#n_Height").val(heightJustFeet + "'  "+ heightJustFeetInInches+ "'' ");
        
        //alert("h: "+$("#heightHidden").val());triggerHandler
        // show the update button when height and width were reversed (switched)
        $("#orderItemUpSideFrm :input").triggerHandler("change");
        return false;
        
    });
    
    $("#descriptionOrderLink").click(function(){
        //alert($("#requestCalledHidden").val());
        $.ajax({
            url: readCreateUrl+$("#orderIDHidden").val(),
            type:"get",
            dataType: 'json',
            error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
            },
            success: function( response ) {
                if(response.t_JobName !=null && response.t_JobName != "")
                {
                    $("#t_Description").val(response.t_JobName);
                    $("#submitTypeOIUpSideFrm").show();
                }    
            }
        });
        return false;
        
    });
    $("#pricingtype").change(function(){
        if($("#pricingtype").val() == "SQ.FT. Pricing")
        {
            //alert("hi");
            $("#labelEach").text("SqFt");
            
            $("#labelSqft").show();
            $("#labelSqft").text("Each");
            
            $("#sqFt").show();
            $("#sqFt").val("$"+parseFloat(Math.round($("#priceEach").val().replace("$","") * ($("#heightHidden").val() *   $("#widthHidden").val()/ 144 )*100)/100).toFixed(2));
             
            //alert($("#priceEach").val());
            $("#totalPrice").val("$"+parseFloat(Math.round($("#sqFt").val().replace("$","") * $("#n_Qty").val()*100)/100).toFixed(2));
           
        }
        if($("#pricingtype").val() == "Line Item Pricing")
        {
            $("#totalPrice").val("$"+parseFloat(Math.round($("#priceEach").val().replace("$","") * $("#n_Qty").val()*100)/100).toFixed(2));
            $("#labelSqft").hide();
            $("#sqFt").hide();
            
            $("#labelEach").text("Each");
        } 
         
    });
    
    $('.totalOrderPriceEffect').keyup(function() {
        //alert("inside hi");
        if($("#pricingtype").val() == "SQ.FT. Pricing")
        {
            $("#labelEach").text("SqFt");
            
            $("#labelSqft").show();
            $("#labelSqft").text("Each");
            
            $("#sqFt").show();
            $("#sqFt").val("$"+parseFloat(Math.round($("#priceEach").val().replace("$","")*($("#heightHidden").val() *   $("#widthHidden").val()/ 144 )*100)/100).toFixed(2));
            //var test =$("#sqFt").val().replace("$","");
            //test.parseFloat.toFixed("2");
            //alert(test);
            $("#totalPrice").val("$"+parseFloat(Math.round($("#sqFt").val().replace("$","") * $("#n_Qty").val()*100)/100).toFixed(2));
           
        }
        if($("#pricingtype").val() == "Line Item Pricing")
        {
            $("#totalPrice").val("$"+parseFloat(Math.round($("#priceEach").val().replace("$","") * $("#n_Qty").val()*100)/100).toFixed(2));
            $("#labelSqft").hide();
            $("#sqFt").hide();


        }
       
        
    });
    $("#showInchesFeetLink").click(function(){
       
        if($(this).html() == "Show Inches")
        {

            // Show the Feet' Inches'' format
            $("#n_Height").val($("#heightHidden").val());  
            
            // Show the Feet' Inches'' format
            $("#n_Width").val($("#widthHidden").val());
            
            ////change the anchor text to Show Feet
            $("#showInchesFeetLink").html("Show Feet");
            
        }
        else if($(this).html() == "Show Feet")
        {
            // show height in feet inches Format:
            var heightFullFeet          = parseFloat($("#heightHidden").val())/12;
                        
            var heightJustFeet          = Math.floor(heightFullFeet);

            //var heightJustFeetInInches  = Math.round((heightFullFeet - heightJustFeet)*12);
            var heightJustFeetInInches  = parseFloat((heightFullFeet - heightJustFeet)*12).toFixed(2);

            var heightFeetInInchesArr   = heightJustFeetInInches.split(".");

            if(heightFeetInInchesArr[0] == "0")
            {
                heightJustFeetInInches   = "."+heightFeetInInchesArr[1];

            }
            if(heightFeetInInchesArr[1] == "00")
            {
                heightJustFeetInInches   = heightFeetInInchesArr[0]+"";

            }
            
            // Show the Height in Feet' Inches'' format
            $("#n_Height").val(heightJustFeet + "' "+ heightJustFeetInInches+ "''");
            
           
            
            var widthFullFeet          = parseFloat($("#widthHidden").val())/12;
            
            var widthJustFeet          = Math.floor(widthFullFeet);
            
            var widthJustFeetInInches  = parseFloat((widthFullFeet - widthJustFeet)*12).toFixed(2);
        
            var widthFeetInInchesArr   = widthJustFeetInInches.split(".");

            if(widthFeetInInchesArr[0] == "0")
            {
                widthJustFeetInInches   = "."+widthFeetInInchesArr[1];

            }
            if(widthFeetInInchesArr[1] == "00")
            {
                widthJustFeetInInches   = widthFeetInInchesArr[0]+"";

            }
            
            // Show the width in Feet' Inches'' format
            $("#n_Width").val(widthJustFeet + "' "+ widthJustFeetInInches+ "''");
            
            //change the anchor text to Show Inches
            $("#showInchesFeetLink").html("Show Inches");
            
        }  
        //alert($("#widthHidden").val()+" width");
        //alert($("#heightHidden").val()+" Height");
        return false;
        
    });
    $("#n_Height").change(function(){
        
        var heightChangeValue = $("#n_Height").val();
        //var heightChangeValue="71'  21''";
        //alert("heloo: "+heightChangeValue);
        
        // 5' 9''
        var rexBothFeetInchesFormat = /^(\d+)'\s*(\d+(.\d+)?)''$/;
        var matchOne  = rexBothFeetInchesFormat.exec(heightChangeValue);
        
        // 5' 99"
        var rexBothFeetInchesButDoubleQuotesOnInchFormat = /^(\d+)'\s*(\d+(.\d+)?)"$/;
        var matchTwo  = rexBothFeetInchesButDoubleQuotesOnInchFormat.exec(heightChangeValue);
        
        // Just FEET -> 5'
        var rexFeetFormat = /^(\d+)'\s*$/;
        var matchThree  = rexFeetFormat.exec(heightChangeValue);
        
        
        // Just INCHES : 5''
        var rexInchDoubleSingleQuotesFormat = /^\s*(\d+(.\d+)?)''$/;
        var matchFour  = rexInchDoubleSingleQuotesFormat.exec(heightChangeValue);
        
        // Just INCHES -> 5"
        var rexInchDoubleQuotesFormat = /^\s*(\d+(.\d+)?)"$/;
        var matchFive  = rexInchDoubleQuotesFormat.exec(heightChangeValue);
        
        var rexInchNumberFormat = /^\s*(\d+(.\d+)?)$/;
        var matchSix  = rexInchNumberFormat.exec(heightChangeValue);
        
        
        //alert("heloo2 "+matchSix);
        
       
        //alert("heloo3 ");
        if(matchOne)
        {
            //alert("heloo4 ");
            var feet = parseFloat(matchOne[1]);
            var inch = parseFloat(matchOne[2]);
            //alert("Feet1 "+feet+" "+"inch1 "+inch);  
        }
        else if(matchTwo)
        {
            var feet = parseFloat(matchTwo[1]);
            var inch = parseFloat(matchTwo[2]);
            //alert("Feet2 "+feet+" "+"inch2 "+inch);
            
        }
        else if(matchThree)
        {
            var feet = parseFloat(matchThree[1]);
           
            //alert("Feet3 "+feet+" "+"inch3 "+inch);
        }
        else if(matchFour)
        {
            var inch = parseFloat(matchFour[1]);
            
        }
        else if(matchFive)
        {
            var inch = parseFloat(matchFive[1]);
            
        }
        else if(matchSix)
        {
             var inch = parseFloat(matchSix[1]);
             //alert();
        }
        else if(heightChangeValue == null || heightChangeValue == "")
        {
            feet =0;
            inch =0; 
            
            
            
        }
        else
        {
            //alert(heightChangeValue);
            alert("Please enter a valid Height");
            
        }    
        
        var feetConvertedInches;
        var totalHeightInInches; 
        if(!isNaN(feet))
        {
            feetConvertedInches = feet * 12;
            if(!isNaN(inch))
            {
                totalHeightInInches = feetConvertedInches + inch;
                
            }
            else
            {
                 totalHeightInInches = feetConvertedInches;
            }    
            
        }
        else
        {
            totalHeightInInches = inch;
            
        }    
        //alert("Total : "+totalHeightInInches);
   
        if(!isNaN(totalHeightInInches))
        {
            //if number store that value in the hidden field and display the number in feet inches format.
            var heightFullFeet          = parseFloat(totalHeightInInches)/12;
            //alert("hi"+$("#n_Height").val());

            var heightJustFeet          = Math.floor(heightFullFeet);

            var heightJustFeetInInches  = parseFloat((heightFullFeet - heightJustFeet)*12).toFixed(2);

            var heightFeetInInchesArr   = heightJustFeetInInches.split(".");

            if(heightFeetInInchesArr[0] == "0")
            {
                heightJustFeetInInches   = "."+heightFeetInInchesArr[1];

            }
            if(heightFeetInInchesArr[1] == "00")
            {
                heightJustFeetInInches   = heightFeetInInchesArr[0]+"";

            }

            //n_Height in the hidden value
            $("#heightHidden").val(Number(totalHeightInInches));

            // Show the Feet' Inches'' format
            $("#n_Height").val(heightJustFeet +"' "+heightJustFeetInInches+"\"");  
            
        }
      
        
    });
    $("#n_Width").change(function(){
        
        
        var widthChangeValue = $("#n_Width").val();
        //var heightChangeValue="71'  21''";
        //alert("heloo: "+heightChangeValue);
        
        // 5' 9''
        var rexBothFeetInchesFormat = /^(\d+)'\s*(\d+(.\d+)?)''$/;
        var matchOne  = rexBothFeetInchesFormat.exec(widthChangeValue);
        
        // 5' 99"
        var rexBothFeetInchesButDoubleQuotesOnInchFormat = /^(\d+)'\s*(\d+(.\d+)?)"$/;
        var matchTwo  = rexBothFeetInchesButDoubleQuotesOnInchFormat.exec(widthChangeValue);
        
        // Just FEET -> 5'
        var rexFeetFormat = /^(\d+)'\s*$/;
        var matchThree  = rexFeetFormat.exec(widthChangeValue);
        
        
        // Just INCHES : 5''
        var rexInchDoubleSingleQuotesFormat = /^\s*(\d+(.\d+)?)''$/;
        var matchFour  = rexInchDoubleSingleQuotesFormat.exec(widthChangeValue);
        
        // Just INCHES -> 5"
        var rexInchDoubleQuotesFormat = /^\s*(\d+(.\d+)?)"$/;
        var matchFive  = rexInchDoubleQuotesFormat.exec(widthChangeValue);
        
        var rexInchNumberFormat = /^\s*(\d+(.\d+)?)$/;
        var matchSix  = rexInchNumberFormat.exec(widthChangeValue);
        
        //alert("heloo2 "+matchSix);
        
       
        //alert("heloo3 ");
        if(matchOne)
        {
            //alert("heloo4 ");
            var feet = parseFloat(matchOne[1]);
            var inch = parseFloat(matchOne[2]);
            //alert("Feet1 "+feet+" "+"inch1 "+inch);  
        }
        else if(matchTwo)
        {
            var feet = parseFloat(matchTwo[1]);
            var inch = parseFloat(matchTwo[2]);
            //alert("Feet2 "+feet+" "+"inch2 "+inch);
            
        }
        else if(matchThree)
        {
            var feet = parseFloat(matchThree[1]);
           
            //alert("Feet3 "+feet+" "+"inch3 "+inch);
        }
        else if(matchFour)
        {
            var inch = parseFloat(matchFour[1]);
            
        }
        else if(matchFive)
        {
            var inch = parseFloat(matchFive[1]);
            
        }
        else if(matchSix)
        {
             var inch = parseFloat(matchSix[1]);
             //alert();
        }
        else if(widthChangeValue == null || widthChangeValue == "")
        {
            feet =0;
            inch =0; 
            
        }
        else
        {
            alert("Please enter a valid Width");
            
        }
        var feetConvertedInches;
        var totalWidthInInches; 
        if(!isNaN(feet))
        {
            feetConvertedInches = feet * 12;
            if(!isNaN(inch))
            {
                totalWidthInInches = feetConvertedInches + inch;
                
            }
            else
            {
                 totalWidthInInches = feetConvertedInches;
            }    
            
        }
        else
        {
            totalWidthInInches = inch;
            
        }    
        if(!isNaN(totalWidthInInches))
        {
            var widthFullFeet          = parseFloat(totalWidthInInches)/12;

            var widthJustFeet          = Math.floor(widthFullFeet);

            var widthJustFeetInInches  = parseFloat((widthFullFeet - widthJustFeet)*12).toFixed(2);
        
            var widthFeetInInchesArr  = widthJustFeetInInches.split(".");

            if(widthFeetInInchesArr[0] == "0")
            {
                widthJustFeetInInches   = "."+widthFeetInInchesArr[1];

            }
            if(widthFeetInInchesArr[1] == "00")
            {
                widthJustFeetInInches   = widthFeetInInchesArr[0]+"";

            }

            //n_Width in the hidden value
            $("#widthHidden").val(Number(totalWidthInInches));

            // Show the Feet' Inches'' format
            $("#n_Width").val(widthJustFeet+ "' "+widthJustFeetInInches+"\"");
            
        }    
         
    });
    
    $("#d_ArtReceived").datepicker().on('changeDate',function(ev){
        $("#d_ArtReceived").datepicker('hide');
        
    });
   
    
  
});
function dynamicProductBuildSelect(){
       $("#makeProductBuildClick").html('<a id="makeProductBuildActive" href="#" class=productBuildDynamicLink>Product Build</a>');
        
        $('#makeProductBuildActive').on('click', function(event) {
            
            $('#productBuildCategory').attr("disabled",false);
           
            $('#productBuildName').attr("disabled",false);
            
            var currentProductBuildCategory = $('#productBuildCategory').val();
            
            var currentProductBuild         = $('#productBuildName').val();
            
            $("#currentProductBuildID").val(currentProductBuild);
            
            $selectProductBuildCategory     = $('#productBuildCategory');
            
            $selectProductBuildName         = $('#productBuildName');
            
            //call the ajax call and populate the productBuild Category List
            $.ajax({
                url: readProductBuildCategories,
                dataType: 'json',
                error: function(xhr,status,error){
                               //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                               //if there is an error append a 'none available' option
                               $select.html('<option value="-1">none available</option>');
                },
                success: function( response ) {
                //clear the current content of the select
                $selectProductBuildCategory.html('');

                //alert(currentProductBuildCategory);
                //$select.append('<option value="">...Categories</option>');

                    //iterate over the data and append a select option
                    $.each(response, function(key, val){
                        if(currentProductBuildCategory == val.t_Category)
                        {
                            //alert("selected");
                            $selectProductBuildCategory.append('<option value="'+ val.t_Category +'" selected>' + val.t_Category + '</option>');
                        }
                        else
                        {
                            $selectProductBuildCategory.append('<option value="'+ val.t_Category +'">' + val.t_Category + '</option>');
                        }    
                        
                    });
                }
            });
            
            $.ajax({
                    url: readProductBuildNames+currentProductBuildCategory,
                    dataType: 'json',
                    error: function(xhr,status,error){
                               //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                               //if there is an error append a 'none available' option
                               $select.html('<option value="-1">none available</option>');
                    },
                    success: function( response ) {
                         //clear the current content of the select
                         $selectProductBuildName.html('');

                         $selectProductBuildName.append('<option value="">...Product Build</option>');

                         //iterate over the data and append a select option
                         $.each(response, function(key, val){
                            if(currentProductBuild == val.kp_ProductBuildID)
                            {
                                $selectProductBuildName.append('<option value="'+ val.kp_ProductBuildID +'" selected>' + val.t_Name + '</option>');
                            }
                            else
                            {
                                $selectProductBuildName.append('<option value="'+ val.kp_ProductBuildID +'">' + val.t_Name + '</option>');
                            }
                         })
                         $selectProductBuildName.removeClass("hide");
                    }

            });
            
            // add the product Build Change function to populate the product build name depending on the productBuild Category
            $("#productBuildCategory").change(function(){
                $select = $('#productBuildName');
                var productBuildCategory = $('#productBuildCategory').val();
                $.ajax({
                    url: readProductBuildNames+productBuildCategory,
                    dataType: 'json',
                    error: function(xhr,status,error){
                               //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                               //if there is an error append a 'none available' option
                               $select.html('<option value="-1">none available</option>');
                    },
                    success: function( response ) {
                         //clear the current content of the select
                         $select.html('');

                         $select.append('<option value="">...Product Build</option>');

                         //iterate over the data and append a select option
                         $.each(response, function(key, val){
                            $select.append('<option value="'+ val.kp_ProductBuildID +'">' + val.t_Name + '</option>');
                         })
                         $select.removeClass("hide");
                    }

                });
            });
            event.preventDefault();
            
            return false;
        });
}
function populateProductBuildCategories(){
    //get a reference to the select element
    $select = $('#productBuildCategory');
    $.ajax({
        //url: readProductBuildCategories+changeID,
        url: readProductBuildCategories,
        dataType: 'json',
        error: function(xhr,status,error){
                       //alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                       //if there is an error append a 'none available' option
                       $select.html('<option value="-1">none available</option>');
         },
         success: function( response ) {
            //clear the current content of the select
            
            $select.html('');
            
            
            $select.append('<option value="">...Categories</option>');
            
            //iterate over the data and append a select option
            $.each(response, function(key, val){
            $select.append('<option value="'+ val.t_Category +'">' + val.t_Category + '</option>');
            })
             
         }
        
    });
    
};
function createOrderItemUpSideFrm(){
     $.ajax({
         url: readCreateUrl+changeID,
         type:"get",
         dataType: 'json',
         error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
         },
         success: function(response) {
             $("#orderIDHidden").val(changeID);
             //var object = JSON.parse(response);
             //alert("jiii "+response.kf_CustomerID);
             if(response.kf_CustomerID == "1467")
             {
                 $("#customerIDHidden").val(response.kf_CustomerID);
                 $(".visible-sport").hide();
                 $(".hidden-sport").removeClass("hidden-sport");
             }
             if(response.nb_UseTotalOrderPricing == "1")
             {
                 $("#nb_UseTotalOrderPricingHidden").val(response.nb_UseTotalOrderPricing);
                 $("#spanPricing").hide();
                 
                 $("#pricingtype").hide();
                 $("#labelEach").hide();
                            
                 $("#priceEach").hide();
                 $("#labelSqft").hide();
                 $("#sqFt").hide();
                  
                 $("#labelTotal").hide();
             }
            
             if(response.t_OrderPricingType == "Line Item Pricing" || response.t_OrderPricingType == null)
             {
                $("#pricingtype").val(response.t_OrderPricingType);
                $("#labelSqft").hide();
                $("#sqFt").hide();
             }
             
             if(response.t_OrderPricingType == "SQ.FT. Pricing")
             {
                 $("#pricingtype").val(response.t_OrderPricingType);
                 $("#labelEach").text("SqFt");
                 $("#labelSqft").show();
                 $("#labelSqft").text("Each");
                 $("#sqFt").show();
                 
             }
             $("#customerIDHidden").val(response.kf_CustomerID);
             $("#submitTypeOIUpSideFrm").text("Next");
         }
     });
    
};
function readOrderItemUpSideFrm(){
                $.ajax({
                    url: readUrl+changeID,
                    type:"get",
                    dataType: 'json',
                    error: function(xhr,status,error){
                       alert("Please hi Contact IT (Error): "+ xhr.status+"-"+error);
                    },
                    success: function( response ) {
                        if(response[0]['orderJobStatus'] == "Multi Line Status")
                        {
                            if($("#orderItemStatusChangeLink").hasClass("hide"))
                            {
                                $("#orderItemStatusChangeLink").removeClass("hide");
                                
                                $("#orderItemStatusChangeLink").addClass("brand");
                                
                                $("#orderItemStatusChangeLink").text("Status: "+response[0]['t_OiStatus']);
                                
                            }    
                        }    
                        if(response[0]['t_OrderItemProof'] == null || response[0]['t_OrderItemProof'] == "")
                        {
                            //alert("set value to null");
                            $("#orderItemProofIcon").removeClass("icon-ok");
                            $("#orderItemProofIcon").addClass("icon-plus");
                        }
                        
                        //alert(response[0]['t_ProofBy']);
                        
                        $("#proofNotesHidden").val(response[0]['t_ProofNote']);
                        
                        $("#proofCreatedByHidden").val(response[0]['t_ProofBy']);
                        $("#dashNum").val(response[0]['n_DashNum']);
                        // data coming from the Controller is in two dimensional Array.
                        $("#orderIDHidden").val(response[0]['kf_OrderID']);
                        // Quantity Height and Width
                        $("#n_Qty").val(response[0]['n_Quantity']);
                        //$("#n_Height").val(Number(response[0]['n_HeightInInches']));
                        //$("#n_Width").val(Number(response[0]['n_WidthInInches']));
                        
                        //alert(response[0]['n_HeightInInches']+" "+response[0]['n_WidthInInches']);
                        var heightFullFeet          = parseFloat(response[0]['n_HeightInInches'])/12;
                        
                        var heightJustFeet          = Math.floor(heightFullFeet);
                        
                        //var heightJustFeetInInches  = Math.round((heightFullFeet - heightJustFeet)*12);
                        var heightJustFeetInInches  = parseFloat((heightFullFeet - heightJustFeet)*12).toFixed(2);
        
                        var heightFeetInInchesArr   = heightJustFeetInInches.split(".");
        
                        if(heightFeetInInchesArr[0] == "0")
                        {
                            heightJustFeetInInches   = "."+heightFeetInInchesArr[1];

                        }
                        if(heightFeetInInchesArr[1] == "00")
                        {
                            heightJustFeetInInches   = heightFeetInInchesArr[0]+"";
                            
                        }
                        
                        //n_Height in the hidden value
                        $("#heightHidden").val(Number(response[0]['n_HeightInInches']));
                        
                        // Show the Feet' Inches'' format
                        $("#n_Height").val(heightJustFeet + "' "+ heightJustFeetInInches+ "''");
                        
                        
                        var widthFullFeet          = parseFloat(response[0]['n_WidthInInches'])/12;
                        
                        var widthJustFeet          = Math.floor(widthFullFeet);
                        
                        //var widthJustFeetInInches  = Math.round((widthFullFeet - widthJustFeet)*12);
                        
                        var widthJustFeetInInches  = parseFloat((widthFullFeet - widthJustFeet)*12).toFixed(2);
        
                        var widthFeetInInchesArr   = widthJustFeetInInches.split(".");
        
                        if(widthFeetInInchesArr[0] == "0")
                        {
                            widthJustFeetInInches   = "."+widthFeetInInchesArr[1];

                        }
                        if(widthFeetInInchesArr[1] == "00")
                        {
                            widthJustFeetInInches   = widthFeetInInchesArr[0]+"";

                        }
                        
                        //n_Width in the hidden value
                        $("#widthHidden").val(Number(response[0]['n_WidthInInches']));
                        
                        // Show the Feet' Inches'' format
                        $("#n_Width").val(widthJustFeet + "' "+ widthJustFeetInInches+ "''");
                        
                        
                        //product build category 
                        $selectProductBuildCategory = $('#productBuildCategory');
                        
                        $selectProductBuildCategory.html('');
            
                        // append the product type to a select option
                        $selectProductBuildCategory.append('<option value="'+response[0]['t_ProductType']+'">'+response[0]['t_ProductType']+'</option>');
                        $('#productBuildCategory').attr("disabled",true);
                        
                        //product Build Name
                        $selectProductBuildName = $("#productBuildName");
                        $selectProductBuildName.html('');
                        
                         // append the product build name to a select option
                        $selectProductBuildName.append('<option value="'+response[0]['kf_ProductBuildID']+'">'+response[0]['productBuildName']+'</option>');
                        $('#productBuildName').attr("disabled",true);
                        $('#productBuildName').removeClass("hide");
                        
                        //Description and ID:
                        $("#t_Description").val(response[0]['t_Description']);
                        $("#t_Structure").val(response[0]['t_Structure']);
                       
                        //Pricing
                        $("#pricingtype").val(response[0]['t_Pricing']);
                        //$("#priceEach").val("$"+Number(response[0]['n_Price']));
                        $("#priceEach").val("$"+parseFloat(response[0]['n_Price']).toFixed(2));
                        //$("#priceEach").val("$"+Math.round(Number(response[0]['n_Price'])*100)/100);
                        //$("#priceEach").val().toFixed(3);
                        
                        
                        
                        if(response[0]['t_Pricing'] == "Line Item Pricing")
                        {
                            //alert("hi");
                            $("#totalPrice").val("$"+parseFloat(Math.round(response[0]['n_Price'] * response[0]['n_Quantity']*100)/100).toFixed(2));
                            $("#labelSqft").hide();
                            $("#sqFt").hide();
                            
                            
                        } 
                        if(response[0]['t_Pricing'] == "SQ.FT. Pricing")
                        {
                            $("#labelEach").text("SqFt");
                            $("#sqFt").val("$"+parseFloat(Math.round((response[0]['n_Price'] * response[0]['n_HeightInInches'] *  response[0]['n_WidthInInches']/ 144 )*100)/100).toFixed(2));
                            //var newValue = $("#priceEach").val().split(".");
                            //alert(newValue[1]);
                            $("#labelSqft").text("Each");
                            //alert("hi"+$("#sqFt").val()+response[0]['n_Quantity']);
                            $("#totalPrice").val("$"+parseFloat(Math.round($("#sqFt").val().replace("$","") * response[0]['n_Quantity']*100)/100).toFixed(2));
                            
                            
                        }  
                        if(response[0]['nb_DoNotInvoice'] == "1")
                        {
                            $("#doNotInvoice").attr('checked', true);
                            
                        }    
                       
                        if(response[0]['kf_CustomerID'] == "1467")
                        {
                            $("#customerIDHidden").val(response[0]['kf_CustomerID']);
                               
                            //$(".visible-sport").addClass("hidden-sport").removeClass("visible-sport");
                            
                            
                            //$(".visible-sport").removeClass("visible-sport").addClass("hidden-sport");
                            
                            //$(".visible-sport").addClass("hidden-sport");
                            //$(".visible-sport").removeClass("visible-sport");
                            
                            
                            $(".visible-sport").hide();
                            
                            // custom styles for the horizontal tag
                            $("#horizontalTagCustom").removeClass("hide");
                            $("#horizontalTagCustom").css({'padding-top': '5px','padding-bottom': '0px','margin-top': '5px','margin-bottom': '0px'});
                            $("#selectSportBtnFrm").css({'padding-bottom': '2px','padding-top': '6px','margin-top': '6px'});
                            $("#uploadSportSubmitFrm").css({'padding-bottom': '2px','padding-top': '6px','margin-top': '6px','margin-left': '10px','padding-left': '10px'});
                            $("#horizontalTagCustomSport").css({'padding-top': '32px','margin-top': '32px'});
                            
                            //$("#uploadFrm").css({'margin-top': '2.5px','margin-bottom': '0px','padding-bottom': '0px'});
                            

                           
                            //$("#labelForID").hide();
                            //$("#t_Structure").hide(); 
                            
                            //$("#hideSport").removeClass("hidden-sport");
                            
                            $(".hidden-sport").removeClass("hidden-sport");
                            
                            
                            
                            //get the fields to the sport customer
                            $("#t_SportJobNumber").val(response[0]['t_SportJobNumber']);
                            $("#t_SportItemNumber").val(response[0]['t_SportItemNumber']);
                            $("#t_SportLocationNumber").val(response[0]['t_SportLocationNumber']);
                            
                            if(response[0]['nb_ArtReceivedProduction'] == 1)
                            {
                                 $("#nb_ArtReceivedProduction").attr('checked', true);
                                
                            }    
                            // date Picker
                            //alert(response[0]['d_ArtReceived']);
                            if(response[0]['d_ArtReceived'] != null)
                            {
                                 var dateReceivedArr = response[0]['d_ArtReceived'].split("-");
                                 var dateReceived    = dateReceivedArr[1]+"/"+dateReceivedArr[2]+"/"+dateReceivedArr[0];
//                                 $('#datetimepicker4').datetimepicker({
//                                    pickTime: false
//                                 });
                                 $("#d_ArtReceived").datepicker('setValue',dateReceived); 
                            }    
                           
                            
                            $("#t_ArtReceivedBy").val(response[0]['t_ArtReceivedBy']);
                            $("#t_ArtContact").val(response[0]['t_ArtContact']);
                           
                            //alert("hi0");
                            if(response[0]['ti_UploadComplete'] != null)
                            {
                                //alert(response[0]['ti_UploadComplete'].split(" "));
                                var uploadDateTimeArry     = response[0]['ti_UploadComplete'].split(" ");
                           
                                //alert(uploadDateTimeArry[0]);
                            
                                var uploadDate             = uploadDateTimeArry[0].split("-");
                                var uploadFormatedDateTime = uploadDate[1]+"/"+uploadDate[2]+"/"+uploadDate[0]+" "+uploadDateTimeArry[1]; 
                                //alert(uploadDateTimeArry[1]);
                            
                                $("#ti_UploadComplete").val(uploadFormatedDateTime);
                                
                            }    
                           
                           
                            
                        }
                        if(response[0]['orderPricing'] == "1")
                        {
                            $("#nb_UseTotalOrderPricingHidden").val(response[0]['orderPricing']);
                            
                            //$("#spanPricing").hide();
                            $("#pricingtype").hide();
                            
                            $("#labelEach").hide();
                            
                            $("#priceEach").hide();
                            
                            $("#labelSqft").hide();
                            $("#sqFt").hide();
                            
                            $("#labelTotal").hide();
                            
                            $("#spanPricing").text("Total Order Price");
                            
                            
                        }    
                    }
                });
    
};
function readEmployeeUserName(elem) {
            $.ajax({
                    url: readUserName,
                    //dataType: 'json',
                    success: function( response ) {
                        
                        //alert("objs1");
                        //alert(JSON.parse(response));
                        var json = JSON.parse(response);
                        //alert(json.length);
                        var arrayEmployeeName = [];
                        for(var i=0;i<json.length;i++)
                        {
                            //arrayEmployeeName[i] ='\''+json[i]['t_UserName']+'\'';
                            arrayEmployeeName[i] =''+json[i]['t_UserName']+'';
                            
                                
                        }
//                        alert(arrayEmployeeName);
//                        alert(arrayEmployeeName.length);
//                        var numberString = "";
//                        for(var i=0;i<arrayEmployeeName.length;i++)
//                        {
//                            numberString += arrayEmployeeName[i]+ " ";
//                                
//                        }
//                        alert(numberString);
                        if(elem == "proofCreatedBy")
                        {
                            //alert("hi");
                            $('#'+elem).val($("#proofCreatedByHidden").val());
                            
                        }    
                       
                        
                        $('#'+elem).typeahead({
                            source: arrayEmployeeName,
                            items: 4
                            
                        });
                        
                        //$('#proofCreatedBy').val($("#proofCreatedByHidden").val());
                        //$('#proofCreatedBy').typeahead({
                            //source: arrayEmployeeName,
                            //items: 4
                            
                        //});
                        
                        
                       
                    }


            });
                 
} // end readEmployeeUserName/* 
function readNewJobStaus() {
       //var checked = "something";
        $.ajax({
            url: readNewStatus,
            dataType: 'json',
            success: function( response ) {
                    //alert("test1: "+response.length);
                    var sel = $("#newStatus");
                    sel.empty();
                    //alert("test2: "+response.length);
                    for (var i=0; i<response.length; i++)
                    {
                        if(response[i].t_StatusName == "Please Select")
                        {
                            sel.append('<option value="'+'">' + response[i].t_StatusName + '</option>');
                            
                        }
                        else
                        {
                            sel.append('<option value="'+response[i].t_StatusName+'">' + response[i].t_StatusName + '</option>');
                            
                        }    
                        

                    }

                }


        });
                 
} // end readNewJobStaus/* 
function createQRCodeFromOrderID() {
    $.ajax({
            url: createQRCodeURL+'/'+orderIDView,
                 error: function(xhr,status,error){
                           alert("Please Contact IT (Error-QRCode Function): "+ xhr.status+"-"+error);
                           
                 },
                 success: function(response) {
                 }
        });
}
