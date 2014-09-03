(function($){
    $.fn.clearForm = function() {
        return this.each(function(){
              var type = this.type, tag = this.tagName.toLowerCase();
              if (tag == 'form')
              {
                  return $(':input',this).clearForm();       
              }
              if (type == 'text' || type == 'password' || tag == 'textarea')
              {
                  this.value = '';
                      
              }
              else if (type == 'checkbox' || type == 'radio')
              {
                  this.checked = false;
                      
              }
              else if (tag == 'select')
              {
                  //alert("hi");
                  this.selectedIndex = -1;
                  //this.selectedIndex = 0;
                      
              }
                
        });
    }
})(jQuery);



