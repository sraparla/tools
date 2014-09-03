<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class EquipmentModeController extends MX_Controller  
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('equipmentmodemodel');
    }
    public function getEquipmentModeData($equipmentModeID)
    {
        $row               = $this->equipmentmodemodel->getEquipmentModeByID($equipmentModeID);
        if(!empty($row))
        {
            $equipmentModeName = $row['t_Name'];
            echo $equipmentModeName;
            
        }    
       
        //echo $row['t_Name'];  
    } 
}

?>
