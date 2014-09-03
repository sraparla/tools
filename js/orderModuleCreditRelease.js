var readUrl                   = "orders/ordercontroller/getCreditReleaseFrmData/";
var submitCreditReleaseFrmUrl = "orders/ordercontroller/submitCreditReleaseFrmData";
$(document).ready(function(){
    readCreditReleaseFrmData();
    $("#orderIDHidden").val(orderID);
    
    $("#closeMyModalBtn").click(function(){
        //alert("hi");
        window.location.reload(true);
        return false;
        
    });
    $("#closeMyModalTopBtn").click(function(){
        //alert("hi");
        window.location.reload(true);
        return false;
        
    });
    
    $("#creditReleaseFrm").validate({
        rules:{
            overRideCreditHoldCheckBox:{
                required:true
            },
            creditHoldTypeOverRideSelect:{
                required:true
            },
            releasedBySelect:{
                required:true 
            }
        },
        submitHandler: function(form){
            //alert("hi");
            $.ajax({
                url: submitCreditReleaseFrmUrl,
                 type: 'POST',
                 dataType: 'json',
                 data: $("#creditReleaseFrm").serialize(),
                 success: function( response ){
                     //alert(response);
                      if(response == "done")
                      {
                          $("#myModal").modal({
                            backdrop: false
                          });
                      }
                      else
                      {
                           alert("Please Contact IT- Update Error");
                          
                      }    
                 }
                 
                
            })
             
            setTimeout(
            function(){
                $("#myModalLabel").html('Status');
            },500);
            
            setTimeout(
            function(){
                $("#message").html("<span><strong>Successfully Updated!</span></strong>");
            },500);
            
            setTimeout(
            function(){
                if($("#closeMyModalBtn").hasClass("hide"))
                {
                    $("#closeMyModalBtn").removeClass("hide");
                }
            },500); 
             
             
             
             
        }
        
    });
    $("#creditHoldTypeOverRideSelect").change(function() {
        if($(this).val() !== "")
        {
            $("#releasedBySelect").focus();
        }    
        
    });
    
    $("#releasedBySelect").change(function() {
        if($(this).val() !== "")
        {
            $("#overRideNotes").focus();
        }    
        
    });
    
});
function readCreditReleaseFrmData() {
    $.ajax({
        url: readUrl+orderID,
        type:"get",
        dataType: 'json',
        error: function(xhr,status,error){
                            alert("Please 7788ello Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function(response) {
            $("#companyNameContactName").html(orderID+" &nbsp; " +response.t_CustCompany+ " "+response.t_ContactNameFull);
            if(response.nb_CreditHoldTimeOrder == "1")
            {
                $('#creditHoldTimeOrder').prop('checked',true);
                
            }
            $("#typeOfHold").val(response.t_CreditHoldType);
            
            if(response.nb_CreditHoldOveride == "1")
            {
                $("#overRideCreditHoldCheckBox").prop('checked',true);
            }
            $("#creditHoldTypeOverRideSelect").val(response.t_CreditHoldTypeOveride);
            $("#releasedBySelect").val(response.t_CreditHoldReleasedBy);
            $("#overRideNotes").val(response.t_CreditHoldOverideNote);
        }
    })
    
}


