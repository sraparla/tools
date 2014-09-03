<?php

class UploadModel extends CI_Model
{
    public function __construct() 
    {
        parent::__construct();
        
        //$this->loadImagePath   = 'http://'.$_SERVER['SERVER_NAME'].'/images/Inventory/Zones/';
       
    }
    public function getUploadDataFromTimeStampCreateDate($date)
    {
        $query = $this->db->query("SELECT * FROM basetables2.Upload
                                     WHERE nb_UploadComplete = 1  and DATE(Upload.ts_CreateDate)='$date'");
        return $query->result_array();
    }
    public function getUploadDataFromUploadID($uploadID)
    {
        $query = $this->db->get_where('Upload', array('kp_Upload' => $uploadID));
        
        return $query->row_array();
        
    }        
    public function updateUploadTable($data,$uploadID)
    {
        $result = $this->db->update('Upload', $data, array('kp_Upload'=>  $uploadID));
        if(!$result)
        {
            return $this->db->_error_message(); 
        }
        else 
        {
            return $this->db->affected_rows();

        }
        
    }
    public function insertUploadTblData($data)
    {
        $this->db->set($data,false);
        
        $this->db->insert('Upload');
        
        return $this->db->insert_id();
    }
    
           
}

?>
