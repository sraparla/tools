<div id="table3">
        <?php if(is_array($result)): ?>
                        <table class="table table-striped table-bordered table-condensed">
                                    <thead>
                                <tr>
                                    <th>OrderID</th>
                                    <th>Service</th>
                                    <th>Company Name</th>
                                    <th>Job Name</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>SD</th> 
                                    <th>#</th>
                                    <th>SqFt</th>
                                    <th>T</th>
                                    <th>Press</th>
                                    <th>Cx</th>
                                    <th>Info</th>
                                    <th>Ship</th>
                                    <th>JF</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($result as $row):?> 

                                        <tr>
                                            <td><?php echo anchor("order/find/$row->kp_OrderID", $row->kp_OrderID);?></td>
                                            <td><?php echo $row->t_ServiceLevel; ?></td>
                                            <td><?php echo $row->t_CustCompany; ?></td>
                                            <td><?php echo $row->t_JobName; ?></td>
                                        <?php 		if($row->ti_JobDue == '')
                                                {
                                                ?>
                                                    <td><?php echo ""; ?></td>
                                                <?php
                                                }
                                                else 
                                                {
                                                ?>
                                                    <td><?php echo date('h:i a',strtotime($row->ti_JobDue)); ?></td>
                                                <?php
                                                }

                                                ?>
                                            <td><?php echo $row->t_JobStatus; ?></td>
                                            <td><?php echo $row->nb_SureDate; ?></td>
                                            <td><?php echo round($row->n_OrderItemCount); ?></td>
                                            <td><?php echo round($row->n_OICSqFtSum); ?></td>   
                                            <td><?php echo round($row->n_DurationTime); ?></td>
                                            <td><?php echo $row->t_MachineAb; ?></td>
                                            <td><?php echo round($row->n_Complexity); ?></td>
                                            <td><?php echo $row->t_OrderItemAb; ?></td>
                                            <td><?php echo $row->t_OrdShip; ?></td>
                                            <td><?php echo $row->nb_JobFinished; ?></td>
                                        </tr>
                                        <?php endforeach;?> 
                            </tbody>

                        </table>
                <?php endif; ?>
    </div> <!--Close Table 3-->