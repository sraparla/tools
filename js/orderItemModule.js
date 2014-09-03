var readUrl        = "orderItems/orderitemcontroller/getDisplayOrderItemFields/",
    submitUrl      = "orderItems/orderitemcontroller/submitOrderItemDuplicateForm",
    readDashNumUrl = "orderItems/orderitemcontroller/getorderItemDashNumber/";

$(document).ready( function() {
    //new addition 
    $("#typeOfRequestCalledHidden").val(typeOfRequestCalled);
    //alert("hiooo  "+$("#typeOfRequestCalledHidden").val());
    
    
    //read the Total Dash Num and assign to a hidden field
    readDashNum();
    
    
    // get the orderitem Form to duplicate
    readOrderItem();
    
    
    
    var validateNonSportsGraphicCustomer = {
        orderItemDescription: {
                                    required: true
                               }
    };
    
    var validateSportsGraphicCustomer = {
        orderItemDescription: {
                                    required: true
                               },
        orderItemSportItemNumber: {
                                    required: true
                               }
    };
    
    function addRules(rulesObj)
    {
            for (var item in rulesObj)
            { 
                $('#'+item).rules('add',rulesObj[item]);
            }
    }

    function removeRules(rulesObj)
    {
            for (var item in rulesObj)
            {
                $('#'+item).rules('remove');  
            }
    }
    
    $("#submitOrderItemDuplicateForm").live('click',function (){
        if($("#orderItemCustomerID").val() == "1467")
        {
            // add validation rules
            removeRules(validateNonSportsGraphicCustomer);
            addRules(validateSportsGraphicCustomer);
            //$("#orderItemDuplicateForm").valid();
            //$("#orderItemDuplicateForm").submit();
            
            //Validate the form
            submitForm.valid();
            
            //Submit the form
            submitForm.submit();
            
                
        }
        else
        {
             // add validation rules
             removeRules(validateSportsGraphicCustomer);
             addRules(validateNonSportsGraphicCustomer);
             
             //Validate the form
             submitForm.valid();
             
             //Submit the form
             submitForm.submit();
            
                
        }
        
    });
    
    
    
    var submitForm = $("#orderItemDuplicateForm").validate({
        submitHandler: function( form ) {
            $( '#ajaxLoadAni' ).fadeIn( 'slow' );
            // $('.bar').css('width', '50%');
            $.ajax({
                 url: submitUrl,
                 type: 'POST',
                 data: $(form).serialize(),
                 success: function( response ) {
                     // clear the Duplicate form
                     $("#orderItemDuplicateForm").clearForm();
                     
                     $("#mainDuplicate").addClass("hide");
                     
                     
                     //alert(response);
                     $( '#ajaxLoadAni' ).fadeOut( 'slow' );
                     //$("#message").html(response);
                     //$('.bar').css('width', '100%');
                     //alert($("#typeOfRequestCalledHidden").val());
                     if($("#typeOfRequestCalledHidden").val() == "read")
                     {
                         //alert("hi");
                         location.href = "orderItemUpSideFrm/read/"+response;
                     }
                     else if($("#typeOfRequestCalledHidden").val() == "template")
                     {
                         //alert("hi");
                         location.href = "orderItemUpSideFrm/template/"+response+'#dup';
                     }
                     else
                     {
                         $("#sucess").removeClass("hide");
                         
                     }    
                    
                     
                     
                     
                     //alert(response);
                     
                     
                     
                     //alert(response);
                     
                     
                     
                 }
                 
             });
            
        }
        
    });
    
    
    
    
});
function readDashNum(){
                $.ajax({
                    url: readDashNumUrl+orderItemID,
                    dataType: 'json',
                    success: function( response ) {
                        //alert(response['dashNum']);
                        var totalDashNum = parseFloat(response['dashNum']) + 1;
                        //alert(totalDashNum);
                        
                        $("#orderItemTotalDashNum").val(totalDashNum);
                        
                        //alert("dashnum: "+$("#orderItemtotalDashNum").val());
                        
                    }
                    
                    
                });
    
};
function readOrderItem() {
    //alert("hi2");
                $.ajax({
                    url: readUrl+orderItemID,
                    dataType: 'json',
                    success: function( response ) {
                        //alert("hi3");
                        
                        
                        $("#orderItemID").val(response['kp_OrderItemID']);
                        $("#orderItemCustomerID").val(response['kf_CustomerID']);
                        
                        
                        $("#orderItemDescription").val(response['t_Description']);
                        
                        $("#orderItemStructure").val(response['t_Structure']);
                        
                        
                        $("#orderItemQuantity").val(response['n_Quantity']);
                        
                        $("#orderItemHeight").val(response['n_HeightInInches']);
                        
                        $("#orderItemWidth").val(response['n_WidthInInches']);
                        
                        $("#orderItemPrice").val(response['n_Price']);
                        
                        
                        
                        
                        
                        //$("customerSpecific").attr();
                        
                        //-------Sport Graphic Specific Variable ----------//
                        if(response['kf_CustomerID'] == "1467")
                        {
                            //alert("inside");
                            // Show Sport Graphic Job,Item and Location Number
                            $("#customerSpecific").removeClass("hide");
                            
                            //hide the structure Input
                            $("#orderItemStructureID").addClass("hide");
                            
                            //set the SportJobNumber
                            $("#orderItemSportJobNumber").val(response['t_SportJobNumber']);
                        
                            //set the SportItemNumber
                            $("#orderItemSportItemNumber").val(response['t_SportItemNumber']);
                            
                             //set the SportLocationNumber
                            $("#orderItemSportLocationNumber").val(response['t_SportLocationNumber']);
                            
                            //set the Structure value
                            $("#orderItemStructure").val(response['t_SportItemNumber']+" "+response['t_SportLocationNumber']);
                            
                            
                                
                        }
                        
                    }
                });
                 
            } // end readOrderItemData/* 


