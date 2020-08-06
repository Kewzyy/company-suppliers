sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter"
], function (Controller, JSONModel, MessageToast, MessageBox, Fragment, History, UIComponent, Filter) {
	"use strict";

	return Controller.extend("sap.m.sample.Table.Table2", {
		onInit: function (oEvent) {
			
			var oModel = new JSONModel("Documents.json");
			this.getView().setModel(oModel);
					

			this._wizard = this.byId("CreateProductWizard");
			this._oNavContainer = this.byId("wizardNavContainer");
			this._oWizardContentPage = this.byId("wizardContentPage");
			
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("second").attachPatternMatched(this._onObjectMatched, this);

			Fragment.load({
				name: "sap.m.sample.Table.ReviewPage",
				controller: this
			}).then(function (oWizardReviewPage) {
				this._oWizardReviewPage = oWizardReviewPage;
				this._oNavContainer.addPage(this._oWizardReviewPage);
			}.bind(this));

			// this.model = new JSONModel();
			// this.model.setData({
			// 	productNameState: "Error",
			// 	productWeightState: "Error"
			// });
			// this.getView().setModel(this.model);
			// this.model.setProperty("/productType", "Mobile");
			// this.model.setProperty("/availabilityType", "New");
			// this.model.setProperty("/navApiEnabled", true);
			// this.model.setProperty("/productVAT", false);
			// this.model.setProperty("/measurement", "");
			// this._setEmptyValue("/productManufacturer");
			// this._setEmptyValue("/productDescription");
			// this._setEmptyValue("/size");
			// this._setEmptyValue("/productPrice");
			// this._setEmptyValue("/manufacturingDate");
			// this._setEmptyValue("/discountGroup");
			// this.oModel.setProperty("/measurement", "");
		},
		
		onValidateButtonChange: function (oEvent){
			//Button Change
			this.byId("validateb").setVisible(true);
			this.byId("validatedb").setVisible(false);
			this.byId("notvalidatedb").setVisible(false);
			//Changed
		},
		
		onNotValidateButtonChange: function (oEvent){
			//Button Change
			this.byId("validateb").setVisible(true);
			this.byId("notvalidatedb").setVisible(false);
			this.byId("validatedb").setVisible(false);
			//Changed
		},		
		
		onTreeActions: function(oEvent) {
			var tSelected = oEvent.getSource().getSelectedItems();
			this.getView().getModel().setProperty("/treeSelected", "Rejected");
			var docsArray = [];
			        for (var i = 0; i < tSelected.length; i++) {
								var docs = tSelected[i].getBindingContext().getObject().text;
								docsArray.push(docs);
							}
					var xdd = docsArray.join();		
			
			this.getView().getModel().setProperty("/docschosen", xdd);                       
		},
		
		onButttonChangeAccept: function (oEvent){
			
			this.byId("rejectb").setVisible(false);
			this.byId("acceptb").setVisible(false);
			this.byId("acceptedb").setVisible(true);
			
			
			this.getView().getModel().setProperty("/statusx", "Accepted");
		},
		
		onButtonChangeNew: function (oEvent) {
			
		this.byId("rejectedb").setVisible(false);
		this.byId("acceptedb").setVisible(false);	
		this.byId("rejectb").setVisible(true);
		this.byId("acceptb").setVisible(true);
		
		},		
		
		onButttonChangeDecline: function (oEvent){
			
			this.byId("rejectb").setVisible(false);
			this.byId("acceptb").setVisible(false);
			this.byId("rejectedb").setVisible(true);
			this.getView().getModel().setProperty("/statusx", "Rejected");
		},		
		
		onFilterSelect: function (oEvent) {

			
			var	sKey = oEvent.getParameter("key");
				// Array to combine filters
			console.log(oEvent.getSource());
				

			
			if (sKey === "Summary") {
				
				this.getView().byId("toolbarnew").setVisible(true);		
				this.getView().byId("toolbar").setVisible(true);		
				this.getView().byId("generalinfo").setVisible(true);
				this.getView().byId("vatform").setVisible(true);
				this.getView().byId("responsiblelist").setVisible(true);
				
				this.byId("idIconTabBar").addContent(this.getView().byId("toolbarnew"));
				this.byId("idIconTabBar").addContent(this.getView().byId("generalinfo"));
				this.byId("idIconTabBar").addContent(this.getView().byId("vatform"));
				this.byId("idIconTabBar").addContent(this.getView().byId("toolbar"));
				this.byId("idIconTabBar").addContent(this.getView().byId("responsiblelist"));
				

			} else if (sKey === "Details") {
				console.log("Details");
			} else if (sKey === "Related") {
				console.log("Related");
			} else if (sKey === "Summary2") {
					// var oModel = new JSONModel("Documents.json");
					// this.getView().setModel(oModel);
					
				this.getView().byId("toolbarrr").setVisible(true);	
				this.getView().byId("Tree").setVisible(true);
				this.getView().byId("docusnee").setVisible(true);
				this.byId("idIconTabBar2").addContent(this.getView().byId("toolbarrr"));
				this.byId("idIconTabBar2").addContent(this.getView().byId("Tree"));
				this.byId("idIconTabBar2").addContent(this.getView().byId("docusnee"));
				
			} else if (sKey === "Summary3") {
				this.getView().byId("toolbarrrr").setVisible(true);
				this.getView().byId("approvalform").setVisible(true);
				this.byId("idIconTabBar3").addContent(this.getView().byId("toolbarrrr"));
				this.byId("idIconTabBar3").addContent(this.getView().byId("approvalform"));
			}

		
		},		
		
		_onObjectMatched: function (oEvent) {
			// console.log(oEvent.getParameter("arguments"));
			// this.getView().bindElement({
			// 	path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").chosenSupp),
			// 	model: "userModel"
			// });
			
			//console.log(oEvent.getParameter("arguments").chosenSupp);
			
			var oFilter = new sap.ui.model.Filter("VENDOR_ID", sap.ui.model.FilterOperator.EQ, oEvent.getParameter("arguments").chosenSupp);

			this.getView().byId("generalinfo").getBinding("items").filter(oFilter, sap.ui.model.FilterType.Application);
		},		

		setProductType: function (evt) {
			var productType = evt.getSource().getTitle();
			this.model.setProperty("/productType", productType);
			this.byId("ProductStepChosenType").setText("Chosen product type: " + productType);
			this._wizard.validateStep(this.byId("ProductTypeStep"));
		},

		setProductTypeFromSegmented: function (evt) {
			var productType = evt.getParameters().item.getText();
			this.model.setProperty("/productType", productType);
			this._wizard.validateStep(this.byId("ProductTypeStep"));
		},
		
		
		onCallSOAP: function (oEvent){
			var that = this;
			
			var sVAT = this.byId("ProductNameX").getValue();
			
			var sVATVALID = this.byId("vatvalid");
			var sADDRESS = this.byId("address");
			var sNAME = this.byId("vatname");
			var sCOUNTRYC = this.byId("countrycode");
			var sVATNUMBER = this.byId("vatnumber");
			var sYESORNO = this.byId("yesorno");
			
			var sAREVIEW = this.byId("adressreview");
			var sNREVIEW = this.byId("namereview");
			var sCREVIEW = this.byId("countryreview");

			
			console.log(sAREVIEW);
			var sCODE = sVAT.slice(2);
			var sCOUNTRY = sVAT.substring(0,2);
			var sUrl = "/api/vat/check?countryCode="+ sCOUNTRY +"&vatNumber=" + sCODE;
			
			
			// //Button Change
			// // this.byId("validateb").setVisible(false);
			// // this.byId("validatedb").setVisible(true);
			// if(this.byId("vatvalid").getText() === "true"){
			// this.byId("validateb").setVisible(false);
			// this.byId("validatedb").setVisible(true);
			// }
			// else {
			// this.byId("validateb").setVisible(false);
			// this.byId("validatedb").setVisible(false);
			// this.byId("notvalidatedb").setVisible(true);
			// }
			// //Changed			
			
			// AJAX CALL
			$.ajax({
				type: "GET",
				url: sUrl,
				content: "text/json",
				dataType: "json",
			    success: function (result) {
					console.log(result);
					sVATVALID.setText(result.valid);
					sADDRESS.setText(result.address);
					sNAME.setText(result.name);
					sCOUNTRYC.setText(result.countryCode);
					sVATNUMBER.setText(result.vatNumber);
					sYESORNO.setIcon("sap-icon://sys-enter-2");
							
					if(that.byId("vatvalid").getText() === "true"){
						
					that.byId("notvalidatedb").setVisible(false);	
					that.byId("validateb").setVisible(false);
					that.byId("validatedb").setVisible(true);
					that.byId("ProductNameX").setValueState("Success");
					
					}
					else {
					that.byId("validatedb").setVisible(false);	
					that.byId("validateb").setVisible(false);
					that.byId("notvalidatedb").setVisible(true);
					that.byId("ProductNameX").setValueState("Error");
					
					}					
			    },
			    error: function () {
			        console.log("error");
			        sYESORNO.setIcon("sap-icon://error");
			    }
			});

			//Button Change


			//Changed			
			
		},		

		additionalInfoValidation: function () {
			var name = this.byId("ProductName").getValue();
			var weight = parseInt(this.byId("ProductWeight").getValue());

			if (isNaN(weight)) {
				this.model.setProperty("/productWeightState", "Error");
			} else {
				this.model.setProperty("/productWeightState", "None");
			}

			if (name.length > 15) {
				this.model.setProperty("/productNameState", "Error");
			} else {
				this.model.setProperty("/productNameState", "None");
			}

			if (name.length > 15 || isNaN(weight)) {
				this._wizard.invalidateStep(this.byId("ProductInfoStep"));
			} else {
				this._wizard.validateStep(this.byId("ProductInfoStep"));
			}
		},

		optionalStepActivation: function () {
			MessageToast.show(
				'Almost done. Lets add more information to the application!'
			);
		},
		
  onBack: function()
  {
  var oHistory = History.getInstance();
  var sPreviousHash = oHistory.getPreviousHash();
  if (sPreviousHash !== undefined) {
  window.history.go(-1);
  } else {
  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
  oRouter.navTo("overview", true);
  }
  }	,

		optionalStepCompletion: function () {
			MessageToast.show(
				'Step 3 completed. Lets go to the review!'
			);
		},

		pricingActivate: function () {
			this.model.setProperty("/navApiEnabled", true);
		},

		pricingComplete: function () {
			this.model.setProperty("/navApiEnabled", false);
		},

		scrollFrom4to2: function () {
			this._wizard.goToStep(this.byId("ProductInfoStep"));
		},

		goFrom4to3: function () {
			if (this._wizard.getProgressStep() === this.byId("PricingStep")) {
				this._wizard.previousStep();
			}
		},

		goFrom4to5: function () {
			if (this._wizard.getProgressStep() === this.byId("PricingStep")) {
				this._wizard.nextStep();
			}
		},

		wizardCompletedHandler: function () {
			this._oNavContainer.to(this._oWizardReviewPage);
		},

		backToWizardContent: function () {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},

		editStepOne: function () {
			this._handleNavigationToStep(0);
		},

		editStepTwo: function () {
			this._handleNavigationToStep(1);
		},

		editStepThree: function () {
			this._handleNavigationToStep(2);
		},

		editStepFour: function () {
			this._handleNavigationToStep(3);
		},

		_handleNavigationToStep: function (iStepNumber) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this.backToWizardContent();
		},

		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._handleNavigationToStep(0);
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
					}
				}.bind(this)
			});
		},

		_setEmptyValue: function (sPath) {
			this.model.setProperty(sPath, "n/a");
		},

		handleWizardCancel: function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
		},

		handleWizardSubmit: function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},

		productWeighStateFormatter: function (val) {
			return isNaN(val) ? "Error" : "None";
		},

		discardProgress: function () {
			this._wizard.discardProgress(this.byId("ProductTypeStep"));

			var clearContent = function (content) {
				for (var i = 0; i < content.length; i++) {
					if (content[i].setValue) {
						content[i].setValue("");
					}

					if (content[i].getContent) {
						clearContent(content[i].getContent());
					}
				}
			};

			this.model.setProperty("/productWeightState", "Error");
			this.model.setProperty("/productNameState", "Error");
			clearContent(this._wizard.getSteps());
		}
	});
});
