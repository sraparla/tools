<!DOCTYPE html>
<html ang="en">
    <head>
        <meta charset=UTF-8">
        <meta name="viewport" content="width=device-width,
              initial-scale=1, maximum-scale=1">
        <title>Status</title>
        <base href="<?php echo base_url(); ?>" />
        <!--include the jQuery Mobile stylesheet  -->
        <link rel="stylesheet" href="jqueryMobile/jquery.mobile-1.3.1.css">
        
        <!--Jquery Mobile Simple Dialog CSS -->
<!--        <link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog.min.css" /> -->
        
        <link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.min.css" /> 
        
        <!--include the jQuery and jQuery Mobile javascript files -->
        <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
        
        <script src="js/jquery.validate.min.js"></script>
        <script src="js/additional-methods.min.js"></script>
        
        <script type="text/javascript" charset="utf-8" src="jqueryMobile/jquery.mobile-1.3.1.js"></script>
        
        <!--Jquery Mobile Simple Dialog js file -->
<!--        <script type="text/javascript" src="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js"></script>-->
         
        <script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.core.min.js"></script>
        <script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.calbox.min.js"></script>
        <script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
        
        
        <script src="js/clearFormMobile.js"></script>
        <script typr="text/javascript" charset="utf-8" src="js/mobileModuleJobStatus.js"></script>
        
        <style type="text/css">
               label.error {
                    color: red;
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 1.4;
                    margin-top: 0.5em;
                    width: 100%;
                    float: none;
                }
                .hiddenfile {
			 width: 0px;
			 height: 0px;
			 overflow: hidden;
	        }

                @media screen and (orientation: portrait){
                    label.error {
                        margin-left: 0;
                        display: block;
                    }
                }

                @media screen and (orientation: landscape){
                    label.error {
                        display: inline-block;
                        margin-left: 22%;
                    }
                }
        </style>
    
    </head>
    <body>
        <!-- Start of First page -->  
        <div data-role="page" id="home">
            <div data-role="header"  data-id="toolbar" data-position="fixed">
                <a data-role="button" data-ajax="false" href="mobile" data-icon="arrow-l" data-iconpos="left" data-transition="slide" class="ui-btn-left">Back</a>
                <h1> Find Order</h1>
            </div>
            <div data-role="content">
                <ul data-role="listview" data-divider-theme="b" data-inset="true">
                    <li data-theme="c">
<!--                        <a href="#searchFromJobNumber" data-transition="slide">From Job Number</a>-->
                        <a  id="searchByJobNum" href="#searchFromJobNumber" data-transition="slide">By Job Number</a>
                    </li>
                    <li data-theme="c">
                          <a href="#searchByDueDate" data-transition="slide">By Due Date</a>
                    </li>
                </ul>
                
            </div>
<!--            <div data-role="footer">
                 <h4>&copy; Indy Imaging Inc. 2013</h4>
            </div>-->
        </div>
        <!-- End of First page -->
        
        <!-- Start of second page -->
        <div data-role="page" id="searchFromJobNumber">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a data-role="button" href="#home" data-icon="arrow-l" data-iconpos="left" data-transition="slide" class="ui-btn-left">Back</a>
                <h1> Find Job Order</h1>
            </header>
           
            
            <section data-role="content">
                
<!--                <ul id="findJobStausFromOrderID" data-role="listview"  data-inset="true" data-filter="true" data-filter-placeholder="By Job Number..." data-filter-theme="d">
                    
                </ul>-->
<!--                <input type="text" pattern="[0-9]*">-->

                <input type="number" autofocus  pattern="[0-9]*" data-clear-btn="true" id="findJobStausFromJobNumber" name="findJobStausFromJobNumber" >
                <input type="hidden" name="mobileOrderIDHidden" id="mobileOrderIDHidden">
            </section>
<!--            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>-->

        </div>
        <!-- End of second page -->
        
        
        
        <!-- Start of Third page -->
        <div data-role="page" id="searchByDueDate">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a data-role="button" href="#home" data-transition="slide" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1>Order Due</h1>
            </header>
            <section  data-role="content">
                  <input name="mydate" id="mydate" type="date"  data-role="datebox"
                                    data-options='{"mode": "calbox"}'>
