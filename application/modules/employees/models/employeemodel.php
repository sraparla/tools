<?php

class employeeModel extends CI_Model  
{
    public function __construct() 
    {
        parent::__construct();
    }
    
    public function verify_user($email,$password)
    {
        $query = $this
                    ->db
                    ->where('t_EmployeeEmail',$email)
                    ->where('t_Password',sha1($password))
                    ->limit(1)
                    ->get('Employees');
        
         if ($query->num_rows() > 0)
         {
             return $query->row_array();
             
         }
         else
         {
             return false;
         }    
        
    }
    public function employeeUserName()
    {
        $where =  "nb_Inactive = '0' or isnull(nb_Inactive)";
        //SELECT t_UserName FROM Employees
         //WHERE nb_Inactive = 0 or isnull(nb_Inactive)
        $this->db
             ->select('t_UserName')
             ->from('Employees')
             ->where($where);
        
        $query = $this->db->get();
         
        return $query->result_array();
    }
    public function getEmployeeEmailAddress($username)
    {
        $where =  $username;
        //SELECT t_UserName FROM Employees
         //WHERE nb_Inactive = 0 or isnull(nb_Inactive)
        $this->db
             ->select('t_EmployeeEmail')
             ->from('Employees')
             ->where('t_UserName',$where,null,false);
        
        $query = $this->db->get();
         
        return $query->row_array();
        
    }        
        
       
    
}

?>
