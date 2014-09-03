<?php
class vsportjobsmfgmodel extends CI_Model 
{
    //put your code here
    public function __construct() 
    {
        
        //return $query->list_fields();
        
    }
    public function getAllVsportJobsMFGData()
    {
//        $this->db->select('Indy ID as indyID, 
//                                   Sport ID as sportID,
//                                   Customer PO as custPO,
//                                   Job Due as jobDue,
//                                   Time Due as timeDue,
//                                   Job Name as jobName,
//                                   Total Items as totalItems,
//                                   Need Art as needArt,
//                                   Proof Out as prrofOut,
//                                   MFG,
//                                  Ready to Pickup as readyToPickup,
//                                  Ready to Ship as readyToShip,
//                                  Hold,
//                                  Shipped,
//                                  Picked Up as pickedUp,
//                                  Cancelled FROM vSportJobsMFG'); 
        
        $query = $this->db->select('*')->from('vSportJobsMFG')->get();
        return $query->result_array();
        //$query = $this->db->get('vSportJobsMFG');
        //return $query->result_array();
    }        
}

?>
