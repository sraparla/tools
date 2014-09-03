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
