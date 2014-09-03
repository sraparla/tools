<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MobileController  extends MX_Controller
{
    //public $pageRequestFrom;
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
        //$orderID = "114492"; // for testing purposes
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
                                      <p style=\"white-space:normal;\">".$productBuildData[$i]['Direction']."</p>
                                      <p style=\"white-space:normal;\">".$productBuildData[$i]['kp_InventoryItemID']." ".
                                           $productBuildData[$i]['inv_description']." ".$productBuildData[$i]['OH']."</p></li>"; 
                      }
                      else
                      {
                          $ulLi  .= "<li><h3>".$productBuildData[$i]['DisplayName']."</h3>

                                      <p style=\"white-space:normal;\">".$productBuildData[$i]['Direction']."</p>
                                      <p style=\"white-space:normal;\">".$productBuildData[$i]['kp_InventoryItemID']." ".
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

                                      <p style=\"white-space:normal;\">".$productBuildData[$i]['Direction']."</p>
                                      <p style=\"white-space:normal;\">".$productBuildData[$i]['kp_InventoryItemID']." ".
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
    
    public function doSomeFun()
    {
        $combineQuery  = array();
        $displayStates = array();
        $stateValue    = array();
        $stateValue1   = array();
        $x=0;
        
        $stateValue[0]['state'] = "AZ";
        $stateValue[0]['value'] = "3";
        $stateValue[1]['state'] = "BZ";
        $stateValue[1]['value'] = "4";
        $stateValue[2]['state'] = "CZ";
        $stateValue[2]['value'] = "5";
        $stateValue[3]['state'] = "DZ";
        $stateValue[3]['value'] = "6";
        $stateValue[4]['state'] = "EZ";
        $stateValue[4]['value'] = "7";
        
        $stateValue1[0]['state'] = "AZ";
        $stateValue1[0]['value'] = "33";
        $stateValue1[1]['state'] = "BZ";
        $stateValue1[1]['value'] = "44";
        $stateValue1[2]['state'] = "CZ";
        $stateValue1[2]['value'] = "55";
        $stateValue1[3]['state'] = "DZ";
        $stateValue1[3]['value'] = "66";
        $stateValue1[4]['state'] = "EZ";
        $stateValue1[4]['value'] = "77";
        
        $stateValue2[0]['state'] = "AZ";
        $stateValue2[0]['value'] = "333";
        $stateValue2[1]['state'] = "BZ";
        $stateValue2[1]['value'] = "444";
        $stateValue2[2]['state'] = "CZ";
        $stateValue2[2]['value'] = "555";
        $stateValue2[3]['state'] = "DZ";
        $stateValue2[3]['value'] = "666";
        $stateValue2[4]['state'] = "EZ";
        $stateValue2[4]['value'] = "777";
        
        for($i=0; $i<sizeof($stateValue); $i++)
        {
            $displayStates[$i] = $stateValue[$i]['state'];
            
        }
        
        
        foreach($displayStates as $state)
        {
             for($i=0; $i<sizeof($stateValue); $i++)
             {
                 $stateFound     =  in_array($state,$stateValue[$i]);
                 if($stateFound)
                 {
                     $combineQuery[$state][$x]=$stateValue[$i]['value']; 
                 }  
             }
             for($i=0; $i<sizeof($stateValue1); $i++)
             {
                $stateFound     =  in_array($state,$stateValue1[$i]);
                if($stateFound)
                {
                    array_push($combineQuery[$state],$stateValue1[$i]['value']);
                    
                }    
                
             }
             for($i=0; $i<sizeof($stateValue2); $i++)
             {
                $stateFound     =  in_array($state,$stateValue1[$i]);
                if($stateFound)
                {
                    array_push($combineQuery[$state],$stateValue2[$i]['value']);
                    
                }    
                
             }
        } 
        echo "<br/>Final Result:<br/> ";
        var_dump($combineQuery);
        echo "<br/><br/>";

     
    } 
    
    public function getMobileLineItemData($orderID=null,$pageRequest=null)
    {
        $data['orderID']                   = $orderID;
        
        $data['pageRequestFrom']           = $pageRequest;
        //print_r($data);
        return $data;
        
        
       //redirect("orderItemUpSideFrm/read/".$newInsertedOrderItemID,'refresh');
        
    } 
    public function getApplicationPath()
    {
        echo $_SERVER['SERVER_PROTOCOL']."<br/>";
        echo $_SERVER['SERVER_NAME'].'/images'."<br/>";
        echo realpath(APPPATH)."<br/>";
        echo realpath(APPPATH . '../../images/shipping/')."<br/>";
        echo "<br/>";
        echo "<br/>".uri_string(realpath(APPPATH))."<br/>";
        echo realpath(APPPATH . '../../images/114469')."<br/>";
        echo "<br/>".current_url()."<br/>";
        echo "<br/>".uri_string(current_url())."<br/>";
        echo base_url(). '../images/114469';
        if(file_exists(realpath(APPPATH . '../../images/.am_i_mounted')))
        {
           echo "<br/>exists<br/>";
        }        
        //chmod(realpath(APPPATH . '../../images/114530/301907/inspection'), 0777);
        $result=chmod(realpath(APPPATH . '../../images/114522'), 0777);
        echo $result;
        echo fileperms (realpath(APPPATH . '../../114522/301869/inspection'));
    }        
    public function getMobileBleedWhitePocketInfo($orderItemID = null)
    {
       $finalSize                                = array();
       $bWp                                      = array();
       
       //get all OrderItem Fields from OrderItemID 
       $orderItemArry           = Modules::run('orderItems/orderitemcontroller/getOrderItemFieldsFromOrderItemID',$orderItemID);
       //var_dump($orderItemArry);
       //echo "<br/>";
       //$finalSize['orderID']    = $orderItemArry[0]['kf_OrderID'];
       
       $finalSize['Qty']                 = $orderItemArry[0]['n_Quantity'];
       
       $finalSize['OiStatus']            = $orderItemArry[0]['t_OiStatus'];
       
       $finalSize['inspectReadOrder']    = $orderItemArry[0]['nb_InspectReadOrder'];
       
       $finalSize['nb_InspectQty']       = $orderItemArry[0]['nb_InspectQty'];
       
       $finalSize['nb_InspectSize']      = $orderItemArry[0]['nb_InspectSize'];
       
       $finalSize['nb_InspectColor']     = $orderItemArry[0]['nb_InspectColor'];
       
       $finalSize['nb_InspectFinishing'] = $orderItemArry[0]['nb_InspectFinishing'];
       
       $finalSize['t_InspectNote']       = $orderItemArry[0]['t_InspectNote'];
       
       $finalSize['t_InspectName']       = $orderItemArry[0]['t_InspectName'];
       
       $finalSize['nb_PrintLabel']       = $orderItemArry[0]['nb_PrintLabel'];
       
       $finalSize['n_NumLabelsPrint']    = $orderItemArry[0]['n_NumLabelsPrint'];
       
       
       //$orderArry               = Modules::run('orders/ordercontroller/getOrderFieldsFromOrderID',$finalSize['orderID']);
       //var_dump($orderArry);
       //echo "<br/>";
       // get all OrderItemComponent Fields from OrderItemID
       $orderItemComponentArray = Modules::run('orderItemComponents/orderitemcomponentcontroller/getOrderItemComponentArrayFromOrderItemID',$orderItemID);
       
       //echo "<br/>".$orderItemComponentArray[0]['kf_LinkedEquipmentID']."<br/>";
       for($i=0; $i<sizeof($orderItemComponentArray); $i++)
       {
          if(!empty($orderItemComponentArray[$i]['kf_LinkedEquipmentID']) && !empty($orderItemComponentArray[$i]['kf_LinkedEquipmentModeID']))
          {
              //echo $orderItemComponentArray[$i]['kp_OrderItemComponentID']."<br/>";
              $bWp['bleedTop']          = $orderItemComponentArray[$i]['n_BleedTop'];
              $bWp['bleedBottom']       = $orderItemComponentArray[$i]['n_BleedBottom'];
              $bWp['bleedLeft']         = $orderItemComponentArray[$i]['n_BleedLeft'];
              $bWp['bleedRight']        = $orderItemComponentArray[$i]['n_BleedRight'];

              // ----- White ------
              $bWp['whiteTop']          = $orderItemComponentArray[$i]['n_WhiteTop'];
              $bWp['whiteBottom']       = $orderItemComponentArray[$i]['n_WhiteBottom'];
              $bWp['whiteLeft']         = $orderItemComponentArray[$i]['n_WhiteLeft'];
              $bWp['whiteRight']        = $orderItemComponentArray[$i]['n_WhiteRight'];

              // ----- Pocket ------
              $bWp['pocketTop']         = $orderItemComponentArray[$i]['n_PocketTop'];
              $bWp['pocketBottom']      = $orderItemComponentArray[$i]['n_PocketBottom'];
              $bWp['pocketLeft']        = $orderItemComponentArray[$i]['n_PocketLeft'];
              $bWp['pocketRight']       = $orderItemComponentArray[$i]['n_PocketRight'];

              $bWp['heightInInches']    = $orderItemComponentArray[$i]['n_HeightInInches'];
              $bWp['widthInInches']     = $orderItemComponentArray[$i]['n_WidthInInches'];
              
              $finalSize['bWpData']     = Modules::run('orderItemComponents/orderitemcomponentcontroller/calculateBleedWhitePocketFeetInches',$bWp);
              
          }    
           
       }
      
      
       //var_dump($finalSize);
      
       $formatWhiteFeet    = $finalSize['bWpData']['whiteFeet'];
       
       $formatWhiteFeetArr = explode(" ",$formatWhiteFeet);
       
       $getFinalHeightFeet = $formatWhiteFeetArr[0];
      
       $getFinalHeightInch = $formatWhiteFeetArr[3];
       
       $getFinalX          = $formatWhiteFeetArr[4];
       $getFinalWidthFeet  = $formatWhiteFeetArr[5];
       
       $getFinalWidthInch  = $formatWhiteFeetArr[8];
       if($getFinalHeightFeet == "0'")
       {
           $getFinalHeightFeet = "";
       }
       if($getFinalHeightInch == "0\"")
       {
           $getFinalHeightInch = "";
       } 
       if($getFinalWidthFeet == "0'")
       {
           $getFinalWidthFeet = "";
       }
       if($getFinalWidthInch == "0\"")
       {
           $getFinalWidthInch = "";
       }
       if(is_null($finalSize['OiStatus']))
       {
           $finalSize['OiStatus']  = "";
       }    
     
      
       $finalSize['bWpData']['whiteFeet'] = $getFinalHeightFeet." ".$getFinalHeightInch." "."H ".$getFinalX." ".$getFinalWidthFeet." ".$getFinalWidthInch." "."W ";
     
       
       
       //var_dump($finalSize);
       echo json_encode($finalSize);
       
    }        
    public function getMobileLineItemPage($orderID=null,$pageRequest=null)
    {
        $data = $this->getMobileLineItemData($orderID,$pageRequest);
        
        //$data['orderID']                   = $orderID;
        
        //$data['pageRequestFrom']           = $pageRequest;
        //$this->pageRequestFrom             = $pageRequest;
        //echo "hello: ".$this->pageRequestFrom."<br/>";
        //print_r($data);
        $this->load->view("mLineItemPage",$data);
        
    }

    public function mobileLineItemDetailsView($orderItemID,$typeOfChange,$jobStatus)
    {
        
        // get orderID from orderItemID
        //$row = Modules::run('orderItems/orderitemcontroller/getOrderItemFieldsFromOrderItemID',$orderItemID);
        //$data['orderID']      = $row[0]['kf_OrderID'];
        
        $data['orderItemID']  = $orderItemID;
        
        $data['typeOfChange'] = $typeOfChange;
       
        $data['jobStatus']    = $jobStatus;
        
        //print_r($data);
        
        //echo "hello: ".$this->pageRequestFrom."<br/>";
        $this->load->view("mLineItemDetailsPage",$data);
        
    }
    public function displayOrderItemImage($orderItemID,$orderID)
    {
        $displayImage                   = array();
        $orderArry                      = Modules::run('orders/ordercontroller/getOrderFieldsFromOrderID',$orderID);
        $displayImage['orderID']        = $orderArry['kp_OrderID'];
        $displayImage['dateReceived']   = $orderArry['d_Received'];
        
        $orderItemArry                  = Modules::run('orderItems/orderitemcontroller/getOrderItemFieldsFromOrderItemID',$orderItemID);
        
        $displayImage['orderItemID']    = $orderItemArry[0]['kp_OrderItemID'];
        
        $displayImage['orderItemImage'] = $orderItemArry[0]['t_OrderItemImage'];
        echo json_encode($displayImage);
    }        

    public function getImageContent($orderItemID,$orderID)
    {
        $orderArry               = Modules::run('orders/ordercontroller/getOrderFieldsFromOrderID',$orderID);
        $dateReceived            = $orderArry['d_Received'];
        
        $img = $this->mobilemodel->getImages($orderItemID,$orderID,$dateReceived);
        $li  = "";
        //print_r($img);
        if(!is_null($img))
        {
            for($i=0;$i<sizeof($img);$i++)
            {
                $li .= '<li><a href="'.$img[$i]['imageUrl'].'" rel="external"><img src="'.$img[$i]['thumbUrl'].'" alt="Image 01" /></a></li>';

            }
            echo $li;
             
         }
         else
         {
              echo $li;
             
         }    
        
    }        
    public function mobileUploadError($errorMessage)
    {
         $data['msg']  = $errorMessage;
         $this->load->view("mTesting",$data);
    }        
    public function uploadFiles()
    {
        //echo "hi1";
        if($this->input->post('upload'))
        {
            //echo "hi2";
            $orderItemID  = $this->input->post('mobileUploadOrderItemID');
            
            $typeOfChange = $this->input->post('mobileUploadTypeOfChange');
            
            $orderID      = $this->input->post('mobileUploadOrderID');
            $pageRequest  = $this->input->post('mobileUploadPageRequest');
            
            $orderArry    = Modules::run('orders/ordercontroller/getOrderFieldsFromOrderID',$orderID);
            $dateReceived = $orderArry['d_Received'];
          
            //echo "<br/>".$orderItemID."<br/>".$orderID."<br/>".$dateReceived."<br/>";
            //do custom upload
            $msg = $this->mobilemodel->doCustomUploadFiles($orderItemID,$orderID,$dateReceived);
            
            //echo "Message: ".$msg."<br/>";
            if($msg == "File Uploaded")
            {
                 $data['orderItemID'] = $orderItemID;
        
                 $data['typeOfChange'] = $typeOfChange;
                 $jobStatus = "show";

                    
                 $data['jobStatus'] = $jobStatus;
                 //print_r($data);
                 //echo "<br/>OrderID: ".$orderID."<br/>";
                 //redirect("mLineItems"."/".$orderID."/".$pageRequest."#orderItemJobStatusDetailsPage");
                 
                 
                 
                 // redirect to the line Item Page:
                 redirect("mLineItems"."/".$orderID."/".$pageRequest,'refresh');
                 



                //$this->load->view("mUploadPage",$data);

                    
                 //$data['jobStatus'] = $jobStatus;
                 //redirect('http://localhost/apps/mobileOrderStatus#orderItemJobStatusDetailsPage','refresh');
                 
                 //$this->load->view("mUploadPage",$data);
                 //$this->load->view("mobilePageView",$data);
            } 
            else 
            {
                //echo "<br/>Please contact IT  ".$msg;
                redirect("mobile/mobilecontroller/mobileUploadError"."/".$msg,'refresh');
                //echo "<br/>Please contact IT  ".$msg;
                
            } 
           
            
        }    
        
    }        
}

?>
