 //var updateUrl        = "otherCharges/otherchargecontroller/updateOtherChargeTable/";
 var  readUrl          = "otherCharges/otherchargecontroller/otherChargeTable/"+orderID,
      getByIDUrl       = "otherCharges/otherchargecontroller/getOtherChargeTableData/",
      delUrl           = "otherCharges/otherchargecontroller/deleteOtherChargeTableRow/",
      updateCreateUrl  = "otherCharges/otherchargecontroller/updateCreateOtherChargeTable/";
 
 $(document).ready( function() {
     readOtherCharge();
     
     $("#addOtherCharges").on("click",function(){
         //alert("hello");

         //set the 'type of submit' variable
         $("#typeOfSubmitHidden").val("Create");

         // set the OrderID
         $("#modalOrderIDHidden").val(orderID);

         //display a modal window
         // Set the heading for the modal window
         $("#modalCustomHeadingTemplateRecords").html("Create Action");

         $("#otherChargeModalEditBtn").modal({
                    backdrop: false
         });

         return false;
         
     });
     
     
     
     $("#records").on("click","a.deleteBtn", function() {
         //alert("Delete");
         
         // Get the OrderShipID to be deleted
         var deleteOtherChargeID = $(this).parents('tr').attr("id");
         
         //alert(deleteOtherChargeID);
                    
         //Store the OrderShipID in the hidden element
         $("#deleteModalOtherChargeID").val(deleteOtherChargeID);
         
         // Set the modal Custom Heading
         //$("#modalCustomHeading").html("Delete Action");
         
         // the message to delete with the ID# :
         $(".modal-body #deleteConfirm").html("The following ID will be deleted from the System : "+deleteOtherChargeID);
         
         // show the modal form with the ID your about to delete
         $("#myModalConfirm").modal({
                    backdrop: false
         });
         
         return false;
         
     });
     $("#records").on("click","a.updateBtn", function() {
         var otherChargeHref = $(this).attr('href' );
         
         //set the 'type of submit' variable
         $("#typeOfSubmitHidden").val("Update");
         
         // set the OrderID
         $("#modalOrderIDHidden").val(orderID);
         
         //alert(otherChargeHref);
         
         // Ajax call to get the data needed to show on the Modal
         
         $.ajax({
                 url: otherChargeHref,
                 dataType: 'json',
                 success: function(response) {
                     
                     $("#modalOtherChargeID").val(response['ID']);
                     
                     $("#modalCategory").val(response['Category']);
                     
                     $("#modalDescription").val(response['Description']);
                     
                     $("#modalQty").val(response['Quantity']);
                     
                     $("#modalPrice").val(response['Price']);
                     
                 }
             
             
         });
         
         // Set the modal Custom Heading
         //$("#modalCustomHeading").html("Update Action");
         
     
         
         // show the modal form with the ID your about to delete
         $("#otherChargeModalEditBtn").modal({
                    backdrop: false
         });
         
         return false;
         
     });
     
     $("#closeUpdateOtherChargeModal").click(function(){
         
         // clear the modal form
         $("#updateCreateFrmModalOtherChargeTable").clearForm();
         
         // reset form for error removal
         updateFormModal.resetForm();
         
     });
     
     // delete the row from the OtherCharges Table.
     $("#deleteSubmitBtnOtherChargeIDModal").click(function(){
         //alert("hi");
         
         $("#deleteFrmModalOtherChargeTable").submit();
          //alert("hi2");
         
     });
     
      // Update the row from the OtherCharges Table.
     $("#validateUpdateOtherChargeModal").click(function (){
         $("#updateCreateFrmModalOtherChargeTable").valid();
         $("#updateCreateFrmModalOtherChargeTable").submit();          
     });
     
     //form Validation for update
     var updateFormModal = $("#updateCreateFrmModalOtherChargeTable").validate({
         rules: {
                    modalCategory : {
                                       required: true

                    },
                    modalDescription : {
                                       required: true

                    },
                    modalQty : {
                                       required: true
                        
                    },
                    modalPrice : {
                                       required: true

                    }
             
         },
         submitHandler: function(form){
                     //submit the form via an ajax call
                    $.ajax({
                        url: updateCreateUrl,
                        type: 'POST',
                        dataType: 'json',
                        data: $(form).serialize(),
                        success: function( response ){
                            if($("#typeOfSubmitHidden").val()== "Create")
                            {
                                for( var i in response ) 
                                {
                                    response[ i ].updateLink = getByIDUrl + '/' + response[ i ].ID;
                                    response[ i ].deleteLink = delUrl + '/' + response[ i ].ID;
                                }
                                
                                // clear the modal form
                                $("#updateCreateFrmModalOtherChargeTable").clearForm();
                            
                           
                                //alert("After hi");
                            
                                // close data Modal
                                $('.modal').modal('hide');
                                
                                //clear old rows
                                $( '#records tbody' ).html( '' );

                                //append new rows
                                $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                                
                                        
                            }
                            if($("#typeOfSubmitHidden").val()== "Update")
                            {
                                
                                // get the Specific HTML elements that you want to update
                                //var updateDetails    = $('tr#' +  $("#orderShipIDHidden").val() + ' td' )[1];
                                var updateCategory    = $('tr#'+ $("#modalOtherChargeID").val()+' td')[1];

                                var updateDescription = $('tr#'+ $("#modalOtherChargeID").val()+' td')[2];

                                var updateQty         = $('tr#'+ $("#modalOtherChargeID").val()+' td')[3];

                                var updatePrice       = $('tr#'+ $("#modalOtherChargeID").val()+' td')[4];

                                var updateTotal       = $('tr#'+ $("#modalOtherChargeID").val()+' td')[5];
                            
                                //alert(updateCategory);
                                //alert($("#modalOtherChargeID").val());

                                //alert(response['Category']);

                                //alert(response['Description']);

                                //alert(response['Quantity']);

                                //alert(response['Total']);
                            
                                // load those specific elements with the data from response 
                                $(updateCategory).html(response['Category']);

                                $(updateDescription).html(response['Description']);

                                //alert($(updateDescription).html(response['Description']));

                                $(updateQty).html(response['Quantity']);

                                $(updatePrice).html(response['Price']);

                                $(updateTotal).html(response['Total']);

                                //alert($(updateCategory).html());

                                 //alert("Before hi");



                                // clear the modal form
                                $("#updateCreateFrmModalOtherChargeTable").clearForm();


                                //alert("After hi");

                                // close data Modal
                                $('.modal').modal('hide');


                            }
                            
                            

                        }
                    });
             
             
         }
         
         
     });// end updateOtherChargeTable
     
     $("#deleteFrmModalOtherChargeTable").validate({
          submitHandler: function(form) {
              $.ajax({
                   url: delUrl+'/'+$("#deleteModalOtherChargeID").val(),
                   type: 'POST',
                   data: $(form).serialize(),
                   success: function( response ) {
                       
                       // close data Modal
                       $('.modal').modal('hide');
                       
                       //Remove the row from the table
                       $('tr#' + $("#deleteModalOtherChargeID").val()).remove();
                       
                   }
                   
                       
                  
              });
              
          }
         
         
     });// end deleteOtherChargeTable
     
     
 });
 
  function readOtherCharge() {
                $.ajax({
                    url: readUrl,
                    dataType: 'json',
                    success: function( response ) {
                        for( var i in response ) {
                            response[ i ].updateLink = getByIDUrl + response[ i ].ID;
                            response[ i ].deleteLink = delUrl  + response[ i ].ID;
                        }
                        
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                    }
                });
                 
            } // end readOtherChargesData/* 


