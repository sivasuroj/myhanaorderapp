using { cap as my } from '../db/schema';
using {sap.common} from '@sap/cds/common';
service OrderService @(path:'/orderservice') { 
    
  entity Orders as projection on my.Orders;
  entity Order_Detail as projection on my.Order_Detail;
  function readInvoiceNumber(salesOrderID:String) returns String;
}