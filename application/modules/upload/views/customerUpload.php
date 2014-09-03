<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>

<title>Plupload - Queue widget example</title>
<base href="<?php echo base_url(); ?>" />
 <link rel="shortcut icon" href="images/ii_logo_fav.png">
 <!-- Bootstrap -->
 <link rel="stylesheet" href="bootstrap3/dist/css/bootstrap.css" rel="stylesheet">  
 <link rel="stylesheet" href="bootstrap3/dist/css/bootstrap-theme.min.css" rel="stylesheet">
     
<!-- <link rel="stylesheet" href="font-awesome/font-awesome.min.css">-->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
     

  
 <!-- include summernote css-->
 <link rel="stylesheet" href="summerNote/summernote.css" type="text/css"/>    
  
 <link rel="stylesheet" href="<?php echo base_url(); ?>js_plupload/jquery.plupload.queue/css/jquery.plupload.queue.css" type="text/css" media="screen" />

 <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
 
 <script src="js/jquery.maskedinput.js"></script>

 <script type="text/javascript" charset="utf-8" src="jquery-cookie-master/jquery.cookie.js"></script>
 <script src="bootstrap3/dist/js/bootstrap.min.js"></script>
 <script src="js/jquery.validate.min.js"></script>
<!-- production -->
<!--<script type="text/javascript" src="../../js/plupload.full.min.js"></script>
<script type="text/javascript" src="../../js/jquery.plupload.queue/jquery.plupload.queue.js"></script>-->

 <!-- Load plupload and all it's runtimes and finally the jQuery queue widget -->
 <script type="text/javascript" src="<?php echo base_url(); ?>js_plupload/plupload.full.min.js"></script>
 <script type="text/javascript" src="<?php echo base_url(); ?>js_plupload/jquery.plupload.queue/jquery.plupload.queue.js"></script>

<!-- include summernote js-->
 <script src="<?php echo base_url(); ?>summerNote/summernote.js"></script>
        
 <script src="<?php echo base_url(); ?>js/customerUpload.js"></script>
 
  <style type="text/css">
                /* Sticky footer styles-------------------------------------------------- */

          html,body
          {
              height:100%;
          }
          #customerUploadFrm .form-group{
              margin-bottom:5px;
          }
          #wrap
         {
             min-height: 100%;
         }

         #main
         {
             overflow:auto;
             padding-bottom:150px; /* this needs to be bigger than footer height*/
         }

         .footer
         {
             position: relative;
             margin-top: -155px; /* negative value of footer height */
             height: 75px;
             clear:both;
             padding-top:20px;
             color:#fff;
         }



            /* Custom page CSS
            -------------------------------------------------- */
            /* Not required for template or sticky footer method. */

/*                .container {
              width: auto;
              max-width: 680px;
              padding: 0 15px;
            }
            .container .text-muted {
              margin: 20px 0;
            }*/
     </style>
     <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
</head>
<body>
         <!-- Wrap all page content here -->
        <div id="wrap">
              <div id="main" class="container clear-top">
                    <!--Form start  -->
                    <form name="customerUploadFrm" id="customerUploadFrm" class="form-horizontal" role="form">
<!--                        <div class="row">
                            <div class="col-md-2 col-md-offset-2">
                                <p><img src="images/uploadImage.png" alt="uploader" height="80" width="80"></p>
                            </div>
                            <div class="col-md-8">
                                <h2 class="text-center">SEND US YOUR FILES</h2>
                            </div>
                        </div>
                        <hr />-->
                        <div id="customerUploadFrmContent" class="row">
                            <div class="col-sm-5">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Company</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" name="t_Company" id="t_Company">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Name</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" name="t_Name" id="t_Name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Address</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" name="t_Address" id="t_Address">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">City</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" name="t_City" id="t_City">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">State</label>
                                    <div class="col-sm-8">
                                        <select class="form-control" name="t_State" id="t_State">
                                            
                                        </select>
                                        <!--<input type="text" class="form-control" name="t_State" id="t_State">-->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Zip</label>
                                    <div class="col-sm-4">
                                         <input type="text" class="form-control" name="t_Zip" id="t_Zip">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Phone</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" name="t_Phone" id="t_Phone">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Email</label>
                                    <div class="col-sm-8">
                                        <input type="Email" class="form-control" name="t_Email" id="t_Email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">Indy Contact</label>
                                    <div class="col-sm-8">
                                        <select class="form-control" name="t_IndyContact" id="t_IndyContact">
                                            <option value="Any One">Any One</option>
                                            <option value="Jason Wilson">Jason Wilson</option>
                                            <option value="Chris Neilson">Chris Neilson</option>
                                            <option value="Steve Kendall">Steve Kendall</option>
                                            <option value="Don Berger">Don Berger</option>
                                            <option value="Jason Taylor">Jason Taylor</option>
                                            <option value="Will Fields">Will Fields</option>
                                            <option value="Chris Bland">Chris Bland</option>
                                            <option value="Wayne Willis">Wayne Willis</option>
                                            <option value="Dave Tegmeyer">Dave Tegmeyer</option>
                                            <option value="Rue Bennet">Rue Bennet</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-7">
                                 <div  id="uploader">
                                    <p>You browser doesn't have Flash or HTML5 support.</p>
                                 </div>
                                 <div id="estTimeLeft" class="hide">
                                        <div class="well text-center">
                                             <p class="text-muted" style="color:#0A0A0A;font: normal 16px sans-serif;">Estimated time Left (All Files):0 min 0 sec</p>
                                        </div>
                                 </div>
<!--                             <div id="summernote"></div>-->

        <!--                        <textarea class="form-control" rows="10" name="t_Notes" placeholder="New Version of Summernote goes here it should be the same heights as the form"></textarea>
                            -->
                            </div>
                        </div>
                        <hr /> 

                    <div class="col-sm-12">
                        <div id="summernote"></div> 
<!--                        <div  id="uploader">
                            <p>You browser doesn't have Flash or HTML5 support.</p>
                        </div>-->
        <!--                <textarea class="form-control" rows="10" placeholder="PlUpload 2.1  http://www.plupload.com/examples/"></textarea>-->
                    </div><br/>
                    <div id="estTimeLeft" class="col-sm-12 hide">
                        <div class="well text-center">
                             <p class="text-muted" style="color:#0A0A0A;font: normal 16px sans-serif;">Estimated time Left (All Files):0 min 0 sec</p>
                        </div>
                    </div>
<!--                    <div class="well">
                       
                            <div class="container text-center">
                              
                            </div>
                    </div>    -->
<!--                    <div class="col-md-12 footer" style="background-color:#c2c2c2">
                         <div class="container text-center">
                             <p class="text-muted credit" style="color:#0A0A0A">Esimated time Left (All Files):</p>
                         </div>
                    </div>    -->
                        <input type="hidden" name ="uploadFrmSubmit" id="uploadFrmSubmit" />
                        <input type="hidden" name ="uploadFrmID"     id="uploadFrmID" />
                        <input type="hidden" name="notesHiddenVal"   id="notesHiddenVal" />
                        <input type="hidden" name="urlPath"          id="urlPath" />
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
                    </form>

                </div>
        </div>
<!--         <footer class="footer hide" style="background-color:#c2c2c2">
              <div class="container text-center">
                <p class="text-muted" style="color:#0A0A0A;font: normal 16px sans-serif;">Estimated time Left (All Files):0 min 0 sec</p>
              </div>
         </footer>-->


    </body>
</html>
