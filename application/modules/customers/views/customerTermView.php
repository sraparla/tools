<!doctype html>

<html>
  <!-- Built with Divshot - http://www.divshot.com -->
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">  
    <title>Customer Terms</title>
    <base href="<?php echo base_url(); ?>" />
<!--    <meta name="viewport" content="width=device-width">-->
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
   
    <script type="text/javascript">
            var donePullingQBCusTerms      = "<?php echo $donePullingQBCusTerms;?>";
            var customerID                 = "<?php echo $customerID;?>";
    </script>
    
    <script src="js/jquery.validate.min.js"></script>
    
    <script src="js/additional-methods.min.js"></script>
    
    <script src="js/customerModuleTerms.js"></script>
    <style type="text/css">
        #myModal .modal-dialog
        {
          width: 300px;/* your width */
        }
        .customInline {
            display:inline-block;
        }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="row">
        <br>
        <div class="col-md-7">
          <form id="submitCustomerTermsDataFrm" name="submitCustomerTermsDataFrm" class="form-horizontal" role="form">
            <div class="form-group">
              <label for="customerNumberID" class="col-md-3 control-label">Account #</label>
              <div class="col-md-9">
                <input id ="customerNumberID" name="customerNumberID"  type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label for="customerQBCustID" class="col-md-3 control-label">QB's ID</label>
              <div class="col-md-9">
                <input id="customerQBCustID" name="customerQBCustID" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group salesShow">
              <label for="qbSalesRepRef_FullName" class="col-md-3 control-label">Salesperson</label>
              <div class="col-md-9">
                <input id="qbSalesRepRef_FullName" name="qbSalesRepRef_FullName" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group salesShow">
              <label for="qbTermsRef_FullName" class="col-md-3 control-label">Terms</label>
              <div class="col-md-9">
                <select id="qbTermsRef_FullName" name="qbTermsRef_FullName" class="form-control">
                  <option value="COD">COD</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 30 - CC">Net 30 - CC</option>
                  <option value="Net 45">Net 45</option>
                </select>
              </div>
            </div>
            <div class="form-group salesShow">
              <label for="qbCreditLimit" class="col-md-3 control-label">Credit Limit</label>
              <div class="col-md-9">
                <input id="qbCreditLimit" name="qbCreditLimit" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label for="customerDownPaymentReqOver" class="col-md-3 control-label">Down Payment Over</label>
              <div class="col-md-9">
                <input id="customerDownPaymentReqOver" name="customerDownPaymentReqOver" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label for="customerPerAllowedOverCredit" class="col-md-3 control-label">% Allowed Over Credit Limit</label>
              <div class="col-md-9">
                <select id="customerPerAllowedOverCredit" name="customerPerAllowedOverCredit" class="form-control" >
                  <option value="0.010">0%</option>
                  <option value="0.050">5%</option>
                  <option value="0.100">10%</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="customerPastDueNoOrders" class="col-md-3 control-label">Past Due No Orders</label>
              <div class="col-md-9">
                <select id="customerPastDueNoOrders" name="customerPastDueNoOrders" class="form-control">
                  <option  value="0">0</option>
                  <option  value="15">15</option>
                  <option  value="30">30</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="customerCreditAvailable" class="col-md-3 control-label">Credit Available</label>
              <div class="col-md-9">
                <input id="customerCreditAvailable" name="customerCreditAvailable" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group salesShow">
              <label class="control-label col-md-3">Run CC Up Front</label>
              <div class="col-md-9">
                <div class="checkbox">
                  <label>
                    <input onclick="return false" id="customerRunCCUpFront" name="customerRunCCUpFront" type="checkbox" value="1">
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group salesShow">
              <label class="control-label col-md-3">Credit Hold</label>
              <div class="col-md-9">
                <div class="checkbox">
                  <label>
                    <input onclick="return false" id="customerCreditHold" name="customerCreditHold" type="checkbox" value="1">
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group salesShow">
              <label for="customerCreditHoldReason" class="col-md-3 control-label">Credit Hold Type</label>
              <div class="col-md-9">
                <input id="customerCreditHoldReason" name="customerCreditHoldReason" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-9 col-md-offset-3">
                <button id="submit_qbDBCus_btDBCus_UpdateFrm" type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
            <input type="hidden" name="customerNumberIDHidden" id="customerNumberIDHidden">
            <input type="hidden" name="customerQBCustIDHidden" id="customerQBCustIDHidden">
          </form>
        </div>
        <div class="col-md-5">
          <table class="table table-striped table-bordered table-condensed">
            <thead>
              <tr>
                <th></th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Current</td>
                <td><?php echo "$".number_format($current,2); ?></td>
              </tr>
              <tr>
                <td>1-30</td>
                <td><?php
                if($balance_1_30 >0)
		{
                    echo '<font color="#FF0000">$'.number_format($balance_1_30,2).'</font>';
                }
                else
                {
                    echo "$".number_format($balance_1_30,2);
                }    
                ?>
                </td>
              </tr>
              <tr>
                <td>31-60</td>
                <td><?php
                if($balance_31_60 >0)
		{
                    echo '<font color="#FF0000">$'.number_format($balance_31_60,2).'</font>';
                    
                }
                else
                {
                    echo "$".number_format($balance_31_60,2);
                }    
                ?>
                </td>
              </tr>
              <tr>
                <td>61-90</td>
                <td><?php 
                if($balance_61_90 >0)
	        {
                    echo '<font color="#FF0000">$'.number_format($balance_61_90,2).'</font>';
                }
                else
                {
                    echo "$".number_format($balance_61_90,2);
                    
                }
                ?>
                </td>
                
              </tr>
              <tr>
                <td>Greater 90</td>
                <td><?php 
                if($balance_greater_90 >0)
	        {
                    echo '<font color="#FF0000">$'.number_format($balance_greater_90,2).'</font>';
                }
                else
                {
                    echo "$".number_format($balance_greater_90,2);
                    
                }
                ?>
                </td>
              </tr>
              <tr>
                <td>Total Invoices Past Due</td>
                <td><?php 
                if($totalInvoicesPastDue >0)
	        {
                    echo '<font color="#FF0000">$'.number_format($totalInvoicesPastDue,2).'</font>';
                }
                else
                {
                    echo "$".number_format($totalInvoicesPastDue,2);
                    
                }
                ?>
                </td>
              </tr>
              <tr>
                <td>Grand Total Invoiced</td>
                <td><?php echo "$".number_format($grandTotalInvoiced ,2); ?></td>
              </tr>
            </tbody>
          </table>
          <br>
          <table class="table table-striped table-bordered table-condensed">
            
            <tbody>
              <tr>
                <td>Unused Payment</td>
                <td><?php echo "$".number_format($TotalUnusedPayment,2); ?></td>
              </tr>
              <tr>
                <td>Credit Memo Remaining</td>
                <td><?php echo "$".number_format($CreditRemaining,2); ?></td>
              </tr>
              <tr>
                <td>Work In House</td>
                <td><?php echo "$".number_format($WorkInHouseTotalAmount,2); ?></td>
              </tr>
              <tr>
                <td>Total On Account</td>
                <td><?php echo "$".number_format($totalOnAccount,2); ?></td>
              </tr>
              <tr>
                <td>Credit Available</td>
                <td><?php 
                if($creditAvailable < 0)
	        {
                    echo '<font color="#FF0000">$'.number_format($creditAvailable,2).'</font>';
                }
                else if($creditAvailable == 0)
	        {
                    //echo '<font color="#FF0000">$'.number_format($creditAvailable,2).'</font>';
                    echo '$'.number_format($creditAvailable,2);
                }
                else
                {
                    echo '<font color="green">$'.number_format($creditAvailable,2).'</font>';
                    
                }
                ?>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="myModal" class="modal fade"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
<!--                         <button id="closeMyModalTopBtn" type="button" class="close" aria-hidden="true">&times;</button>-->
                         <h3 class="modal-title" id="myModalLabel">Please wait</h3>
                    </div>
                    <div class="modal-body">
                        <p id="message">
                            <img src="images/ajaxLoad/ajax-loader.gif" alt="Ajax Loading Animation" />&nbsp;&nbsp;&nbsp;&nbsp;<span><strong id="msgResult">Getting Data...</strong></span>
                        </p>
                    </div>
                    <div class="modal-footer">
<!-- tabindex="-1"  <button id="closeMyModalBtn" type="button" class="btn btn-default hide">Close</button>-->
<!--                <button id="closeMyModalBtn" type="button" class="btn btn-default hide" data-dismiss="modal">Close</button>-->
                    </div>
                </div>
            </div>
      </div>  
    </div>
  </body>

</html>
