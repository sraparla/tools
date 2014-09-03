var assigntemplateOrderIDUrl  = "orderItems/orderitemcontroller/assignTemplateInfoToOrderID";
var readOrderItemUrl          = "orderItems/orderitemcontroller/getOrderItemsFromOrderIDInJsonFormat";
var currentTabName            = "";
var referenceGuideRowData     = "";

var delOrderItemUrl           = "orderItems/orderitemcontroller/deleteOrderItemOrderItemComponents";
//var repeat = 0;
$(document).ready( function() {
   // $('#customerNameLabel').css('cursor', 'pointer');
   // $('#customerNameLabel').css('cursor', 'pointer');
    //$('#customerNameLabel').css('cursor', 'pointer');
     //$('#customerTemplateDataTable').dataTable().fnDestroy();
    
     $("#customerTemplateDataTable").css('cursor', 'pointer');
//     var referenceGuideTemplate = $('#referenceGuideTemplateDataTable').dataTable({
//       "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
//          "iDisplayLength": 10,
//          "aoColumns": [
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         //null,
//                         //null,
//                         {"bVisible":    false},
//                         {"bVisible":    false},
//                         {"bVisible":    false},
//                         null
//           ],
//          "bAutoWidth": false,
//          "oTableTools":{
//              "aButtons":[]
//              
//          },
//          //,"iDisplayLength": -1
//          "aaSorting": [[6, "asc"],[7, "asc"]],// Sort by first column descending
//          "sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateOrderID+'/'+"guide"
//          //"sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+"2877"+'/'+templateOrderID
//     });
     $("#referenceGuideTemplateDataTable").css('cursor', 'pointer');
//      var oTable = $('#test').dataTable( {
//                    "bPaginate": true,
//                "bLengthChange": true,
//                "bFilter": true,
//                "bSort": true,
//                "bInfo": true,
//                    "bAutoWidth": true } );
       
//     $("#resetSearch").on('change keyup',function() {
//         alert("hi");
//         
////        if(requestCalled == "read" || requestCalled == "template")
////        {
////            $("#submitTypeOIUpSideFrm").show();
////        } 
//    });
      if($("#readOrderLineItems").hasClass("active"))
      {
           //alert("start");
            readLineItems();
            if($("#orderItemPresent").val() != "noLineItems")
            {
                //alert("hi inside" + templateOrderID);
                if($("#orderLineItemViewDataTable").hasClass("hide"))
                {
                    $("#orderLineItemViewDataTable").removeClass("hide")
                }
                if(!$("#noOrderLineItemViewDiv").hasClass("hide"))
                {
                    $("#noOrderLineItemViewDiv").addClass("hide")   
                } 
                $('#orderLineItemViewDataTable').dataTable().fnDestroy();
                var orderDetailTable = $('#orderLineItemViewDataTable').dataTable({
                                          "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
                                           "iDisplayLength": 10,
                                           "aoColumns": [
                                           null,
                                           null,
                                           null,
                                           null,
                                           null,
                                           null,
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {"bVisible":    false},
                                           {sWidth: '2%'}
                                           ],
                                           //"bAutoWidth": false,
                                           "oTableTools":{
                                              "aButtons":[]

                                            },
                                            //"iDisplayLength": -1,
                                            "aaSorting": [[ 7, "asc" ]], // Sort by first column descending
                                            "sAjaxSource": "orderItems/orderitemcontroller/getOrderItemRowsByOrderIDResultObject/"+templateOrderID
                });
                  
                   
           }
           else
           {
               if(!$("#orderLineItemViewDataTable").hasClass("hide"))
               {
                   $("#orderLineItemViewDataTable").addClass("hide")
               }
               if($("#noOrderLineItemViewDiv").hasClass("hide"))
               {
                   $("#noOrderLineItemViewDiv").removeClass("hide")
                       
               }    
           }    
               
           $('.dataTables_filter input')
                .unbind('keypress keyup')
                .bind('keypress keyup', function(e){
                if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;

                var mysearchString =$(this).val().replace(/\s+/g, "|");

                //alert("c "+mysearchString);
                orderDetailTable.fnFilter(mysearchString,null,true,false);




           });
          
      }    
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          //e.preventDefault();
           //alert("hi");
           //alert('currentt tab ' + e.target); // Active Tab
           
           //var getPath = e.target;
           //alert($(e.target).attr('href').substr(1));
           currentTabName = $(e.target).attr('href').substr(1);
          
           if(currentTabName == "customerTemplate")
           {
               //alert("hi");
               $('#customerTemplateDataTable').dataTable().fnDestroy();
               var customerTemplateTableInfo = $('#customerTemplateDataTable').dataTable({
               "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
         
                    "iDisplayLength": 10,
                    "aoColumns": [
                                   null,
                                   null,
                                   null,
                                   null,
                                   null,
                                   null,
                                   {"bVisible":    false},
                                   {"bVisible":    false},
                                   {"bVisible":    false},
                                   null
                     ],
                    "bAutoWidth": false,
                    "oTableTools":{
                        "aButtons":[]

                    },
                    //,"iDisplayLength": -1
                    "aaSorting": [[6, "asc"],[7, "asc"]],// Sort by first column descending
                    "sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateOrderID
                    //"sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateCustomerID+'/'+templateOrderID
               });
               
               $('.dataTables_filter input')
                .unbind('keypress keyup')
                .bind('keypress keyup', function(e){
                if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;

                 var mysearchString =$(this).val().replace(/\s+/g, "|");

                 //alert("cus "+mysearchString);
                 customerTemplateTableInfo.fnFilter(mysearchString,null,true,false);




                });
                
                
               
           }
           if(currentTabName == "referenceGuideTemplate")
           {
              
               $('#referenceGuideTemplateDataTable').dataTable().fnDestroy();
               
               referenceGuideTemplate = $('#referenceGuideTemplateDataTable').dataTable({
                                             "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
                                             "iDisplayLength": 10,
                                             "aoColumns": [
                                               null,
                                               null,
                                               null,
                                               null,
                                               null,
                                               null,
                                               //null,
                                               //null,
                                               {"bVisible":    false},
                                               {"bVisible":    false},
                                               {"bVisible":    false},
                                               null
                                             ],
                                             "bAutoWidth": false,
                                             "oTableTools":{
                                                "aButtons":[]

                                             },
                                             //,"iDisplayLength": -1
                                             "aaSorting": [[6, "asc"],[7, "asc"]],// Sort by first column descending
                                             "sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateOrderID+'/'+"guide"
                                             //"sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+"2877"+'/'+templateOrderID
               });
               
               $('.dataTables_filter input').unbind('keypress keyup').bind('keypress keyup', function(e){
                    if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;

                    var mysearchString =$(this).val().replace(/\s+/g, "|");

                     //alert("ref "+mysearchString);
                    referenceGuideTemplate.fnFilter(mysearchString,null,true,false);

               });
               //alert("repeat value on click "+repeat);
               
               
               
               
           }
           if(currentTabName == "readOrderLineItems")
           {
               //alert("hi" + templateOrderID);
               //check if there are any orderItems before loading the DataTable
               readLineItems();
               if($("#orderItemPresent").val() != "noLineItems")
               {
                   //alert("hi inside" + templateOrderID);
                   if($("#orderLineItemViewDataTable").hasClass("hide"))
                   {
                       $("#orderLineItemViewDataTable").removeClass("hide")
                       
                   }
                   if(!$("#noOrderLineItemViewDiv").hasClass("hide"))
                   {
                       $("#noOrderLineItemViewDiv").addClass("hide")
                       
                   } 
                   $('#orderLineItemViewDataTable').dataTable().fnDestroy();
                   var orderDetailTable = $('#orderLineItemViewDataTable').dataTable({
                                      "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
                                       "iDisplayLength": 10,
                                       "aoColumns": [
                                       null,
                                       null,
                                       null,
                                       null,
                                       null,
                                       null,
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {"bVisible":    false},
                                       {sWidth: '2%'}
                                       ],
                                       //"bAutoWidth": false,
                                       "oTableTools":{
                                          "aButtons":[]

                                        },
                                        //"iDisplayLength": -1,
                                        "aaSorting": [[ 7, "asc" ]], // Sort by first column descending
                                        "sAjaxSource": "orderItems/orderitemcontroller/getOrderItemRowsByOrderIDResultObject/"+templateOrderID
                                        });
                  
                   
               }
               else
               {
                   if(!$("#orderLineItemViewDataTable").hasClass("hide"))
                   {
                       $("#orderLineItemViewDataTable").addClass("hide")
                       
                   }
                   if($("#noOrderLineItemViewDiv").hasClass("hide"))
                   {
                       $("#noOrderLineItemViewDiv").removeClass("hide")
                       
                   }    
               }    
               
               
           }    
           
           //var value1 = value.toString.split('#');
           //alert(value1[0]);
            //alert(value1[1]);
            //e.preventDefault();
           //alert('previous tab ' + e.relatedTarget); // Previous Tab
      }) ; 
      $("#templateRefreshBtn").click(function(){
          //alert("clicked");
//          alert("testing class "+$('a[href="#referenceGuideTemplate"]').parent().hasClass("active"));
//          $('#customTemplateTabs li').removeClass("active");
//          $('#customTemplateTabs a[href="#referenceGuideTemplate"]').tab('show');
//          
//          //alert("testing class "+$('#customTemplateTabs li').find('a[href="#referenceGuideTemplate"]').hasClass("active"));
//          $('a[href="#referenceGuideTemplate"]').parent().addClass("active");
          //alert(currentTabName+" 1");
          if(currentTabName == "" || currentTabName == null)
          {
              //alert(currentTabName+" 2");
              currentTabName = "readOrderLineItems";
              
          }
          //alert(currentTabName+" 2");
          var selectedTabName = currentTabName;
          if(selectedTabName == "customerTemplate")
          {
              $('#customTemplateTabs li').removeClass("active");
              $('#customTemplateTabs a[href="#customerTemplate"]').tab('show');
              
          }
          else if(selectedTabName == "referenceGuideTemplate")
          {
              $('#customTemplateTabs li').removeClass("active");
              //alert("repeat value in reload "+repeat);
              $('#customTemplateTabs a[href="#referenceGuideTemplate"]').tab('show');
          }
          else if(selectedTabName == "readOrderLineItems")
          {
              $('#customTemplateTabs li').removeClass("active");
              $('#customTemplateTabs a[href="#readOrderLineItems"]').tab('show');
              
          }    
          return false;
      });
      $('#orderLineItemViewDataTable').on("click",'#deleteLineItem',function(){
            //alert("hi");
            //alert($(this).attr("href"));
            var deleteOrderItemID = $(this).attr("href");
            $.ajax({
                  url: delOrderItemUrl+'/'+deleteOrderItemID,
                   error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                   },
                   type: 'POST',
                   success: function( response ) {
                       //Remove the row from the table
                       //alert(response);
                       $("#templateRefreshBtn").trigger("click");
                       //$('tr#' + deleteOrderItemComponentID).remove();
                       //$(this).closest('tr').remove();
                       
                   }
            });
            //delete the orderItem and OrderItemComponents
            
            
            return false;
      });
      
      $('#customerTemplateDataTable').on('click','tbody tr',function(){
         //alert("hi");
         var customerTemplateRowData = customerTemplateTableInfo.fnGetData(this);
         
         var orderItemID             = customerTemplateRowData[8];
         
         //alert(orderItemID);
         
         
         $.ajax({
                url: assigntemplateOrderIDUrl+'/'+templateOrderID+'/'+orderItemID+'/'+"cust",
                //dataType: "json",
                error: function(xhr,status,error){
                   alert("Please Contact IT (Template Creation Error): "+ xhr.status+"-"+error);
                },
                async: false,
                success: function( response ) {
                     window.open ('orderItemUpSideFrm/read/'+response,'_blank');
  
                          
                 }
         });
         
         
      });
      
      $('#referenceGuideTemplateDataTable').on('click','tbody tr',function(){
            //repeat++;
            //alert("hi repeat"+ repeat);
            referenceGuideRowData = referenceGuideTemplate.fnGetData(this);
            
            //alert("hi:" + referenceGuideRowData);
            //alert("hi:" + referenceGuideRowData[0]);
            //alert("h1:"+ referenceGuideRowData[1])
            var orderItemID           = referenceGuideRowData[8];

            $.ajax({
                  url: assigntemplateOrderIDUrl+'/'+templateOrderID+'/'+orderItemID+'/'+"guide",
                  //dataType: "json",
                  error: function(xhr,status,error){
                     alert("Please Contact IT (Template Creation Error): "+ xhr.status+"-"+error);
                  },
                  async: false,
                  success: function( response ) {
                       window.open ('orderItemUpSideFrm/read/'+response,'_blank');
                   }
            });
      });
      
      $( "#customerTemplateDataTable" ).on( "click","a.editBtn",  function() {
          var customerTemplateInfo = $(this).attr('href' );
          //alert(customerTemplateInfo);
          window.open (customerTemplateInfo,'_blank');
          return false;
          
      });
      $( "#referenceGuideTemplateDataTable" ).on( "click","a.editBtn",  function() {
          var referenceGuideTemplate = $(this).attr('href' );
          //alert(customerTemplateInfo);
          window.open (referenceGuideTemplate,'_blank');
          return false;
          
      });
