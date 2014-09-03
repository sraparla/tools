<?php

class OrderModel extends CI_Model 
{
    var $QRCodeImagePath;
    
    public function __construct() 
    {
        parent::__construct();
        
        //Server Shipping path
        $this->QRCodeImagePath = realpath(APPPATH . '../../images/Orders');
        
        $this->load->library('ciqrcode');
        
    }
    public function getOrderFromMonthYearDateRecived($year=null,$month=null)
    {
        if(empty($month))
        {
            $query = $this->db->query("SELECT kp_OrderID FROM basetables2.Orders
                                     WHERE d_Received is not null and  
                                     YEAR(d_Received)='$year'");
             
            
        }
        else 
        {
            $query = $this->db->query("SELECT kp_OrderID FROM basetables2.Orders
                                     WHERE d_Received is not null and  
                                     YEAR(d_Received)='$year' and MONTH(d_Received)='$month' order by kp_OrderID asc");
            
            
        }
         
          return $query->result_array();
        
    }
    public function checkPhysicalPathOFQrCodeImage($orderID,$dateReceived)
    {
        if(file_exists(realpath(APPPATH . '../../images/.am_i_mounted'))&& !is_null($dateReceived))
        {
            $dateOrderReceivedArr       = explode("-", $dateReceived);
        
            $yearOrder                  = $dateOrderReceivedArr[0];
        
            $monthOrder                 = $dateOrderReceivedArr[1];
            
            $path                       = $this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID.'/qrcode/qr-code.png';
            //echo $path;
             if(!file_exists($path))
             {
                 //echo "inside: ".$path;
                 $this->createQRCodeFromOrderID($orderID, $dateReceived);
                 
             }
        }        
        
    }
    public function reCreateQRCode($orderID)
    {
        $orderIDAry   = $this->getOrderByOrderID($orderID);
        $dateReceived = $orderIDAry->d_Received;
        
        
        
        if(file_exists(realpath(APPPATH . '../../images/.am_i_mounted'))&& !is_null($dateReceived))
        {
            $dateOrderReceivedArr       = explode("-", $dateReceived);
        
            $yearOrder                  = $dateOrderReceivedArr[0];
        
            $monthOrder                 = $dateOrderReceivedArr[1];
        
            //$path                       = $this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID;
            
            // checks and creates Month and Year Folder
            if(!is_dir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder))
            {
                if(!mkdir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder,0777,TRUE))
                {
                    die("Failed to create Year and Month Folders");
                }        

            }
            
            
            // checks and creates the Order Folder
            if(!is_dir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID)) // checks if the order# has a folder or not
            {
                if(!mkdir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID,0777,TRUE))
                {
                    die('Failed to create Order and other folders...');
                }
                else
                {
                     //change the directory owner/group permission for OrderItemID folder
                    chmod($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID, 0777);
                } 
            }
            $path              = $this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID.'/qrcode';
            
           // checks and creates the qrcode Folder
            if(!is_dir($path)) // checks if the qrcode is a folder or not
            {
                if(!mkdir($path,0777,TRUE))
                {
                    die('Failed to create Order and other folders...');
                }
                else
                {
                    //chmod($path, 0777);

                     //change the directory owner/group permission for OrderItemID folder
                    chmod($path, 0777);
                } 
            }
            if(file_exists($path."/qr-code.png"))
            {
                $msg = unlink($path."/qr-code.png"); // remove any image files.
                
            }        
            $params['cacheable']    = false;
            $params['cacheable']    = 0;
            $params['cacheable']    = False;
            
            $params['data']         = $orderID;
            $params['level']        = 'H';
            $params['size']         = 25;
            $params['savename']     = $path."/qr-code.png";
            $this->ciqrcode->generate($params);
            
            //$qr = new BarcodeQR(); 

            // create URL QR code 
            //$qr->text($orderID); 

