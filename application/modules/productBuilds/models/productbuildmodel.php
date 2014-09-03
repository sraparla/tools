<?php

class ProductBuildModel extends CI_Model 
{
    public function getProductBuildItemByID($productBuildID)
    {
        $query = $this->db->get_where('ProductBuilds',array('kp_ProductBuildID'=>$productBuildID));
        
        return $query->row_array();  
    }
    public function getAllProductBuild()
    {
        $query = $this->db->get('mytable');
        
        return $query->result_array();
        
    }
    public function getProductBuildCategories()
    {
        $this->db->SELECT('DISTINCT(t_Category)',false)
                 ->from('ProductBuilds')
                 ->order_by("t_Category", "asc");
        
        $query = $this->db->get();
         
        return $query->result_array();
    }
    public function getProductBuildNameFromCategory($categoryName)
    {
        $this->db->SELECT('DISTINCT(t_Category),kp_ProductBuildID,t_Name',false)
                 ->from('ProductBuilds')
                 ->where('t_Category',$categoryName)
                 ->where('nb_Inactive',null)
                 ->order_by("t_Name", "asc");
        
        $query = $this->db->get();
         
        return $query->result_array();
        
    }        
   
}

?>
