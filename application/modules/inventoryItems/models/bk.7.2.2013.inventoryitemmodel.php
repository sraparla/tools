<?php
class InventoryItemModel extends CI_Model  
{
    public function getInventoryItemByID($inventoryItemID)
    {
        $query = $this->db->get_where('InventoryItems',array('kp_InventoryItemID'=>$inventoryItemID));
        
        return $query->row_array();
        
    }
    public function getInventoryOnHandMinMax($inventoryItemID)
    {
        $this->db->select('TRIM(TRAILING \'.\' FROM IFNULL(CAST(   TRIM(TRAILING \'0\' FROM Sum(InventoryLocationItems.n_QntyOnHand))AS CHAR),\'0\')) AS n_Qty',false)
                 ->select('TRIM(TRAILING \'.\' FROM ifnull(CAST(TRIM(TRAILING \'0\' FROM InventoryItems.n_ReorderPoint) AS CHAR),\'0\')) AS n_Min,
                     TRIM(TRAILING \'.\' FROM ifnull(CAST(TRIM(TRAILING \'0\' FROM InventoryItems.n_ReorderQty) AS CHAR),\'0\')) AS n_Max',false)
                 ->from('InventoryItems')
                 ->join('InventoryLocationItems', 'InventoryItems.kp_InventoryItemID = InventoryLocationItems.kf_InventoryItemID','inner')
                 ->where('InventoryItems.kp_InventoryItemID',$inventoryItemID)
                 ->group_by('InventoryItems.kp_InventoryItemID'); 
        
        $query  = $this->db->get();
        
        return $query->row_array();
        
    }
    public function getInventoryItemLocationInfo($description)
    {
        $this->db->select('InventoryItems.kp_InventoryItemID,InventoryItems.t_description,
                           ifnull(SUM(InventoryLocationItems.n_QntyOnHand),0) as total',false)
                 ->from('InventoryItems')
                 ->join('InventoryLocationItems','InventoryItems.kp_InventoryItemID = InventoryLocationItems.kf_InventoryItemID','left')
                 ->like('InventoryItems.t_description', $description,'both')
                 ->group_by('InventoryItems.kp_InventoryItemID')
                 ->order_by("total", "desc");
        
        $query  = $this->db->get();
        
        return $query->result_array();

    }
    public function getInvItemDetialsTopList($inventoryItemID)
    {
        $query = $this->db->query("SELECT Vendors.t_CompanyName, 
                            InventoryItems.kp_InventoryItemID, 
                            InventoryItems.t_PartNumber, 
                            InventoryItems.t_description, 
                            InventoryItems.t_InvType, 
                            ifnull(Sum(InventoryLocationItems.n_QntyOnHand),'') AS OH, 
                            ifnull(InventoryItems.n_ReorderPoint,'') AS Min, 
                            ifnull(InventoryItems.n_ReorderQty,'') AS Max, 
                            InventoryItems.nb_OrderPlaced, 
                            InventoryItems.t_ItemCategory
                            FROM InventoryItems 
                                     LEFT JOIN InventoryLocationItems ON InventoryItems.kp_InventoryItemID = InventoryLocationItems.kf_InventoryItemID
                                     INNER JOIN Vendors ON InventoryItems.kf_VendorID = Vendors.kp_VendorID
                            WHERE InventoryItems.kp_InventoryItemID =".$inventoryItemID."
                            GROUP BY InventoryItems.kp_InventoryItemID");
        
        return $query->row_array();
        
    }
    public function  getInvItemDetialsBottomList($inventoryItemID)
    {
        $this->db->select('InventoryItems.kp_InventoryItemID,IFNULL(InventoryLocations.t_Location,\'\') as t_Location ,
                           ifnull(InventoryLocationItems.n_QntyOnHand,\'\') as n_QntyOnHand ',false)
                 ->from('InventoryItems')
                 ->join('InventoryLocationItems','InventoryItems.kp_InventoryItemID = InventoryLocationItems.kf_InventoryItemID','LEFT')
                 ->join('InventoryLocations','InventoryLocationItems.kf_InventoryLocationID = InventoryLocations.kp_InventoryLocationID','LEFT')
                 ->where('InventoryItems.kp_InventoryItemID',$inventoryItemID);
        
        $query  = $this->db->get();
         
        return $query->result_array();
    }        
}

?>
