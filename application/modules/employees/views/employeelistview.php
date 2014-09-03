<!DOCTYPE HTML>
<html>  
    <head>  
        <title>Employee</title>
        <base href="<?php echo base_url(); ?>" />
        <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap.css" rel="stylesheet">  
        <link rel="stylesheet" href="<?php echo base_url(); ?>bootstrap3/dist/css/bootstrap-theme.min.css" rel="stylesheet"> 
        <!-- Data Table Bootstrap CSS  -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>extras/TableTools/media/css/TableTools.css">
    <!--    <link rel="stylesheet" href="<?php echo base_url(); ?>media/DT_bootstrap/DT_bootstrap.css">-->
        <link rel="stylesheet" href="<?php echo base_url(); ?>media/dtbs3/dataTables.bootstrap.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/datepicker.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>media/table.css">
        <script type="text/javascript">
            
        </script>
        <style type="text/css">
            #resetSearch {
                text-indent: -1000em;
                width: 16px;
                height: 16px;
                display: inline-block;
                background-repeat: no-repeat;
                position: relative;
                left: -20px; 
                top: 2px;
            }
            body { padding-top: 60px; }
            #checkrow { top: 30px; }


        </style>


    </head>  
    <body> 
        <div class="container" style="margin-top: 10px"> <!-- I had to do this for the top of course after I said dont do inline styles...-->
            <div class="row">
                <div class="col-md-12">
                    <div class="btn-group">
                        <button type="button" class="btn btn-default">
                            <span class="glyphicon glyphicon-plus-sign"></span> Employee
                        </button>
                        <button type="button" class="btn btn-default">
                            <span class="glyphicon glyphicon-search"></span> List View
                        </button>
                    </div>
                </div>
            </div>
            <br> <!-- had to add this for spacing between buttons and table-->
            <div class="row">
                <div class="col-md-12" style="margin-top: 10px">
                    <table class="table table-striped table-bordered table-hover" id="emptable">  
                        <thead>  
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Ext</th> 
                                <th>Department</th>
                                <th>Title</th>
                                <th>Privilege Set</th>  
                                <th>Inactive</th>
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
                            </tr>
                        </tbody> 
                    </table>
                </div>
            </div>
        </div> <!-- Close for Container-->

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">New Employee</h4>
                    </div>
                    <div class="modal-body">
                        <br />
                        <form class="form-horizontal" role="form" id="employeeFrm">
                            <input type="hidden"  id="kp_EmployeeID"  name="kp_EmployeeID">
                            <div class="form-group">
                                <label for="t_UserName" class="col-sm-3 control-label">Name</label>
                                <div class="col-sm-9">
                                    <input type="input" class="form-control" id="t_UserName" placeholder="First Last" name="t_UserName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="t_EmployeeEmail" class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control" id="t_EmployeeEmail" placeholder="Email" name="t_EmployeeEmail">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_Extentsion" class="col-sm-3 control-label">Ext</label>
                                <div class="col-sm-2">
                                    <input type="input" class="form-control" id="n_Extension" name="n_Extension">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="t_Department" class="col-sm-3 control-label">Department</label>
                                <div class="col-sm-9">
                                    <input type="input" class="form-control" id="t_Department" name="t_Department">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="t_Title" class="col-sm-3 control-label">Title</label>
                                <div class="col-sm-9">
                                    <input type="input" class="form-control" id="t_Title" name="t_Title">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="t_PrivilegeSet" class="col-sm-3 control-label">Privilege Set</label>
                                <div class="col-sm-9">
                                    <input type="input" class="form-control" id="t_PrivilegeSet" name="t_PrivilegeSet">
                                </div>
                            </div>
                            <label for="nb_Inactive" class="col-sm-3 control-label">Inactive</label>
                            <div class="col-sm-9">
                                <label class="checkbox-inline">
                                    <input type="checkbox" id="nb_Inactive" name="nb_Inactive">
                                </label>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="submitEmployeeFrm">Save changes</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->




        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="<?php echo base_url(); ?>media/js/orderOverview_jquery.dataTables.js"></script>
        <script src="<?php echo base_url(); ?>extras/TableTools/media/js/TableTools.js"></script>
        <script src="<?php echo base_url(); ?>extras/TableTools/media/js/ZeroClipboard.js"></script>
        <script src="<?php echo base_url(); ?>bootstrap3/dist/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url(); ?>js/jquery.validate.min.js"></script>
        <script src="<?php echo base_url(); ?>js/bootstrap-datepicker.js"></script>
        <script src="<?php echo base_url(); ?>media/dtbs3/dataTables.bootstrap.js"></script>
        <script src="<?php echo base_url(); ?>js/employeeModuleListView.js"></script>

        <script>

        </script>
    </body>  
</html>  


