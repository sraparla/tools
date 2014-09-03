var readSportJobMFGDataURl = "vsportjobsmfg/vsportjobsmfgcontroller/getVsportJobsMFGData";
$(document).ready(function() {
    //readSportJobMFGData();
    
});
function readSportJobMFGData(){
    $.ajax({
        url: readSportJobMFGDataURl,
        dataType: 'json',
        success: function( response ) {
            //alert(response);
//            for( var i in response ) {
//                //alert(response[i].indyID); 
//            }
//            //clear old rows
//            $('#sportJobsMFGSummary tbody' ).html( '' );
//            alert(response.length);
//            //append new rows
//            for(var i=0;i<response.length;i++)
//            {
//                //alert(response[i]['Indy ID']);
//                "<tr><td>"+response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']
//                           response[i]['Indy ID']+"</td>".appendTo("#sportJobsMFGSummary tbody" );
//                
//                //.appendTo("#sportJobsMFGSummary tbody" )
//            
//            }    
//            $( '#readSportJobMFGTemplate' ).render(response).appendTo("#sportJobsMFGSummary tbody" );
            
        }
    });
    
};


