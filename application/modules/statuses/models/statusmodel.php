<?php

class StatusModel extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();
    }
    public function newStatusName()
    {
         $this->db
                ->select('t_StatusName')
                 ->from('Statuses')
                 ->where('nb_NotChoosableManually','1')
                 ->order_by('n_SortOrder asc'); 
        
        $query = $this->db->get();
         
        return $query->result_array();
        
    }
    
}

?>
