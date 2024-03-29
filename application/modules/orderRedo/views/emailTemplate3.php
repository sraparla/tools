<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title>Your Message Subject or Title</title>
	<style type="text/css">

		
		#outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */
		body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
		
		.ExternalClass {width:100%;} 
		.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing.  More on that: http://www.emailonacid.com/forum/viewthread/43/ */
		#backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
		
		img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;}
		a img {border:none;}
		.image_fix {display:block;}

		
		p {margin: 1em 0;}

		h1, h2, h3, h4, h5, h6 {color: black !important;}

		h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {color: blue !important;}

		h1 a:active, h2 a:active,  h3 a:active, h4 a:active, h5 a:active, h6 a:active {
			color: red !important; /* Preferably not the same color as the normal header link color.  There is limited support for psuedo classes in email clients, this was added just for good measure. */
		 }

		h1 a:visited, h2 a:visited,  h3 a:visited, h4 a:visited, h5 a:visited, h6 a:visited {
			color: purple !important; /* Preferably not the same color as the normal header link color. There is limited support for psuedo classes in email clients, this was added just for good measure. */
		}

		
		table td {border-collapse: collapse;}

		
		table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }

		
		@media only screen and (max-device-width: 480px) {

			
			a[href^="tel"], a[href^="sms"] {
						text-decoration: none;
						color: black; /* or whatever your want */
						pointer-events: none;
						cursor: default;
					}

			.mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
						text-decoration: default;
						color: orange !important; /* or whatever your want */
						pointer-events: auto;
						cursor: default;
					}
		}

	

		@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
			
			a[href^="tel"], a[href^="sms"] {
						text-decoration: none;
						color: blue; /* or whatever your want */
						pointer-events: none;
						cursor: default;
					}

			.mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
						text-decoration: default;
						color: orange !important;
						pointer-events: auto;
						cursor: default;
					}
		}

		@media only screen and (-webkit-min-device-pixel-ratio: 2) {
			
		}

		
		@media only screen and (-webkit-device-pixel-ratio:.75){
			
		}
		@media only screen and (-webkit-device-pixel-ratio:1){
			
		}
		@media only screen and (-webkit-device-pixel-ratio:1.5){
			
		}
		
	</style>

</head>
<body>
   
	
	<table cellpadding="10" cellspacing="10" border="0" id="backgroundTable">
             <tr>
                <td>
                   <?php echo $redoStatusMsg; ?>
                </td>
            </tr>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td width="300" valign="top"><?php echo $companyName; ?></td>
                            <td width="300" valign="top"><?php echo $requestedBy; ?></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                   <?php echo $generalMesg; ?>
                </td>
            </tr>
            <?php if($redoStatus != "Approved") 
            {?>
                 <tr>
                    <td>
                        <a href="<?php echo 'http://192.168.1.213/apps/redo/'. $orderRedoID ?>" target ="_blank" title="Styling Links" style="color: red; text-decoration: none;"> Click here to review the redo request for Order: <?php echo $oldOrderID ?> </a>

                    </td>
                 </tr>
            <?php
            
            }
            else if($redoStatus == "Approved" && !isset($newOrderID))
            {?>
                <tr>
                    <td>
                        <a href="<?php echo 'http://192.168.1.213/apps/redo/'. $orderRedoID ?>" target ="_blank" title="Styling Links" style="color: red; text-decoration: none;"> Click here to review the redo request for Order: <?php echo $oldOrderID ?> </a>

                    </td>
                 </tr>
            <?php    
           
            
            }    
            else if($redoStatus == "Approved" && isset($newOrderID))
            {?>
                  <tr>
                    <td>
                         <a href="<?php echo 'http://192.168.1.213/apps/redo/'. $orderRedoID ?>" target ="_blank" title="Styling Links" style="color: red; text-decoration: none;"> Click here to review the redo request for Order: <?php echo $oldOrderID ?> </a>

                    </td>
                 </tr>
                 <tr>
                    <td>
                         <a href="<?php echo 'http://192.168.1.213/apps/orders/'. $newOrderID ?>" target ="_blank" title="Styling Links" style="color: green; text-decoration: none;"> Click here to review the new redo Order: <?php echo $newOrderID ?> </a>
                    </td>
                 </tr>
                  <tr>
                    <td>
                         <a href='http://jasper.indyimaging.com:8080/jasperserver/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FindyImagingReports&reportUnit=%2Freports%2FindyImagingReports%2FRedoMainReport&j_username=joeuser&j_password=joeuser&OrderRedoID=<?php echo $orderRedoID; ?>&output=pdf' target="_blank"  title="Styling Links" style="color: blue; text-decoration: none;"> Click here to review the Redo Report</a>
                    </td>
                 </tr>
            <?php
            }?>
	</table>
	
</body>
</html>
