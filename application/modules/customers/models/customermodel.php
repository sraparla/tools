<?php

class CustomerModel extends CI_Model 
{
    //put your code here
    public function __construct() 
    {
        parent::__construct();
    }
    public function getCustomerIDCompanyQBCityQBStateData()
    {
        $query = $this->db->query('SELECT Customers.kp_CustomerID,
                                   ifnull(Customers.t_CustCompany,"No Data") as t_CustCompany, 
                                   ifnull(Customers.t_QBCity,"No Data") as t_QBCity,
                                   ifnull(Customers.t_QBState,"No Data") as t_QBState
                                   FROM Customers
                                   Where ISNULL(nb_Inactive) or nb_Inactive = 0
                                   ORDER BY Customers.t_CustCompany
                                   ');
        
        return  $query->result_array();
        
    }
    public function getCustomerIDCompanyQBCityQBStateDataTable()
    {
       $staticWhere =  "(Customers.nb_Inactive is null || Customers.nb_Inactive = 0) ";
        
        $this->datatables->select('Customers.kp_CustomerID,
                                   ifnull(Customers.t_CustCompany,"No Data") as t_CustCompany, 
                                   ifnull(Customers.t_QBCity,"No Data") as t_QBCity,
                                   ifnull(Customers.t_QBState,"No Data") as t_QBState,
                                   ifnull(Customers.kf_EmployeeID_Sales,"No Data") as EmployeeID_Sales',false)
                
                         ->from('Customers')
                         ->where($staticWhere);
        
        return $this->datatables->generate();
    }        
    public function getCustomerID($orderID)
    {
        $query = $this->db->query("Select kf_CustomerID
                        from basetables2.Orders 
                        WHERE kp_OrderID = '$orderID'");
        
        return  $query->row();
        
    }
    public function getCustomerDataByID($customerID)
    {
        $query = $this->db->get_where('Customers', array('kp_CustomerID' => $customerID));
        
        return $query->row_array();
    }
    public function getCustomerDataFromQuickBookCustID($qb_CustID)
    {
        $query = $this->db->get_where('Customers', array('t_QBCustID' => $qb_CustID));
        
        return $query->row_array();
        
    }    
    public function updateCustomerTable($customerID,$data)
    {
        $this->db->where('kp_CustomerID', $customerID);
        $this->db->update('Customers', $data); 
    }
    public function updateCustomerTableFromQuickBookCustID($qb_CustID,$data)
    {
      
       $result = $this->db->update('Customers', $data, array('t_QBCustID'=>  $qb_CustID));
       if(!$result)
       {
           return $this->db->_error_message(); 
       }
       else 
       {
           return $this->db->affected_rows();
           
       }
        
    }
        
    
}
?>
