$(document).on( "pageinit", "#searchFromJobNumber", function() {
       //alert("ji");
       //$('#findJobStausFromJobNumber').trigger("click");
       $( "#findJobStausFromOrderID" ).on( "listviewbeforefilter", function ( e, data ) {
            var $ul     = $( this ),
                $input  = $( data.input ),
                value   = $input.val(),
                html    = "";
                $ul.html( "" );
           
            if ( value && value.length > 4 ) {
                $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
                $ul.listview( "refresh" );

                $.ajax({
                    url: "mobile/mobilecontroller/getMobileJobStatusFromOrderID",
                    dataType: "json",
                    type:"post",
                    //crossDomain: true,
                    error: function(xhr,status,error){
                           alert("hello Please Contact IT (Error): "+ xhr.status+"-"+error);
                       },
                    data: {
                        orderID: $input.val()
                    }
                })
                .then( function ( response ) {
                    //html += '<li id="'+response.kp_OrderID+'"> <a href="#jobStatusDetailsPage" data-transition="slide">' + response.kp_OrderID + "  " + response.t_CustCompany +'</a></li>';

                    html += '<li class="orderIDCompanyNameLi" id="'+response.kp_OrderID+','+'pageRequestFromjobNumber"> <a  class="orderIDCompanyNameAnchor" href="" data-transition="slide"><h4>' + response.kp_OrderID + "  " + response.t_CustCompany +'</h4><p><strong>'+response.t_JobName+'</strong></p><p>O:'+Number(response.n_OrderItemCount)+ '  M:'+response.t_MachineAb+ '  AB:'+response.t_OrderItemAb+'  S:'+response.t_OrdShip+'</p><p class="ui-li-aside">'+response.ti_JobDue+'</p></a></li>';

                    $ul.html( html );

                    $ul.listview( "refresh" );

                    $ul.trigger( "updatelayout");
                });

            }
        });
        $("#findJobStausFromJobNumber").on('keyup',function() {
            var value = $(this).val();
            if ( value && value.length > 4 )
            {
                $.ajax({
                        url: "mobile/mobilecontroller/getMobileJobStatusFromOrderID",
                        dataType: "json",
                        type:"post",
                        //crossDomain: true,
                        error: function(xhr,status,error){
                               alert("hello Please Contact IT (Error): "+ xhr.status+"-"+error);
                           },
                        data: {
                            orderID: value
                        }
                    })
                .then( function ( response ) {
                     //html += '<li id="'+response.kp_OrderID+'"> <a href="#jobStatusDetailsPage" data-transition="slide">' + response.kp_OrderID + "  " + response.t_CustCompany +'</a></li>';
                     if(response !=null && response !="")
                     {
                         var mArray           = [];
            
                         mArray[0]            = response.kp_OrderID; //orderID
            
                         mArray[1]            = "pageRequestFromjobNumber"; //Page Request
            
                         window.location.href ="mLineItems/"+mArray[0]+"/"+mArray[1];
                         //alert(response);
                     }   
                });
                
            }    
            
            
        });
    
      });
      
      $(document).on( "pageinit", "#jobStatusDetailsPage", function() {
          
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
          $("#displayOrderIDDashNum").on('click', 'li',function(e){
                
                var getElements   =  $(this).attr('id');
                
                var getElementArr = getElements.split(",");
                alert("jukuk"+getElementArr[0]);
                alert("hghghgh"+getElementArr[1]);
                var $zl           = $("#displayOrderIDDashNumJobStatus");
                var vtmle         = "";
                
                var $rs           = $("#displayMobileProductBuild");
                var rstmle        = "";

                $zl.html("");
                $rs.html("");
                $.ajax({
                            url: "mobile/mobilecontroller/getMobileDisplayProductBuild/"+getElementArr[0],
                            //dataType: 'json',
                            error: function(xhr,status,error){
                               alert("Heelo Please Contact IT (Error): "+ xhr.status+"-"+error);
                            }
                })
                .then( function (response) {
                                  for(var x=0; x<response.length; x++)
                                  {
                                      //rstmle +='<li data-role="list-divider">'+response[x].t_Category+'</li><li><h2>'+response[x].DisplayName+'</h2>';
                                      rstmle = response;
                                  }    
                                 $rs.html(rstmle);
                                 $rs.listview( "refresh" );
                                 $rs.trigger( "updatelayout");

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
                                 $zl.listview( "refresh");

                });
               //----for mobile upload form ----//
               
               $("#mobileUploadOrderItemID").val(getElementArr[0]);  
               $("#mobileUploadTypeOfChange").val(getElementArr[1]); 
               
               //----for mobile upload form ----//
               
               $("#orderItemIDHidden").val(getElementArr[0]);  

               $("#statusChangeRequestHidden").val("orderItemChange"); 

               $.mobile.changePage("#orderItemJobStatusDetailsPage",{transition:"slide"});
               e.preventDefault();
        
         });
          
      });
      $("#mobileUploadDetailsPage").live( "pageshow", function(e) {
          //alert($("#mobileUploadOrderID").val());
          $("#displayMobileUploadHeaderOrderIDDash").text($("#mobileUploadOrderID").val()+"-"+$("#mobileUploadDashNum").val());
          
          $("#chooseFile").click(function(e){
              e.preventDefault();
	      $("input[type=file]").trigger("click");
          });
           
      });
      $("#orderItemJobStatusDetailsPage").live( "pageshow", function(e) {
          //alert("orderItemIDHidden Value: "+$("#mobileUploadOrderItemID").val());
          //alert("Type of Change Value: "+$("#mobileUploadTypeOfChange").val());
          
          $('#displayOrderIDDashNumJobStatus').on('click', 'li.li-bottom', function(e) {
              var getElements     =  $(this).attr('id');
              var getElementArr   = getElements.split(",");
              var currentOIStatus = $('a', this).text();
              var orderIDArr      = $("#displayHeaderOrderIDDash").text().split("-");
              //alert(getElements);
              //alert(getElementArr[0]);
              //alert(getElementArr[1]);
              //alert($('a', this).text());
              //alert($("#displayHeaderOrderIDDash").text());
              //alert(orderIDArr[0]);
              $("#currentStatus").val(currentOIStatus);
              $("#orderItemIDHidden").val(getElementArr[0]);
              $("#statusChangeRequestHidden").val(getElementArr[1]);
              
              $("#displayFormJobNumber").text("ID: "+orderIDArr[0]);
              $("#orderIDHidden").val(orderIDArr[0]);  
              $.mobile.changePage("#editJobStatusDetailsPage",{transition:"slide"});
              e.preventDefault();
              
          });
          
         

        
          $(".mainLiFile").live("click",".subAncFile",function(){
              //inputChanged();
              $(this).closest('.mainLiFile').remove();
             
              //alert(this.files.length);
              return false;
              
          });
          function inputChanged() {

            $current_count = $('input[type="file"]').length;
            
            if($('input[type="file"]').length < 1)
            {
                $("#divUploadBtn").addClass("hiddenfile");
                
            }    
           
          };
            
      });
      
      
      $("#editJobStatusDetailsPage" ).live( "pageshow", function(e) {
        //$("input[type='checkbox']").attr("checked",false).checkboxradio("refresh");
        $("#displayOnlyToOrderItemChange").controlgroup('refresh');
        if($("#statusChangeRequestHidden").val() == "orderChange")
        {
            //alert("hi");
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
     $("#statusUpdatePage" ).live( "pageshow", function(e) {
        //alert("hi1");
        $('a.force-reload').on('click', function(e) {
	var url = $(this).attr('href');
        //alert(url);
        //url="mobile/mobilecontroller/index";
       
	//$.mobile.changePage( url, {transition: "slide"} );
        //e.preventDefault();
     });
         
     });
     $("#home" ).live("pageshow", function(event) {
         $("#searchByJobNum").on("click",function(e){
             var url = $(this).attr('href');
             //alert(url);
             
             $('#findJobStausFromOrderID').children().remove('li');
             $('input[data-type="search"]').val("");
             //$.mobile.changePage( url, {transition: "slide"} );
             //e.preventDefault();
             //$("#findJobStausFromOrderID li").trigger( "updatelayout");
         });
         
       
     });
     $(".orderIDCompanyNameLi").live("click",".orderIDCompanyNameAnchor",function(){
          
            var orderIDElements  = $(this).attr('id');
            //alert(orderIDElements);
            
            var orderIDArray     = orderIDElements.split(",");
            //alert(orderIDArray);
            
            var pageRequest      =  orderIDArray[1];
            //alert(pageRequest);
            
            var mArray           = [];
            
            mArray[0]            = orderIDArray[0]; //orderID
            
            mArray[1]            = orderIDArray[1]; //Page Request
            
            window.location.href ="mLineItems/"+mArray[0]+"/"+mArray[1];
           
     });
     
     $("#searchByDueDate" ).live( "pageshow", function(event) {
        var $ka           = $("#getDynamicJobStatusList");
        var katmle        = "";
        
        //--------START------getting the todays Date ----------START-----------//
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '')+ day +'/'+d.getFullYear() ;
        
        $("#mydate").val(output);
        
         //------END---------getting the todays Date ---------END-----------//
        
        
        $ka.html("");
        $.ajax({
                    url: "mobile/mobilecontroller/getMobileOrderJobStatusFromJobDueDate/",
                    //dataType: 'json',
                    error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                    }
         })
         .then( function ( response ) {
                           katmle = response;
                           $ka.html(katmle); 
                           $ka.listview( "refresh");
                           //$ka.trigger( "updatelayout");      
         });
     
         $('#mydate').live('datebox', function(e,p) {
             if (p.method === 'set') 
             {
                 var $ka           = $("#getDynamicJobStatusList");
                 var katmle        = "";
                 //alert("hi");
                 //alert($('#mydate').datebox('callFormat','%Y-%m-%d', p.date));
                 var selectedDate = $('#mydate').datebox('callFormat','%Y-%m-%d', p.date);
                 $.ajax({
                      url: "mobile/mobilecontroller/getMobileOrderJobStatusFromJobDueDate/"+selectedDate,
                      error: function(xhr,status,error){
                           alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                        }
                  })
                  .then( function ( response ) {
                       katmle = response;
                       $ka.html(katmle); 
                       $ka.listview( "refresh");

                   })
             }

         });
         
         
         
         
         
         
         
     });
     

  









    


