<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class UploadFilesController extends MX_Controller
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('uploadfilesmodel');
        
         $this->setWebsiteUploadPath = realpath(APPPATH . '../../../lib/tomcat6/webapps/IndyUploader/resources/uploadData');
        //Server image path
        //$this->orderRedoUploadPath = realpath(APPPATH . '../../images');
        
    }
    
    public function insertUploadFilesTblFrmInfo($data)
    {
        // get the newly inserted uploadID
        $newInsertedUploadFilesID               = $this->uploadfilesmodel->insertUploadFilesTable($data);
        
        return $newInsertedUploadID;
    }  
    public function websiteUploadFiles()
    {
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate");
        header("Cache-Control: post-check=0, pre-check=0", false);// this is for initial commit
        header("Pragma: no-cache");
        
        date_default_timezone_set('America/Indianapolis');
        
        $cleanupTargetDir = true; // Remove old files
        $maxFileAge = 5 * 3600; // Temp file age in seconds
        
        // 5 minutes execution time
        @set_time_limit(2880 * 60);
        
        
        // Get parameters
        $chunk     = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
        $chunks    = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;
        $fileName  = isset($_REQUEST["name"]) ? $_REQUEST["name"] : '';
        
        //$targetDir = $this->setWebsiteUploadPath;
        //$targetDir = realpath(APPPATH . '../../images');
        $targetDir = $this->setWebsiteUploadPath;
        //echo "FileSize: ".$_FILES["file"]["size"];
        //print_r($_REQUEST);
        
        // Clean the fileName for security reasons
        $fileName                        = preg_replace('/[^\w\._]+/', '_', $fileName);
        $fileSize                        = $_FILES["file"]["size"];
        
        $insertedUploadID                = $this->input->post('uploadFrmID');
        $today                           = date("Y-m-d H:i:s", time());
        
        $uploadFilesData['kf_Upload']    = $insertedUploadID;
        $uploadFilesData['t_Filename']   = $fileName;
        $uploadFilesData['t_FileSize']   = $fileSize;
        $uploadFilesData['ts_uploaded']  = $today;
        
        $uploadedFilesID                 = $this->insertUploadFilesTblFrmInfo($uploadFilesData);
        
//        $uploadFrmData['t_Company']      = $this->input->post('t_Company');
//        $uploadFrmData['t_Name']         = $this->input->post('t_Name');
//        $uploadFrmData['t_Address']      = $this->input->post('t_Address');
//        $uploadFrmData['t_City']         = $this->input->post('t_City');
//        $uploadFrmData['t_State']        = $this->input->post('t_State');
//        $uploadFrmData['t_Zip']          = $this->input->post('t_Zip');
//        $uploadFrmData['t_Phone']        = $this->input->post('t_Phone');
//        $uploadFrmData['t_Email']        = $this->input->post('t_Email');
//        $uploadFrmData['t_IndyContact']  = $this->input->post('t_IndyContact');
//        
//        $today = date("Y-m-d H:i:s", time());
//        
//        $uploadFrmData['ts_CreateDate']  = $today;
//        
//        $insertedUploadID= Modules::run('upload/uploadcontroller/insertUploadTblFrmInfo',$uploadFrmData);
       
       
       
        if ($chunks < 2 && file_exists($targetDir.DIRECTORY_SEPARATOR.$insertedUploadID.DIRECTORY_SEPARATOR.$fileName))
        {
            $ext = strrpos($fileName, '.');
            //fwrite($fh, $ext."  <position of the first occurence>\n");
        
            $fileName_a = substr($fileName, 0, $ext);
            //fwrite($fh, $fileName_a."  <starts at begining, length returned after position >\n");

            $fileName_b = substr($fileName, $ext);
            //fwrite($fh, $fileName_b."  <starts at position length returned >\n");

            $count = 1;
            

            while (file_exists($targetDir.DIRECTORY_SEPARATOR.$insertedUploadID.DIRECTORY_SEPARATOR.
                DIRECTORY_SEPARATOR.$fileName_a . '_' . $count . $fileName_b))
            {
                $count++;
            }
            $fileName = $fileName_a . '_' . $count . $fileName_b;
        }
        $filePath = $targetDir.DIRECTORY_SEPARATOR.$insertedUploadID.DIRECTORY_SEPARATOR.$fileName;

        if (!file_exists($targetDir.DIRECTORY_SEPARATOR.$insertedUploadID))
        {
             //@mkdir($targetDir.DIRECTORY_SEPARATOR.$mainFolder);
             $rootFolder = $targetDir.DIRECTORY_SEPARATOR.$insertedUploadID;
             if(!mkdir($rootFolder,0777,true))
             {
                //fwrite($fh, $rootFolder."  <Failed to create Folders>\n");
                 die("Failed to create Folders");

             }
        }
        
        // Remove old temp files	
        if ($cleanupTargetDir && is_dir($targetDir.DIRECTORY_SEPARATOR.$insertedUploadID) && ($dir = opendir($targetDir.DIRECTORY_SEPARATOR.$insertedUploadID))) 
        {
            while (($file = readdir($dir)) !== false) 
            {
                $tmpfilePath = $targetDir.DIRECTORY_SEPARATOR.$insertedUploadID.DIRECTORY_SEPARATOR.$file;
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
                                            //fwrite($out, $buff);
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
