 var  readUrl    = "orderShipTracking/ordershiptrackingcontroller/orderShipTrackingTable/"+orderID;
 var  updateUrl  = "orderShipTracking/ordershiptrackingcontroller/updateOderShipTrackingTable/";
 var  delUrl     = "orderShipTracking/ordershiptrackingcontroller/deleteOrderShipTrackingRow/";
 var  getUrl     = "orderShipTracking/ordershiptrackingcontroller/getOrderShipTrackingRecord/";
 var submitUrl   = "orderShipTracking/ordershiptrackingcontroller/orderShipTrackingSubmit";
 var  updateID   = "";
 $(document).ready( function() {
                //$("body").css("background-color","#f5f5f5");
                readOrderShipTracking();
//                var OrdShip_tbl = $('#ordShip_tbl').dataTable({
//                                    
//                                      "sDom": "<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
//                                      "oTableTools": {
//                                                   "aButtons": [ ],
//                                                    "sRowSelect": "single"
//                                        },
//                                    
//                                     "sAjaxSource": "odrTracking/ordershiptrackingcontroller/orderShipSelect/"+orderID
//                                    
//                });
               
//              $('#ordShip_tbl tbody tr').live('click',function(){
//                     var aData               = OrdShip_tbl.fnGetData(this);
//                     //alert(aData[0]);
//                     var orderShipID         = aData[0];
//                     var shipperCompany      = aData[1];
//                     var ShipperService      = aData[2];
//                     $("#orderShipIDHidden").val(orderShipID);
//                     //alert( $("#orderShipIDHidden").val());
//                     
//                     $("body").css("background-color","#f5f5f5");
//                    
//                     
//                     $("#table-wrapper-select").hide();
//                     $("#table-wrapper-form").show();
//                     $("#charge").focus();
//                     
//              });
               
              
              $("#ordShip_tbl tr").live("click",function(e){
               var orderShipID         = $(this).attr("id");  
               //alert("hi "+orderShipID);
               //alert("ordershipTrackingID: "+$(this).find('td:eq(5)').html());
               var orderShipTrackingID =  $(this).find('td:eq(5)').html();
               $("#orderShipIDHidden").val(orderShipID);
               $("#orderShipTrackingIDHidden").val(orderShipTrackingID);
               $("#table-wrapper-select").hide();
               $("#table-wrapper-form").show();
               //$("#packageCost").focus();
               
               //$("#packageCostLabel").toggle();
               
               
               //$("#customerChargeLabel").removeClass("error");
               
               //$("#packageCostLabel").toggleClass("error");
               
               //$("#packageCostLabel").addClass("error");
               
               //$("#customerChargeLabel").toggleClass("hide");
               
               //$("#customerChargeLabel").addClass("hide");
               
               //$("#customerCharge").val("$0.00");
               //$("#customerCharge").attr("readonly",true);
               
             
              
              });
              
              $("#modalNoCharge").change(function(){
                    alert("Type of Charge Selected: 'No Charge'");
                    updateForm.resetForm();
                    
                    $("#modalPackageCost").val("$0.00");
                    $("#modalCharge").val("$0.00");
                    
                    $("#modalPackageCost").removeAttr('readonly');
                    $("#modalCharge").removeAttr('readonly');
                    
                    $("#modalPackageCost").attr("readonly",true);
                    $("#modalCharge").attr('readonly',true);
                    
                    removeRules(updateFrmStandardRateRules);
                    removeRules(updateFrmFlatRateRules);
                    
                   
              });
              
              $("#modalFlatRate").change(function(){
                    alert("Type of Charge Selected: 'Flate Rate'");
                    updateForm.resetForm();
                    $("#modalPackageCost").val("$0.00");
                    $("#modalCharge").val($("#modal_n_ShippingChargeHidden").val());
                    
                    $("#modalPackageCost").attr("readonly",true);
                    $("#modalCharge").removeAttr('readonly');
                    
                    addRules(updateFrmFlatRateRules);
                    removeRules(updateFrmStandardRateRules);
              });
              $("#modalStandardRate").change(function(){
                  alert("Type of Charge Selected: 'Standard Rate'");
                  updateForm.resetForm();
                  $("#modalPackageCost").val($("#modal_n_PackageChargeHidden").val());
                  $("#modalCharge").val($("#modal_n_ShippingChargeHidden").val());
                  
                  $("#modalCharge").attr('readonly',true);
                  $("#modalPackageCost").removeAttr('readonly');
                  
                  addRules(updateFrmStandardRateRules);
                  removeRules(updateFrmFlatRateRules);
                  
              });
              
              
              
              
              $("#noCharge").change(function(){
                    alert("Type of Charge Selected: 'No Charge'");
                    mainForm.resetForm();
                    $("#packageCost").val("$0.00");
                    $("#customerCharge").val("$0.00");
                    
                    $("#customerCharge").removeAttr('readonly');
                    $("#packageCost").removeAttr('readonly');
                    
                    $("#packageCost").attr("readonly",true);
                    $("#customerCharge").attr('readonly',true);
                    
                    
                    
                    //$("#packageCostLabel").removeClass("error");
                    //$("#customerChargeLabel").removeClass("error");
                    
                    //$("#customerChargeLabel").addClass("hide");
                    //$("#packageCostLabel").addClass("hide");
                    
                    removeRules(mainFrmFlatRateRules);
                    removeRules(mainFrmStandardRateRules);
              });
              
              $("#flatRate").change(function(){
                    alert("Type of Charge Selected: 'Flate Rate'");
                    $("#customerCharge").focus();
                    //alert("Before");
                    mainForm.resetForm();
                    //alert("After");
                    
                    $("#packageCost").val("$0.00");
                    $("#customerCharge").val('');
                    
                    $("#packageCost").attr("readonly",true);
                    $("#customerCharge").removeAttr('readonly');
                    
                    //$("#customerChargeLabel").removeClass("hide");
                    //$("#customerChargeLabel").addClass("error");
                    
                    //$("#packageCostLabel").removeClass("error");
                    //$("#packageCostLabel").addClass("hide");
                  
                    //("#customerChargeLabel").toggleClass();
                    
                    
                    removeRules(mainFrmStandardRateRules);
                    addRules(mainFrmFlatRateRules);
                   
                    //alert("hi");
                    
              });
              $("#standardRate").change(function(){
                  alert("Type of Charge Selected: 'Standard Rate'");
                  $("#packageCost").focus();
                  //alert("Before");
                  mainForm.resetForm();
                  
                  
                  $("#customerCharge").val('$0.00');
                  $("#packageCost").val('');
                 
                  $("#customerCharge").attr('readonly',true);
                  $("#packageCost").removeAttr('readonly');
                  
                  //("#packageCostLabel").toggle();
                  
                  //$("#packageCostLabel").toggleClass("error");
                  
                  //$("#packageCostLabel").removeClass("hide");
                  //$("#packageCostLabel").addClass("error");
                  
                  //alert("After1");
                  
                  //$("#customerChargeLabel").removeClass("error");
                  //$("#customerChargeLabel").addClass("hide");
                  
                  //alert("After2");
                  
                  removeRules(mainFrmFlatRateRules);
                  addRules(mainFrmStandardRateRules);
                 
                  
              });
              
              $("#CancelBtn").click(function(){
                        // clear the OrderShipTrackingForm form
                        $("#shippingChargeTrackingFrm").clearForm();
                        
                        
                        mainForm.resetForm();
                        $("#table-wrapper-select").hide();
                        $("#table-wrapper-form").hide();
                        $("#table-wrapper").show();
                          //$('form')[0].reset();
                          //alert($("#orderShipIDHidden").val());
                          //alert("cancel");
                           
                          return false;
              });
              $("#validateOrderShipTrackingModal").click(function (){
                    //alert("hello");
                    $("#updateFrmModalOrderShipTrackingTable").valid();
                    $("#updateFrmModalOrderShipTrackingTable").submit();
                  
              });
              $("#deleteOrderShipTrackingModal").click(function (){
                    //alert("hello");
                    $("#deleteFrmModalOrderShipTrackingTable").submit();
                  
              });
              $("#closeOrderShipTrackingModal").click(function (){
                    //alert("close");
                    //clear all input fields in create form
                    $('#OrderShipTrackingModalEditBtn form')[0].reset();
                    //aform.resetForm();
                    updateForm.resetForm();
                    //$('.error').hide();
                    //alert($("#shippingCostError").text());
                    //$("#shippingCostError").text("*");
                    //close the modal form
                    $('.modal').modal('hide');
                    
                  
              });
              var mainFrmStandardRateRules = {
                  packageCost: {
                                    required: true
                               }
              };
                  
              var mainFrmFlatRateRules = {
                    customerCharge: {
                                            required: true
                                    }         
                                        
               };
               var updateFrmStandardRateRules = {
                  modalPackageCost: {
                                    required: true
                               }
              };
                  
              var updateFrmFlatRateRules = {
                    modalCharge: {
                                            required: true
                                 }
                                        
               };
              function addRules(rulesObj){
                        for (var item in rulesObj)
                        { 
                            $('#'+item).rules('add',rulesObj[item]);
                        }
              }

              function removeRules(rulesObj){
                        for (var item in rulesObj)
                        {
                            $('#'+item).rules('remove');  
                        }
               }
               var mainForm = $('#shippingChargeTrackingFrm').validate({
                    submitHandler: function(form){
                            //alert('submit is in process ');
                            $.ajax({
                                    url: submitUrl,
                                    type: 'POST',
                                    dataType: 'json',
                                    data: $(form).serialize(),
                                    success: function( response ) {
                                        for( var i in response ) 
                                        {
                                            response[ i ].updateLink = updateUrl + response[ i ].ID;
                                            response[ i ].deleteLink = delUrl  + response[ i ].ID;
                                        }
                                        // clear the OrderShipTrackingForm form
                                        $("#shippingChargeTrackingFrm").clearForm();
                                        
                                        //hide the table orderShip Table select form
                                        $("#table-wrapper-form").hide();
                                        
                                        // hide the ordershipTracking Form
                                        $("#table-wrapper-select").hide();
                                        
                                        //clear old rows
                                        $( '#records tbody' ).html( '' );

                                        //append new rows
                                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                                        
                                        // show the OrshipTracking Main Table
                                        $("#table-wrapper").show();
                                        
                                    }
                                
                            });
                    }  
               });
               var updateForm = $('#updateFrmModalOrderShipTrackingTable').validate({
                    submitHandler: function( form ) {
                             $.ajax({
                                    url: updateUrl,
                                    type: 'POST',
                                    data: $(form).serialize(),
                                    success: function( response ) {
                                        //alert(updateID);
                                        
                                         //--- update row in table with new values ---
                                        //td containing Tracking# and td containing charge is selected and assigned to variables
                                        //Here jQuery selector $( ‘tr#2 td’ ) returns an array of td elements inside tr#2.
                                        //So for Tracking# td at index 3 is assigned to tracking112 variable. 
                                        //Similarly td at index 4 is assigned to charge112.
                                        //$(this).parents('tr').find('td:eq(3)').html();
                                        //alert($( 'records'+'tr#' + updateId + ' td' )[3]);
//                                        var tracking112 = $( 'tr#' + updateId + ' td' )[3]; 
//                                           = $( 'tr#' + updateId + ' td' )[4];
//                                        'records'+'tr#' + updateId + ' td' )[3]
//                                        
//                                        //Form posted values assigned to the table tr td elements.
//                                        $( tracking112 ).html( $( '#modalTrackingNumber' ).val() );
//                                        $( charge112 ).html( $( '#modalCharge' ).val() );
                                        //alert("before");
                                        //alert(updateID);
                                        //alert($("Table tr td: "+'#records'+'tr#' + updateID + ' td' )[3]);
                                        var tracking112 = $('tr#' + updateID + ' td' )[3];
                                        var charge112   = $('tr#' + updateID + ' td' )[4];
                                        //alert("after");
                                        //alert("responseFrom Server"+response);
                                        //Form posted values assigned to the table tr td elements.
                                        //var str2 = $( '#modalCharge' ).val();// to remove the $ sign before submitting to the database
                                        //alert(str2.replace("$",""));
                                        //$( charge112 ).html(str2.replace("$",""));
                                        
                                        //alert("Before reset: "+$( '#modalTrackingNumber' ).val());
                                        
                                        $(tracking112 ).html($( '#modalTrackingNumber' ).val() );
                                        
                                        
                                        //$(charge112 ).html($( '#modalCharge' ).val() );
                                        //alert(response);
                                        //alert(parseFloat(response).toFixed(2));
                                        //alert(Number(response)+Number("5.5"));
                                        
                                        if(response == "Data Corrupt")
                                        {
                                            alert("Data is corrupt: Please contact IT");
                                                
                                        }
                                        $(charge112 ).html( '$'+parseFloat(response).toFixed(2));
                                       
                                     
                                      
                                        
                                        //clear all input fields in create form
                                        $('#OrderShipTrackingModalEditBtn form')[0].reset();
                                        //alert("After reset: "+$( '#modalTrackingNumber' ).val());
                                        // close data Modal
                                        $('.modal').modal('hide');
                                        
                                        //refresh list of users by reading it
                                        //readUsers();
                                        
                                        }
                                    })
                         }
               });
               
               
               addRules(mainFrmStandardRateRules);
               
              //alert("testing1");
               

                     
              $( "#addShippingCharge" ).on("click", function() {
                    //alert("helo");
                     $.ajax({
                            url: "orderShipTracking/ordershiptrackingcontroller/orderShipTrackingOrderShipSelect/"+orderID,
                            dataType: 'json',
                            success: function( response ) {
                                //clear old rows
                                $( '#ordShip_tbl tbody' ).html( '' );

                                //append new rows
                                $( '#readAddShipTrack' ).render( response ).appendTo( "#ordShip_tbl tbody" );
                                
                                // hide the orderShip Record table
                                $("#table-wrapper").hide();
                                
                                // show the orderShip Select Table
                                $("#table-wrapper-select").show();
                                }
                            });
                    return false;
                    
              }); //alert(updateID);
               
              $("#records").delegate("a.updateBtn", "click", function() {
                    //alert("update");
                    var orderShipTrackingID             = $(this).parents('tr').attr("id");
                    
                    // global variable 
                    updateID                            = orderShipTrackingID;
                    //alert(updateID);
                    //alert(orderShipTrackingID);
                    
                    //get the record via the DOM tree structure
                    //var orderShipTrackingNumber         = $(this).parents('tr').find('td:eq(3)').html();
                    //var orderShipTrackingShippingCharge = $(this).parents('tr').find('td:eq(4)').html();
                    
                    //get the record via an ajax call and populate the fields
                    $.ajax({
                                    url: getUrl+orderShipTrackingID,
                                    dataType: 'json',
                                    success: function( response ) {
                                        var modal_n_ShippingCharge = '$'+parseFloat(Number(response['n_ShippingCharge'])).toFixed(2);
                                        var modal_n_PackageCharge  = '$'+parseFloat(Number(response['t_PackageCharge'])).toFixed(2);
                                        $("#modal_n_ShippingChargeHidden").val(modal_n_ShippingCharge);
                                        $("#modal_n_PackageChargeHidden").val(modal_n_PackageCharge);
                                        $("#chargeTypeHidden").val(response['t_ChargeType']);
                                        $('input:radio[name="modalNoChargeFlatStandardRate"][value="' + response['t_ChargeType'] +'"]').prop('checked', true);
                                        
                                        if ($("input[name='modalNoChargeFlatStandardRate']:checked").val() === "Standard Rate")
                                        {
                                            //input read only
                                            $("#modalCharge").attr('readonly',true);
                                            $("#modalPackageCost").removeAttr('readonly');
                                            addRules(updateFrmStandardRateRules);
                                            removeRules(updateFrmFlatRateRules);
                                                
                                        }
                                        if ($("input[name='modalNoChargeFlatStandardRate']:checked").val() === "Flat Rate")
                                        {
                                            $("#modalPackageCost").attr("readonly",true);
                                            $("#modalCharge").removeAttr('readonly');
                                             addRules(updateFrmFlatRateRules);
                                             removeRules(updateFrmStandardRateRules);
                                                
                                        }
                                        if ($("input[name='modalNoChargeFlatStandardRate']:checked").val() === "No Charge")
                                        {
                                            $("#modalPackageCost").attr("readonly",true);
                                            $("#modalCharge").attr('readonly',true);
                                            
                                            removeRules(updateFrmStandardRateRules);
                                            removeRules(updateFrmFlatRateRules);
                                            
                                                
                                        }
                                        
                                        $("#modalCharge").val($("#modal_n_ShippingChargeHidden").val());
                                        //alert("From Hidden Input: "+$("#modalCharge").val());
                                        $("#modalPackageCost").val($("#modal_n_PackageChargeHidden").val());
                                        //alert("From Hidden Input: "+ $("#modalShippingCost").val());
                                        $("#modalTrackingNumber").val(response['t_TrackingID']);
                                        //Hide OrderShipTrackingID in a input hiden field
                                        $("#modalOrderShipTrackingID").val(response['kp_OrderShipTrackingID']);
                                        //$("#modalOrderShipID").val(response['kf_OrderShipID']);
                                       
                                    }
                           });
                           //alert( "OrderShipTrackingID: "+$("#modalOrderShipTrackingID").val());
                           //alert("OrderShipID: "+$("#modalOrderShipID").val());
                    
                    // populate the tracking and charge details
                    //$("#modalCharge").val(orderShipTrackingShippingCharge);
                    //$("#modalTrackingNumber").val(orderShipTrackingNumber);
                    
                    //Hide OrderShipTrackingID in a input hiden field
                    $("#modalOrderShipTrackingID").val(orderShipTrackingID);
                    //alert($("#orderShipTrackingID").val());
                    
                    
                  
                    //Edit the Heading of the Modal Window
                    $(".modal-header #modalCustomHeadingTemplateRecords").html("<p>Tracking and Shipping Charge</p>");
                    

                    // show the modal form
                    $("#OrderShipTrackingModalEditBtn").modal({
                        backdrop: false
                    });
                    return false;
                    
              });
              
              
               //validate the fields | submit the form via ajax call| update the template table
//              var aform =$("#updateFrmModalOrderShipTrackingTable").validate({
//                         rules:{
//                                modalCharge: {
//                                                required: true
//				}
//                         },
//                         messages:{
//                                modalCharge:{
//                                             required:"This Field is required"
//                                }
//                         },
//                         submitHandler: function( form ) {
//                             $.ajax({
//                                    url: updateUrl,
//                                    type: 'POST',
//                                    data: $(form).serialize(),
//                                    success: function( response ) {
//                                        //alert(updateID);
//                                        
//                                         //--- update row in table with new values ---
//                                        //td containing Tracking# and td containing charge is selected and assigned to variables
//                                        //Here jQuery selector $( ‘tr#2 td’ ) returns an array of td elements inside tr#2.
//                                        //So for Tracking# td at index 3 is assigned to tracking112 variable. 
//                                        //Similarly td at index 4 is assigned to charge112.
//                                        //$(this).parents('tr').find('td:eq(3)').html();
//                                        //alert($( 'records'+'tr#' + updateId + ' td' )[3]);
////                                        var tracking112 = $( 'tr#' + updateId + ' td' )[3]; 
////                                           = $( 'tr#' + updateId + ' td' )[4];
////                                        'records'+'tr#' + updateId + ' td' )[3]
////                                        
////                                        //Form posted values assigned to the table tr td elements.
////                                        $( tracking112 ).html( $( '#modalTrackingNumber' ).val() );
////                                        $( charge112 ).html( $( '#modalCharge' ).val() );
//                                        //alert("before");
//                                        //alert(updateID);
//                                        //alert($("Table tr td: "+'#records'+'tr#' + updateID + ' td' )[3]);
//                                        var tracking112 = $('tr#' + updateID + ' td' )[3];
//                                        var charge112   = $('tr#' + updateID + ' td' )[4];
//                                        //alert("after");
//                                        //alert("responseFrom Server"+response);
//                                        //Form posted values assigned to the table tr td elements.
//                                        //var str2 = $( '#modalCharge' ).val();// to remove the $ sign before submitting to the database
//                                        //alert(str2.replace("$",""));
//                                        //$( charge112 ).html(str2.replace("$",""));
//                                        $(tracking112 ).html($( '#modalTrackingNumber' ).val() );
//                                        //$(charge112 ).html($( '#modalCharge' ).val() );
//                                        //alert(response);
//                                        //alert(parseFloat(response).toFixed(2));
//                                        //alert(Number(response)+Number("5.5"));
//                                        $(charge112 ).html( '$'+parseFloat(response).toFixed(2));
//                                       
//                                     
//                                      
//                                        
//                                        //clear all input fields in create form
//                                        $('#OrderShipTrackingModalEditBtn form')[0].reset();
//                                        
//                                        // close data Modal
//                                        $('.modal').modal('hide');
//                                        
//                                        //refresh list of users by reading it
//                                        //readUsers();
//                                        
//                                        }
//                                    })
//                         }
//                         
//              });
              
              
              
              
              
              // when hit ok remove record from database via an ajax call and delete the record from the table 
              // remove the row from the template table and show the updated table
              $("#deleteFrmModalOrderShipTrackingTable").validate({
                  submitHandler: function(form) {
                       $.ajax({
                                    url: delUrl+$("#deleteModalOrderShipTrackingID").val(),
                                    type: 'POST',
                                    data: $(form).serialize(),
                                    success: function( response ) {
                                        // close data Modal
                                        $('.modal').modal('hide');
                                        
                                        //remove the tr td row
                                        //alert("delete hi");
                                        //alert($('tr#' + $("#deleteModalOrderShipTrackingID").val()));
                                        $('tr#' + $("#deleteModalOrderShipTrackingID").val()).remove();
                                        //alert("not working");
                                    }
                              });
                      
                  }
              });
              $("#records").delegate("a.deleteBtn", "click", function() {
                    //alert("delete");
                    var deleteOrderShipTrackingID = $(this).parents('tr').attr("id");
                    
                    //alert(deleteOrderShipTrackingID);
                    $("#deleteModalOrderShipTrackingID").val(deleteOrderShipTrackingID);
                    // show the modal form with the ID your about to delete
                    $(".modal-body #message").html("The following ID will be deleted from the System : "+deleteOrderShipTrackingID);
                    
                    $("#OrderShipTrackingModalDeleteBtn").modal({
                        backdrop: false
                    });
                    
                    
                    
                    
                    return false;
                    
              });
//              $("#shippingCharge").click(function(){
//                     $("#table-wrapper").hide();
//                     $("#table-wrapper-select").show();
//                     return false;
//              });
            }); // end document


function readOrderShipTracking() {
                $.ajax({
                    url: readUrl,
                    dataType: 'json',
                    success: function( response ) {
                        for( var i in response ) {
                            response[ i ].updateLink = updateUrl + response[ i ].ID;
                            response[ i ].deleteLink = delUrl  + response[ i ].ID;
                        }
                        // hide the orderShip Record table
                        $("#table-wrapper-select").hide();
                        $("#table-wrapper-form").hide();
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                    }
                });
                 
            } // end readOrderShipTracking/* 
//function AddShippingTracking() {
//    $.ajax({
//        url: "odrTracking/ordershiptrackingcontroller/orderShipSelect/"+orderID,
//        dataType: 'json',
//        success: function( response ) {
//             
//            
//            // hide the orderShip Record table
//            $("#table-wrapper").hide();
//            $("#table-wrapper-form").hide();
//            //clear old rows
//            $( '#ordShip_tbl tbody' ).html( '' );
//
//            //append new rows
//            $( '#readAddShipTrack' ).render( response ).appendTo( "#ordShip_tbl tbody" );
//        }
//    });
//
//} // end readOrderShipTracking/* 


