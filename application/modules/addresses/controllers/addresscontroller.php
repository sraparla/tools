
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class AddressController extends MX_Controller {
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('addressmodel');
        
    }
    public function index($orderID=null)
    {
        echo "This is a addresses HMVC model";
                
    }
    public function addressForm($data=null)
    {
        //print_r($data);
        
        $this->load->view('addressForm',$data);
        
    }
    public function addressSubmit()
    {
          //echo "hi";
          if(!empty($_POST))
          {
              $addressID = $this->addressmodel->submitAddressInfo();
              //echo $addressID;
              
              //echo Modules::run('orderShip/ordershipcontroller/index',$this->input->post('orderIDHidden',true));
              //$this->index($this->input->post('orderIDHidden',true));
          }
        
    }
    public function addressesStatesGetCountryFromStatesTable($countryAbb=null)
    {
        echo Modules::run('states/statecontroller/getCountryFromStatesTable',$countryAbb);
    }
    public function addressesStatesGetStatesFromStatesTable()
    {
        echo Modules::run('states/statecontroller/getStatesFromStatesTable');
        
    }
    public function addressesStatesGetStatesFromCountryChange($countryAbb,$stateAbb=null)
    {
         echo Modules::run('states/statecontroller/getStatesFromCountryChange',$countryAbb,$stateAbb);
        
    }
    public function addressesCustomersGetCustomerFromOrderID($orderID)
    {
        echo Modules::run('customers/customercontroller/getCustomerFromOrderID',$orderID);
        
    }
    public function getModalAddressData($addressID)
    {
        $row = $this->addressmodel->modalAddressData($addressID);
        //print_r($row);
        echo json_encode($this->addressmodel->modalAddressData($addressID));
        
    }
    public function modalAddressSubmit()
    {
        if(!empty($_POST))
        {
            $addressID = $this->addressmodel->modalUpdateAddress();
            //echo $addressID;
            //$this->index($this->input->post('orderIDHidden',true));
        }
        
    }
    public function recipientDetails($orderID)
    {
        if(isset($orderID))
        {
            //$this->load->model->ShippingModel;
            echo $this->addressmodel->recipientShipData($orderID);
            
        }
        
    }
    public function blindDetails($orderID)
    {
        if(isset($orderID))
        {
            //$this->load->model->ShippingModel;
            echo $this->addressmodel->blindShipData($orderID);
        }
        
    }
    public function addressesContactNameFull($orderID,$customerID=null)
    {
        //$customerID = json_decode(Modules::run('customers/customercontroller/getCustomerFromOrderID',$orderID),true);
        //echo $customerID['kf_CustomerID'];
        //print_r(json_decode($test,true));
         
        
        $resultArray = $this->addressmodel->getContactNameFull($customerID);
        
        // default select element
        $defaultSelectElement = array("kp_AddressID" => "", "t_ContactNameFull" => "--Please Select--");
            
        // Putting the default element in the begining of the dropdown
        array_unshift($resultArray, $defaultSelectElement);
        
        foreach ($resultArray as $rowj)
        {
            $id   = $rowj['kp_AddressID'];
            $data = $rowj['t_ContactNameFull'];
            echo '<option value="'.$id.'">'.$data.'</option>';
        }
        
        
    }
    public function getCustomerContactInfo($customerID)
    {
        $result = $this->addressmodel->getCustomerContactData($customerID);
        
        echo $result;
        
    }
    public function getAddressesDataFromAddressID($addressID)
    {
        $result = $this->addressmodel->getAddressesFieldsFromAddressID($addressID);
        
        return $result;
        
    }
    public function getAddressesDataFromAddressIDInJsonFormat($addressID)
    {
        $result = $this->getAddressesDataFromAddressID($addressID);
        
        echo json_encode($result);
        
    }
    public function updateAddressTbl($data,$addressID)
    {
        $msg = $this->addressmodel->updateAddressTbl($data,$addressID);
        return $msg;
    }
    public function readAddressFrmData($addressID)
    {
        $data['addressID'] = $addressID;
        $data['action']    = "update";
        $data['title']     = "Update";
        //$this->getAddressesDataFromAddressID
        $this->load->view('addressForm',$data);
    }        
    
}

?>
