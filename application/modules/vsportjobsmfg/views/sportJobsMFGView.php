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

        <!-- custom JS -->
        <script src="<?php echo base_url(); ?>js/vsportJobsMFGModule.js"></script>

        <style type="text/css">

            body { padding-top: 60px; }
            th { height:100px;}
/*            th.rotate {
                white-space: nowrap;
                -webkit-transform: rotate(270deg);
                -moz-transform: rotate(270deg);
                -ms-transform: rotate(270deg);
                -o-transform: rotate(270deg);
                transform: rotate(270deg);
                display:inline-block;
                height:30px;
                float:left;
                width:30px;
            }*/
            td.rights, th.rights {
                width:20px;
                text-align: center;
            }
            td.date, th.date {
                width:65px;
                text-align: center;
            }
            td.first, th.first {
                width:35px;
                text-align: center;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Tools</a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li><a href="/tools">Upload</a></li>
                            <li class="active"><a href="summary/">Summary</a></li>
                            <li><a href="sizeCalculator/">Size Calculator</a></li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th class="first">Indy ID </th>
                            <th class="first">ID</th>
                            <th class="first">PO</th>
                            <th class="date">Job Due</th>
                            <th>Job Name</th>
                            <th class="rights">Total Items</th>
                            <th class="rights" >Need Art</th>
                            <th class="rights" >Proof Out</th>
                            <th class="rights" >MFG</th>
                            <th class="rights" >RTP Up</th>
                            <th class="rights" >RTS</th>
                            <th class="rights">Hold</th>
                            <th class="rights">Ship</th>
                            <th class="rights">PU</th>
                            <th class="rights">XXX</th>
                        </tr>  
                    </thead>
                    <tbody>
                        <?php foreach ($query as $row): ?>
                            <tr>
                                <td class="rights"><?php echo $row['Indy ID']; ?></td>
                                <td class="rights"><?php echo $row['Sport ID']; ?></td>
                                <td class="rights"><?php echo $row['Customer PO']; ?></td>
                                <td class="date"><?php echo date("m-d-y",strtotime($row['Job Due'])); ?></td>
                                <td class="rights"><?php echo $row['Job Name']; ?></td>
                                <td class="rights"><?php echo $row['Total Items']; ?></td>
                                <td class="rights"><?php echo $row['Need Art']; ?></td>
                                <td class="rights"><?php echo $row['Proof Out']; ?></td>
                                <td class="rights"><?php echo $row['MFG']; ?></td>
                                <td class="rights"><?php echo $row['Ready to Pickup']; ?></td>
                                <td class="rights"><?php echo $row['Ready to Ship']; ?></td>
                                <td class="rights"><?php echo $row['Hold']; ?></td>
                                <td class="rights"><?php echo $row['Shipped']; ?></td>
                                <td class="rights"><?php echo $row['Picked Up']; ?></td>
                                <td class="rights"><?php echo $row['Cancelled']; ?></td>
                            </tr> 
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

        </div>
    </body>
</html>
