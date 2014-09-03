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
       
     </body> 
</html>

 

