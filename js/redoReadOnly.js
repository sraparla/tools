var readUrl                   = "orderRedo/orderredocontroller/getRedoFrmData";

var readImages                = "orderRedo/orderredocontroller/getRedoImages";

var  readRedoUrl          = "orderRedo/orderredocontroller/getRedoListInfo/"+orderID;

$(document).ready(function(){
    
    $("#orderRedoIDHidden").val(orderRedoID);
    $("#orderIDHidden").val(orderID);
  
    
    readRedoListInfo();
    
    readRedoFrmData();
    displayImages();
    
     $("#redoRequestPage").on("click",function(){
          //alert("hi");  
          //window.location = "orderRedo/orderredocontroller/loadRedoRequestInfo/"+orderID;
         
           window.open("redorequest/"+orderID,'_blank');
          //window.location.href  = "redorequest/"+orderID;
          
          //window.location.reload(true);
          return false;
    });
    $("#records").on("click",".statusBtn", function() {
        //alert("hi");
        var orderRedoID = $(this).parents('tr').attr("id");
        
        window.open("redo"+'/'+orderRedoID,'_blank');
        
        //window.location.href = "redo"+'/'+orderRedoID;
        
        return false;
    });

    
    
   

});

//function that populates the redo form
function readRedoFrmData(){
    $.ajax({
        url: readUrl+'/'+orderRedoID,
        type:"get",
        dataType: 'json',
        error: function(xhr,status,error){
           alert("Please hi Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function( response ) {
             $("#redoStatus").val(response.t_Status);
             
             $("#orderUrgency").val(response.t_OrderUrgency);
             $("#shippingUrgency").val(response.t_ShippingUrgency);
             
             if(response.t_Status == "Approved")
             {
                  //get todays date and time and show the value
                  if($("#approvedControlGroup").hasClass("hide"))
                  {
                      $("#approvedControlGroup").removeClass("hide"); 
                  }
                  
                  $("#approvedBy").val(response.t_ApprovedBy);   
                  
                  var dateTimeApproved   = response.ts_DateApproved.split(" ");
                  var dateApproved       = dateTimeApproved[0].split("-");
                  var dateApprovedFormat = dateApproved[1]+"/"+dateApproved[2]+"/"+dateApproved[0];
                  
                  $("#dateTimeApproved").val(dateApprovedFormat+" "+dateTimeApproved[1]);
                  
                 
                  
                  if($("#orderIDRedoControlGroup").hasClass("hide"))
                  {
                      $("#orderIDRedoControlGroup").removeClass("hide");
                      
                  }
                  
                  $("#orderIDRedo").val(response.kf_OrderIDRedo);
                  
                 
             }
             $("#requestedBy").val(response.t_RequestedBy);
             
             var departmentArry = response.t_Department.split(",");
             
             
             $("#itemsRedo").val(response.t_ItemsRedo);
            
             var orderItemIDArry = response.orderItemID.split(",");
             
             
             
             if(response.t_ItemsRedo == "Partial")
             {
                 
                 $("#selectedPartial").val(response.dashNum);
                   
                 if($("#displayPartial").hasClass("hide"))
                 {
                     $("#displayPartial").removeClass("hide");
                 }    
             }    
             $(".redoDepartmentChange").each(function(){
                 //alert("this: "+  $(this).val());
                 for(var i=0;i<departmentArry.length;i++)
                 {
                     if(departmentArry[i].toLowerCase() == $(this).val().toLowerCase())
                     {
                         //alert("for loop: "+  $(this).val());
                         $(this).prop('checked',true);
                     }
                 }
             });
             
             $("#customerConcern").html(response.t_CustomerIssue);
             $("#saleConcern").html(response.t_SalesViewIssue);
             
             $("#dateTimeWhenRequested").val(response.ts_DateRequested);
            
            
             $('#researchedProblem').html(response.t_ResearchedProblem);
             
             //var resObj =$("#researchedProblem").code();
             //alert(resObj.length);
             
             $('#solutionProvided').html(response.t_Solution);
             
             $('#namePrepress').val(response.t_NamePrepress);
             $('#press').val(response.t_NamePress);
             $('#inspection').val(response.t_NameInspection);

        }
    });
    
};// end of populating the redo form

function todayDateTime(){
 //--------START------getting the todays Date ----------START-----------//
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var output  = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '')+ day +'/'+d.getFullYear() ;
        var time    = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        var output_time = output+" "+ time;
        return output_time;
        //$("#mydate").val(output);
        
         //------END---------getting the todays Date ---------END-----------//
}
function readRedoListInfo() {
                $.ajax({
                    url: readRedoUrl,
                    dataType: 'json',
                    success: function( response ) {
//                        for( var i in response ) {
//                            //response[ i ].updateLink = getByIDUrl + response[ i ].ID;
//                            response[ i ].deleteLink = delUrl  + response[ i ].ID;
//                        }
                        
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render(response).appendTo( "#records tbody" );
                    }
                });
                 
} // end readRedoListInfo/* 
function displayImages(){
    //get the image by ajax call
         $.ajax({
              url: readImages+'/'+orderRedoID+'/'+originalOrderID,
                dataType: 'json',
                error: function(xhr,status,error){
                            alert("Please 7788ello Contact IT (Error): "+ xhr.status+"-"+error);
                },
                 success: function(response) {
                   //alert(response.length); 
                   var li = "";
                   if(response.length >=1)
                   {
                        for(var i=0;i<response.length;i++)
                        {
                            //alert(response[i]['imageUrl']);
                            li +='<li><a href="'+response[i]['imagehref']+'"><img style="max-width: 280px; max-height: 350px; line-height: 350px;" src="'+response[i]['imageUrl']+'" alt="Image 01" /></a></li>';
                           
                            //arrayEmployeeName[i] =''+response[i]['imageUrl']+'';          
                        }
                        
                   }
                   $("#GalleryImages").html(li);
                   
                }
             
         });
}


