
<!-- Home page -->    
        <div data-role="page" id="home">
            <div data-role="header">
                 <h1> Find Job Status</h1>
            </div>
            <div data-role="content">
                <ul data-role="listview" data-divider-theme="b" data-inset="true">
                    <li data-theme="c">
                        <a href="#searchFromJobNumber" data-transition="slide">From Job Number</a>
                    </li>
                    <li data-theme="c">
                          <a href="#searchByDueDate" data-transition="slide">By Due Date</a>
                    </li>
                </ul>
                
            </div>
            <div data-role="footer">
                 <h4>&copy; Indy Imaging Inc. 2013</h4>
            </div>
<!--            <header data-role="header" data-id="toolbar" data-position="fixed">
                <h1> Find Job Status</h1>
            </header>-->
<!--            <section data-role="content">
                <ul data-role="listview" data-divider-theme="b" data-inset="true">
                    <li data-theme="c">
                        <a href="#searchFromJobNumber" data-transition="slide">From Job Number</a>
                    </li>
                    <li data-theme="c">
                          <a href="#searchByDueDate" data-transition="slide">By Due Date</a>
                    </li>
                </ul>
            </section>-->
<!--            <footer data-role="footer">
               <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>-->
        </div>
<!-- End of Home page -->      
<!-- Start of first page -->
        <div data-role="page" id="searchFromJobNumber">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a data-role="button" href="#home" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1> Find Job Status</h1>
            </header>
            <section data-role="content">
                <ul id="findJobStausFromOrderID" data-role="listview" data-inset="true" data-filter="true" data-filter-placeholder="From Job Number..." data-filter-theme="d"></ul>
                 <input type="hidden" name="mobileOrderIDHidden" id="mobileOrderIDHidden">
            </section>
            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>

        </div>
<!-- End of first page -->

<!-- Start of second page -->
        <div data-role="page" id="jobStatusDetailsPage">
            <header data-role="header" data-id="toolbar" data-position="fixed">
                <a data-role="button" href="#searchFromJobNumber" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                 <h1 id="displayOrderIDValue"></h1>
            </header>
            <section data-role="content">
                <textarea id="mobileOrderInfo" readonly="readonly">

                </textarea>
                <ul id="displayJobStatus" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
                <br/>
                <ul id="displayOrderIDDashNum" data-role="listview" data-divider-theme="b" data-inset="true">
                   
                </ul>
                <input type="hidden" name="getOrderIDHidden" id="getOrderIDHidden">
            </section>
            <footer data-role="footer">
                <h4>&copy; Indy Imaging Inc. 2013</h4>
            </footer>

        </div>
<!-- End of second page -->           
 
