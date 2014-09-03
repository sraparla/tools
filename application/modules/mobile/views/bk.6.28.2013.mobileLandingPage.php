<!DOCTYPE html>
<html ang="en">
    <head>
        <meta charset=UTF-8">
        <meta name="viewport" content="width=device-width,
              initial-scale=1, maximum-scale=1">
        <title>Status</title>
        <base href="<?php echo base_url(); ?>" />
        <!--include the jQuery Mobile stylesheet  -->
        <link rel="stylesheet" href="jqueryMobile/jquery.mobile-1.3.1.css">
        
        <!--Jquery Mobile Simple Dialog CSS -->
<!--        <link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog.min.css" /> -->
        
        <link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.min.css" /> 
        
        <!--include the jQuery and jQuery Mobile javascript files -->
        <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
        
        <script src="js/jquery.validate.min.js"></script>
        <script src="js/additional-methods.min.js"></script>
        
        <script type="text/javascript" charset="utf-8" src="jqueryMobile/jquery.mobile-1.3.1.js"></script>
        
        <!--Jquery Mobile Simple Dialog js file -->
<!--        <script type="text/javascript" src="http://dev.jtsage.com/cdn/simpledialog/latest/jquery.mobile.simpledialog2.min.js"></script>-->
         
        <script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.core.min.js"></script>
        <script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.calbox.min.js"></script>
        <script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
        
        
        <script src="js/clearFormMobile.js"></script>
        <script typr="text/javascript" charset="utf-8" src="js/mobileModuleLandingPage.js"></script>
        
        <style type="text/css">
               label.error {
                    color: red;
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 1.4;
                    margin-top: 0.5em;
                    width: 100%;
                    float: none;
                }

                @media screen and (orientation: portrait){
                    label.error {
                        margin-left: 0;
                        display: block;
                    }
                }

                @media screen and (orientation: landscape){
                    label.error {
                        display: inline-block;
                        margin-left: 22%;
                    }
                }
        </style>
    
    </head>
    <body>
        <!-- Start of Landing page -->  
        <div data-role="page" id="home">
            <div data-role="header"  data-id="toolbar" data-position="fixed">
                <h1>Home</h1>
            </div>
            <div data-role="content">
                <ul data-role="listview" data-divider-theme="b" data-inset="true">
                    <li data-theme="c">
                        <a data-ajax="false" href="mobileOrderStatus">Orders</a>
                    </li>
                    <li data-theme="c">
                        <a href="#inventory" data-transition="slide">Inventory</a>
                    </li>
                </ul>
            </div>
        </div>
       <!-- End of Landing page -->
       
        <!-- Start of first page -->
        <div data-role="page" id="inventory">
            <div data-role="header" data-id="toolbar" data-position="fixed">
                <a href="#home" data-icon="arrow-l">Back</a>
                <h3>Inventory</h3> 
            </div>
            <div data-role="content">
                <ul data-role="listview" data-divider-theme="b" data-inset="true">
                    <li data-theme="c">
                         <a href="#locations" data-transition="slide">Locations</a>
                    </li>
