<?php
class ordercontactmodel extends CI_Model 
{
    public function orderContactTableData($orderID)
    {
         $this->db
                 ->select('OrderContacts.kp_OrderContactsID as ID,
                           Addresses.t_ContactNameFull as contact,
                           Addresses.t_Phone as phone,
                           Addresses.t_Mobile as mobile,
                           Addresses.t_Email as email')
                 ->from('OrderContacts')
                 ->join('Addresses', 'OrderContacts.kf_ContactID = Addresses.kp_AddressID')
                 ->where('OrderContacts.kf_OrderID',$orderID);
         $query = $this->db->get();
         return $query->result();
    }
    public function deleteModalAction($orderContactID)
    {
        $kp_OrderContactsID = intval( $orderContactID );    

        // below delete operation generates this query DELETE FROM users WHERE id = $id
        $this->db->delete( 'OrderContacts', array( 'kp_OrderContactsID' => $kp_OrderContactsID ) );
        
    }
    public function createAction()
    {
        $data = array(
             'kf_ContactID'=> $this->input->post('modalContactNameFull',true),
             'kf_OrderID'=> $this->input->post('modalOrderIDHidden',true)
        );
        
        $this->db->insert('OrderContacts', $data);
        
        return $this->db->insert_id();
        
        
    }
   
}

?>
