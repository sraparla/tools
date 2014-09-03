 var customerTableInfoUrl         = "customers/customercontroller/getCustomerIDCompanyQBCityQBStateDataTableInfo";
 var customerContactTableInfoUrl  = "addresses/addresscontroller/getCustomerContactInfo";
 var customerContactTableInfo     = "";
 
 var submitOrderRequestFrmUrl     = "orders/ordercontroller/submitInternalOrderRequestFrm";
 var customerTableInfo            = "";
$(document).ready(function(){
    $("#internalSalesOrderFrm").validate({
        rules:{
            companyName:{
                required:true
                
            },
            contactName:{
                required:true
            },
            jobName:{
                required:true
                
            },
            artLocation:{
                required:true
            },
            customerPurChaseOrderNumber:{
                required:true
            },
            serviceLevel:{
                required:true
                
            },
            jobDueDate:{
                required:true
            },
            onPressDate:{
                required:true
            },
            orderPricingInput:{
                required:function() {
                         if($("#totalOrderPricingCheckBox").is(':checked'))
                         {
                             return true;
                         }
                         else
                         {
                             return false;
                             
                         }    
                     }  
            }
        },
        submitHandler: function(form){
             $.ajax({
                 url: submitOrderRequestFrmUrl,
                 type: 'POST',
                 dataType: 'json',
                 error: function(xhr,status,error){
                       alert("Please Contact IT (order Tbl Insert Error): "+ xhr.status+"-"+error);
                 },
                 beforeSend: function( xhr ) {
                 $("#myModal .modal-dialog").css({'width':'400px'});
                 $("#myModalLabel").html("Submitting Data...");
                 $("#msgResult").html("Almost there...");
                 $("#myModal").modal('show'); 
//                                 
                 },
                 data: $("#internalSalesOrderFrm").serialize(),
                 success: function( response ){
                     if(!isNaN(response))
                     {
                         //update went good!
                         setTimeout(function(){
                         //close the modal window
                         $('#myModal').modal('hide');
                         //--- clear form ---
                         $("#internalSalesOrderFrm").clearForm();
                         window.location.reload(true);
                         },1500);
                         
                     }    
                     
                 }
             });
        }
        
    });
    $("#totalOrderPricingCheckBox").click(function(){
        //alert("hi");
        if($(this).is(':checked'))
        {
            if($("#orderPricingInputSpan").hasClass("hide"))
            {
                $("#orderPricingInputSpan").removeClass("hide");
                
            }    
            //$("#orderPricingInput").removeClass("hide");
            $("#orderPricingInput").focus();
                
        }
        else
        {
            if(!$("#orderPricingInputSpan").hasClass("hide"))
            {
                $("#orderPricingInputSpan").addClass("hide");
                
            } 
            //$("#orderPricingInput").addClass("hide");
            
        }    
        
    });
    var now = new Date();
		    
    var today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    $("#showDateReceived").html(today);
    
    
    customerTableInfo = $('#customerInfoDataTable').dataTable({
       "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
         
          "iDisplayLength": 10,
          "aoColumns": [
                         {"bVisible":    false},
                         null,
                         null,
                         null
           ],
          "bAutoWidth": false,
          "oTableTools":{
              "aButtons":[],
              "sRowSelect": "single"
              
          },
          //,"iDisplayLength": -1
          "aaSorting": [[3, "asc"],[2, "asc"]],// Sort by first column descending
          "sAjaxSource": customerTableInfoUrl
          //"sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateCustomerID+'/'+templateOrderID
    });
    dataTableCustomSearch("customer");
//    $('.dataTables_filter input')
//          .unbind('keypress keyup')
//          .bind('keypress keyup', function(e){
//          if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;
//
//          var mysearchString =$(this).val().replace(/\s+/g, "|");
//
//          
//          if($("#customerContactTableSelect").hasClass("hide"))
//          {
//              alert("cust "+mysearchString);
//              customerTableInfo.fnFilter(mysearchString,null,true,false);
//              
//          }
//          else
//          {
//              alert("add "+mysearchString);
//              //customerContactTableInfo.fnFilter(mysearchString,null,true,false);
//              
//          }    
//          
//
//    });
    
   
     
    $('#customerInfoDataTable').css('cursor', 'pointer');
    
    //form label pointers
    $('#customerNameLabel').css('cursor', 'pointer');
    $('#contactNameLabel').css('cursor', 'pointer');
    
    $("#customerNameLabel").click(function(event){
       //alert("Customer"+event);
        
       //hide form div
       if(!$("#orderRequestDiv").hasClass("hide"))
       {
           $("#orderRequestDiv").addClass("hide");
                
       }
       
       // Hide the CONTACT table
       if(!$("#customerContactTableSelect").hasClass("hide"))
       {
           $("#customerContactTableSelect").addClass("hide");
                
       }
       
       // show customer table
       if($("#customerTableSelect").hasClass("hide"))
       {
            $("#customerTableSelect").removeClass("hide");
            dataTableCustomSearch("customer");
       }
       event.stopPropagation();
    });
    
    $("#contactNameLabel").click(function(event){
        //alert(event);
        //hide form div
        if(!$("#orderRequestDiv").hasClass("hide"))
        {
            $("#orderRequestDiv").addClass("hide");
                
        }
        // hide CUSTOMER table
        if(!$("#customerTableSelect").hasClass("hide"))
        {
            $("#customerTableSelect").addClass("hide");
        }
        
        // show the CONTACT table
        if($("#customerContactTableSelect").hasClass("hide"))
        {
            $("#customerContactTableSelect").removeClass("hide");  
            dataTableCustomSearch("address");
        }
        event.stopPropagation();
        
    });
    $('#customerInfoDataTable').on('click', 'tbody tr', function() { //why do we have to use live switched to .on and doesn't work?
        var aData = customerTableInfo.fnGetData(this);
        //alert('aData[0]'); // assuming the id is in the first column
        
        $("#msgResult").html("Getting Contacts.. ");
        $("#myModal .modal-dialog").css("width","300");
        
        $('#myModal').modal('show');
        var kp_CustomerID = aData[0];
        var t_CustCompany = aData[1];
        var t_QBCity = aData[2];
        var t_QBState = aData[3];
        
        $('#customerIDHidden').val(kp_CustomerID);
        $('#custCompanyHidden').val(t_CustCompany);
        $('#qbCityHidden').val(t_QBCity);
        $('#qbStateHidden').val(t_QBState);
        
        setTimeout(function(){
            //close the modal window
            $('#myModal').modal('hide');
            if(!$("#customerTableSelect").hasClass("hide"))
            {
                $("#customerTableSelect").addClass("hide");
            }    
            if($("#customerContactTableSelect").hasClass("hide"))
            {
                $("#customerContactTableSelect").removeClass("hide");
                
            }  
            displayCustomerContactTable(kp_CustomerID);
            dataTableCustomSearch("address");
            
        },1000);
    });
    $('#customerContactInfoDataTable').on('click', 'tbody tr', function() {
         //alert("hi");
         var aData = customerContactTableInfo.fnGetData(this);
         //alert(aData);
         var addressID          = aData[0];
         var addressContactName = aData[1];
         
        $('#addressIDHidden').val(addressID);
        
        $('#addressContactNameHidden').val(addressContactName);
        
        //now load the form with the Data
        $('#companyName').val($("#custCompanyHidden").val());
        $('#contactName').val(addressContactName);
        
        // Hide the CUSTOMER table
        if(!$("#customerTableSelect").hasClass("hide"))
        {
            $("#customerTableSelect").addClass("hide");
        }
        
        // Hide the CONTACT table
        if(!$("#customerContactTableSelect").hasClass("hide"))
        {
            $("#customerContactTableSelect").addClass("hide");
                
        }
        
         // show the FORM
        if($("#orderRequestDiv").hasClass("hide"))
        {
            $("#orderRequestDiv").removeClass("hide");
                
        } 
        
         
    });
//     if(!$("#orderRequestDiv").hasClass("hide"))
//     {
//          $("#orderRequestDiv").addClass("hide");
//         
//     }    
    
    //alert("hi");
    //readCustomerInfo();
//    var timeout;
//    var companyInfoTypeahead =  $('#companyName').typeahead(
//        {
//             source: function(value) {
//                if (timeout) {
//                    clearTimeout(timeout);
//                }
//                timeout = setTimeout(function() {
//                    alert(value);
//                }, 500);
//             }
//        }
//    );
//     var ms = $('#ms').magicSuggest({
//          //sortOrder: 'entrepriseNom',
//          //displayField: 'entrepriseNom',
//          //valueField: 'id', // no need as it's the default value
//          //maxEntryRenderer: 1, // this should be a function
//         // allowFreeEntries: false,
//          //selectionPosition: 'inner', // default
//          //hideTrigger: true,
//          //width: 206,
//          name:'customerCompanyName',
//          maxSelection: 1,
//          typeDelay:500,
//
//          displayField: 'companyName',
//          minChars:3,
//          //maxDropHeight:350,
//          //maxSuggestions:10,
//          data: 'customers/customercontroller/getCustomerIDCompanyQBCityQBStateInJsonFormat',
//          //highlight: false,
//          dataUrlParams: {
//            init: true
//            //cols: [2,1]
//          },
//          renderer: function(v){
//          return '<div>'+
//            '<div style="padding-left: 5px;">' +
//                '<div style="padding-top: 5px;font-style:bold;">' + v.companyCityStateInfo + '</div>' +
//            '</div>' +
//            '</div><div style="clear:both;"></div>';
//        }
//    });
//     $(ms).on('selectionchange', function(event, combo, selection){
//            alert(selection[0]['customerID']);
//            var customerID = selection[0]['customerID'];
//            
//            //alert(selection.data['customerID']);
//   });
//   $(ms).on("click","ms-sel-ctn-0",function() {
//       alert("hi");
//       //$(this).empty();
//   });

//    $(ms).on('selectionchange', function(event, combo, selection){
//            for(var strName in selection)
//            {
//                var strValue = selection[strName] ;
//                 alert("name : " + strName + " : value : " + strValue) ;
//                for(var strN in strValue)
//                {
//                    var strV = selection[strN] ;
//                     alert("name : " + strN + " : value : " + strV) ;
//                    
//                }    
//               
//            }
//            //alert(selection.data['customerID']);
//   });
//    $(ms).on('load', function(){
//        if(this._dataSet === undefined)
//        {
//            // we get here the first time the combo has loaded and gone through
//            // the first if case in tag-autocomplete-service.php: the combo has been
//            // populated with the default values only.
//            this._dataSet = true;
//            ms.setValue([2,1]);
//            ms.setDataUrlParams({});
//        }
//    });
    
//    var companyInfoTypeahead =  $('#companyName').typeahead(
//        {
//            name: 'customerInfo',
//            
//            //remote: 'customerInfo.json?tokens=%QUERY'
//            //prefetch: '../images/customerJsonData/customerInfo.json',
//            ttl:0,
//            limit: 10,
//            remote: 'customers/customercontroller/getCustomerIDCompanyQBCityQBStateInJsonFormat',
//            rateLimitWait:5000000
//            //remote: 'customers/customercontroller/getCustomerIDCompanyQBCityQBStateInJsonFormat?customerInfo=%QUERY'                                        
//            //limit: 10                           
//            //local: ["Alabama","Alaska","West Virginia","Wisconsin","Wyoming"]
//        }
//    );
    //$('companyName').typeahead('destroy');
//    companyInfoTypeahead.on('typeahead:selected',function(evt,data){
//        alert("hi"+data.customerID);
//        //alert("hi"+$('#companyName').val());
//        //alert(ev);
//        
//    });
    $('#proofDueDate').datepicker({
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
        //hide:true
    });
    
    // calls date picker when selected
//    $('#proofDue').datepicker().on('changeDate', function(ev){
//        //calendarWeeks: true;
//        $('#proofDue').data('date');
//        $('#proofDue').datepicker('hide');
//        //format: 'mm-dd-yyyy'
//    });
    
    $('#jobDueDate').datepicker({
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });
    
    // calls date picker when selected
//    $('#jobDueDate').datepicker().on('changeDate', function(ev){
//        //calendarWeeks: true;
//        $('#proofDue').data('date');
//        $('#proofDue').datepicker('hide');
//        //format: 'mm-dd-yyyy'
//    });
    
    $('#onPressDate').datepicker({
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });
    
    
    
    // calls date picker when selected
//    $('#onPressDate').datepicker().on('changeDate', function(ev){
//        //calendarWeeks: true;
//        $('#proofDue').data('date');
//        $('#proofDue').datepicker('hide');
//        //format: 'mm-dd-yyyy'
//    });
       //var x=0;
       //$("#myModal").modal('show');
       
//       setTimeout(function(){
//            //close the modal window
//            $('#myModal').modal('hide');
//            
//            //$('#companyName').typeahead('destroy','NoCached');
//            localStorage.clear();
//            //window.location.reload(true);
//            //readCustomerDataFromTable();
//            //readQBCustomerData();
//        },2000);
    
});

 function displayCustomerContactTable(customerID){
        $('#customerContactInfoDataTable').dataTable().fnDestroy();
       
             customerContactTableInfo = $('#customerContactInfoDataTable').dataTable({
                                    "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
         
                                    "iDisplayLength": 10,
                                    "aoColumns": [
                                                   {"bVisible":    false},
                                                   null,
                                                   null,
                                                   null
                                     ],
                                    "bAutoWidth": false,
                                    "oTableTools":{
                                        "aButtons":[],
                                         "sRowSelect": "single"

                                    },
                                    //,"iDisplayLength": -1
                                    "aaSorting": [[3, "asc"],[2, "asc"]],// Sort by first column descending
                                    "sAjaxSource": customerContactTableInfoUrl+'/'+customerID
                                    });
          $('#customerContactInfoDataTable').css('cursor', 'pointer');
         
//          $('.dataTables_filter input')
//          .unbind('keypress keyup')
//          .bind('keypress keyup', function(e){
//            if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;
//
//            var mysearchString =$(this).val().replace(/\s+/g, "|");
//
//            alert("add "+mysearchString);
//            customerContactTableInfo.fnFilter(mysearchString,null,true,false);
//
//          });
          
       
};
function dataTableCustomSearch(typeOfView)
{
          $('.dataTables_filter input')
          .unbind('keypress keyup')
          .bind('keypress keyup', function(e){
                if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;

                var mysearchString =$(this).val().replace(/\s+/g, "|");
                if(typeOfView == "customer")
                {
                  //alert("cust "+mysearchString);
                  customerTableInfo.fnFilter(mysearchString,null,true,false);

                }
                else if(typeOfView == "address")
                {
                    //alert("add "+mysearchString);
                    customerContactTableInfo.fnFilter(mysearchString,null,true,false);
                }
          });
}
function readCustomerInfo() {
//          var customerTableInfo = $('#customerInfoDataTable').dataTable({
//       "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
//         
//          "iDisplayLength": 10,
//          "aoColumns": [
//                         {"bVisible":    false},
//                         null,
//                         null,
//                         null
//           ],
//          "bAutoWidth": false,
//          "oTableTools":{
//              "aButtons":[],
//               "sRowSelect": "single"
//              
//          },
//          //,"iDisplayLength": -1
//          "aaSorting": [[3, "asc"],[2, "asc"]],// Sort by first column descending
//          "sAjaxSource": customerTableInfoUrl
//          //"sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateCustomerID+'/'+templateOrderID
//     });
                 
} // end readCustomerInfo/* 
