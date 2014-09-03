 var  readUrl          = "statusLog/statuslogcontroller/statuslogTable/"+orderID;
 
$(document).ready( function() {
    readStatusLog();
});

function readStatusLog() {
                $.ajax({
                    url: readUrl,
                    dataType: 'json',
                    success: function( response ) {
                        
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                    }
                });
                 
            } // end readStatusLog/* 


