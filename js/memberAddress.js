var countryAbb = "";
var addressSubmitUrl  = 'addresses/addresscontroller/addressSubmit';
var readAddressTblUrl = "addresses/addresscontroller/getAddressesDataFromAddressIDInJsonFormat"
$(document).ready(function() {
       var orderID      = $("#orderIDHidden").val();
       var customerID   = $("#customerID").val();
       var actionString = $("#actionStringHidden").val(); 
       var addressID    = $("#addressIDHidden").val();
       //alert("Before  : "+customerID);
       //alert("actionString "+ actionString);
      
       //alert("OrderID: "+$("#orderIDHidden").val());
       
       //alert("Type Of Sub : "+$("#typeSub").val());
       //alert("Before CustomerID8: "+$("#customerID").val());
       
       
       var fillCountry   = "addresses/addresscontroller/addressesStatesGetCountryFromStatesTable";
       var fillState     = "addresses/addresscontroller/addressesStatesGetStatesFromStatesTable";
       var getState      = "addresses/addresscontroller/addressesStatesGetStatesFromCountryChange";
       var getCustomerID = "addresses/addresscontroller/addressesCustomersgetCustomerFromOrderID/";
       
       $.ajax({
                        type:"GET",
                        url: fillCountry,
                        async:false,
                        success: function(html) {
                        //Fill the second selection with the returned mysql data
                        $("#countryNameStateTable").html(html);
                        //$("#countryStateTable").val(ShipperID);
                          }
              });
       $.ajax({
                        type:"GET",
                        url: fillState,
                        async:false,
                        success: function(html) {
                        //Fill the second selection with the returned mysql data
                        $("#stateNameStateTable").html(html);
                        //$("#countryStateTable").val(ShipperID);
                          }
              }); 
       
       if(actionString == "update")
       {
           //alert("actionString inside "+ actionString);
           readAddressTblInfo();
           
           
       }    
       if(customerID == null || customerID == "")
       {
           //alert("Insiede  : ");
           $.ajax({
               type:"GET",
               url: getCustomerID+orderID,
               dataType: 'json',
               async:false,
               success: function(response) {
                        //Fill the second selection with the returned mysql data
                        //alert(response['kf_CustomerID']);
                        //alert("response40 "+response['kf_CustomerID']);
                        $("#customerID").val(response['kf_CustomerID']);
                        //alert("after response assigning: "+$("#customerID").val());
              }
           });   
              
           
       }
       //alert("After : "+$("#customerID").val());       
    
       //alert("After CustomerID: "+$("#customerID").val());
       
       $("#phone").mask("(999) 999-9999"); 
       
       $("#fax").mask("(999) 999-9999"); 
       
       $("#mobile").mask("(999) 999-9999");
       
       $("#companyName").focus();
	       
       $("#countryNameStateTable").change(function() {
                //alert("hi");
                var id = $(this).val();
                //alert(id);
                //document.write(id);
                var dataString = id;
                countryAbb =dataString;
                if(dataString == "PA")
                {
                    //alert("inside if: "+countryAbb);
                    //mainAddressForm.resetForm();
                    $("#phone").mask("(99)-9-999-99999? x99999");
                    $("#fax").mask("(99)-9-999-99999? x99999");
                    $("#mobile").mask("(99)-9-999-99999? x99999");
                    $("#stateError").empty();
                    //alert($("#companyNameError").html());
                    
                    $("#companyNameError").html('*');
                    //alert("hi++");

                    //remove USA, Canada and mexico Rules
                    //alert("u there");
                    removeRules(mainAddressFrmUStatesCandaRules);
                    removeRules(mainAddressFrmMexicoRules);
                    addRules(mainAddressFrmPanamaRules);
                    //alert("u there");

                }
                if(dataString == "CR")
                {
                    //alert("inside if: "+countryAbb);
                    //mainAddressForm.resetForm();
                    $("#phone").mask("(99)-9-999-99999? x99999");
                    $("#fax").mask("(99)-9-999-99999? x99999");
                    $("#mobile").mask("(99)-9-999-99999? x99999");
                    $("#stateError").empty();
                    //alert($("#companyNameError").html());
                    
                    $("#companyNameError").html('*');
                    //alert("hi++");

                    //remove USA, Canada and mexico Rules
                    //alert("u there");
                    removeRules(mainAddressFrmUStatesCandaRules);
                    removeRules(mainAddressFrmMexicoRules);
                    addRules(mainAddressFrmFranceRules);
                    //alert("u there");

                }
                if(dataString == "FR")
                {
                    //alert("inside if: "+countryAbb);
                    //mainAddressForm.resetForm();
                    $("#phone").mask("(99)-9-999-99999? x99999");
                    $("#fax").mask("(99)-9-999-99999? x99999");
                    $("#mobile").mask("(99)-9-999-99999? x99999");
                    $("#stateError").empty();
                    //alert($("#companyNameError").html());
                    
                    $("#companyNameError").html('*');
                    //alert("hi++");

                    //remove USA, Canada and mexico Rules
                    //alert("u there");
                    removeRules(mainAddressFrmUStatesCandaRules);
                    removeRules(mainAddressFrmMexicoRules);
                    addRules(mainAddressFrmFranceRules);
                    //alert("u there");

                 }
                 if(dataString =="ES")
                 {
                   
                     
                     $("#phone").mask("(999) 999-9999"); 
       
                     $("#fax").mask("(999) 999-9999"); 
       
                     $("#mobile").mask("(999) 999-9999");
                     
                     $("#stateError").empty();
                     $("#companyNameError").html('*');
                     
                     removeRules(mainAddressFrmUStatesCandaRules);
                     removeRules(mainAddressFrmMexicoRules);
                     addRules(mainAddressFrmFranceRules);
                     
                 }    
                 if(dataString == "MX")
                 {
                     //mainAddressForm.resetForm();
                     $("#phone").mask("(99)-9-999-99999? x99999");
                     $("#fax").mask("(99)-9-999-99999? x99999");
                     $("#mobile").mask("(99)-9-999-99999? x99999");
                     $("#stateError").empty();
                     $("#stateError").append('*');
                     
                     removeRules(mainAddressFrmUStatesCandaRules);
                     removeRules(mainAddressFrmFranceRules);
                     addRules(mainAddressFrmMexicoRules);


                 }
                 if(dataString == "US" || dataString == "CA")
                 {
                      //mainAddressForm.resetForm();
                      $("#phone").mask("(999) 999-9999"); 
       
                      $("#fax").mask("(999) 999-9999"); 
       
                      $("#mobile").mask("(999) 999-9999");
                     
                      $("#stateError").empty();
                      $("#stateError").append('*');
                     
                      removeRules(mainAddressFrmUStatesCandaRules);
                      removeRules(mainAddressFrmFranceRules);
                      addRules(mainAddressFrmMexicoRules);


                 }
                //document.write(dataString);

                $.ajax({
                  type: "GET",  
                  url: getState+'/'+dataString,
                  cache: false,
                  success: function(html) {
                    //Fill the second selection with the returned mysql data
                    $("#stateNameStateTable").html(html);


                    //alert("inside success: "+countryAbb);
                  }
                });
        });
                       
       
        var mainAddressFrmUStatesCandaRules = {
                  companyName: {
				required: true
				
			},
                        contactName: {
				required: true
				
			},
//                        email:{
//                            required:true,
//                            email:true
//                        },
                        phone: {
				required: true,
                                phoneUS:true
				
			},
                        
                        Address1: {
				required: true
				
			},
                       
                        city: {
				required: true
				
			},
                        stateNameStateTable: {
				required: true
				
			},
                        zipCode: {
				required: true
				
			}
                        
        };
        var mainAddressFrmMexicoRules = {
                  companyName: {
				required: true
				
			},
                        contactName: {
				required: true
				
			},
//                        email:{
//                            required:true,
//                            email:true
//                        },
                        phone: {
				required: true

			},
                        
                        Address1: {
				required: true
				
			},
                       
                        city: {
				required: true
				
			},
                        stateNameStateTable: {
				required: true
				
			},
                        
                        zipCode: {
				required: true
				
			}
                        
        };
        
        var mainAddressFrmPanamaRules = {
                  companyName: {
				required: true
				
			},
                        contactName: {
				required: true
				
			},
//                        email:{
//                            required:true,
//                            email:true
//                        },
                        phone: {
				required: true
				
			},
                        
                        Address1: {
				required: true
				
			},
                       
                        city: {
				required: true
				
			}
                        
        };
        
        var mainAddressFrmFranceRules = {
                  companyName: {
				required: true
				
			},
                        contactName: {
				required: true
				
			},
//                        email:{
//                            required:true,
//                            email:true
//                        },
                        phone: {
				required: true
				
			},
                        
                        Address1: {
				required: true
				
			},
                       
                        city: {
				required: true
				
			},
                        
                        zipCode: {
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
        
        
        
	var mainAddressForm = $('#AddressForm').validate({
            submitHandler: function(form){
                            //alert('Inside Submit Handler');
                            $.ajax({
                                    url: addressSubmitUrl,
                                    type: 'POST',
                                    data: $(form).serialize(),
                                    success: function( response ) {
                                        alert('Form submitted Succesfully!');
                                        
                                        //--- clear form ---
                                        $("#AddressForm").clearForm();
                                        //alert('submit again is successful '+ $("#actionStringHidden").val());
                                    }
                                
                            });
                            
            }
		 
	}); // end validate
        //alert("Before testing1");
        
        // Initial Validation rules when the form is first loaded
        addRules(mainAddressFrmUStatesCandaRules);
        
        //alert("after testing1");
        function readAddressTblInfo() {
            $.ajax({
                    url: readAddressTblUrl+'/'+addressID,
                    error: function(xhr,status,error){
                          alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                    },
                    type: 'GET',
                    dataType: 'json',
                    async:false,
                    success: function(response) {

                        $("#companyName").val(response.t_CompanyName);
                        $("#contactName").val(response.t_ContactNameFull);
                        $("#addressTblContactEmail").val(response.t_Email);

                        $("#title").val(response.t_ContactTitle);
                        $("#email").val(response.t_Email);

                        $("#phone").val(response.t_Phone);
                        $("#fax").val(response.t_Fax);
                        $("#mobile").val(response.t_Mobile);

                        $("#customerID").val(response.kf_OtherID);
                        
                        $("#countryNameStateTable").val(response.t_Country);
                        $("#Address1").val(response.t_Address1);
                        $("#Address2").val(response.t_Address2);
                        
                        $("#city").val(response.t_City);
                        $("#stateNameStateTable").val(response.t_StateOrProvince);
                        $("#zipCode").val(response.t_PostalCode);
                        
                        $("#notes").val(response.t_Notes);
                        
                        $("#typeSub").val("Contact");
                        
                        if(response.nb_Inactive == "1")
                        {
                            $("#inActive").prop('checked',true);
                        }

                    }

               });
    
        }
        
}); // end ready



