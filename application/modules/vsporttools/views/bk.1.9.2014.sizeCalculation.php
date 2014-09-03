<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Size Calculator</title>
        <base href="<?php echo base_url(); ?>" />
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        
        <!--Bootstrap css version 2.1v -->
        <link href="media/css_bootstrap/bootstrap.css" rel="stylesheet" type="text/css">
        
        <link href="media/css_bootstrap/bootstrap-responsive.css" rel="stylesheet" type="text/css">
<!--        <link rel="stylesheet" href="css/bootstrap.min.css">-->
      <!--  <style>
            body {
                padding-top: 60px;
                padding-bottom: 40px;
            }
        </style> -->
<!--        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">-->
<!--        <link rel="stylesheet" href="css/main.css">-->
    </head>
    <body>

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->

        <div class="navbar navbar-inverse">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Tools</a>
                    <div class="nav-collapse">
                    <ul class="nav">
                      <li class="divider-vertical"></li>
                      <li><a href="/newTools">Upload</a> </li>
                      <li class="divider-vertical"></li>
                      <li class="active"><a href="sizeCalculator/">Size Calculator</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>

        <div class="container">
        	<div class="span9	">

            <!-- Main hero unit for a primary marketing message or call to action -->
            <div class="hero-unit">
            
            
    		<div class="controls"> 
            	<select id="choosetype" class="span2"> 
	                <option>Banner</option>
	                <option>PSV</option>
	                <option>Rigid</option>
					</select>
            </div>
				         
			<div class="row">
			   
			   <div class="span4">
		         <h4 id="enter_size">Enter Your Final Size</h4>
		         <form class="form-inline" id="size">
			          <div class="input-prepend">
				         <span class="add-on">Height</span>
				         <input name="height" class="span1" id="height" type="text">
				      </div>
				      <div class="input-prepend">
				         <span class="add-on">Width</span>
				         <input name="width" class="span1" id="width" type="text">
				      </div>
				      <output name="sqft" for="height width"></output>
			     </form>
		       </div>
		       
		       <div id="prosize" class="span3">
			     <h4>Production Size</h4>
		         <form class="form-inline" id="size">
			          <div class="input-prepend">
				         <span class="add-on">Height</span>
				         <input name="height" class="span1" id="pheight" type="text">
				      </div>
				      <div class="input-prepend">
				         <span class="add-on">Width</span>
				         <input name="width" class="span1" id="pwidth" type="text">
				      </div>
				      <output name="sqft" for="height width"></output>
			     </form>
		       </div>
		       
		       
			</div>	
			
			<div id="cutfile" class="row">
			   <div class="span4">
		         <h4>Production Size</h4>
		         <form class="form-inline" id="psize_psv">
			          <div class="input-prepend">
				         <span class="add-on">Height</span>
				         <input name="height" class="span1" id="psize_height" type="text">
				      </div>
				      <div class="input-prepend">
				         <span class="add-on">Width</span>
				         <input name="width" class="span1" id="psize_width" type="text">
				      </div>
				      <output name="sqft" for="height width"></output>
			     </form>
		       </div>
		       
		       <div class="span3">
		         <h4 id="cutfileheader" style="color:#990000">Cut File Size</h4>
		         <h4 id="cutfileheaderb" >Cut File Size</h4>
		         <form class="form-inline" id="csize_psv">
			          <div class="input-prepend">
				         <span class="add-on">Height</span>
				         <input name="height" class="span1" id="csize_height" type="text">
				      </div>
				      <div class="input-prepend">
				         <span class="add-on">Width</span>
				         <input name="width" class="span1" id="csize_width" type="text">
				      </div>
				      <output name="sqft" for="height width"></output>
			     </form>
		       </div>
		       
			</div>	
			
			


			   		<table id="banner" class="table table-striped table table-bordered">
				   			<tr>
					   			<th class="span1">Side</th>
					   			<th class="span2">Pocket Type</th>
					   			<th class="span2">Pocket Opening</th>
					   			<th class="span2">+ Bleed</th>
					   			<th style="text-align:center">+ White</th>
					   		</tr>
					   		<tr>
						   		<td><strong>Top</strong</td>
						   		<td>							   
							   	<div class="controls"> 
	   			                	<select id="toptype" class="span2"> 
		   			                	<option>Hem</option>
		   			                	<option>Pocket</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>						   		
						   		<div class="controls"> 
	   			                	<select id="topsize" class="span2"> 
		   			                	<option>2</option>
		   			                	<option>2.5</option>
		   			                	<option>3</option>
		   			                	<option>3.5</option>
		   			                	<option>4</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>
						   		<div class="controls"> 
	   			                	<select id="topbleed" class="span2"> 
		   			                	<option>.25</option>
		   			                	<option>.5</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td id="topwhite" style="text-align:center">1</td>
						   	</tr>
						   	<tr>
						   		<td><strong>Bottom</strong</td>
						   		<td>
							   	<div class="controls"> 
	   			                	<select id="bottomtype" class="span2"> 
		   			                	<option>Hem</option>
		   			                	<option>Pocket</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>						   		
						   		<div class="controls"> 
	   			                	<select id="bottomsize" class="span2"> 
		   			                	<option>2</option>
		   			                	<option>2.5</option>
		   			                	<option>3</option>
		   			                	<option>3.5</option>
		   			                	<option>4</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>
						   		<div class="controls"> 
	   			                	<select id="bottombleed" class="span2"> 
		   			                	<option>.25</option>
		   			                	<option>.5</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td id="bottomwhite" style="text-align:center" class="span1">1</td>

						   	</tr>
						   	<tr>
						   		<td><strong>Left</strong</td>
						   		<td>
							   	<div class="controls"> 
	   			                	<select id="lefttype" class="span2"> 
		   			                	<option>Hem</option>
		   			                	<option>Pocket</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>						   		
						   		<div class="controls"> 
	   			                	<select id="leftsize" class="span2"> 
		   			                	<option>2</option>
		   			                	<option>2.5</option>
		   			                	<option>3</option>
		   			                	<option>3.5</option>
		   			                	<option>4</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>
						   		<div class="controls"> 
	   			                	<select id="leftbleed" class="span2"> 
		   			                	<option>.25</option>
		   			                	<option>.5</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td id="leftwhite" style="text-align:center">1</td>
						   	</tr>
						   	<tr>
						   		<td><strong>Right</strong</td>
						   		<td>
							   	<div class="controls"> 
	   			                	<select id="righttype" class="span2"> 
		   			                	<option>Hem</option>
		   			                	<option>Pocket</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>						   		
						   		<div class="controls"> 
	   			                	<select id="rightsize" class="span2"> 
		   			                	<option>2</option>
		   			                	<option>2.5</option>
		   			                	<option>3</option>
		   			                	<option>3.5</option>
		   			                	<option>4</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td>
						   		<div class="controls"> 
	   			                	<select id= "rightbleed" class="span2"> 
		   			                	<option>.25</option>
		   			                	<option>.5</option>
		   			                </select>
		   			            </div>	
						   		</td>
						   		<td id="rightwhite" style="text-align:center">1</td>

						   	</tr>
																												
					</table>
					
					

					<table id="psv_rigid" class="table table-striped table-bordered">
				   			<tr>
					   			<th class="span1">Side</th>
					   			<th class="span2" style="text-align:center">+ Extra Bleed for Production</th>
					   		</tr>
					   		<tr>
						   		<td class="span1"><strong>Top</strong</td>
						   		<td id="topbleed_r" class="span2" style="text-align:center">.125</td>
						   	</tr>
						   	<tr>
						   		<td class="span1"><strong>Bottom</strong</td>
						   		<td id="bottombleed_r" class="span2" style="text-align:center">.125</td>
						   	</tr>
						   	<tr>
						   		<td class="span1"><strong>Left</strong</td>
						   		<td id="leftbleed_r" class="span2" style="text-align:center">.125</td>
						   	</tr>
						   	<tr>
						   		<td class="span1"><strong>Right</strong</td>
						   		<td id="rightbleed_r" class="span2" style="text-align:center">.125</td>	
						   	</tr>
																												
					</table>

					
							<h4 id="bottomtag" style="color:#990000">PSV: Cut File Size - is the "Final Size" you order from Indy</h4>
		
		</div>




        </div> <!-- /container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        
        <script type="text/javascript" charset="utf-8" src="media/js_bootstrap/bootstrap.js"></script>
        
<!--        <script src="js/vendor/bootstrap.min.js"></script>-->

        <script src="js/sizeCalculation.js"></script>
    </body>
</html>

