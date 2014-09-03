<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class  InventoryItemsToBuildItemsLinkController extends MX_Controller
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('inventoryitemstobuilditemslinkmodel');
        
    }
    public function index()
    {
        echo "This is a state HMVC model";
    }
    public function getInventoryItemValueList($buildItemID=null)
    {
        if($buildItemID == null)
        {
            $buildItemID = "0";
        }    
        $inventoryItemList = "";
        $row = $this->inventoryitemstobuilditemslinkmodel->getInventoryItemList($buildItemID);
        
        for($i=0; $i<sizeof($row); $i++)
        {
            $inventoryItemList .= '<option value="'.$row[$i]['kf_InventoryItemID'].'">'
                                                   .$row[$i]['t_description']." ".$row[$i]['t_SupplierType']
                                                   ." OH ".abs($row[$i]['OH']).'</option>';
            
        }
        echo $inventoryItemList;
        
        
        
        //print_r($row);
        
    }
    
}

?>
