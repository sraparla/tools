<!DOCTYPE HTML>
<html>  
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>tools</title>
        <base href="<?php echo base_url(); ?>" />
         <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap.css" rel="stylesheet">  
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap-theme.min.css" rel="stylesheet"> 
        <!-- Data Table Bootstrap CSS  -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>extras/TableTools/media/css/TableTools.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>media/dtbs3/dataTables.bootstrap.css">
       
        <!-- Load Queue widget CSS and jQuery -->
        <style type="text/css">@import url(js_plupload/jquery.plupload.queue/css/jquery.plupload.queue.css);</style>
        
        <link rel="stylesheet" href="<?php echo base_url(); ?>media/table.css">
        
<!--        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>-->
<!--        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
        <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
        
        <script src="<?php echo base_url(); ?>media/js/orderOverview_jquery.dataTables.js"></script>
        
        
        <script src="<?php echo base_url(); ?>extras/TableTools/media/js/ZeroClipboard.js"></script>
        <script src="<?php echo base_url(); ?>extras/TableTools/media/js/TableTools.js"></script>
        <script src="<?php echo base_url(); ?>bootstrap3/dist/js/bootstrap.min.js"></script>
<!--        <script type="text/javascript" charset="utf-8" src="media/DT_bootstrap/DT_bootstrap.js"></script>-->
        <script src="<?php echo base_url(); ?>media/dtbs3/dataTables.bootstrap.js"></script>
        
        <script src="<?php echo base_url(); ?>js/jquery.validate.min.js"></script>
        
        
        <!-- Load plupload and all it's runtimes and finally the jQuery queue widget -->
        <script type="text/javascript" src="js_plupload/plupload.full.js"></script>
        <script type="text/javascript" src="js_plupload/jquery.plupload.queue/jquery.plupload.queue.js"></script>
        <script src="<?php echo base_url(); ?>js/vsportToolsModule.js"></script>

        <style type="text/css">
            #resetSearch {
                text-indent: -1000em;
                width: 16px;
                height: 16px;
                display: inline-block;
                background-repeat: no-repeat;
                position: relative;
                left: -20px; 
                top: 2px;
            }
            body { padding-top: 60px; }/*
            #checkrow { top: 30px; }*/
            
