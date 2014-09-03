<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class VsportToolsController extends MX_Controller
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('vsporttoolsmmodel');
        
        //$this->setSportsUploadPath = realpath(APPPATH);
        $this->setSportsUploadPath = realpath(APPPATH . '../../../lib/tomcat6/webapps/IndyUploader/resources/uploadData');
        
    }
    public function index()
    {
        $this->load->view('sportToolsView');
    }        
    public function getSportToolsData()
    {
        $result = $this->vsporttoolsmmodel->sportToolsDataTable();
        
        echo $result;
    }
    public function loadsizeCalculationView()
    {
        $this->load->view('sizeCalculation');
        
    }        
    public function loadSportToolsView()
    {
        $this->load->view('sportToolsView');
        //$this->load->view('bk.sportToolsView_1');
    }
    public function exportSportToolsData()
    {
        $timezone          = date_default_timezone_get();
        date_default_timezone_set('America/Indianapolis');

        $today             = date("Y-m-d H:i:s", time());
        //echo "jksds";
        $queryObj          = $this->vsporttoolsmmodel->getViewSportToolsColNames();
        //$fieldData   = $queryObj->field_data();
        $result_id         = $queryObj->result_id;
        $excelColumnsArray = array(); // -- getting the coloumn names
        
   
        ///--------getting the coloumn names and values ------
        while($fieldInfo             = $this->db->call_function('fetch_field',$result_id))
        {
            $excelColumnsArray[]  = $fieldInfo->name;  // -- getting the coloumn names
        } 
        //print_r($excelColumnsArray);
        //echo "<br/><br/>";
        $activity_results_values = array(); //--getting the coloumn values

        while($row = $this->db->call_function('fetch_row',$result_id))
        {
            $activity_results_values[] = $row;    // --getting the coloumn values

        }
        //print_r($activity_results_values);
        //echo "<br/><br/>";
        
        // Set the field delimiter as a tab for Excel
        $delimiter = "\t";

        // Set the End Of Line character to force a new row
        $eol = "\n";

        // Start the spreadsheet by creating the header row based on our columns
        $sheet = implode($delimiter, $excelColumnsArray) . $eol;

        foreach ($activity_results_values as $activity_values)
        {
            //// Create a row string for building each row
            $row = '';
            //// Loop through the columns to make columnar data that matches the header
            foreach ($excelColumnsArray as $name => $text)
            {
                //echo "<br/>".$name."<br/>";
                //echo "<br/>".$text."<br/>";
                $row .= $activity_values[$name] . $delimiter;
                //echo $row."<br/>";

            }
            // Pluck of the last tab and append a new line to the row
            $sheet .= trim($row, $delimiter) . $eol;
            //echo $sheet."<br/>";
        }
        // Create the download file name - adding the date to make it a little unique
        //$filename = 'Status' . date('Ymd') . '.xls';
        $filename = 'Status' .  $today . '.xls';

        // Send the appropriate response headers 
        header('Content-type: application/x-msdownload');
        header('Content-type: application/vnd.ms-excel');
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        /** 
        * Normally we would set our no-cache header here, but...
        * Internet Explorer cannot handle SSL download saves if no-cache is set 
        * anywhere. For most this would not be an issue, but if you are allowing
        * exports to Excel over SSL then this will bite you in the butt when your 
        * users are using IE
        */
        //header("Pragma: no-cache");
        header("Expires: 0");

        // Output the spreadsheet as a download
        print $sheet; exit;
    }        
    
    public function getPathUpload()
    {
         echo $this->setSportsUploadPath;
        
    }        
    public function sendSportToolsEmail()
    {
        date_default_timezone_set('America/Indianapolis');
        
        $today = date("Y-m-d H:i:s", time());
        
        //print_r($_GET);
        
        if($_GET['SDashNum'])
        {
            $OrderID_DashNum = $_GET['SDashNum'];
        }


        if($_GET['SIDnumber'])
        {
            $sportsIDnumber = $_GET['SIDnumber'];
        }

        if($_GET['id'])
        {
            $id = $_GET['id']; 


        }
        if($_GET['art'])
        {
            $art = $_GET['art'];


        }
        if($_GET['orderItemID'])
        {
            $orderItemID = $_GET['orderItemID'];


        }
        // set From Email Addresses :

        if($art == "Bridget Gehring")
        {
            $toAddress = "bgehring@sportg.com";
        }

        else if($art == "Rob Borders")
        {
            $toAddress = "rborders@sportg.com";
        }
        else if($art == "Theresa Harris")
        {
            $toAddress = "tharris@sportg.com";
        }
        else if($art == "Daniel King")
        {
            $toAddress = "dking@sportg.com";
        }
        else if($art == "Ryan Boak")
        {
            $toAddress = "ryan.boak@sportg.com";
        }
        else if($art == "Chana Watson")
        {
            $toAddress = "cwatson@sportg.com";
        }
        else if($art == "Tara Blackstone")
        {
            $toAddress = "tblackstone@sportg.com";
        }
        else if($art == "Preston Patterson")
        {
            $toAddress = "preston.patterson@sportg.com";
        }
        else if($art == "Robbie Gordon")
        {
            $toAddress = "robbie@indyimaging.com";
        }
        else if($art == "Siva")
        {
            $toAddress = "sraparla@indyimaging.com";
        }
        
        
        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.gmail.com',
            'smtp_port' => 465,
            'smtp_user' => 'noreply@indyimaging.com',
            'smtp_pass' => 'n0rEp1y',
            'mailtype'  => 'html', 
            'charset'   => 'iso-8859-1',
            'wordwrap' => TRUE
        );
        
        $from        = 'noreply<noreply@indyimaging.com>';
        $to          ="${art}<${toAddress}>,";
        
        //$to         .= 'Sport Team<sportart@indyimaging.com>';
        $to         .= 'Developer <sraparla@indyimaging.com>';
        
        $subject     = "Sport ID:". $sportsIDnumber."  , Indy ID:  ".$OrderID_DashNum;

        $body        = "<p>The following files have been uploaded:".$id."</p>";
        
        $this->load->library('email',$config);
        $this->email->set_newline("\r\n");
        $this->email->from($from);
        $this->email->to($to); 
       
        $this->email->subject($subject); 
        $msg = $body;
        
        $this->email->message($msg); 
        $this->email->send();
        
        $data['t_ArtContact']       = $art;
        $data['t_OiStatus']         = 'Art Received';
        $data['ti_UploadComplete']  = $today;
        echo Modules::run('orderItems/orderitemcontroller/updateOrderItemTbl',$orderItemID,$data);
        
    }        
    public function sportToolsFrmUpload()
    {
        //$updatefile = "uploadLog.txt";
        // HTTP headers for no cache etc
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");


        //$fh = fopen($updatefile, 'a') or die("can't open file");

        // Settings
        //$targetDir = ini_get("upload_tmp_dir") . DIRECTORY_SEPARATOR . "plupload";
        //$targetDir = 'uploads';
        
        //$targetDir = "../../../lib/tomcat6/webapps/IndyUploader/resources/uploadData";
        $targetDir = $this->setSportsUploadPath;
        //fwrite($fh, $targetDir."  <targetDir>\n");

        $cleanupTargetDir = true; // Remove old files
        $maxFileAge = 5 * 3600; // Temp file age in seconds

        //fwrite($fh, $cleanupTargetDir."  <cleanupTargetDir>\n");
        //fwrite($fh, $maxFileAge."  <maxFileAge>\n");

        // 5 minutes execution time
        @set_time_limit(2880 * 60);

        // Uncomment this one to fake upload time
        // usleep(5000);

        // Get parameters
        $chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
        $chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;
        $fileName = isset($_REQUEST["name"]) ? $_REQUEST["name"] : '';


        //fwrite($fh, $chunk."  <chunk>\n");
        $mainFolder = isset($_REQUEST["orderIDHidden"]) ? $_REQUEST["orderIDHidden"] : 'novalue';

        $subFolder = isset($_REQUEST["sportsOrderIDDashNumIDHidden"]) ? $_REQUEST["sportsOrderIDDashNumIDHidden"] : 'novalue';

        $artContactName = isset($_REQUEST["artContactName"]) ? $_REQUEST["artContactName"] : 'novalue';
        $orderItemStatus = isset($_REQUEST["orderItemStatus"]) ? $_REQUEST["orderItemStatus"] : 'novalue';

        //fwrite($fh, $mainFolder."  <orderIDHidden>\n");
        //fwrite($fh, $subFolder."  <sportsOrderIDDashNumIDHidden>\n");
        //fwrite($fh, $artContactName."  <artContactName>\n");
        //fwrite($fh, $orderItemStatus."  <orderItemStatus>\n");

        // Clean the fileName for security reasons
        $fileName = preg_replace('/[^\w\._]+/', '_', $fileName);

        //fwrite($fh, $fileName."  <fileName>\n");

        // Make sure the fileName is unique but only if chunking is disabled
        if ($chunks < 2 && file_exists($targetDir . DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR .$subFolder. DIRECTORY_SEPARATOR . $fileName)) {
                $ext = strrpos($fileName, '.');
                //fwrite($fh, $ext."  <position of the first occurence>\n");

                $fileName_a = substr($fileName, 0, $ext);
                //fwrite($fh, $fileName_a."  <starts at begining, length returned after position >\n");

                $fileName_b = substr($fileName, $ext);
                //fwrite($fh, $fileName_b."  <starts at position length returned >\n");

                $count = 1;

                $filenameingConvention =file_exists($targetDir . DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR .$subFolder.DIRECTORY_SEPARATOR. $fileName_a . '_' . $count . $fileName_b);//i wrote this line
                //fwrite($fh, $filenameingConvention."  <filenameingConvention >\n");

                while (file_exists($targetDir . DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR .$subFolder. DIRECTORY_SEPARATOR . $fileName_a . '_' . $count . $fileName_b))
                {
                    $count++;
                }


                $fileName = $fileName_a . '_' . $count . $fileName_b;
                //fwrite($fh, $fileName."  <fileName after making sure that file name is unique>\n");
        }

        $filePath = $targetDir . DIRECTORY_SEPARATOR.$mainFolder. DIRECTORY_SEPARATOR .$subFolder . DIRECTORY_SEPARATOR . $fileName;

        //fwrite($fh, $filePath."  <filePath>\n");

        // Create target dir
        if (!file_exists($targetDir.DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR.$subFolder))
        {
             //@mkdir($targetDir.DIRECTORY_SEPARATOR.$mainFolder);
             $rootFolder = $targetDir.DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR.$subFolder.DIRECTORY_SEPARATOR;
             if(!mkdir($rootFolder,0777,true))
             {
                //fwrite($fh, $rootFolder."  <Failed to create Folders>\n");
                 die("Failed to create Folders");

             }

            //fwrite($fh, $targetDir.DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR.$subFolder.DIRECTORY_SEPARATOR."  <inside file_exist targetDir>\n");
        }


        // Remove old temp files	
        if ($cleanupTargetDir && is_dir($targetDir.DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR.$subFolder) && ($dir = opendir($targetDir.DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR.$subFolder))) 
        {
                while (($file = readdir($dir)) !== false) 
                    {
                        $tmpfilePath = $targetDir . DIRECTORY_SEPARATOR.$mainFolder.DIRECTORY_SEPARATOR.$subFolder. DIRECTORY_SEPARATOR . $file;
                        //fwrite($fh, $tmpfilePath."  <tempfilepath - name>\n");

                        // Remove temp file if it is older than the max age and is not the current file
                        if (preg_match('/\.part$/', $file) && (filemtime($tmpfilePath) < time() - $maxFileAge) && ($tmpfilePath != "{$filePath}.part")) 
                        {
                                @unlink($tmpfilePath);
                                //fwrite($fh, $tmpfilePath."  <remove old file inside if condition >\n");
                        }
                    }

                closedir($dir);
        } 
        else
        {
            die('{"jsonrpc" : "2.0", "error" : {"code": 100, "message": "Failed to open temp directory."}, "id" : "id"}');
        }



        // Look for the content type header
        if (isset($_SERVER["HTTP_CONTENT_TYPE"]))
        {
            $contentType = $_SERVER["HTTP_CONTENT_TYPE"];
            //fwrite($fh, $contentType."  <http content type contentType>\n");
        }


        if (isset($_SERVER["CONTENT_TYPE"]))
        {
            $contentType = $_SERVER["CONTENT_TYPE"];
            //fwrite($fh, $contentType."  <just the content type>\n");
        }

        $whatisthis = $_FILES['file']['tmp_name'];
        //fwrite($fh, $whatisthis."  temporary file name>\n");

        $originalName = $_FILES['file']['name'];
        //fwrite($fh, $originalName."  <original file Name>\n");


        // Handle non multipart uploads older WebKit versions didn't support multipart in HTML5
        if (strpos($contentType, "multipart") !== false) 
        {
                if (isset($_FILES['file']['tmp_name']) && is_uploaded_file($_FILES['file']['tmp_name'])) 
                {
                        // Open temp file
                        $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");

                        //fwrite($fh, "{$filePath}.part"."  <Handle non multipart uploads:FILEPATH.PARTS>\n");

                        //fwrite($fh, $out."  <Handle non multipart uploads: OUT>\n");

                        if ($out) 
                        {
                                // Read binary input stream and append it to temp file
                                $in = fopen($_FILES['file']['tmp_name'], "rb");

                          //      fwrite($fh, $in."  <readbinary input stream>\n");

                                $whatisthisagain = $_FILES['file']['tmp_name'];
                            //    fwrite($fh, $whatisthisagain."  <again files array>\n");

                                if ($in) 
                                {
                                        while ($buff = fread($in, 4096))
                                        {
                                            fwrite($out, $buff);
                                            $whatisitwriting = fwrite($out, $buff);
                                //            fwrite($fh,  $whatisitwriting."  <writing something.>\n");
                                        }

                                } 
                                else
                                {
                                        die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}'); 
                                }

                                fclose($in);
                                fclose($out);
                                @unlink($_FILES['file']['tmp_name']);
                        } 
                        else
                        {
                            die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');
                        }

                } 
                else
                {
                   die('{"jsonrpc" : "2.0", "error" : {"code": 103, "message": "Failed to move uploaded file."}, "id" : "id"}'); 
                }

        } 
        else 
        {
                // Open temp file
                $dontknow = "{$filePath}.part";

                //fwrite($fh, $dontknow."  <dontknow: filepath.parts>\n");
                $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");


                //fwrite($fh, $out."  <Handle multipart uploads: OUT>\n");

                if ($out) 
                {
                        // Read binary input stream and append it to temp file
                        $in = fopen("php://input", "rb");

                        if ($in) 
                        {
                                while ($buff = fread($in, 4096))
                                        fwrite($out, $buff);
                        } 
                        else
                        {
                            die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}');
                        }


                        fclose($in);
                        fclose($out);
                } 
                else
                {
                    die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');

                }

        }

        // Check if file has been uploaded
        if (!$chunks || $chunk == $chunks - 1) 
        {
                // Strip the temp .part suffix off 
                rename("{$filePath}.part", $filePath);

                //fwrite($fh, "{$filePath}.part"."  <oldname>\n");

                //fwrite($fh, $filePath."  <newname>\n");
        }


        // Return JSON-RPC response
        die('{"jsonrpc" : "2.0", "result" : null, "id" : "id"}');

        
        
    }
}

?>
