sap.ui.define(['sap/ui/core/UIComponent','sap/ui/core/mvc/XMLView'],
	function(UIComponent, XMLView) {
	"use strict";

	var Component = UIComponent.extend("sap.m.sample.Table.Component", {

		metadata : {
		    publicMethods : [
				"getTable"
			],

			manifest: "json"
		},
			init: function() {
			jQuery.sap.require("sap.m.MessageBox");
			jQuery.sap.require("sap.m.MessageToast");

			
			sap.ui.core.UIComponent.prototype.init.apply(
				this, arguments);
			this.getRouter().initialize();	
		},

		getTable : function () {
			return this._rootView.getContent()[0];
		}
	});

	Component.prototype.createContent = function () {
		this._rootView = sap.ui.xmlview({ viewName : "sap.m.sample.Table.Table" });
		return this._rootView;
	};

	return Component;

});
