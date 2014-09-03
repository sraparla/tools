<?php
class StateModel extends CI_Model 
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
    }
    public function getCountryInfoFromStatesTable()
    {
        $query = $this->db->query("SELECT t_CountryAbb,t_Country From basetables2.States
                                            GROUP BY t_Country ORDER BY t_Country DESC");
        
        return $query->result_array();
        
    }
    public function getStatesInfoFromStatesTable()
    {
        $query = $this->db->query("SELECT t_StateAbbreviation,t_StateName From basetables2.States
                                            WHERE t_Country = \"United States\" ORDER BY t_StateAbbreviation ASC");
        
        return $query->result_array();
        
    }
    public function getStatesCountryChange($countryAbb)
    {
        $query = $this->db->query("Select t_StateAbbreviation,t_StateName From basetables2.States
                                            WHERE t_CountryAbb = '$countryAbb' ORDER BY t_StateAbbreviation ASC");
        return $query->result_array();
        
    }
    
}
?>