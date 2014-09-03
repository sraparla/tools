<?php  //if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class HolidayController extends MX_Controller 
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->model('holidaymodel');
    }
    public function index()
    {
        
    }
    public function getAllHolidayList($currentDate=null)
    {
        //$currentDate = '2014-01-01';
        
        date_default_timezone_set('America/Indianapolis');
        
        $resultArry = $this->holidaymodel->getAllHolidays();
        
        //print_r($resultArry);echo "<br/><br/>";
        for($i=0; $i<sizeof($resultArry); $i++)
        {
            if(in_array($currentDate, $resultArry[$i]))
            {
                //echo $resultArry[$i]['t_HolidayDescription'];
                return true;
                
            }
            else
            {
                return false;
            }    
            
        }
        
    }
}

?>
