<?php
class InventoryItemsToBuildItemsLinkModel extends CI_Model 
{
    public function getInventoryItemList($buildItemID)
    {
        $where = "InventoryItemsToBuildItemsLink.kf_BuildItemID =".$buildItemID." and 
                  (isnull(InventoryItems.nb_Inactive) or (InventoryItems.nb_Inactive=\"0\"))";
        $this->db->select(' InventoryItemsToBuildItemsLink.kf_InventoryItemID, 
                            InventoryItems.t_description, 
                            InventoryItems.t_SupplierType, ,')
                 ->select_sum('InventoryLocationItems.n_QntyOnHand','OH')
                 ->from('InventoryItemsToBuildItemsLink')
                 ->join('InventoryItems', 'InventoryItemsToBuildItemsLink.kf_InventoryItemID = InventoryItems.kp_InventoryItemID','LEFT')
                 ->join('InventoryLocationItems', 'InventoryItems.kp_InventoryItemID = InventoryLocationItems.kf_InventoryItemID','LEFT')
//                 ->where('InventoryItemsToBuildItemsLink.kf_BuildItemID',$buildItemID)
                 ->where($where)
                 ->group_by('InventoryItemsToBuildItemsLink.kf_InventoryItemID')
                 ->order_by("InventoryItems.t_SupplierType", "desc"); 
        
        $query  = $this->db->get();
        
        return $query->result_array();
        
    }        
}

?>