//      $('#customerTemplateDataTable tbody tr').live('click',function(){
//         alert("hi");
//         alert(customerTemplateTableInfo.fnGetData(this));
//      });
//$('#myTab a').click(function (e) {
//  e.preventDefault()
//  $(this).tab('show')
//});
//$('#myTab a:first').tab('show') // Select first tab
//$('#myTab a:last').tab('show') // Select last tab
//      $('.tabs').click(function(e) {
//        e.preventDefault();
//        alert('tab clicked!');
//      });
//      $('.dataTables_filter input')
//            .unbind('keypress keyup')
//            .bind('keypress keyup', function(e){
//            alert($(this).dataTable());
//            if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;
//           
//            var mysearchString =$(this).val().replace(/\s+/g, "|");
//           
//            //alert("ui "+mysearchString);
//            customerTemplateTableInfo.fnFilter(mysearchString,null,true,false);
//
//           
//
//
//      });
     

});
function readLineItems(){
    $.ajax({
             url: readOrderItemUrl+'/'+templateOrderID,
             type: 'POST',
             dataType: 'json',
             error: function(xhr,status,error){
                       alert("Please Contact IT (read order Data  ajax Error): "+ xhr.status+"-"+error);
             },
             async:false,
             success: function(response){
                 //alert(response.errorMsg)
                 //alert(response.errorMsg);
                 $("#orderItemPresent").val(response.errorMsg);
                     
             }
   });
}




