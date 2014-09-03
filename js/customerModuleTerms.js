var readCustomerDataUrl       = "customers/customercontroller/getCustomerDataInJsonFormat";

var readQBCustomerDataUrl     = "customers/customercontroller/getQBCustomerDataInJsonFormat";

var submitCustomerTermsDataUrl = "customers/customercontroller/submitCustomerTermsData";

$(document).ready(function(){
    //alert(donePullingQBCusTerms);
    var getPath = location.href;
    //alert(getPath);
    var pathArry = getPath.split("#");
    //alert(pathArry[1]);
    if(pathArry[1] == "sales")
    {
        //alert("sales");
        $('.form-group').not('.salesShow').hide();
        //$(".salesHide").hide();
        
        //Sales Person
       // $("#qbSalesRepRef_FullName").parent().parent().hide();
        
        //Terms
        //$("#qbTermsRef_FullName").parent().parent().hide();
        
        //Credit Limit
        //$("#qbCreditLimit").parent().parent().hide();
        
        //Run CC up Front
        //$("#customerCreditHold").parentsUntil($( "div.form-group" ), ".salesHide" )
        
        //$("#customerCreditCardHold").parent().parent().hide();
        
        // Credit Hold Type
        //$("#customerCreditHoldReason").parent().parent().hide();
        //$("#templateBtnGroup").hide();
        //$("#userAccessRow").addClass('hide');
    }
    if(donePullingQBCusTerms == "yes")
    {
        //Bring up the modal window
        $("#myModal").modal('show'); 
//        $("#myModal").modal({
//                            backdrop: false
//        });
        setTimeout(function(){
            //close the modal window
            $('#myModal').modal('hide');
            readCustomerDataFromTable();
            readQBCustomerData();
        },2000);
        
        $("#creditHoldTypeOverRideSelect").change(function() {
            
        });
        // Read Only Fields
        //-- top part of the form ----------
        $("#customerNumberID").prop("readonly",true);

        $("#customerQBCustID").prop("readonly",true);
        
        $("#qbSalesRepRef_FullName").prop("readonly",true);

        //----Bottom Part of the form ------------//
        $("#customerCreditAvailable").prop("readonly",true);

        $("#customerCreditHold").prop('readonly',true);

        $("#customerCreditCardHold").prop('readonly',true);

        $("#customerCreditHoldReason").prop('readonly',true);
   
    }
    $("#submitCustomerTermsDataFrm").validate({
             submitHandler: function(form){
                 //alert("hi+sUBMIT HADNLER:");
                 $.ajax({
                        url: submitCustomerTermsDataUrl,
                        type: 'POST',
                        dataType: 'json',
                         error: function(xhr,status,error){
                            alert("Please Contact IT (QB update Error): "+ xhr.status+"-"+error);
                        },
                        beforeSend: function( xhr ) {
                            $("#myModal .modal-dialog").css({'width':'450px'});
                            $("#myModalLabel").html("Submitting Data...");
                            $("#msgResult").html("Almost there...");
                            $("#myModal").modal('show'); 
//                                 
                        },
                        data: $("#submitCustomerTermsDataFrm").serialize(),
                        success: function( response ){
                             if(response == "done")
                             {
                                 setTimeout(function(){
                                //close the modal window
                                $('#myModal').modal('hide');
                                window.location.reload(true);
                                },2000);
                                  
                                
                             }    
                             
                         }
                    });
             }
    });
});
function readCustomerDataFromTable() {
    $.ajax({
        url: readCustomerDataUrl+'/'+customerID,
        type:"get",
        dataType: 'json',
        error: function(xhr,status,error){
                            alert("Customer Data Pull. Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function(response) {
           //alert(response.kp_CustomerID);
           $("#customerNumberIDHidden").val(response.kp_CustomerID);
           $("#customerQBCustIDHidden").val(response.t_QBCustID);
           
           $("#customerNumberID").val(response.kp_CustomerID);
           
           $("#customerQBCustID").val(response.t_QBCustID);
           
           $("#customerDownPaymentReqOver").val(response.n_DownPaymentReqOver);
           //alert("hr: "+Math.floor((response.n_PerAllowedOverCredit) * 100));
           //var percentAllowedOverCreditLimit = Math.floor((response.n_PerAllowedOverCredit) * 100)+'%';
           //alert(percentAllowedOverCreditLimit);
           //$("#customerPerAllowedOverCredit").val(percentAllowedOverCreditLimit);
           $("#customerPerAllowedOverCredit").val(response.n_PerAllowedOverCredit);
           
           $("#customerPastDueNoOrders").val(response.n_PastDueNoOrders);
           
           $("#customerCreditAvailable").val(response.n_CreditAvailable);
           //alert(response.nb_CreditHold);
           if(response.nb_CreditHold == "1")
           {
                $("#customerCreditHold").prop('checked',true);
               
           }
           
           
           //$("#customerCreditHold").val(response.nb_CreditHold);
           //$("#customerCreditCardHold").val(response.nb_CreditCardHold);
           
           $("#customerCreditHoldReason").val(response.t_CreditHoldReason);
           
           //If the Run CC Upfront is checked:
           //Then the order is on Credit Hold and the Reason is: Run Credit Card Up Front
           if(response.nb_CreditCardHold == "1")
           {
                $("#customerRunCCUpFront").prop('checked',true);
                //$("#customerCreditHold").prop('checked',true);
                //$("#customerCreditHoldReason").val("Run CC Up Front");
               
           }
           
           
           
           
        }
    })
    
}
function readQBCustomerData() {
    $.ajax({
        url: readQBCustomerDataUrl+'/'+customerID,
        type:"get",
        dataType: 'json',
        error: function(xhr,status,error){
                            alert("QB data Call. Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function(response) {
           //alert(response.kp_CustomerID);
           $("#qbSalesRepRef_FullName").val(response.SalesRepRef_FullName);
           
           $("#qbTermsRef_FullName").val(response.TermsRef_FullName);
           
           $("#qbCreditLimit").val(response.CreditLimit);
           
             
           
           
        }
    })
    
}

