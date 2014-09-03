<!-- Start of Four page -->
        <div data-role="page" id="editJobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="editJobStatusDetailsPageBackBtn" data-role="button" href="#jobStatusDetailsPage" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1 id="displayFormJobNumber"></h1>
            </header>
            <section data-role="content">
                <form name="statusChangeForm" id="statusChangeForm" method="post" action="mobile/mobileController/submitMobileStatusChange">
                    <label for="currentStatus">Current Status:</label>
                
                    <input type="text" name="currentStatus" id="currentStatus">
                
                    <label for="newStatus">New Status:</label>
                
                    <select name="newStatus" id="newStatus">
                        <option value="">Choose one..</option>
                        <option value="swathi">swathi</option>
                        <option value="bunny">bunny</option>
                        <option value="chendu">chendu</option>
                    </select>
                
                    <br/><br/>
                    <input id="userName" name="userName" autocomplete="off" placeholder="Type Employee Name...">
                    <ul id="suggestions" name="suggestions" data-role="listview" data-inset="true"></ul>
                    <br/><br/>
               
                    <label name="notes" id="notes">Notes:</label>

                    <textarea name="notesArea" id="notesArea"></textarea>
                    <br/>
                    <input type="hidden" name="statusChangeRequestHidden" id="statusChangeRequestHidden">
                    
                    <input type="hidden" name="orderItemIDHidden" id="orderItemIDHidden">
                    
                    <input type="hidden" name="orderIDHidden" id="orderIDHidden">
                    
                    <button type="submit" data-theme="b" name="submit" id="submit" value="submit-value">Submit</button>
                    
                </form>
                
            </section>
            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>

        </div>

<!-- End of Four page -->   
 