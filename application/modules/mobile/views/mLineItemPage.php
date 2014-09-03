<!DOCTYPE html>
<html ang="en">
     <head>
        <meta charset=UTF-8">
        <!--
        <meta name="viewport" content="width=device-width,
              initial-scale=1, maximum-scale=1"> -->
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        <title>Status</title>
        <base href="<?php echo base_url(); ?>" />
        <!--include the jQuery Mobile stylesheet  -->
        <link rel="stylesheet" href="jqueryMobile/jquery.mobile-1.3.1.css">
        
        <!-- Photoswipe Gallery css) -->
        <link href="photoswipe/photoswipe-gallery.css" type="text/css" rel="stylesheet" />

        <!--Jquery Mobile Simple Dialog CSS -->
<!--        <link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog.min.css" /> -->
        
        <link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.min.css" /> 
        
        <link href="photoswipe/photoswipe.css" type="text/css" rel="stylesheet" />
        
        <!--photoswipe Image Gallery files -->
        <script type="text/javascript" src="photoswipe/lib/klass.min.js"></script>
        
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
        
        <!--photoswipe Image Gallery files -->
        <script type="text/javascript" src="photoswipe/code.photoswipe.jquery-3.0.5.min.js"></script>
        
        <script typr="text/javascript" charset="utf-8" src="js/mobileModuleLineItemPage.js"></script>
        
        <style type="text/css">
                         
            .qtybtnAdd 
            {
            float:right;
            
            }
            .qtyInput 
            {
            float:right;
            
            }
            .qtybtnMinus 
            {
            float:right;
            
            }
            .inputTextWidth{
                width:77px;
            }
            .checkboxWidth{
		width:120px;
            }
            
           
            .ui-li-thumb{
                    position:absolute;
                    top:0;
                    bottom:0;
                    margin:auto;
            }
            .ulTest
            {
               
                    top:0;
                    bottom:0;
                    margin-left: 0;
                
            }
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
             
                /* Show priority 1 at 320px (20em x 16px) */
                @media screen and (min-width: 20em) {
                   .my-custom-class th.ui-table-priority-1,
                   .my-custom-class td.ui-table-priority-1 {
                     display: table-cell;
                   }
                   .my-custom-class  th.ui-table-priority-2,
                   .my-custom-class td.ui-table-priority-2 {
                     display: table-cell;
                   }
                   .my-custom-class  th.ui-table-priority-3,
                   .my-custom-class td.ui-table-priority-3 {
                     display: table-cell;
                   }
                   .ulTest {
                       width:100%;
                       height:90%;
                       
                   }
                }
                /* Show priority 2 at 480px (30em x 16px) */
                @media screen and (min-width: 30em) {
                   .my-custom-class  th.ui-table-priority-4,
                   .my-custom-class td.ui-table-priority-4 {
                     display: table-cell;
                   }
                   .my-custom-class  th.ui-table-priority-5,
                   .my-custom-class td.ui-table-priority-5 {
                     display: table-cell;
                   }
                   .my-custom-class  th.ui-table-priority-6,
                   .my-custom-class td.ui-table-priority-6 {
                     display: table-cell;
                   }
                    .ulTest {
                      width:90%;
                      height:90%;
                   }
                }
                
              
        </style>
        <script>
        
        </script>
    </head>
    <body>
         <!-- Start of Four page -->
        <div data-role="page" id="jobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="jobStatusDetailsPageBackBtn" data-role="button" href="" data-transition="slide" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                 <h1 id="displayOrderIDValue"></h1>
            </header>
            <section data-role="content">
                <textarea id="mobileOrderInfo" readonly="readonly">

                </textarea><br/>
                <label><bold>Status</bold></label>
                <ul id="displayJobStatus" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
         
                <ul id="displayOrderIDDashNum" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
                <br/>
                <div id="myTable">
<!--                    <table data-role="table" id="order-table" data-mode="columntoggle" class="my-custom-class table-stroke">-->
                    <table data-role="table" id="order-table" data-mode="columntoggle"  class="my-custom-class table-stroke">    
	              <thead>
	                <tr>
                            <th>#</th>
                            <th data-priority="6">SqFt</th>
                            <th data-priority="4">T</th>
                            <th data-priority="1">Press</th>
                            <th data-priority="5">Cx</th>
                            <th data-priority="2">Info</th>
                            <th data-priority="3">Ship</th>
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
                
                <input type="hidden"  name="getPgaeRequestFrom"        id="getPgaeRequestFrom"  value="<?php echo $pageRequestFrom;?>" />
                
                <input type="hidden"  name="getOrderIDHidden"          id="getOrderIDHidden"    value="<?php echo $orderID;?>" />
                
                <input type="hidden"  name="getOrderJobStaus"          id="getOrderJobStaus" />
            
            </section>
