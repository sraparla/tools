<?php

class EquipmentModeModel extends CI_Model  
{
    public function getEquipmentModeByID($equipmentModeID)
    {
        $query = $this->db->get_where('EquipmentModes',array('kp_EquipmentModeID'=>$equipmentModeID));
        return $query->row_array(); 
            
        
           
        
    }
}

?>
