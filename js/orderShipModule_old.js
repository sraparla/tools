    var  readUrl            = "orderShip/ordershipcontroller/shipDet/"+orderID,
         readUrlExperiment  = "orderShip/ordershipcontroller/shipDChain/"+orderID,
         updateCreateUrl    = 'orderShip/ordershipcontroller/completeUpdateCreateAction',
         //updateUrl          = 'orderShip/ordershipcontroller/updateShip',
         delUrl             = 'orderShip/ordershipcontroller/deleteShip',
         shipperCompany     = 'orderShip/ordershipcontroller/shipperInfoSelect',
         shipperService     = 'orderShip/ordershipcontroller/shipperService',
         blindIndicator     = "orderShip/ordershipcontroller/abShip/",
         billCheckOnCreate  = "orderShip/ordershipcontroller/billCheckOnCreate/",
         shippingReport     = "orderShip/ordershipcontroller/barCodeView/",
         addressFormShipTo  = "orderShip/ordershipcontroller/orderShipAddressForm/shipTo/",
         addressFormBlind   = "orderShip/ordershipcontroller/orderShipAddressForm/shipBlindFrom/";
           
 $(document).ready( function() {
                
                readUsers();
                
                var myTable = $('#mytable').dataTable({
                                    "sDom": "<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                                    "aoColumns": [
                                         null,
                                         null,
                                         null,
                                         null,
                                         null,
                                         null,
                                         null,
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         null  
                                     ],
                                    "oTableTools": {
                                                   "aButtons": [ ],
                                                    "sRowSelect": "single"
                                        },
                                    
                                    "sAjaxSource": "orderShip/ordershipcontroller/addressesRecipientDetails/"+orderID
                                    
                }); //end Recipient Details Table
                var myTable_blind = $('#mytable_blind').dataTable({
                                "sDom": "<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                                "aoColumns": [
                                         null,
                                         null,
                                         null,
                                         null,
                                         null,
                                         null,
                                         null,
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         {"bVisible":    false},
                                         null  
                                     ],
                                  "oTableTools": {
                                               "aButtons": [ ],
                                                "sRowSelect": "single"
                                    },
                                 "sAjaxSource": "orderShip/ordershipcontroller/addressesBlindDetails/"+orderID      
                }); //end Blind Details Table
                
                // links to other pages
               
                $("#shippingReport").attr("href",  shippingReport+orderID);
                
                $("#addReceipient").attr("href",  addressFormShipTo+orderID);
                
                $("#addBlind").attr("href",  addressFormBlind+orderID);
                
                $('#mytable tbody tr').live('click',function(){
                                var aData               = myTable.fnGetData(this);
                                var cpName              = aData[0];
                                var conName             = aData[1];
                                var add1                = aData[2];
                                var city                = aData[3];
                                var state               = aData[4];
                                var zip                 = aData[5];
                                var phone               = aData[6];
                                var add2                = aData[7];
                                //alert(add2);
                                var country             = aData[8];
                                var email               = aData[9];
                                var fax                 = aData[10];
                                var mobile              = aData[11];
                                var customerID          = aData[12];
                                var customerShipToID    = aData[13];
                                //alert(customerShipToID);
                               
                                //hiding
                                $("#receipeintCustomerShipToIDHidden").val(customerShipToID); 
                                $("#receipeintCustomerID").val(customerID);
                                
                                
                                $("#receipeintCompanyNameHidden").val(cpName);
                                $("#receipeintContactNameHidden").val(conName);
                                $("#receipeintAddressNameHidden").val(add1);
                                //alert($("#receipeintAddressNameHidden").val());
                                $("#receipeintCityNameHidden").val(city);
                                
                                $("#receipeintStateNameHidden").val(state);
                                $("#receipeintAddressNameHidden2").val(add2);
                                //alert($("#receipeintAddressNameHidden2").val());
                                $("#receipeintCountryNameHidden").val(country);
                                $("#receipeintZipCodeNameHidden").val(zip);
                                
                                $("#receipeintEmailNameHidden").val(email);
                                $("#receipeintFaxNameHidden").val(fax);
                                $("#receipeintMobileNameHidden").val(mobile);
                                $("#receipeintPhoneNameHidden").val(phone);
                                
                                $("#nb_ShippingTBD").val("");
                                
                                    
                                var test =$("#receipeintCompanyNameHidden").val()+ 
                               "<br>" +$("#receipeintContactNameHidden").val()+
                               "<br>"+$("#receipeintAddressNameHidden").val()+
                               " "+$("#receipeintAddressNameHidden2").val()+
                               "<br>"+$("#receipeintCountryNameHidden").val()+" "+$("#receipeintCityNameHidden").val()+
                               "<br>"+$("#receipeintStateNameHidden").val()+" "+ $("#receipeintZipCodeNameHidden").val()+
                               "<br>"+ $("#receipeintPhoneNameHidden").val();
                           
                               //alert(test);
                               $("#recipientAddressInfo").html(test);
                           
                               //hide main Table
                               $('#table-wrapper').hide();
                               
                               //hide Recipient Table
                               $('#dataTable-wrapper').hide();
                               
                               //hide Blind-Third Party Table
                               $('#shipBlind').hide();
                               
                               // Show shipperFormInfo Section
                               $("#shipperformInfo").show();           
                               
                });
                
                
                
                $('#mytable_blind tbody tr').live('click',function(){
                                //alert("inside");
                                var aDataBlind               = myTable_blind.fnGetData(this);
                                //alert(aDataBlind);
                                var cpNameBlind              = aDataBlind[0];
                                var conNameBlind             = aDataBlind[1];
                                var add1Blind                = aDataBlind[2];
                                var cityBlind                = aDataBlind[3];
                                var stateBlind               = aDataBlind[4];
                                var zipBlind                 = aDataBlind[5];
                                var phoneBlind               = aDataBlind[6];
                                var add2Blind                = aDataBlind[7];
                                //alert(add2Blind);
                                var countryBlind             = aDataBlind[8];
                                var emailBlind               = aDataBlind[9];
                                var faxBlind                 = aDataBlind[10];
                                var mobileBlind              = aDataBlind[11];
                                var customerIDBlind          = aDataBlind[12];
                                var customerShipToIDBlind    = aDataBlind[13];
                                //alert(customerShipToIDBlind);
                               
                                //hiding
                                $("#blindCustomerShipToIDHidden").val(customerShipToIDBlind); 
                                
                                $("#blindCompanyNameHidden").val(cpNameBlind);
                                $("#blindContactNameHidden").val(conNameBlind);
                                $("#blindAddressNameHidden").val(add1Blind);
                                $("#blindCityNameHidden").val(cityBlind);
                                
                                $("#blindStateNameHidden").val(stateBlind);
                                $("#blindAddressNameHidden2").val(add2Blind);
                                $("#blindCountryNameHidden").val(countryBlind);
                                $("#blindZipCodeNameHidden").val(zipBlind);
                                
                                $("#blindEmailNameHidden").val(emailBlind);
                                $("#blindFaxNameHidden").val(faxBlind);
                                $("#blindMobileNameHidden").val(mobileBlind);
                                $("#blindPhoneNameHidden").val(phoneBlind);
                                
                                
                                    
                                var test =$("#blindCompanyNameHidden").val()+ 
                               "<br>" +$("#blindContactNameHidden").val()+
                               "<br>"+$("#blindAddressNameHidden").val()+
                               " "+$("#blindAddressNameHidden2").val()+
                               "<br>"+$("#blindCountryNameHidden").val()+" "+$("#blindCityNameHidden").val()+
                               "<br>"+$("#blindStateNameHidden").val()+" "+ $("#blindZipCodeNameHidden").val()+
                               "<br>"+ $("#blindPhoneNameHidden").val();
                           
                               //alert(test);
                               $("#blindAddressInfo").html(test);
                           
                               $('#table-wrapper').hide();
                               $('#dataTable-wrapper').hide();
                               $('#shipBlind').hide();
                               $("#shipperformInfo").show();           
                               
                });
                
                
                $("#recipientTo").click(function(){
                          //hide main Table
                          $("#table-wrapper").hide();
                          
                          //hide Blind-Third Party Table
                          $('#shipBlind').hide();
                          
                          //hide shipperFormInfo Section
                          $("#shipperformInfo").hide();
                          
                          //Show Recipient Table
                          $('#dataTable-wrapper').show();
                          
                          return false;
                });
                
                $("#blindFrom").click(function(){ 
                          //hide main Table
                          $('#table-wrapper').hide();
                          
                          //hide Recipient Table
                          $('#dataTable-wrapper').hide();
                          
                           //hide shipperFormInfo Section
                          $("#shipperformInfo").hide();
                          
                          //Show Blind-Third Party Table
                          $('#shipBlind').show();
                          
                          return false;
                });
                
                $("#closeRecipient").click(function(){ 
                          //clear the display
                          $("#recipientAddressInfo").html("To be Determined");
                          
                          //clear the blind hidden elements
                          $("#receipeintCustomerShipToIDHidden").val(""); 
                          
                          
                          $("#receipeintCompanyNameHidden").val("");
                          $("#receipeintContactNameHidden").val("");
                          
                          $("#receipeintAddressNameHidden").val("");
                          $("#receipeintCityNameHidden").val("");
                                
                          $("#receipeintStateNameHidden").val("");
                          $("#receipeintAddressNameHidden2").val("");
                          $("#receipeintCountryNameHidden").val("");
                          $("#receipeintZipCodeNameHidden").val("");
                                
                          $("#receipeintEmailNameHidden").val("");
                          $("#receipeintFaxNameHidden").val("");
                          $("#receipeintMobileNameHidden").val("");
                          $("#receipeintPhoneNameHidden").val("");
                          var nb_ShippingTBD = 1;
                          $("#nb_ShippingTBD").val(nb_ShippingTBD);
                          return false;
                });
                
                $("#closeBlindFrom").click(function(){ 
                          //clear the display
                          $("#blindAddressInfo").html("");
                          
                          //clear the blind hidden elements
                          $("#blindCustomerShipToIDHidden").val(""); 
                          $("#blindCompanyNameHidden").val("");
                          $("#blindContactNameHidden").val("");
                          $("#blindAddressNameHidden").val("");
                          $("#blindCityNameHidden").val("");
                                
                          $("#blindStateNameHidden").val("");
                          $("#blindAddressNameHidden2").val("");
                          $("#blindCountryNameHidden").val("");
                          $("#blindZipCodeNameHidden").val("");
                                
                          $("#blindEmailNameHidden").val("");
                          $("#blindFaxNameHidden").val("");
                          $("#blindMobileNameHidden").val("");
                          $("#blindPhoneNameHidden").val("");
                    
                          return false;
                });
                
                
                $("#shipperInfo").change(function() {
                    // get the option value from change event
                    var id = $(this).val();
                    // assign the option value to a datastring variable
                    var dataString = id;
                    
                    //alert($("#typeOfSubmitHidden").val());
                    
                    $.ajax({
                          type: "POST",  
                          url: shipperService+'/'+dataString,
                          cache: false,
                          success: function(html) {
                              //alert("hi");
                            //Fill the second selection with the returned mysql data
                            $(".shipperService").html(html);
                          }
                        });
                    
                });
                
                // footer changes dynamically so submit event needs to be LIVE
                $("#deleteSubmitBtnOrderShipIDModal").live('click',function (){
                    alert("hello"+$("#deleteModalOrderShipID").val());
                    //alert($("#deleteModalOrderShipID").val());
                    $("#deleteFrmModalOrderShipTable").submit();
                  
                });
                
                //alert("class: ");
                //var test = $('tr#'+ '250305'+' a.deleteBtn').attr('class');
                //alert("class: "+test);
                
                var updateFrmModalAddress = $("#updateFrmModalAddress").validate({
                    
                });
                
                var blindUpdateFrmModalAddress = $("#blindUpdateFrmModalAddress").validate({
                    
                });
                
                
                
                
                var updateFrmOrderShipTbl = $("#updateOrderShipTableMainFrm").validate({
                    submitHandler:function(form) {
                        $.ajax({
                                url:updateCreateUrl,
                                type: 'POST',
                                dataType: 'json',
                                data: $(form).serialize(),
                                success: function( response ) {
                                    
                                    //alert($("#typeOfSubmitHidden").val());
                                    // Our Create Process run the Jquery template again.
                                    if($("#typeOfSubmitHidden").val()== "Create")
                                    {
                                         alert($("#typeOfSubmitHidden").val());
                                        
                                        for( var i in response ) {
                                            response[ i ].updateLink = updateCreateUrl + '/' + response[ i ].ID;
                                            response[ i ].deleteLink = delUrl + '/' + response[ i ].ID;
                                        }
                                        
                                        //--- clear form ---
                                        $("#updateOrderShipTableMainFrm").clearForm();
                        
                                         //hide Recipient Table
                                        $( '#dataTable-wrapper' ).hide();


                                        //hide Blind-Third Party Table
                                        $('#shipBlind').hide();

                                        //hide shipperFormInfo Section
                                        $("#shipperformInfo").hide();



                                        //clear old rows
                                        $( '#records tbody' ).html( '' );

                                        //append new rows
                                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                                        
                                        //Show main Table
                                        $('#table-wrapper').show();

                                            
                                    }
                                    if($("#typeOfSubmitHidden").val() == "Update")
                                    {
                                        alert($("#typeOfSubmitHidden").val());
                                            
                                        // we also need to include the update and delete links in the table.

                                        var updateDetails    = $('tr#' +  $("#orderShipIDHidden").val() + ' td' )[1];
                                        var updateReceipeint = $('tr#' +  $("#orderShipIDHidden").val() + ' td' )[2];
                                        var updateBlind      = $('tr#' +  $("#orderShipIDHidden").val() + ' td' )[3];

                                        // no update of tracking numbers as it would corrupt the function of delete
                                        //var updateTracking   = $('tr#' +  $("#orderShipIDHidden").val() + ' td' )[4];

                                        var updateShipperIDShipperServiceID   = $('tr#' +  $("#orderShipIDHidden").val() + ' td' )[6];

                                        //alert("From html Table: "+updateDetails);
                                        //alert("from server: "+response['Tracking']);



                                        // For Update and Delete Links
                                        //$(updateLink).html()

                                        $(updateDetails).html(response['Details']);
                                        $(updateReceipeint).html(response['Receipeint']);
                                        $(updateBlind).html(response['Blind']);
                                        //$(updateTracking).html(response['Tracking']);
                                        $(updateShipperIDShipperServiceID).html(response['shipperIDShipperServiceID']);

                                        alert("Before billacct: "+$("#billAcountNumber").val());

                                        alert("Before hide on work order: "+$("#hideOnWorkOrder").val());

                                        alert("Before "+$("#shipperInfo").val());
                                        //--- clear form ---
                                        //clear all input fields in create form
                                        // clearForm is a custom plugin to clear the form fields
                                        // The user can't see or modify the hidden field, therefore no need to clear them.
                                        // alert($("#orderShipIDHidden").val());
                                        $("#updateOrderShipTableMainFrm").clearForm();



                                        alert("after billacct: "+$("#billAcountNumber").val());

                                        alert("after hide on work order: "+$("#hideOnWorkOrder").val());

                                        alert("after "+$("#shipperInfo").val());
                                        
                                        //hide shipperFormInfo Section
                                        $("#shipperformInfo").hide();



                                        //hide Recipient Table
                                        $('#dataTable-wrapper' ).hide();


                                        //hide Blind-Third Party Table
                                        $('#shipBlind').hide();

                                        //Show main Table
                                        $('#table-wrapper').show();
                                        
                                            
                                    }
                                        
                                }
                            
                        });
                        
                    }
                });
                //alert("Before"+updateFrmOrderShipTbl);
                
                
                $("#deleteFrmModalOrderShipTable").validate({
                   submitHandler: function(form) {
                       $.ajax({
                                    url: delUrl+'/'+$("#deleteModalOrderShipID").val(),
                                    type: 'POST',
                                    data: $(form).serialize(),
                                    success: function( response ) {
                                        
                                        // close data Modal
                                        $('.modal').modal('hide');
                                        
                                        //remove the tr td row
                                        //alert("delete hi");
                                        //alert($('tr#' + $("#deleteModalOrderShipTrackingID").val()));
                                        $('tr#' + $("#deleteModalOrderShipID").val()).remove();
                                        //alert("not working");
                                    }
                              });
                      
                  }
                });
                
 //------------------------------------ Create a New OrderShip Record ---------------------------------------------------//               
                $("#createNew").on("click",function(){
                       // populate the shipper Company Info
                   $.ajax({
                            url: shipperCompany,
                            success: function(html) {
                                //Fill the second selection with the returned mysql data
                                $("#shipperInfo").html(html);

                                //$("#shipperInfo").val(shipperID);
                            }
                       });
                   //store the OrderID value
                   $("#orderIDHidden").val(orderID);
                   
                   
                   //check for blind Indicator
                   $.ajax({
                      type: "POST",  
                      url: blindIndicator+orderID,
                      dataType: "json",
                      cache: false,
                      success: function(response) {
                           //alert(response['t_CompanyName']);
                           //$("#blindCompanyNameHidden").val(data['t_CompanyName']);
                           $("#blindCompanyNameHidden").val(response['t_CompanyName']);
                           $("#blindContactNameHidden").val(response['t_ContactNameFull']);
                           $("#blindAddressNameHidden").val(response['t_Address1']);
                           $("#blindCityNameHidden").val(response['t_City']);
                                
                           $("#blindStateNameHidden").val(response['t_StateOrProvince']);
                           $("#blindZipCodeNameHidden").val(response['t_PostalCode']);
                           $("#blindPhoneNameHidden").val(response['t_Phone']);
                           $("#blindAddressNameHidden2").val(response['t_Address2']);
                                
                           $("#blindCountryNameHidden").val(response['t_Country']);
                           $("#blindEmailNameHidden").val(response['t_Email']);
                           $("#blindFaxNameHidden").val(response['t_Fax']);
                           $("#blindMobileNameHidden").val(response['t_Mobile']);
                           
                           $("#blindCustomerShipToIDHidden").val(response['kp_AddressID']);
                           //alert( $("#blindCustomerShipToIDHidden").val());
                           
                           var test =$("#blindCompanyNameHidden").val()+ 
                               "<br>" +$("#blindContactNameHidden").val()+
                               "<br>"+$("#blindAddressNameHidden").val()+
                               " "+$("#blindAddressNameHidden2").val()+
                               "<br>"+$("#blindCountryNameHidden").val()+" "+$("#blindCityNameHidden").val()+
                               "<br>"+$("#blindStateNameHidden").val()+" "+ $("#blindZipCodeNameHidden").val()+
                               "<br>"+ $("#blindPhoneNameHidden").val();
                           
                               //alert(test);
                           $("#blindAddressInfo").html(test);
                                
                       
                          }
                       });
                       
                   
                   $.ajax({
                      type: "POST",
                      url: billCheckOnCreate+orderID,
                      dataType: "json",
                      cache: false,
                      success: function(response) {
                                    if(response['nb_ShipAlwaysFedXAcct']  ==  1 )
                                    {
                                            if(response['nb_UseDefBlindShipper'] == 1)
                                            {
                                                $("#billAcountNumber").val(response['t_CustFedexAcct']);
                                                $("#billTo").val("Third Party");     
                                            }
                                            else
                                            {
                                                $("#billAcountNumber").val(response['t_CustFedexAcct']);
                                                $("#billTo").val("Recipient");   
                                            }

                                    }
                          //alert(response['nb_UseDefBlindShipper']);
                          
                            }
                       });
                  
                   // change the text of the submit button of the Main Form
                   $("#updateBtnOrderShipTableMainFrm").html('Create');
                   
                   $("#typeOfSubmitHidden").val("Create");
                   
                   //hide main Table
                   $("#table-wrapper").hide();
                   
                   //hide Blind-Third Party Table
                   $('#shipBlind').hide();
                          
                   //hide shipperFormInfo Section
                   $("#shipperformInfo").hide();
                   
                   
                          
                   //Show Recipient Table
                   $('#dataTable-wrapper').show();
                   
                   // Then show the form to insert the new record in the ordership table
                   
                   // show the blind information first
                   
                   
                   return false;
                   
                }); 
                
                
                alert("hi446");
   
               
                
                $("#records").on("click","a.trackBtn", function() {
                    alert("Hello Track");
                    var fedExUrl =  "https://www.fedex.com/fedextrack/?tracknumbers=";
                    var trackingInfoHtml = $(this).attr('href');
                    alert(trackingInfoHtml);
                    
                    //Below is the previous Version of trackingInfoHtml where tracking numbers were obtained from a hidden coloumn called TrackingCheck
                    //var trackingInfoHtml        = $(this).parents('tr').find('td:eq(7)').html();
                    
                    var trackingInfoArray       = trackingInfoHtml.split("<br>");
                    
                    alert(trackingInfoArray);
                    
                    var trackingInfoArrayLength = trackingInfoArray.length;
                    alert(trackingInfoArrayLength);
                    
                    if(trackingInfoArrayLength >=2)
                    {
                        //alert("More than One Tracking Number:");
                        var multipleTracUrl = "";
                        for(var i =0;i<trackingInfoArrayLength;i++)
                        {
                            multipleTracUrl += trackingInfoArray[i]+",";
                        }
                        
                        multipleTracUrl = fedExUrl + multipleTracUrl;
                        window.open(multipleTracUrl);

                    }
                    else
                    {
                        //alert("Only One TrackingNumber");
                        var singleTracUrl = fedExUrl+trackingInfoArray[0];
                        //alert("singleTracUrl");
                        //window.open(fedExUrl+trackingInfoArray[0]); 
                        window.open(singleTracUrl); 
                    }
                     
                     return false;
                     
                });
                 
                alert("hi455");
                 
                
 //------------------------------Delete the OrderShip Record from the template table-----------------//          
                $("#records").on("click","a.deleteBtn", function() {
                    alert("Hello Delete");
                    
                    // Get the OrderShipID to be deleted
                    var deleteOrderShipID = $(this).parents('tr').attr("id");
                    //alert(deleteOrderShipID);
                    
                    //Store the OrderShipID in the hidden element
                    $("#deleteModalOrderShipID").val(deleteOrderShipID);
                    //alert($("#deleteModalOrderShipID").val());
                    // Get the Tracking Number of the record
                    //  to evaluate whether or not we can delete the record 
                    var trackingNumbers    = $(this).parents('tr').find('td:eq(4) a.trackBtn').attr('href');
                    //alert(trackingNumbers);
                    
                    //split the tracking number and store them in an array
                    var trackingNumbersArray=trackingNumbers.split("<br>");
                    //alert(trackingNumbersArray);
                    
                    // if no tracking number found we can delete the OrderShipID
                    // if tracking number found we can't delete the OrderShipID
                    if(trackingNumbersArray[0]=="")
                    {
                        // the message to delete with the ID# :
                        $(".modal-body #deleteConfirm").html("The following ID will be deleted from the System : "+deleteOrderShipID);
                        
                        
                        
                        
                        
                        //check if the submit btn is removed
                        var deleteSubmit = $("#deleteSubmitBtnOrderShipIDModal").size();
                        
                        // if the value is 1 it has not yet been removed, which is what we want here
                        // else if the value is less than 1 then it is removed.
                        if(deleteSubmit !== 1)
                        {
                            alert("Add sibmit btn: "+deleteSubmit);
                            
                            // change the class of the cancel button
                            $("#deleteCancelBtnOrderShipIDModal").attr('class', 'btn');
                            // change the text of the cancel button
                            $("#deleteCancelBtnOrderShipIDModal").html('Cancel');
                            // append the submit button to the cancel button
                            $("#dynamciFooterMyModalConfirm").append('<button type="submit" id=\"deleteSubmitBtnOrderShipIDModal" class="btn  btn-primary" >OK</button>');
                            
                            
                            
                            // show the modal form with the ID your about to delete
                            $("#myModalConfirm").modal({
                                        backdrop: false
                             });
                                
                        }
                        else
                        {
                            alert("No Need to add Submit Btn: "+deleteSubmit);
                            // change the class of the cancel button
                            $("#deleteCancelBtnOrderShipIDModal").attr('class', 'btn');
                            
                            // show the modal form with the ID your about to delete
                            $("#myModalConfirm").modal({
                                        backdrop: false
                             });
                            
                                
                        }
                        
                        //if removed add the submit btn | if not removed don't add it again
                        
                        
                        
                    }
                    else
                    {
                        //alert("else");
                        // the message saying OrderShipID can't be deleted :
                        $(".modal-body #deleteConfirm").html("This shipment already has tracking #'s and cannot be deleted");
                        
                        //remove the submit button 
                        $("#deleteSubmitBtnOrderShipIDModal").remove();
                        
                        // change the text of the cancel button
                        $("#deleteCancelBtnOrderShipIDModal").html('OK');
                    
                        // show the modal form with the ID your about to delete
                        $("#myModalConfirm").modal({
                                    backdrop: false
                         });
                        
                    }    
                    
                    
                    return false;
                    
                });
                 
                alert("hi519");
                
                
  //-----------------------------Update on Jquery Template Table-----------------------------------------------------------// 
                //------------------- get the data from Details, recipient and blind -----------------------//
                //------------------- assign the data to input varaibles -----------------------------------//
                //------------------- make ajax calls to Shipper and ShipperService table ------------------//
                //------------------- Hide main , Recipient, blind table and show shipperformInfo section---//
                $("#records").on("click","a.updateBtn",function() {
                    //alert("Hello Update");
                    //updateHref              = $(this).attr('href');
                    //alert(updateHref);
                    //updateId  
                     
   //-----------------Getting the Informaiton from the table -----------------------------------------------------------//
                    
                    //1. Details td Info
                    var detailsInfoHtml               = $(this).parents('tr').find('td:eq(1)').html();
                    //alert(detailsInfoHtml);
                    
                    //2. Receipeint td Info
                    var receipeintInfoHtml            = $(this).parents('tr').find('td:eq(2)').html();
                    
                    //3. Blind td Info
                    var blindInfoHtml                 = $(this).parents('tr').find('td:eq(3)').html();
                    
                    //4. Tracking td Info : will have its own on click even function as update and Delete 
                    //var trackingInfoHtml              = $(this).parents('tr').find('td:eq(7)').html();
                    
                    
                    //alert(trackingInfoArray[0]);
                    //alert(trackingInfoArray[1]);
                    // if(trackingInfoArray[0] == "")
                    // {      
                             
                    // 5. Hidden Coloumn ShipperServiceID td Info
                    var shipSSID                      = $(this).parents('tr').find('td:eq(6)').html();
                    
    //-------------1. Details td Info: parsing the 'details' Info and assigning them to input variable ----------------//
                    var detailsInfoArray              = detailsInfoHtml.split("<br>");
                    //alert(detailsInfoArray);
                    
                    var billTo                        =  detailsInfoArray[2];
                    //alert(billTo);
                    
                    var billToAccountNumber           =  detailsInfoArray[3];
                    var shipWithOrderID               =  detailsInfoArray[4];
                    // hideShippingOnWorkOrder and notes will be retrieved from the Hidden Coloumn
                    //var hideShippingOnWorkOrder     =  detailsInfoArray[5];
                    //var notes                       =  detailsInfoArray[5];
                    
                    $("#billTo").val(billTo);

                    $("#billAcountNumber").val(billToAccountNumber);

                    $("#shipWithOrderID").val(shipWithOrderID);
                    
    //-------------2.Receipeint td Info: Displaying the 'Recipient' Info in the recipient Address Field --------------//  
                    $("#recipientAddressInfo").html(receipeintInfoHtml);
                    
                    
    //-------------3.Displaying the 'Blind' td Info in the blind address Field ----------------------------------------// 
                    $("#blindAddressInfo").html(blindInfoHtml);
                    
    //-------------4. Tracking td Info : will have its own 'on click' event function as 'update' and 'Delete'----------------------------------------//
                    
    //-------------5.Hidden Coloumn shipSSID td Info: parsing the hidden coloumn and assigning to variables -----//
                    var shipSSIDArray                 = shipSSID.split("<br>");
                    
                    //5.1 Store OrderShip.kf_ShipperID
                    var shipperID                     = shipSSIDArray[0];
                    
                    //5.2 Store kf_ShipperServiceID
                    var shipperServiceID              = shipSSIDArray[1];
                    
                    //5.3 Store t_RecipientCompany
                    var recipientCompany              = shipSSIDArray[2];
                    
                    //5.4 Store t_RecipientContact
                    var recipientContact              = shipSSIDArray[3];
                    
                    //5.5 Store t_RecipientAddress1
                    var recipientAddress1             = shipSSIDArray[4];
                    
                    //5.6 Store t_RecipientAddress2
                    var recipientAddress2             = shipSSIDArray[5];
                    
                    //5.7 Store t_RecipientCountry
                    var recipientCountry              = shipSSIDArray[6];
                    
                    //5.8 Store t_RecipientCity
                    var recipientCity                 = shipSSIDArray[7];
                    
                    //5.9 Store t_RecipientState
                    var recipientState                = shipSSIDArray[8];
                    
                    //5.10 Store t_RecipientPostalCode
                    var recipientPostalCode           = shipSSIDArray[9];
                    
                    //5.11 Store t_RecipientPhone
                    var recipientPhone                = shipSSIDArray[10];
                    
                    //5.12 Store t_RecipientEmail
                    var recipientEmail                = shipSSIDArray[11];
                    
                    //5.13 Store t_RecipientFax
                    var recipientFax                  = shipSSIDArray[12];
                    
                    //5.14 Store t_RecipientMobile
                    var recipientMobile               = shipSSIDArray[13];
                    
                    //5.15 Store t_SenderCompany
                    var senderCompany                 = shipSSIDArray[14];
                    
                    //5.16 Store t_SenderContact
                    var senderContact                 = shipSSIDArray[15];
                    
                    //5.17 Store t_SenderAddress1
                    var senderAddress1                = shipSSIDArray[16];
                    
                    //5.18 Store t_SenderAddress2
                    var senderAddress2                = shipSSIDArray[17];
                    
                    //5.19 Store t_SenderCountry
                    var senderCountry                 = shipSSIDArray[18];
                    
                    //5.20 Store t_SenderCity
                    var senderCity                    = shipSSIDArray[19];
                    
                    //5.21 Store t_SenderState
                    var senderState                   = shipSSIDArray[20];
                    
                    //5.22 Store t_SenderPostalCode
                    var senderPostalCode              = shipSSIDArray[21];
                    
                    //5.23 Store t_SenderPhone
                    var senderPhone                   = shipSSIDArray[22];
                    
                    //5.24 Store t_SenderEmail
                    var senderEmail                   = shipSSIDArray[23];
                    
                    //5.25 Store t_SenderFax
                    var senderFax                     = shipSSIDArray[24];
                    
                    //5.26 Store t_SenderMobile
                    var senderMobile                  = shipSSIDArray[25];
                    
                    //5.27 Store kf_CustomerShipBlindFromID
                    var customerShipBlindFromID       = shipSSIDArray[26];
                    
                    //5.28 Store kf_CustomerShipToID
                    var customerShipToID              = shipSSIDArray[27];
                    
                    //5.29 Store OrderShip.kf_OrderID
                    var orderID                       = shipSSIDArray[28];
                    
                    //5.30 Store kf_CustomerID
                    var customerID                    = shipSSIDArray[29];
                    
                    //5.31 Store kp_OrderShipID
                    var orderShipID                   = shipSSIDArray[30];
                    
                    //5.32 Store nb_ShippingTBD
                    var shippingTBD                   = shipSSIDArray[31];
                    
                    //5.33 Store nb_HideOnWorkOrder
                    var hideOnWorkOrder               = shipSSIDArray[32];
                    
                    //5.34 Store t_Notes
                    var notes                         = shipSSIDArray[33];
                    
                    //Type of Submit
                    $("#typeOfSubmitHidden").val("Update");
                    
                    //shipping TBD
                    $("#nb_ShippingTBD").val(shippingTBD);
                    
                    // Notes
                    $("#notes").val(notes);
                    
                    // customer,order, blind,shipTo,OrderShipID
                    $("#orderIDHidden").val(orderID); //orderID
                    $("#receipeintCustomerIDHidden").val(customerID); //customerID
                    $("#orderShipIDHidden").val(orderShipID);//orderShipID
                    $("#blindCustomerShipToIDHidden").val(customerShipBlindFromID); //Blind From ID
                    $("#receipeintCustomerShipToIDHidden").val(customerShipToID);//receipeint Ship To ID
                    
                    
                    
                    //hidden receipeint Data 
                    $("#receipeintCompanyNameHidden").val(recipientCompany);
                    $("#receipeintContactNameHidden").val(recipientContact);
                    $("#receipeintAddressNameHidden").val(recipientAddress1);
                    $("#receipeintCityNameHidden").val(recipientCity);

                    $("#receipeintStateNameHidden").val(recipientState);
                    $("#receipeintAddressNameHidden2").val(recipientAddress2);
                    $("#receipeintCountryNameHidden").val(recipientCountry);
                    $("#receipeintZipCodeNameHidden").val(recipientPostalCode);

                    $("#receipeintEmailNameHidden").val(recipientEmail);
                    $("#receipeintFaxNameHidden").val(recipientFax);
                    $("#receipeintMobileNameHidden").val(recipientMobile);
                    $("#receipeintPhoneNameHidden").val(recipientPhone);
                    
                    
                    
                    //hidden blind Data
                    $("#blindCompanyNameHidden").val(senderCompany);
                    $("#blindContactNameHidden").val(senderContact);
                    $("#blindAddressNameHidden").val(senderAddress1);
                    $("#blindCityNameHidden").val(senderCity);

                    $("#blindStateNameHidden").val(senderState);
                    $("#blindAddressNameHidden2").val(senderAddress2);
                    $("#blindCountryNameHidden").val(senderCountry);
                    $("#blindZipCodeNameHidden").val(senderPostalCode);

                    $("#blindEmailNameHidden").val(senderEmail);
                    $("#blindFaxNameHidden").val(senderFax);
                    $("#blindMobileNameHidden").val(senderMobile);
                    $("#blindPhoneNameHidden").val(senderPhone);
                    
                    // populating the Shipper Company dropdown from Shipper ID
                    // shipperCompany       = 'ship/homecontroller/shipperInfoSelect'
                    $.ajax({
                        url: shipperCompany+'/'+shipperID,
                        success: function(html) {
                            //Fill the second selection with the returned mysql data
                            $("#shipperInfo").html(html);
                            
                            //$("#shipperInfo").val(shipperID);
                        }
                    });
                    
                    
                    if(hideOnWorkOrder == 1)
                    {
                        $("#hideOnWorkOrder").attr('checked', true);

                    }
                    else
                    {
                        $("#hideOnWorkOrder").attr('checked', false);

                    }
                    
                    
                    
                    // populating the Shipper Service dropdown from Shipper Company ID 
                    // shipperService             = 'ship/homecontroller/shipperService'
                    $.ajax({
                        url: shipperService+'/'+shipperID,
                        success: function(html) {
                        //Fill the second selection with the returned mysql data
                        $(".shipperService").html(html);
                        $(".shipperService").val(shipperServiceID);
                          }
                    });
                    
                   // change the text of the submit button of the Main Form
                   $("#updateBtnOrderShipTableMainFrm").html('Update');
                   
                   //hide main Table
                   $('#table-wrapper').hide();
                   
                   //hide Recipient Table
                   $('#dataTable-wrapper').hide();
                   
                   //hide Blind-Third Party Table
                   $('#shipBlind').hide();
                   
                   
                   //show shipperFormInfo Section
                   $("#shipperformInfo").show();
                    
                    
                    
                    
                    return false;
                    
                });
                //var testUpdateID = "250305";
                
