var url        = location.pathname.split("/");

            var orderID = url[5];
            //aler(orderID);
            //var orderID     = "105838";
            //var orderID     = "96069"
            
            $(document).ready( function() {
                
                readUsers();
             
            });
            
     
         function readUsers() {
                $.ajax({
                    url: "orderShip/ordershipcontroller/barCode/"+orderID,
                    dataType: 'json',
                    success: function( response ) {
                        
                        for( var i in response ) {
                             response[ i ].barcodeID = "<img src=\"../../images/shipping/"+orderID+"/"+(response[ i ].barID)+".gif"+"\""+">";
                        
                        }  
                        //clear old rows
                        $( '#records tbody' ).html( '' );

                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                    }
                });
                 
            } // end readUsers


