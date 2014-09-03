<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class employeeController extends MX_Controller 
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
        //session_start();
        $this->load->library('session');
        $this->load->model('employeemodel');
       
        
    }
    
    public function index()
    {
        
        if(!empty($_POST))
        {
            //echo sha1($this->input->post('employeePassword',true)) or die();
            
            $data['employeeEmail']    = $this->input->post('employeeEmail',true);
            $data['employeePassword'] = $this->input->post('employeePassword',true);
            
            $verify = $this->employeemodel->verify_user($this->input->post('employeeEmail',true),$this->input->post('employeePassword',true));
            
            if($verify !== false)
            {
                //person has an account
                $this->session->set_userdata('username', $this->input->post('employeeEmail',true));
                //$_SESSION['username'] = $this->input->post('employeeEmail',true);
                $this->load->view('welcome_message',$data);
                
            }
            else
            {
                 $data['userMessage'] = "yes";
                 $this->load->view('employeeview',$data);
                
                
            }    
            
           
            //echo $this->input->post('employeeEmail',true);
            //echo $this->input->post('employeePassword',true);
            
        }
        else
        {
            //$data['userMessage'] = $moduleName;
            $this->load->view('employeeview');
            
        }
        
    }
    public function getEmployeeUserName()
    {
        //print_r($this->employeemodel->employeeUserName());
        echo json_encode($this->employeemodel->employeeUserName());
    }
    
    public function logout()
    {
        $this->session->unset_userdata('username');
        $this->session->sess_destroy();
        redirect('');
        //$this->load->view('employeeview');
    }
    public function getEmployeeEmailAddressFromUserName($userName)
    {
         $employeeEmailAddressAry = $this->employeemodel->getEmployeeEmailAddress($userName);
         
         return $employeeEmailAddressAry;
        
    }        
   
}

?>
