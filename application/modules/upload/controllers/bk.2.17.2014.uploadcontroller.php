<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class UploadController extends MX_Controller  
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('uploadmodel');
        
    }
    public function loadCustomerUploadView()
    {
        $this->load->view('customerUpload');
        //$this->load->view('bk.sportToolsView_1');
    }
    public function updateError($uploadID=null,$uploadErrCode=null,$uploadErrMsg=null)
    {
        $customerEmail = $this->input->get('customerEmail');
        
        $customerName = $this->input->get('customerName');
        
        $t_IndyContact = $this->input->get('t_IndyContact');
        
        $customerPhone = $this->input->get('customerPhone');
        
        
        
        $uploadErrCode = $this->input->get('uploadErrCode');
        $uploadErrMsg  = $this->input->get('uploadErrMsg');
        
        $uploadID      = $this->input->get('uploadFrmID');
        
        
        
        $data['t_UploadError'] =  "Error Msg: ".$uploadErrCode." ".$uploadErrMsg;
        //echo $uploadID."<br/>";
        
        
        //echo "uploadError: ".$data['t_uploadFileErr'];
        if($uploadID)
        {
            $this->uploadmodel->updateUploadTable($uploadID,$data);
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
        
        $to           = 'Developer <sraparla@indyimaging.com>, Robbie <robbie@indyimaging.com>';
       
     
        
        $subject     = "Error Uploading:";
        
        $body        = "<p><strong>UploadID:</strong> ".$uploadID."</p>";
        $body       .= "<p><strong>Customer Name:</strong> ".$customerName."<br/> <strong>Customer Email:</strong> ".$customerEmail."<br/><strong>Customer Phone:</strong>".$customerPhone."</p><br/><p><strong>Sales Contact:</strong> ".$t_IndyContact."</p>";
        
        $body       .= "<p><strong>Error Info:</strong> ".$uploadErrCode. "  ".$uploadErrMsg."</p>";
        
        $this->load->library('email',$config);
        $this->email->set_newline("\r\n");
        $this->email->from($from);
        $this->email->to($to); 
       
        $this->email->subject($subject); 
        $msg = $body;
        
        $this->email->message($msg); 
        $this->email->send();
      
        
    }        
    public function sendUploadEmail()
    {
        date_default_timezone_set('America/Indianapolis');
        
        $uploadID = $this->input->get('uploadFrmID');
        
        $data['nb_UploadComplete'] = "1";
        
        
        $today            = date("Y-m-d H:i:s", time());
        
        $data['ts_UploadComplete'] = $today;
        
        if($uploadID)
        {
            $this->uploadmodel->updateUploadTable($uploadID,$data);
        }  
        
        $id               = $this->input->get('id');
        
        $customerEmail    = $this->input->get('customerEmail');
        $customerName     = $this->input->get('customerName');
        $notesName        = $this->input->get('notesName');
        
        //log_message('info', "customerName: ".$customerName." email part: ".$customerEmail." nb_UploadComplete ".$data['nb_UploadComplete']);
        
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
        
        $to          ="${customerName}<${customerEmail}>,";
        //$to         .= 'Developer <sraparla@indyimaging.com>';
        //$to         .= 'Robbie <robbie@indyimaging.com>';
        
        $to          .= 'Indy Imaging Prepress <art@indyimaging.com>';
        $subject     = "IndyImaging Upload Confirmaiton";

        $body        = "<p>The following files have been uploaded:".$id."</p><br/>";
        
        $body       .= "<p><strong>Notes:</strong><br/> ".$notesName."</p>";
        
        $this->load->library('email',$config);
        $this->email->set_newline("\r\n");
        $this->email->from($from);
        $this->email->to($to); 
       
        $this->email->subject($subject); 
        $msg = $body;
        
        $this->email->message($msg); 
        $this->email->send();
        
        //echo $this->email->print_debugger();
        
    }
    
    public function submitUploadTblFrmInfo()
    {
        $t_Company = $this->input->post('t_Company');
        log_message('info', $t_Company.'The customer came here to upload submitUploadTblFrmInfo controller.');
        
        $uploadFrmData['t_Company']       = $this->input->post('t_Company');
        $uploadFrmData['t_Name']          = $this->input->post('t_Name');
        $uploadFrmData['t_Address']       = $this->input->post('t_Address');
        $uploadFrmData['t_City']          = $this->input->post('t_City');
        $uploadFrmData['t_State']         = $this->input->post('t_State');
        $uploadFrmData['t_Zip']           = $this->input->post('t_Zip');
        $uploadFrmData['t_Phone']         = $this->input->post('t_Phone');
        $uploadFrmData['t_Email']         = $this->input->post('t_Email');
        $uploadFrmData['t_IndyContact']   = $this->input->post('t_IndyContact');
        
        $uploadFrmData['t_Note']          = $this->input->post('notesHiddenVal');
        
        $today                            = date("Y-m-d H:i:s", time());
        
        $uploadFrmData['ts_CreateDate']   = $today;
        
        //print_r($uploadFrmData);
        
        // get the newly inserted uploadID
        $newInsertedUploadID             = $this->uploadmodel->insertUploadTable($uploadFrmData);
        
        echo json_encode($newInsertedUploadID);
    }
    
    public function uploadCustomerFiles()
    {
        log_message('info', 'The customer came here to upload controller.');
        
        echo Modules::run('uploadFiles/uploadfilescontroller/websiteUploadFiles');
    }        
   
   
}

    

?>
