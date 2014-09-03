var readConvertedImageFiles                = "orderItems/orderitemcontroller/checkAndConvertImageFiles";

$(document).ready( function() {
    alert("hii");
    readCheckConvertedImageFiles();
     alert("hii");
   
    
});
function readCheckConvertedImageFiles() {
       $.ajax({
            url: readConvertedImageFiles+'/'+year,
            dataType: 'json',
            success: function( response ) {
                    alert("test1: "+response.length);
                    
                    var sel = $("#ResizeThumbNailprepressBar");
                    if($("#ResizeThumbNailprepressBar").hasClass("hide"))
                    {
                        $("#ResizeThumbNailprepressBar").removeClass("hide")
                        
                    }    
                    //alert("test2: "+response.length);
                    for (var i=0; i<response.length; i++)
                    {
                        alert(response[i].orderID);
                    }

                }


        });
                 
} // end readNewJobStaus/*