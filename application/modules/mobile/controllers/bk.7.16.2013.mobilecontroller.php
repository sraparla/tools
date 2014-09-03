<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MobileController  extends MX_Controller
{
    public function __construct()
    {
         parent::__construct();
         $this->load->model('mobilemodel');
    }
    public function displayMobileJobStatusView()
    {
       
        $this->load->view('mJobStatus');
       
        
        //$this->load->view('mJobStatusHead');
        //$this->load->view('mJobStatusOne');
        //$this->load->view('mJobStatusTwo');
        //$this->load->view('mJobStatusThree');
        //$this->load->view('mJobStatusFour');
        //$this->load->view('mJobStatusFive');
        //$this->load->view('mJobstatus');
        //$this->load->view('mJobStatusSubmit');
        //$this->load->view('mJobStatusFoot');
        
    }
    public function displayMobileLandingPage()
    {
        $this->load->view('mobileLandingPage');
       
        
    }        
    public function displayMobileTestingView()
    {
        $this->load->view('mTesting');
        
    }
    public function getMobileJobStatusFromOrderID()
    {
        $orderID = $this->input->post("orderID");
        //$orderID = "106059"; // for testing purposes
        //echo $orderID;
        echo Modules::run('orders/ordercontroller/getOrderJobStatusCompanyName',$orderID);
//        echo Modules::run('orderitems/orderitemcontroller/getOrderIDWithDashNumber',$orderID);
        
        
    } 
    public function getMobileOrderItemDashNum()
    {
        $orderID = $this->input->post("orderID");
        //$orderID = "111643"; // for testing purposes
        echo json_encode($this->mobilemodel->getMobileOrderItemDashNumData($orderID));
       
        //print_r($data);
        //var_dump($data);
        //echo Modules::run('orderitems/orderitemcontroller/getOrderIDWithDashNumber',$orderID);
        
    }
    
    public function getMobileEmployeeUserName()
    {
        //$employeeUserName = $this->input->post("employeeUserName");
        $employeeUserName = $this->input->get("employeeUserName");
        //echo $employeeUserName;
        
        echo json_encode($this->mobilemodel->mobileEmployeeUserName($employeeUserName));
        
    }
    public function submitMobileStatusChange()
    {
         echo "The Status has been updated.";
        
    }
    public function displayMobileStatusSubmitPage()
    {
        $this->load->view('mJobStatusSubmit');
        
    }
    public function displayMobileStatusOptionPage()
    {
        $this->load->view('mJobStatusHead');
        $this->load->view('mJobStatusThree');
        
        $this->load->view('mJobStatusTwo');
        $this->load->view('mJobStatusOne');
        $this->load->view('mJobStatusFoot');
        
    }        
    public function getMobileNewStatusName()
    {
        //echo Modules::run('orderitems/orderitemcontroller/getOrderIDWithDashNumber','106059');
        echo Modules::run('statusLog/statuslogcontroller/getNewStatusNameFromStatusesTable');
    }
    public function getPageToReload()
    {
        $this->displayMobileJobStatusView();
        
    }
    public function getMobileDisplayProductBuild($orderItemID)
    {
        $ul                          = "";
        $ulprint                     = 0;
        $ulLi                        = "";
        $productBuildData            = $this->mobilemodel->getMobileProductBuildData($orderItemID);
        
        $productBuildcategory        = $this->getMobileProductBuildCategory($orderItemID);
        //print_r($productBuildcategory);
        //asort($productBuildcategory);
        
        foreach($productBuildcategory as $category)
        {
            if($category == "Equipment" || $category == "Print Material")
            {
                if($ulprint ==0)
                {
                      $ulLi  .= "<li data-role=\"list-divider\">"."Equipment and Print Material"."</li>";
                    
                }    
                for($i=0; $i<sizeof($productBuildData); $i++)
                {
                    $categoryFound = in_array($category,$productBuildData[$i]);
                    if($categoryFound)
                    {
                      if($category == "Print Material")
                      {
                            $ulLi  .= "<li><h3>".$productBuildData[$i]['DisplayName']."</h3>
                                      <p>".$productBuildData[$i]['t_Description']."</p>
                                      <p class=\"ui-li-aside\"><strong>Qty ".$productBuildData[$i]['n_Quantity']. ":  "  .round($productBuildData[$i]['n_HeightInInches'])."\"x".round($productBuildData[$i]['n_WidthInInches'])."\"". " </strong></p>
                                      <p>".$productBuildData[$i]['Direction']."</p>
                                      <p>".$productBuildData[$i]['kp_InventoryItemID']." ".
                                           $productBuildData[$i]['inv_description']." ".$productBuildData[$i]['OH']."</p></li>"; 
                      }
                      else
                      {
                          $ulLi  .= "<li><h3>".$productBuildData[$i]['DisplayName']."</h3>

                                      <p>".$productBuildData[$i]['Direction']."</p>
                                      <p>".$productBuildData[$i]['kp_InventoryItemID']." ".
                                           $productBuildData[$i]['inv_description']." ".$productBuildData[$i]['OH']."</p></li>"; 
                       }
                            
                    }
                }
                $ulprint++; 
            }
            else
            {
                $ul  .= "<li  data-role=\"list-divider\">".$category."</li>";
                for($i=0; $i<sizeof($productBuildData); $i++)
                {
                    $categoryFound = in_array($category,$productBuildData[$i]);
                    if($categoryFound)
                    {
                        $ul  .= "<li><h3>".$productBuildData[$i]['DisplayName']."</h3>

                                      <p>".$productBuildData[$i]['Direction']."</p>
                                      <p>".$productBuildData[$i]['kp_InventoryItemID']." ".
                                           $productBuildData[$i]['inv_description']." ".$productBuildData[$i]['OH']."</p></li>"; 
                     }    
                } 
            }
        }
        $ul=$ulLi.$ul;
        echo $ul;
        //echo "<br/><br/><br/>";
        //print_r($productBuildData);
        //echo json_encode($this->mobilemodel->getMobileProductBuildData($orderItemID));
        
    }
    public function getMobileProductBuildCategory($orderItemID)
    {
        $displayProductBuildCategory = array();
        
        $productBuildData            = $this->mobilemodel->getMobileProductBuildData($orderItemID);
        
        for($i=0; $i<sizeof($productBuildData); $i++)
        {
            $displayProductBuildCategory[$i] = $productBuildData[$i]['t_Category'];
            
        }
        $category = array_unique($displayProductBuildCategory);
      
        $comma_separated = implode(",", $category);
        $category = explode(",", $comma_separated);
        
        //print_r($category);
        return $category;
        
    }        
    public function getMobileOrderJobStatusFromJobDueDate($date=null)
    {
        echo Modules::run('orders/ordercontroller/getOrderJobStatusCompanyNameDueDate',$date);
    }        
}

?>
