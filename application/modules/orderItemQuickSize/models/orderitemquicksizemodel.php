<?php
class orderitemquicksizemodel extends CI_Model 
{
    public function getOrderItemQuickSizeData()
    {
        $query= $this->db->select('t_Category,t_Display, t_Value')
                         ->order_by("t_Category", "asc")
                         ->order_by("n_SortOrder", "asc")
                         ->get('OrderItemQuickSize');
    
        
        return $query->result_array();
        
    }
}

?>
