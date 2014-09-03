<?php
class vsporttoolsmmodel extends CI_Model 
{
    public function __construct() 
    {
        
    }        
    public function sportToolsDataTable()
    {
        //additional fields
        //t_Structure,nb_ArtReceivedProduction,
        //n_Quantity,n_HeightInInches,n_WidthInInches,
        //t_ArtReceivedBy,ti_UploadComplete,t_ArtContact,
        //kp_OrderItemID,d_ArtReceived
        $this->datatables->select('`Item#`,IndyID,`Man#`,Status, 
                                   JobDue,JobName,Project,PM,ArtNeeded,
                                   SureDate,t_Structure,nb_ArtReceivedProduction,n_Quantity,
                                   n_HeightInInches,n_WidthInInches,t_ArtReceivedBy,ti_UploadComplete,
                                   t_ArtContact,kp_OrderItemID,d_ArtReceived',false)
                         ->from('vSportTools');
                       
        return $this->datatables->generate();
        
    }
    public function getViewSportToolsColNames()
    {
        $query = $this->db->query('SELECT * FROM vSportTools'); 
        
        return $query;
        //return $query->list_fields();
        
    }
    public function getViewSportToolsColData()
    {
        $query = $this->db->query('SELECT * FROM vSportTools'); 
        
        //return $query;
        return $query->field_data();
        
    } 
}

?>
