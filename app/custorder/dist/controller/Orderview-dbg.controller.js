sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],function (Controller,MessageBox,Fragment,MessageToast,Filter,FilterOperator) {
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
            
        },
        onCollapseExpandPress() {
			const oSideNavigation = this.byId("sideNavigation"),
				bExpanded = oSideNavigation.getExpanded();

			oSideNavigation.setExpanded(!bExpanded);
		},
        onAddOrdersPress(){
            this.hideallPanal();
            var oPanel= this.byId("addpanel");
            oPanel.setVisible(true);
        },
        onViewOrdersPress(){
            this.hideallPanal();
            var oPanel= this.byId("addpanel1");
            oPanel.setVisible(true);
        },
        onViewEditPress(){
            this.hideallPanal();
            var oPanel= this.byId("addpanel2");
            oPanel.setVisible(true);
        },
        hideallPanal(){
            this.byId("addpanel").setVisible(false);
            this.byId("addpanel1").setVisible(false);
            this.byId("addpanel2").setVisible(false);
        },
        OnActionPressed: function (oevent) {
            var that=this;
            var button = oevent.getSource();            
            var oContent = button.getBindingContext();
            this._oSelectedContext= oContent;

            if(!this.ActionSheet){
                Fragment.load({
                    id:this.getView().getId(),
                    name:"custorder.view.Actionsheet",
                    controller:this
                }).then(function (oActionSheet) {
                    that.ActionSheet = oActionSheet;
                    that.getView().addDependent(that.ActionSheet);
                    that.ActionSheet.openBy(button);
                }.bind(this));
            }else{
                this.ActionSheet.openBy(button);
            }
        },
        OnDeletePress: function (params) {
            var oContext= this._oSelectedContext;
            var orders = oContext.getProperty("OrderID");
            MessageBox.confirm("Do u need to delete the orders:" + orders+"?",{
                actions : [MessageBox.Action.Yes,MessageBox.Action.NO],
                onClose: function (oAction) {
                    if(oAction === MessageBox.Action.Yes){
                        oContext.delete("$direct").then(function(){
                            MessageBox.success("deleeted successfully")
                        }).catch(function (error) {
                             MessageBox.error("deleeted successfully")
                        })
                    }
                }
            })
        },
        OnEditPress: function () {
            var that = this
            var data = this._oSelectedContext.getObject();
            MessageToast.show("Edit action for item ID: " +data.OrderID);
            this.onViewEditPress();
            var omodel= this.getOwnerComponent().getModel();
            let afilter =[
                new Filter("OrderID",FilterOperator.EQ,data.OrderID)
            ];
            let OBinding = omodel.bindList("/Orders");
            OBinding.filter(afilter);

            OBinding.requestContexts().then(function (aContexts) {
                if(aContexts.length > 0){
                    aContexts.forEach((aContext) => {
                        let user = aContext.getObject();
                        that.getView().byId("_IDGenInput17").setValue(user.OrderID);
                        that.getView().byId("_IDGenInput11").setValue(user.CustomerID);
                        that.getView().byId("_IDGenInput21").setValue(user.EmployeeID);
                        that.getView().byId("_IDGenInput31").setValue(user.ShipName);
                    });
                }else{
                    MessageBox.error("Not Found");
                }
            }).catch(function (error) {
                 MessageBox.error("restricted");
            })
        },
        update: function () {
            var orderID = this.getView().byId("_IDGenInput17").getValue();
            var custID = this.getView().byId("_IDGenInput11").getValue();
            var empID = this.getView().byId("_IDGenInput21").getValue();
            var shipID = this.getView().byId("_IDGenInput31").getValue();
            var oModel = this.getView().getModel();      

            var spath = "/Orders('" + orderID + "')";
            var oContext= oModel.bindContext(spath).getBoundContext();

            var oview = this.getView();
            function resetbusy() {
                oview.setBusy(false);
            }
            oview.setBusy(true);
            oContext.setProperty("OrderID",orderID);
            oContext.setProperty("CustomerID",custID);
            oContext.setProperty("EmployeeID",empID);
            oContext.setProperty("ShipName",shipID);

            oModel.submitBatch("auto").then(function () {
                resetbusy();
                MessageBox.success("Update successfully");
            }).catch(function (error) {
                resetbusy();
                MessageBox.error("Update failed");
            })
        },
        OnDownloadPress: function () {
            const {jsPDF} = window.jspdf;
            var doc = new jsPDF('p','pt','a4');

            doc.setFontSize(14);
            doc.text("Order Report",40,40);
            var order= this._oSelectedContext.getObject();
            //add table
            var head = [['OrderID','CustomerID','EmployeeID','ShipName']];
            var body = [
                [order.OrderID,order.CustomerID,order.EmployeeID,order.ShipName]
            ]
            doc.autoTable({
                head:head,
                body:body,
                startY:60
            });

            doc.text("All Order",40,doc.lastAutoTable.finalY + 20);         

            var oModel = this.getView().getModel();
            var oBindings= oModel.bindList("/Orders");
            oBindings.requestContexts().then(function (aContexts) {
                var aOrders=[];
                aContexts.forEach(function (oContext) {
                    var order = oContext.getObject();
                    aOrders.push([
                        order.OrderID,order.CustomerID,order.EmployeeID,order.ShipName
                    ]);
                });
                doc.autoTable({
                    head:head,
                    body:aOrders,
                    startY:doc.lastAutoTable.finalY + 30
                });
                doc.save("Order_Report.pdf");
            });
            
        },
        onFetchSalesOrderData: async function(){
            try{
                var oLabel = new sap.m.Label({ text: "Enter the sales order number:",labelFor: oInput});
                var oInput = new sap.m.Input({ placeholder:"Sales order", width:"70%"});

                oLabel.addStyleClass("sapUiSmallMarginBeginEnd sapUiSmallMarginTop");
                oInput.addStyleClass("sapUiSmallMarginBeginEnd sapUiSmallMarginBottom");

                var oModel = this.getView().getModel();

                var oDialog = new sap.m.Dialog({
                    title: "Sales Order",
                    content: [oLabel, oInput],
                    beginButton: new sap.m.Button({
                        text: "Submit",
                        press: async function(){
                            var sOrderID = oInput.getValue();

                            const oFunction = oModel.bindContext('/readInvoiceNumber(...)');
                            oFunction.setParameter("salesOrderID", sOrderID);
                            await oFunction.execute();
                            const salesOrderDetails = oFunction.getBoundContext().getObject();

                            if(salesOrderDetails){
                                var FormattedText = 
                                    "Sales Order: " + salesOrderDetails.value[0].SalesOrder+"\n" +
                                    "Sales Order Item: "+ salesOrderDetails.value[0].SalesOrderItem + "\n" +
                                    "Requested Quantity: "+ salesOrderDetails.value[0].RequestedQuantity + "\n" +
                                    "Requested Quantity Unit: "+ salesOrderDetails.value[0].RequestedQuantityUnit;
                                MessageBox.information(FormattedText,{
                                    title: "Sales Order Details"
                                });

                            }
                            else{
                               console.log("No Item Details returned for this Sales Order"); 
                            }
                            oDialog.close();                        
                        }
                    }),
                    endButton: new sap.m.Button({
                        text:"Cancel",
                        press: function(){
                            oDialog.close();
                        }
                    }),
                    afterClose: function(){
                        oDialog.destroy();
                    }
                });
                oDialog.open();
            }
            catch(err){
                sap.m.MessageBox.error("Failed to fetch details");
            }
        }
    });
});