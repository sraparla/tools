<?php

class builditemmodel extends CI_Model
{
    public function addDirectionData($buildItemID)
    {
         $this->db->select('ManCatSubCatDirections.t_Directions')
                 ->from('BuildItems')
                 ->join('ManCatSubCatDirections', 'BuildItems.kf_ManCatSubCatID = ManCatSubCatDirections.kf_ManCatSubCatID')
                 ->where('BuildItems.kp_BuildItemID',$buildItemID);
         
         $query  = $this->db->get();
         
         return $query->result_array();
        
    }        
    
}

?>
