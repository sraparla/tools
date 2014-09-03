 jQuery(document).ready(function ($) {
    // on load

    // Hides banner form fields on load
    $("#machine").hide();
    
    // Start Dynamic Tab Switching...
    var currentTab = "";

    // navigate to a tab when the history changes
    window.addEventListener("popstate", function(e) {
        var activeTab = $('[href=' + location.hash + ']');
        //sets currentTab on a refresh correctly
        currentTab = location.hash;
        $('#datepicker').datepicker('update',$("#dp1").val());
        if (activeTab.length) {
          activeTab.tab('show');
        } else {
          $('.nav-tabs a:first').tab('show');
        }
    });


    var p = {}; //initiate the array
    p['jobDue'] = $("#dp1").val(); //assign your record_id variable to it.
    var baseURL = 'home/';
    //load content for first tab and initialize   
    $('#inProcess').load(baseURL + "inProcess",p,function(){
        if(currentTab === ""){
            currentTab = '#inProcess';
        }
        $('#myTabs').tab(); //initialize tabs
    });    
    $('#myTabs').bind('show', function(e) {
       // alert("1 " + currentTab);
       var pattern=/#.+/gi; //use regex to get anchor(==selector)
       var contentID = e.target.toString().match(pattern)[0]; //get anchor
       currentTab = contentID;
       var url = baseURL+contentID.replace('#','');
       //set history for tab
       history.pushState(null, null, baseURL + contentID);
       //If tab =
       if (contentID === "#byMachine"){
           $("#machine").show();
       }  else {
           $("#machine").hide();
       }
       //load content for selected tab
       $(contentID).load(url,p,function(){
            $('#myTabs').tab(); //reinitialize tabs
       });
    });

    $('#datepicker')
    .datepicker()
    .on('changeDate', function(ev){
        newDate = new Date(ev.date);
        newDate = ('0' + (newDate.getUTCMonth()+1)).slice(-2) + '-' + ('0' + newDate.getUTCDate()).slice(-2) + '-'+ newDate.getUTCFullYear();
        //alert("your momma is..." + " " + newDate);
        $('#dp1').val(newDate);
        $('#dp1').trigger('change');
    });

    // calls date picker when selected
    $('#dp1').datepicker({
        format: 'mm-dd-yyyy'
    });

    //click today button
    $("#todayButton").click(function() {
        var newDate = new Date();
        newDate = ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2) + '-'+ newDate.getFullYear();
        $('#dp1').val(newDate);
        $('#datepicker').datepicker('update',newDate);
        $('#dp1').trigger('change');
    });

    // calls the page and adds the date to it when the field changes and then loads data in Tab
    $('#dp1').change(function(){
        p['jobDue'] = $("#dp1").val(); //assign your record_id variable to it.
        var url = baseURL+currentTab.replace('#','');
        //set history for tab
        history.pushState(null, null, baseURL + currentTab);
        //load content for selected tab
        $(currentTab).load(url,p,function(){
            $('#myTabs').tab(); //reinitialize tabs
        });
    });




});