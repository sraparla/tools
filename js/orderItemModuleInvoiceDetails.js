var readUrl                = "orderItems/orderitemcontroller/getInvoiceDetails/",
    readOrderPriceQB       = "orderItems/orderitemcontroller/getOrderItemInvoiceFromOrderTable/",
    readGrandTotalValue    = "orderItems/orderitemcontroller/calculateGrandTotal/";
   
    
//var orderItemTotal         = 0;

$(document).ready( function() {
   
    readOrderItemInvoiceDetail();
    
    orderPricingQBInfo();
    
    grandTotal();
    //alert("iuu"+ $("#grandTotal").val());
  
    
    
   
   
    
    
  

   
           
    
});

 function grandTotal(){
      //alert("hi");
        $.ajax({
            url: readGrandTotalValue+orderID,
            dataType: 'json',
            success: function( response ) {
                $("#orderItemTotalText").text("$"+response['orderItemTotal'].toFixed(2));
                //alert(response['otherChargeTotal']);
                $("#otherChargeTotalText").text("$"+response['otherChargeTotal'].toFixed(2));
                $("#shippingTotalText").text("$"+response['orderShipTrackingTotal'].toFixed(2));
                $("#grandTotalText").text("$"+response['grandTotal'].toFixed(2));
                $("#grandTotal").val(response['otherChargeTotal']);
                //alert("iuu2"+ $("#grandTotal").val());
                
                //alert(response['otherChargeTotal']);
                //$("#shippingTotalText").text("$"+response['orderShipTrackingTotal'].toFixed(2));
                //$("#grandTotalText").text("$"+response['grandTotal'].toFixed(2));
                //alert(response['orderItemTotal']);
                
            }
         
        });
     
 }
     //alert("Grand Total"+$("#otherChargeTotal").val()); 
    //alert($("#orderItemTotal").val()+$("#otherChargeTotal").val()+$("#shippingTotal").val());
    //alert("grandtOTAL"+$("#grandTotal").val());     

 function orderPricingQBInfo(){
        $.ajax({
            url: readOrderPriceQB+orderID,
            dataType: 'json',
            success: function( response ) {
                //alert(response);
                //alert(response['useTotalOrderPricing'] );
                if(response['incompletePricing'] == 1)
                {
                    $("#incompletePricing").attr('checked',true);
                    $("#incompletePricingWarning").removeClass("hide");

                }
                if(response['useTotalOrderPricing'] != 1)
                {
                    //alert(response['useTotalOrderPricing']);
                    $("#totalOrderPrice").hide();

                }
                if(response['useTotalOrderPricing'] == 1)
                {
                    $("#useTotalOrderPricing").attr('checked',true);

                }
                if(response['totalOrderPrice'] !== "")
                {
                    $("#totalOrderPrice").val(response['totalOrderPrice']);

                }
                if(response['postedToQuickbooks'] == 1)
                {
                    $("#postedToQuickbooks").attr('checked',true);

                }



            }
                    
                    
        });
    
};

   function readOrderItemInvoiceDetail() {
       //var checked = "something";
        $.ajax({
            url: readUrl+orderID,
            dataType: 'json',
            success: function( response ) {
                for( var i in response ) 
                {
                    if(response[ i ].doNotInvoice == 1)
                    {
                        response[ i ].doNotInvoiceChecked = "checked='checked'";
                            
                    }
                    else
                    {
                        response[ i ].doNotInvoiceChecked = "";
                        
                    }    
                    //alert(response[ i ].doNotInvoice);
                    
                   
                           
                            
                }
                //alert(response);
                //alert(response.length);
//                        for(var i=0;i<response.length;i++)
//                        {
//                            //alert(response[ i ].total)
//                            orderItemTotal = orderItemTotal + parseFloat(response[ i ].total);
//                                
//                        }
//                        
//                        $("#orderItemTotal").val(orderItemTotal.toFixed(2));
//                        
//                        $("#orderItemTotalText").text("$"+orderItemTotal.toFixed(2));


                //alert("2: "+orderItemTotal);
//                        for( var i in response ) {
//                             alert(response[ i ].total);
//                           
//                        }

//                        for(var i =0;i<=response.length;i++)
//                        {
//                            
//                                
//                        }
                //clear old rows
                $( '#records tbody' ).html( '' );

                //append new rows
                $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );

                }


        });
                 
} // end readOrderItemData/* 








