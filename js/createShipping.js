 
            var siSelect   = 'index.php/ship/homecontroller/shipperInfoSelect';
            var caller     = 'index.php/ship/homecontroller/shipperService';
            var url        = location.pathname.split("/");

            var orderID = url[5];
            //alert(orderID);
            var shipperID = '1009';

               
                
            
            
            //var OrderID = "105408";
        
            $(document).ready( function() {
                
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
                                     "sAjaxSource": "ship/homecontroller/recipientDetails/"+orderID
                                    
                });
                  
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
                                 "sAjaxSource": "ship/homecontroller/blindDetails/"+orderID      
                });
                $("#orderIDHidden").val(orderID);  
                
                $('#dataTable-wrapper').show();
                $('#shipBlind').hide();
                $("#shipperformInfo").hide();  
                
                $.ajax({
                      type: "POST",  
                      url: "ship/homecontroller/abShip/"+orderID,
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
                           
                           var test1 =$("#blindCompanyNameHidden").val()+ 
                               "<br>" +$("#blindContactNameHidden").val()+
                               "<br>"+$("#blindAddressNameHidden").val()+
                               " "+$("#blindAddressNameHidden2").val()+
                               "<br>"+$("#blindCountryNameHidden").val()+" "+$("#blindCityNameHidden").val()+
                               "<br>"+$("#blindStateNameHidden").val()+" "+ $("#blindZipCodeNameHidden").val()+
                               "<br>"+ $("#blindPhoneNameHidden").val();
                           
                               //alert(test);
                           $("#blindAddressInfo").html(test1);
                                
                       
                      }
                 });
                 $.ajax({
                    url: siSelect,
                    success: function(html) {
                    //Fill the second selection with the returned mysql data
                    $("#shipperInfo").html(html);
                     $("#shipperInfo").val(shipperID);
                      }
                });
                
                 $.ajax({
                        url: caller+'/'+shipperID,
                        success: function(html) {
                        //Fill the second selection with the returned mysql data
                        $(".shipperService").html(html);
                        $(".shipperService").val(ShipperServiceID);
                          }
                });
                $.ajax({
                      type: "POST",
                      url: "index.php/ship/homecontroller/billCheckOnCreate/"+orderID,
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
                
                $("#shipperInfo").change(function() {
                        var id = $(this).val();
                        //document.write(id);
                        var dataString = id;
                        //document.write(dataString);

                        $.ajax({
                          type: "POST",  
                          url: caller+'/'+dataString,
                          cache: false,
                          success: function(html) {
                            //Fill the second selection with the returned mysql data
                            $(".shipperService").html(html);
                          }
                        });
                });
                
                
                 $("#submit").click(function(){
                           //alert("inside");
                           var shipper     =  $("#shipperInfo").val();                 // required fields
                           var billto      =  $("#billTo").val();                      // required fields
                           var contactName =  $("#receipeintContactNameHidden").val(); // required fields
                           var address     =  $("#receipeintAddressNameHidden").val(); // required fields
                           var address2    =  $("#receipeintAddressNameHidden2").val(); // required fields
                           var city        =  $("#receipeintCityNameHidden").val();    // required fields
                           var state       =  $("#receipeintStateNameHidden").val();   // required fields
                           var zipCode     =  $("#receipeintZipCodeNameHidden").val(); // required fields
                           
                           if($("#nb_ShippingTBD").val() == 1)
                           {
                               return true;
                                   
                           }
                           else
                           {
                               
                               if(shipper == '')
                               {
                                    alert("Please choose a shipper");
                                    return false;
                               }
     //                           if(shipper == '1000' || shipper == '1001' || shipper == '1002'|| shipper == '1008' || shipper == '1009' || shipper == '1013')
     //                           {
     //                               var companyName = $("#receipeintCompanyNameHidden").val();
     //                              
     //                               if(companyName == null || companyName =="")
     //                               {
     //                                   alert("The \"Recepient\" is missing Company Name.");
     //                                   return false;
     //                                   
     //                               }
     //                           }
                               if(billto == 'Recipient' || billto == 'Third Party')
                               {
                                    //alert(billto);
                                    var billAccountNumber = $('#billAcountNumber').val();

                                    if(billAccountNumber == "")
                                    {
                                        alert("Bill to Account Number is required");
                                        //document.getElementById('billAccError').firstChild.nodeValue = "This value is required";
                                        //alert("in");
                                        return false;
                                    }

                               }
                                //alert(contactName);
                                //alert(address);
                                //alert(city);
                                //alert(state);
                                //alert(zipCode);
                               if(contactName == "" || address == "" || city == "" || state == "" || zipCode == "")
                               {
                                        alert("The \"Recepient\" is missing some data.Please check \"contact name,address,city,country,state and zipcode are required\" ");
                                        return false;
                               }

                               else
                               {
                                    return true;
                                      //readUsers();
                               }
                               
                           }
                           
                           return false;
                               
                                
                });
                
                
                $("#sendTo").click(function(){
                          $('#dataTable-wrapper').show();
                           $('#shipBlind').hide();
                          $("#shipperformInfo").hide();
                          
                          return false;
                });
                
                
                $("#blindFrom").click(function(){ 
                         
                          //alert("hure");
                          $('#dataTable-wrapper').hide();
                          //alert("hur");
                          $('#shipBlind').show();
                          //alert("hu");
                          $("#shipperformInfo").hide();
                          
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
                
                $( ".modal-footer" ).delegate( "a#cancelModalAddress", "click", function() {
                     var companyNameModalError = $("#companyNameModalError").text();
                     var contactNameModalError = $("#contactNameModalError").text();
                     var emailModalError       = $("#emailModalError").text();
                     var phoneModalError       = $("#phoneModalError").text();
                     var Address1ModalError    = $("#Address1ModalError").text();
                     var cityModalError        = $("#cityModalError").text();
                     var stateModalError       = $("#stateModalError").text();
                     var zipCodeModalError     = $("#zipCodeModalError").text();
                    
                     if(companyNameModalError == "This is a required Field")
                     {
                         //alert("inside");
                         $("#companyNameModalError").text("*");
                         
                             
                     }
                     if(contactNameModalError == "This is a required Field")
                     {
                          $("#contactNameModalError").text("*");
                             
                     }
                     if(emailModalError == "This is a required Field")
                     {
                          $("#emailModalError").text("*");
                             
                     }
                     if(emailModalError == "Must be a valid email Address")
                     {
                          $("#emailModalError").text("*");
                             
                     }
                     if(phoneModalError == "This is a required Field")
                     {
                          $("#phoneModalError").text("*");
                             
                     }
                     if(Address1ModalError == "This is a required Field")
                     {
                          $("#Address1ModalError").text("*");
                             
                     }
                     if(cityModalError == "This is a required Field")
                     {
                          $("#cityModalError").text("*");
                             
                     }
                     if(stateModalError == "This is a required Field")
                     {
                          $("#stateModalError").text("*");
                             
                     }
                     if(zipCodeModalError == "This is a required Field")
                     {
                          $("#zipCodeModalError").text("*");
                             
                     }
                     $('.modal').modal('hide');
                     return false;
                    
               });
               $( ".modal-footer" ).delegate( "a#blindCancelModalAddress", "click", function() {
                     var blindCompanyNameModalError = $("#blindCompanyNameModalError").text();
                     var blindContactNameModalError = $("#blindContactNameModalError").text();
                     var blindEmailModalError       = $("#blindEmailModalError").text();
                     var blindPhoneModalError       = $("#blindPhoneModalError").text();
                     var blindAddress1ModalError    = $("#blindAddress1ModalError").text();
                     var blindCityModalError        = $("#blindCityModalError").text();
                     var blindStateModalError       = $("#blindStateModalError").text();
                     var blindZipCodeModalError     = $("#blindZipCodeModalError").text();
                    
                     if(blindCompanyNameModalError == "This is a required Field")
                     {
                         //alert("inside");
                         $("#blindCompanyNameModalError").text("*");
                         
                             
                     }
                     if(blindContactNameModalError == "This is a required Field")
                     {
                          $("#blindContactNameModalError").text("*");
                             
                     }
                     if(blindEmailModalError == "This is a required Field")
                     {
                          $("#blindEmailModalError").text("*");
                             
                     }
                     if(blindEmailModalError == "Must be a valid email Address")
                     {
                          $("#blindEmailModalError").text("*");
                             
                     }
                     if(blindPhoneModalError == "This is a required Field")
                     {
                          $("#blindPhoneModalError").text("*");
                             
                     }
                     if(blindAddress1ModalError == "This is a required Field")
                     {
                          $("#blindAddress1ModalError").text("*");
                             
                     }
                     if(blindCityModalError == "This is a required Field")
                     {
                          $("#blindCityModalError").text("*");
                             
                     }
                     if(blindStateModalError == "This is a required Field")
                     {
                          $("#blindStateModalError").text("*");
                             
                     }
                     if(blindZipCodeModalError == "This is a required Field")
                     {
                          $("#blindZipCodeModalError").text("*");
                             
                     }
                     $('.modal').modal('hide');
                     return false;
                    
               });   
               $( ".modal-footer" ).delegate( "a#validateModalAddress", "click", function() {
                   //alert("hello");
                   var isValid          = true;
                   var companyNameModal = $("#companyNameModal").val();
                   //alert("Company Name: "+companyNameModal);
                   var contactNameModal = $("#contactNameModal").val();
                   //alert(contactNameModal);
                   
                   var emailModal       = $("#emailModal").val();
                   
                   // validate the email entry with a regular expression
	           var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
                   
                   var phoneModal       = $("#phoneModal").val();
                   var Address1Modal    = $("#Address1Modal").val();
                   
                   var cityModal        = $("#cityModal").val();
                   //alert(cityModal);
                   var stateModal       = $("#stateModal").val();
                   //alert(stateModal);
                   var zipCodeModal     = $("#zipCodeModal").val();
                   
//                   var addressIDModal   = $("#modalAddressID").val();
//                   var customerIDModal  = $("#modalCustomerID").val();
//                   var typeMainModal    = $("#modalTypeMain").val();
//                   var typeSubModal     = $("#modalTypeSub").val();
                   //do validation
                   if(companyNameModal == "")
                   {
                      
                       $("#companyNameModalError").text("This is a required Field");
                       isValid = false;
                           
                   }
                   if(contactNameModal == "")
                   {
                      
                      $("#contactNameModalError").text("This is a required Field");
                      isValid = false;
                           
                   }
                   if(emailModal == "")
                   {
                       
                       $("#emailModalError").text("This is a required Field");
                       isValid = false;
                           
                   }
                   if(!emailPattern.test(emailModal))
                   {
                       $("#emailModalError").text("Must be a valid email Address");
                       isValid = false;
                           
                   }
                   if(phoneModal == "")
                   {
                      $("#phoneModalError").text("This is a required Field");
                      isValid = false;
                           
                   }
                   if(Address1Modal == "")
                   {
                      $("#Address1ModalError").text("This is a required Field");
                      isValid = false;
                           
                   }
                   if(cityModal == "")
                   {
                      $("#cityModalError").text("This is a required Field");    
                   }
                   if(stateModal == null)
                   {
                      $("#stateModalError").text("This is a required Field");    
                   }
                   if(zipCodeModal == "")
                   {
                      $("#zipCodeModalError").text("This is a required Field");    
                   }
                  
                   // update
                   if(isValid) 
                   {
//                       var dataString = 'companyName='+ companyNameModal + 
//                       '&contactName=' + contactNameModal+'&addressID=' + addressIDModal
//                       +'&customerID='  +  customerIDModal+'&typeMain=' + typeMainModal
//                       +'&typeSub=' + typeSubModal;
                       //alert(dataString);
                   
                    
                       //e.preventDefault();
                       //myModalEditBtn.close();
                       
                       
                       
                       // do an ajax call to update the record in Address table
                       $.ajax({  
                        type: "POST",  
                        url: "ship/homecontroller/modalAddressSubmit/",  
                        data:  $( '#updateActionDataTable form' ).serialize(),
                        success: function() { 
                            // close data Modal
                            $('.modal').modal('hide');
                            
                           // after updating the record refresh only the recipient DataTable.
                           RefreshTable('#mytable','ship/homecontroller/recipientDetails/'+orderID)
                           //$("#mytable").dataTable().fnDraw();
                           //alert(myTable);
                           //myTable.fnDraw();
                        }
                       });
                       
                       return false;  
                   }
                   
               });
                $( ".modal-footer" ).delegate( "a#blindValidateModalAddress", "click", function() {
                   //alert("hello");
                   var blindIsValid          = true;
                   var blindCompanyNameModal = $("#blindCompanyNameModal").val();
                   //alert("Company Name: "+companyNameModal);
                   var blindContactNameModal = $("#blindContactNameModal").val();
                   //alert(contactNameModal);
                   
                   var blindEmailModal       = $("#blindEmailModal").val();
                   
                    // validate the email entry with a regular expression
	           var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
                   var blindPhoneModal       = $("#blindPhoneModal").val();
                   var blindAddress1Modal    = $("#blindAddress1Modal").val();
                   
                   var blindCityModal        = $("#blindCityModal").val();
                   //alert(cityModal);
                   var blindStateModal       = $("#blindStateModal").val();
                   //alert(stateModal);
                   var blindZipCodeModal     = $("#blindZipCodeModal").val();
                   
//                   var addressIDModal   = $("#modalAddressID").val();
//                   var customerIDModal  = $("#modalCustomerID").val();
//                   var typeMainModal    = $("#modalTypeMain").val();
//                   var typeSubModal     = $("#modalTypeSub").val();
                   //do validation
                   if(blindCompanyNameModal == "")
                   {
                      
                       $("#blindCompanyNameModalError").text("This is a required Field");
                       blindIsValid = false;
                           
                   }
                   if(blindContactNameModal == "")
                   {
                      
                      $("#blindContactNameModalError").text("This is a required Field");
                      blindIsValid = false;
                           
                   }
                   if(blindEmailModal == "")
                   {
                       
                       $("#blindEmailModalError").text("This is a required Field");
                       blindIsValid = false;
                           
                   }
                   if(!emailPattern.test(blindEmailModal))
                   {
                       $("#blindEmailModalError").text("Must be a valid email Address");
                       blindIsValid = false;
                           
                   }
                   if(blindPhoneModal == "")
                   {
                      $("#blindPhoneModalError").text("This is a required Field");
                      blindIsValid = false;
                           
                   }
                   if(blindAddress1Modal == "")
                   {
                      $("#blindAddress1ModalError").text("This is a required Field");
                      blindIsValid = false;
                           
                   }
                   if(blindCityModal == "")
                   {
                      $("#blindCityModalError").text("This is a required Field");    
                   }
                   if(blindStateModal == null)
                   {
                      $("#blindStateModalError").text("This is a required Field");    
                   }
                   if(blindZipCodeModal == "")
                   {
                      $("#blindZipCodeModalError").text("This is a required Field");    
                   }
                  
                   // update
                   if(blindIsValid) 
                   {
//                       var dataString = 'companyName='+ companyNameModal + 
//                       '&contactName=' + contactNameModal+'&addressID=' + addressIDModal
//                       +'&customerID='  +  customerIDModal+'&typeMain=' + typeMainModal
//                       +'&typeSub=' + typeSubModal;
                       //alert(dataString);
                   
                    
                       //e.preventDefault();
                       //myModalEditBtn.close();
                       
                       
                       
                       // do an ajax call to update the record in Address table
                       $.ajax({  
                        type: "POST",  
                        url: "ship/homecontroller/blindModalAddressSubmit/",  
                        data:  $( '#blindUpdateActionDataTable form' ).serialize(),
                        success: function() { 
                            // close data Modal
                            $('.modal').modal('hide');
                            
                           // after updating the record refresh only the recipient DataTable.
                           RefreshTable('#mytable_blind','ship/homecontroller/blindDetails/'+orderID)
                           //$("#mytable").dataTable().fnDraw();
                           //alert(myTable);
                           //myTable.fnDraw();
                        }
                       });
                       
                       return false;  
                   }
                   
               });
               function RefreshTable(tableId, urlData)
               {
                  //Retrieve the new data with $.getJSON. You could use it ajax too
                  $.getJSON(urlData, null, function( json )
                  {
                    table = $(tableId).dataTable();
                    oSettings = table.fnSettings();

                    table.fnClearTable(this);

                    for (var i=0; i<json.aaData.length; i++)
                    {
                      table.oApi._fnAddData(oSettings, json.aaData[i]);
                    }

                    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                    table.fnDraw();
                  });
               }
               
               $( "#mytable" ).delegate( "a.editBtn", "click", function() {
                   var recipientEditInfo = $(this).attr('href' );
                   //alert("recipientEditInfo: "+recipientEditInfo);
                   var recipientInfo = recipientEditInfo.split("/");
                   var addressID     = recipientInfo[0];
                   var customerID    = recipientInfo[1];
                   var typeMain      = recipientInfo[2];
                   var typeSub       = recipientInfo[3];
                   
                   $("#phoneModal").mask("(999) 999-9999");
                   $("#faxModal").mask("(999) 999-9999");
                   $("#mobileModal").mask("(999) 999-9999");
                   //alert(addressID);
                   //alert(customerID);
                   //alert(typeMain);
                   //alert(typeSub);
                   
                    $.ajax({
                        url: 'ship/homecontroller/getModalAddressData'+'/'+addressID,
                        dataType: 'json',
                        success: function(response) {
                        $("#companyNameModal").val(response['t_CompanyName']);
                        $("#contactNameModal").val(response['t_ContactNameFull']);
                        $("#titleModal").val(response['t_ContactTitle']);
                        $("#emailModal").val(response['t_Email']);
                        
                        $("#phoneModal").val(response['t_Phone']);
                        $("#faxModal").val(response['t_Fax']);
                        $("#mobileModal").val(response['t_Mobile']);
                        
                        $("#Address1Modal").val(response['t_Address1']);
                        $("#Address2Modal").val(response['t_Address2']);
                        $("#cityModal").val(response['t_City']);
                        $("#stateModal").val(response['t_StateOrProvince']);
                        //alert(response['t_StateOrProvince']);
                        $("#zipCodeModal").val(response['t_PostalCode']);
                        
                        $("#countryModal").val(response['t_Country']);
                        $("#notesModal").val(response['t_Notes']);
                        
                        $("#modalAddressID").val(addressID);
                        $("#modalCustomerID").val(customerID);
                        $("#modalTypeMain").val(typeMain);
                        $("#modalTypeSub").val(typeSub);
                       
                          }
                     });
                    //alert("hi");
                     $(".modal-header #modalCustomHeadingDataTable").html("<p>Edit: Recipient Address Info</p>");
                    

                        $("#myModalEditBtn").modal({
                        backdrop: false
                        });
                     
                    return false;
                    
                });
                
                $( "#mytable_blind" ).delegate( "a.editBtn", "click", function() {
                   var recipientEditInfo = $(this).attr('href' );
                   //alert("recipientEditInfo: "+recipientEditInfo);
                   var recipientInfo = recipientEditInfo.split("/");
                   var addressID     = recipientInfo[0];
                   var customerID    = recipientInfo[1];
                   var typeMain      = recipientInfo[2];
                   var typeSub       = recipientInfo[3];
                   
                   $("#blindPhoneModal").mask("(999) 999-9999");
                   $("#blindFaxModal").mask("(999) 999-9999");
                   $("#blindMobileModal").mask("(999) 999-9999");
                   //alert(addressID);
                   //alert(customerID);
                   //alert(typeMain);
                   //alert(typeSub);
                   
                    $.ajax({
                        url: 'ship/homecontroller/getModalAddressData'+'/'+addressID,
                        dataType: 'json',
                        success: function(response) {
                        $("#blindCompanyNameModal").val(response['t_CompanyName']);
                        $("#blindContactNameModal").val(response['t_ContactNameFull']);
                        $("#blindTitleModal").val(response['t_ContactTitle']);
                        $("#blindEmailModal").val(response['t_Email']);
                        
                        $("#blindPhoneModal").val(response['t_Phone']);
                        $("#blindFaxModal").val(response['t_Fax']);
                        $("#blindMobileModal").val(response['t_Mobile']);
                        
                        $("#blindAddress1Modal").val(response['t_Address1']);
                        $("#blindAddress2Modal").val(response['t_Address2']);
                        $("#blindCityModal").val(response['t_City']);
                        $("#blindStateModal").val(response['t_StateOrProvince']);
                        $("#blindZipCodeModal").val(response['t_PostalCode']);
                        
                        $("#blindCountryModal").val(response['t_Country']);
                        $("#notesModal").val(response['t_Notes']);
                        
                        $("#blindModalAddressID").val(addressID);
                        $("#blindModalCustomerID").val(customerID);
                        $("#blindModalTypeMain").val(typeMain);
                        $("#blindModalTypeSub").val(typeSub);
                       
                          }
                     });
                    //alert("hi");
                     $(".modal-header #blindModalCustomHeadingDataTable").html("<p>Edit: Blind-Third Party Address Info</p>");
                    

                        $("#blindMyModalEditBtn").modal({
                        backdrop: false
                        });
                     
                    return false;
                    
                });
                
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
                                //alert("Email:"+email+" Fax: "+fax+" Mobile: "+mobile+" Phone: "+phone);
                               
                                //hiding
                                $("#receipeintCustomerShipToIDHidden").val(customerShipToID); 
                                $("#receipeintCustomerIDHidden").val(customerID);
                                
                                
                                $("#receipeintCompanyNameHidden").val(cpName);
                                $("#receipeintContactNameHidden").val(conName);
                                $("#receipeintAddressNameHidden").val(add1);
                                $("#receipeintCityNameHidden").val(city);
                                
                                $("#receipeintStateNameHidden").val(state);
                                $("#receipeintAddressNameHidden2").val(add2);
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
                           
                             
                               $('#dataTable-wrapper').hide();
                               $('#shipBlind').hide();
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
                           
                              
                               $('#dataTable-wrapper').hide();
                               $('#shipBlind').hide();
                               $("#shipperformInfo").show();           
                               
                });
                
                
              
                
            }); // end document/* 



