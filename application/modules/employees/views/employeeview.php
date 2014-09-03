<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Sign in &middot;Indy Imaging</title>
     <base href="<?php echo base_url(); ?>" />
     <script  type="text/javascript">
         var userNotFound = "<?php echo $userMessage; ?>"
     </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="media/css_bootstrap/bootstrap.css" rel="stylesheet" type="text/css">
    <style type="text/css">
      body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
      }
      label.error {
/*        display: inline-block;*/
        font-weight: bold;
        color: red;
        font-size: 87.5%;
        padding: 2px 8px;
        margin-top: 2px;
			
       }

      .form-signin {
        max-width: 300px;
        padding: 19px 29px 29px;
        margin: 0 auto 20px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 5px;
           -moz-border-radius: 5px;
                border-radius: 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
                box-shadow: 0 1px 2px rgba(0,0,0,.05);
      }
      .form-signin .form-signin-heading,
      .form-signin .checkbox {
        margin-bottom: 10px;
      }
     
      .form-signin .input-prepend .add-on
      {
         
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
          
      }
      
      .form-signin input[type="text"],
      .form-signin input[type="password"] {
        font-size: 16px;
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
      }

    </style>
    <link href="media/css_bootstrap/bootstrap-responsive.css" rel="stylesheet" type="text/css">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="../assets/js/html5shiv.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="images/ii_logo_fav.png">
    <script type="text/javascript" charset="utf-8" src="media/js/jquery.js"></script>
    <script src="js/jquery.maskedinput.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/additional-methods.min.js"></script>
       
    <script type="text/javascript" charset="utf-8" src="media/js_bootstrap/bootstrap.min.js"></script>
        
        
        
<!--        <script type="text/javascript" src="js/jquery-templ.js"></script>-->
        
  <script src="js/clearForm.js"></script>
  <script src="js/employeeModule.js"></script>
  </head>

  <body>

    <div class="container-fluid">

      <form class="form-signin" id="employeeLogin" method="POST" action="">
        <h4 class="form-signin-heading">Please sign in</h4>
        <div class="input-prepend">
            <span class="add-on"><i class="icon-envelope"></i></span>
                <input  type="text" id="employeeEmail" name="employeeEmail" class="inputIcon"  placeholder="Email address" required pattern="\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b">
        </div>
        <div class="input-prepend">
            <span class="add-on"><i class="icon-lock"></i></span>
              <input  type="password" id="employeePassword" name="employeePassword" class="prependedInput"  placeholder="Password" required  pattern="^\S{6,}$"/>

        </div>

<!--        <label class="checkbox">
          <input type="checkbox" value="remember-me"> Remember me
        </label>-->
        <button class="btn btn-large btn-primary" type="submit">Sign in</button>
        <label id="errorMessage" class="error hide">The email address or password you entered is not correct. please try again!</label>  
      </form>
        

    </div> <!-- /container -->

 

  </body>
</html>
