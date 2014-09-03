<?php

class UploadFilesModel extends CI_Model
{
    public function __construct() 
    {
        parent::__construct();
        date_default_timezone_set('America/Indianapolis');
        
        // upload file path on .27 server
        //$this->setWebsiteUploadPath     = realpath(APPPATH . '../../../lib/tomcat6/webapps/IndyUploader/resources/uploadData');
        
        // upload file path on .82 server
        $this->setWebsiteUploadPath     = realpath(APPPATH . '../../../upload');
        
        $this->loadImagePath   = 'http://'.$_SERVER['SERVER_NAME'].'/images/Inventory/Zones/';
        
        $this->imageUploadPath = realpath(APPPATH . '../../images');
    }
    public function getUploadFilesDataFromUploadID($uploadID)
    {
        $query = $this->db->get_where('UploadFiles', array('kf_Upload' => $uploadID));
        
        return $query->result_array();
        
    }
    public function updateUploadFilesTblData($data,$uploadFilesID)
    {
        $result = $this->db->update('UploadFiles', $data, array('kp_UploadFiles'=>  $uploadFilesID));
        if(!$result)
        {
            return $this->db->_error_message(); 
        }
        else 
        {
            return $this->db->affected_rows();

        }
        
    }
    public function insertUploadFilesTblData($uploadFilesTblData)
    {
        $this->db->insert('UploadFiles', $uploadFilesTblData);
        return $this->db->insert_id();
        
    }
    public function doCustomFileUpload($uploadID)
    {
        if(isset($_FILES['file']) && $_FILES['file']['error'] == 0)
        {
            

            // checks and creates Inventory and Zones Folder
//            if(!is_dir($this->setWebsiteUploadPath.DIRECTORY_SEPARATOR.'CustomerUpload'.DIRECTORY_SEPARATOR.'UploadFiles'))
//            {
//                if(!mkdir($this->setWebsiteUploadPath.DIRECTORY_SEPARATOR.'CustomerUpload'.DIRECTORY_SEPARATOR.'UploadFiles',0777,TRUE))
//                {
//                    die("Failed to create Inventory and Zones Folders");
//                }        
//
//            }
            //$path = $this->setWebsiteUploadPath.DIRECTORY_SEPARATOR.'CustomerUpload'.DIRECTORY_SEPARATOR.'UploadFiles';
            $path = $this->setWebsiteUploadPath;
            //CHECK and create zone ID Folder
            if(!is_dir($path.DIRECTORY_SEPARATOR.$uploadID))
            {
                if(!mkdir($path.DIRECTORY_SEPARATOR.$uploadID,0777,TRUE))
                {
                    die("Failed to create CustomerUpload and UploadFiles Folders");
                }        

            }
            
            $fileName        = preg_replace('/[^\w\._]+/', '_', $_FILES['file']['name']);
            
            $fullPath        = $path.DIRECTORY_SEPARATOR.$uploadID;

           

            //$uploadPath = $fullPath . DIRECTORY_SEPARATOR . str_replace(" ", "_", $_FILES['file']['name']);
            $uploadPath      = $fullPath . DIRECTORY_SEPARATOR . $fileName;
            
            $tempPath        = $_FILES[ 'file' ][ 'tmp_name' ];

            if (file_exists($uploadPath))
            {
                $ext = strrpos($fileName, '.');
                //fwrite($fh, $ext."  <position of the first occurence>\n");

                $fileName_a = substr($fileName, 0, $ext);
                //fwrite($fh, $fileName_a."  <starts at begining, length returned after position >\n");

                $fileName_b = substr($fileName, $ext);
                //fwrite($fh, $fileName_b."  <starts at position length returned >\n");

                $count = 1;


                while (file_exists($fullPath.DIRECTORY_SEPARATOR.$fileName_a . '_' . $count . $fileName_b))
                {
                    $count++;
                }
                $fileName = $fileName_a . '_' . $count . $fileName_b;
            }
            $uploadPath = $fullPath.DIRECTORY_SEPARATOR.$fileName;
            
            if(move_uploaded_file($tempPath, $uploadPath))
            {
                //update invtZoneData
                $uploadFilesData['ts_uploaded']   = date("Y-m-d H:i:s", time());
                $result                           = $this->updateUploadFilesTblData($uploadFilesData, $uploadID);
                
                //$uploadData['nb_UploadComplete']  = "1";
                //$uploadData['ts_UploadComplete']  =  date("Y-m-d H:i:s", time());
                //echo "result ".$result."<br/>";

                $msg = array( 'answer' => 'File transfer completed and Update Done'.$result );

                //echo $msg;
                return $msg;
                 //$json = json_encode( $answer );
            }
        }  
        else
        {
            $erroMsg  = $this->codeToMessage($_FILES['file']['error']);
            $fileName = $_FILES['file']['name'];
            //send out an email
            $this->sendErrorEmailUploadFiles($uploadID, $fileName, $erroMsg);
            
        }    
        
    }
    
    public function codeToMessage($code)
    {
        switch ($code) { 
            case UPLOAD_ERR_INI_SIZE: 
                $message = "The uploaded file exceeds the upload_max_filesize directive in php.ini"; 
                break; 
            case UPLOAD_ERR_FORM_SIZE: 
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form"; 
                break; 
            case UPLOAD_ERR_PARTIAL: 
                $message = "The uploaded file was only partially uploaded"; 
                break; 
            case UPLOAD_ERR_NO_FILE: 
                $message = "No file was uploaded"; 
                break; 
            case UPLOAD_ERR_NO_TMP_DIR: 
                $message = "Missing a temporary folder"; 
                break; 
            case UPLOAD_ERR_CANT_WRITE: 
                $message = "Failed to write file to disk"; 
                break; 
            case UPLOAD_ERR_EXTENSION: 
                $message = "File upload stopped by extension"; 
                break; 

            default: 
                $message = "Unknown upload error"; 
                break; 
        } 
        return $message; 
        
    }
    
    public function sendErrorEmailUploadFiles($uploadID,$fileName,$errorMsg)
    {
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
        
        $to          = 'Developer <sraparla@indyimaging.com>,robbie@indyimaging.com';
        
        $subject     = "Error Uploading:";
        
        $body        = "<p><strong>UploadID:</strong> ".$uploadID."</p>";
        $body       .= "<p><strong>FileName Name:</strong> ".$fileName."<br/> <strong>Customer Email:</strong> ".$errorMsg."<br/></p>";
        
       
        
        $this->load->library('email',$config);
        $this->email->set_newline("\r\n");
        $this->email->from($from);
        $this->email->to($to); 
       
        $this->email->subject($subject); 
        $msg = $body;
        
        $this->email->message($msg); 
        $this->email->send();
    }  
}

?>
