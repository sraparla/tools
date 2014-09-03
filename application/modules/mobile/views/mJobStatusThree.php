<!-- Start of Third page -->
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
<!-- End of Third page -->           
 