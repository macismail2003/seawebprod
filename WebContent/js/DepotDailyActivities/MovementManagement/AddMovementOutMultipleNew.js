/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var currentDateAMOM;
var jsonMoveOutToValidateEntries = [];
var jsonMoveOutToSubmitEntries = [];
//Arrays
var dtTodayAMOMltpl = new Date();

var frmtAMOMYYYYMMDD = [dtTodayAMOMltpl.getFullYear(),padZero(dtTodayAMOMltpl.getMonth()+1),padZero(dtTodayAMOMltpl.getDate())].join('');

var aMoveOutMultipleAMOM = [];

var oModelMoveOutMultipleAMOM = new sap.ui.model.json.JSONModel();
oModelMoveOutMultipleAMOM.setData({modelData: aMoveOutMultipleAMOM});

var aTempAMOM = [];
var loggedInUserTypeAMOM = "";
var vInputDepotOutMultipleValAMOM = "";
var oInputDepotOutMultipleAMOM = "";
var arrayLenMOS = "";
var depotNameListAMOM = [];
var unitsTankTypeAMOM = [];
var selectedDepotToPassAMOM = "";
var selectedDepotToPassCodeAMOM = "";
var vInputDepotListAMOM = "";
var flagOnChangeDepotNameAMOM = false;
var flagOnChangeDepotCodeAMOM = false;
var validAMOMFieldsStatus = true;
var validAMOMStatus = true;

