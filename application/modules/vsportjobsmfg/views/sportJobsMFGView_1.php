<!DOCTYPE html>
<html>
    <head>
       <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>tools</title>
        <base href="<?php echo base_url(); ?>" />
        <link rel="shortcut icon" href="images/ii_logo_fav.png">
        
        <!-- Bootstrap css -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap.css" rel="stylesheet">  
        
        <!-- Jquery JS -->
        <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
        
        
        
        <!-- Bootstrap JS -->
        <script src="<?php echo base_url(); ?>bootstrap3/dist/js/bootstrap.min.js"></script>
        
        <script type="text/javascript" src="<?php echo base_url(); ?>js/jquery-templ.js"></script>
        
        <!-- custom JS -->
        <script src="<?php echo base_url(); ?>js/vsportJobsMFGModule.js"></script>
        
        <style type="text/css">
           
            body { padding-top: 60px; }
            
        </style>
    </head>
    <body>
        <div class="container">
            <div class="table-responsive">
                <table class="table table-bordered" id="sportJobsMFGSummary">
                    <thead>
                        <tr>
                            <th>Indy ID </th>
                            <th>Sport ID</th>
                            <th>Customer PO</th>
                            <th>Time Due</th>
                            <th>Job Due</th>
                            <th>Job Name</th>
                            <th>Total Items</th>
                            <th>Need Art</th>
                            <th>Proof Out</th>
                            <th>MFG</th>
                            <th>Ready to Pickup</th>
                            <th>Ready to Ship</th>
                            <th>Hold</th>
                            <th>Shipped</th>
                            <th>Picked Up</th>
                            <th>Cancelled</th>
                        </tr>  
                    </thead>  
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody> 
                </table>
                <script type="text/template" id="readSportJobMFGTemplate">
                    <tr>
                        <td>${indyID}</td>
                        <td>${sportID}</td>
                        <td>${custPO}</td>
                        <td>${jobDue}</td>
                        <td>${timeDue}</td>
                        <td>${jobName}</td>
                        <td>${totalItems}</td>
                        <td>${needArt}</td>
                        <td>${proofOut}</td>
                        <td>${MFG}</td>
                        <td>${readyToPickup}</td>
                        <td>${readyToShip}</td>
                        <td>${Hold}</td>
                        <td>${Shipped}</td>
                        <td>${pickedUp}</td>
                        <td>${Cancelled}</td>
                    </tr>
               </script>   
            </div>
        </div>
       
    </body>
</html>
