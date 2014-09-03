var readOrderNotesUrl                   = "orders/ordercontroller/getOrderNotesData";
var submitOrderNotesFrmUrl              = "orders/ordercontroller/submitOrderNotesData";

$(document).ready(function(){
    //alert(typeOfView);
    if(typeOfView == "customerOrderView")
    {
        if($("#customerNotesDiv").hasClass("hide"))
        {
            $("#customerNotesDiv").removeClass("hide");
            
        }
        if($("#orderNotesDiv").hasClass("hide"))
        {
            $("#orderNotesDiv").removeClass("hide")
        }    
    } 
    else if(typeOfView == "customerView")
    {
        //alert(typeOfView+" 1");
        if($("#customerNotesDiv").hasClass("hide"))
        {
            //alert(typeOfView+" 2");
            $("#customerNotesDiv").removeClass("hide");
            
        }
        if(!$("#orderNotesDiv").hasClass("hide"))
        {
            //alert(typeOfView+" 3");
            $("#orderNotesDiv").addClass("hide");
           
        }    
    } 
    else if(typeOfView == "orderView")
    {
        if(!$("#customerNotesDiv").hasClass("hide"))
        {
            $("#customerNotesDiv").addClass("hide");
            
        }
        if($("#orderNotesDiv").hasClass("hide"))
        {
            $("#orderNotesDiv").removeClass("hide")
        }    
    } 
    $('#customerNotesSummerNote').summernote({
         height: 160,
         toolbar: [
//          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          //['table', ['table']],
          //['insert', ['link', 'picture']],
          //['fullscreen', ['fullscreen']],
          //['help', ['help']]
        ],
        onkeyup: function(e) {
            //alert('Key is onkeyup');
            if($("#submitOrderNotesFrm").hasClass("hide"))
            {
                $("#submitOrderNotesFrm").removeClass("hide");

            } 
        },
        onfocus: function(e) {
            //alert('Key is onkeyup');
            if($("#submitOrderNotesFrm").hasClass("hide"))
            {
                $("#submitOrderNotesFrm").removeClass("hide");

            } 
        }
        
    });
    $('#orderNotesSummerNote').summernote({
         //focus:true,
         height: 160,
         toolbar: [
//          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          //['table', ['table']],
          //['insert', ['link', 'picture']],
          //['fullscreen', ['fullscreen']],
          //['help', ['help']]
        ],
        onkeyup: function(e) {
            //alert('Key is onkeyup');
            if($("#submitOrderNotesFrm").hasClass("hide"))
            {
                $("#submitOrderNotesFrm").removeClass("hide");

            } 
        },
        onfocus: function(e) {
            //alert('Key is onkeyup');
            if($("#submitOrderNotesFrm").hasClass("hide"))
            {
                $("#submitOrderNotesFrm").removeClass("hide");

            } 
        }
        
    });
    orderNotesFrmData();
    $("#submitOrderNotesFrm").click(function(){
        //alert("hi");
        //var content = $('textarea[name="content"]').val($('#orderNotes').code());
        var orderNotesObj    = $("#orderNotesSummerNote").code();
        
        $("#orderNotesHiddenVal").val(orderNotesObj);
        
        var customerNotesObj = $("#customerNotesSummerNote").code();
        
        $("#customerNotesHiddenVal").val(customerNotesObj);
        
        $("#orderNotesFrm").submit();
        
        return false;
        
    });
    $("#orderNotesFrm").validate({
        submitHandler: function(form){
            $.ajax({
                url: submitOrderNotesFrmUrl,
                type: 'POST',
                //dataType: 'json',
                data: $("#orderNotesFrm").serialize(),
                success: function( response ){
                    window.location.reload(true);
//                        $("#myModal").modal({
//                                backdrop: false
//                        });
                        //window.location.reload(true);
                        //setTimeout(function(){window.location.reload(true);},200);
                }
                
            });
            
            
        }
    });
    
});
//function that populates the order Notes form
function orderNotesFrmData(){
    
    $.ajax({
        url: readOrderNotesUrl+'/'+notesOrderID,
        type:"get",
        dataType: 'json',
        error: function(xhr,status,error){
           alert("Please hi Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function( response ) {
            //alert(response.t_Notes);
            $('#orderNotesSummerNote').code(response.t_NotesHTML);
            
            $("#notesCustomerIDHidden").val(response.notesCustomerID);
            
            $("#customerNotesSummerNote").code(response.customerNotes);
            //$('#orderNotesSummerNote').code(response.t_Notes);
        }
        
    });
    
};
 


