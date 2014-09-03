<?php

class inventorylocationitemmodel extends CI_Model  
{
      public function getLocationData($id)
      {
          $selectArray = array('kp_InventoryLocationItemID', 'kf_InventoryItemID', 'n_QntyOnHand', 'InventoryItems.t_description');
          $this->db->select($selectArray)->from('InventoryLocationItems')
                   ->join('InventoryItems', 'InventoryLocationItems.kf_InventoryItemID = InventoryItems.kp_InventoryItemID')
                   ->where('InventoryLocationItems.kf_InventoryLocationID', $id)
                   ->order_by('InventoryLocationItems.kf_InventoryItemID', 'Asc');
                
           $query = $this->db->get();
           $result=$query->result();
           return $result;
      }
      
      public function updateInvLocationItemData($inventoryLocationItemID,$data)
      {
          $this->db->where('kp_InventoryLocationItemID', $inventoryLocationItemID);
          $this->db->update('InventoryLocationItems', $data); 
      }
      public function getInvLocationItemByID($inventoryLocationItemID)
      {
         $query = $this->db->get_where('InventoryLocationItems',array('kp_InventoryLocationItemID'=>$inventoryLocationItemID));
         
         return $query->row_array();
        
      } 
      
      public function deleteInvLocationItemTableRow($inventoryLocationItemID)
      {
          $result = $this->db->delete('InventoryLocationItems', array('kp_InventoryLocationItemID' => $inventoryLocationItemID)); 
          
          return $result;
      }
      
      public function insertInvLocationItemTable($insertInvLocationItemArr)
      {
          $lenArr                  = sizeof($insertInvLocationItemArr);
          for($i = 0; $i<$lenArr; $i++)
          {
              $this->db->insert('InventoryLocationItems', $insertInvLocationItemArr[$i]);

          }
          return $this->db->insert_id();
      }
   
}

?>