<!--                <input name="mydate" id="mydate" type="date" data-role="datebox"
                                    data-options='{"mode": "calbox","useImmediate":true, "useFocus": true, "useInlineBlind": true}'>-->
                <br/><br/>
                <ul id="getDynamicJobStatusList" data-filter="true" data-role="listview">
				
                </ul>                
                
                <input type="hidden" id="dateChanged" name="dateChanged">
            </section>
        </div>
         <!-- End of Third page -->
         
        <!-- Start of Four page -->
        <div data-role="page" id="jobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="jobStatusDetailsPageBackBtn" data-role="button" href="" data-transition="slide" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                 <h1 id="displayOrderIDValue"></h1>
            </header>
            <section data-role="content">
                <textarea id="mobileOrderInfo" readonly="readonly">

                </textarea>
                <ul id="displayJobStatus" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
         
                <ul id="displayOrderIDDashNum" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
                
                <div id="myTable">
                    <table data-role="table" id="order-table" data-mode="reflow" class="ui-responsive table-stroke">
                        <thead>
                            <tr>
                                 <th>#</th>
                                 <th>SqFt</th>
                                 <th>T</th>
                                 <th>Press</th>
                                 <th>Cx</th>
                                 <th>Info</th>
                                 <th>Ship</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                  <td id="orderItemCountValue"></td>
                                  <td id="oicSqFtSumValue"></td>
                                  <td id="durationTimeValue"></td>
                                  <td id="machineAbbValue"></td>
                                  <td id="complexityValue"></td>
                                  <td id="orderItemAbValue"></td>
                                  <td id="ordShipValue"></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                
                <input type="hidden"  name="getOrderIDHidden"          id="getOrderIDHidden">
                
                <input type="hidden"  name="getOrderJobStaus"          id="getOrderJobStaus">
            
            </section>
<!--            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>-->

        </div>
        <!-- End of Four page -->
        
         <!-- Start of Five page -->
        <div data-role="page" id="orderItemJobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="orderItemJobStatusDetailsPageBackBtn" data-role="button" data-transition="slide" href="#jobStatusDetailsPage" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1 id="displayHeaderOrderIDDash"></h1>
            </header>
            <section data-role="content">
                <ul id="inspectionFrmLink" data-role="listview" data-divider-theme="b" data-inset="true">
                    <li><a  data-transition="slide" href="#mobileUploadDetailsPage">Inspection</a></li>
                </ul>
                <br/><br />
