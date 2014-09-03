<?php 

class EquipmentModel  extends CI_Model 
{
    public function getEquipmentByID($equipmentID)
    {
       
        
        $query = $this->db->get_where('Equipment',array('kp_EquipmentID'=>$equipmentID));
        
        return $query->row_array();
        
    }
    //put your code here
}

?>
