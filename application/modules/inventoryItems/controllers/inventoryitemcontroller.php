<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class InventoryItemController extends MX_Controller 
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('inventoryitemmodel');
        
    }
    public function getInventoryItemData($inventoryItemID)
    {
        $inventoryItemDescription ="";
        $row = $this->inventoryitemmodel->getInventoryItemByID($inventoryItemID);
        
        $inventoryItemDescription = '<option value="'.$row['t_description'].'">'.$row['t_description'].'</option>';
        echo $inventoryItemDescription;
        //return $inventoryItemDescription;
    }
    public function getInventoryOnHandMinMaxData($inventoryItemID)
    {
        $row = $this->inventoryitemmodel->getInventoryOnHandMinMax($inventoryItemID);
        
        echo json_encode($row);
        
        //print_r($row);
        
    }
    public function getInventoryItemLocationInfoFromDescription()
    {
        $description = $this->input->post('x');
        
        echo json_encode($this->inventoryitemmodel->getInventoryItemLocationInfo($description));
        
    }
    public function getInvItemTopList($inventoryItemID)
    {
        //print_r($this->inventoryitemmodel->getInvItemDetialsInfo($inventoryItemID));
        echo json_encode($this->inventoryitemmodel->getInvItemDetialsTopList($inventoryItemID));
        //$data['result'] = $this->inventoryitemmodel->getInvItemDetialsInfo($inventoryItemID);
        
        //$this->load->view('invItems_list',$data);
    }
    public function getInvItemBottomList($inventoryItemID)
    {
        echo json_encode($this->inventoryitemmodel->getInvItemDetialsBottomList($inventoryItemID));
    }        
}

?>
