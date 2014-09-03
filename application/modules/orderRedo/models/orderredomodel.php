<?php

class OrderRedoModel extends CI_Model 
{
    public function __construct() 
    {
        //Server image path
        $this->imageUploadPath = realpath(APPPATH . '../../images/Orders');
        
        $this->loadImagePath   = 'http://'.$_SERVER['SERVER_NAME'].'/images/Orders';
    }  
    public function getRedoListData($orderID)
    {
         $this->db
                 ->select('OrderRedo.kp_OrderRedoID as OrderRedoID,
                           OrderRedo.t_Status as Status,
                           OrderRedo.t_ItemsRedo as ItemsRedo,
                           OrderRedo.kf_OrderIDRedo as kf_OrderIDRedo,
                            OrderRedo.kf_OrderID as OrderID,
                           OrderRedo.t_Department as Department,
                           OrderRedo.t_CustomerIssue as CustomerIssue,
                           OrderRedo.t_SalesViewIssue as SalesViewIssue,
                           OrderRedo.t_ResearchedProblem as Problem,
                           OrderRedo.t_Solution as solution')
                 ->from('OrderRedo')
                 ->where('OrderRedo.kf_OrderID',$orderID);
         $query = $this->db->get();
         return $query->result();
    }
    public function insertOrderRedoTable($orderRedoArray)
    {
         $lenArr                  = sizeof($orderRedoArray);
         
         for($i = 0; $i<$lenArr; $i++)
         {
             $this->db->insert('OrderRedo', $orderRedoArray[$i]);

         }
         
         return $this->db->insert_id();
        
        
    }
    public function getAllOrderRedoDataFromOrderID($orderID)
    {
        $query = $this->db->get_where('OrderRedo',array('kf_OrderID'=>$orderID));
         
        return $query->result_array();
        
    }        
    public function getAllOrderRedoData($orderRedoID)
    {
        $query = $this->db->get_where('OrderRedo',array('kp_OrderRedoID'=>$orderRedoID));
         
        return $query->row_array();
        
    } 
    public function updateOrderRedoTable($orderRedoID,$data)
    {
        $this->db->where('kp_OrderRedoID', $orderRedoID);
        $this->db->update('OrderRedo',$data);
        
    }
    public function getOrderRedoImageContent($orderRedoID,$orderID,$dateReceived)
    {
        $dateOrderReceivedArr       = explode("-", $dateReceived);
        
        $yearOrder                  = $dateOrderReceivedArr[0];
        
        $monthOrder                 = $dateOrderReceivedArr[1];
        
        $path                       = $this->imageUploadPath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID;
        
        $fullPath                   = $path.'/'.'Redo'.'/'.$orderRedoID;
        
        $image = array();
        
        if(file_exists($fullPath))
        {
            $files = scandir( $fullPath);
           
            $filesArry = array_diff($files,array('.','..','.DS_Store'));
            //var_dump($filesArry);
            foreach($filesArry as $file)
            {
                $imagePath           = $this->loadImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID.'/'.'Redo'.'/'.$orderRedoID.'/'.$file;
                $imageHref           = $this->loadImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID.'/'.'Redo'.'/'.$orderRedoID.'/'.$file;
               
                $actualImageName     = $file;
                
                $image[] = array(
                   'imageUrl' => $imagePath,
                   'imagehref' => $imageHref,
                   'imageName' => $actualImageName);
              
               //return $image;

            } 

            
        }
        //var_dump($image);
        if(!is_null($image))
        {
            return $image;
        }    
        else
        {
            return null;
        }    
        
    }    
}

?>