<!--            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>-->

        </div>
        <!-- End of Four page -->
        
        <!-- Start of Five page -->
        <div data-role="page" id="orderItemJobStatusDetailsPage">
            <div data-role="header">
                <a id="orderItemJobStatusDetailsPageBackBtn" data-role="button" href="#jobStatusDetailsPage" data-transition="slide" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1 id="displayHeaderOrderIDDash"></h1>
            </div>
            <div data-role="content">
               
                <div id="displayOrderItemImage">
                    
                </div>
                <ul id="inspectionFrmLink" data-role="listview" data-divider-theme="b" data-inset="true">
                    
                </ul>

                <ul id="displayOrderIDDashNumJobStatus" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
                
                <br/><br/>


                <ul id="displayMobileProductBuild" data-role="listview" data-theme="d" data-divider-theme="b">
                   
                </ul>
                
                <br/><br/>
                
                <ul id="GalleryImages" class="gallery">
               </ul>
               <input type="hidden" name="galleryNotSet"    id="galleryNotSet"   />
                
            </div>
            
        </div>
        <!-- End of Five page -->
        
         <!-- Start of Six page -->
        <div data-role="page" id="mobileInspectionUploadDetailsPage">
              <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="mobileUploadDetailsPageBackBtn" data-role="button" data-transition="slide" href="#orderItemJobStatusDetailsPage" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1 id="displayMobileUploadHeaderOrderIDDash"></h1>
            </header>
            <section data-role="content">
                <h3 id="companyNameOrderIDDashNum"> </h3>
                <h3 id="t_Name"> </h3>
                <h3 id="qtyDisplay"> </h3>
                <h3 id="finalSizeDisplay"></h3>
                  <form name="mobileInspectionFrm" id="mobileInspectionFrm" >
                      <fieldset data-role="controlgroup">
                          <legend>Inspection Checklist:</legend>
                          <input class="role" type="checkbox" name="instruction" id="instruction" value="1">
                          <label for="instruction">Read the Order Instructions</label>
                          <input class="role" type="checkbox" name="qty" id="qty" value="1">
                          <label for="qty">Qty is Correct</label>
                          <input class="role" type="checkbox" name="size" id="size" value="1">
                          <label for="size">Size is Correct</label>
                          <input class="role" type="checkbox" name="color" id="color" value="1">
                          <label for="color">Color is Correct</label>
                          <input class="role" type="checkbox" name="finishing" id="finishing" value="1">
                          <label for="finishing">Finishing is Correct</label>
		      </fieldset>
                      <label id="error"></label>
                      <label for="textarea-18">Inspection Notes</label>        
                      <textarea cols="40" rows="10" name="inspectionNotes" id="inspectionNotes"></textarea>

                      <label for="select-choice-1" class="select">Your Name</label>
                      <select name="inspector" id="inspector">
                            <option value="">Choose a Name</option>
                            <option value="Michelle Zavala">Michelle Zavala</option>
                            <option value="Maria Nunez">Maria Nunez</option>
                            <option value="Carloss Grande">Carloss Grande</option>
                      </select>
                      <div id="pertest" class="qtybtnAdd">
                           <fieldset  data-role="controlgroup"  data-mini="true">
                                <a id="addLabelPrint" href="" data-role="button" data-iconpos="notext" data-icon="Add" data-theme="b">Add</a>
                           </fieldset>
                     </div>
                      <div id="pertest1" class="qtyInput">
                         <fieldset  data-role="controlgroup" class="inputTextWidth"  data-mini="true">
                                <a id="displayLabelNum" data-role="button"></a>
                          </fieldset>
                      </div>
                      <div id="pertest2" class="qtybtnMinus">
                           <fieldset  data-role="controlgroup"  data-mini="true">
                                <a id="minusLabelPrint" href="" data-role="button" data-iconpos="notext" data-icon="minus" data-theme="b">minus</a>
                           </fieldset>
                      </div>
                      <fieldset data-role="controlgroup" class="checkboxWidth">
                                <input type="checkbox" name="nb_PrintLabel" id="nb_PrintLabel" value="1"  />
                                <label for="nb_PrintLabel" action="selectAttribute" data="test">Label</label>
                      </fieldset>
                      <p>
                          <button type="submit"  name="submit" id="submit" value="submit-value" data-inline="true">Save</button>
<!--                          <a href="#" data-role="button" data-inline="true">Save</a>-->
                      </p>
                      <input type="hidden" name="inspectionOrderItemID"    id="inspectionOrderItemID"   />
                      <input type="hidden" name="companyNameInspectionFrm" id="companyNameInspectionFrm" />
                      <input type="hidden" name="inspectionDataHidden"     id="inspectionDataHidden" />
                      <input type="hidden" name="n_NumLabelsPrint"         id="n_NumLabelsPrint" value="2" />
            	</form>
                <form name="mobileUploadFrm" id="mobileUploadFrm" action="mobile/mobilecontroller/uploadFiles" method="post" data-ajax="false" enctype="multipart/form-data" class="hiddenfile">
                      <br/>
                      <ul id="info" data-role='listview'>
                      </ul><br/>
                      <div id="statusMessage">
                          <p>You haven't uploaded any photos yet.Please upload them</p>
                      </div>
                      <div id="divAddPhotosBtn">
                           <button id="chooseFile">Add Inspection Photos</button>
                      </div>
                      <div class="hiddenfile">
                          <input type="file" multiple  name="Filedata[]" id="chooseFile" accept="image/*" capture  />
                      </div>
                      <div id="divUploadBtn" class="hiddenfile">
                            <input type="submit" name="upload" data-theme="b" value="Upload"  /> 
                      </div>
                      <input type="hidden" name="mobileUploadPageRequest"  id="mobileUploadPageRequest"   />
                      <input type="hidden" name="mobileUploadOrderID"      id="mobileUploadOrderID"       />
                      
                      <input type="hidden" name="mobileUploadOrderItemID"  id="mobileUploadOrderItemID"   />
                      <input type="hidden" name="mobileUploadTypeOfChange" id="mobileUploadTypeOfChange"  />
                      <input type="hidden" name="mobileUploadJobStatus"    id="mobileUploadJobStatus"     />
                       
                      <input type="hidden" name="mobileUploadDashNum"      id="mobileUploadDashNum" />
                    
              </form>
            </section>
            
        </div> 
        <!-- End of Six page -->
        
        <!-- Start of Seven page -->
        <div data-role="page" id="editJobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="editJobStatusDetailsPageBackBtn" data-role="button" data-transition="slide"  data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
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
