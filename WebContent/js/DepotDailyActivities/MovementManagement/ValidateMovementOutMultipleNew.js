/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var jsonMoveOutSubmittedEntries = [];
sap.ui.model.json.JSONModel.extend("validateMoveOutMultipleViewNew", {
	
	createValidateMoveOutMultiple: function(){
		
		var oCurrent = this;
		
		var bckFrmValidateToAMOM = new sap.m.Link("idBckFrmValidateToAMOM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }}).addStyleClass('marginTop20');; //marginTop20
		
		var oMoveOutMultStatusTable = new sap.m.Table({
			id : "idMoveOutMultStatusTable", // sap.ui.core.ID
			visible : false, // boolean
			inset : true, // boolean
			headerText : "Gate Out Validation - Result", // string
			//headerText : new sap.ui.commons.Label({text: "Gate Out Validation - Result"}).addStyleClass("fontTitle"),
			headerDesign : sap.m.ListHeaderDesign.Standard, // sap.m.ListHeaderDesign, since 1.14
			width : "900px", // sap.ui.core.CSSSize
			includeItemInSelection : false, // boolean
			showUnread : false, // boolean
			noDataText : "No Data", // string
			showNoData : true, // boolean
//			footerText : "You can upload EIR files using column EIR",
			columns: [
			 		 
//			           new sap.m.Column("idMoveOutMultStatusTableColCheckbox", {
//			           //mergeDuplicates : true,
//			           visible: false,
//			           width: "40px",
//			           header: new sap.m.CheckBox({
//			        	   selected : false,
//				           select : [ function(oEvent) {
//								var control = oEvent.getSource();
//								var isSelect = oEvent.getParameter("selected");
//								oCurrent.selectAll(isSelect);
//							}, this ]
//			           		}),
//			           }),    
					   
			           new sap.m.Column("idMoveOutMultStatusTableColSerial", {
			        	   mergeDuplicates : true,
			        	   width: "20%",
				           header: new sap.m.Text({
				           text: "Serial"
				           }).addStyleClass("wraptextcol")
				        }),
				        
					        
			           new sap.m.Column("idMoveOutMultStatusTableColDate", {
			        	   width: "20%",
				           header: new sap.m.Text({
				           text: "Date"
				           }).addStyleClass("wraptextcol")
				        }),
			               
				        
				        new sap.m.Column("idMoveOutMultStatusTableColReturn", {
				        	   width: "20%",
					           header: new sap.m.Text({
					           text: "Release Ref."
					           }).addStyleClass("wraptextcol")
					     }),
							
				           new sap.m.Column("idMoveOutMultStatusTableColStatus", {
				        	   width: "40%",
					           header: new sap.m.Text({
					           text: "Status"
					           }).addStyleClass("wraptextcol")
					           }),
		           			 
			   ],
			  items : {
		      path: '/modelData',
		      template: new sap.m.ColumnListItem({
		      selected: false,
		      //type: "Active",
		      cells: [
//               new sap.m.CheckBox({
//                 selected: "{isChecked}",
//                 enabled: "{isCheckEnabled}"
//                     }),
                
                /* new sap.m.Link({
                	 enabled: "{Enabled}",
	                 text: "{Status}",
	                 press: function(oEvent){
	                	 var message = oEvent.getSource().getBindingContext().getProperty("Message");
	                	 sap.ui.commons.MessageBox.alert(message);
	                 }
	             }), */
		 
                new sap.m.Text({
                 text: "{Serial}"
                     }),
		 
		 
                new sap.m.Text({
	                 text: "{Date}"
	                 }), 
			                 
			              
	              new sap.m.Text({
	                 text: "{Release}"
		          }), 
		          
		          new sap.m.Text({
		                 text: "{Message}"
			          })
				]
		        })
		          }}).addStyleClass('sapUiSizeCompact marginLeft'); 
	   	
//	   	var oMoveOutMultStatusTableFooter = new sap.m.Label({
//	   		text : "You can upload EIR files using column EIR";
//	   			visible:false,
//	   	}).addStyleClass('floatRight marginTop20 redelReference');
	   	
	   	var oMoveOutMultButtonConfirm = new sap.m.Button("idMoveOutMultButtonConfirm",{
			  text : "Submit",
			  //width:"100px",
			  visible: false,
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				oCurrent.sendToSapForSubmissionNew();
		}}).addStyleClass("submitBtn marginLeft marginTop20");
	   	
	   	var oMoveOutMultButtonRemove = new sap.m.Button("idMoveOutMultButtonRemove",{
			  text : "Remove Errors",
			  //width:"100px",
			  visible: false,
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				oCurrent.removeErrorEntries();
		}}).addStyleClass("submitBtn marginLeft30 marginTop20");
	   	
	   	
	   	var oFlexMoveOutMultButtons = new sap.m.FlexBox({
	           items: [
	                   	oMoveOutMultButtonConfirm,
	                   	oMoveOutMultButtonRemove
	                   	//oMoveOutMultStatusTableFooter
	           ],
	           direction : "Row",
		});//.addStyleClass('marginLeft marginTop72');
	   	
	   	var oFlexMoveOutMultSecond = new sap.m.FlexBox({
	           items: [ bckFrmValidateToAMOM,
//	                    new sap.ui.commons.Label({text: "Gate In Submission",
//						wrapping: true}).addStyleClass("marginTop7 marginLeft fontTitle"),
	                   	oMoveOutMultStatusTable,
	                   	oFlexMoveOutMultButtons
	                   	//oMoveOutMultStatusTableFooter
	           ],
	           direction : "Column",
				}).addStyleClass('marginLeft marginTop72');
	   	
	  return oFlexMoveOutMultSecond;

	},
	
	validateDataAMOM: function(){
		busyDialog.open();
		
		aSubmitInMultipleSMIM = [];
		
		var currDateAMOM = new Date();
		var currYearAMOM = currDateAMOM.getFullYear();
		var currMonthAMOM = currDateAMOM.getMonth()+1;
		var currDayAMOM = currDateAMOM.getDate();
		
		var incorrectSerNoFlagAMOM = true;
		var incorrectDateFlagAMOM = true;
		var incorrectSerNoDateFlagAMOM = true;
		
		for(var i=0;i<aMoveOutMultipleAMOM.length; i++){
			
			 var splitDateAMOM = "";
			 var selYearAMOM = "";
			 var selMonthAMOM = "";
			 var selDayAMOM = "";
			
			 incorrectSerNoFlagAMOM = true;
			 incorrectDateFlagAMOM = true;
			 incorrectSerNoDateFlagAMOM = true;
			 
			 var retDateAMOM = aMoveOutMultipleAMOM[i].retDateVal;
		        
			 var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
			    var dtArray = retDateAMOM.match(rxDatePattern);
				
			    if (dtArray == null){
			    	incorrectDateFlagAMOM = false;
			    }
			    else{
			    	 splitDateAMOM = retDateAMOM.split("-");
					
					 selYearAMOM = splitDateAMOM[2];
					 selMonthAMOM = splitDateAMOM[1];
					 selDayAMOM = splitDateAMOM[0];
			    }
			
			if(aMoveOutMultipleAMOM[i].serialNo.trim().length >0 && aMoveOutMultipleAMOM[i].serialNo.trim().length != 11){
				incorrectSerNoFlagAMOM = false;
				}
			if(selMonthAMOM == 2){
				var isleap = (selYearAMOM % 4 == 0 && (selYearAMOM % 100 != 0 || selYearAMOM % 400 == 0));
			     if (selDayAMOM> 29 || (selDayAMOM ==29 && !isleap)){
				    	 incorrectDateFlagAMOM = false;
				     }
			}
			if((dtArray == null) && (aMoveOutMultipleAMOM[i].serialNo.length >0 && aMoveOutMultipleAMOM[i].serialNo.length != 11)){
				incorrectSerNoDateFlagAMOM = false;
			}
			if((aMoveOutMultipleAMOM[i].serialNo.length >0 && aMoveOutMultipleAMOM[i].serialNo.length != 11) && (selMonthAMOM == 2)){
				var isleap = (selYearAMOM % 4 == 0 && (selYearAMOM % 100 != 0 || selYearAMOM % 400 == 0));
			     if (selDayAMOM> 29 || (selDayAMOM ==29 && !isleap)){
			    	 incorrectSerNoDateFlagAMOM = false;
			     }
			}
			
			if(incorrectSerNoDateFlagAMOM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveOutMultipleAMOM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveOutMultipleAMOM[i].retDateVal,
					"auth": aMoveOutMultipleAMOM[i].auth,
					"statusA": aMoveOutMultipleAMOM[i].statusA,
					"tankDet": aMoveOutMultipleAMOM[i].tankDetails,
					"warningError": "Incorrect Serial Number and Date",
					"statusAVal": "",
					"unoNo": aMoveOutMultipleAMOM[i].unNo,
					"lastClnDate": aMoveOutMultipleAMOM[i].lastClnDate,
					"lastCargoDesc": aMoveOutMultipleAMOM[i].lastCargoDesc,
					"clnProcDesc": aMoveOutMultipleAMOM[i].clnProcDesc
				});
			}
			else if(incorrectDateFlagAMOM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveOutMultipleAMOM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveOutMultipleAMOM[i].retDateVal,
					"auth": aMoveOutMultipleAMOM[i].auth,
					"statusA": aMoveOutMultipleAMOM[i].statusA,
					"tankDet": aMoveOutMultipleAMOM[i].tankDetails,
					"warningError": "Incorrect Date",
					"statusAVal": "",
					"unoNo": aMoveOutMultipleAMOM[i].unNo,
					"lastClnDate": aMoveOutMultipleAMOM[i].lastClnDate,
					"lastCargoDesc": aMoveOutMultipleAMOM[i].lastCargoDesc,
					"clnProcDesc": aMoveOutMultipleAMOM[i].clnProcDesc
				});
			}
			else if(incorrectSerNoFlagAMOM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveOutMultipleAMOM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveOutMultipleAMOM[i].retDateVal,
					"auth": aMoveOutMultipleAMOM[i].auth,
					"statusA": aMoveOutMultipleAMOM[i].statusA,
					"tankDet": aMoveOutMultipleAMOM[i].tankDetails,
					"warningError": "Incorrect Serial Number",
					"statusAVal": "",
					"unoNo": aMoveOutMultipleAMOM[i].unNo,
					"lastClnDate": aMoveOutMultipleAMOM[i].lastClnDate,
					"lastCargoDesc": aMoveOutMultipleAMOM[i].lastCargoDesc,
					"clnProcDesc": aMoveOutMultipleAMOM[i].clnProcDesc
				});
			}
				else{
					aSubmitInMultipleSMIM.push({
						"checked": false,
						"status": "images/green_signal.png",
						"serialNo": aMoveOutMultipleAMOM[i].serialNo.trim().toUpperCase(),
						"retDate": aMoveOutMultipleAMOM[i].retDateVal,
						"auth": aMoveOutMultipleAMOM[i].auth,
						"statusA": aMoveOutMultipleAMOM[i].statusA,
						"tankDet": aMoveOutMultipleAMOM[i].tankDetails,
						"warningError": "",
						"statusAVal": "",
						"unoNo": aMoveOutMultipleAMOM[i].unNo,
						"lastClnDate": aMoveOutMultipleAMOM[i].lastClnDate,
						"lastCargoDesc": aMoveOutMultipleAMOM[i].lastCargoDesc,
						"clnProcDesc": aMoveOutMultipleAMOM[i].clnProcDesc
					});
				}
				}
		
		busyDialog.close();
		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "SubmitMoveOutMultiple"
	  	});
  	  	
  	  var oObjSubmitMovemntInMultiple = new submitMovemntInMultipleView();
  	oObjSubmitMovemntInMultiple.updateBindingSubmitValidationAMOM();
  	oObjSubmitMovemntInMultiple.enableSubmitBtnSAMOM();
	},
	
	updateBindingValidateAMOM: function(){
    	var oModelValidateInMultiple = new sap.ui.model.json.JSONModel();
    	oModelValidateInMultiple.setData({modelData: aMoveOutMultipleAMOM});
    	sap.ui.getCore().byId("idTblValidateTDAMOM").setModel(oModelValidateInMultiple);
    	sap.ui.getCore().byId("idTblValidateTDAMOM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTblValidateTDAMOM").setVisibleRowCount(aMoveOutMultipleAMOM.length);
	
    	sap.ui.getCore().byId("idDepotDisplayAMOMVDTD").setText(selectedDepotToPassAMOM);
	},
	
	removeSelectedEntries : function(){
		var jsonMoveOutToSubmitEntriesNew = [];
		var enableConfirm = true;
		for(var i = 0; i<jsonMoveOutToSubmitEntries.length; i++){
			if(jsonMoveOutToSubmitEntries[i].isChecked == false){
				if(jsonMoveOutToSubmitEntries[i].Status != "Success"){
						enableConfirm = false;		
				}
				jsonMoveOutToSubmitEntriesNew.push(jsonMoveOutToSubmitEntries[i]);
			}
		}
		jsonMoveOutToSubmitEntries = [];
		jsonMoveOutToSubmitEntries = jsonMoveOutToSubmitEntriesNew;
		var oMoveOutMultStatusTableModel = new sap.ui.model.json.JSONModel();
		oMoveOutMultStatusTableModel.setData({modelData : jsonMoveOutToSubmitEntries});
		sap.ui.getCore().byId("idMoveOutMultStatusTable").setModel(oMoveOutMultStatusTableModel);
		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);
	},
	
	removeErrorEntries : function(){
		var jsonMoveOutToSubmitEntriesNew = [];
		var enableConfirm = true;
		for(var i = 0; i<jsonMoveOutToSubmitEntries.length; i++){
			if(jsonMoveOutToSubmitEntries[i].Status != "Error"){
				jsonMoveOutToSubmitEntriesNew.push(jsonMoveOutToSubmitEntries[i]);
			}
		}
		jsonMoveOutToSubmitEntries = [];
		jsonMoveOutToSubmitEntries = jsonMoveOutToSubmitEntriesNew;
		var oMoveOutMultStatusTableModel = new sap.ui.model.json.JSONModel();
		oMoveOutMultStatusTableModel.setData({modelData : jsonMoveOutToSubmitEntries});
		sap.ui.getCore().byId("idMoveOutMultStatusTable").setModel(oMoveOutMultStatusTableModel);
		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(true);
	},
	
	sendToSapForSubmissionNew : function(){
		
		var newDate = null;
		var enableConfirm = true;
		jsonSubmittedEntries = [];
		var jsonMoveOutToSubmitEntriesLength = jsonMoveOutToSubmitEntries.length;
		var validate = " ";
		var depot = selectedDepotToPassCodeAMOM;
		var stringToPass = "";
		var stringCount = 1;
		var dateTemp = "";
		
		if(jsonMoveOutToSubmitEntriesLength == 0)
			sap.ui.commons.MessageBox.alert("No data to submit");
		else{
			for(var i =0; i < jsonMoveOutToSubmitEntriesLength; i++){
				dateTemp = jsonMoveOutToSubmitEntries[i].Date;
				dateTemp = dateTemp.substr(6,4) + dateTemp.substr(3,2) + dateTemp.substr(0,2);
				if(stringToPass == ""){
					stringToPass = stringToPass + "IGateout" + stringCount + " eq '" + jsonMoveOutToSubmitEntries[i].Serial + "$" + 
					selectedDepotToPassAMOM + "$" + 
					depot + "$" + 
					jsonMoveOutToSubmitEntries[i].Release + "$" + 
					dateTemp + "'";
				}
				else{
					stringToPass = stringToPass + " and IGateout" + stringCount + " eq '" + jsonMoveOutToSubmitEntries[i].Serial + "$" + 
					selectedDepotToPassAMOM + "$" + 
					depot + "$" + 
					jsonMoveOutToSubmitEntries[i].Release + "$" + 
					dateTemp + "'";
				}
				stringCount++;
				}
			
			//stringToPass = stringToPass + " and Submit eq 'X'";
		}

		
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallSAMOM = serviceUrlMove + "/moveout_submitnSet?$filter=" + stringToPass;
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
		    		 sap.ui.commons.MessageBox.alert("Nothing Returned after Submission!");
		    	}
		    	else{
		    		busyDialog.close();
		    		var submittedJSON = data.results;
		    		var submittedJSONLength = submittedJSON.length;
		        	if(submittedJSONLength > 0){// && data.__batchResponses[0].statusText == "OK"){
		        		//jsonReturnEntry = data.__batchResponses[0].data.results[0];
		        		jsonMoveOutSubmittedEntries = [];
		        		for(var i=0; i<submittedJSONLength; i++){		     				
		        			jsonMoveOutSubmittedEntries.push({
		        				"isChecked": false,
		        				"Status": (data.results[i].Status != "FAIL")? "Success" : "Error",
		        				"Enabled": (data.results[i].Status != "FAIL")? false : true,
		        				"upEnabled": (data.results[i].Status != "FAIL")? true : false,
		        				"Serial":data.results[i].Igateout1.split('$')[0],
		        				"Floc":data.results[i].Igateout1.split('$')[1],
		        				"Depot":data.results[i].Igateout1.split('$')[2],
		        				"Release":data.results[i].Igateout1.split('$')[3],
		        				"Date":data.results[i].Igateout1.split('$')[4],
		        				"Message":data.results[i].Message,
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
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setHeaderText("Gate Out Submission - Result");
		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);
		        		sap.ui.getCore().byId("idMoveOutMultStatusTableColDate").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultStatusTableColReturn").setVisible(true);	

		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setVisible(false);	
		        		sap.ui.getCore().byId("idMoveOutMultButtonRemove").setVisible(false);
		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);	
//			        		sap.ui.getCore().byId("idSalesCollFinalButton").setEnabled(false);
		        		console.log("Above Request : Success");
		        		
			        	}else{
			        		console.log("Above Request : Nothing returned");
			        		outMessage = "Cannot Submit, Try again!";
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
	
});
		