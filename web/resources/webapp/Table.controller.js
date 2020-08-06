sap.ui.define([
		'./Formatter',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/library',
		"sap/ui/model/FilterOperator",
		"sap/ui/model/FilterType",
		"sap/ui/model/Filter"
	], function(Formatter, Controller, JSONModel, mobileLibrary, FilterOperator, FilterType, Filter) {
	"use strict";

	var PopinLayout = mobileLibrary.PopinLayout;

	var TableController = Controller.extend("sap.m.sample.Table.Table", {

		onInit: function () {
			// set explored app's demo model on this sample
			var oModel = new JSONModel();
			this.getView().setModel(oModel);
		},

		onPopinLayoutChanged: function() {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
				case "Block":
					oTable.setPopinLayout(PopinLayout.Block);
					break;
				case "GridLarge":
					oTable.setPopinLayout(PopinLayout.GridLarge);
					break;
				case "GridSmall":
					oTable.setPopinLayout(PopinLayout.GridSmall);
					break;
				default:
					oTable.setPopinLayout(PopinLayout.Block);
					break;
			}
		},

		onSearch : function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("DPMNT", FilterOperator.Contains, sValue);
				oView.byId("idProductsTable").getBinding("items").filter(oFilter, FilterType.Application);
		},
		
		onEdit: function(oEvent) {
			
			// var oSupp = oEvent.getSource().getBindingContext("userModel").getObject();
			var oSuppp = oEvent.getSource().getBindingContext("userModel").getObject().VENDOR_ID; //.getPath().substr(1);
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("second", {
				chosenSupp: window.encodeURIComponent(oSuppp)
			});
		},		
		
		onSelect: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("idProductsTable"),
				aSticky = oTable.getSticky() || [];

			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);
		},

		onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		}
	});


	return TableController;

});