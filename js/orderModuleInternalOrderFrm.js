 var customerTableInfoUrl         = "customers/customercontroller/getCustomerIDCompanyQBCityQBStateDataTableInfo";
 var customerContactTableInfoUrl  = "addresses/addresscontroller/getCustomerContactInfo";
 var readAddressTblUrl            = "addresses/addresscontroller/getAddressesDataFromAddressIDInJsonFormat"
 var customerContactTableInfo     = "";
 
 var submitOrderRequestFrmUrl     = "orders/ordercontroller/submitInternalOrderRequestFrm";
 var getArtLocationUrl            = "customers/customercontroller/getCustomerDataInJsonFormat";
 
 var getOrderRequestInfoUrl       = "orders/ordercontroller/readInternalOrderFrmView";
 
 var submitCustArtDefaultDirUrl   = "customers/customercontroller/setupDefaultArtDirectory";
 
 var addContactInfoUrl            = "orderShip/ordershipcontroller/orderShipAddressForm/Contact";
 
 var readAddressFrmUrl            = "addresses/addresscontroller/readAddressFrmData";
 
$(document).ready(function(){
    $('#onPressDate').datepicker({
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });
    $("#contactTblRefreshBtn").click(function(){
        //alert($("#customerIDHidden").val());
        displayCustomerContactTable($("#customerIDHidden").val());
        return false;
        
    });
    
    if(($('#newOrderIDHidden').val()))
    {
        //alert($('#newOrderIDHidden').val());
        //alert("Read functionality of Order "+$('#newOrderIDHidden').val());
        // Hide Customer table
        $("#customerTableSelect").toggleClass("hide");
        
       // Hide Contact table (its already hidden)
       //$("#customerContactTableSelect").toggleClass("hide");
        
       
       // show orderRequest Frm
       $("#orderRequestDiv").toggleClass("hide");
       
       readOrderRequestInfo();
        
        
    }    
//    $("#wizard-8").steps({
//                headerTag: "h3",
//                bodyTag: "section",
//                transitionEffect: "fade"
//    });
//   $("#createNewSalesOrder").submitValidateOrderRequestFrm(function(){
//            alert("createNewSalesOrder");
//            if($("#internalSalesOrderFrm").valid())
//            {
//                alert("valid ok");
//                if( $("#internalSalesOrderFrm").submit())
//                {
//                    alert("submit went ok");
//                    return "true";
//                }    
//                return "false";
//            }
//            else
//            {
//                //event.stopPropagation();
//                return "false";
//            }    
//           
//            
//            //return "done";
//    });
    var now = new Date();
		    
    var today = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    
    $("#createNewSalesOrder").on("click", function(event){
            //alert("createNewSalesOrder");
            if($("#internalSalesOrderFrm").valid())
            {
                //alert("valid ok");
                if( $("#internalSalesOrderFrm").submit())
                {
                    //alert("submit went ok");
                    //alert("submit went ok: "+ $("#newOrderIDHidden").val());
                    return $("#newOrderIDHidden").val();
                    //return "true";
                }    
                return "false";
            }
            else
            {
                //event.stopPropagation();
                return "false";
            }    
           
            
            //return "done";
    });
    
   
    
    $("#internalSalesOrderFrm").validate({
        rules:{
            companyName:{
                required:true
                
            },
            contactName:{
                required:true
            },
            orderType:{
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
            //alert("submitHandler");
             $.ajax({
                 url: submitOrderRequestFrmUrl,
                 type: 'POST',
                 //dataType: 'json',
                 error: function(xhr,status,error){
                       alert("Please Contact IT (order Tbl Insert Error): "+ xhr.status+"-"+error);
                 },
                 async: false,
//                 beforeSend: function( xhr ) {
//                 $("#myModal .modal-dialog").css({'width':'400px'});
//                 $("#myModalLabel").html("Submitting Data...");
//                 $("#msgResult").html("Almost there...");
//                 $("#myModal").modal('show'); 
////                                 
//                 },
                 data: $("#internalSalesOrderFrm").serialize(),
                 success: function( response ){
                     if(response == "updateDone")
                     {
                         
                     }
                     else
                     {
                         //alert("New OrderID: "+$("#newOrderIDHidden").val());
                         $("#newOrderIDHidden").val(response);
                         //alert("response from ajax : "+response);
                         
                     }    
                     
                     //$("#internalSalesOrderFrm").clearForm();
                     //alert("hi");
//                     if(!isNaN(response))
//                     {
//                         //update went good!
//                         setTimeout(function(){
//                         //close the modal window
//                         $('#myModal').modal('hide');
//                         //--- clear form ---
//                         $("#internalSalesOrderFrm").clearForm();
//                         //window.location.reload(true);
//                         },500);
//                         
//                     }    
                     
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
   
    $("#showDateReceived").html(today);
    
    $("#addContactBtn").click(function(){
        //alert("hi");
        window.open (addContactInfoUrl+"/null/"+$('#customerIDHidden').val(),'_blank');
        return false;
        
    });
   
    $('#customerContactInfoDataTable').on("click",'.editBtn',function(){
        var addressID = $(this).attr("href");
        //alert("hi1"+ addressID+" "+ readAddressTblUrl);
        
        window.open (readAddressFrmUrl+'/'+addressID,'_blank');
       
        
        
        //$(".modal-header .modal-title").text("Change Contact Info");
        //alert($(".modal-header .modal-title h3").text());
        //alert("hi2"+ addressID);
//        $.ajax({
//             url: readAddressTblUrl+'/'+addressID,
//             error: function(xhr,status,error){
//                   alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//             },
//             type: 'POST',
//             dataType: 'json',
//             async:false,
//             success: function(response) {
//                 //alert(response);
//                 //alert(response.t_ContactNameFull);
//                 if(!$("#setUpArtLocationDiv").hasClass("hide"))
//                 {
//                     $("#setUpArtLocationDiv").addClass("hide");
//                 }
//                 
//                 // remove hide class if any
//                 if($("#addressTblContactNameDiv").hasClass("hide"))
//                 {
//                    $("#addressTblContactNameDiv").removeClass("hide");
//                 }
//                 if($("#addressTblContactTitleDiv").hasClass("hide"))
//                 {
//                    $("#addressTblContactTitleDiv").removeClass("hide");
//                 }
//                 if($("#addressTblContactEmailDiv").hasClass("hide"))
//                 {
//                    $("#addressTblContactEmailDiv").removeClass("hide");
//                 }
//                 $("#addressTblContactName").val(response.t_ContactNameFull);
//                 $("#addressTblContactTitle").val(response.t_ContactTitle);
//                 $("#addressTblContactEmail").val(response.t_Email);
//                 
//                 $("#dymanicModalAddressIDHidden").val(addressID);
//                 $("#dymanicModalAddressOtherIDHidden").val(response.kf_OtherID);
//                 
//                 $("#myModal").modal('show'); 
//                 //$('body').removeClass("modal-open");
//                 //alert("hi");
//                       
//             }
//            
//        });
        return false;
    });
    $("#salesOrderRequestDynamicModalFrm").validate({
        rules:{
            setUpartLocation:{
                required:true
                
            }
        },
        submitHandler: function(form){
            //alert("first time");
            $.ajax({
                 url: submitCustArtDefaultDirUrl,
                 type: 'POST',
                 error: function(xhr,status,error){
                       alert("Please Contact IT (order Tbl Insert Error): "+ xhr.status+"-"+error);
                 },
                 async: false,
                 data: $("#salesOrderRequestDynamicModalFrm").serialize(),
                 success: function(response){
                     $("#myModal").modal('hide'); 
                     //alert($("#dymanicModalAddressIDHidden").val());
                     //displayCustomerContactTable($("#dymanicModalAddressOtherIDHidden").val());
                     //alert("secp: "+$("#dymanicModalAddressIDHidden").val());
                     
                 }
           });
        }
        
    });
    var customerTableInfo = $('#customerInfoDataTable').dataTable({
       "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
         
          "iDisplayLength": 10,
          "aoColumns": [
                         {"bVisible":    false},
                         null,
                         null,
                         null,
                         {"bVisible":    false}
           ],
          "bAutoWidth": false,
          "oTableTools":{
              "aButtons":[],
              "sRowSelect": "single"
              
          },
          //,"iDisplayLength": -1
          "aaSorting": [[1, "asc"],[3, "asc"],[2, "asc"]],// Sort by first column descending
          "sAjaxSource": customerTableInfoUrl
          //"sAjaxSource": "orderItems/orderitemcontroller/getCustomerTemplateList/"+templateCustomerID+'/'+templateOrderID
    });
    $('div.dataTables_filter input[type=text]').focus(); 
    $('#customerInfoDataTable').css('cursor', 'pointer');
    
    //form label pointers
    $('#customerNameLabel').css('cursor', 'pointer');
    $('#contactNameLabel').css('cursor', 'pointer');
    
    $('#artLocationLabel').css('cursor', 'pointer');
    
    $('#customerPurChaseOrderNumberLabel').css('cursor', 'pointer');
    
    $("#customerPurChaseOrderNumberLabel").click(function(event){
           //alert("hi");
           $("#customerPurChaseOrderNumber").val($("#jobName").val());
           event.stopPropagation();
    });
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
            //alert("hi");
            //alert("Company Name: "+$("#companyName").val());
            $("#custCompanyHidden").val($("#companyName").val());
            //alert($("#customerIDHidden").val());
            if($("#customerIDHidden").val() !== "" && $("#customerIDHidden").val() !== null)
            {
                //alert("hi inside");
                $("#customerContactTableSelect").removeClass("hide");
                displayCustomerContactTable($("#customerIDHidden").val());
            }   
        }
        event.stopPropagation();
        
    });
    $("#saveArtLocationBtn").click(function(event){
        //alert("hi dymanicModalTypeOfSubmitHidden");
        $("#salesOrderRequestDynamicModalFrm").valid();
        
        //set the typeOfSubmit hidden value
        if($("#setUpArtLocationDiv").hasClass("hide"))
        {
            $("#dymanicModalTypeOfSubmitHidden").val("1");
        }    
       
        
        $("#salesOrderRequestDynamicModalFrm").submit();
        return false;
        
    });
    $("#artLocationLabel").click(function(event){
         //var result = $("#createNewSalesOrder").triggerHandler("click");
         //alert(result);
//         for(var i=0;i<result.length;i++)
//         {
//             alert(result[i]);
//         }    
//         alert("RESULT : "+result['value']);
//         for(var strName in result)
//         {
//             var strValue = result[strName] ;
//             alert("name : " + strName + " : value : " + strValue) ;
////             for(var strN in strValue)
////             {
////                 var strV = result[strN] ;
////                 alert("name : " + strN + " : value : " + strV) ;
////
////             }    
//
//         }
         $("#dymanicModalAddressOtherIDHidden").val($('#customerIDHidden').val());
         $(".modal-header .modal-title").text("Default Customer Art Location ");
         $.ajax({
             url: getArtLocationUrl+'/'+$('#customerIDHidden').val(),
                 type: 'POST',
                 dataType: 'json',
                 error: function(xhr,status,error){
                       alert("Please Contact IT (ArtLocation ajax Error): "+ xhr.status+"-"+error);
                 },
                 async:false,
                 success: function( response ){
                     //alert(response.t_DirectoryName);
                     if(response.t_DirectoryName == "" || response.t_DirectoryName == null)
                     {
                         //$("#myModalLabel").text("Set up Art Location");
                         //$("#setUpArtLocationDiv").toggleClass("hide");
                         //$("#message").toggleClass("hide");
                         $("#setUpartLocation").attr("autofocus","autofocus");
                         
                         if($("#setUpArtLocationDiv").hasClass("hide"))
                         {
                             $("#setUpArtLocationDiv").removeClass("hide");
                         }
                         $("#myModal").modal('show'); 
                         //alert("Art Location not set.");
                     }
                     else
                     {
                         $("#artLocation").val(response.t_DirectoryName+"/");
                         
                     }    
                    
                   
                     
                 }
             
         });
        event.stopPropagation();
        
    });
    function getEndDateObject(){
         var endDate = "", count = 0,noOfDaysToAdd = arguments[0];
         var startDate = new Date();
         
         //alert("Date "+endDate);
         //alert("noOfDaysToAdd: "+noOfDaysToAdd);
         
         while(count < noOfDaysToAdd)
         {
            //alert("Cal Before: "+endDate);
            //alert(count);
            endDate = new Date(startDate.setDate(startDate.getDate() + 1));
           
            if(endDate.getDay() != 0 && endDate.getDay() != 6)
            {
               //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
               count++;
            }
            //alert("Cal After: "+endDate);
        }
        //alert("Date "+endDate.getDate());
        return endDate;
         
    };
    $("#serviceLevel").change(function(event){
        // (All of these dates are excluding weekends) 
        var serviceLevel         = $(this).val();
        var setjobDueDateObject  = "";
        var setOnPressDateObject = "";
        //if current time is less than 16
        var currentHour = now.getHours();
        //alert(currentHour);
        if(currentHour < 16)
        {
            if(serviceLevel == "Same Day")
            {
                //d_JobDue = set value to todays date
                $("#jobDueDate").datepicker('setDate',new Date());
                
                //d_PrintJobDue = set value to todays date
                $("#onPressDate").datepicker('setDate',new Date());
                
            }
            else if(serviceLevel == "24 Hour")
            {
                // d_JobDue = set value to todays date +1
                setjobDueDateObject = getEndDateObject(1);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                // d_PrintJobDue = set value to todays date
                $("#onPressDate").datepicker('setDate',new Date());
                
            }
            else if(serviceLevel == "48 Hour")
            {
                //d_JobDue = set value to todays date +2
                setjobDueDateObject   = getEndDateObject(2);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date +1
                setOnPressDateObject  = getEndDateObject(1);
                $("#onPressDate").datepicker('setDate',setOnPressDateObject);
                
            }
            else if(serviceLevel == "72 Hour")
            {
                //d_JobDue = set value to todays date +3
                setjobDueDateObject   = getEndDateObject(3);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date +1
                setOnPressDateObject  = getEndDateObject(1);
                $("#onPressDate").datepicker('setDate',setOnPressDateObject);
                
            }
            else if(serviceLevel == ">72 Hour")
            {
                //d_JobDue = set value to todays date +5
                setjobDueDateObject   = getEndDateObject(5);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date +1
                setOnPressDateObject  = getEndDateObject(1);
                $("#onPressDate").datepicker('setDate',setOnPressDateObject);
                
            }
            
        }
        else if(currentHour >= 16)
        {
            if(serviceLevel == "Same Day")
            {
                //d_JobDue = set value to todays date +1
                setjobDueDateObject = getEndDateObject(1);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date
                $("#onPressDate").datepicker('setDate',new Date());
            }
            else if(serviceLevel == "24 Hour")
            {
                // d_JobDue = set value to todays date +2
                setjobDueDateObject = getEndDateObject(2);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                // d_PrintJobDue = set value to todays date
                $("#onPressDate").datepicker('setDate',new Date());
                
            }
            else if(serviceLevel == "48 Hour")
            {
                //d_JobDue = set value to todays date +3
                setjobDueDateObject   = getEndDateObject(3);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date +1
                setOnPressDateObject  = getEndDateObject(1);
                $("#onPressDate").datepicker('setDate',setOnPressDateObject);
                
            }
            else if(serviceLevel == "72 Hour")
            {
                //d_JobDue = set value to todays date +4
                setjobDueDateObject   = getEndDateObject(4);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date +2
                setOnPressDateObject  = getEndDateObject(2);
                $("#onPressDate").datepicker('setDate',setOnPressDateObject);
                
            }
            else if(serviceLevel == ">72 Hour")
            {
                //d_JobDue = set value to todays date +6
                setjobDueDateObject   = getEndDateObject(6);
                $("#jobDueDate").datepicker('setDate',setjobDueDateObject);
                
                //d_PrintJobDue = set value to todays date +2
                setOnPressDateObject  = getEndDateObject(2);
                $("#onPressDate").datepicker('setDate',setOnPressDateObject);
                
            }
        } 
        $("#jobDueDate").datepicker('update');
        $("#onPressDate").datepicker('update');   
        event.stopPropagation();
        
    })
    
    $('#customerInfoDataTable').on('click', 'tbody tr', function() { //why do we have to use live switched to .on and doesn't work?
        var aData = customerTableInfo.fnGetData(this);
        //alert('aData[0] '+ aData[0]); // assuming the id is in the first column
        
        //$("#msgResult").html("Getting Contacts.. ");
        //$("#myModal .modal-dialog").css("width","300");
        
        //$('#myModal').modal('show');
        var kp_CustomerID   = aData[0];
        var t_CustCompany   = aData[1];
        var t_QBCity        = aData[2];
        var t_QBState       = aData[3];
        var employeeIDSales = aData[4];
        
        $("#orderEmployeeIDSalesHidden").val(employeeIDSales);
        
        $('#customerIDHidden').val(kp_CustomerID);
        $('#custCompanyHidden').val(t_CustCompany);
        $('#qbCityHidden').val(t_QBCity);
        $('#qbStateHidden').val(t_QBState);
        
        
        if(!$("#customerTableSelect").hasClass("hide"))
        {
            $("#customerTableSelect").addClass("hide");
        }    
        if($("#customerContactTableSelect").hasClass("hide"))
        {
            $("#customerContactTableSelect").removeClass("hide");
        }
        
        displayCustomerContactTable(kp_CustomerID);
        
//        setTimeout(function(){
//            //close the modal window
//            //$('#myModal').modal('hide');
//        },1000);
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
    
    // the below function we are not using yet..but we may..
    function RefreshTable(tableId, urlData)
    {
        //Retrieve the new data with $.getJSON. You could use it ajax too
        $.getJSON(urlData, null, function( json )
        {
            table = $(tableId).dataTable();
            oSettings = table.fnSettings();
            table.fnClearTable(this);
            for (var i=0; i<json.aaData.length; i++)
            {
                table.oApi._fnAddData(oSettings, json.aaData[i]);
            }
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            table.fnDraw();
        });
    }
    // calls date picker when selected
//    $('#jobDueDate').datepicker().on('changeDate', function(ev){
//        //calendarWeeks: true;
//        $('#proofDue').data('date');
//        $('#proofDue').datepicker('hide');
//        //format: 'mm-dd-yyyy'
//    });
    
    
    
    
    
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
                                                   null,{sWidth: '2%'}
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
          $('div.dataTables_filter input[type=text]').focus();                               
          $('#customerContactInfoDataTable').css('cursor', 'pointer');
         
            //dataTable.fnClearTable();
          
       
    };
function readOrderRequestInfo() {
        $.ajax({
             url: getOrderRequestInfoUrl+'/'+$('#newOrderIDHidden').val(),
                 type: 'POST',
                 dataType: 'json',
                 error: function(xhr,status,error){
                       alert("Please Contact IT (read order Data  ajax Error): "+ xhr.status+"-"+error);
                 },
                 success: function(response){
                     //alert(response.t_TypeOfOrder)
                     $("#customerIDHidden").val(response.kf_CustomerID);
                     $("#addressIDHidden").val(response.kf_ContactID);
                     
                     $("#companyName").val(response.custCompany);
                     $("#contactName").val(response.contactNameFull);
                     
                     $("#orderType").val(response.t_TypeOfOrder);
                     $("#jobName").val(response.t_JobName);
                     
                     $("#artLocation").val(response.t_ArtLocation);
                     $("#customerPurChaseOrderNumber").val(response.t_CustomerPO);
                     
                     var dateReceived = response.d_Received;
                     if(dateReceived != null && dateReceived != "")
                     {
                         var dateReceivedArry     = dateReceived.split("-");
                         var dateReceivedComplete = dateReceivedArry[1]+'/'+dateReceivedArry[2]+'/'+dateReceivedArry[0];
                         $("#showDateReceived").html(dateReceivedComplete);
                         
                     }    
                     //$("#showDateReceived").html(response.d_Received);
                     
                     $("#serviceLevel").val(response.t_ServiceLevel);
                     
                     //check a check box
                     if(response.nb_CustomerPOToBeDetermined == "1")
                     {
                         $("#customerPOToBeDetermined").prop('checked',true);
                     }
                     if(response.nb_UseTotalOrderPricing == "1")
                     {
                         $("#totalOrderPricingCheckBox").prop('checked',true);
                         $("#totalOrderPricingCheckBox").triggerHandler("click");
                         $("#orderPricingInput").val("$"+response.n_TotalOrderPrice);
                     } 
                     if(response.nb_IncompletePricing == "1")
                     {
                         $("#incompletePricingCheckBox").prop('checked',true);
                     }
                     
                     //alert("hi: "+response.timePrintFormat);
                     if(response.d_ProofDue != null)
                     {
                         $("#proofDueDate").datepicker('setUTCDate',new Date(response.d_ProofDue));
                         $("#proofDueDate").datepicker('update');
                         
                     }    
                     
                     //alert(response.timeProofFormat);
                     $("#proofDueTime").val(response.timeProofFormat);
                     
                     if(response.d_JobDue != null)
                     {
                         $("#jobDueDate").datepicker('setUTCDate',new Date(response.d_JobDue));
                         $("#jobDueDate").datepicker('update');
                     }    
                     
                     
                     $("#jobDueTime").val(response.timeJobDueFormat);
//                     var printJobDueDate       = response.d_PrintJobDue;
//                     
//                     var printJobDueDateArry   = printJobDueDate.split("-");
//                     var printJobDueDateRefine = printJobDueDateArry[1]+'/'+printJobDueDateArry[2]+'/'+printJobDueDateArry[0];
                     //alert("hi1 "+ response.d_PrintJobDue);
                     //$("#onPressDate").datepicker('setDate',new Date(printJobDueDateRefine));
                     if(response.d_PrintJobDue != null)
                     {
                         $("#onPressDate").datepicker('setUTCDate',new Date(response.d_PrintJobDue));
                         $("#onPressDate").datepicker('update');
                     }
                    
                     //$("#onPressDate").datepicker('update',new Date(response.d_PrintJobDue));
                     //$('#onPressDate').datepicker('update',new Date(response.d_PrintJobDue));
                     //$('#onPressDate').datepicker('update');
                     
                     $("#onPressTime").val(response.timePrintFormat);
                     
                     //alert("hi2");
                     
                 }
             
         });
                 
} // end readOrderRequestInfo/* 