<!--                    <li data-theme="c">
                        <a href="#items" data-transition="slide">Items</a>
                    </li>
                    <li data-theme="c">
                        <a href="#map" data-transition="slide">Map</a>
                   </li>-->
                </ul>
            </div>
            
        </div>
        <!-- Start of first page -->
        
        <!-- Start of second page inventory Locations -->
        <div data-role="page" id="locations">

            <div data-role="header"data-id="toolbar" data-position="fixed">
                <a href="#inventory" data-icon="arrow-l">Back</a>
                <h1>Locations</h1> 
            </div>
            <!-- /header -->

            <div data-role="content">
                <ul id="autocompletelocation" data-role="listview" data-inset="true" data-filter="true" data-filter-placeholder="Find a location..." data-filter-theme="d"></ul>
            </div>
            <!-- /content -->

        </div>
        <!-- End of second page inventory Locations -->
        
         <!-- Start of third page Items in inventory locations -->
         <div data-role="page" id="items">
             <div data-role="header"data-id="toolbar" data-position="fixed">
                  <a href="#locations" data-icon="arrow-l" >Back</a>
                   <h1 id="itemHeadingPage">Items Need wx1...</h1>
                    <a id="addInvItemLocationPopupBtn" href="#" data-rel="popup" data-position-to="window" data-inline="true" data-transition="pop" data-icon="plus" >Add</a>
             </div>
             <div data-role="content">
                 <ul id="itemlist" data-role="listview" data-inset="true" data-filter-theme="d"></ul>
             </div>
             <div data-role="popup" id="addInvItemLocation" data-theme="a" class="ui-corner-all">
                 <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
                 <form name="addInvItemLocationFrm" id="addInvItemLocationFrm">
                     <div style="padding:10px 20px;">
                         <!-- On Click h3 should be update to current InventoryLocations.t_Location  -->
                         <h3 id="locationInventoryItemIDAdd"></h3>
                         <label for="text-basic">Item #:</label>
                         <input type="text" name="inventoryItemIDBasic" id="inventoryItemIDBasic">
                         <label for="slider">Qty In Location:</label>
                         <input type="range" name="sliderDynamicAdd" id="sliderDynamicAdd" step="0.01" value="1" min="1" max="100"> 
                         <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                             <a id="decrementSlideDynamicByOneAdd" href="#" data-role="button" data-icon="minus" data-theme="b">1</a>
                             <a id="incrementSlideDynamicByOneAdd" href="#" data-role="button" data-icon="plus" data-theme="b">1</a>
                         </div>
                         <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                             <a id="incrementSlideDynamicByPointTwoFiveAdd" href="#" data-role="button" data-icon="plus" data-theme="b">.25</a>
                             <a id="incrementSlideDynamicByPointFiveAdd" href="#" data-role="button" data-icon="plus" data-theme="b">.5</a>
                             <a id="incrementSlideDynamicByPointSevenFiveAdd" href="#" data-role="button" data-icon="plus" data-theme="b">.75</a>
                        </div>
                        <a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>
                        <a  id ="addInvItemLocationFrmSaveBtn"   href="#" data-role="button" data-inline="true" data-rel="back" data-theme="b">Save</a>
                     </div>
                     <input type="hidden" name="inventoryLocationIDHidden" id="inventoryLocationIDHidden">
                 </form>
             </div>
             <div data-role="popup" id="editInvitemLocation" data-theme="a" class="ui-corner-all">
                 <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
                 <form name="editInvItemLocationFrm" id="editInvItemLocationFrm">
                     <div style="padding:10px 20px;">
                         <!-- On list view click this shows InventoryLocations.t_Location + "-" + InventoryLocationItems.kf_InventoryItemID  -->
                         <h3 id="locationInventoryItemIDEdit">WX1 - 123432</h3>
                         <label for="slider">Qty In Location:</label>
                         <!-- This slider value should be set to the value of the item they clicked on in the list-->
                         <input type="range" name="sliderDynamicEdit" id="sliderDynamicEdit" step="0.01" value="0" min="0" max="100"> 
                         <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                             <a id="decrementSlideDynamicByOneEdit" href="#" data-role="button" data-icon="minus" data-theme="b">1</a>
                             <a id="incrementSlideDynamicByOneEdit" href="#" data-role="button" data-icon="plus" data-theme="b">1</a>
                         </div>
                         <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                             <a id="incrementSlideDynamicByPointTwoFiveEdit" href="#" data-role="button" data-icon="plus" data-theme="b">.25</a>
                             <a id="incrementSlideDynamicByPointFiveEdit" href="#" data-role="button" data-icon="plus" data-theme="b">.5</a>
                             <a id="incrementSlideDynamicByPointSevenFiveEdit" href="#" data-role="button" data-icon="plus" data-theme="b">.75</a>
                        </div>
                        <a id  ="editInvItemLocationFrmDeleteBtnEdit" href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c" data-icon="delete">Delete</a>
                        <a  id ="editInvItemLocationFrmSaveBtnEdit"   href="#" data-role="button" data-inline="true" data-rel="back" data-theme="b">Save</a>
                     </div>
                     <input type="hidden" name="inventoryItemIDHidden"         id="inventoryItemIDHidden">
                     <input type="hidden" name="inventoryLocationItemIDHidden" id="inventoryLocationItemIDHidden">
                 </form>
             </div>
         </div>

