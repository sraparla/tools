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
        
        <!--include the jQuery and jQuery Mobile javascript files -->
        <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
        
        <script src="js/jquery.validate.min.js"></script>
        <script src="js/additional-methods.min.js"></script>
        
        <script type="text/javascript" charset="utf-8" src="jqueryMobile/jquery.mobile-1.3.1.js"></script>
        
        <script src="js/clearForm.js"></script>
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
<!-- Start of third page -->
        <div data-role="page" id="editJobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a id="editJobStatusDetailsPageBackBtn" data-role="button" href="displayMobileStatusOptionPage"  data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
<!--                   href="#jobStatusDetailsPage" -->
                  
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

<!-- End of Third page -->

<!-- Start of fourth page -->
        <div data-role="page" id="statusUpdatePage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                 <a data-role="button" href="#home" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Home</a>
                 <h1 id="displayUpdateSuccess">Success</h1>
            </header>
            <section data-role="content">
                <p>The status has been updated succesfully</p>
            </section>
            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>

        </div>

<!-- End of Fourth page -->
           
    </body>
</html>
