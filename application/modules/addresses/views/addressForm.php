<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $title;?></title>
<base href="<?php echo base_url(); ?>" />

<link href="js/bootstrap.css" rel="stylesheet" type="text/css">

<style type="text/css">
      body {
         width: 800px;
         padding-top: 40px;
         padding-bottom: 40px;
         background-color: #f5f5f5;
         margin: 0 auto;
         padding: 10px 20px;
      }
      
      legend{
          font-size: 107.5%;
      }
      
      label.error {
                        display: inline-block;
			font-weight: bold;
			color: red;
			font-size: 87.5%;
                        padding: 2px 8px;
			margin-top: 2px;
			
		}

  </style>

<link href="js/bootstrap-responsive.min.css" rel="stylesheet" type="text/css">

<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>

<!--<script src="http://code.jquery.com/jquery-latest.min.js"></script>-->
<script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
<script src="js/jquery.maskedinput.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/additional-methods.min.js"></script>

<script src="js/bootstrap.min.js"></script>
<script src="js/clearForm.js"></script>

<script src="js/memberAddress.js"></script>

</head>

<body>
    <div class="container-fluid">
        <form class="form-horizontal" name="AddressForm" id="AddressForm">
<!--        <form class="form-horizontal" name="AddressForm" id="AddressForm"  method="POST" action="ship/homecontroller/addressSubmit">    -->
        <section class="row-fluid">
            <div class="span9">
                
                     <fieldset>
                        <legend><?php echo $title ?> Contact Info</legend>
                       
                            
                                
                                <div class="controls">
                                    <input type="text" class="input-xlarge" placeholder="Company Name"  name="companyName" id="companyName">
                                     <label id="companyNameError" class="error">*</label><label></label>
<!--                                     <label class="error">*</label><label></label>-->
                                 </div>
                                
                                 <div class="controls">
                                     <input type="text" class="input-xlarge"  placeholder="Contact Name" name="contactName" id="contactName">
                                     <label class="error">*</label><label></label>
<!--                                     <label class="error">*</label><label></label>-->
                                 </div>
                            
                          
                           
                                       
                                 <div class="controls">
                                      <input type="text" class="input-large"  placeholder="Title" name="title" id="title">
                                       <label></label>
                                 </div>
                                 <div class="controls">
                                    <input type="text" class="input-large" name="email" placeholder="email" id="email">
                                     <label></label>
                                 </div>
                            
                          
                           
                               
                            
                    </fieldset>
                    <fieldset>
                        <legend>Phone Info</legend>
                           
                                 <div class="controls">
                                    <input type="text" class="input-large" name="phone" placeholder="phone" id="phone">
                                     <label class="error">*</label><label></label>
                                 </div>
                            
                                 <div class="controls">
                                    <input type="text" class="input-large" placeholder="fax" name="fax" id="fax">
                                     <label></label>
                                 </div>
                            
                            
                                 <div class="controls">
                                    <input type="text" class="input-large" name="mobile" placeholder="mobile" id="mobile">
                                 </div>
                                 
                            
                           
                    </fieldset>
                     <fieldset>
                        <legend>Address Info</legend>
                          
                                 
                                 <div class="controls">
                                     <select name="countryNameStateTable" id="countryNameStateTable" style="width:12em;">
                                        
                                     </select>
                                     <label></label>
                                 </div>
                        
                                 <div class="controls">
                                    <input type="text" class="input-xlarge" placeholder="Address1" name="Address1" id="Address1">
                                    <label class="error">*</label><label></label>
                                 </div>
                           
                           
                                 <div class="controls">
                                    <input type="text" class="input-xlarge" placeholder="Address2" name="Address2" id="Address2">
                                     <label></label>
                                 </div>
                            
                            
                                 <div class="controls">
                                    <input type="text" class="input-medium" placeholder="City" name="city" id="city">
                                    <label class="error">*</label><label></label>
                                 </div>
                                 
                                    
                                 <div class="controls">
                                    <select name="stateNameStateTable" id="stateNameStateTable" style="width:12em;">
                                        <option value="">State</option>
