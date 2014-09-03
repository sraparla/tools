var readSportDatatableUrl  = "vsporttools/vsporttoolscontroller/getSportToolsData";
var sendEmailSportToolsUrl = "vsporttools/vsporttoolscontroller/sendSportToolsEmail";
var submitEmployeeFrmUrl   = "employees/employeecontroller/submitEmployeeData";

$(document).ready(function() {

    var sportTable = $('#sportToolsTable').dataTable({
        "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
        "iDisplayLength": 25,
        "aoColumns": [
            null,
            null,
            null,
            null,
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
            {"bVisible":    false},
            {"bVisible":    false},
        ],
        "bAutoWidth": false,
        "oTableTools": {
            "aButtons": [],
            "sRowSelect": "single"
        },
        //"iDisplayLength": -1,
        "aaSorting": [[1, "asc"]], // Sort by first column descending
        "bsort": true,
        "sAjaxSource": readSportDatatableUrl
    });
    
    $('#sportToolsTable').css('cursor', 'pointer');

    $('#sportToolsTable tbody tr').live('click',function(){ //why do we have to use live switched to .on and doesn't work?
          //alert("hi");
          //alert("hi "+ $(this).attr('class'));
          if ( $(this).hasClass('active') ) 
          {
                $(this).removeClass('active');
          }
          else 
          {
                sportTable.$('tr.active').removeClass('active');
                $(this).addClass('active');
          }
//        $(this).addClass('active');
//        alert($(this).parent().find("tr").length);
//        var rte = $(this).parent().find("tr:gt(0)");
//        alert(rte.length);
//        alert($(this).parent().find("tr:gt(0)"));
        
        
       
        //$(this).parent().children().length()
        //$(this).toggleClass('active');
        var aData                  = sportTable.fnGetData(this);
        // Start of New Varaibles
        //alert(aData);
        var t_SportItemNumber      = aData[0];
        var indyID                 = aData[1].split("-");
        var sportsOrderID          = indyID[0];
        var dashNum                = indyID[1];
        //alert(orderID);
        //alert(n_DashNum);
        var manNumber              = aData[2];
        var status                 = aData[3];
        var jobDue                 = aData[4];
        var jobName                = aData[5];
        var description            = aData[6];
        var initials               = aData[7];
        var artNeededBy            = aData[8];
        var sureDate               = aData[9];
        var sportID                = aData[10];
        var artReceivedProduction  = aData[11];
        var quantity               = aData[12];
        //alert("Quantity: "+quantity);
        var height                 = aData[13];
        var width                  = aData[14];
        var artReceivedBy          = aData[15];
        var ti_UploadComplete      = aData[16];
        //alert("ti_UploadComplete: "+ti_UploadComplete);
        var t_ArtContact           = aData[17];
        var orderItemID            = aData[18];
        var dateArtReceived        = aData[19];
        var customerID             = "1467";
        
        document.getElementById('t_ArtContactHidden').value             = t_ArtContact;
        document.getElementById('ti_UploadCompleteHidden').value        = ti_UploadComplete;
        document.getElementById('orderItemIDHidden').value              = orderItemID;
        //document.getElementById('purchaseOrderHidden').value            = purchaseOrder;//dont need
        document.getElementById('sportIDHidden').value                  = sportID;
        document.getElementById('descriptionHidden').value              = description;
        //document.getElementById('artVerifiedInHidden').value            = artVerifiedIn; // check this
        document.getElementById('statusHidden').value                   = status;

        document.getElementById('customerIDHidden').value               = customerID;
        document.getElementById('quantityHidden').value                 = quantity;

        document.getElementById('heightHidden').value                   = height ;
        document.getElementById('widthHidden').value                    = width ;
        //alert("nb_ArtReceivedProduction: "+ artReceivedProduction);
        document.getElementById('artReceivedProductionHidden').value    = artReceivedProduction ;
        document.getElementById('artReceivedByHidden').value            = artReceivedBy;

        document.getElementById('OrderIDHidden').value                  = sportsOrderID;        
        document.getElementById('sportsOrderIDDashNumIDHidden').value   = sportsOrderID +"-"+dashNum;
        //alert(dateArtReceived);
        $("#dateArtReceivedHidden").val(dateArtReceived);
        //alert("here: "+$("#dateArtReceivedHidden").val()+" "+dateArtReceived);
        //displaying
        $("#dateCheckedIn").val($("#dateArtReceivedHidden").val());
        
        //alert($("#dateArtReceived").val()+" "+dateArtReceived);
        var displayUploadTime   = "Upload Complete :  ";
        //displayUploadTime    += ti_UploadComplete;
        var uploadTime          = document.getElementById('ti_UploadCompleteHidden').value;
        //alert("uploadTime: "+uploadTime);
        displayUploadTime      += uploadTime;
        //alert("displayUploadTime: "+displayUploadTime);
        $("#timeStamp").val(displayUploadTime);
        
        //$("#timeStamp").text(displayUploadTime);

        //alert("OrderID1.0 " +$('#OrderIDHidden').val());
        var t_ArtContactSelect = document.getElementById('t_ArtContactHidden').value;
        $("#artContactName").val(t_ArtContactSelect); 
        //document.getElementById('timeStamp').value                      = document.getElementById('ti_UploadCompleteHidden').value ;
        
        document.getElementById('sportID').value                        = document.getElementById('sportIDHidden').value ;
        document.getElementById('quantity').value                       = document.getElementById('quantityHidden').value ;
        document.getElementById('height').value                         = document.getElementById('heightHidden').value ;
        document.getElementById('width').value                          = document.getElementById('widthHidden').value ;
       
        document.getElementById('desc').value                           = jobName;
        //alert("OrderID1.1 " +$('#OrderIDHidden').val());
        document.getElementById('project').value                        = document.getElementById('descriptionHidden').value;
         //alert("OrderID1.1 " +$('#OrderIDHidden').val());
        document.getElementById('orderStatus').value                    = document.getElementById('statusHidden').value;
          //alert("OrderID1.1 " +$('#OrderIDHidden').val());  
        var artCheckIn                                                  = document.getElementById('artReceivedProductionHidden').value;
         //alert("OrderID1.1 " +$('#OrderIDHidden').val());
        document.getElementById('checkInBy').value                      = document.getElementById('artReceivedByHidden').value;
        //alert("OrderID2 " +$('#OrderIDHidden').val());
        if(artCheckIn == "1")
        {
            $("#artCheckIn").prop('checked',true);
        }    
        
                             
        if(!$("#table-wrapper").hasClass("hide"))
        {
            $("#table-wrapper").addClass("hide");
            
        }
        if($("#sportUploadFormInfo").hasClass("hide"))
        {
            $("#sportUploadFormInfo").removeClass("hide");
            
        }
        if(uploadTime == "" || uploadTime == "0000-00-00 00:00:00")
        {
            $("#uploadCompleteDiv").hide();
            
            //$("#timeStamp").hide();
        }
        $("#newTab").hide();
        //alert("sportsOrderID " +$('#sportsOrderIDDashNumIDHidden').val());
        

    });
    $("#closeMyModalBtn").click(function(){
        //alert("hi");
        window.location.reload(true);
    });
    $("#Search").click(function(){
          if($("#table-wrapper").hasClass("hide"))
          {
              $("#table-wrapper").removeClass("hide");

          }
          if(!$("#sportUploadFormInfo").hasClass("hide"))
          {
              $("#sportUploadFormInfo").addClass("hide");
            
          }
          //$("#table-wrapper").show();
          //$("#sportUploadFormInfo").hide();
          return false;
    });
    
    function refreshTable(tableId, urlData)
    {
        //Retrieve the new data with $.getJSON. You could use it ajax too
        $.getJSON(urlData, null, function(json)
        {
            table = $(tableId).dataTable();
            
            oSettings = table.fnSettings();
            var before = oSettings._iDisplayStart;
            table.fnClearTable(this);

            for (var i = 0; i < json.aaData.length; i++)
            {
                table.oApi._fnAddData(oSettings, json.aaData[i]);
            }
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            oSettings._iDisplayStart = before;

            table.fnDraw(oSettings);
            //table.fnSort( [1,'asc'] );
        });
    }
  
  
    $('.dataTables_filter input')
    .unbind('keypress keyup')
    .bind('keypress keyup', function(e){
    if ($(this).val().length < 3 && $(this).val().length !=0 && e.keyCode != 13) return;
    sportTable.fnFilter($(this).val());
    });
    
    $(function() {
            //setup html5 version
            var uploadInitialized = false;

            function validateForm(){
                if(document.getElementById('artContactName').value == "")
                {
                    alert("please choose a Art Contact Name");
                    document.getElementById('artContactName').focus();
                    return false;
                }
                else
                {
                    return true;
                }
            }
            $("#uploader").pluploadQueue({
            // General settings
            runtimes : 'html5,flash',
            //max_file_size : '1024mb',
            url : 'vsporttools/vsporttoolscontroller/sportToolsFrmUpload',
            //unique_names : true,
            //multipart: true,
            //multiple_queues: true,
            multipart_params: { 'orderIDHidden': $('#OrderIDHidden').val(),
                                'sportsOrderIDDashNumIDHidden': $('#sportsOrderIDDashNumIDHidden').val()},

            // Flash settings
            flash_swf_url : 'js/plupload.flash.swf',
             init: 
             {
                 StateChanged: function(up) {
                    if (!uploadInitialized && up.state == plupload.STARTED) 
                    {
                        if (!validateForm()) 
                        {
                            up.stop();
                        }
                        else 
                        {
                            uploadInitialized = true;
                             $("#Search").hide();
                             $("#newTab").show();
                        }
                    }
                 },
                 BeforeUpload: function(up, file) {
                 up.settings.multipart_params = {'orderIDHidden': $('#OrderIDHidden').val(),
                                                 'sportsOrderIDDashNumIDHidden': $('#sportsOrderIDDashNumIDHidden').val()}
                 },
                 FileUploaded: function(up,file,response) {
                    // Called when a file has finished uploading
                    if(up.total.queued ===0)
                    {
                        //$.JasonParse(response.response);
                        //var countFiles = files.lenght;
                        var CountFiles = up.files.length;
                        var tmpfileNames = "id="+"";
                        var fileNames = "<ul>";
                        for(var i=0; i< CountFiles; i++)
                        {
                            fileNames += "<li>"+ up.files[i].name + "</li>";
                            //alert("Files uploaded: "+ up.files[i].name);
                        }
                        fileNames         += "</ul>";
                        tmpfileNames      += fileNames;
                        //alert(tmpfileNames);
                        var tart           = $('#artContactName').val();
                        //alert(tart);
                        var torderItemID   = $('#orderItemIDHidden').val();

                        var sportsIDnumber = $('#sportIDHidden').val();



                        var sportDashNum   = $('#sportsOrderIDDashNumIDHidden').val()
                        //alert(torderItemID);
                        tmpfileNames    += "&art="+tart;
                        //alert(tmpfileNames);
                        tmpfileNames += "&orderItemID="+torderItemID;
                        //alert(tmpfileNames);
                        tmpfileNames += "&SIDnumber="+sportsIDnumber;

                        tmpfileNames += "&SDashNum="+sportDashNum;
                        tart = "art=" + tart;
                        //alert(fileNames);
                        $.ajax({
                          type: "GET",  
                          url: sendEmailSportToolsUrl,
                          beforeSend: function() { 
                           $(".modal-header #myModalLabel").text("Please Wait..");
                           $(".modal-body #uploadedFiles").html(" <img src=\"extras/TableTools/media/images/ajaxLoad/ajax-loader.gif\" alt=\"Ajax Loading Animation\" />&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Uploading...</strong></span>");
                           $("#myModal").modal({
                                backdrop: false
                            });},
                          data: tmpfileNames,

                          cache: false,
                          success: function() {
                            //Fill the second selection with the returned mysql data
                            //alert("hi"+ fileNames);
                            $("#myModalLabel").text("The Following Files have been uploaded");
                            $(".modal-body #message").html(fileNames);
                            $("#myModal").modal({
                                //backdrop: false
                                backdrop: 'static',
                                keyboard: false
                             });
                            

                          }
                        });
                       
                    }
                 }
             }
            });
        });

});