//                 $.ajax({
//                    url: "orderShip/ordershipcontroller/shipDChain/106058",
//                    dataType: 'json',
//                    success: function( response ) {
//                        var testDetails    = $('tr#' + testUpdateID + ' td' )[1];
//                        var testReceipeint = $('tr#' + testUpdateID + ' td' )[2];
//                        var testBlind      = $('tr#' + testUpdateID + ' td' )[3];
//                        var testTracking   = $('tr#' + testUpdateID + ' td' )[4];
//                        var testshipperIDShipperServiceID   = $('tr#' + testUpdateID + ' td' )[6];
//                       
//                        alert("From html Table: "+testDetails);
//                        alert("from server: "+response['Tracking']);
//                        
////                        $(testDetails).html(response['Details']);
////                        $(testReceipeint).html(response['Receipeint']);
////                        $(testBlind).html(response['Blind']);
////                        $(testTracking).html(response['Tracking']);
////                        $(testshipperIDShipperServiceID).html(response['shipperIDShipperServiceID']);
//                        
//                    }
//                 });
                
            //alert("When page starts: "+$("#orderShipIDHidden").val());//orderShipID   
            }); // end document


function readUsers() {
                $.ajax({
                    url: readUrlExperiment+'/'+'',
                    dataType: 'json',
                    success: function( response ) {
                        for( var i in response ) {
                            response[ i ].updateLink = updateCreateUrl + '/' + response[ i ].ID;
                            response[ i ].deleteLink = delUrl + '/' + response[ i ].ID;
                        }
                        
                         //hide Recipient Table
                        $( '#dataTable-wrapper' ).hide();
                        
                        
                        //hide Blind-Third Party Table
                        $('#shipBlind').hide();
                         
                        //hide shipperFormInfo Section
                        $("#shipperformInfo").hide();
                        
                        
                       
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                    }
                });
                 
            } // end readUsers