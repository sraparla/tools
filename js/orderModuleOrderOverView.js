$(document).ready( function() {
     var now = new Date();
		    
     var today = (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getFullYear();

     $('#dp1').val(today);
     // calls date picker when selected

     $('#dp1').datepicker({
        format: 'mm-dd-yyyy'
     });

     $('#go').click(function(){
         var url = "http://localhost/ci/index.php/homescreen/index/";
         var d = $("#dp1").val();
         
         // var d = (getFullYear(d) + '-' + getMonth(d)  + '-' + getDate(d));
         var d = (d.slice(6,10) + '-' + d.slice(0,2)  + '-' + d.slice(3,5));
         //alert(d);
         window.location = url + d;
     });
     
     //alert(orderID);
     
     var orderDetailTable = $('#orderDetailTable').dataTable({
       "sDom": "<'row'<'col-sm-12'<'pull-right'f><'pull-left'l>r<'clearfix'>>>t<'row'<'col-sm-12'<'pull-left'i><'pull-right'p><'clearfix'>>>",
          "iDisplayLength": 10,
          "aoColumns": [
           null,
           null,
           null,
           null,
           null,
           null,
           null,
           {"bVisible":    false},
           {"bVisible":    false},
           {"bVisible":    false},
           {"bVisible":    false},
           {"bVisible":    false},
           {"bVisible":    false},
           null
          ],
          "bAutoWidth": false,
          "oTableTools":{
              "aButtons":[]
              
          },
          //"iDisplayLength": -1,
          "aaSorting": [[ 7, "asc" ]], // Sort by first column descending
          "sAjaxSource": "orderItems/orderitemcontroller/getOrderItemRowsByOrderIDResultObject/"+orderID
     });
     $('.dataTables_filter input')
            .unbind('keypress keyup')
            .bind('keypress keyup', function(e){
            if ($(this).val().length < 2 && $(this).val().length  !==0 && e.keyCode != 13) return;
           
            var mysearchString =$(this).val().replace(/\s+/g, "|");
            orderDetailTable.fnFilter(mysearchString,null,true,false);

            //myTable.fnFilter($(this).val(),null,true,false);


      });
//    $("#global_filter").keyup(fnFilterGlobal );
//    $("#global_regex").click(fnFilterGlobal );
//    $("#global_smart").click(fnFilterGlobal );
     
    
});
//function fnFilterGlobal ()
//{
//    $('#orderDetailTable').dataTable().fnFilter(
//        $("#global_filter").val(),
//        null,
//        $("#global_regex")[0].checked,
//        $("#global_smart")[0].checked
//    );
//}

