<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class builditemcontroller extends MX_Controller 
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('builditemmodel');
    }
    public function getAddDirection($buildItemID)
    {
        echo json_encode($this->builditemmodel->addDirectionData($buildItemID));
        
    }        

}

?>
