<?php
/**
 * Description of shippersmodel
 *
 * @author sraparla
 */
class shipperModel extends CI_Model 
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
    }
    
    public function getShipperCompanyInfo()
    {
        $query = $this->db->query("SELECT t_Company,kp_ShipperID FROM basetables2.Shippers
                                   WHERE nb_Inactive is null and kp_ShipperID is not null");
        
        return $query->result_array();
        
    }
    
}

?>
