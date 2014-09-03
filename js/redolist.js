 var  readRedoUrl          = "orderRedo/orderredocontroller/getRedoListInfo/"+orderID;
 

$(document).ready(function(){
    //alert(orderID);
    readRedoListInfo();
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

