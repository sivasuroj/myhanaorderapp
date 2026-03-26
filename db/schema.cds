namespace cap;

entity Orders { 

  key OrderID         : Integer;   
  CustomerID      : String(5);
  EmployeeID      : Integer;
  OrderDate       : DateTime;
  RequiredDate    : DateTime;
  ShippedDate     : DateTime;
  ShipVia         : Integer;
  Freight         : Decimal;
  ShipName        : String(40);
  ShipAddress     : String(60);
  ShipCity        : String(15);
  ShipRegion      : String(15);
  ShipPostalCode  : String(10);
  ShipCountry     : String(15);
  // 1:n Composition - similar to your "conversations"
  Order_Detail    : Association to many Order_Detail
                      on Order_Detail.OrderID = $self;
}


entity Order_Detail {

  key OrderID   : Association to Orders; 
  ProductID     : Integer;
  UnitPrice     : Decimal;
  Quantity      : Integer;   // Edm.Int16 → Integer
  Discount      : Decimal;   // Edm.Single → Decimal
}
