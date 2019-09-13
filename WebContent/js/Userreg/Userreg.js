/**/

jQuery.sap.require("sap.ui.model.odata.datajs");
var csrftokenGlobal = "";
var aGlobalDepotNames = [];
var aChngPswd;
var oUserName;
var oPassword;
var oNPassword;
var oCPassword;
var oPassChangeDialog;

var globalUserregTxnno = "";
var userCreationData = [];

// Customer Contact Email
var customerEmailVal = {
  key: [],
  description: []
};

// Customer Contact Location
var customerLocationVal = {
  key: [],
  description: []
};

sap.ui.model.json.JSONModel.extend("Userreg", {
  createUSERREGPage: function(oController) {
    var oCurrent = this;

    var backUSERREG = new sap.m.Link({
      text: " < Back",
      width: "7%",
      wrapping: true,
      press: function() {
        var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "back");
        $("#idHdrContnt").html("User Requests");
      }
    });

    // Label for User Type

    var oUserregLabelUserType = new sap.ui.commons.Label({
      text: "User Type",
      wrapping: false,
      required: true,
      layoutData: new sap.ui.layout.GridData({
        span: "L2 M3 S4",
        linebreak: false,
        margin: false
      })
    }).addStyleClass("marginTop15");

    // Initializing Drop Down Box

    var oUserregComboUserType = new sap.ui.commons.DropdownBox(
      "idUserregComboUserType",
      {
        layoutData: new sap.ui.layout.GridData({
          span: "L2 M3 S4",
          linebreak: false,
          margin: false
        }),
        change: function(oEvent) {
          this.setValueState(sap.ui.core.ValueState.None);
          this.setPlaceholder("Select User Type");
          var oComboLocation = sap.ui.getCore().byId("idUserregComboLocation");
          oComboLocation.destroyItems();
          var selUserType = oEvent.mParameters.selectedItem.sId;
          if (oEvent.mParameters.newValue != "")
            oCurrent.refineSeacoContactLocation(selUserType);

          var oUserregPanelResult = sap.ui
            .getCore()
            .byId("idUserregPanelResult");
          oUserregPanelResult.setVisible(false);

          var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
          oUserregPanelRoles.setVisible(false);

          // Clear values...

          sap.ui
            .getCore()
            .byId("idUserregComboUserType")
            .removeStyleClass("redBackgrond redBorder");
          oUserregComboLocation.removeStyleClass("redBackgrond redBorder");
          if (oUserregComboSMail) {
            oUserregComboSMail.removeStyleClass("redBackgrond redBorder");
          }

          oUserregComboLocation.setPlaceholder("Seaco Contact Location");
          if (oUserregComboSMail) {
            oUserregComboSMail.setPlaceholder("Seaco Contact E-Mail");
          }

          var oUserregComboSMail = sap.ui.getCore().byId("idUserregComboSMail");
          oUserregComboSMail.destroyItems();

          var oUserregHDivider1 = sap.ui.getCore().byId("idUserregHDivider1");
          var oUserregHDivider = sap.ui.getCore().byId("idUserregHDivider");
          var oUserregForm = sap.ui.getCore().byId("idUserregForm");
          var oUserregButton = sap.ui.getCore().byId("idUserregButton");

          if (oEvent.mParameters.selectedItem.sId == "CUS") {
            oUserregHDivider1.setVisible(true);
            oUserregHDivider.setVisible(true);
            oUserregForm.setVisible(true);
            oUserregButton.setVisible(true);
            oUserregLabelLocation.setVisible(true);
            oUserregLabelSMail.setVisible(true);
            oUserregComboLocation.setVisible(true);
            oUserregComboSMail.setVisible(true);
            oUserregComboLocation.setRequired(true);
          } else if (oEvent.mParameters.selectedItem.sId == "DEP") {
            oUserregHDivider1.setVisible(true);
            oUserregHDivider.setVisible(true);
            oUserregForm.setVisible(true);
            oUserregButton.setVisible(true);
            oUserregLabelLocation.setVisible(true);
            oUserregLabelSMail.setVisible(false);
            oUserregComboLocation.setVisible(true);
            oUserregComboSMail.setVisible(false);
            oUserregComboLocation.setRequired(false);
          } else if (oEvent.mParameters.selectedItem.sId == "FAC") {
            oUserregHDivider1.setVisible(true);
            oUserregHDivider.setVisible(true);
            oUserregForm.setVisible(true);
            oUserregButton.setVisible(true);
            oUserregLabelLocation.setVisible(false);
            oUserregLabelSMail.setVisible(false);
            oUserregComboLocation.setVisible(false);
            oUserregComboSMail.setVisible(false);
            oUserregComboLocation.setRequired(false);
          } else if (oEvent.mParameters.selectedItem.sId == "BUY") {
            oUserregHDivider1.setVisible(true);
            oUserregHDivider.setVisible(true);
            oUserregForm.setVisible(true);
            oUserregButton.setVisible(true);
            oUserregLabelLocation.setVisible(true);
            oUserregLabelSMail.setVisible(true);
            oUserregComboLocation.setVisible(true);
            oUserregComboSMail.setVisible(true);
            oUserregComboLocation.setRequired(true);
          } else if (oEvent.mParameters.selectedItem.sId == "SUR") {
            oUserregHDivider1.setVisible(true);
            oUserregHDivider.setVisible(true);
            oUserregForm.setVisible(true);
            oUserregButton.setVisible(true);
            oUserregLabelLocation.setVisible(false);
            oUserregLabelSMail.setVisible(false);
            oUserregComboLocation.setVisible(false);
            oUserregComboSMail.setVisible(false);
            oUserregComboLocation.setRequired(false);
          }
        },
        displaySecondaryValues: false,
        placeholder: "Select User Type"
      }
    ).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    var userregUserTypeVal = [];

    userregUserTypeVal.push({
		key : "",
		description : ""
	});
	userregUserTypeVal.push({
		key : "BUY",
		description : "Buyer"
	});
userregUserTypeVal.push({
		key : "CUS",
		description : "Customer"
	});
userregUserTypeVal.push({
		key : "DEP",
		description : "Depot User"
	});
userregUserTypeVal.push({
		key : "FAC",
		description : "Factory User"
	});
userregUserTypeVal.push({
		key : "SUR",
		description : "Surveyor"
	});

    var oUSERREGModelUsertype = new sap.ui.model.json.JSONModel();
    oUSERREGModelUsertype.setSizeLimit(99999);
    oUSERREGModelUsertype.setData({data:userregUserTypeVal});

    var oUSERREGInputUsertype = new sap.ui.getCore().byId("idUserregComboUserType");
    oUSERREGInputUsertype.setModel(oUSERREGModelUsertype);
    oUSERREGInputUsertype.setSelectedKey(userregUserTypeVal[0].key);
    oUSERREGInputUsertype.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));


    // Label for Seaco Contact Location

    var oUserregLabelLocation = new sap.ui.commons.Label({
      text: "Seaco Contact Location",
      wrapping: true,
      //required: true,
      layoutData: new sap.ui.layout.GridData({
        span: "L2 M3 S4",
        linebreak: true,
        margin: false
      })
    }).addStyleClass("marginTop15");

    // Drop Down Box for Seaco Contact Location

    var oUserregComboLocation = new sap.ui.commons.DropdownBox(
      "idUserregComboLocation",
      {
        layoutData: new sap.ui.layout.GridData({
          span: "L2 M3 S4",
          linebreak: false,
          margin: false
        }),
        change: function(oEvent) {
          var oUserregPanelResult = sap.ui
            .getCore()
            .byId("idUserregPanelResult");

          oUserregPanelResult.setVisible(false);

          var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
          oUserregPanelRoles.setVisible(false);

          this.setValueState(sap.ui.core.ValueState.None);
          this.setPlaceholder("Seaco Contact Location");
          this.removeStyleClass("redBackgrond redBorder");
          var oLabelSMail = sap.ui.getCore().byId("idUserregLabelSMail");
          var oComboSMail = sap.ui.getCore().byId("idUserregComboSMail");
          oComboSMail.destroyItems();
          var selLocation = oEvent.mParameters.selectedItem.sId;
          var selUserType = sap.ui.getCore().byId("idUserregComboUserType").getSelectedKey();
          oCurrent.refineSeacoContactEmail(
            selUserType,
            selLocation,
            oLabelSMail,
            oComboSMail
          );
        },
        displaySecondaryValues: false,
        placeholder: "Seaco Contact Location"
      }
    ).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    // Label for Seaco Email

    var oUserregLabelSMail = new sap.ui.commons.Label("idUserregLabelSMail", {
      text: "Seaco Contact E-Mail",
      wrapping: true,
      //required: true,
      visible: false,
      layoutData: new sap.ui.layout.GridData({
        span: "L2 M3 S4",
        linebreak: true,
        margin: false
      })
    }).addStyleClass("marginTop15");

    // Drop Down Box for Seaco Contact Email

    var oUserregComboSMail = new sap.ui.commons.DropdownBox(
      "idUserregComboSMail",
      {
        layoutData: new sap.ui.layout.GridData({
          span: "L2 M3 S4",
          linebreak: false,
          margin: false
        }),
        visible: false,
        change: function() {
          var oUserregPanelResult = sap.ui
            .getCore()
            .byId("idUserregPanelResult");
          oUserregPanelResult.setVisible(false);

          var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
          oUserregPanelRoles.setVisible(false);

          this.setValueState(sap.ui.core.ValueState.None);
          this.setPlaceholder("Seaco Contact E-Mail");
        },
        displaySecondaryValues: false,
        placeholder: "Seaco Contact E-Mail"
      }
    ).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    // Label for Outstanding

    var oUserregLabelOutstanding = new sap.ui.commons.Label(
      "idUserregLabelOutstanding",
      {
        text: "Only Outstanding",
        wrapping: true,
        required: true,
        visible: false,
        layoutData: new sap.ui.layout.GridData({
          span: "L2 M3 S4",
          linebreak: true,
          margin: false
        })
      }
    ).addStyleClass("marginTop15");

    // Drop Down Box for Seaco Contact Email

    var oUserregCheckBoxOutstanding = new sap.ui.commons.CheckBox(
      "idUserregCheckBoxOutstanding",
      {
        visible: false
      }
    ).addStyleClass("FormInputStyle marginTop10");

    // ************* Buttons Start*************** //
    // Get Requests

    var oUserregBtnGetRequests = new sap.m.Button("idUserregBtnGetRequests", {
      text: "Get Requests", // Changes from Add To Returns to submit MAC26092014+
      styled: false,
      width: "120px",
      layoutData: new sap.ui.layout.GridData({
        span: "L3 M3 S3",
        linebreak: false,
        margin: true
      }),
      press: function() {
        busyDialog.open();
        oCurrent.getOutstandingRequests();
      }
    }).addStyleClass("submitBtn");
    // Space legend

    var oUserregLabelSpace = new sap.ui.commons.Label({
      text: " ",
      width: "8px"
    });

    // View Requests

    var oUserregBtnViewRequests = new sap.m.Button("idUserregBtnViewRequests", {
      text: "View Requests", // Changes from Add To Returns to submit MAC26092014+
      styled: false,
      width: "120px",
      layoutData: new sap.ui.layout.GridData({
        span: "L3 M3 S3",
        linebreak: false,
        margin: true
      }),
      press: function() {
        busyDialog.open();
        oCurrent.getOutstandingRequests();
      }
    }).addStyleClass("submitBtn");
    // Space legend

    var oUserregLabelSpace1 = new sap.ui.commons.Label({
      text: " ",
      width: "8px"
    });

    // Reset

    var oUserregBtnReset = new sap.m.Button("idUserregBtnReset", {
      text: "Reset", // Changes from Add To Returns to submit MAC26092014+
      styled: false,
      width: "120px",
      layoutData: new sap.ui.layout.GridData({
        span: "L3 M3 S3",
        linebreak: false,
        margin: true
      }),
      press: function() {
        oCurrent.resetForm();
      }
    }).addStyleClass("submitBtn");

    // Flex Box for Buttons

    var oUserregFlexButtons = new sap.m.FlexBox({
      items: [
        oUserregBtnGetRequests,
        oUserregLabelSpace,
        oUserregBtnViewRequests,
        oUserregLabelSpace1,
        oUserregBtnReset
      ],
      direction: "Row"
      //justifyContent : sap.m.FlexJustifyContent.Center
      //layoutData: new sap.ui.layout.GridData({span: "L8 M8 S4",linebreak: false, margin: false})
    });

    // Layout for buttons

    var oUserregButtonLayout = new sap.ui.layout.form.ResponsiveGridLayout({
      id: "idUserregButtonLayout", // sap.ui.core.ID
      labelSpanL: 4, // int, since 1.16.3
      labelSpanM: 2, // int, since 1.16.3
      labelSpanS: 12, // int, since 1.16.3
      emptySpanL: 0, // int, since 1.16.3
      emptySpanM: 0, // int, since 1.16.3
      emptySpanS: 0, // int, since 1.16.3
      columnsL: 1, // int, since 1.16.3
      columnsM: 1 // int, since 1.16.3
      //breakpointL : 1024, // int, since 1.16.3
      //breakpointM : 600, // int, since 1.16.3
      //ooltip : "User Type", // sap.ui.core.TooltipBase
    });

    var oUserregButton = new sap.ui.layout.form.Form("idUserregButton", {
      layout: oUserregButtonLayout,
      visible: false,
      formContainers: [
        new sap.ui.layout.form.FormContainer("idUserregButtonC1", {
          //title: "User Type",
          formElements: [
            new sap.ui.layout.form.FormElement({
              //fields: [oFlexBoxRegion]
              fields: [oUserregFlexButtons]
            })
          ]
        })
      ]
    });

    // Responsive Grid Layout

    var oUserregUserTypeLayout = new sap.ui.layout.form.ResponsiveGridLayout({
      id: "idUserregUserTypeLayout", // sap.ui.core.ID
      labelSpanL: 4, // int, since 1.16.3
      labelSpanM: 2, // int, since 1.16.3
      labelSpanS: 12, // int, since 1.16.3
      emptySpanL: 0, // int, since 1.16.3
      emptySpanM: 0, // int, since 1.16.3
      emptySpanS: 0, // int, since 1.16.3
      columnsL: 1, // int, since 1.16.3
      columnsM: 1, // int, since 1.16.3
      //breakpointL : 1024, // int, since 1.16.3
      //breakpointM : 600, // int, since 1.16.3
      tooltip: "User Type" // sap.ui.core.TooltipBase
    });

    var oUserregUserType = new sap.ui.layout.form.Form("idUserregUserType", {
      layout: oUserregUserTypeLayout,
      formContainers: [
        new sap.ui.layout.form.FormContainer("idUserregUserTypeC1", {
          formElements: [
            new sap.ui.layout.form.FormElement({
              //fields: [oFlexBoxRegion]
              fields: [oUserregLabelUserType, oUserregComboUserType]
            })
          ]
        })
      ]
    });

    var oUserregFormLayout = new sap.ui.layout.form.ResponsiveGridLayout(
      "idUserregFormLayout",
      {
        /* labelSpanL: 3,
				labelSpanM: 3,
				labelSpanS: 6,
				emptySpanL: 0,
				emptySpanM: 0,
				emptySpanS: 0,
				columnsL: 2,
				columnsM: 2,
				columnsS: 1,
				breakpointL: 1100,
		breakpointM: 700*/
      }
    );

    // Online Form Starts
    var oUserregForm = new sap.ui.layout.form.Form("idUserregForm", {
      layout: oUserregFormLayout,
      visible: false,
      formContainers: [
        new sap.ui.layout.form.FormContainer("idUserregFormC1", {
          title: "User Request Form",
          formElements: [
            new sap.ui.layout.form.FormElement({
              fields: [oUserregLabelLocation, oUserregComboLocation]
            }),
            new sap.ui.layout.form.FormElement({
              fields: [oUserregLabelSMail, oUserregComboSMail]
            }),
            new sap.ui.layout.form.FormElement({
              fields: [oUserregLabelOutstanding, oUserregCheckBoxOutstanding]
            })
          ]
        })
      ]
    });

    // Horizontal Line
    var vUserregHDivider = new sap.ui.commons.HorizontalDivider({
      id: "idUserregHDivider",
      width: "95%",
      type: "Area",
      height: "Medium",
      visible: false
    });
    var vHUserregHDivider1 = new sap.ui.commons.HorizontalDivider({
      id: "idUserregHDivider1",
      width: "95%",
      type: "Area",
      height: "Medium",
      visible: false
    });

    var vHUserregHDivider2 = new sap.ui.commons.HorizontalDivider({
      id: "idUserregHDivider2",
      width: "95%",
      type: "Area",
      height: "Medium",
      visible: false
    });

    var oUserregTableResult = new sap.ui.table.Table("idUserregTableResult", {
      visibleRowCount: 10,
      firstVisibleRow: 3,
      fixedColumnCount: 1,
      columnHeaderHeight: 48,
      enableColumnReordering: false,
      width: "98%",
      selectionMode: sap.ui.table.SelectionMode.None,
      visible: false
    }).addStyleClass("tblBorder1");

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({ text: "Ticket No." }).addStyleClass(
          "wraptextcol"
        ),
        template: new sap.ui.commons.Link({
          press: function(oEvent) {
            busyDialog.open();

            globalUserregTxnno = oEvent
              .getSource()
              .getBindingContext()
              .getProperty("Txnno");

            /* USERREG - Roles - Set Value */

            oCurrent.setValueRoles();

            busyDialog.close();
          }
        }).bindProperty("text", "Txnno"),
        resizable: false,
        width: "80px",
        sortProperty: "Txnno",
        filterProperty: "Txnno",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "First Name"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Fname"),
        resizable: false,
        width: "100px",
        sortProperty: "Fname",
        filterProperty: "Fname",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Last Name"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Lname"),
        resizable: false,
        width: "100px",
        sortProperty: "Lname",
        filterProperty: "Lname",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Email"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Email"),
        resizable: false,
        width: "180px",
        sortProperty: "Email",
        filterProperty: "Email",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Company Name"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Cname"),
        resizable: false,
        width: "100px",
        sortProperty: "Cname",
        filterProperty: "Cname",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Address 1"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Add1"),
        resizable: false,
        width: "170px",
        sortProperty: "Add1",
        filterProperty: "Add1",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Address 2"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Add2"),
        resizable: false,
        width: "170px",
        sortProperty: "Add2",
        filterProperty: "Add2",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Address 3"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Add3"),
        resizable: false,
        width: "170px",
        sortProperty: "Add3",
        filterProperty: "Add3",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "City"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "City"),
        resizable: false,
        width: "100px",
        sortProperty: "City",
        filterProperty: "City",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Country"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Ctry"),
        resizable: false,
        width: "100px",
        sortProperty: "Ctry",
        filterProperty: "Ctry",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Postal Code"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Pcode"),
        resizable: false,
        width: "80px",
        sortProperty: "Pcode",
        filterProperty: "Pcode",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Phone"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Phone"),
        resizable: false,
        width: "100px",
        sortProperty: "Phone",
        filterProperty: "Phone",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        visible: false,
        label: new sap.ui.commons.Label({
          text: "Location"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Locat"),
        resizable: false,
        width: "120px",
        sortProperty: "Locat",
        filterProperty: "Locat",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        visible: false,
        label: new sap.ui.commons.Label({
          text: "CS Mail"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty(
          "text",
          "Csmail"
        ),
        resizable: false,
        width: "120px",
        sortProperty: "Csmail",
        filterProperty: "Csmail",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        visible: false,
        label: new sap.ui.commons.Label({
          text: "User Type"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty("text", "Utype"),
        resizable: false,
        width: "120px",
        sortProperty: "Utype",
        filterProperty: "Utype",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    oUserregTableResult.addColumn(
      new sap.ui.table.Column({
        visible: false,
        label: new sap.ui.commons.Label({
          text: "Status"
        }).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({}).bindProperty(
          "text",
          "Status"
        ),
        resizable: false,
        width: "80px",
        sortProperty: "Status",
        filterProperty: "Status",
        flexible: true
        //autoResizable: true,
        //width : 'auto'
      })
    );

    /* USERREG - Panel - Result */

    var oUserregPanelResult = new sap.m.Panel("idUserregPanelResult", {
      busy: false, // boolean
      busyIndicatorDelay: 1000, // int
      visible: false, // boolean
      headerText: "Tickets", // string
      width: "100%",
      height: "auto", // sap.ui.core.CSSSize
      expandable: true, // boolean, since 1.22
      expanded: false, // boolean, since 1.22
      expandAnimation: true, // boolean, since 1.26
      //tooltip : "Filters", // sap.ui.core.TooltipBase
      content: [oUserregTableResult] // sap.ui.core.Control
    });

    if (sap.ui.getCore().byId("idUserregTableMenu"))
      sap.ui
        .getCore()
        .byId("idUserregTableMenu")
        .destroy();

    var oUserregTableMenu = new sap.ui.table.TreeTable("idUserregTableMenu", {
      columns: [
        new sap.ui.table.Column({
          label: "Menu",
          template: "menu"
        }),
        new sap.ui.table.Column({
          label: "",
          template: new sap.ui.commons.CheckBox()
            .bindProperty("checked", "checked")
            .bindProperty("visible", "checkboxvisible")
        })
        // new sap.ui.table.Column({
        //   label: "Description",
        //   template: "description"
        // })
      ],
      selectionMode: sap.ui.table.SelectionMode.Single,
      enableColumnReordering: false,
      expandFirstLevel: true,
      //			useGroupMode:true,
      //			groupHeaderProperty:"HELLo",
      //			collapseRecursive :false,
      //			rootLevel :2,
      toggleOpenState: function(oEvent) {}
    });

    /* USERREG - Table - Account Numbers */

    var oUSERREGTableAccountNumbers = new sap.ui.table.Table(
      "idUSERREGTableAccountNumbers",
      {
        visibleRowCount: 5,
        columnHeaderVisible: false,
        width: "98%",
        selectionMode: sap.ui.table.SelectionMode.None,
        title: "Account Numbers(If multiple, separate by commas)"
      }
    ).addStyleClass("sapUiSizeCompact tblBorder1");

    oUSERREGTableAccountNumbers.addColumn(
      new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
        template: new sap.ui.commons.TextView({
          textAlign: "Left"
        })
          .bindProperty("text", "label1")
          .addStyleClass("borderStyle1 boldText"),
        resizable: false,
        width: "120px"
      })
    );

    oUSERREGTableAccountNumbers.addColumn(
      new sap.ui.table.Column({
        template: new sap.ui.commons.TextField({
          textAlign: "Left"
        })
          .bindProperty("value", "value1")
          .addStyleClass("borderStyle"),
        resizable: false,
        width: "350px"
      })
    );

    /* USERREG - Flex - Roles and Account Number */

    var oUSERREGFlexRolesAccountNumber = new sap.m.FlexBox(
      "idUSERREGFlexRolesAccountNumber",
      {
        items: [
          oUserregTableMenu,
          new sap.m.Label(),
          oUSERREGTableAccountNumbers
        ],
        direction: "Column"
        //justifyContent: sap.m.FlexJustifyContent.Center
        //layoutData: new sap.ui.layout.GridData({span: "L8 M8 S4",linebreak: false, margin: false})
      }
    );

    /* USERREG - Panel - Roles */

    var oUserregPanelRoles = new sap.m.Panel("idUserregPanelRoles", {
      busy: false, // boolean
      busyIndicatorDelay: 1000, // int
      visible: false, // boolean
      headerText: "Roles & Account Numbers", // string
      width: "100%",
      height: "auto", // sap.ui.core.CSSSize
      expandable: true, // boolean, since 1.22
      expanded: false, // boolean, since 1.22
      expandAnimation: true, // boolean, since 1.26
      //tooltip : "Filters", // sap.ui.core.TooltipBase
      content: [oUSERREGFlexRolesAccountNumber] // sap.ui.core.Control
    });

    var oUserregFlexAll = new sap.m.FlexBox("idUserregFlexAll", {
      items: [
        backUSERREG,
        oUserregUserType,
        vUserregHDivider,
        oUserregForm,
        vHUserregHDivider1,
        oUserregButton,
        vHUserregHDivider2,
        oUserregPanelResult,
        oUserregPanelRoles
      ],
      direction: "Column",
      justifyContent: sap.m.FlexJustifyContent.Center
      //layoutData: new sap.ui.layout.GridData({span: "L8 M8 S4",linebreak: false, margin: false})
    });

    return oUserregFlexAll;
  },

  checkIsOkForCreation : function(department, roleStringIn){

    var validationResultIn = {
      valid : "",
      message : ""
    };

    var oUSERREGDataAccountNumbers = oUSERREGTableAccountNumbers
      .getModel()
      .getData().modelData;

    accnoString =
      oUSERREGDataAccountNumbers[0].value1 +
      "|" +
      oUSERREGDataAccountNumbers[1].value1;

    if(department == "CUS"){

      // Check Customer BP - always mandatory

      if(oUSERREGDataAccountNumbers[0].value1 == ""){
        validationResultIn.valid = false;
        validationResultIn.message = "Customer BP is missing";
        return validationResultIn;
      }
      
      // Check if M&R Customer Dashboard is selected. If yes, check if M&R BP is entered
      var isMNR = roleStringIn.search("ZE.EPP20");
      if(isMNR != -1){
        if(oUSERREGDataAccountNumbers[1].value1 == ""){
          validationResultIn.valid = false;
          validationResultIn.message = "Customer BP is missing";
          return validationResultIn;
        }
      }      

    }else if(department == "DEP"){

      // Check Depot - always mandatory

      if(oUSERREGDataAccountNumbers[0].value1 == ""){
        validationResultIn.valid = false;
        validationResultIn.message = "Depot is missing";
        return validationResultIn;
      }
      
      // Check if EDI Dashboard is selected. If yes, check if EDI Depot is entered
      var isEDI = roleStringIn.search("ZE.EPP19");
      if(isEDI != -1){
        if(oUSERREGDataAccountNumbers[1].value1 == ""){
          validationResultIn.valid = false;
          validationResultIn.message = "EDI Depot is missing";
          return validationResultIn;
        }
      }   

    }
  },

  createUser: function(creorrej, uname) {

    var oCurrent = this;

    // Form Transaction Number String

    var txnnoString = "Txnnostring eq '" + globalUserregTxnno + "'";

    // Form Role String

    var usertype = sap.ui
      .getCore()
      .byId("idUserregComboUserType")
      .getSelectedItemId();

    var bindingpath = "";
    var roleString = "";

    switch (usertype) {
      case "CUS":
        bindingpath = "cs";
        break;
      case "DEP":
        bindingpath = "ops";
        break;
    }

    var menudata = sap.ui
      .getCore()
      .byId("idUserregTableMenu")
      .getModel()
      .getData()[bindingpath];

    for (var keyouter in menudata) {
      var menus = menudata[keyouter];
      for (var keyinner in menus) {
        if (menus[keyinner].checked == true) {
          if (roleString == "") roleString = menus[keyinner].roles;
          else roleString = roleString + "," + menus[keyinner].roles;
        }
      }
    }

    roleString = "Rolestring eq '" + roleString + "'";

    // Form Account Number String

    var accnoString = "";

    // Customer : accnoString = Customer BP | M&R BP
    // Depot    : accnoString = Depot | EDI Depot

    var oUSERREGTableAccountNumbers = sap.ui
      .getCore()
      .byId("idUSERREGTableAccountNumbers");

    var oUSERREGDataAccountNumbers = oUSERREGTableAccountNumbers
      .getModel()
      .getData().modelData;

    accnoString =
      oUSERREGDataAccountNumbers[0].value1 +
      "|" +
      oUSERREGDataAccountNumbers[1].value1;

    accnoString = "Accnostring eq '" + accnoString + "'";


    // Validation

    var validationResultOut = {
      valid : "",
      message : ""
    };

    validationResultOut = oCurrent.checkIsOkForCreation(usertype, roleString);

    if(!validationResultOut.valid){
      sap.ui.commons.MessageBox.alert(validationResultOut.message);
      return;
    }

    if(uname == undefined)  // convert undefined into space
      uname = "";

    // Format Others String
    var othersString = "Creorrej eq '" + creorrej + "' and Uname eq  + '" + uname + "'";

    if(creorrej == "R"){
      var rejcomm = "";
		// Rejection Comment
		if(sap.ui.getCore().byId("idUserregDialogTextAreaRejection") != undefined){
			rejcomm = sap.ui.getCore().byId("idUserregDialogTextAreaRejection").getValue();
			rejcomm = escapeUrl(rejcomm);
			rejcomm = encodeURIComponent(rejcomm);
		}else{
			rejcomm = "";
		}
    }else{
      var rejcomm = "";
    }

    // Format Others String
    var rejcommString = "Rejcomment eq '" + rejcomm + "'";

    var finalString =
      "/createUserSet?$filter=" +
      txnnoString +
      " and " +
      roleString +
      " and " +
      accnoString
      " and " +
      othersString
      " and " +
      rejcommString;

    console.log(finalString);

    var urlToCall = swbuser_serviceUrl + finalString;

    oModel = new sap.ui.model.odata.ODataModel(swbuser_serviceUrl, true);
    busyDialog.open();
    console.log(urlToCall);
    OData.request(
      {
        requestUri: urlToCall,
        method: "GET",
        dataType: "json",
        //async : false,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=utf-8",
          DataServiceVersion: "2.0",
          "X-CSRF-Token": "Fetch"
        }
      },
      function(data, response) {
        var userCreateResult = data.results;
        if (userCreateResult.length == 0) {
          busyDialog.close();
        } else if (userCreateResult[0].Csmail == "") {
          busyDialog.close();
        } else {
          var successMessage =
            "User Account created : " + userCreateResult[0].Uname;
          sap.ui.commons.MessageBox.show(
            successMessage,
            sap.ui.commons.MessageBox.Icon.SUCCESS,
            "Created",
            [sap.ui.commons.MessageBox.Action.OK],
            function refreshTransactions() {
              busyDialog.open();
              oCurrent.getOutstandingRequests();
            },
            sap.ui.commons.MessageBox.Action.OK
          );
          console.log(successMessage);
        }
      },
      function(error) {
        sap.ui.commons.MessageBox.alert("Sorry, there is an error");
        console.log("Get User Registration List failed");
        busyDialog.close();
      }
    );
  },

  setValueRoles: function() {
    var oUserregPanelResult = sap.ui.getCore().byId("idUserregPanelResult");
    oUserregPanelResult.setExpanded(false);

    var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
    oUserregPanelRoles.setVisible(true);
    oUserregPanelRoles.setExpanded(true);

    oUserregPanelRoles.setExpanded(true);
    var rolespaneltitle = "Roles & Account Numbers for " + globalUserregTxnno;
    oUserregPanelRoles.setHeaderText(rolespaneltitle);

    var oData = {
      cs: {
        menu: "cs",
        checked: false,
        0: {
          menu: "Customer Activity Report",
          checked: false,
          checkboxvisible: false,
          roles: "ZE.EPP18",
          0: {
            menu: "Outstanding Booking",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP18,ZE.EPP18C01"
          },
          1: {
            menu: "Outstanding Redelivery",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP18,ZE.EPP18C02"
          },
          2: {
            menu: "Unit On Lease",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP18,ZE.EPP18C03"
          },
          3: {
            menu: "Unit Off-Hire",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP18,ZE.EPP18C04"
          },
          4: {
            menu: "Redelivery Schedule",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP18,ZE.EPP18C05"
          }
        },

        1: {
          menu: "Online Returns",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Redelivery Request",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP12,ZE.EPP12C01"
          },
          1: {
            menu: "Redelivery View/Cancel",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP12,ZE.EPP12C02"
          }
        },

        2: {
          menu: "DRV",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "DRV",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP11"
          },
          1: {
            menu: "Request for Total Loss Button",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP11,ZE.EPP11B01"
          }
        },

        3: {
          menu: "Unit Enquiry",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Unit Enquiry",
            checked: false,
            checkboxvisible: true,
            roles:
              "ZE.EPP06,ZE.EPP06C02,ZE.EPP06C03,ZE.EPP06C04,ZE.EPP06C05,ZE.EPP06B01"
          }
        },

        4: {
          menu: "Depot Inventory",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Depot Inventory",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP07"
          }
        },

        5: {
          menu: "M&R Customer Dashboard",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "M&R Customer Dashboard",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP20"
          }
        },

        6: {
          menu: "Seaco Publications",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Seaco Publications - CS",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP05,ZE.EPP05C01"
          }
        }
      },

      ops: {
        menu: "ops",
        checked: false,
        0: {
          menu: "M&R Activity Reporting",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Zero Cost Estimate",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP14,ZE.EPP14C02"
          },
          1: {
            menu: "Lessee Approval Single",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP14,ZE.EPP14C03"
          },
          2: {
            menu: "Lessee Approval Multiple",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP14,ZE.EPP14C04"
          },
          3: {
            menu: "Repair Completion Single",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP14,ZE.EPP14C05"
          },
          4: {
            menu: "Repair Completion Multiple",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP14,ZE.EPP14C06"
          },
          5: {
            menu: "New Repair Estimate",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP14,ZE.EPP14C07"
          }
        },

        1: {
          menu: "Movement Reporting",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Gate In Single",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP10,ZE.EPP10C02"
          },
          1: {
            menu: "Gate In Multiple",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP10,ZE.EPP10C021"
          },
          2: {
            menu: "Gate Out Single",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP10,ZE.EPP10C03"
          },
          3: {
            menu: "Gate Out Multiple",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP10,ZE.EPP10C031"
          },
          4: {
            menu: "Correct Movement Date",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP10,ZE.EPP10C04"
          }
        },

        2: {
          menu: "Logs",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Portal Processing Log",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP16,ZE.EPP16C02"
          },
          1: {
            menu: "EDI Summary",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP16,ZE.EPP16C03"
          },
          2: {
            menu: "CEDEX Transmission Log",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP16,ZE.EPP16C04"
          }
        },

        3: {
          menu: "EDI Process",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "EDI Process",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP19"
          }
        },

        3: {
          menu: "Depot Inventory",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Depot Inventory",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP07"
          }
        },

        3: {
          menu: "Unit Enquiry",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Unit Enquiry",
            checked: false,
            checkboxvisible: true,
            roles:
              "ZE.EPP06,ZE.EPP06C02,ZE.EPP06C03,ZE.EPP06C04,ZE.EPP06C05,ZE.EPP06B01"
          }
        },

        4: {
          menu: "Depot Documents",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Accounts Summary",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP03,ZE.EPP03C01"
          },
          1: {
            menu: "Operation Documents",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP03,ZE.EPP03C04"
          }
        },

        5: {
          menu: "OnHire / OffHire Documents",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Releases",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP02,ZE.EPP02C01"
          },
          1: {
            menu: "Returns",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP02,ZE.EPP02C02"
          }
        },

        6: {
          menu: "Upload Documents",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Upload Certificates - Single",
            checked: false,
            checkboxvisible: true,
            role:
              "ZE.EPP04,ZE.EPP04C01,ZE.EPP04C02,ZE.EPP04C03,ZE.EPP04C04,ZE.EPP04C05,ZE.EPP04C06,ZE.EPP04C07,ZE.EPP04C08,ZE.EPP04C11"
          },
          1: {
            menu: "Upload Certificates - Multiple",
            checked: false,
            checkboxvisible: true,
            role: "ZE.EPP04,ZE.EPP04C12"
          }
        },

        7: {
          menu: "Seaco Publications",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Seaco Publications - Depot",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP05,ZE.EPP05C02,ZE.EPP05C04"
          }
        }
      },

      buy: {
        menu: "buy",
        checked: false,
        0: {
          menu: "Sale Inventory",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Sale Inventory Overview",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP09,ZE.EPP09C01"
          },
          1: {
            menu: "Sale Inventory Overview - Make An Offer",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP09,ZE.EPP09C01,ZE.EPP09C01B01"
          },
          2: {
            menu: "Outstanding Releases",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP09,ZE.EPP09C01"
          },
          3: {
            menu: "Outstanding Payments",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP09,ZE.EPP09C02"
          }
        },

        1: {
          menu: "Seaco Publications",
          checked: false,
          checkboxvisible: false,
          0: {
            menu: "Seaco Publications - Buyer",
            checked: false,
            checkboxvisible: true,
            roles: "ZE.EPP05,ZE.EPP05C03"
          }
        }
      }
    };

    var oUserregModelMenu = new sap.ui.model.json.JSONModel();
    oUserregModelMenu.setData(oData);

    var oUserregTableMenu = sap.ui.getCore().byId("idUserregTableMenu");
    oUserregTableMenu.setModel(oUserregModelMenu);

    var usertype = sap.ui
      .getCore()
      .byId("idUserregComboUserType")
      .getSelectedItemId();

    var bindingpath = "";

    switch (usertype) {
      case "CUS":
        bindingpath = "/cs";
        break;
      case "DEP":
        bindingpath = "/ops";
        break;
    }

    oUserregTableMenu.bindRows(bindingpath);

    var oUSERREGDataAccountNumbers = [];

    switch (usertype) {
      case "CUS":
        oUSERREGDataAccountNumbers.push({
          label1: "Customer BP",
          value1: "",
          dept: "CS"
        });

        oUSERREGDataAccountNumbers.push({
          label1: "M&R BP",
          value1: "",
          dept: "CS"
        });
        break;
      case "DEP":
        oUSERREGDataAccountNumbers.push({
          label1: "Depot",
          value1: "",
          dept: "OPS"
        });

        oUSERREGDataAccountNumbers.push({
          label1: "EDI Depot",
          value1: "",
          dept: "OPS"
        });
        break;
    }

    var oUSERREGModelAccountNumbers = new sap.ui.model.json.JSONModel();
    oUSERREGModelAccountNumbers.setData({
      modelData: oUSERREGDataAccountNumbers
    });

    var oUSERREGTableAccountNumbers = sap.ui
      .getCore()
      .byId("idUSERREGTableAccountNumbers");
    oUSERREGTableAccountNumbers.setModel(oUSERREGModelAccountNumbers);
    oUSERREGTableAccountNumbers.setVisibleRowCount(
      oUSERREGDataAccountNumbers.length
    );
    oUSERREGTableAccountNumbers.bindRows("/modelData");
    

    sap.ui.getCore().byId("idUSERREGPageFooterButtonCreate").setVisible(true);
    sap.ui.getCore().byId("idUSERREGPageFooterButtonReject").setVisible(true);

  },

  getOutstandingRequests: function() {
    //var selLocation = oEvent.mParameters.selectedItem.sId;
    var selUserType = sap.ui.getCore().byId("idUserregComboUserType").getSelectedKey();
    var selLocation = sap.ui.getCore().byId("idUserregComboLocation").getSelectedKey();
    var selSmail = sap.ui.getCore().byId("idUserregComboSMail").getSelectedKey();

    if (selLocation && !selSmail) {
      sap.ui.commons.MessageBox.alert(
        "Please select Seaco Contact Email, if you have selected Seaco Contact Location"
      );
      busyDialog.close();
      return;
    }

    if (!selUserType) {
      sap.ui.commons.MessageBox.alert(
        "Please select User Type, Location and Mailbox"
      );
      busyDialog.close();
      return;
    }

    // userCreationData = [];
    // userCreationData.push({
    //   Txnno: "0000001",
    //   Fname: "Seyed",
    //   Lname: "Ismail",
    //   Email: "seyed.ismail@seacoglobal.com",
    //   Cname: "Seaco",
    //   Add1: "Bedok",
    //   Add2: "",
    //   Add3: "",
    //   City: "Singapore",
    //   Ctry: "Singapore",
    //   Pcode: "463808",
    //   Phone: "92997936",
    //   Status: "New"
    // });
    // userCreationData.push({
    //   Txnno: "0000002",
    //   Fname: "Seethy",
    //   Lname: "Ramasamy",
    //   Email: "seethy.ramasamy@seacoglobal.com",
    //   Cname: "Seaco",
    //   Add1: "Sengkang",
    //   Add2: "",
    //   Add3: "",
    //   City: "Singapore",
    //   Ctry: "Singapore",
    //   Pcode: "463808",
    //   Phone: "92997936",
    //   Status: "New"
    // });
    // userCreationData.push({
    //   Txnno: "0000003",
    //   Fname: "Adaikkappan",
    //   Lname: "Valliappan",
    //   Email: "adaikkappan.v@seacoglobal.com",
    //   Cname: "Seaco",
    //   Add1: "Woodlands",
    //   Add2: "",
    //   Add3: "",
    //   City: "Singapore",
    //   Ctry: "Singapore",
    //   Pcode: "463808",
    //   Phone: "92997936",
    //   Status: "New"
    // });

    // var oUserregModelResult = new sap.ui.model.json.JSONModel();
    // oUserregModelResult.setData({
    //   modelData: userCreationData
    // });

    // var oUserregTableResult = sap.ui.getCore().byId("idUserregTableResult");
    // oUserregTableResult.setModel(oUserregModelResult);
    // oUserregTableResult.bindRows("/modelData");
    // oUserregTableResult.setVisible(true);
    // if (userCreationData.length < 10) {
    //   oUserregTableResult.setVisibleRowCount(userCreationData.length);
    // } else {
    //   oUserregTableResult.setVisibleRowCount(10);
    // }

    // var oUserregPanelResult = sap.ui.getCore().byId("idUserregPanelResult");
    // oUserregPanelResult.setVisible(true);
    // oUserregPanelResult.setExpanded(true);

    // var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
    // oUserregPanelRoles.setVisible(false);

    // return;

    var csinbox = sap.ui
      .getCore()
      .byId("idUserregComboSMail")
      .getProperty("value");
    // var outstanding = sap.ui
    //   .getCore()
    //   .byId("idUserregCheckBoxOutstanding")
    //   .getSelected();
    var urlToCall =
      swbuser_serviceUrl +
      "/getTxnSet?$filter=" +
      "Csmail eq '" + csinbox +
      "' and Utype eq '" + selUserType +
      // "Status eq '" +
      // outstanding +
      "'";

    oModel = new sap.ui.model.odata.ODataModel(swbuser_serviceUrl, true);
    busyDialog.open();
    console.log(urlToCall);
    OData.request(
      {
        requestUri: urlToCall,
        method: "GET",
        dataType: "json",
        //async : false,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json; charset=utf-8",
          DataServiceVersion: "2.0",
          "X-CSRF-Token": "Fetch"
        }
      },
      function(data, response) {
        userCreationData = data.results;

        if (userCreationData.length == 0) {
          var oUserregPanelResult = sap.ui
            .getCore()
            .byId("idUserregPanelResult");
          oUserregPanelResult.setVisible(false);

          var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
          oUserregPanelRoles.setVisible(false);

          sap.ui.commons.MessageBox.alert("Sorry, No results found");
          console.log("No data for User Creation Data");
        } else {
          console.log("Get transactions success");
          for (var i = 0; i < userCreationData.length; i++) {
            userCreationData[i].Txnno = parseInt(userCreationData[i].Txnno);
            userCreationData[i].Phone = parseInt(userCreationData[i].Phone);
          }

          var oUserregModelResult = new sap.ui.model.json.JSONModel();
          oUserregModelResult.setData({
            modelData: userCreationData
          });

          var oUserregTableResult = sap.ui
            .getCore()
            .byId("idUserregTableResult");
          oUserregTableResult.setModel(oUserregModelResult);
          oUserregTableResult.bindRows("/modelData");
          oUserregTableResult.setVisible(true);
          if (userCreationData.length < 10) {
            oUserregTableResult.setVisibleRowCount(userCreationData.length);
          } else {
            oUserregTableResult.setVisibleRowCount(10);
          }

          var oUserregPanelResult = sap.ui
            .getCore()
            .byId("idUserregPanelResult");
          oUserregPanelResult.setVisible(true);
          oUserregPanelResult.setExpanded(true);

          var oUserregPanelRoles = sap.ui.getCore().byId("idUserregPanelRoles");
          oUserregPanelRoles.setVisible(false);
        }
        busyDialog.close();
      },
      function(error) {
        sap.ui.commons.MessageBox.alert("Sorry, there is an error");
        console.log("Get User Registration List failed");
        busyDialog.close();
      }
    );
    // }
  },
  // Refine Seaco Contact Location
  refineSeacoContactLocation: function(userType) {

    if (userType == "CUS") {
      // Set Up Seaco Contact Location values

      var customerLocationVal = [];
      customerLocationVal.push({
          key : "",
          description : ""
      });
      customerLocationVal.push({
        key : "CSAME",
        description : "Customer Service Americas"
      });
      customerLocationVal.push({
        key : "CSAPA",
        description : "Customer Service Asia"
      });
      customerLocationVal.push({
        key : "CSEUR",
        description : "Customer Service Europe"
      });
      customerLocationVal.push({
        key : "CSISC",
        description : "Customer Service Indian Sub-Continent"
      });
      customerLocationVal.push({
        key : "CSOCE",
        description : "Customer Service Oceania"
      });


        var oUSERREGModelLocation = new sap.ui.model.json.JSONModel();
        oUSERREGModelLocation.setSizeLimit(99999);
        oUSERREGModelLocation.setData({data:customerLocationVal});
    
        var oUserregComboLocation = new sap.ui.getCore().byId("idUserregComboLocation");
        oUserregComboLocation.setModel(oUSERREGModelLocation);
        oUserregComboLocation.setSelectedKey(customerLocationVal[0].key);
        oUserregComboLocation.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));
    


    } else if (userType == "DEP") {
      // Set Up Seaco Contact Location values

      var customerLocationVal = [];
      customerLocationVal.push({
          key : "",
          description : ""
      });
      customerLocationVal.push({
        key : "DEAME",
        description : "Americas"
      });
      customerLocationVal.push({
        key : "DEAPA",
        description : "Asia Pacific"
      });
      customerLocationVal.push({
        key : "DEEUR",
        description : "EMEA"
      });
      customerLocationVal.push({
        key : "DEOCE",
        description : "Oceania"
      });


        var oUSERREGModelLocation = new sap.ui.model.json.JSONModel();
        oUSERREGModelLocation.setSizeLimit(99999);
        oUSERREGModelLocation.setData({data:customerLocationVal});
    
        var oUserregComboLocation = new sap.ui.getCore().byId("idUserregComboLocation");
        oUserregComboLocation.setModel(oUSERREGModelLocation);
        oUserregComboLocation.setSelectedKey(customerLocationVal[0].key);
        oUserregComboLocation.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));

    } else if (userType == "FAC") {
      // Set Up Seaco Contact Location values

      var customerLocationVal = [];
      customerLocationVal.push({
          key : "",
          description : ""
      });
      customerLocationVal.push({
        key : "FAAME",
        description : "Americas"
      });
      customerLocationVal.push({
        key : "FAAPA",
        description : "Asia Pacific"
      });
      customerLocationVal.push({
        key : "FAEUR",
        description : "EMEA"
      });
      customerLocationVal.push({
        key : "FAOCE",
        description : "Oceania"
      });

      var oUSERREGModelLocation = new sap.ui.model.json.JSONModel();
        oUSERREGModelLocation.setSizeLimit(99999);
        oUSERREGModelLocation.setData({data:customerLocationVal});
    
        var oUserregComboLocation = new sap.ui.getCore().byId("idUserregComboLocation");
        oUserregComboLocation.setModel(oUSERREGModelLocation);
        oUserregComboLocation.setSelectedKey(customerLocationVal[0].key);
        oUserregComboLocation.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));

    } else if (userType == "SUR") {
      // Set Up Seaco Contact Location values

      var customerLocationVal = [];
      customerLocationVal.push({
          key : "",
          description : ""
      });
      customerLocationVal.push({
        key : "SUAME",
        description : "Americas"
      });
      customerLocationVal.push({
        key : "SUAPA",
        description : "Asia Pacific"
      });
      customerLocationVal.push({
        key : "SUEUR",
        description : "EMEA"
      });
      customerLocationVal.push({
        key : "SUOCE",
        description : "Oceania"
      });

      var oUSERREGModelLocation = new sap.ui.model.json.JSONModel();
        oUSERREGModelLocation.setSizeLimit(99999);
        oUSERREGModelLocation.setData({data:customerLocationVal});
    
        var oUserregComboLocation = new sap.ui.getCore().byId("idUserregComboLocation");
        oUserregComboLocation.setModel(oUSERREGModelLocation);
        oUserregComboLocation.setSelectedKey(customerLocationVal[0].key);
        oUserregComboLocation.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));

    } else if (userType == "BUY") {
      
          // Set Up Seaco Contact Location values

          var customerLocationVal = [];
          customerLocationVal.push({
              key : "",
              description : ""
          });
          customerLocationVal.push({
            key : "BUAME",
            description : "Americas"
          });
          customerLocationVal.push({
            key : "BUASIA",
            description : "Asia"
          });
          customerLocationVal.push({
            key : "BUANZ",
            description : "ANZ"
          });
          customerLocationVal.push({
            key : "BUEUR",
            description : "Europe"
          });
          customerLocationVal.push({
            key : "BUAFR",
            description : "Africas"
          });
          customerLocationVal.push({
            key : "BUIND",
            description : "India"
          });
          customerLocationVal.push({
            key : "BUMID",
            description : "Middle East"
          });
    
          var oUSERREGModelLocation = new sap.ui.model.json.JSONModel();
            oUSERREGModelLocation.setSizeLimit(99999);
            oUSERREGModelLocation.setData({data:customerLocationVal});
        
            var oUserregComboLocation = new sap.ui.getCore().byId("idUserregComboLocation");
            oUserregComboLocation.setModel(oUSERREGModelLocation);
            oUserregComboLocation.setSelectedKey(customerLocationVal[0].key);
            oUserregComboLocation.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));

    }
  },

  // Refine Seaco Contact Email
  refineSeacoContactEmail: function(
    userType,
    location,
    oLabelSMail,
    oComboSMail
  ) {
    if (userType == "CUS") {
      if (location == "CSAPA") {
        // Set Up Seaco Contact Email Values

        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "CSECHN",
          description : "CS.China@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEHKG",
          description : "CS.Hongkong@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEIDN",
          description : "CS.Indonesia@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEJPN",
          description : "CS.Japan@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEKRE",
          description : "CS.Korea@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEMLY",
          description : "CS.Malaysia@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEPHL",
          description : "CS.Philippines@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSESGP",
          description : "CS.Singapore@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSETAI",
          description : "CS.Taiwan@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSETHL",
          description : "CS.Thailand@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEVIE",
          description : "CS.Vietnam@seacoglobal.com"
        });
      } else if (location == "CSAME") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "CSEAME",
          description : "CS.Americas@seacoglobal.com"
        });
      } else if (location == "CSEUR") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "CSEBEN",
          description : "CS.Benelux@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSECIS",
          description : "CS.CIS@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEEMD",
          description : "CS.EastMed@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEFRA",
          description : "CS.France@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEGER",
          description : "CS.Germany@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEITA",
          description : "CS.Italy@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSESPA",
          description : "CS.Spain@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEPOR",
          description : "CS.Portugal@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSESCA",
          description : "CS.Scandinavia@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSESAF",
          description : "CS.SouthAfrica@seacoglobal.com"
        });
        customerEmailVal.push({
          key : "CSEUKN",
          description : "CS.UK@seacoglobal.com"
        });
      } else if (location == "CSISC") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "CSEISC",
          description : "CS.ISC@seacoglobal.com"
        });
      } else if (location == "CSOCE") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "CSEOCE",
          description : "CS.Oceania@seacoglobal.com"
        });
      }
    } else if (userType == "DEP") {
      if (location == "DEAPA") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "DEAPSM",
          description : "apops@seacoglobal.com"
        });
      } else if (location == "DEAME") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "DEAMSM",
          description : "amops@seacoglobal.com"
        });
      } else if (location == "DEEUR") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "DEEUSM",
          description : "emeaops@seacoglobal.com"
        });

      } else if (location == "DEOCE") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "DEEOCE",
          description : "cs.oceania@seacoglobal.com"
        });

      }
    }
    //  Begin of changing by Seyed Ismail on 15.12.2014 MAC15122014
    else if (userType == "BUY") {
      if (location == "BUAME") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUAMEE",
          description : "giovanna.nastasi@seacoglobal.com"
        });

      } else if (location == "BUASI") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUASIE",
          description : "grace.kaw@seacoglobal.com"
        });

      } else if (location == "BUANZ") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUANZE",
          description : "grace.kaw@seacoglobal.com"
        });

      } else if (location == "BUEUR") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUEURE",
          description : "catrin.wagner@seacoglobal.com"
        });

      } else if (location == "BUAFR") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUAFRE",
          description : "catrin.wagner@seacoglobal.com"
        });
      } else if (location == "BUIND") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUINDE",
          description : "catrin.wagner@seacoglobal.com"
        });

      } else if (location == "BUMID") {
        var customerEmailVal = [];
        customerEmailVal.push({
          key : "",
          description : ""
        });
        customerEmailVal.push({
          key : "BUMIDE",
          description : "catrin.wagner@seacoglobal.com"
        });
      }
    }

    oLabelSMail.setVisible(true);
    oComboSMail.setVisible(true);
    // for (var i = 0; i < customerEmailVal.key.length; i++) {
    //   var oItem = new sap.ui.core.ListItem(customerEmailVal.key[i]);
    //   oItem.setText(customerEmailVal.description[i]);
    //   oComboSMail.addItem(oItem);
    // }

    var oUSERREGModelSMail = new sap.ui.model.json.JSONModel();
    oUSERREGModelSMail.setSizeLimit(99999);
    oUSERREGModelSMail.setData({data:customerEmailVal});

    var oUSERREGInputSMail = new sap.ui.getCore().byId("idUserregComboSMail");
    oUSERREGInputSMail.setModel(oUSERREGModelSMail);
    oUSERREGInputSMail.setSelectedKey(customerEmailVal[0].key);
    oUSERREGInputSMail.bindItems("/data", new sap.ui.core.ListItem({text: "{description}", key:"{key}"}));

  },

  resetVIEW: function(whichPage) {}
});
function fnRedirectToLogin() {
  if (aChngPswd == "Password changed successfully") {
    window.open("index.html", "_self");
  }
}

function escapeUrl(url) {
	url = url.replace(/'/g, "");
    //url = escape(url);
    return url;
}
