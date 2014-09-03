<?php $this->load->view('homeheader_view'); ?>
<div class="container-fluid">
    <div class="row-fluid">  <!--Set class="row-fluid" changes entire spacing-->
        <div class="span3">
            
            <div class="backborder">
            <div id="datepicker" data-date=""></div>
            <button class="btn" id="todayButton">Today</button>
            </div>
            
            <div id="table1">  <!-- Table Orders Due -->
                <table class="table table-striped table-bordered table-condensed">
                            <thead>
                        <tr>
                            <th>Due</th>
                            <th>O</th>
                            <th>Oi</th>
                            <th>SqFt</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($result1 as $row):?> 

                                <tr>
                                    <td><?php echo date('m-d-Y',strtotime($row->d_JobDue)); ?></td>
                                    <td><?php echo $row->Total_Orders; ?></td>
                                    <td><?php echo round($row->OiCount); ?></td>
                                    <td><?php echo round($row->SqFt); ?></td>

                                </tr>
                        <?php endforeach;?> 
                    </tbody>

                </table>
            </div>
            
            <div id="table2">  <!-- Table Orders Received -->
                <table class="table table-striped table-bordered table-condensed">
                            <thead>
                        <tr>
                            <th>Received</th>
                            <th>O</th>
                            <th>Oi</th>
                            <th>SqFt</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach($result2 as $row):?> 

                                <tr>
                                    <td><?php echo date('m-d-Y',strtotime($row->d_Received)); ?></td>
                                    <td><?php echo $row->Total_Orders; ?></td>
                                    <td><?php echo round($row->OiCount); ?></td>
                                    <td><?php echo round($row->SqFt); ?></td>

                                </tr>
                        <?php endforeach;?> 
                    </tbody>

                </table>
            </div>
            
        </div> <!-- Close Span3 -->

        
        <div class="span9">
            

            <div class="well well-small">
                <input type="text" class="span2" value="<?php echo $dateloaded;?>" id="dp1" data-date="" >
                <select id="machine" class="span1"> 
                    <option></option>
                    <option>XP</option>
                    <option>GS</option>
                    <option>EP</option>
                    <option>TX</option>
                    <option>RO</option>
                </select>
            </div>
            

            
             <div id="content">
                <ul class="nav nav-tabs" id="myTabs">
                    <li class="active"><a href="#inProcess" data-toggle="tab">In Process</a></li>
                    <li><a href="#finished" data-toggle="tab">Finished</a></li>
                    <li><a href="#byMachine" data-toggle="tab">By Machine</a></li>
                    <li><a href="#activeStatus" data-toggle="tab">Active Status</a></li>
                    <li><a href="#onPress" data-toggle="tab">On Press</a></li>
                    <li><a href="#byShipper" data-toggle="tab">By Shipper</a></li>
                    <li><a href="#readyToPickup" data-toggle="tab">Ready to Pickup</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="inProcess">
                      
                    </div>
                    <div class="tab-pane" id="finished">
                        
                    </div>
                    
                    <div class="tab-pane" id="byMachine">

                    </div>
                    
                    <div class="tab-pane" id="activeStatus">

                    </div>
                    
                    <div class="tab-pane" id="onPress">

                    </div>
                    
                    <div class="tab-pane" id="byShipper">

                    </div>
                    
                    <div class="tab-pane" id="byShipper">

                    </div>
                    
                    <div class="tab-pane" id="readyToPickup">

                    </div>
                </div>
            </div> <!-- Close Content for Tabs -->

        </div> <!-- Close Span9 -->
    </div> <!-- Close Row Fluid if used -->
    </div> <!-- Close container used -->
<?php $this->load->view('homefooter_view'); ?>