/*            .center-block {
              display: block;
              margin-left: auto;
              margin-right: auto;
            }*/
        </style>
    </head>  
    <body>
         <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
             <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Tools</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Upload</a></li>
                    <li><a href="sizeCalculator/">Size Calculator</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
             </div>
        </div>
        <div id="table-wrapper" class="row">
            <div class="col-md-12 col-sm-12">
                <div  style="margin-top: 15px;margin-left: 55px;margin-right: 55px">
                    <table class="table table-bordered table-hover" id="sportToolsTable">
                        <thead>
                            <tr>
                                <th>Item #</th>
                                <th>Indy ID #</th>
                                <th>Man #</th>
                                <th>Status</th>
                                <th>Job Due</th>
                                <th>Job Name</th>
                                <th>Project</th>
                                <th>PM</th>
                                <th>Art Needed</th>
                                <th>Sure Date</th>
                           </tr>  
                       </thead>  
                       <tbody>
                           <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                           </tr>
                      </tbody> 
                </table><br/>
                <form method="post" id="export-TableData">
                    <a href="vSportTools/vsporttoolscontroller/exportSportToolsData" id="exportTableData" class="btn btn-primary btn-lg">Export</a>
                    <input type="hidden" id="exportData" name="exportData" value="export">
                </form>
            </div>
        </div>
    </div>
    <form method="POST" action="examples/dump.php" class="form-horizontal">
    <div id="sportUploadFormInfo" class="row hide" style="margin-top:15px;">
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <label for="orderType" class="col-md-2 col-sm-2 control-label">Your Name</label>
                <div class="col-md-4 col-sm-4">
                    <select id="artContactName" name="artContactName" class="form-control ">
                        <option value=""></option>
                        <option value="Bridget Gehring">Bridget Gehring</option>
                        <option value="Rob Borders">Rob Borders</option>
                        <option value="Theresa Harris">Theresa Harris</option>
                        <option value="Daniel King">Daniel King</option>
                        <option value="Ryan Boak">Ryan Boak</option>
                        <option value="Chana Watson">Chana Watson</option>
                        <option value="Tara Blackstone">Tara Blackstone</option>
                        <option value="Preston Patterson">Preston Patterson</option>
                        <option value="Siva">Siva</option>
                        <option value="Robbie Gordon">Robbie Gordon</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-4">
                    <label id="timeStamp" class="control-label">Upload Complete : 1999-11-30 00:00:00</label>
                </div>
                <div class="col-md-2 col-sm-2">
                    <button type="Search" id="Search" class="btn btn-primary">Search</button>
                    <a href="index.php" id="newTab" target="_blank" class="btn btn-primary" >Open Tab</a>
                </div>
            </div>
        </div><hr/>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <label class="control-label col-md-2 col-sm-2" for="orderStatus">Order Status:</label>
                <div class="col-md-6 col-sm-6">
                    <input type="text" class="form-control" name="orderStatus" id="orderStatus" readonly="readonly" value="sivasuryateja raparla ravikanth raparla chendrashekar raparla">
                </div>
                <div class="col-md-2 col-sm-2">
                    <div class="input-group">
                        <span class="input-group-addon">Qty</span>
                        <input type="text" class="form-control" id="quantity" readonly="readonly" value="1234">
                    </div>
                </div>
            </div>
        </div><br/>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                 <label class="control-label col-md-2 col-sm-2" for="sportID">SportID #:</label>
                  <div class="col-md-6 col-sm-6">
                    <input type="text" class="form-control" name="sportID" id="sportID" readonly="readonly" value="sivasuryateja raparla ravikanth raparla chendrashekar raparla">
                  </div>

                  <div class="col-md-2 col-sm-2">
                    <div class="input-group">
                        <span class="input-group-addon">Height</span>
                        <input type="text" class="form-control" id="height" readonly="readonly" value="1234">
                    </div>
                  </div>
            </div>
        </div><br/>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                 <label class="control-label col-md-2 col-sm-2" for="Description">Desc:</label>
                 <div class="col-md-6 col-sm-6">
                     <textarea name="desc"  id="desc" rows="5" class="col-md-12 col-sm-12"></textarea>
                 </div>

                 <div class="col-md-2 col-sm-2">
                    <div class="input-group">
                        <span class="input-group-addon">Width</span>
                        <input type="text" class="form-control" id="width" readonly="readonly" value="1234">
                    </div>
                  </div>
            </div>
        </div><hr/>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-md-offset-1 col-sm-1">
                        <label class="col-md-5 col-sm-5 control-label" for="artCheckIn">Art Check In:</label>
                        <div class="col-md-7 col-sm-7">
                            <div class="checkbox">
                                <label><input id="artCheckIn" name="artCheckIn" class="" type="checkbox" readonly="readonly" value="1"></label>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3">
                        <div class="input-group">
                            <span class="input-group-addon">By:</span>
                            <input type="text" class="form-control" id="checkInBy" name="checkInBy" readonly="readonly" value="1234">
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3">
                        <label class="control-label col-md-4 col-sm-4" for="dateCheckedIn">Date:</label>
                        <div class="col-md-8 col-sm-8">
                            <input type="text" class="form-control" id="dateCheckedIn" name="dateCheckedIn" readonly="readonly">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add the extra clearfix for only the required viewport -->
        <div class="clearfix visible-xs"></div>

        <div class="row">
            <div class="col-md-offset-2 col-md-8 col-sm-8" style="margin-bottom:55px">
                <div  id="uploader">
                    <p>You browser doesn't have Flash or HTML5 support.</p>
                </div>
            </div>  
        </div>
        <div class="row">
            <div id="myModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
<!--                             <button id="closeMyModalTopBtn" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                             <h3 class="modal-title" id="myModalLabel">Please wait</h3>
                        </div>
                        <div class="modal-body">
                            <p id="message">
                                <img src="images/ajaxLoad/ajax-loader.gif" alt="Ajax Loading Animation" />&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Submitting Data...</strong></span>
                            </p>
                        </div>
                        <div class="modal-footer">
<!--                            <button id="closeMyModalBtn" type="button" class="btn btn-default">Close</button>-->
                            <button id="closeMyModalBtn" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden"   name="duplicateSubmit"  value="1">
    <input type="hidden"   name="t_ArtContactHidden"                 id="t_ArtContactHidden" > 
    <input type="hidden"   name="ti_UploadCompleteHidden"            id="ti_UploadCompleteHidden" > 
    <input type="hidden"   name="orderItemIDHidden"                  id="orderItemIDHidden" > 
    <input type="hidden"   name="purchaseOrderHidden"                id="purchaseOrderHidden" > 
    <input type="hidden"   name="sportIDHidden"                      id="sportIDHidden" >   
    <input type="hidden"   name="descriptionHidden"                  id="descriptionHidden" >         

    <input type="hidden"   name="artVerifiedInHidden"                id="artVerifiedInHidden">
    <input type="hidden"   name="statusHidden"                       id="statusHidden">
    <input type="hidden"   name="customerIDHidden"                   id="customerIDHidden">
    <input type="hidden"   name="quantityHidden"                     id="quantityHidden">
    <input type="hidden"   name="heightHidden"                       id="heightHidden">

    <input type="hidden"   name="widthHidden"                        id="widthHidden">
    <input type="hidden"   name="artReceivedProductionHidden"        id="artReceivedProductionHidden">
    <input type="hidden"   name="artReceivedByHidden"                id="artReceivedByHidden">
    <input type="hidden"   name="OrderIDHidden"                      id="OrderIDHidden">  
    <input type="hidden"   name="sportsOrderIDDashNumIDHidden"       id="sportsOrderIDDashNumIDHidden"> 

    <input type="hidden"   name=dateArtReceivedHidden"               id="dateArtReceivedHidden">      
    </form>  
    </body>  
</html>  