<!--                <input type="submit" value="upload" />-->

                <ul id="displayOrderIDDashNumJobStatus" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
                
                <br/><br/>


                <ul id="displayMobileProductBuild" data-role="listview" data-theme="d" data-divider-theme="b">
                   
                </ul>
                
            </section>
            
        </div>
        <!-- End of Five page -->
        
        <!-- Start of Six page -->
        <div data-role="page" id="mobileUploadDetailsPage">
              <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="mobileUploadDetailsPageBackBtn" data-role="button" data-transition="slide" href="#jobStatusDetailsPage" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1 id="displayMobileUploadHeaderOrderIDDash"></h1>
            </header>
            <section data-role="content">
                <form  action="mobile/mobilecontroller/uploadFiles" method="post" data-ajax="false" enctype="multipart/form-data">
                      <br/>
                      <ul id="info" data-role='listview'>
                      </ul><br/>
                      <button id="chooseFile">Add Inspection Photos</button>
                      <div class="hiddenfile">
                          <input type="file" multiple  name="Filedata[]" accept="image/*" capture  />
                      </div>
                      <div id="divUploadBtn" class="hiddenfile">
                            <input type="submit" name="upload" value="Upload"  /> 
                      </div>
                      
                      <input type="hidden" name="mobileUploadDashNum"      id="mobileUploadDashNum" />
                      <input type="hidden" name="mobileUploadOrderID"      id="mobileUploadOrderID" />
                      <input type="hidden" name="mobileUploadOrderItemID"  id="mobileUploadOrderItemID" />
                      <input type="hidden" name="mobileUploadTypeOfChange" id="mobileUploadTypeOfChange" />
              </form>
            </section>
            
        </div> 
        <!-- End of Six page -->
        
        <!-- Start of Seven page -->
        <div data-role="page" id="editJobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="editJobStatusDetailsPageBackBtn" data-role="button" data-transition="slide" href="#jobStatusDetailsPage" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1 id="displayFormJobNumber"></h1>
            </header>
            <section data-role="content">
                <form name="statusChangeForm" id="statusChangeForm" method="post" action="mobile/mobileController/submitMobileStatusChange">
                    <label for="currentStatus">Current Status:</label>
                
                    <input type="text" name="currentStatus" id="currentStatus">
                
                    <label for="newStatus">New Status:</label>
                
                    <select name="newStatus" id="newStatus">
                        <option value="">Choose one..</option>
                    </select>
                    
                  
                    <input id="userName" name="userName" autocomplete="off" placeholder="Type Employee Name...">
                    <ul id="suggestions" name="suggestions" data-role="listview" data-inset="true"></ul>
                    <br/>
                    <textarea name="notes" placeholder="Notes..." id="notes"></textarea>
                    <br/>
                    <fieldset id="displayOnlyToOrderItemChange" data-role="controlgroup">
                         <label for='applyToAll'>Apply To All</label>
                         <input type="checkbox" name="applyToAll" id="applyToAll" value="1"/><br/>
                    </fieldset>
<!--                    <div id="displayOnlyToOrderItemChange">
                         <label for='applyToAll'>Apply To All</label>
                         <input type="checkbox" name="applyToAll" id="applyToAll" value="1"/><br/>
                    </div>-->
                    
                    <input type="hidden" name="statusChangeRequestHidden" id="statusChangeRequestHidden">
                    
                    <input type="hidden" name="orderItemIDHidden" id="orderItemIDHidden">
                    
                    <input type="hidden" name="orderIDHidden" id="orderIDHidden">
                    
                    <button type="submit" data-theme="b" name="submit" id="submit" value="submit-value">Submit</button>
                    
                </form>
                
            </section>
            <section>
                <div data-role="popup" id="popupDialog" data-overlay-theme="a" data-theme="c" data-dismissible="false" style="max-width:400px;" class="ui-corner-all">
                        <div data-role="header" data-theme="a" class="ui-corner-top">
                            <h1>Please Confirm</h1>
                        </div>
                        <div data-role="content" data-theme="d" class="ui-corner-bottom ui-content">
                            <h5 id="customMessageWarning" class="ui-title"></h5>
                            <p>Do you want to continue?</p>
                            <form id="confirmFrmModal" name="confirmFrmModal">
                                 <input type="hidden" name="orderIDHiddenModal"   id="orderIDHiddenModal" >
                                 <input type="hidden" name="newStatusHiddenModal" id="newStatusHiddenModal"  >
                                 <input type="hidden" name="userNameHiddenModal"  id="userNameHiddenModal"  >
                                 <input type="hidden" name="notesHiddenModal"     id="notesHiddenModal"  >
                            </form>
                            <a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">No</a>
                            <a id="confirmStatusModalBtn" href="#" data-role="button" data-inline="true" data-rel="back" data-transition="flow" data-theme="b">Yes</a>
                        </div>
                </div>
            </section>
<!--            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>-->

        </div>
        <!-- End of Seven page -->
     </body> 
</html>

<!--         Start of Seven page 
        <div data-role="page" id="statusUpdatePage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                 <a class="force-reload" id="refreshHomePage" data-role="button" href="#home" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Home</a>
                 <h1 id="displayUpdateSuccess">Success</h1>
            </header>
            <section data-role="content">
                <p>The status has been updated succesfully</p>
            </section>
        </div>
         End of Seven page -->
 
