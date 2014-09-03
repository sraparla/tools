<!DOCTYPE HTML>
<html>  
    <head>  
        <title>tools</title>
        <base href="<?php echo base_url(); ?>" />
        <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap.css" rel="stylesheet">  
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap-theme.min.css" rel="stylesheet"> 
        <!-- Data Table Bootstrap CSS  -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>extras/TableTools/media/css/TableTools.css">
    <!--    <link rel="stylesheet" href="<?php echo base_url(); ?>media/DT_bootstrap/DT_bootstrap.css">-->
        <link rel="stylesheet" href="<?php echo base_url(); ?>media/dtbs3/dataTables.bootstrap.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/datepicker.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>media/table.css">
        
        <!-- Load Queue widget CSS and jQuery -->
        <style type="text/css">@import url(js_plupload/jquery.plupload.queue/css/jquery.plupload.queue.css);</style>
        
        <script type="text/javascript">
            
        </script>
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
            body { padding-top: 60px; }
            #checkrow { top: 30px; }


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
                    <li><a href="sizeCalculation/index.html">Size Calculator</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
             </div>
        </div>
        <div id="container">
            <div id="table-wrapper" class="row hide"> 
                <div class="col-md-12 col-sm-12">
                    <div  style="margin-top: 15px">
                        <table class="table table-striped table-bordered table-hover" id="sportToolsTable">  
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
                        </table>
                    </div>
                </div>
            </div>
            <form method="POST" action="examples/dump.php" class="form-horizontal">
            <div id="sportUploadFormInfo" class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <div class="col-md-12 col-sm-12">
                            <label for="orderType" class="col-md-2 col-sm-2 control-label">Your Name</label>
                            <div class="col-md-4 col-sm-4">
                                <select id="orderType" name="orderType" class="form-control ">
                                    <option value=""></option>
                                    <option value="Bridget Gehring">Bridget Gehring</option>
                                    <option value="Rob Borders">Rob Borders</option>
                                    <option value="Theresa Harris">Theresa Harris</option>
                                    <option value="Daniel King">Daniel King</option>
                                    <option value="Ryan Boak">Ryan Boak</option>
                                    <option value="Chana Watson">Chana Watson</option>
                                    <option value="Tara Blackstone">Tara Blackstone</option>
                                    <option value="Preston Patterson">Preston Patterson</option>
                                </select>
                            </div>
                            <div class="col-md-4 col-sm-4 hide">
                                <label class="control-label">Upload Complete : 1999-11-30 00:00:00</label>
                            </div>
                            <div class="col-md-2 col-sm-2">
                                 <button type="Search" id="Search" class="btn btn-primary">Search</button>
                            </div>
                           
                         </div>     
                    </div>
                    <hr>
                    <div class="form-group">
                        <div class="col-md-12 col-sm-12">
                             <label class="control-label col-md-2 col-sm-2" for="orderStatus">Order Status:</label>
                             <div class="col-md-4 col-sm-4">
                                 <input type="text" class="form-control" name="orderStatus" id="orderStatus" readonly="readonly">
                             </div>
<!--                             <div class="col-md-6 col-sm-6">
                                 <div class="input-group">
                                     <span class="input-group-addon">Qty</span>
                                     <input type="text" class="form-control" id="quantity" readonly="readonly">
                                 </div>
                             </div>-->
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-sm-12">
                             <label class="control-label col-md-2 col-sm-2" for="sportID">SportID #:</label>
                             <div class="col-md-7 col-sm-7">
                                 <input type="text" class="form-control" name="sportID" id="sportID" readonly="readonly">
                             </div>
<!--                             <div class="col-md-3 col-sm-3">
                                 <div class="input-group">
                                     <span class="input-group-addon">Height</span>
                                     <input type="text" class="form-control" id="height" readonly="readonly">
                                 </div>
                             </div>-->
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 col-sm-12">
                             <label class="control-label col-md-2 col-sm-2" for="Description">Desc:</label>
                             <div class="col-md-6 col-sm-6">
                                 <textarea name="desc"  id="desc" rows="5" class="col-md-12 col-sm-12"></textarea>
                             </div>
                             <div class="col-md-3 col-sm-3">
                                 <div class="table-responsive">
                                     <table class="table table-bordered table-striped">
                                         <thead>
                                             <th>Qty</th>
                                             <th>Width</th>
                                             <th>Height</th>
                                         </thead>
                                          <tbody>
                                              <tr>
                                                  <td id="quantity">1234</td>
                                                  <td id="height">6734</td>
                                                  <td id="width">7234</td>
                                              </tr>
                                          </tbody>

                                         
                                     </table>
                                 </div>
<!--                                 <div class="input-group">
                                     <span class="input-group-addon">Width</span>
                                     <input type="text" class="form-control" id="width" readonly="readonly" value="1234">
                                 </div>-->
                             </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="form-group">
                        <div class="col-md-12 col-sm-12">
                            <label class="col-md-2 col-sm-2 control-label">Art Check In:</label>
                            <div class="col-md-2 col-sm-2">
                                <div class="checkbox">
                                    <label>
                                        <input id="artCheckIn" name="artCheckIn"  type="checkbox" value="1">
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                               <div class="input-group">
                                    <span class="input-group-addon">By:</span>
                                    <input type="text" class="form-control" id="checkInBy" readonly="readonly" value="1234">
                                </div>
                            </div>
                            <div class="col-md-5 col-sm-5">
                               <label class="control-label col-md-2 col-sm-2" for="date">Date:</label>
                                <div class="col-md-6 col-sm-6">
                                      <input type="text" class="form-control" name="date" id="date" readonly="readonly">
                                </div> 
                           </div>
                        </div>
                    </div>
                </div>
                <div id="uploader">
                    <p>You browser doesn't have Flash or HTML5 support.</p>
                    
                </div>
                <br style="clear: both" />
                 <div id="myModal" class="modal hide fade">
                 <div class="modal-header">
                     <h3>The Following files have been uploaded</h3>
                 </div>
                 <div class="modal-body">
                     <p id="uploadedFiles">
                        
                     </p>
                 </div>
                 <div class="modal-footer">
<!--                     <button id="okDone" class="btn btn-primary" >OK</button>-->
                     <a href="index.php" class="btn btn-primary" >OK</a>
                 </div>
             </div>
            </div>
            </form>  
        </div> <!-- Close for Container-->
       
            
            
      



        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="<?php echo base_url(); ?>media/js/orderOverview_jquery.dataTables.js"></script>
        <script src="<?php echo base_url(); ?>extras/TableTools/media/js/TableTools.js"></script>
        <script src="<?php echo base_url(); ?>extras/TableTools/media/js/ZeroClipboard.js"></script>
        <script src="<?php echo base_url(); ?>bootstrap3/dist/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url(); ?>js/jquery.validate.min.js"></script>
        <script src="<?php echo base_url(); ?>js/bootstrap-datepicker.js"></script>
        <script src="<?php echo base_url(); ?>media/dtbs3/dataTables.bootstrap.js"></script>
        
        <!-- Load plupload and all it's runtimes and finally the jQuery queue widget -->
        <script type="text/javascript" src="js_plupload/plupload.full.js"></script>
        <script type="text/javascript" src="js_plupload/jquery.plupload.queue/jquery.plupload.queue.js"></script>
        <script src="<?php echo base_url(); ?>js/vsportToolsModule.js"></script>

        <script>

        </script>
    </body>  
</html>  