            // display new QR code image 
            //$qr->draw();
            //$qr->draw(540, $path."/qr-code.png");
            //echo $path;
            
        }        
        
        
        
        
    }      
    public function createQRCodeFromOrderID($orderID,$dateReceived)
    {
        //$this->load->library('BarcodeQR');
        
        $this->load->library('ciqrcode');
        
        if(file_exists(realpath(APPPATH . '../../images/.am_i_mounted'))&& !is_null($dateReceived))
        {
            $dateOrderReceivedArr       = explode("-", $dateReceived);
        
            $yearOrder                  = $dateOrderReceivedArr[0];
        
            $monthOrder                 = $dateOrderReceivedArr[1];
        
            //$path                       = $this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID;
            
            // checks and creates Month and Year Folder
            if(!is_dir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder))
            {
                if(!mkdir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder,0777,TRUE))
                {
                    die("Failed to create Year and Month Folders");
                }        

            }
            
            
            // checks and creates the Order Folder
            if(!is_dir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID)) // checks if the order# has a folder or not
            {
                if(!mkdir($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID,0777,TRUE))
                {
                    die('Failed to create Order and other folders...');
                }
                else
                {
                     //change the directory owner/group permission for OrderItemID folder
                    chmod($this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID, 0777);
                } 
            }
            $path              = $this->QRCodeImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID.'/qrcode';
            
           // checks and creates the qrcode Folder
            if(!is_dir($path)) // checks if the qrcode is a folder or not
            {
                if(!mkdir($path,0777,TRUE))
                {
                    die('Failed to create Order and other folders...');
                }
                else
                {
                    //chmod($path, 0777);

                     //change the directory owner/group permission for OrderItemID folder
                    chmod($path, 0777);
                } 
            }
            $params['cacheable']    = false;
            $params['cacheable']    = 0;
            $params['cacheable']    = False;
            
            $params['data']         = $orderID;
            $params['level']        = 'H';
            $params['size']         = 25;
            $params['savename']     = $path."/qr-code.png";
            $this->ciqrcode->generate($params);
            
            //$qr = new BarcodeQR(); 

            // create URL QR code 
            //$qr->text($orderID); 

            // display new QR code image 
            //$qr->draw();
            //$qr->draw(540, $path."/qr-code.png");
            //echo $path;
            
        }        
        
        
        
        
    }        
    public function orderPricingQuickBook($orderID)
    {
        $this->db
                 ->select('ifnull(nb_IncompletePricing,\'\') as incompletePricing,
                           ifnull(nb_UseTotalOrderPricing,\'\') as useTotalOrderPricing, 
                           ifnull(ROUND(n_TotalOrderPrice,2),\'\') as totalOrderPrice ,
                           ifnull(nb_PostedToQuickbooks,\'\') as postedToQuickbooks',false)
                 ->from('Orders')
                 ->where('kp_OrderID',$orderID);
        
         $query = $this->db->get();
         
         return $query->row_array();
        
    } 
    
    public function getOrderByOrderID($OrderID)
    { 
        $query = $this->db->query("SELECT * FROM Orders  WHERE kp_OrderID ='$OrderID'");
        return $query->row();
    }
    
    public function getOrderRelatedInfoForOrderView($orderID)
    {
        $query = $this->db->query("SELECT Orders.kp_OrderID, 
                        Orders.kf_ContactID, 
                        Orders.kf_CustomerID, 
                        Orders.kf_EmployeeIDCSR, 
                        Orders.kf_EmployeeIDSales, 
                        Orders.kf_EmployeeIDEstimator, 
                        Orders.kf_EmployeeIDNameOnEstimate, 
                        Orders.kf_EquipmentID, 
                        Orders.kf_EquipmentModeID, 
                        Orders.kf_MasterJobID, 
                        Orders.kf_RedoOriginalJobID, 
                        Orders.kf_SalesLeadID, 
                        Orders.kf_TemporaryReportID, 
                        Orders.t_ArtLocation, 
                        Orders.t_CreateArtSendProof, 
                        Orders.t_CreditCardTransaction, 
                        Orders.t_CustomerPO, 
                        Orders.t_CustomerJobNum, 
                        Orders.t_DataLog, 
                        Orders.t_Drawer, 
                        Orders.t_FlexibleDueDate, 
                        Orders.t_JobDescription, 
                        Orders.t_JobFinishedYN, 
                        Orders.t_JobInvoicedYN, 
                        Orders.t_JobName, 
                        Orders.t_JobStatus, 
                        Orders.t_Notes, 
                        Orders.t_NotesHidden, 
                        Orders.t_NotesInventoryNeeded, 
                        Orders.t_OrderPricingType, 
                        Orders.t_OriginalDataType, 
                        Orders.t_OverideCreditHold, 
                        Orders.t_OverideZeroCost, 
                        Orders.t_OverrideAfterCutOffBy, 
                        Orders.t_PersonWritingOrder, 
                        Orders.t_PMSColor, 
                        Orders.t_PressProofNotes, 
                        Orders.t_PressProofSize, 
                        Orders.t_PressProofType, 
                        Orders.t_ProofApprovalType, 
                        Orders.t_ProofApprovedBy, 
                        Orders.t_ProofsApprovedBy, 
                        Orders.t_ProofType, 
                        Orders.t_QBEditSequence, 
                        Orders.t_QBInvoiceNumber, 
                        Orders.t_QBListID, 
                        Orders.t_QBTxnID, 
                        Orders.t_RedoApprovedBy, 
                        Orders.t_RedoDepartment, 
                        Orders.t_RedoDescription, 
                        Orders.t_SchedSqftIncludeOrder, 
                        Orders.t_ScheduleApproval, 
                        Orders.t_SendProof, 
                        Orders.t_ServiceLevel, 
                        Orders.t_ServiceLevelApprovedBy, 
                        Orders.t_StatusBeforeParked, 
                        Orders.t_SupervisorScheduleNotes, 
                        Orders.t_TypeOfJobTicket, 
                        Orders.t_TypeOfOrder, 
                        Orders.t_WebAccessKey, 
                        Orders.d_Invoiced, 
                        Orders.d_JobDue, 
                        Orders.d_PrintJobDue, 
                        Orders.d_ProofDue, 
                        Orders.d_Received, 
                        Orders.d_SchedDay, 
                        Orders.d_TentativeApproval, 
                        Orders.d_TentativeJobDue, 
                        Orders.ti_JobDue, 
                        Orders.ti_PrintJobDue, 
                        Orders.ti_ProofDue, 
                        Orders.ti_TentativeJobDue, 
                        Orders.ts_JobMarkedAsFinished, 
                        Orders.ts_OverrideAfterCutOff, 
                        Orders.ts_PostedToQuickbooks, 
                        Orders.ts_ProofApproved, 
                        Orders.ts_ProofsApproved, 
                        Orders.ts_ProofSent, 
                        Orders.ts_ScheduleApproval, 
                        Orders.ts_ServiceLevelApproved, 
                        Orders.ts_TrackNumberEmailSent, 
                        Orders.n_CommisionFactor, 
                        Orders.n_Damaged1Side, 
                        Orders.n_Damaged2SidesNonUsable, 
                        Orders.n_DashNumberStored, 
                        Orders.n_DepositAmount, 
                        Orders.n_EstimatedShipping, 
                        Orders.n_OICount, 
                        Orders.n_PercentCOMTotalOrderPrice, 
                        Orders.n_PressError1Side, 
                        Orders.n_SqFtTotal, 
                        Orders.n_SqFtTotalDS, 
                        Orders.n_TotalOrderPrice, 
                        Orders.nb_CustomerPOToBeDetermined, 
                        Orders.nb_DontCountInSchedule, 
                        Orders.nb_DueSaturday, 
                        Orders.nb_DueSunday, 
                        Orders.nb_EmailSentOrderConfirmation, 
                        Orders.nb_EmailSentTrackNumReadyToPickUp, 
                        Orders.nb_FollowUpCallMade, 
                        Orders.nb_Inactive, 
                        Orders.nb_IncompletePricing, 
                        Orders.nb_JobFinished, 
                        Orders.nb_MustPrintPackingList, 
                        Orders.nb_OrderLoggedIntoSystem, 
                        Orders.nb_OverideAfterCutOffTime, 
                        Orders.nb_PostedToQuickBooks, 
                        Orders.nb_ReceivedBeforeCutOffTime, 
                        Orders.nb_ScheduleNow, 
                        Orders.nb_UseTotalOrderPricing, 
                        Orders.zCreated, 
                        Orders.zCreatedBy, 
                        Orders.zModified, 
                        Orders.zModifiedBy, 
                        Orders.nb_CreditHoldOveride, 
                        Orders.nb_CreditHoldTimeOrder, 
                        Orders.t_CreditHoldType, 
                        Orders.t_CreditHoldTypeOveride, 
                        Orders.t_CreditHoldOverideNote, 
                        Orders.t_CreditHoldReleasedBy, 
                        Orders.ts_CreditHoldReleased, 
                        Orders.n_TotalOrderItemPrice, 
                        Orders.n_TotalOtherCharges, 
                        Orders.t_OrdShip, 
                        Orders.n_OICSqFtSum, 
                        Orders.n_OrderItemCount, 
                        Orders.n_Complexity, 
                        Orders.t_OrderItemAb, 
                        Orders.t_MachineAb, 
                        Orders.n_DurationTime, 
                        Orders.nb_SureDate, 
                        Orders.kf_ContactIDProjectManager, 
                        Orders.kf_ContactIDArtContact, 
                        Orders.kf_CustomerIDProjectManager, 
                        Orders.kf_OrderRedoID, 
                        Orders.t_NotesHTML, 
                        Orders.nb_QrcodeGeneratedOI, 
                        OContact.t_ContactNameFull, 
                        Sales.t_UserName AS t_SalesPerson, 
                        ProjectManager.t_ContactNameFull AS t_ProjectManager, 
                        ArtContact.t_ContactNameFull AS t_ArtContact, 
                        MasterJobs.t_Name as t_MasterJobName,
                        Customers.t_CustCompany
                FROM Orders LEFT OUTER JOIN Addresses OContact ON Orders.kf_ContactID = OContact.kp_AddressID
                         LEFT OUTER JOIN Employees Sales ON Orders.kf_EmployeeIDSales = Sales.kp_EmployeeID
                         LEFT OUTER JOIN Addresses ProjectManager ON Orders.kf_ContactIDProjectManager = ProjectManager.kp_AddressID
                         LEFT OUTER JOIN Addresses ArtContact ON Orders.kf_ContactIDArtContact = ArtContact.kp_AddressID
                         LEFT OUTER JOIN MasterJobs ON Orders.kf_MasterJobID = MasterJobs.kp_MasterJobID
                         LEFT JOIN Customers ON Orders.kf_CustomerID = Customers.kp_CustomerID
                WHERE Orders.kp_OrderID = '$orderID'");
        return $query->row();
        
    }        
    public function getCreditReleaseData($orderID)
    {
         $this->db
                ->select('Orders.kp_OrderID, 
                        Customers.t_CustCompany, 
                        Addresses.t_ContactNameFull, 
                        Orders.nb_CreditHoldTimeOrder, 
                        Orders.t_CreditHoldType, 
                        Orders.nb_CreditHoldOveride, 
                        Orders.t_CreditHoldTypeOveride, 
                        Orders.t_CreditHoldReleasedBy, 
                        Orders.t_CreditHoldOverideNote, 
                        Orders.ts_CreditHoldReleased')
                  ->from('Orders')
                  ->join('Customers', ' Orders.kf_CustomerID = Customers.kp_CustomerID','left')
                  ->join('Addresses','Orders.kf_ContactID = Addresses.kp_AddressID ','left')
                 ->where('Addresses.kf_TypeMain',"Customer")
                 ->where('kf_TypeSub',"Contact")
                 ->where('kp_OrderID',$orderID);
         
         $query = $this->db->get();
         
         return $query->row_array();
    }        

    public function orderJobStatus($orderID)
    {
        $this->db
                ->select('kp_OrderID,t_JobStatus')
                 ->from('Orders')
                 ->where('kp_OrderID',$orderID);
        
        $query = $this->db->get();
         
        return $query->row_array();
        
    }
    public function updateOrderStatus($jobStatus,$orderID)
    {
         $data = array(
            't_JobStatus'=> $jobStatus
             );
         $this->db->update('Orders', $data, array('kp_OrderID'=>  $orderID));
    }
    public function orderJobStatusCompanyName($orderID)
    {
         $where ="((isnull(Orders.nb_JobFinished)) || (Orders.nb_JobFinished = 0))  ";
         
         $this->db
                ->select('Orders.kp_OrderID,t_CustCompany,ifnull(Orders.d_JobDue,\'No Date Given:\') as d_JobDue,
                          ifnull(Orders.t_JobStatus,\'\') as t_JobStatus,Orders.t_JobName,Statuses.n_SortOrder,
                          ifnull(DATE_FORMAT(Orders.ti_JobDue,\'%l:%i %p\'),\'\') as ti_JobDue ,Orders.t_MachineAb,Orders.t_OrderItemAb,
                          Orders.t_OrdShip,Orders.n_OrderItemCount,n_OICSqFtSum,n_DurationTime,n_Complexity',false)
                 ->from('Orders')
                 ->join('Customers','Orders.kf_CustomerID = Customers.kp_CustomerID','left')
                 ->join('Statuses', 'Orders.t_JobStatus = Statuses.t_StatusName','left')
                 ->where('kp_OrderID',$orderID)
                 ->where($where);
         $query = $this->db->get();
        
         
      
//        $this->db
//                ->select('kp_OrderID,t_CustCompany,
//                          t_JobName,t_JobStatus,
//                          n_OrderItemCount,n_OICSqFtSum,
//                          n_DurationTime,t_MachineAb,
//                          n_Complexity,t_OrderItemAb,t_OrdShip,d_JobDue')
//                 ->from('Orders')
//                 ->join('Customers','Orders.kf_CustomerID = Customers.kp_CustomerID','inner')
//                 ->where('kp_OrderID',$orderID);
//        
//        $query = $this->db->get();
         
        return $query->row_array();
        
    }
    public function orderJobStatusCompanyNameDueDate($date=null)
    {
        $where ="((isnull(Orders.nb_JobFinished)) || (Orders.nb_JobFinished = 0))  ";
        $this->db
                ->select('Orders.kp_OrderID,t_CustCompany,Orders.d_JobDue,
                          ifnull(Orders.t_JobStatus,\'No Status Name Given:\') as t_JobStatus,Orders.t_JobName,Statuses.n_SortOrder,
                          DATE_FORMAT(Orders.ti_JobDue,\'%l:%i %p\') as ti_JobDue ,Orders.t_MachineAb,Orders.t_OrderItemAb,
                          Orders.t_OrdShip,Orders.n_OrderItemCount',false)
                 ->from('Orders')
                 ->join('Customers','Orders.kf_CustomerID = Customers.kp_CustomerID','left')
                 ->join('Statuses', 'Orders.t_JobStatus = Statuses.t_StatusName','left')
                 ->where('d_JobDue',$date)
                 ->where($where)
                 ->order_by("Statuses.n_SortOrder ", "asc"); 
      
        
        $query = $this->db->get();
        
        return $query->result_array();
        
    } 
    public function getOrderByID($orderID)
    {
        $query = $this->db->get_where('Orders', array('kp_OrderID' => $orderID));
        
        return $query->row_array();
    }
    
    public function insertOrderData($data=null)
    {
         $this->db->insert('Orders', $data);
         return $this->db->insert_id();
        
    } 
    public function updateOrderTbl($data,$orderID)
    {
         //$this->db->update('Orders', $data, array('kp_OrderID'=>  $orderID));
         $result = $this->db->update('Orders', $data, array('kp_OrderID'=>  $orderID));
         if(!$result)
         {
             return $this->db->_error_message(); 
         }
         else 
         {
             return $this->db->affected_rows();

         }
         
//         if($this->db->update('Orders', $data, array('kp_OrderID'=>  $orderID)))
//         {
//             $messg = true;
//             
//             return $messg;
//         }        
    }
    
  
}
?>
