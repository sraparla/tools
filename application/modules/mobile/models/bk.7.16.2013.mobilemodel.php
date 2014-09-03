<?php

class MobileModel extends CI_Model
{
    public function __construct() 
    {
        parent::__construct();
    }
    public function mobileEmployeeUserName($name)
    {
        $where =  "nb_Inactive = '0' or isnull(nb_Inactive)";
        
        $this->db
             ->select('t_UserName')   
             //->select('kp_EmployeeID,t_UserName')
             ->from('Employees')
             ->like('t_UserName', $name, 'both')   
             ->where($where);
        
        $query = $this->db->get();
         
        return $query->result_array();
        
    }
    public function getMobileOrderItemDashNumData($orderID)
    {
        $query = $this->db->query("SELECT  OrderItems.kp_OrderItemID,OrderItems.kf_OrderID, 
                                  OrderItems.n_DashNum,Equipment.t_EquipAbr, 
                                  OrderItemComponents.n_Quantity,OrderItemComponents.n_HeightInInches, 
                                  OrderItemComponents.n_WidthInInches,BuildItems.kf_ManCatID, 
                                  BuildItems.t_Name
                          FROM OrderItems INNER JOIN OrderItemComponents OIC ON OrderItems.kp_OrderItemID = OIC.kf_OrderItemID
                             INNER JOIN Equipment ON OIC.kf_EquipmentID = Equipment.kp_EquipmentID
                             INNER JOIN OrderItemComponents ON OrderItems.kp_OrderItemID = OrderItemComponents.kf_OrderItemID
                             INNER JOIN BuildItems ON OrderItemComponents.kf_BuildItemID = BuildItems.kp_BuildItemID
                          WHERE OrderItems.kf_OrderID =".$orderID." and BuildItems.kf_ManCatID =2");
       
         
        return $query->result_array();
        
    }        
    public function getMobileProductBuildData($orderItemID)
    {
         $query = $this->db->query("SELECT OrderItemComponents.kp_OrderItemComponentID AS OrderItemComponentID, 
                                    IF(ISNULL(biManCats.t_Category),
					ManCats.t_Category,
					biManCats.t_Category
                                      ) AS t_Category, 
                                    IF(ISNULL(biManCats.t_Category),
                                        CONCAT(Equipment.t_EquipmentName,' - ',EquipmentModes.t_Name),
                                        BuildItems.t_Name
                                      ) AS DisplayName, 
                                    OrderItemComponents.t_Description, 
                                    ifnull(OrderItemComponents.t_Directions,'') AS Direction, 
                                    IF(ISNULL(biManCats.t_Category),
                                                            ManCats.n_Sort,
                                                            biManCats.n_Sort
                                                    ) AS DisplaySort, 
                                    IF(ISNULL(biManCats.t_FormView),
                                                             ManCats.t_FormView,
                                                             biManCats.t_FormView
                                              ) AS t_FormView, 
                                   BuildItems.nb_NotConnectedToInventory, 
                                   OrderItemComponents.n_Quantity, 
                                   OrderItemComponents.n_HeightInInches, 
                                   OrderItemComponents.n_WidthInInches, 
                                   InventoryItems.kp_InventoryItemID, 
                                   InventoryItems.t_description AS inv_description, 
                                   Sum(InventoryLocationItems.n_QntyOnHand) AS OH
                                   FROM OrderItemComponents LEFT OUTER JOIN BuildItems ON OrderItemComponents.kf_BuildItemID = BuildItems.kp_BuildItemID
                                   LEFT JOIN ManCats biManCats ON BuildItems.kf_ManCatID = biManCats.kp_ManCatID
                                   LEFT JOIN Equipment ON OrderItemComponents.kf_EquipmentID = Equipment.kp_EquipmentID
                                   LEFT JOIN ManCats ON Equipment.kf_ManCatID = ManCats.kp_ManCatID
                                   LEFT JOIN EquipmentModes ON OrderItemComponents.kf_EquipmentModeID = EquipmentModes.kp_EquipmentModeID
                                   LEFT JOIN InventoryItems ON OrderItemComponents.kf_InventoryItemID = InventoryItems.kp_InventoryItemID
                                   LEFT JOIN InventoryLocationItems ON InventoryItems.kp_InventoryItemID = InventoryLocationItems.kf_InventoryItemID
                                   WHERE OrderItemComponents.kf_OrderItemID =".$orderItemID."
                                   GROUP BY OrderItemComponents.kp_OrderItemComponentID
                                   ORDER BY DisplaySort ASC");
        return $query->result_array();
        
        
    }
       
  
}



?>
