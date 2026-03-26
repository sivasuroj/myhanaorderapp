sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],function (Controller,MessageBox) {
    "use strict";

    return Controller.extend("custorder.controller.Orderview", {
        onInit() {
        },
        submit: function() {
            var orderID = this.getView().byId("_IDGenInput").getValue();
            var custID = this.getView().byId("_IDGenInput1").getValue();
            var empID = this.getView().byId("_IDGenInput2").getValue();
            var shipID = this.getView().byId("_IDGenInput3").getValue();
            var oModel = this.getView().getModel();

            var oContext = oModel.bindList("/Orders").create({
                "OrderID"       : orderID,   
                "CustomerID"    : custID,
                "EmployeeID"    : empID,
                "ShipName"      : shipID
            });
            oContext.created().then(()=>{
                MessageBox.success("Orders added succesfully");
            }).catch((err)=>{
                MessageBox.console.error("Orders added succesfully");
            });              
            
        }
    });
});