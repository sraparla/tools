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
    
    public function sendUploadEmail()
    {
        date_default_timezone_set('America/Indianapolis');
        
        $uploadID = $this->input->get('uploadFrmID');
        
        $data['nb_UploadComplete'] = "1";
        
        $today            = date("Y-m-d H:i:s", time());
        
        $data['ts_UploadComplete'] = $today;
        
        $this->uploadmodel->updateUploadTable($uploadID,$data);
        
        
        
        
        $id               = $this->input->get('id');
        
        $customerEmail    = $this->input->get('customerEmail');
        $customerName     = $this->input->get('customerName');
        $notesName        = $this->input->get('notesName');
        
        
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
        
        $to          = 'Indy Imaging Prepress <art@indyimaging.com>';
        
        //$to         .= 'Developer <sraparla@indyimaging.com>';
        //$to         .= 'Robbie <robbie@indyimaging.com>';
        
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
        
    }
    
    public function submitUploadTblFrmInfo()
    {
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
         echo Modules::run('uploadFiles/uploadfilescontroller/websiteUploadFiles');
    }        
   
   
}

    

?>
