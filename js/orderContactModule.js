 var  readUrl          = "orderContacts/ordercontactcontroller/orderContactTable/"+orderID,
      delUrl           = "orderContacts/ordercontactcontroller/deleteOrderContactTableRow/",
      createUrl        = "orderContacts/ordercontactcontroller/createOrderContactRow/"
      getContactName   = "orderContacts/ordercontactcontroller/getContactNameFullFromAddressesTable/"+orderID;
      
 $(document).ready( function() {
     readOrderContact();
     
     $("#addOrderContact").on("click",function(){
         //alert("hello");

         $.ajax({
               type:"GET",
               url: getContactName,
               success: function(html) {
               //Fill the second selection with the returned mysql data
               $("#modalContactNameFull").html(html);
               //$("#countryStateTable").val(ShipperID);
               }
         });
         
         // No need to set this value as we are only creating. No update is required.
         //$("#typeOfSubmitHidden").val("Create");
         
         // set the OrderID
         $("#modalOrderIDHidden").val(orderID);

         //display a modal window
         // Set the heading for the modal window
         $("#modalCustomHeadingTemplateRecords").html("Create Action");

         $("#orderContactModalEditBtn").modal({
                    backdrop: false
         });

         return false;
         
     });
     
     $("#records").on("click","a.deleteBtn", function() {
         // Get the OrderContactID to be deleted
         var deleteOrderContactID = $(this).parents('tr').attr("id");
         //alert(deleteOrderContactID) ;
         var contactName          = $(this).parents('tr').find('td:eq(0)').html();
         //alert(contactName) ;  
          
          
         //Store the OrderContactID in the hidden element
         $("#deleteModalOrderContactID").val(deleteOrderContactID);
         
         // Set the modal Custom Heading
         //$("#modalCustomHeading").html("Delete Action");
         
         // the message to delete with the ID# :
         $(".modal-body #deleteConfirm").html("You are removing"+"<strong> "+ contactName+ " </strong> as a contact from this order");
         
         // show the modal form with the ID your about to delete
         $("#myModalConfirm").modal({
                    backdrop: false
         });
         
         return false;
         
     });
     
     // delete the row from the Order Contact Table.
     $("#deleteSubmitBtnOrderContactIDModal").click(function(){
         
         $("#deleteFrmModalOrderContactTable").submit();
         //alert("hi2"); 
     });
     
     $("#closeCreateOrderContactModal").click(function(){
         
         // clear the modal form
         $("#createFrmModalOrderContactTable").clearForm();
         
         // reset form for error removal
         createFormModal.resetForm();
         
     });
     
     // Update the row from the OtherCharges Table.
     $("#validateCreateOrderContactModal").click(function (){
         $("#createFrmModalOrderContactTable").valid();
         $("#createFrmModalOrderContactTable").submit();          
     });
     
     //form Validation for update
     var createFormModal = $("#createFrmModalOrderContactTable").validate({
         rules: {
                    modalContactNameFull : {
                                       required: true

                    }
             
         },
         submitHandler: function(form){
                     //submit the form via an ajax call
                    $.ajax({
                        url: createUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: $(form).serialize(),
                        success: function( response ){
                                for( var i in response ) 
                                {
    //                              response[ i ].updateLink = getByIDUrl + '/' + response[ i ].ID;
                                    response[ i ].deleteLink = delUrl + '/' + response[ i ].ID;
                                }

                                // clear the modal form
                                $("#createFrmModalOrderContactTable").clearForm();


                                // close data Modal
                                $('.modal').modal('hide');

                                //clear old rows
                                $( '#records tbody' ).html( '' );

                                //append new rows
                                $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );

                        }
                    });
             
             
         }
         
         
     });// end updateOtherChargeTable
   
     
     
     $("#deleteFrmModalOrderContactTable").validate({
          submitHandler: function(form) {
              $.ajax({
                   url: delUrl+'/'+$("#deleteModalOrderContactID").val(),
                   type: 'POST',
                   data: $(form).serialize(),
                   success: function( response ) {
                       
                       // close data Modal
                       $('.modal').modal('hide');
                       
                       //Remove the row from the table
                       $('tr#' + $("#deleteModalOrderContactID").val()).remove();
                       
                   }
              });
              
          }
     });// end deleteOtherChargeTable
 });
 
 function readOrderContact() {
                $.ajax({
                    url: readUrl,
                    dataType: 'json',
                    success: function( response ) {
                        for( var i in response ) {
                            //response[ i ].updateLink = getByIDUrl + response[ i ].ID;
                            response[ i ].deleteLink = delUrl  + response[ i ].ID;
                        }
                        
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                    }
                });
                 
            } // end readOrderContact/* 


