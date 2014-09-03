<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class VsportJobsMfgController extends MX_Controller
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('vsportjobsmfgmodel');
    }
    
    public function index()
    {
        $data ['query'] = $this->vsportjobsmfgmodel->getAllVsportJobsMFGData();
        $this->load->view('sportJobsMFGView',$data);
    }
    public function getVsportJobsMFGData()
    {
        
        //$result = $this->vsportjobsmfgmodel->getAllVsportJobsMFGData();
        
        //echo json_encode($result);
        echo json_encode($this->vsportjobsmfgmodel->getAllVsportJobsMFGData());
        
    } 
}

?>
