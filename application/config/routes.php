<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

//$route['default_controller']  = "welcome";
$route['logout']                              = "employees/employeecontroller/logout";
//$route['default_controller']                  = "employees/employeecontroller";

$route['default_controller']                  = "vsporttools/vsporttoolscontroller";
$route['sizeCalculator']                      = "vsporttools/vsporttoolscontroller/loadsizeCalculationView";

$route['upload']                              = "upload/uploadcontroller/loadCustomerUploadView/";

$route['summary']                              = "vsportjobsmfg/vsportjobsmfgcontroller";


$route['orders/(:num)']                       = "orders/ordercontroller/getOrderandOrderItemsByOrderID/$1";
$route['orderShip/(:num)']                    = "orderShip/ordershipcontroller/index/$1";
$route['odrTracking/(:num)']                  = "orderShipTracking/ordershiptrackingcontroller/index/$1";
$route['addresses/(:num)']                    = "addresses/addresscontroller/index/$1";
$route['otherCharges/(:num)']                 = "otherCharges/otherchargecontroller/index/$1";
$route['orderContacts/(:num)']                = "orderContacts/ordercontactcontroller/index/$1";
$route['statusLog/(:num)']                    = "statusLog/statuslogcontroller/index/$1";

$route['orderItemUpSideFrm/template/(:num)']  = "orderItems/orderitemcontroller/orderItemUpSideFrm/template/$1";

$route['orderItemUpSideFrm/read/(:num)']      = "orderItems/orderitemcontroller/orderItemUpSideFrm/read/$1";

$route['orderItemUpSideFrm/create/(:num)']    = "orderItems/orderitemcontroller/orderItemUpSideFrm/create/$1";

$route['statusLog/orderChange/(:num)']        = "statusLog/statuslogcontroller/orderChange/$1";

$route['statusLog/orderItemChange/(:num)']    = "statusLog/statuslogcontroller/orderItemChange/$1";

$route['orderItems/(:num)']                   = "orderItems/orderitemcontroller/index/$1";

$route['orderItemComponents/setup/(:any)/(:num)/(:num)']    = "orderItemComponents/orderitemcomponentcontroller/setup/$1/$2/$3";

$route['orderItems/dup/(:num)']               = "orderItems/orderitemcontroller/dup/$1";

//$route['mobile']                              = "mobile/mobilecontroller/displayMobileJobStatusView";

$route['mobile']                              = "mobile/mobilecontroller/displayMobileLandingPage";

$route['mobileOrderStatus']                   = "mobile/mobilecontroller/displayMobileJobStatusView";

$route['mLineItems/(:num)/(:any)']            = "mobile/mobilecontroller/getMobileLineItemPage/$1/$2";


$route['mLineItemsView/(:num)/(:any)/(:any)'] = "mobile/mobilecontroller/mobileLineItemDetailsView/$1/$2/$3";


$route['mobileUploads']                       = "mobile/mobilecontroller/uploadFiles";

$route['mobileTesting']                       = "mobile/mobilecontroller/displayMobileTestingView";
//$route['odrTracking/ordershiptrackingcontroller'] = "orderShipTracking/ordershiptrackingcontroller";
//$route['mobile']                              = "mobile/mobilecontroller/index/";

//$route['404_override']                        = '';

$route['404_override']                        = 'vsportTools/vsporttoolscontroller/';

$route['quickbooksaging/(:any)']              = "quickBooks/quickbookcontroller/getQuickBookTermsView/$1";

$route['redolist/(:any)']                     = "orderRedo/orderredocontroller/redoListView/$1";

$route['redorequest/(:any)']                  = "orderRedo/orderredocontroller/loadRedoRequestInfo/$1";

$route['redo/(:any)']                         = "orderRedo/orderredocontroller/redoView/$1";

$route['redoReadOnly/(:any)']                 = "orderRedo/orderredocontroller/redoReadOnly/$1";

$route['creditReleaseFrm/(:num)']             = "orders/ordercontroller/loadCreditReleaseFrm/$1";

$route['orderNotes/(:num)/(:any)']            = "orders/ordercontroller/orderNotes/$1/$2";

$route['loadTemplateList/(:num)']             = "orderItems/orderitemcontroller/loadTemplateView/$1";

$route['customerTerm/(:num)']                 = "customers/customercontroller/customerTermView/$1";

$route['orderRequest/(:num)']                 = "orders/ordercontroller/internalOrderFrmView/$1";

$route['orderRequest']                        = "orders/ordercontroller/internalOrderFrmView/";

//$route['salesOrder']                          = "orders/ordercontroller/loadSalesOrderRequestSteps";

$route['salesOrderRequest/(:num)']            = "orders/ordercontroller/loadSalesOrderRequestSteps/$1";

$route['salesOrderRequest']                   = "orders/ordercontroller/loadSalesOrderRequestSteps";

/* End of file routes.php */
/* Location: ./application/config/routes.php */


//http://192.168.1.213/apps/addresses/addresscontroller/index