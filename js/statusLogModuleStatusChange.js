var readUrl                  = "statusLog/statuslogcontroller/getDisplayOrderItemFields/",
    readCurrentStatus        = "statusLog/statuslogcontroller/getJobStatus/";
    readNewStatus            = "statusLog/statuslogcontroller/getNewStatusNameFromStatusesTable/",
    readUserName             = "statusLog/statuslogcontroller/getEmployeeUserNameFromEmployeeTable",
    submitUrl                = "statusLog/statuslogcontroller/submitStatusChange",
    statusChangeConfirmedUrl = "statusLog/statuslogcontroller/statusChangeConfirmed";

$(document).ready( function() {
    //alert(statusChangeRequest);
    $("#statusChangeRequestHidden").val(statusChangeRequest);
   
    readJobStatus();
    
    readNewJobStaus();
 
    readEmployeeUserName();
    //alert(statusChangeRequest);
    
    $("#cancelStatusChangeBtn").click(function(){
        //alert("hi");
        // clear the OrderShipTrackingForm form
        $('.modal').modal('hide');
        $("#statusChangeForm").clearForm();
        
        readJobStatus();
        
        readNewJobStaus();
        
        readEmployeeUserName();
        //mainForm.resetForm();
      
        return false;
    });
    
    $("#confirmStatusModalBtn").on("click",function (){
         //alert("hi2");
          $.ajax({
              url: "statusLog/statuslogcontroller/statusChangeConfirmed",
              type: 'POST',
              //dataType: 'json',
              data: $("#confirmFrmModal").serialize(),
              success: function( response ) {
                   $('.modal').modal('hide');
                   $("#statusChangeForm").clearForm();
                   $("#statusChangeForm").addClass("hide");
                   $( '#ajaxLoadAni' ).fadeOut( 'slow' );
                   $("#message").html(response);
                   $("#sucess").removeClass("hide");
                   //alert(response);
               
                }
              });
       
         //alert("hi3");
    });
    //form Validation for Status Change Form
    $("#statusChangeForm").validate({
         rules: {
                    newStatus : {
                                       required: true

                    },
                    userName : {
                                       required: true

                    }
             
         },
         submitHandler: function(form){
                    //alert("hi"); 
                     //submit the form via an ajax call
                    $.ajax({
                        url: submitUrl,
                        type: 'POST',
                        //dataType: 'json',
                        data: $(form).serialize(),
                        success: function(response){
                               if(response == "CONFIRM")
                               {
                                   //---- store the modal hidden values ------//.
                                   $("#orderIDHiddenModal").val($("#orderIDHidden").val());
                                   $("#newStatusHiddenModal").val($("#newStatus").val());
                                   $("#userNameHiddenModal").val($("#userName").val());
                                   $("#notesHiddenModal").val($("#notes").val());
                                   
                                   $("#customMessageWarning").html("This order contains orders Items with different status.If you click o.k. all Status will be set to: <em>"+  $("#newStatus").val()+"</em>");
                                   
                                    // show the modal form with the Confirm Message
                                    $("#statusChangeConfirmModal").modal({
                                                backdrop: false
                                     });
                               }
                               else
                               {
                                   $("#statusChangeForm").clearForm();
                               
                                    $("#statusChangeForm").addClass("hide");
                                    $( '#ajaxLoadAni' ).fadeOut( 'slow' );
                                    $("#message").html(response);
                    
                                    $("#sucess").removeClass("hide");
                                   
                               } 
                        }
                    });
             
             
         }
         
         
     });// end updateOtherChargeTable
  
   
 
    
});
function readJobStatus(){
                $.ajax({
                    url: readCurrentStatus+changeID+'/'+$("#statusChangeRequestHidden").val(),
                    dataType: 'json',
                    success: function( response ) {
                        if($("#statusChangeRequestHidden").val() == "orderChange")
                        {
                            $("#applyStatusToAll").addClass("hide");
                            $("#currentStatus").val(response['t_JobStatus']);
                            $("#statuschangeIDHeading").html("<h4>ID:"+" "+response['kp_OrderID']+"</h4>");
                            $("#orderIDHidden").val(response['kp_OrderID']);
                                
                        }
                        if($("#statusChangeRequestHidden").val() == "orderItemChange")
                        {
                            $("#currentStatus").val(response['orderItemJobStatus']);
                            $("#statuschangeIDHeading").html("<h4>ID:"+" "+response['kf_OrderID']+"-"+response['n_DashNum']+"</h4>");
                            
                            $("#orderIDHidden").val(response['kf_OrderID']);
                            
                            $("#orderItemIDHidden").val(response['kp_OrderItemID']);
                            
                           
                                
                        }
                    }
                });
    
};
function readNewJobStaus() {
       //var checked = "something";
        $.ajax({
            url: readNewStatus,
            dataType: 'json',
            success: function( response ) {
                    //alert("test1: "+response.length);
                    var sel = $("#newStatus");
                    sel.empty();
                    //alert("test2: "+response.length);
                    for (var i=0; i<response.length; i++)
                    {
                        if(response[i].t_StatusName == "Please Select")
                        {
                            sel.append('<option value="'+'">' + response[i].t_StatusName + '</option>');
                            
                        }
                        else
                        {
                            sel.append('<option value="'+response[i].t_StatusName+'">' + response[i].t_StatusName + '</option>');
                            
                        }    
                        

                    }

                }


        });
                 
} // end readNewJobStaus/* 

function readEmployeeUserName() {
            $.ajax({
                    url: readUserName,
                    //dataType: 'json',
                    success: function( response ) {
                        
                        //alert("objs1");
                        //alert(JSON.parse(response));
                        var json = JSON.parse(response);
                        //alert(json.length);
                        var arrayEmployeeName = [];
                        for(var i=0;i<json.length;i++)
                        {
                            //arrayEmployeeName[i] ='\''+json[i]['t_UserName']+'\'';
                            arrayEmployeeName[i] =''+json[i]['t_UserName']+'';
                            
                                
                        }
//                        alert(arrayEmployeeName);
//                        alert(arrayEmployeeName.length);
//                        var numberString = "";
//                        for(var i=0;i<arrayEmployeeName.length;i++)
//                        {
//                            numberString += arrayEmployeeName[i]+ " ";
//                                
//                        }
//                        alert(numberString);
                        $('#userName').typeahead({
                            source: arrayEmployeeName,
                            items: 4
                            
                        });
                        
                       
                    }


            });
                 
} // end readEmployeeUserName/* 



