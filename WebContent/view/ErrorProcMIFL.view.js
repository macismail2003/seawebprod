sap.ui.jsview("view.ErrorProcMIFL", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ErrorProcMIFL
	*/ 
	getControllerName : function() {
		return "view.ErrorProcMIFL";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ErrorProcMIFL
	*/ 
	createContent : function(oController) {
 		
		var oErrorProcessingMIFL = new errorProcessingMIFLView();
		var vErrorProcessingMIFLForm = oErrorProcessingMIFL.createEPScreenFlex();
		
		this.page = new sap.m.Page({
			showNavButton: false,				
			icon: "",
			content : [vErrorProcessingMIFLForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});