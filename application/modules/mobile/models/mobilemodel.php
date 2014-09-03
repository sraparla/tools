<?php

class MobileModel extends CI_Model
{
    var $imageUploadPath;
          
    public function __construct() 
    {
        parent::__construct();
       
        //localhost image path
        //$this->imageUploadPath = realpath(APPPATH . '../uploadImages');
        
        //Server image path
        $this->imageUploadPath = realpath(APPPATH . '../../images/Orders');
        
        //locahost image load path
        //$this->loadImagePath   = base_url().'uploadImages';
        
        //Server image load path
        $this->loadImagePath   = 'http://'.$_SERVER['SERVER_NAME'].'/images/Orders';
        
        //serverside image load path
        
        
        
    }
    
    public function getImages($orderItemID,$orderID,$dateReceived)
    {
        $dateOrderReceivedArr = explode("-", $dateReceived);
        
        $yearOrder            = $dateOrderReceivedArr[0];
        
        $monthOrder           = $dateOrderReceivedArr[1];
        
        $path                 = $this->imageUploadPath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID;
        
        if(file_exists($path.'/'.$orderItemID.'/'."inspection"))
        {
            $files = scandir( $path.'/'.$orderItemID.'/'."inspection");
            $files = array_diff($files,array('.','..','.DS_Store','thumb'));
            //print_r($files);
        
            foreach($files as $file)
            {
                //$thumbExtension = "_thumb";
                $imagePath       = $this->loadImagePath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID.'/'.$orderItemID.'/'.'inspection'.'/'.$file;
                $thumbPath      = $imagePath;
                //$thumbPath      = $imagePath.$thumbExtension;
                $image[] = array(
                    'imageUrl' => $imagePath,
                    'thumbUrl' => $thumbPath
                );

            }
            return $image;
            
        }
        else
        {
            return null;
        }    
    }        
    public function doCustomUploadFiles($orderItemID=null,$orderID=null,$dateReceived=null)
    {
        //date_default_timezone_set('America/Indianapolis');
        // load the codeigniter image library
        $this->load->library('image_lib');
        
        //check for the mount file if mount file exist do uploading or exit the uploading process.
        if(file_exists(realpath(APPPATH . '../../images/.am_i_mounted'))&& !is_null($dateReceived))
        {
            $dateOrderReceivedArr  = explode("-", $dateReceived);
            
            $yearOrder  = $dateOrderReceivedArr[0];
            
            $monthOrder = $dateOrderReceivedArr[1];
            //print_r($_FILES['Filedata']);
            for ($file = 0; $file < count($_FILES['Filedata']['tmp_name']); $file++)
            {
                $tmpName          = $_FILES['Filedata']['tmp_name'][$file];
            
                $uploadedFileName = $_FILES['Filedata']['name'][$file];
                
                if(!is_dir($this->imageUploadPath.'/'.$yearOrder.'/'.$monthOrder))
                {
                    if(!mkdir($this->imageUploadPath.'/'.$yearOrder.'/'.$monthOrder,0777,TRUE))
                    {
                        die("Failed to create Year and Month Folders");
                    }        
                    
                }        
            
               
                $path              =$this->imageUploadPath.'/'.$yearOrder.'/'.$monthOrder.'/'.$orderID;
                if(!is_dir($path)) // checks if the order# has a folder or not
                {
                    if(!mkdir($path.'/'.$orderItemID.'/'."inspection".'/'."thumb",0777,TRUE))
                    {
                        die('Failed to create Order and other folders...');
                    }
                    else
                    {
                        chmod($path, 0777);
                        
                         //change the directory owner/group permission for OrderItemID folder
                        chmod($path.'/'.$orderItemID, 0777);

                        //change the directory owner/group permission for inspection folder
                        chmod($path.'/'.$orderItemID.'/'."inspection", 0777);

                        //change the directory owner/group permission for thumb folder
                        chmod($path.'/'.$orderItemID.'/'."inspection".'/'."thumb", 0777);
                    }    
                }
                if(!is_dir($path.'/'.$orderItemID)) // checks if the orderitemid# has a folder or not if the order# already has a folder.
                {
                    if(!mkdir($path.'/'.$orderItemID.'/'."inspection".'/'."thumb",0777,TRUE))
                    {
                        die('Failed to create OrderItem and other folders...');
                    }
                    else
                    {
                        //change the directory owner/group permission for OrderItemID folder
                        chmod($path.'/'.$orderItemID, 0777);

                        //change the directory owner/group permission for inspection folder
                        chmod($path.'/'.$orderItemID.'/'."inspection", 0777);

                        //change the directory owner/group permission for thumb folder
                        chmod($path.'/'.$orderItemID.'/'."inspection".'/'."thumb", 0777);

                    }

                }
                if(!is_dir($path.'/'.$orderItemID.'/'.'inspection'))
                {
                    if(!mkdir($path.'/'.$orderItemID.'/'."inspection".'/'."thumb",0777,TRUE))
                    {
                        die('Failed to create Inspection and other folders...');
                    }
                    else
                    {
                        //change the directory owner/group permission for inspection folder
                        chmod($path.'/'.$orderItemID.'/'."inspection", 0777);

                        //change the directory owner/group permission for thumb folder
                        chmod($path.'/'.$orderItemID.'/'."inspection".'/'."thumb", 0777);
                    }    
                    
                }        
                $count = 1;
                $newFileName      = $path.'/'.$orderItemID.'/'."inspection".'/'.$count.'_'.$uploadedFileName;
                //echo "<br/>".$tmpName."<br/>";
               
                //echo "<br/>Before File Name: ".$newFileName."<br/>";
               

                while(file_exists($newFileName))
                {
                    $count++;
                    //echo "<br/>count: ".$count."<br/>";
                    $newFileName      = $path.'/'.$orderItemID.'/'."inspection".'/'.$count.'_'.$uploadedFileName;
                    //echo "<br/>inside: ".$newFileName."<br/>";
                }    
                //echo "<br/>After File Name: ".$newFileName."<br/>";
               
                if(move_uploaded_file($tmpName, $newFileName))
                {
                    $msg                      = "File Uploaded";
                
                    //chmod($this->imageUploadPath.'/'.$orderID.'/'.$orderItemID.'/'."inspection".'/'."thumb", 0777);

                    $config                   = array(
                    //'image_library'=> 'gd2',
                    'source_image' => $newFileName,
                    'new_image'	  => $path.'/'.$orderItemID.'/'."inspection".'/'."thumb",  

                    'create_thumb'    => TRUE,
                    'maintain_ratio'  => TRUE,
                    'thumb_marker'    =>'',       
                    'width'	  =>175,
                    'height'  =>175   

                    );
                    $config['image_library'] = 'gd2';
                    //print_r($config);

                    $this->image_lib->initialize($config);
                    //$this->load->library('image_lib',$config);


                    //echo "<br/>";
                    //var_dump(gd_info());
                    //echo "<br/>";
                
                    if (!$this->image_lib->resize())
                    {
                        $msg = $this->image_lib->display_errors();
                    }
                    else
                    {
                        $this->image_lib->clear();
                    }
              
                } 
                else 
                {
                    $msg = "Sorry, Couldn't upload your image. Contact IT".$_FILES['Filedata']['error'][$file];
                }
              
            
            }
            
        }
        else
        {
            $msg = "mount not ready";
        }
        //echo $msg;
        return $msg;
        
        
    }        
    public function doUploadFiles()
    {
        $config = array('allowed_types' => 'jpg|jpeg|png|gif',
                        'upload_path'   => $this->imageUploadPath);
        $this->load->library('upload',$config);
        //$this->load->library('MY_Upload',$config);
        echo "hi1";
        //$this->load->library('MY_Upload');
        
        //print_r($_FILES);
        
        foreach($_FILES as $field => $file)
        {
            // No problems with the file
            if($file['error'] == 0)
            {
                // So lets upload
                if ($this->upload->do_multi_upload($field))
                {
                    echo "hi2";
                    $data = $this->upload->data();
                }
                else
                {
                    $errors = $this->upload->display_errors();
                }
                
            }
        }
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
        $query = $this->db->query("SELECT  OrderItems.kp_OrderItemID,OrderItems.kf_OrderID,ifnull(OrderItems.t_OiStatus,'') as t_OiStatus, 
                                  OrderItems.n_DashNum,Equipment.t_EquipAbr, 
                                  OrderItemComponents.n_Quantity,OrderItemComponents.n_HeightInInches, 
                                  OrderItemComponents.n_WidthInInches,BuildItems.kf_ManCatID, 
                                  BuildItems.t_Name,
                                  concat(trim(trailing \".jpg\" from OrderItems.t_OrderItemImage),\"_thumb.jpg\") as t_OrderItemImage,
                                  Orders.d_Received
                          FROM OrderItems 
                             INNER JOIN OrderItemComponents OIC ON OrderItems.kp_OrderItemID = OIC.kf_OrderItemID
                             INNER JOIN Equipment ON OIC.kf_EquipmentID = Equipment.kp_EquipmentID
                             INNER JOIN OrderItemComponents ON OrderItems.kp_OrderItemID = OrderItemComponents.kf_OrderItemID
                             INNER JOIN BuildItems ON OrderItemComponents.kf_BuildItemID = BuildItems.kp_BuildItemID
                             INNER JOIN Orders ON OrderItems.kf_OrderID = Orders.kp_OrderID
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
