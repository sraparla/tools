var readLeftUrlStop     = "orderItemComponents/orderitemcomponentcontroller/relatedProductBuilds/",
    readLeftUrl         = "orderItemComponents/orderitemcomponentcontroller/getDisplayNames/",
    readRightUrl        = "orderItemComponents/orderitemcomponentcontroller/displayProductBuild/",
    delUrl              = "orderItemComponents/orderitemcomponentcontroller/deleteOrderItemComponentTableRow/",
    formUrl             = "orderItemComponents/orderitemcomponentcontroller/formView/",
    insertUrl           = "orderItemComponents/orderitemcomponentcontroller/processSetupLeftTableInsert/",
    getFrmUrl           = "orderItemComponents/orderitemcomponentcontroller/populatePrintMaterialFrm/",
    getOnHandMaxMin     = "orderItemComponents/orderitemcomponentcontroller/getOnHandMaxMinData/",
    readSetUpHeadingUrl = "orderItemComponents/orderitemcomponentcontroller/getSetUptHeading/",
    updateDupLineItems  = "orderItemComponents/orderitemcomponentcontroller/getDupFinAllLineItems/",
    submitUrl           = "orderItemComponents/orderitemcomponentcontroller/updateSetupModalFrm/",
    dupExceptPrintEquip = "orderItemComponents/orderitemcomponentcontroller/dupLineItemExceptPrintEquipOIC/";
    
    addPrntMaterDisplay = "orderItemComponents/orderitemcomponentcontroller/designChangeForPrintMaterial/";
    
