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
        
        
        <!--include the jQuery and jQuery Mobile javascript files -->
        <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
        <script type="text/javascript" charset="utf-8" src="jqueryMobile/jquery.mobile-1.3.1.js"></script>
        <script typr="text/javascript" charset="utf-8" src="js/mobileModuleJobStatus.js"></script>
    </head>
    <body>
        <div id="home" data-role="errorPage">
            <div data-role="header"> 
                <a  data-ajax="false" data-role="button" href="mobileOrderStatus" data-transition="slide" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left">Back</a>
                <h1>Error</h1>
            </div>
            <div data-role="content">
                <?php echo "plesase contact IT:  ".$msg; ?>
            </div>
        </div>
        
        
    </body>
    
</html>
