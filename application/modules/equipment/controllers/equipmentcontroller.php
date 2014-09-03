<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class EquipmentController extends MX_Controller  
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('equipmentmodel');
        
    }
    public function getEquipmentData($equipmentID)
    {
        $row                 = $this->equipmentmodel->getEquipmentByID($equipmentID);
        if(!empty($row))
        {
            $equipmentName   = $row['t_EquipmentName'];
            echo $equipmentName;
            
        }   
    }
}

?>