sap.ui.model.json.JSONModel.extend("addMovemntOutMultipleViewNew", {
	
	createAddMovemntOutMultipleNew: function(){
		
		aMoveOutMultipleAMOM.length = 0;
		aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
 	
		// Labels
		var oLabelDepotOutMultiple = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12",linebreak: false, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMandatoryOutMultiple = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");
		
		var oLabelSpaceAMOM = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oComboDepotAMOM = new sap.ui.core.HTML("idListDepotComboAMOM",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idComboDepotAMOM" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oComboDepotAMOM.setContent(htmlContentDepot);
		
		/*// Depot Drop-down
		var oListDepotOutMultiple = new sap.ui.commons.ListBox("idListDepotOutMultiple", {items : [
    	                                                                   new sap.ui.core.ListItem({id:"depmul1", text:"Depot 1"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul2", text:"Depot 2"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul3", text:"Depot 3"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul4", text:"Depot 4"}),
    	                                                                   ]});
		        		  
	    var oComboDepotOutMultiple = new sap.ui.commons.DropdownBox("idComboDepotOutMultiple", {tooltip:"Depot", 
	    	layoutData: new sap.ui.layout.GridData({span: "L6 M4 S4"}),
			  width:"99%",
	          displaySecondaryValues:false, value:"Select Depot", "association:listBox" : oListDepotOutMultiple}).addStyleClass("FormOutputStyle margin2");*/
	
	    
	 // Text Field
		oInputDepotOutMultipleAMOM = new sap.ui.commons.TextField("idDepotOutputFieldAMOM",{
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
			placeholder:"Depot Code",
    		change: function(){
    			//flagOnChangeDepotCodeAMOM = true;
           	 if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
            }
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
		/*oInputDepotOutMultipleAMOM.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotOutMultipleAMOM.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/
    	
		var oAddOutExcelContainer = new sap.ui.core.HTML("idAddOutExcelContainer").addStyleClass("marginLeft marginTop20");
        var oAddOutExcel = '<div id="idAddOutExcel" style="width:60%" class="marginLeft marginTop20">';
        oAddOutExcelContainer.setContent(oAddOutExcel);
        
        var oBtnOutMultipleEntry5 = new sap.m.Button("idBtnOutMultipleEntry5",{
			  text : "Insert 5 Lines",
			  //width:"100px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  	var excelLength = oExcelGridAddOut.getData().length;
					var allowedLength = 25 - oExcelGridAddOut.getData().length;
					if(excelLength < 25){
					if(excelLength < 20){
					oExcelGridAddOut.alter('insert_row', '', 5);
					}else{
					oExcelGridAddOut.alter('insert_row', '', allowedLength);	
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}
		}}).addStyleClass("submitBtn marginRight marginLeft marginTop20");
        
    	// Buttons
	   	 var oBtnOutMultipleContinue = new sap.m.Button("idBtnOutMultipleContinueAMOM",{
		          text : "Validate",
		          //width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var selDepValAMOM = document.getElementById("idComboDepotAMOM").value;
		  		      var partsDepAMOM = selDepValAMOM.split("-");
		  		      selectedDepotToPassCodeAMOM = partsDepAMOM[3];
		  		
		        	  var oValidateMOSObj = new addMovemntOutMultipleViewNew();
		        	  oValidateMOSObj.validateMoveOutMultiple();
		          }}).addStyleClass("submitBtn marginTop20");
	   	
		   	var oFlexInsertValidateAMOM = new sap.m.FlexBox({
		           items: [
							oBtnOutMultipleEntry5,
							oBtnOutMultipleContinue
		           ],
		           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
		           direction : "Row",
					});
		   	
	   	var oBtnOutMultipleRemoveFilter = new sap.m.Button("idBtnOutMultipleRemoveFilterAMOM",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotOutMultipleAMOM.setValue("");
	        	  $("#idComboDepotAMOM").val("");
		          this.setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	 var oBtnOutMultipleApplyFilter = new sap.m.Button("idBtnOutMultipleApplyFilterAMOM",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oInputDepotOutMultipleAMOM.getValue() == ""/* && document.getElementById("idComboDepotAMOM").value == ""*/){
		        		  /*oInputDepotOutMultipleAMOM.setValueState(sap.ui.core.ValueState.Error);
		        		  oInputDepotOutMultipleAMOM.setValue("");
		        		  oInputDepotOutMultipleAMOM.setPlaceholder("Required");*/
		        		  $("#idComboDepotAMOM").val("");
		        		  /*document.getElementById("idComboDepotAMOM").style.borderColor = "red";
		        		  document.getElementById("idComboDepotAMOM").style.background = "#FAD4D4";*/
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM").setEnabled(true);
		          		document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		        		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
		          		/*oInputDepotOutMultipleAMOM.setPlaceholder("");
		          		  if(document.getElementById("idComboDepotAMOM").value == ""){*/
				          		var depotCodeAMOM = new RegExp(oInputDepotOutMultipleAMOM.getValue());
				          		  for(var i=0; i<depotNameListAMOM.length; i++){
				          			var depotNameAMOM = depotNameListAMOM[i];
				          			var resultAMOM = depotCodeAMOM.test(depotNameAMOM);
					          		if(resultAMOM){
					          			$("#idComboDepotAMOM").val(depotNameAMOM);
					          			break;
					          		}
					          		else{
					          			 $("#idComboDepotAMOM").val("");
					          		}
								   /* var partsAMOM = depotNameAMOM.split("-");
								    var depotCodeAMOM = partsAMOM[partsAMOM.length - 2];
					          		//var resultAMOM = depotCodeAMOM.test(depotNameAMOM);
					          		//if(resultAMOM){
				          			if(depotCodeAMOM == oInputDepotOutMultipleAMOM.getValue()){
					          			$("#idComboDepotAMOM").val(depotNameAMOM);
					          			break;
					          		}
					          		else{
					          			$("#idComboDepotAMOM").val("");
					          		}*/
				          		  }
		          		  /*}
		          		  if(oInputDepotOutMultipleAMOM.getValue() == ""){
		          			var keyAMOM = document.getElementById("idComboDepotAMOM").value;
						    var partsAMOM = keyAMOM.split("-");
						    var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
						    oInputDepotOutMultipleAMOM.setValue(lastPartAMOM);
						    oInputDepotOutMultipleAMOM.setValueState(sap.ui.core.ValueState.None);
		          		  }
		          		if(flagOnChangeDepotNameAMOM){
		          			var keyAMOM = document.getElementById("idComboDepotAMOM").value;
						    var partsAMOM = keyAMOM.split("-");
						    var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
						    oInputDepotOutMultipleAMOM.setValue(lastPartAMOM);
						    oInputDepotOutMultipleAMOM.setValueState(sap.ui.core.ValueState.None);
						    flagOnChangeDepotCodeAMOM = false;
						    flagOnChangeDepotNameAMOM = false;
		          		  }
		          		  if(flagOnChangeDepotCodeAMOM){
		          			var depotCodeAMOM = new RegExp(oInputDepotOutMultipleAMOM.getValue());
			          		  for(var i=0; i<depotNameListAMOM.length; i++){
			          			var depotNameAMOM = depotNameListAMOM[i];
				          		var resultAMOM = depotCodeAMOM.test(depotNameAMOM);
				          		if(resultAMOM){
				          			$("#idComboDepotAMOM").val(depotNameAMOM);
				          			break;
				          		}
			          		  }
		          		  }*/
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	var oFlexApplyRemoveAMOM = new sap.m.FlexBox({
	           items: [
						oBtnOutMultipleApplyFilter,
						oLabelSpaceAMOM,
						oBtnOutMultipleRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
	   	 
	   	var oImageAddMOS = new sap.ui.commons.Image("imgAddMOS");
	   	oImageAddMOS.setSrc("images/add_row.png");
	   	oImageAddMOS.setTooltip("Add New Row");
	   	oImageAddMOS.setDecorative(false);
	   	oImageAddMOS.addStyleClass("marginTop20 marginRight5");
	   	
	   	var MaxLimitReachedMessage = "Max row limit of 25 reached. Please submit these rows and then add more unit numbers.";
	   	
	   	var oBtnIMAddNewRow = new sap.ui.commons.Link({
	        text: "Add New Row", 
	        tooltip: "Add New Row",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	var currentArrayLenMOS = aMoveOutMultipleAMOM.length;
	        	if(currentArrayLenMOS == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK], 
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aMoveOutMultipleAMOM.push({
	        		'checked':false,
                    'serialNo':"",
                    'frmtAMOMYYYYMMDD' : frmtAMOMYYYYMMDD,
                    'retDateVal': "",
                    'retDate': dtTodayAMOMltpl,
                    'retDateVal': "",
                    'auth':"",
                    'statusA':false,
                    'tankDetails': "NA",
                    'unNo': "",
                    'lastClnDate': "",
                    'lastCargoDesc': "",
                    'clnProcDesc': ""
              });
	        		oModelMoveOutMultipleAMOM.updateBindings();
	        	  oMoveOutMultipleTable.setVisibleRowCount(aMoveOutMultipleAMOM.length);
	        	  currentArrayLenMOS = currentArrayLenMOS + 1;
	        	}
          }}).addStyleClass("marginTop25 marginRight");
	   	
	   	/*var oBtnIMAddNewRow = new sap.m.Button("idBtnIMAddNewRow",{
		          text : "Add New Row",
		          width:"115px",
		          type:sap.m.ButtonType.Unstyled,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  aMoveOutMultipleAMOM.push({
		        		  'checked':false,
	                    'serialNo':"",
	                    'retDate': "",
	                    'auth':"",
	                    'statusA':false
                  });
		        	  oModelMoveOutMultipleAMOM.updateBindings();
		        	  oMoveOutMultipleTable.setVisibleRowCount(aMoveOutMultipleAMOM.length);
	          }}).addStyleClass("submitBtn marginTop10");*/
	   	
	   	var oImageDeleteMOS = new sap.ui.commons.Image("imgDeleteMOS");
	   	oImageDeleteMOS.setSrc("images/delete_row.png");
	   	oImageDeleteMOS.setTooltip("Add New Row");
	   	oImageDeleteMOS.setDecorative(false);
	   	oImageDeleteMOS.addStyleClass("marginTop20 marginRight5");
	   	
	   	var oBtnMOSDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	  arrayLenMOS = aMoveOutMultipleAMOM.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenMOS; j++){
	        		  if(aMoveOutMultipleAMOM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenMOS){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenMOS-1; i>=0; i--){
	        		  if(aMoveOutMultipleAMOM[i].checked){
	        			  aMoveOutMultipleAMOM.splice(i,1);
	        			  oModelMoveOutMultipleAMOM.updateBindings();
	        			  arrayLenMOS = arrayLenMOS - 1;
	        		  }
	        	  }
	        	  oMoveOutMultipleTable.setVisibleRowCount(arrayLenMOS);
	        	  }
	          }}).addStyleClass("marginTop25 marginRight");
	   	
	   	var oFlexOutAddDeleteMOS = new sap.m.FlexBox({
	           items: [
						oImageAddMOS,
						oBtnIMAddNewRow,
						oImageDeleteMOS,
						oBtnMOSDeleteRow
	           ],
	           direction : "Row",
				});
	   	
	   	/*var oBtnMOSDeleteRow = new sap.m.Button("idBtnMOSDeleteRow",{
	          text : "Delete Row",
	          width:"115px",
	          type:sap.m.ButtonType.Unstyled,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  arrayLenMOS = aMoveOutMultipleAMOM.length;
	        	  for(var i=arrayLenMOS-1; i>=0; i--){
	        		  if(aMoveOutMultipleAMOM[i].checked){
	        			  aMoveOutMultipleAMOM.splice(i,1);
	        			  oModelMoveOutMultipleAMOM.updateBindings();
	        			  arrayLenMOS = arrayLenMOS - 1;
	        		  }
	        	  }
	        	  oMoveOutMultipleTable.setVisibleRowCount(arrayLenMOS);
	          }}).addStyleClass("submitBtn marginTop10");*/
	    
	 // Table
    	var oMoveOutMultipleTable = new sap.ui.table.Table("idTblAdMovInMultiplAMOM",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"70%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop33");
    	
    	// Table Columns
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"20px",
        	hAlign: "Center"}));
    	
    	var arrEnteredSerNo = [];
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}),
    		 template: new sap.ui.commons.TextField("idSerNoAMOMInput",{textAlign:"Left",
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    				 var enteredSerNo = this.getValue();
    				 var count = 0;

                     for(var j=0;j<aMoveOutMultipleAMOM.length;j++){
                             if(enteredSerNo == aMoveOutMultipleAMOM[j].serialNo){
                                     count++;
                             }
                     }

                     if(count == 1){
                    	 	arrEnteredSerNo.push(enteredSerNo);
                     }
                     else{
                             this.setValueState(sap.ui.core.ValueState.Error);
                             this.setValue("");
                             this.setPlaceholder("Duplicate");
                     }
    				 /*for(var i=0;i<arrEnteredSerNo.length;i++){
    					 if(enteredSerNo == arrEnteredSerNo[i]){
    						this.setValueState(sap.ui.core.ValueState.Error);
					  		this.setValue("");
					  		this.setPlaceholder("Duplicate");
    					 }
    				 }
    				 arrEnteredSerNo.push(enteredSerNo);*/
    			 }}).bindProperty("value", "serialNo").bindProperty("valueState", "valuestateSrno").bindProperty("placeholder", "placeHolderSrno").addStyleClass("borderStyle margin5"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width: "70px",
             hAlign: sap.ui.commons.layout.HAlign.Left
    		 }));
    	
    	sap.ui.getCore().byId("idSerNoAMOMInput").setMaxLength(11);
    	
    	/*var oModelCurrDateAMOM = new sap.ui.model.json.JSONModel();
    	oModelCurrDateAMOM.setData({
	   		dateValue: new Date()
		});*/
    	
    	var oOutDateAMOM = new sap.ui.commons.DatePicker("idOutDateInputAMOM",{
    		width:"120px",
    		//textAlign:"Right",
			  value: {
				  path: "{retDate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("yyyymmdd", "frmtAMOMYYYYMMDD").bindProperty("placeholder", "placeHolderDate").bindProperty("valueState", "valuestateDate").addStyleClass("margin5 paddingRight15");
	   	
    	/*var oOutDateAMOM = new sap.ui.commons.DatePicker("idOutDateInputAMOM",{
    		width:"120px",
    		textAlign:"Right",
    		 value: {
				  path: "/dateValue",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("value", "retDate").addStyleClass("margin5 textRight paddingRight15");*/
    	//oOutDateAMOM.setModel(oModelCurrDateAMOM);
    	//oOutDateAMOM.setYyyymmdd("20100101");
    	//oOutDateAMOM.setLocale("en-US"); 
    	
/*    	oOutDateAMOM.attachChange(
                function(oEvent){
                        if(oEvent.getParameter("invalidValue")){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                                	var editDate = this.getValue();
	              				  	var id = this.sId.replace('idOutDateInputAMOM-col2','idOutDateInputCopyAMOM-col5');
	              				  	var oidTxtVwRetTbl = sap.ui.getCore().byId(id);
	              				  	oidTxtVwRetTbl.setText(editDate);
                        //}
                }
    	);*/
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true}),
			 template: oOutDateAMOM.addStyleClass("borderStyle"),
             sortProperty: "retDate",
             filterProperty: "retDate",
             resizable:false,
             width: "70px",
            // hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));
    	
    	/*oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true, textAlign:"Right"}),
			 template: new sap.ui.commons.TextField("idOutDateInputAMOM",{textAlign:"Right"}).bindProperty("value", "retDate").addStyleClass("borderStyle paddingRight15"),
             resizable:false,
            width: "50px",
            hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));*/
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Authorisation", required: true}),
    		 template: new sap.ui.commons.TextField("idAuthAMOMInput",{textAlign:"Left",
    			 change: function(){
                	 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
                 }}).bindProperty("value", "auth").bindProperty("valueState", "valuestateAuth").bindProperty("placeholder", "placeHolderAuth").addStyleClass("borderStyle"),
             sortProperty: "auth",
             filterProperty: "auth",
             resizable:false,
             hAlign: sap.ui.commons.layout.HAlign.Left,
             width: "70px",
    		 }));
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Status 'A'"}),
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "statusA"),
        	sortProperty: "statusA",
        	filterProperty: "statusA",
        	resizable:false,
        	width: "40px",
        	hAlign: "Center"}));
    	
    	/*oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
    		template: new sap.ui.commons.TextView("idOutDateInputCopyAMOM",{wrapping:false}).bindProperty("text", "retDate"),
           width:"0px",
           //label: new sap.ui.commons.Label({text: "S"}),
           //visible:false,
           resizable:false
			 }));*/
    	
    	//Create a model and bind the table rows to this model
    	//var oModelMoveOutMultipleAMOM = new sap.ui.model.json.JSONModel();
    	//oModelMoveOutMultipleAMOM.setData({modelData: aMoveOutMultipleAMOM});
    	oMoveOutMultipleTable.setModel(oModelMoveOutMultipleAMOM);
    	oMoveOutMultipleTable.bindRows("/modelData");
    	
    	// Responsive Grid Layout
	    var oAddMoveOutMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveOutMultipleLayout",{
	    	  labelSpanL: 1,
              labelSpanM: 1,
              labelSpanS: 1,
              emptySpanL: 0,
              emptySpanM: 0,
              emptySpanS: 0,
              columnsL: 1,
              columnsM: 1,
              columnsS: 1,
              breakpointL: 765,
              breakpointM: 320
	    });

	  // Online Form Starts
	     var oAddMoveOutMultipleForm = new sap.ui.layout.form.Form("idAddMoveOUTMultipleForm",{
	             layout: oAddMoveOutMultipleLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleFormC1",{
	                             //title: "Add Movement In - Multiple",
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotOutMultiple, oComboDepotAMOM, oInputDepotOutMultipleAMOM,oFlexApplyRemoveAMOM]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oAddOutExcelContainer]
												}),
												//new sap.ui.layout.form.FormElement({
												//    fields: [oFlexInAddDeleteMOS]
												//}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexInsertValidateAMOM]
												}),
												//new sap.ui.layout.form.FormElement({
												//    fields: [oLabelMandatoryInMultiple]
												//})
	                                     ]
	                     }),
	                    /* new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleFormC2",{
                         formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexApplyRemoveAMOM]
											})
                                     ]
                     })*/
	             ]
	     });
	     