$(document).ready( function() {
    // store the input hidden values
    //alert("secoond0 "+orderID);
    //$("#oicSetupLeft").attr("autofocus","autofocus");
//    $('.chzn-single').focus(function(e){
//        e.preventDefault();
//    });
//    
//    $('button').click(function() {
//        $('.chzn-single').focus();
//    });
    
    
    $("#orderIDHidden").val(orderID);
    $("#orderItemIDHidden").val(orderItemID);
    //alert("second1 : "+orderItemID);
    readSetupHeading();
    readSetupLeftTable();
    
    readSetupRightTable();
    
    $("#dupExceptEquipPrintMat").click(function(){
        // trigger a form submit
        
        //alert($("#orderItemComponentIDHidden").val());
        $("#duplicateLineItemNotEP").val("true");
        
        $("#orderIDUniqueHidden").val($("#orderIDHidden").val());
        $("#orderItemIDUniqueHidden").val($("#orderItemIDHidden").val());
        
        $("#validateModalPrintMaterialFrm").trigger("click");
        //return false;
        
    });
    $(".chzn-select").chosen();
    
//    $('.chzn-single').focus(function(e){
//        //e.preventDefault();
//    });
    var getPath = location.href;
    //alert(getPath);
    var pathArry = getPath.split("#");
    //alert(pathArry[1]);
    if(pathArry[1] == "chosenFocus")
    {
//        $('.chzn-single').focus();
        $('.chzn-container').mousedown();
        
        //adjust the width and top the chosen drop div
        $('.chzn-drop').css({"width": "348px","top": "24px"});
        
        //adjust the width of the chosen search box
        $('.chzn-search input[type=text]').css({"width": "313px"});
       
    }
    //$('.chzn-container').mousedown();
    $(".chzn-select").chosen().change(function(){
        
        //alert($(this).val()); 
        var displayName     = $(".chzn-select :selected").text();
        //alert(displayName);
        var displayCategory = $(".chzn-select :selected").parent().attr('label');
        //alert(displayCategory);
        var relatedBuildProductArray = $(this).val().split(",");
        
        //alert(relatedBuildProductArray);
       
        
        oicArray             = [];
        oicArray[0]          = '';
        oicArray[1]          = orderID;
        oicArray[2]          = orderItemID;
        oicArray[3]          = relatedBuildProductArray[0];
        oicArray[4]          = relatedBuildProductArray[1];
        oicArray[5]          = relatedBuildProductArray[2];
        oicArray[6]          = relatedBuildProductArray[3];
        oicArray[7]          = '';
        oicArray[8]          = displayCategory;
        oicArray[9]          = relatedBuildProductArray[6]; // added from robbie request
       
        oicArrayKeys         = [];
        oicArrayKeys[0]      = "kp_OrderItemComponentID";
        oicArrayKeys[1]      = "kf_OrderID";
        oicArrayKeys[2]      = "kf_OrderItemID";
        oicArrayKeys[3]      = "kf_ProductBuildItemID";
        oicArrayKeys[4]      = "kf_BuildItemID";
        oicArrayKeys[5]      = "kf_EquipmentID";
        oicArrayKeys[6]      = "kf_EquipmentModeID";
        oicArrayKeys[7]      = "zCreated";
        oicArrayKeys[8]      = "category";
        oicArrayKeys[9]      = "nb_ShowOnInvoice"; // added from robbie request
       
        //alert(oicArray);
        //var dataToSend = $.serialize(oicArray);
        //$.serialize(oicArray);
       
        
        
        // do the ajax call and insert a new row in the OrderItem Table.
        $.ajax({
              url: insertUrl+orderItemID,
              type:"post",
              dataType: "json",  
              //contentType : "application/json; charset=utf-8",
              error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
              },
              data:  {result:oicArray,resultKeys:oicArrayKeys},
              
              success: function(response) {
                  //alert(response);
                  if(response.existingMaterial == "yes")
                  {
                      $(".modal-header #modalCustomHeading").html("<h3>Please Confirm:</h3>");
                      
                      $(".modal-body #noInsertMessage").html("Do you want to replace the existing <strong> "+displayCategory+" </strong> with  <strong> "+displayName+" </strong>");
                      //$(".modal-body #noInsertMessage").html("Please remove the existing <strong> "+displayCategory+" </strong>  category in order to add a new one</Strong>");
                    

                        $("#myModalConfirm").modal({
                        backdrop: false
                        });
                          
                  }
                  else
                  {
                      readSetupRightTable();
                      $("#oicSetupLeft").val('').trigger("liszt:updated");
                      
                      
                      
                      // bring up the modal window
                      //alert(displayCategory + displayName);
                      $("#modalCustomHeadingPrintMaterialForm").text(displayCategory+" - "+displayName);
                      
                      var subCategoryFormView     = relatedBuildProductArray[4];
                      
                      var subCategoryNotConnected = relatedBuildProductArray[5];
                      if(subCategoryFormView == "Description" || (subCategoryFormView == "Inventory" && subCategoryNotConnected == "1"))
                      {
                          removeRules(modalInventoryItemDescRules);
                          removeRules(modalBleedWhitePocketDynamicRules);
                          // hide evenrthing
                          //alert("Inside the if: "+subCategoryFormView);
                          //$('#printMaterialFrm').find('.row-fluid').show();
                          $('#printMaterialFrm').find('.row-fluid').hide();
                          $("#descriptionShow").show();
                          $("#showBillNameInvoice").show();
                          $("#DescriptionNameLabel").text("Direction:");


                      }
                      if(subCategoryFormView == "Inventory" && subCategoryNotConnected != "1")
                      {
                          addRules(modalInventoryItemDescRules);
                          removeRules(modalBleedWhitePocketDynamicRules);
                          // hide evenrthing
                          //alert("Inside the if: "+subCategoryFormView);
                          $('#printMaterialFrm').find('.row-fluid').hide();
                          $("#descriptionShow").show();
                          $("#inventoryShow").show();
                          $("#showBillNameInvoice").show();
                          $("#inventoryOnHandMinMaxShow").show();
                          $("#DescriptionNameLabel").text("Direction:");

                        //alert("Inside again the if: "+subCategoryFormView);

                      }
                      if(subCategoryFormView == "All")
                      {
                          addRules(modalInventoryItemDescRules);
                          addRules(modalBleedWhitePocketDynamicRules);
                          $('#printMaterialFrm').find('.row-fluid').show();
                          $("#DescriptionNameLabel").text("Description:");
                      }
                      
                      $("#typeOfFormNotConnected").val(subCategoryNotConnected);
                      
                      $("#typeOfForm").val(subCategoryFormView);
                      //alert(subCategoryArr[6]);

                      //duplicate show only when category is not equipment and Print Material
                      if(displayCategory != "Equipment" && displayCategory != "Print Material")
                      {
                          if($("#dupExceptEquipPrintMat").hasClass("hide"))
                          {
                              $("#dupExceptEquipPrintMat").removeClass("hide");
                          }
                      }
                      else
                      {
                          if(!$("#dupExceptEquipPrintMat").hasClass("hide"))
                          {
                              $("#dupExceptEquipPrintMat").addClass("hide");
                          }  
                      }
                      $("#orderItemComponentIDHidden").val(response.orderItemComponentID);
                      // call an ajax call and get the data
                      $.ajax({
                           url: getFrmUrl+response.orderItemComponentID,
                           dataType: "json",
                           error: function(xhr,status,error){
                                alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                            },
                            data:  {displayCategory:displayCategory},
                            success: function(newResponse) {
                                 var showOnInvoiceBill = newResponse.showOnInvoice
                                 var printDoubeSided   = newResponse.printDoubleSided;
                                 var customPrintSpecs  = newResponse.CustomPrintSpecs;

                                 var optionValue            ='<option value="">'+""+'</option>';
                                 var inventoryItemDescValue ='<option value="">'+"Please Select"+'</option>';
                                 inventoryItemDescValue    += newResponse.inventoryItemDes;

                                 for(var i in newResponse.SubMode)
                                 {
                                     optionValue += newResponse.SubMode[i];
                                 }
                                 
                                 $("#modalEquipment").val(newResponse.Equipment);
                                 $("#modalMode").val(newResponse.Mode);
                                 
                                 $("#modalSubMode").html(optionValue);
                 
                                 $("#modalTitle").val(newResponse.title);
                                 //alert(response.overlapTile);
                                 if(newResponse.overlapTile == null)
                                 {
                                     //alert("hi");
                                 }
                                 else
                                 {
                                      var overlapTile  = Number(newResponse.overlapTile);
                                      //alert(overlapTile);
                                      $("#modalOverlap").val(overlapTile);
                                 }
                                 if(printDoubeSided == 1)
                                 {
                                     $("#modalPrintDoubleSided").attr('checked', true);

                                 }
                                 else
                                 {
                                     $("#modalPrintDoubleSided").attr('checked', false);

                                 }

                                 if(subCategoryFormView == "Description" || subCategoryFormView == "Inventory" )
                                 {
                                      $("#modalDescription").val(newResponse.Direction);
                                      $("#modalDescription").attr("autofocus","autofocus");

                                 }
                                 else
                                 {
                                      $("#modalDescription").val(newResponse.Description);

                                 }    


                                 if(showOnInvoiceBill == 1)
                                 {
                                      $("#modalShowOnInvoice").attr('checked', true);

                                 }
                                 else
                                 {
                                      $("#modalShowOnInvoice").attr('checked', false);
                                 }
                                 $("#modalQty").val(Number(newResponse.Quantity));
                 
                                 $("#modalHeight").val(Number(newResponse.Height));

                                 $("#modalWidth").val(Number(newResponse.Width));
                                 
                                 if(customPrintSpecs == 1)
                                 {
                                     $("#modalCustomPrintSpecs").attr('checked', true);

                                 }
                                 else
                                 {
                                     $("#modalCustomPrintSpecs").attr('checked', false);
                                     $(".changeMini").attr("readonly", "readonly");

                                 }
                                 //----InventoryItem Description -------------
                                 $("#inventoryItemDesc").html(inventoryItemDescValue);
                                 $("#inventoryItemDesc").val(newResponse.inventoryItemID);
                                 var inventoryDetails     =  newResponse.inventoryItemID;
                                 var inventoryDescription = $("#inventoryItemDesc :selected").text();
                                 var poundSign = "#";

                                 $("#emailPurchasing").attr("href",  "mailto:purchasing@indyimaging.com?subject=Need Stock for "+ $("#orderIDHidden").val()+" Inventory "+poundSign+" " +inventoryDetails
                                                          +" &body= Purchasing please order the following material: Inventory "+poundSign+" "+inventoryDetails+ " "+inventoryDescription); 




                                 $("#bleedWhitePocket").html(newResponse.bleedWhitePocket);
                                 
                                 //--------Bleed------
                                 $("#bleedTop").val(Number(newResponse.bWpData.bleedTop));
                                 $("#bleedBottom").val(Number(newResponse.bWpData.bleedBottom));
                                 $("#bleedLeft").val(Number(newResponse.bWpData.bleedLeft));
                                 $("#bleedRight").val(Number(newResponse.bWpData.bleedRight));

                                 $("#bleedInches").text(newResponse.bWpData.bleedInches);
                                 $("#bleedFeet").text(newResponse.bWpData.bleedFeet);

                                 //----Bleed Hidden --------
                                 $("#bleedTopHidden").val($("#bleedTop").val());
                                 $("#bleedBottomHidden").val($("#bleedBottom").val());
                                 $("#bleedLeftHidden").val($("#bleedLeft").val());
                                 $("#bleedRightHidden").val($("#bleedRight").val());
                                 
                                 //--------White------
                                 $("#whiteTop").val(Number(newResponse.bWpData.whiteTop));
                                 $("#whiteBottom").val(Number(newResponse.bWpData.whiteBottom));
                                 $("#whiteLeft").val(Number(newResponse.bWpData.whiteLeft));
                                 $("#whiteRight").val(Number(newResponse.bWpData.whiteRight));

                                 $("#whiteInches").text(newResponse.bWpData.whiteInches);
                                 $("#whiteFeet").text(newResponse.bWpData.whiteFeet);

                                 //---White Hidden ----
                                 $("#whiteTopHidden").val($("#whiteTop").val());
                                 $("#whiteBottomHidden").val($("#whiteBottom").val());
                                 $("#whiteLeftHidden").val($("#whiteLeft").val());
                                 $("#whiteRightHidden").val($("#whiteRight").val());
                                 
                                 //--------Pocket------
                                 $("#pocketTop").val(Number(newResponse.bWpData.pocketTop));
                                 $("#pocketBottom").val(Number(newResponse.bWpData.pocketBottom));
                                 $("#pocketLeft").val(Number(newResponse.bWpData.pocketLeft));
                                 $("#pocketRight").val(Number(newResponse.bWpData.pocketRight));

                                 $("#pocketInches").text(newResponse.bWpData.pocketInches);
                                 $("#pocketFeet").text(newResponse.bWpData.pocketFeet);

                                 //---Pocket Hidden ----
                                 $("#pocketTopHidden").val($("#pocketTop").val());
                                 $("#pocketBottomHidden").val($("#pocketBottom").val());
                                 $("#pocketLeftHidden").val($("#pocketLeft").val());
                                 $("#pocketRightHidden").val($("#pocketRight").val());
                                 
                                 var obj = JSON.parse(newResponse.onHandMinMax);
                                
                                 if(obj != "")
                                 {
                                     $("#onHand").text(obj.n_Qty);
                                     $("#invMin").text(obj.n_Min);
                                     $("#invMax").text(obj.n_Max);

                                     $("#onHandMinMaxSqFt").removeClass("hide");
                                     $("#emailPurchasing").removeClass("hide");

                                 }
                                 var getDirectionObj = JSON.parse(newResponse.getDirection);
                                 
                                 var str = "";
                                 
                                 for(var x=0; x<getDirectionObj.length; x++)
                                 {
                                    str += '<li><a href="#">'+getDirectionObj[x].t_Directions+'</a></li>';
                                 }
                                 
                                 $("#dynamicDirection").html(str);
                                 $("#orderIDHidden").val(newResponse.orderID);
                                 $("#setUpPrintMaterialForm").modal({
                                      backdrop: false
                                 });

                
                                
                            }
                           
                      });
//                      alert(response.orderItemComponentID);
//                      var otherPrintEquipColOne       = $('tr#' + response.orderItemComponentID + ' td' )[0];
//                      var otherPrintEquipColTwo       = $('tr#' + response.orderItemComponentID + ' td' )[1];
//                            
//                            
//                      var buildPrintMatLink = '<a id="displayForm" class="formBtn" href="'+formUrl+response.orderItemComponentID+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>' 
//                      alert(buildPrintMatLink);
//                      $(otherPrintEquipColOne).html(buildPrintMatLink);
//                      
//                      $(otherPrintEquipColTwo).html(displayCategory);
                    
                      //$('#records tr:last').after('<tr id="'+response.orderItemComponentID+'"><td>'+'<a id="displayForm" class="formBtn" href="'+formUrl+response.orderItemComponentID+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>'
                       //+'</td><td>'
                       //+displayCategory+'</td><td></td><td></td><td>'+'<a id="removeTableRow" href="'+delUrl+displayCategory+'/'+response.orderItemComponentID+'">'+"<i class=\"icon-remove\"></i>"+'</a>'+'</td><td class="hide">'+relatedBuildProductArray[4]+'</td><td class="hide">'+relatedBuildProductArray[5]+'</td>+</tr>');
                       
                      
                      // do an ajax call if the category is an print Material
                      //alert("The category data"+ displayCategory);
                      
                      //if(displayCategory == "Print Material")
                      //{
                           //alert("The category data "+ displayCategory);
                           //window.location.reload(true);
//                           $.ajax({
//                                url: addPrntMaterDisplay+response.orderItemComponentID,
//                                type:"get",
//                                error: function(xhr,status,error){
//                                alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
//                                },
//                                success: function(response) {
//                                    alert(response.printAttrSubMode)
//                                    if(response.printAttrSubMode !== undefined  && response.printAttrSubMode != null)
//                                    {
//                                         var printAttrSubMode= response.printAttrSubMode
//                                    }
//                                    if(response.printAttrPrintDoubleSided !=null)
//                                    {
//                                         var printAttrPrintDoubleSided= response.printAttrPrintDoubleSided
//                                    } 
//                                    if(response.printAttrCustomPrintSpecs !=null && response.printAttrCustomPrintSpecs !=0)
//                                    {
//                                         var printAttrCustomPrintSpecs = response.printAttrCustomPrintSpecs
//                                    } 
//                                    if(response.printAttrTiled !=null)
//                                    {
//                                         var printAttrTiled = response.printAttrTiled
//                                    }
//                                    if(response.printAttrTiled !=null)
//                                    {
//                                         var printAttrOverlapTile = response.printAttrOverlapTile
//                                    }
//                                    
//                                    var printAttrqtyHtW = response.printAttrqtyHtW
//                                    
//                                    
//                                    $('#records tr:last').after('<tr id="'+response.orderItemComponentID+'"><td>'+'<a id="displayForm" class="formBtn" href="'+formUrl+response.orderItemComponentID+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>'
//                                    +'<br/>'+printAttrSubMode+'<br/>'+printAttrPrintDoubleSided+'<br/>'+printAttrCustomPrintSpecs+'<br/>'+printAttrTiled+'<br/>'+printAttrOverlapTile+'</td><td>'
//                                    +displayCategory+'</td><td></td><td></td><td>'+'<a id="removeTableRow" href="'+delUrl+displayCategory+'/'+response.orderItemComponentID+'">'+"<i class=\"icon-remove\"></i>"+'</a>'+'</td><td class="hide">'+relatedBuildProductArray[4]+'</td><td class="hide">'+relatedBuildProductArray[5]+'</td>+</tr>');
//                                }
//                           })
                      //}
                      //else
                      //{
                          //alert("The category data"+ displayCategory);
                          //$('#records tr:last').after('<tr id="'+response.orderItemComponentID+'"><td>'+'<a id="displayForm" class="formBtn" href="'+formUrl+response.orderItemComponentID+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>'
                                     //+'</td><td>'
                                     //+displayCategory+'</td><td></td><td></td><td>'+'<a id="removeTableRow" href="'+delUrl+displayCategory+'/'+response.orderItemComponentID+'">'+"<i class=\"icon-remove\"></i>"+'</a>'+'</td><td class="hide">'+relatedBuildProductArray[4]+'</td><td class="hide">'+relatedBuildProductArray[5]+'</td>+</tr>');
                       
                          
                      //}    
                     
//                      $('#records tr:last').after('<tr id="'+response+'"><td>'
//                                     +displayCategory+'</td><td>'+'<a id="displayForm" class="formBtn" href="'+formUrl+response+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>'
//                                     +'</td><td></td><td>'+'<a id="removeTableRow" href="'+delUrl+displayCategory+'/'+response+'">'+"<i class=\"icon-remove\"></i>"+'</a>'+'</td>\n\
                                       //<td class="hide">//'+relatedBuildProductArray[4]+'</td><td class="hide">'+relatedBuildProductArray[5]+'</td>+</tr>');
//                       
                  }    
                  
              }
            
        });
        
        
        $("#submitReplaceEPModalFrm").click(function(){
             //alert("hi");
             $.ajax({
                    url:insertUrl+orderItemID+'/'+"true",
                    dataType: "json",
                    type:"post",
                    error: function(xhr,status,error){
                             alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                         },
                    data:  {result:oicArray,resultKeys:oicArrayKeys},
                    success: function(response) {
                        if(response.replaceOIC == "EquipmentMaterialReplaced")
                        {
                            //hide the modal window
                            $('#myModalConfirm').modal('hide');
                            //alert(response.orderItemComponentID);
                            
                            var equipmentColOne   = $('tr#' + response.orderItemComponentID + ' td' )[0];
                            var equipmentColTwo   = $('tr#' + response.orderItemComponentID + ' td' )[1];
                            
                            var buildEquipMatLink = '<a id="displayForm" class="formBtn" href="'+formUrl+response.orderItemComponentID+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>' 
                            $(equipmentColOne).html(buildEquipMatLink);
                            $(equipmentColTwo).html(displayCategory);
                            //response[ i ].formLink   = formUrl +response[ i ].OrderItemComponentID+"/"+response[ i ].t_FormView
                            //+"/"+response[ i ].nb_NotConnectedToInventory+"/"+response[i].t_Category;
                            //<td><a id="displayForm"    class="formBtn"   href="${formLink}">${DisplayName}</a></td>
                        
                            // get the tr td of the updated OIC table row
                            
                            //alert("hi2");
                            //update the particular record (row) of the right hand side table.
                           
                            //alert("hi3");
                            
                            readSetupRightTable();
                            $("#oicSetupLeft").val('').trigger("liszt:updated");
                            //window.location.href ="orderItemUpSideFrm/read/"+orderItemID;

                        }
                        if(response.replaceOIC == "PrintMaterialReplaced")
                        {
                            //hide the modal window
                            $('#myModalConfirm').modal('hide');
                            //alert(response.orderItemComponentID);
                            var printColOne     = $('tr#' + response.orderItemComponentID + ' td' )[0];
                            var printColTwo     = $('tr#' + response.orderItemComponentID + ' td' )[1];
                            
                            
                            var buildPrintMatLink = '<a id="displayForm" class="formBtn" href="'+formUrl+response.orderItemComponentID+'/'+relatedBuildProductArray[4]+'/'+relatedBuildProductArray[5]+'/'+displayCategory+'">'+displayName+'</a>' 
                            $(printColOne).html(buildPrintMatLink);
                            $(printColTwo).html(displayCategory);
                            
                            //alert(response.orderItemComponentID);
                            
                            readSetupRightTable();
                            $("#oicSetupLeft").val('').trigger("liszt:updated");
                            
                            $("#orderItemComponentIDHidden").val(response.orderItemComponentID);
                            
                            $("#typeOfForm").val("All");
                            
                            $("#modalCustomHeadingPrintMaterialForm").html(displayCategory);
                            
                            addRules(modalInventoryItemDescRules);
                            addRules(modalBleedWhitePocketDynamicRules);
                            
                            $('#printMaterialFrm').find('.row-fluid').show();
                            $("#DescriptionNameLabel").text("Description:");
                            
                            // do the ajax call to get the data needed to populate the modal window
                            //$("#records").on("click","a.formBtn",function()
                            //$("#records > a.formBtn").trigger("click");
                            //Now populate the modal window with the Print Material Data:
                            $.ajax({
                                 url:getFrmUrl+response.orderItemComponentID,
                                 dataType: "json",  
                                 error: function(xhr,status,error){
                                        alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                                 },
                                 data:  {displayCategory:displayCategory},      
                                 success: function(response) {
                                     var printDoubeSided        = response.printDoubleSided;
                                     var optionValue            ='<option value="">'+""+'</option>';
                                     var customPrintSpecs       = response.CustomPrintSpecs;
                                     var inventoryItemDescValue ='<option value="">'+"Please Select"+'</option>';
                                     inventoryItemDescValue    += response.inventoryItemDes;
                                     var showOnInvoiceBill      = response.showOnInvoice
                                       
                                     // modal Equipment
                                     $("#modalEquipment").val(response.Equipment);
                                     
                                     // modal Mode
                                     $("#modalMode").val(response.Mode);
                                     
                                     //print Double Sided
                                     if(printDoubeSided == 1)
                                     {
                                         $("#modalPrintDoubleSided").attr('checked', true);

                                     }
                                     else
                                     {
                                         $("#modalPrintDoubleSided").attr('checked', false);

                                     }
                                     
                                     //modal title
                                     $("#modalTitle").val(response.title);
                                     
                                     for(var i in response.SubMode)
                                     {
                                         optionValue += response.SubMode[i];
                                     } 
                                     $("#modalSubMode").html(optionValue);
                                     
                                     if(response.overlapTile == null)
                                     {
                                         //alert("hi");
                                     }
                                     else
                                     {
                                          var overlapTile  = Number(response.overlapTile);
                                          //alert(overlapTile);
                                          $("#modalOverlap").val(overlapTile);
                                     }
                                     $("#modalDescription").val(response.Description);
                                     
                                     $("#modalQty").val(Number(response.Quantity));
                 
                                     $("#modalHeight").val(Number(response.Height));
                 
                                     $("#modalWidth").val(Number(response.Width));
                                     
                                     if(customPrintSpecs == 1)
                                     {
                                         $("#modalCustomPrintSpecs").attr('checked', true);
                                     }
                                     else
                                     {
                                         $("#modalCustomPrintSpecs").attr('checked', false);
                                         $(".changeMini").attr("readonly", "readonly");
                                     }
                                     $("#bleedWhitePocket").html(response.bleedWhitePocket);
                                     
                                     $("#bleedTop").val(Number(response.bWpData.bleedTop));
                                     $("#bleedBottom").val(Number(response.bWpData.bleedBottom));
                                     $("#bleedLeft").val(Number(response.bWpData.bleedLeft));
                                     $("#bleedRight").val(Number(response.bWpData.bleedRight));

                                     $("#bleedInches").text(response.bWpData.bleedInches);
                                     $("#bleedFeet").text(response.bWpData.bleedFeet);

                                     //----Bleed Hidden --------
                                     $("#bleedTopHidden").val($("#bleedTop").val());
                                     $("#bleedBottomHidden").val($("#bleedBottom").val());
                                     $("#bleedLeftHidden").val($("#bleedLeft").val());
                                     $("#bleedRightHidden").val($("#bleedRight").val());


                                     //--------White------
                                     $("#whiteTop").val(Number(response.bWpData.whiteTop));
                                     $("#whiteBottom").val(Number(response.bWpData.whiteBottom));
                                     $("#whiteLeft").val(Number(response.bWpData.whiteLeft));
                                     $("#whiteRight").val(Number(response.bWpData.whiteRight));

                                     $("#whiteInches").text(response.bWpData.whiteInches);
                                     $("#whiteFeet").text(response.bWpData.whiteFeet);

                                     //---White Hidden ----
                                     $("#whiteTopHidden").val($("#whiteTop").val());
                                     $("#whiteBottomHidden").val($("#whiteBottom").val());
                                     $("#whiteLeftHidden").val($("#whiteLeft").val());
                                     $("#whiteRightHidden").val($("#whiteRight").val());

                                     //--------Pocket------
                                     $("#pocketTop").val(Number(response.bWpData.pocketTop));
                                     $("#pocketBottom").val(Number(response.bWpData.pocketBottom));
                                     $("#pocketLeft").val(Number(response.bWpData.pocketLeft));
                                     $("#pocketRight").val(Number(response.bWpData.pocketRight));

                                     $("#pocketInches").text(response.bWpData.pocketInches);
                                     $("#pocketFeet").text(response.bWpData.pocketFeet);

                                     //---Pocket Hidden ----
                                     $("#pocketTopHidden").val($("#pocketTop").val());
                                     $("#pocketBottomHidden").val($("#pocketBottom").val());
                                     $("#pocketLeftHidden").val($("#pocketLeft").val());
                                     $("#pocketRightHidden").val($("#pocketRight").val());
                                     
                                     
                                     $("#inventoryItemDesc").html(inventoryItemDescValue);
                                     $("#inventoryItemDesc").val(response.inventoryItemID);
                                     var inventoryDetails     =  response.inventoryItemID;
                                     var inventoryDescription = $("#inventoryItemDesc :selected").text();
                                     var poundSign = "#";
                 
                                     $("#emailPurchasing").attr("href",  "mailto:purchasing@indyimaging.com?subject=Need Stock for "+ $("#orderIDHidden").val()+" Inventory "+poundSign+" " +inventoryDetails
                                           +" &body= Purchasing please order the following material: Inventory "+poundSign+" "+inventoryDetails+ " "+inventoryDescription); 
        
                                     
                                     var obj = JSON.parse(response.onHandMinMax);
                                     //alert(obj);
                                     if(obj != "")
                                     {
                                         $("#onHand").text(obj.n_Qty);
                                         $("#invMin").text(obj.n_Min);
                                         $("#invMax").text(obj.n_Max);

                                         $("#onHandMinMaxSqFt").removeClass("hide");
                                         $("#emailPurchasing").removeClass("hide");
                                     }
                                     var getDirectionObj = JSON.parse(response.getDirection);
                                     var str = "";
                                     //alert(getDirectionObj.length);
                                     for(var x=0; x<getDirectionObj.length; x++)
                                     {
                                         //str += '<li><a id="" href="">'+getDirectionObj[i].t_Directions+'</a></li>';style="cursor: pointer;"
                                         str += '<li><a href="#">'+getDirectionObj[x].t_Directions+'</a></li>';

                                     }
                                     //alert(str);
                                     $("#dynamicDirection").html(str);
                 
                                     $("#orderIDHidden").val(response.orderID);
                                     
                                     if(showOnInvoiceBill == 1)
                                     {
                                         $("#modalShowOnInvoice").attr('checked', true);

                                     }
                                     else
                                     {
                                         $("#modalShowOnInvoice").attr('checked', false);

                                     } 
                                 }
                             });
                            
                            $("#setUpPrintMaterialForm").modal({
                                backdrop: false
                      
                           });
                        }    
                    }
            });
            return false;
        });
        
    });
    $("#inventoryItemDesc").change(function(){
        var inventoryDetails     =  $(this).val();
        var inventoryDescription = $("#inventoryItemDesc :selected").text();
        var poundSign = "#"
        
        $("#emailPurchasing").attr("href",  "mailto:purchasing@indyimaging.com?subject=Need Stock for "+ $("#orderIDHidden").val()+" Inventory "+poundSign+" " +inventoryDetails
                                           +" &body= Purchasing please order the following material: Inventory "+poundSign+" "+inventoryDetails+ " "+inventoryDescription); 
        
        if(inventoryDetails == "")
        {
            $("#onHandMinMaxSqFt").addClass("hide");
            $("#emailPurchasing").addClass("hide");     
        }
        else
        {
             $.ajax({
                url: getOnHandMaxMin+inventoryDetails,
                type:"get",
                dataType: "json",
                error: function(xhr,status,error){
                          alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                },
                success: function(response) {
                    //alert(response);
                    if(response == "")
                    {
                        $("#onHand").text("0");
                        $("#invMin").text("0");
                        $("#invMax").text("0");
                            
                    }
                    else
                    {
                         //alert(response.n_ReorderQty);
                        $("#onHand").text(response.n_Qty);

                        $("#invMin").text(response.n_Min);

                        $("#invMax").text(response.n_Max);
                    }    
                   

                    $("#onHandMinMaxSqFt").removeClass("hide");
                    $("#emailPurchasing").removeClass("hide");
                    //alert("num"+response);
                }
            });
        } 
    });
    $("#bleedWhitePocket").change(function(){
        var bleedWhitePocket      = $(this).val();
        var bleedWhitePocketArray = bleedWhitePocket.split(",");
        //alert(bleedWhitePocket);
        //------------  Bleed -----------------
        $("#bleedTop").val(bleedWhitePocketArray[0]);
        $("#bleedBottom").val(bleedWhitePocketArray[1]);
        $("#bleedLeft").val(bleedWhitePocketArray[2]);
        $("#bleedRight").val(bleedWhitePocketArray[3]);
        
         //----Bleed Hidden --------
        $("#bleedTopHidden").val($("#bleedTop").val());
        $("#bleedBottomHidden").val($("#bleedBottom").val());
        $("#bleedLeftHidden").val($("#bleedLeft").val());
        $("#bleedRightHidden").val($("#bleedRight").val());
        
        var bleedHeightFullFeet             = (parseFloat($("#modalHeight").val())+parseFloat(bleedWhitePocketArray[0])+parseFloat(bleedWhitePocketArray[1]))/12;
        //alert(bleedHeightFullFeet);
        var bleedHeightJustFeet             = Math.floor(bleedHeightFullFeet);
        //alert(Math.round(parseFloat((bleedHeightFullFeet - bleedHeightJustFeet) * 12).toFixed(2)));
        //alert(bleedHeightJustFeet);
        //var bleedHeightDecimalFeetInInches=   Math.round(parseFloat((bleedHeightFullFeet - bleedHeightJustFeet) * 12).toFixed(2));
        var bleedHeightDecimalFeetInInches  =    Math.round((bleedHeightFullFeet - bleedHeightJustFeet) * 12);
        //alert(bleedHeightFeetJustInches);
        var bleedWidthFullFeet              = (parseFloat($("#modalWidth").val())+parseFloat(bleedWhitePocketArray[2])+parseFloat(bleedWhitePocketArray[3]))/12;
        
        var bleedWidthJustFeet              = Math.floor(bleedWidthFullFeet);
        //alert(Math.round((bleedWidthFullFeet - bleedWidthJustFeet) * 12));
        //alert(parseFloat((bleedWidthFullFeet - bleedWidthJustFeet) * 12).toFixed(2));
        //var bleedWidthDecimalFeetInInches =   Math.round((bleedWidthFullFeet - bleedWidthJustFeet) * 12);
        var bleedWidthDecimalFeetInInches   =   Math.round((bleedWidthFullFeet - bleedWidthJustFeet) * 12);
        
       
        
        $("#bleedInches").text(parseFloat($("#modalHeight").val())+parseFloat(bleedWhitePocketArray[0])+parseFloat(bleedWhitePocketArray[1])
                                +"\""+" x "
                                +(parseFloat($("#modalWidth").val())+parseFloat(bleedWhitePocketArray[2])+parseFloat(bleedWhitePocketArray[3]))+"\"") ;
        $("#bleedFeet").text(bleedHeightJustFeet+'\''+'   '+bleedHeightDecimalFeetInInches+"\""+" x "+bleedWidthJustFeet+'\''+'   '+bleedWidthDecimalFeetInInches+"\"");
        
        
        //--------------------------------  White -----------------
        $("#whiteTop").val(bleedWhitePocketArray[4]);
        $("#whiteBottom").val(bleedWhitePocketArray[5]);
        $("#whiteLeft").val(bleedWhitePocketArray[6]);
        $("#whiteRight").val(bleedWhitePocketArray[7]);
        
        //---White Hidden ----
        $("#whiteTopHidden").val($("#whiteTop").val());
        $("#whiteBottomHidden").val($("#whiteBottom").val());
        $("#whiteLeftHidden").val($("#whiteLeft").val());
        $("#whiteRightHidden").val($("#whiteRight").val());

        var whiteHeightFullFeet             = (parseFloat($("#modalHeight").val())+parseFloat(bleedWhitePocketArray[0])+parseFloat(bleedWhitePocketArray[1])+
                                               parseFloat(bleedWhitePocketArray[4])+parseFloat(bleedWhitePocketArray[5]))/12;
       
        var whiteHeightJustFeet             = Math.floor(whiteHeightFullFeet);
      
        var whiteHeightDecimalFeetInInches  =    Math.round((whiteHeightFullFeet - whiteHeightJustFeet) * 12);
    
        var whiteWidthFullFeet              = (parseFloat($("#modalWidth").val())+parseFloat(bleedWhitePocketArray[2])+parseFloat(bleedWhitePocketArray[3])+
                                               +parseFloat(bleedWhitePocketArray[6])+parseFloat(bleedWhitePocketArray[7]))/12;
        
        var whiteWidthJustFeet              = Math.floor(bleedWidthFullFeet);
     
        var whiteWidthDecimalFeetInInches   =   Math.round((whiteWidthFullFeet - whiteWidthJustFeet) * 12);
        
        $("#whiteFeet").text(whiteHeightJustFeet+'\''+'   '+whiteHeightDecimalFeetInInches+"\""+" x "+whiteWidthJustFeet+'\''+'   '+whiteWidthDecimalFeetInInches+"\"");
        
        
        $("#whiteInches").text(parseFloat($("#modalHeight").val())+parseFloat(bleedWhitePocketArray[0])+parseFloat(bleedWhitePocketArray[1])+
                                parseFloat(bleedWhitePocketArray[4])+parseFloat(bleedWhitePocketArray[5])
                                +"\""+" x "
                                +(parseFloat($("#modalWidth").val())+parseFloat(bleedWhitePocketArray[2])+parseFloat(bleedWhitePocketArray[3])
                                  +parseFloat(bleedWhitePocketArray[6])+parseFloat(bleedWhitePocketArray[7]))+"\"") ;
    
        
        
        //-------------------------------------  Pocket -----------------
        $("#pocketTop").val(bleedWhitePocketArray[8]);
        $("#pocketBottom").val(bleedWhitePocketArray[9]);
        $("#pocketLeft").val(bleedWhitePocketArray[10]);
        $("#pocketRight").val(bleedWhitePocketArray[11]);
        
        
        //---Pocket Hidden ----
        $("#pocketTopHidden").val($("#pocketTop").val());
        $("#pocketBottomHidden").val($("#pocketBottom").val());
        $("#pocketLeftHidden").val($("#pocketLeft").val());
        $("#pocketRightHidden").val($("#pocketRight").val());
        
             
        var pocketHeightFullFeet             = (parseFloat($("#modalHeight").val())+parseFloat(bleedWhitePocketArray[0])+parseFloat(bleedWhitePocketArray[1])+
                                               parseFloat(bleedWhitePocketArray[4])+parseFloat(bleedWhitePocketArray[5])+
                                               parseFloat(bleedWhitePocketArray[8])+parseFloat(bleedWhitePocketArray[9]))/12;
       
        var pocketHeightJustFeet             =  Math.floor(pocketHeightFullFeet);
      
        var pocketHeightDecimalFeetInInches  =  Math.round((pocketHeightFullFeet - pocketHeightJustFeet) * 12);
    
        var pocketWidthFullFeet              = (parseFloat($("#modalWidth").val())+parseFloat(bleedWhitePocketArray[2])+parseFloat(bleedWhitePocketArray[3])+
                                               +parseFloat(bleedWhitePocketArray[6])+parseFloat(bleedWhitePocketArray[7])
                                               +parseFloat(bleedWhitePocketArray[10])+parseFloat(bleedWhitePocketArray[11]))/12;
        
        var pocketWidthJustFeet              =   Math.floor(pocketWidthFullFeet);
     
        var pocketWidthDecimalFeetInInches   =   Math.round((pocketWidthFullFeet - pocketWidthJustFeet) * 12);
        
        $("#pocketFeet").text(pocketHeightJustFeet+'\''+'   '+pocketHeightDecimalFeetInInches+"\""+" x "+pocketWidthJustFeet+'\''+'   '+pocketWidthDecimalFeetInInches+"\"");
        
        
        
        $("#pocketInches").text(parseFloat($("#modalHeight").val())+parseFloat(bleedWhitePocketArray[0])+parseFloat(bleedWhitePocketArray[1])+
                                parseFloat(bleedWhitePocketArray[4])+parseFloat(bleedWhitePocketArray[5])+
                                parseFloat(bleedWhitePocketArray[8])+parseFloat(bleedWhitePocketArray[9])
                                +"\""+" x "
                                +(parseFloat($("#modalWidth").val())+parseFloat(bleedWhitePocketArray[2])+parseFloat(bleedWhitePocketArray[3])
                                  +parseFloat(bleedWhitePocketArray[6])+parseFloat(bleedWhitePocketArray[7])+   
                                 +parseFloat(bleedWhitePocketArray[10])+parseFloat(bleedWhitePocketArray[11]))+"\"") ;
    
        
       
        
        
    });
    
    
    $('.dynamicBleed').keyup(function() 
    {
          var bleedHeightFullFeet             =   (parseFloat($("#modalHeight").val())+parseFloat($("#bleedTop").val())+parseFloat($("#bleedBottom").val()))/12;
          
          var bleedHeightJustFeet             =   Math.floor(bleedHeightFullFeet);
          
          var bleedHeightDecimalFeetInInches  =   Math.round((bleedHeightFullFeet - bleedHeightJustFeet) * 12);
          
          var bleedWidthFullFeet              =   (parseFloat($("#modalWidth").val())+parseFloat($("#bleedLeft").val())+parseFloat($("#bleedRight").val()))/12;
          
          var bleedWidthJustFeet              =   Math.floor(bleedWidthFullFeet);
       
          var bleedWidthDecimalFeetInInches   =   Math.round((bleedWidthFullFeet - bleedWidthJustFeet) * 12);
        
          
          $("#bleedFeet").text(bleedHeightJustFeet+'\''+'   '+bleedHeightDecimalFeetInInches+"\""+" x "+bleedWidthJustFeet+'\''+'   '+bleedWidthDecimalFeetInInches+"\"");
          
          $("#bleedInches").text(parseFloat($("#modalHeight").val())+parseFloat($("#bleedTop").val())+parseFloat($("#bleedBottom").val())
                                +"\""+" x "
                                +(
                                    parseFloat($("#modalWidth").val())+parseFloat($("#bleedLeft").val())+parseFloat($("#bleedRight").val())
                                 )+"\"") ;
                                     
           //----Bleed Hidden --------
          $("#bleedTopHidden").val($("#bleedTop").val());
          $("#bleedBottomHidden").val($("#bleedBottom").val());
          $("#bleedLeftHidden").val($("#bleedLeft").val());
          $("#bleedRightHidden").val($("#bleedRight").val());
    });
    
    $('.dynamicWhite').keyup(function() 
    {
          var whiteHeightFullFeet             =   (parseFloat($("#modalHeight").val())+parseFloat($("#bleedTop").val())+parseFloat($("#bleedBottom").val())
                                                   + parseFloat($("#whiteTop").val())+parseFloat($("#whiteBottom").val()))/12;
          
          var whiteHeightJustFeet             =   Math.floor(whiteHeightFullFeet);
          
          var whiteHeightDecimalFeetInInches  =   Math.round((whiteHeightFullFeet - whiteHeightJustFeet) * 12);
          
          var whiteWidthFullFeet              =   (parseFloat($("#modalWidth").val())+parseFloat($("#bleedLeft").val())+parseFloat($("#bleedRight").val())
                                                  +parseFloat($("#whiteLeft").val())+parseFloat($("#whiteRight").val()))/12;
          
          var whiteWidthJustFeet              =   Math.floor(whiteWidthFullFeet);
       
          var whiteWidthDecimalFeetInInches   =   Math.round((whiteWidthFullFeet - whiteWidthJustFeet) * 12);
          
          
          $("#whiteFeet").text(whiteHeightJustFeet+'\''+'   '+whiteHeightDecimalFeetInInches+"\""+" x "+whiteWidthJustFeet+'\''+'   '+whiteWidthDecimalFeetInInches+"\"");
        
        
          
          $("#whiteInches").text(parseFloat($("#modalHeight").val())+parseFloat($("#bleedTop").val())+parseFloat($("#bleedBottom").val())
                                +parseFloat($("#whiteTop").val())+parseFloat($("#whiteBottom").val())
                                +"\""+" x "
                                +(
                                    parseFloat($("#modalWidth").val())+parseFloat($("#bleedLeft").val())+parseFloat($("#bleedRight").val())
                                    +parseFloat($("#whiteLeft").val())+parseFloat($("#whiteRight").val())
                                 )+"\"") ;
           
          //---White Hidden ----
          $("#whiteTopHidden").val($("#whiteTop").val());
          $("#whiteBottomHidden").val($("#whiteBottom").val());
          $("#whiteLeftHidden").val($("#whiteLeft").val());
          $("#whiteRightHidden").val($("#whiteRight").val());
    });
    
    $('.dynamicPocket').keyup(function() 
    { 
          var pocketHeightFullFeet             =   (parseFloat($("#modalHeight").val())+parseFloat($("#bleedTop").val())+parseFloat($("#bleedBottom").val())
                                                   +parseFloat($("#whiteTop").val())+parseFloat($("#whiteBottom").val())+
                                                   +parseFloat($("#pocketTop").val())+parseFloat($("#pocketBottom").val()))/12;
          
          var pocketHeightJustFeet             =   Math.floor(pocketHeightFullFeet);
          
          var pocketHeightDecimalFeetInInches  =   Math.round((pocketHeightFullFeet - pocketHeightJustFeet) * 12);
          
          var pocketWidthFullFeet              =   (parseFloat($("#modalWidth").val())+parseFloat($("#bleedLeft").val())+parseFloat($("#bleedRight").val())
                                                   +parseFloat($("#whiteLeft").val())+parseFloat($("#whiteRight").val())+
                                                   +parseFloat($("#pocketLeft").val())+parseFloat($("#pocketRight").val()))/12;
          
          var pocketWidthJustFeet              =   Math.floor(pocketWidthFullFeet);
       
          var pocketWidthDecimalFeetInInches   =   Math.round((pocketWidthFullFeet - pocketWidthJustFeet) * 12);
                             
          $("#pocketFeet").text(pocketHeightJustFeet+'\''+'   '+pocketHeightDecimalFeetInInches+"\""+" x "+pocketWidthJustFeet+'\''+'   '+pocketWidthDecimalFeetInInches+"\"");
        
          $("#pocketInches").text(parseFloat($("#modalHeight").val())+parseFloat($("#bleedTop").val())+parseFloat($("#bleedBottom").val())
                                 +parseFloat($("#whiteTop").val())+parseFloat($("#whiteBottom").val())+
                                 +parseFloat($("#pocketTop").val())+parseFloat($("#pocketBottom").val())
                                 +"\""+" x "
                                +(
                                    parseFloat($("#modalWidth").val())+parseFloat($("#bleedLeft").val())+parseFloat($("#bleedRight").val())
                                     +parseFloat($("#whiteLeft").val())+parseFloat($("#whiteRight").val())+
                                     +parseFloat($("#pocketLeft").val())+parseFloat($("#pocketRight").val())
                                 )+"\"") ;
          
          //---Pocket Hidden ----
          $("#pocketTopHidden").val($("#pocketTop").val());
          $("#pocketBottomHidden").val($("#pocketBottom").val());
          $("#pocketLeftHidden").val($("#pocketLeft").val());
          $("#pocketRightHidden").val($("#pocketRight").val());
    });
    
    
//    $("#dynamicDirection>li").click(function(){
//        alert($(this).index());
//        return false;
//    });
//    $("dynamicDirection li.one > a").live("click",function(){
//        alert($(this).text()); 
//    });
    $("#dynamicDirection li").live("click",function(e){
        //alert($(this).text());
        var directionSelected =  $(this).text();
        
        $("#modalDescription").val(directionSelected);
        e.preventDefault();
        //return false;
        
    });
    
    $("#records").on("click","a.formBtn",function()
    {
        var orderItemComponentID       = $(this).parents('tr').attr("id");
        //alert(orderItemComponentID);
        var subCategoryUrl             = $(this).attr('href' );
        var subCategoryArr             = subCategoryUrl.split("/");
        //alert("<strong>this text:</strong> "+$(this).text());
        //alert(subCategoryArr);
        
        //alert(subCategoryArr[3]);
        //alert("<strong>sub category:</strong> "+subCategoryArr[6]);
        //alert($("#modalCustomHeadingPrintMaterialForm").text());
        $("#modalCustomHeadingPrintMaterialForm").text(subCategoryArr[6]+" - "+$(this).text());
       
        $("#orderItemComponentIDHidden").val(orderItemComponentID);
        
        var subCategoryFormView     = subCategoryArr[4];
        var subCategoryNotConnected = subCategoryArr[5];
        //alert(subCategoryFormView);
        if(subCategoryFormView == "Description" || (subCategoryFormView == "Inventory" && subCategoryNotConnected == "1"))
        {
            removeRules(modalInventoryItemDescRules);
            removeRules(modalBleedWhitePocketDynamicRules);
            // hide evenrthing
            //alert("Inside the if: "+subCategoryFormView);
            //$('#printMaterialFrm').find('.row-fluid').show();
            $('#printMaterialFrm').find('.row-fluid').hide();
            $("#descriptionShow").show();
            $("#showBillNameInvoice").show();
            $("#DescriptionNameLabel").text("Direction:");
            
           
        }
        if(subCategoryFormView == "Inventory" && subCategoryNotConnected != "1")
        {
            addRules(modalInventoryItemDescRules);
            removeRules(modalBleedWhitePocketDynamicRules);
            // hide evenrthing
            //alert("Inside the if: "+subCategoryFormView);
            $('#printMaterialFrm').find('.row-fluid').hide();
            $("#descriptionShow").show();
            $("#inventoryShow").show();
            $("#showBillNameInvoice").show();
            $("#inventoryOnHandMinMaxShow").show();
            $("#DescriptionNameLabel").text("Direction:");
         
            //alert("Inside again the if: "+subCategoryFormView);
            
        }
        if(subCategoryFormView == "All")
        {
            addRules(modalInventoryItemDescRules);
            addRules(modalBleedWhitePocketDynamicRules);
            $('#printMaterialFrm').find('.row-fluid').show();
            $("#DescriptionNameLabel").text("Description:");
            
        }
        $("#typeOfFormNotConnected").val(subCategoryNotConnected);
        $("#typeOfForm").val(subCategoryFormView);
        //alert(subCategoryArr[6]);
        
        //duplicate show only when category is not equipment and Print Material
        if(subCategoryArr[6] != "Equipment" && subCategoryArr[6] != "Print Material")
        {
           if($("#dupExceptEquipPrintMat").hasClass("hide"))
           {
               $("#dupExceptEquipPrintMat").removeClass("hide");
           }    
            
        }
        else
        {
           if(!$("#dupExceptEquipPrintMat").hasClass("hide"))
           {
               $("#dupExceptEquipPrintMat").addClass("hide");
           }  
        }    
      
        // call an ajax call and get the data
        $.ajax({
             url: getFrmUrl+orderItemComponentID,
             dataType: "json",  
             error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                   },
             data:  {displayCategory:subCategoryArr[6]},      
             success: function(response) {
                 var showOnInvoiceBill = response.showOnInvoice
                 var printDoubeSided   = response.printDoubleSided;
                 var customPrintSpecs  = response.CustomPrintSpecs;
              
                 var optionValue            ='<option value="">'+""+'</option>';
                 var inventoryItemDescValue ='<option value="">'+"Please Select"+'</option>';
                 inventoryItemDescValue    += response.inventoryItemDes;

                 for(var i in response.SubMode)
                 {
                     optionValue += response.SubMode[i];
                 } 

                
                 $("#modalEquipment").val(response.Equipment);
                 //alert(response.Equipment);
                 //alert(response.Mode);
                 //alert(response.equipSubModeID);
                 $("#modalMode").val(response.Mode);
                 
                 
                
                
                 $("#modalSubMode").html(optionValue);
                 
                 $("#modalTitle").val(response.title);
                 //alert(response.overlapTile);
                 if(response.overlapTile == null)
                 {
                     //alert("hi");
                 }
                 else
                 {
                      var overlapTile  = Number(response.overlapTile);
                      //alert(overlapTile);
                      $("#modalOverlap").val(overlapTile);
                     
                 }    
                
                 
                 if(printDoubeSided == 1)
                 {
                     $("#modalPrintDoubleSided").attr('checked', true);
                         
                 }
                 else
                 {
                     $("#modalPrintDoubleSided").attr('checked', false);
                         
                 }
                 
                 if(subCategoryFormView == "Description" || subCategoryFormView == "Inventory" )
                 {
                      $("#modalDescription").val(response.Direction);
                      $("#modalDescription").attr("autofocus","autofocus");
                     
                 }
                 else
                 {
                      $("#modalDescription").val(response.Description);
                     
                 }    
                
                 
                 if(showOnInvoiceBill == 1)
                 {
                      $("#modalShowOnInvoice").attr('checked', true);
                     
                 }
                 else
                 {
                      $("#modalShowOnInvoice").attr('checked', false);
                     
                 }    
                 
                 
                 $("#modalQty").val(Number(response.Quantity));
                 
                 $("#modalHeight").val(Number(response.Height));
                 
                 $("#modalWidth").val(Number(response.Width));
                 if(customPrintSpecs == 1)
                 {
                     $("#modalCustomPrintSpecs").attr('checked', true);
                         
                 }
                 else
                 {
                     $("#modalCustomPrintSpecs").attr('checked', false);
                     $(".changeMini").attr("readonly", "readonly");
                     
//                     $("#modalQty").attr("readonly", "readonly");
//                     $('#modalHeight').attr("readonly",'readonly');
//                     $('#modalWidth').attr("readonly",'readonly');
                         
                 }
                 
                 //----InventoryItem Description -------------
                 //alert(inventoryItemDescValue);
                 
                 
                 
                 $("#inventoryItemDesc").html(inventoryItemDescValue);
                 $("#inventoryItemDesc").val(response.inventoryItemID);
                 var inventoryDetails     =  response.inventoryItemID;
                 var inventoryDescription = $("#inventoryItemDesc :selected").text();
                 var poundSign = "#";
                 
                 $("#emailPurchasing").attr("href",  "mailto:purchasing@indyimaging.com?subject=Need Stock for "+ $("#orderIDHidden").val()+" Inventory "+poundSign+" " +inventoryDetails
                                           +" &body= Purchasing please order the following material: Inventory "+poundSign+" "+inventoryDetails+ " "+inventoryDescription); 
        
               
                 
                
                 $("#bleedWhitePocket").html(response.bleedWhitePocket);
                 
                 //--------Bleed------
                 //var obje = JSON.parse(response.bWpData);
                 //alert(response.bWpData.bleedTop);
                 //alert(Number(response.bWpData.bleedBottom));
                 
                 
                 $("#bleedTop").val(Number(response.bWpData.bleedTop));
                 $("#bleedBottom").val(Number(response.bWpData.bleedBottom));
                 $("#bleedLeft").val(Number(response.bWpData.bleedLeft));
                 $("#bleedRight").val(Number(response.bWpData.bleedRight));
                 
                 $("#bleedInches").text(response.bWpData.bleedInches);
                 $("#bleedFeet").text(response.bWpData.bleedFeet);
                 
                 //----Bleed Hidden --------
                 $("#bleedTopHidden").val($("#bleedTop").val());
                 $("#bleedBottomHidden").val($("#bleedBottom").val());
                 $("#bleedLeftHidden").val($("#bleedLeft").val());
                 $("#bleedRightHidden").val($("#bleedRight").val());
                 
               
                 //--------White------
                 $("#whiteTop").val(Number(response.bWpData.whiteTop));
                 $("#whiteBottom").val(Number(response.bWpData.whiteBottom));
                 $("#whiteLeft").val(Number(response.bWpData.whiteLeft));
                 $("#whiteRight").val(Number(response.bWpData.whiteRight));
                 
                 $("#whiteInches").text(response.bWpData.whiteInches);
                 $("#whiteFeet").text(response.bWpData.whiteFeet);
                 
                 //---White Hidden ----
                 $("#whiteTopHidden").val($("#whiteTop").val());
                 $("#whiteBottomHidden").val($("#whiteBottom").val());
                 $("#whiteLeftHidden").val($("#whiteLeft").val());
                 $("#whiteRightHidden").val($("#whiteRight").val());
                 
                 //--------Pocket------
                 $("#pocketTop").val(Number(response.bWpData.pocketTop));
                 $("#pocketBottom").val(Number(response.bWpData.pocketBottom));
                 $("#pocketLeft").val(Number(response.bWpData.pocketLeft));
                 $("#pocketRight").val(Number(response.bWpData.pocketRight));
                 
                 $("#pocketInches").text(response.bWpData.pocketInches);
                 $("#pocketFeet").text(response.bWpData.pocketFeet);
                 
                 //---Pocket Hidden ----
                 $("#pocketTopHidden").val($("#pocketTop").val());
                 $("#pocketBottomHidden").val($("#pocketBottom").val());
                 $("#pocketLeftHidden").val($("#pocketLeft").val());
                 $("#pocketRightHidden").val($("#pocketRight").val());
                 
                
                
                 //$("#orderIDHidden").val(response.orderID);
                 //alert(response.orderID);
                 //alert(response.onHandMinMax);
                 var obj = JSON.parse(response.onHandMinMax);
                 //alert(obj);
                 if(obj != "")
                 {
                     $("#onHand").text(obj.n_Qty);
                     $("#invMin").text(obj.n_Min);
                     $("#invMax").text(obj.n_Max);
                     
                     $("#onHandMinMaxSqFt").removeClass("hide");
                     $("#emailPurchasing").removeClass("hide");
                     
                 }
                 var getDirectionObj = JSON.parse(response.getDirection);
                 var str = "";
                 //alert(getDirectionObj.length);
                 for(var x=0; x<getDirectionObj.length; x++)
                 {
                     //str += '<li><a id="" href="">'+getDirectionObj[i].t_Directions+'</a></li>';style="cursor: pointer;"
                     str += '<li><a href="#">'+getDirectionObj[x].t_Directions+'</a></li>';
                     
                 }
                 //alert(str);
                 $("#dynamicDirection").html(str);
                 
                 
                 
                 $("#setUpPrintMaterialForm").modal({
                      backdrop: false
                 });
                    
             }    
        });
       
        return false;
        
    });
    
    $("#dupFinLineItems").on("click",function(){
        
        var r=confirm("Are You Sure!");
        if (r==true)
        {
            oicDupFinLineItemsValues         = [];
            oicDupFinLineItemsValues[0]      = $("#bleedTopHidden").val();
            oicDupFinLineItemsValues[1]      = $("#bleedBottomHidden").val();
            oicDupFinLineItemsValues[2]      = $("#bleedLeftHidden").val();
            oicDupFinLineItemsValues[3]      = $("#bleedRightHidden").val();

            oicDupFinLineItemsValues[4]      = $("#whiteTopHidden").val();
            oicDupFinLineItemsValues[5]      = $("#whiteBottomHidden").val();
            oicDupFinLineItemsValues[6]      = $("#whiteLeftHidden").val();
            oicDupFinLineItemsValues[7]      = $("#whiteRightHidden").val();

            oicDupFinLineItemsValues[8]      = $("#pocketTopHidden").val();
            oicDupFinLineItemsValues[9]      = $("#pocketBottomHidden").val();
            oicDupFinLineItemsValues[10]     = $("#pocketLeftHidden").val();
            oicDupFinLineItemsValues[11]     = $("#pocketRightHidden").val();

            oicDupFinLineItemsKeys           = [];

            oicDupFinLineItemsKeys[0]        = "n_BleedTop";
            oicDupFinLineItemsKeys[1]        = "n_BleedBottom";
            oicDupFinLineItemsKeys[2]        = "n_BleedLeft";
            oicDupFinLineItemsKeys[3]        = "n_BleedRight";

            oicDupFinLineItemsKeys[4]        = "n_WhiteTop";
            oicDupFinLineItemsKeys[5]        = "n_WhiteBottom";
            oicDupFinLineItemsKeys[6]        = "n_WhiteLeft";
            oicDupFinLineItemsKeys[7]        = "n_WhiteRight";

            oicDupFinLineItemsKeys[8]        = "n_PocketTop";
            oicDupFinLineItemsKeys[9]        = "n_PocketBottom";
            oicDupFinLineItemsKeys[10]       = "n_PocketLeft";
            oicDupFinLineItemsKeys[11]       = "n_PocketRight";

       
        
            // ask for confirm box
        
            $.ajax({
                   url: updateDupLineItems+$("#orderIDHidden").val(),
                   type:"post",
                   error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                   },
                   data:  {resultValues:oicDupFinLineItemsValues,resultKeys:oicDupFinLineItemsKeys},
                   success: function( response ) {
                      //alert(response);
                       
                   }
            });
            //x="You pressed OK!";
        }
        else
        {
            //x="You pressed Cancel!";
        }
  
        
        
        return false;
    });
    
    $("#modalCustomPrintSpecs").click(function(){
         var $this = $(this);
         // $this will contain a reference to the checkbox   
         if ($this.is(':checked')) 
         {
              // the checkbox was checked
             $(".changeMini").removeAttr("readonly", "readonly");
             addRules(modalQtyHeightWidthRules);
             
//             $('#modalQty').removeAttr('readonly','readonly');
//             $('#modalHeight').removeAttr('readonly','readonly');
//             $('#modalWidth').removeAttr('readonly','readonly');         
         }
         else 
         {
             // the checkbox was unchecked
              $(".changeMini").attr("readonly", "readonly");
              removeRules(modalQtyHeightWidthRules);
              
//              $('#modalQty').attr("readonly",'readonly');
//              $('#modalHeight').attr("readonly",'readonly');
//              $('#modalWidth').attr("readonly",'readonly');
//            
         }    
        
    });
    $("#cancelModalPrintMaterialFrm").click(function(){
         $("#printMaterialFrm"). clearForm();
         
         //clear all warnings.
         updateModalForm.resetForm();
         
         $("#bleedInches").text("");
         
         $("#whiteInches").text("");
         
         $("#pocketInches").text("");
         
         $("#bleedFeet").text("");
         
         $("#whiteFeet").text("");
         
         $("#pocketFeet").text("");
         
         $("#onHandMinMaxSqFt").addClass("hide");
         $("#emailPurchasing").addClass("hide");
         
         // reload the web page from the server
         window.location.reload(true);
        
        
    });
    
    $("#validateModalPrintMaterialFrm").click(function(){
         //alert("hi1");
         $("#printMaterialFrm").valid();
         
         //alert("hi12");
         $("#printMaterialFrm").submit();
         //alert("hi13");
    });
    
    $("#removeTableRow").live("click",function()
    {
        var deleteOrderItemComponentID = $(this).parents('tr').attr("id");
        //alert(deleteOrderItemComponentID);
        //alert($(this).attr('href'));
         $.ajax({
                   url: delUrl+'/'+deleteOrderItemComponentID,
                   error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                   },
                   type: 'POST',
                   success: function( response ) {
                       //Remove the row from the table
                       $('tr#' + deleteOrderItemComponentID).remove();
                       //$(this).closest('tr').remove();
                       
                   }
              });
        return false;
        
    });
    var modalQtyHeightWidthRules = {
            modalQty: {
                                required: true

            },
            modalHeight: {
                                required: true

            },
            modalWidth: {
                                required: true

            }
                    
    };
    var modalInventoryItemDescRules = {
            inventoryItemDesc: {
                                required: true

            }
                    
    };
    var modalBleedWhitePocketDynamicRules = {
            bleedTop: {
                                required: true

            },
            bleedBottom: {
                                required: true

            },
            bleedLeft: {
                                required: true

            },
            bleedRight: {
                                required: true

            },
            whiteTop: {
                                required: true

            },
            whiteBottom: {
                                required: true

            },
            whiteLeft: {
                                required: true

            },
            whiteRight: {
                                required: true

            },
            pocketTop: {
                                required: true

            },
            pocketBottom: {
                                required: true

            },
            pocketLeft: {
                                required: true

            },
            pocketRight: {
                                required: true

            }
                    
    };
    function addRules(rulesObj)
    {
            for (var item in rulesObj)
            { 
                $('#'+item).rules('add',rulesObj[item]);
            }
    }

    function removeRules(rulesObj)
    {
            for (var item in rulesObj)
            {
                $('#'+item).rules('remove');  
            }
    }
     var updateModalForm = $("#printMaterialFrm").validate({
         submitHandler:function(form) {
            
             //alert("submitForm:"+$("#orderIDHidden").val());
             //alert("h2");
             $.ajax({
                    url: submitUrl,
                    dataType: "json",
                    error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
                    },
                    type: 'POST',
                    
                    data: $("#printMaterialFrm").serialize(),
                    success: function( response ) {
                       
                        //--- clear form ---
                        $("#printMaterialFrm").clearForm();
                        //alert("hi");
                        
                        //hide the modal window
                        $('.modal').modal('hide');
                        
                        //window.location = "orderItemUpSideFrm/read/"+orderItemID;
                        //window.location.reload(true);
                        //alert("response:" +response);
                        
                        if(orderID == "template")
                        {
                             window.location.href ="orderItemUpSideFrm/template/"+orderItemID;
                            
                        }
                        else
                        {
                             window.location.href ="orderItemUpSideFrm/read/"+orderItemID+"#chosenFocus";
                             window.location.reload(true);
                        }    
                       
                        
                    }
             });
             
         }
         
     });
});
function readSetupHeading() {
    $.ajax({
        url: readSetUpHeadingUrl+productBuildID,
        dataType: "json",
        error: function(xhr,status,error){
                       alert("Please Contact IT (Error): "+ xhr.status+"-"+error);
        },
        success: function( response ) {
            //alert(response);
            $("#setUpHeading").text(response);
            
        }
        
    });
    
}
function readSetupLeftTable() {
     $.ajax({
                    url: readLeftUrl+productBuildID,
                    dataType: "json",
                    error: function(xhr,status,error){
                       alert("Please tt Contact IT (Error): "+ xhr.status+"-"+error);
                    },
                    success: function( response ) {
                        //alert(Object.keys(response)) ; 
                        //alert(Object.keys(response).length);
                        //alert("hi");
                        //alert(response);
                        //alert(response.setupLeftTable);
                        //alert(response.setupLeftTable);
                        $("#oicSetupLeft").html(response.setupLeftTable);
                        var sel = $("#oicSetupLeft");
                           
//                         $.each(response,function(key, cat){
//                              var group = $('<optgroup>',{label:key});
//                            $.each(cat,function(i,item){
//                                 $("<option/>",{value:item.productBuildItemID
//                                      +","+item.buildItemID
//                                        +","+item.equipmentID
//                                        +","+item.equipmentModeID
//                                        +","+item.DisplayCategory
//                                        +","+item.DisplayName,text:item.DisplayName}).appendTo(group);
//                                
//                            });
//                           group.appendTo(sel); 
//                        });
                        //sel += '<option value="ssss">'+"Please Select"+'</option>';
                       
                       
                       
                        //sel.append('data-placeholder=\"Related BuiltItems\"');
                        //sel.empty();
                        // alert("test2: "+response.length);
//                        for (var i=0; i<response.length; i++)
//                        {
//                            sel.append('<optgroup label="'+response[i].DisplayCategory+'">'
//                                        +'<option value="'+response[i].productBuildItemID
//                                        +","+response[i].buildItemID
//                                        +","+response[i].equipmentID
//                                        +","+response[i].equipmentModeID
//                                        +","+response[i].DisplayCategory
//                                        +","+response[i].DisplayName
//                                        +","+response[i].DisplaySort
//                                        +'">' + response[i].DisplayName + 
//                                        '</option>'
//                                        +'</optgroup>');
//                             
//
//
//                        }
                        $("#oicSetupLeft").trigger("liszt:updated");
                        //alert("test3: "+response.length);
                        
                    }
     });
    
}
function readSetupRightTable() {
    $.ajax({
                    url: readRightUrl+orderItemID,
                    dataType: 'json',
                    
                    success: function( response ) {
                        //alert("1hi");
                        //alert(response);
                        for( var i in response ) 
                        {
                            //alert(response[ i ].nb_InvalidProductBuild);
                            if(response[ i ].nb_InvalidProductBuild == "1")
                            {
                                response[ i ].indicateError = "error";  
                            }
                            else
                            {
                                //alert("hi");
                                response[ i ].indicateError = "noColor";   
                            }    
                            if(response[ i ].t_Category == "Print Material")
                            {
                                response[ i ].forPrint          = "";
                                response[ i ].forPrintDirection = "";
                                
                                //--------- Print Display Name -----------------------------
//                                if(response[ i ].printAttrPrintDoubleSided !== undefined)
//                                {
//                                    //alert("hello world "+response[ i ].printAttrPrintDoubleSided);
//                                    response[ i ].forPrint += "<br/>"+response[ i ].printAttrPrintDoubleSided; 
//                                }
//                                if(response[ i ].printAttrSubMode !== undefined)
//                                {
//                                    if(response[ i ].printAttrSubMode != null)
//                                    {
//                                        response[ i ].forPrint += "<br/>"+"Submode: "+response[ i ].printAttrSubMode;  
//                                    }  
//                                } 
//                                if(response[ i ].printAttrTiled !== undefined)
//                                {
//                                    if(response[ i ].printAttrTiled != null)
//                                    {
//                                        response[ i ].forPrint += "<br/>"+"Tile: "+response[ i ].printAttrTiled; 
//                                    }  
//                                } 
//                                if(response[ i ].printAttrOverlapTile !== undefined)
//                                {
//                                    if(response[ i ].printAttrOverlapTile != null)
//                                    {
//                                        response[ i ].forPrint += "<br/>"+"Overlap: "+response[ i ].printAttrOverlapTile;  
//                                    }
//                                }
                                //--------- Print Display Name -----------------------------
                                if(response[ i ].printAttrPrintDoubleSided == "1")
                                {
                                    //alert("hello world "+response[ i ].printAttrPrintDoubleSided);
                                    response[ i ].forPrint += "<br/>"+"Print Double Sided"; 
                                }
                                if(response[ i ].printAttrSubMode != null && response[ i ].printAttrSubMode != "" && response[ i ].printAttrSubMode != 0)
                                {
                                    response[ i ].forPrint += "<br/>"+"Submode: "+response[ i ].printAttrSubMode; 
                                }
                                if(response[ i ].printAttrTiled != null && response[ i ].printAttrTiled !="")
                                {
                                    response[ i ].forPrint += "<br/>"+"Tile: "+response[ i ].printAttrTiled; 
                                }
                                if(response[ i ].printAttrOverlapTile != null && response[ i ].printAttrOverlapTile != "" )
                                {
                                    response[ i ].forPrint += "<br/>"+"Overlap: "+response[ i ].printAttrOverlapTile;  
                                  
                                }
                               
//                                if(response[ i ].printAttrCustomPrintSpecs !== undefined)
//                                {
//                                    if(response[ i ].printAttrCustomPrintSpecs == "1")
//                                    {
//                                        response[ i ].forPrintDirection += '<input onclick="return false" name="printCustSpecCheckBoxDisplayOnly"  class="printCustSpecCheckBoxDisplayOnly" type="checkbox" checked> Custom Print Specs';  
//                                    }
//                                    
//                                }
//                                if(response[ i ].printAttrqtyHtW !== undefined)
//                                {
//                                    response[ i ].forPrintDirection += response[ i ].printAttrqtyHtW;  
//                                    
//                                    
//                                }
//                                if(response[ i ].printAttrbWpData !== undefined)
//                                {
//                                     response[ i ].forPrintDirection += response[ i ].printAttrbWpData;
//                                    //response[ i ].forPrintDirection +=  '<table  class="table table-striped table-bordered table-condensed" id="tableBleedWhitePocked"><th></th><th>T</th><th>B</th><th>L</th><th>R</th><th>Inches</th><th>Feet</th><tr><td>B</td><td id="bleedTopDisplayOnly">'+Number(response[ i ].printAttrbWpData.bleedTop)+'</td><td id="bleedBottomDisplayOnly"></td><td id="bleedLeftDisplayOnly"></td><td id="bleedRightDisplayOnly"></td><td id="bleedInches"></td><td id="bleedFeet"></td></tr></table>';  
//                                    
//                                    
//                                }
                                //--------- Print Direction  -----------------------------
                                if(response[ i ].printAttrCustomPrintSpecs == "1")
                                {
                                    response[ i ].forPrintDirection += '<input onclick="return false" name="printCustSpecCheckBoxDisplayOnly"  class="printCustSpecCheckBoxDisplayOnly" type="checkbox" checked> Custom Print Specs';  
                                }
                                response[ i ].forPrintDirection += response[ i ].printAttrqtyHtW;
                                response[ i ].forPrintDirection += response[ i ].printAttrbWpData;

                            }
                            else
                            {
                                response[ i ].forPrint          = "";
                                response[ i ].forPrintDirection = "";
                            }    
                            response[ i ].formLink   = formUrl +response[ i ].OrderItemComponentID+"/"+response[ i ].t_FormView
                                                       +"/"+response[ i ].nb_NotConnectedToInventory+"/"+response[i].t_Category;
                            response[ i ].deleteLink = delUrl+response[ i ].t_Category +'/'+response[ i ].OrderItemComponentID;
                        }
                        
                        //clear old rows
                        $( '#records tbody' ).html( '' );
                        //alert("2hi");
                        //append new rows
                        $( '#readTemplate' ).render( response ).appendTo( "#records tbody" );
                        //alert("3hi");
                    }
        });
    
}