<!--                                        <option value="AL">AL</option>
                                        <option value="AK">AK</option>
                                        <option value="AZ">AZ</option>
                                        <option value="AR">AR</option>
                                        <option value="CA">CA</option>
                                        <option value="CO">CO</option>
                                        <option value="CT">CT</option>
                                        <option value="DE">DE</option>
                                        <option value="DC">DC</option>
                                        <option value="FL">FL</option>
                                        <option value="GA">GA</option>
                                        <option value="HI">HI</option>
                                        <option value="ID">ID</option>
                                        <option value="IL">IL</option>
                                        <option value="IN">IN</option>
                                        <option value="IA">IA</option>
                                        <option value="KS">KS</option>
                                        <option value="KY">KY</option>
                                        <option value="LA">LA</option>
                                        <option value="ME">ME</option>
                                        <option value="MD">MD</option>
                                        <option value="MA">MA</option>
                                        <option value="MI">MI</option>
                                        <option value="MN">MN</option>
                                        <option value="MS">MS</option>
                                        <option value="MO">MO</option>
                                        <option value="MT">MT</option>
                                        <option value="NE">NE</option>
                                        <option value="NV">NV</option>
                                        <option value="NH">NH</option>
                                        <option value="NJ">NJ</option>
                                        <option value="NM">NM</option>
                                        <option value="NY">NY</option>
                                        <option value="NC">NC</option>
                                        <option value="ND">ND</option>
                                        <option value="OH">OH</option>
                                        <option value="OK">OK</option>
                                        <option value="OR">OR</option>
                                        <option value="PA">PA</option>
                                        <option value="RI">RI</option>
                                        <option value="SC">SC</option>
                                        <option value="SD">SD</option>
                                        <option value="TN">TN</option>
                                        <option value="TX">TX</option>
                                        <option value="UT">UT</option>
                                        <option value="VT">VT</option>
                                        <option value="VA">VA</option>
                                        <option value="WA">WA</option>
                                        <option value="WV">WV</option>
                                        <option value="WI">WI</option>
                                        <option value="WY">WY</option>-->
                                   </select>
                                   <label id="stateError" class="error">*</label><label></label>
                                 </div>
                        
                                  <div class="controls">
                                    <input type="text" class="input-medium" placeholder="zipCode" name="zipCode" id="zipCode">
                                    <label class="error">*</label><label></label>
                                 </div>
                        
                        
<!--                                 <div class="controls">
                                    <input type="text" class="input-medium" placeholder="country" name="country" id="country">
                                 </div>-->
                            
                    </fieldset>
                    <fieldset>
                        <legend>Notes Info</legend>
                            
                                 <div class="controls">
                                     <textarea name="notes" id="notes" rows="3"></textarea>
                                 </div>
                            
                             <div class="control-group">
                                <div class="controls">
                                      <label class="checkbox">
                                        <input type="checkbox" name="inActive" id="inActive" value="1"> Inactive
                                      </label>
                                    <br>
                                      <button type="submit" id="submit" class="btn  btn-primary">Submit</button>
                                     
                                </div>
                             </div>
                    </fieldset>
                     <input type="hidden"   name="customerID"          id="customerID" value="<?php if(!empty($customerID)) echo $customerID;?>"  />
                     <input type="hidden"   name="orderIDHidden"       id="orderIDHidden" value="<?php if(!empty($orderID)) echo $orderID; ?>" />
                    
                     <input type="hidden"   name="typeMain"            id="typeMain" value="Customer" />
                     <input type="hidden"   name="typeSub"             id="typeSub" value="<?php if(!empty($typeSub)) echo $typeSub; ?>" />
                     <input type="hidden"   name="addressIDHidden"     id="addressIDHidden" value="<?php if(!empty($addressID)) echo $addressID;?>"  />
                     <input type="hidden"   name="actionStringHidden"  id="actionStringHidden" value="<?php if(!empty($action)) echo $action;?>"  />
              
            </div>
            
        </section>
<!--        <section class="row-fluid">
            <div class="span4 offset3">
                <button type="submit" id="submit" class="btn  btn-primary">Submit</button>
            </div>
        </section>-->
     </form> 
              
    </div>
   
</body>

</html>