/*	  // Responsive Grid Layout
		    var oAddMoveOutMultipleLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveOutMultipleLayout2",{
		    	  labelSpanL: 1,
	              labelSpanM: 1,
	              labelSpanS: 1,
	              emptySpanL: 0,
	              emptySpanM: 0,
	              emptySpanS: 0,
	              columnsL: 2,
	              columnsM: 2,
	              columnsS: 1,
	              breakpointL: 765,
	              breakpointM: 320
		    });
		    
		 // Online Form Starts
		     var oAddMoveOutMultipleForm2 = new sap.ui.layout.form.Form("idAddMoveOUTMultipleForm2",{
		             layout: oAddMoveOutMultipleLayout2,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleForm2C1",{
		                             //title: "Add Movement In - Multiple",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oMoveOutMultipleTable]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexInAddDeleteMOS]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnInMultipleContinue]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMandatoryInMultiple]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleForm2C2",{
		                         formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: []
													})
		                                     ]
		                     })
		                     ]
		     });
		     
		     var oFlexAll = new sap.m.FlexBox({
		           items: [
							oAddMoveOutMultipleForm,
							//oMoveOutMultipleTable,
							oAddMoveOutMultipleForm2,
		           ],
		           direction : "Column",
					});
		     */
	     	return oAddMoveOutMultipleForm;
	   	
	},
	
	populateDepotNameAMOM: function(){
		busyDialog.open();
		currentDateAMOM = dateFormat(new Date(),'dd-mm-yyyy');
		for(var i=0;i<aMoveOutMultipleAMOM.length;i++){
			aMoveOutMultipleAMOM[i].retDate = currentDateAMOM;
		}
		for(var i=0;i<unitsTankTypeAMOM.length;i++){
			unitsTankTypeAMOM[i].lastCleanDate = currentDateAMOM;
		}
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMOMDep = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallAMOMDep : "+urlToCallAMOMDep);
		OData.request({ 
		      requestUri: urlToCallAMOMDep,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	for ( var i = 0; i < data.results.length ; i++) {
		    		depotNameListAMOM[i] = data.results[i].FunctionalLoc;
				}
		    	$("#idComboDepotAMOM").autocomplete({
		    	      source: depotNameListAMOM,
		    	      minLength: 0,
		    	      /*select: function(){
		    	    	  flagOnChangeDepotNameAMOM = true;
		    	      }*/
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.bind( "focusout", function( event ) {
		    		//this.setValueState(sap.ui.core.ValueState.None);
					  //this.setPlaceholder("Select Depot");
		    			/*var keyAMOM = this.value;
					    var partsAMOM = keyAMOM.split(" ");
					    var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
					    oInputDepotOutMultipleAMOM.setValue(lastPartAMOM);*/
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListAMOM) {
		    	        if (depotNameListAMOM[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeAMOM = objLoginUser.getLoggedInUserType();
		    	//alert("loggedInUserTypeAMOM : "+loggedInUserTypeAMOM);
				if(loggedInUserTypeAMOM == "SEACO"){
					$("#idComboDepotAMOM").removeAttr('disabled');
					$("#idComboDepotAMOM").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM").setEnabled(false);
					sap.ui.getCore().byId("idBtnOutMultipleApplyFilterAMOM").setEnabled(true);
					sap.ui.getCore().byId("idDepotOutputFieldAMOM").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					//alert("DepotCode : "+DepotCode);
					for(var i=0;i<depotNameListAMOM.length;i++){
						if(depotNameListAMOM[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListAMOM[i];
					}
					$("#idComboDepotAMOM").attr("disabled","disabled");
					$("#idComboDepotAMOM").val(DepotCode);
					var depotAMOM = document.getElementById("idComboDepotAMOM").value.split("-");
					sap.ui.getCore().byId("idDepotOutputFieldAMOM").setValue(depotAMOM[3]);
					sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM").setEnabled(false);
					sap.ui.getCore().byId("idBtnOutMultipleApplyFilterAMOM").setEnabled(false);
					sap.ui.getCore().byId("idDepotOutputFieldAMOM").setEnabled(false);
				}



		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	validateMoveOutMultiple: function(){
		var oCurrAMOM = this;
		vInputDepotOutMultipleValAMOM = oInputDepotOutMultipleAMOM.getValue();
		vInputDepotListAMOM = document.getElementById("idComboDepotAMOM").value;
		var isValid = true;
  	  if(vInputDepotListAMOM ==""){
  		document.getElementById("idComboDepotAMOM").style.borderColor = "red";
		document.getElementById("idComboDepotAMOM").style.background = "#FAD4D4";
		$("#idComboDepotAMOM").attr("placeholder","Required");
		isValid = false;
  	  }
	  	if(vInputDepotListAMOM.trim().length > 0){
			var match = jQuery.inArray(vInputDepotListAMOM,depotNameListAMOM);
			if(match < 0){
				document.getElementById("idComboDepotAMOM").style.borderColor = "red";
	    		document.getElementById("idComboDepotAMOM").style.background = "#FAD4D4";
	    		document.getElementById("idComboDepotAMOM").value = "";
	    		document.getElementById("idComboDepotAMOM").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
	    		document.getElementById("idComboDepotAMOM").placeholder = "Depot";
	    		isValid = true;
			}
		}
  	  if(isValid){
  		//oInputDepotOutMultipleAMOM.setValueState(sap.ui.core.ValueState.None);
  		document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
  		oCurrAMOM.continueAMOM();
  	  }
	},
	
	continueAMOM: function(){
//		busyDialog.open();
		var oCurrent = this;
		
//		 var bus = sap.ui.getCore().getEventBus();
//	  	  	bus.publish("nav", "to", {
//	        id : "ValidateMoveOutMultiple"
//  	  	 });
//	  	 var oObjValidateMoveOutMultiple = new validateMoveOutMultipleView();
//	  	 oObjValidateMoveOutMultiple.updateBindingValidateAMOM();
		
		var tempDateArray = [];
		var cleanDateArray = "";
		var tempDate = "";
		var cleanDate = "";
		var j = 0;
		jsonMoveOutToValidateEntries.length = 0;
		var datainsert = false;
		for(var i =0; i < excelDataAddOut.length;i++){
			j = 0;
			datainsert = true;
 			while(j<2){
 				if(excelDataAddOut[i][j] == "" || excelDataAddOut[i][j] == null){
 					datainsert = false;
 					break;
 				}
 				j++;
 			}
 			if(datainsert){
 				if(excelDataAddOut[i][1] != ""){
 				tempDateArray = excelDataAddOut[i][1].split('/');
 				tempDate = tempDateArray[2] + tempDateArray[1] +tempDateArray[0];
 				}else{
 				tempDate = "";	
 				}
 				
 				
 				jsonMoveOutToValidateEntries.push({
 					"Serial":excelDataAddOut[i][0].toUpperCase(),
 					"Date":tempDate,
 					"Release":excelDataAddOut[i][2]
 				});
 			}
 		}
		
		if(jsonMoveOutToValidateEntries.length == 0){
			sap.ui.commons.MessageBox.alert("Enter at least one entry!" );
			return;
		}else{
			oCurrent.sendToSapForMoveOutValidationNew();
		}
		
	  	
	},
	
	sendToSapForMoveOutValidationNew : function(){
		
		var enableConfirm = true;
		jsonMoveOutToSubmitEntries = [];
		var jsonMoveOutToValidateEntriesLength = jsonMoveOutToValidateEntries.length;
		var depot = selectedDepotToPassCodeAMOM;
		var stringToPass = "";
		var stringCount = 1;
		var selDepValAMOM = document.getElementById("idComboDepotAMOM").value;
		var partsDepAMOM = selDepValAMOM.split("-");
		selectedDepotToPassAMOM = partsDepAMOM[0] + "-" + partsDepAMOM[1] + "-" + partsDepAMOM[2] + "-" + partsDepAMOM[3];
		if(jsonMoveOutToValidateEntriesLength == 0)
			sap.ui.commons.MessageBox.alert("No data to submit");
		else{
			for(var i =0; i < jsonMoveOutToValidateEntriesLength; i++){
				if(stringToPass == ""){
					stringToPass = stringToPass + "IGateout" + stringCount + " eq '" + jsonMoveOutToValidateEntries[i].Serial + "$" + 
					selectedDepotToPassAMOM + "$" + 
					depot + "$" + 
					jsonMoveOutToValidateEntries[i].Release + "$" + 
					jsonMoveOutToValidateEntries[i].Date + "'";
				}
				else{
					stringToPass = stringToPass + " and IGateout" + stringCount + " eq '" + jsonMoveOutToValidateEntries[i].Serial + "$" + 
					selectedDepotToPassAMOM + "$" + 
					depot + "$" + 
					jsonMoveOutToValidateEntries[i].Release + "$" + 
					jsonMoveOutToValidateEntries[i].Date + "'";
				}
				stringCount++;
				}
			
//			if(stringToPass != ""){
//				stringToPass = stringToPass + " and Validate eq '" + validate + "' and Depotin eq '" + depot + "'";
//				
//			}
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallSAMOM = serviceUrlMove + "/moveout_validnSet?$filter=" + stringToPass;
		busyDialog.open();
		console.log(urlToCallSAMOM);
		OData.request({ 
		      requestUri: urlToCallSAMOM,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	//alert("data.results.length : "+data.results.length);
		    	if(data.results.length == 0){
		    		 busyDialog.close();
		    		 sap.ui.commons.MessageBox.alert("Nothing Returned after validation!");
		    	}
		    	else{
		    		busyDialog.close();
		    		var validatedJSON = data.results;
		    		var validatedJSONLength = validatedJSON.length;
		    		var dataTemp = "";
		        	if(validatedJSONLength > 0){// && data.__batchResponses[0].statusText == "OK"){
		        		//jsonReturnEntry = data.__batchResponses[0].data.results[0];
		        		jsonMoveOutToSubmitEntries = [];
		        		for(var i=0; i<validatedJSONLength; i++){
		        			dataTemp = data.results[i].Igateout1.split('$')[4];
		        			if(dataTemp != ""){
		        				dataTemp = dataTemp.substr(6,2) + '-' + dataTemp.substr(4,2) + '-' + dataTemp.substr(0,4);
		        			}
		        			
		        		jsonMoveOutToSubmitEntries.push({
		        				"isChecked": false,
		        				"Status": (data.results[i].Status != "FAIL")? "Success" : "Error",
		        				"Enabled": (data.results[i].Status != "FAIL")? false : true,
		        				"upEnabled": (data.results[i].Status != "FAIL")? true : false,
		        				"Serial":data.results[i].Igateout1.split('$')[0],
		        				"Floc":data.results[i].Igateout1.split('$')[1],
		        				"Depot":data.results[i].Igateout1.split('$')[2],
		        				"Release":data.results[i].Igateout1.split('$')[3],
		        				"Date":dataTemp,
		        				//"Message":data.results[i].Message,
		        				"Message":(data.results[i].Status != "FAIL")? "Success" : data.results[i].Message,
		        			});
		        			
		        		if(enableConfirm && data.results[i].LvOstatus == "FAIL"){
		        			enableConfirm = false;
		        		}
		        		}
		        		
		        		var bus = sap.ui.getCore().getEventBus();
					  	  	bus.publish("nav", "to", {
					        id : "ValidateMoveOutMultipleNew"
				  	  	});
				  	  	
//					  	  var oObjValidateMoveOutMultipleNew = new validateMoveOutMultipleViewNew();
//					  	  oObjValidateMoveOutMultipleNew.updateBindingValidateAMOM();
				  	
		        		var oMdlMoveOutValidation = new sap.ui.model.json.JSONModel();
		        		oMdlMoveOutValidation.setData({modelData : jsonMoveOutToSubmitEntries});
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setModel(oMdlMoveOutValidation);
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setHeaderText("Gate Out Validation - Result");
		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);
		        		sap.ui.getCore().byId("idMoveOutMultStatusTableColDate").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultStatusTableColReturn").setVisible(true);	

		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultButtonRemove").setVisible(true);
		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);	
//			        		sap.ui.getCore().byId("idSalesCollFinalButton").setEnabled(false);
		        		console.log("Above Request : Success");
		        		
			        	}else{
			        		console.log("Above Request : Nothing returned");
			        		outMessage = "Cannot validate, Try again!";
			        		sap.ui.commons.MessageBox.alert(outMessage);
			        	}
		    	}
		    },
		    function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
		
	},
	
	resetAddMoveOutMultipleNew : function(){
		
		loggedInUserTypeAMIM = objLoginUser.getLoggedInUserType();
		if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMIM")){
        	sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMIM").setEnabled(false);
        }
        
        if(loggedInUserTypeAMIM == "SEACO"){
               
               $("#idComboDepotAMOM").val("");
               sap.ui.getCore().byId("idDepotOutputFieldAMOM").setValue("");
               
               if(document.getElementById("idComboDepotAMOM")){
	                document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMOM").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM")){
            	   sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM").setEnabled(false);
               }
        }
        
        if(oExcelGridAddOut != undefined){
        	
    		excelDataAddOut = [
    		       			["","",""],  
    		       			["","",""],  
    		       			["","",""], 
    		       			["","",""], 
    		       			["","",""]
    		       	 		];  
        	
        	oExcelGridAddOut.loadData(excelDataAddOut);
        	
              
        }
        
	},
	
	resetAMOM: function(){
        
        loggedInUserTypeAMOM = objLoginUser.getLoggedInUserType();
        oModelMoveOutMultipleAMOM.setData({modelData: []});
        
        if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM")){
        	sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM").setEnabled(false);
        }
        
        if(loggedInUserTypeAMOM == "SEACO"){
               
               $("#idComboDepotAMOM").val("");
               sap.ui.getCore().byId("idDepotOutputFieldAMOM").setValue("");
               
               if(document.getElementById("idComboDepotAMOM")){
	                document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMOM").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM")){
            	   sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOM").setEnabled(false);
               }
        }
        
        aMoveOutMultipleAMOM = [];
        unitsTankTypeAMOM = [];
        
        aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, retDateVal: "", retDate: dtTodayAMOMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        
        oModelMoveOutMultipleAMOM.setData({modelData: aMoveOutMultipleAMOM});
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOM").setModel(oModelMoveOutMultipleAMOM);
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOM").bindRows("/modelData");
        
        sap.ui.getCore().byId("idTblAdMovInMultiplAMOM").setVisibleRowCount(5);
 }

});