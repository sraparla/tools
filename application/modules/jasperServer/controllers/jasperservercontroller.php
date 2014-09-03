<?php //if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class JasperServerController extends MX_Controller
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('jasperservermodel');
    }
    public function index()
    {
        echo "hi1<br/>";
        echo realpath(APPPATH)."<br/>";
        echo realpath(APPPATH . '/libraries/NuSOAP/lib/nusoap')."<br/>";
    }
    public function message($to = 'World')
    {
		echo "Hello {$to}!".PHP_EOL;
               
    }
    public function scheduleReportSendEmail($emailData=null)
    {
        // m for leading zeros like 01
        // d for leading zeros like 01
        // Y for full representation of Year like 2013
        date_default_timezone_set('America/Indianapolis');
        
        $currentDate  = date("Y-m-d");
        $todayHoliday = Modules::run('holiday/holidaycontroller/getAllHolidayList',$currentDate);
        //echo $todayHoliday;
        if($todayHoliday)
        {
            exit;
        }
        
        $emailData['emailSubject']    = "Schedule Report ".date('m-d-Y');
        $emailSubject                 =  $emailData['emailSubject'];
        $emailData['blindCopy']       = "robbie@indyimaging.com";
        $empEmail                     =  $emailData['blindCopy'];
      
        //print_r($emailData);
        
        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.gmail.com',
            'smtp_port' => 465,
            'smtp_user' => 'robbie@indyimaging.com',
            'smtp_pass' => 'mouse769',
            'mailtype'  => 'html', 
            'charset'   => 'iso-8859-1',
            'wordwrap' => TRUE
        );
        
        $this->load->library('email',$config);
        $this->email->set_newline("\r\n");
        $this->email->from('robbie@indyimaging.com');
        $this->email->to('frank.hancock@sportg.com,david.samsel@indyimaging.com,david.lowhorn@sportg.com,bill.summeier@sportg.com'); 
        $this->email->bcc($empEmail); 
        //$this->email->bcc('them@their-example.com'); 
        
        
        $this->email->subject($emailSubject);
        
        //$data['generalMesg'] = "This has been updated on ".date('m/Y/d, g:i:s a').". Please review the below link";
        
        $data['generalMesg'] = "Here is the schedule for today.<br/>Robbie";
       
//        $data['companyName']    = $emailData['companyName'];
//        $data['requestedBy']    = $emailData['requestedBy'];
//            
//        $data['oldOrderID']     = $emailData['oldOrderID'];
//        $data['orderRedoID']    = $emailData['orderRedoID'];
//        $data['redoStatus']     = $emailData['redoStatus'];
//        $data['redoStatusMsg']  = "<strong>Status: </strong>".$emailData['redoStatus'];
        
        //$data['updatedTime']    =  date('Y-m-d, H:i:s');
//        if($emailData['redoStatus'] == "Approved" && isset($emailData['newOrderID']))
//        {
//            $data['newOrderID']  = $emailData['newOrderID'];
//        }  
       
        
        //$msg = $this->load->view('emailTemplate3',$data, true);
        
        $msg = $data['generalMesg'];
        $this->email->message($msg); 
        
        $this->email->attach('/var/www/html/jasperSoap/scheduleReport/SCHEDULE.xls');
        //$this->email->attach('/Applications/MAMP/htdocs/jasperSoap/scheduleReport/SCHEDULE.XLS');
        $this->email->send();

        //echo $this->email->print_debugger();
        
    }
    
    
    
    
    public function scheduleReportSendEmailTest($emailData=null)
    {
        // m for leading zeros like 01
        // d for leading zeros like 01
        // Y for full representation of Year like 2013
        date_default_timezone_set('America/Indianapolis');
        $currentDate  = date("Y-m-d");
        $todayHoliday = Modules::run('holiday/holidaycontroller/getAllHolidayList',$currentDate);
        //echo $todayHoliday;
        if($todayHoliday)
        {
            exit;
        }    
        $emailData['emailSubject']    = "Schedule Report ".date('m-d-Y');
        $emailSubject                 =  $emailData['emailSubject'];
        $emailData['blindCopy']       = "robbie@indyimaging.com";
        $empEmail                     =  $emailData['blindCopy'];
      
        //print_r($emailData);
        
        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.gmail.com',
            'smtp_port' => 465,
            'smtp_user' => 'robbie@indyimaging.com',
            'smtp_pass' => 'mouse769',
            'mailtype'  => 'html', 
            'charset'   => 'iso-8859-1',
            'wordwrap' => TRUE
        );
        
        $this->load->library('email',$config);
        $this->email->set_newline("\r\n");
        $this->email->from('robbie@indyimaging.com');
        $this->email->to('sraparla@indyimaging.com,raparlateja@gmail.com,brian.seybert@indyimaging.com'); 
        $this->email->bcc($empEmail); 
        //$this->email->bcc('them@their-example.com'); 
        
        
        $this->email->subject($emailSubject);
        
        //$data['generalMesg'] = "This has been updated on ".date('m/Y/d, g:i:s a').". Please review the below link";
        
        $data['generalMesg'] = "Here is the schedule for today.<br/>Robbie";
       
//        $data['companyName']    = $emailData['companyName'];
//        $data['requestedBy']    = $emailData['requestedBy'];
//            
//        $data['oldOrderID']     = $emailData['oldOrderID'];
//        $data['orderRedoID']    = $emailData['orderRedoID'];
//        $data['redoStatus']     = $emailData['redoStatus'];
//        $data['redoStatusMsg']  = "<strong>Status: </strong>".$emailData['redoStatus'];
        
        //$data['updatedTime']    =  date('Y-m-d, H:i:s');
//        if($emailData['redoStatus'] == "Approved" && isset($emailData['newOrderID']))
//        {
//            $data['newOrderID']  = $emailData['newOrderID'];
//        }  
       
        
        //$msg = $this->load->view('emailTemplate3',$data, true);
        
        $msg = $data['generalMesg'];
        $this->email->message($msg); 
        
        $this->email->attach('/var/www/html/jasperSoap/scheduleReport/SCHEDULE.xls');
        //$this->email->attach('/Applications/MAMP/htdocs/jasperSoap/scheduleReport/SCHEDULE.XLS');
        $this->email->send();

        //echo $this->email->print_debugger();
        
    }   
    
    
    
    
}

?>
