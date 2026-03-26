using OrderService as service from '../../srv/orders';
annotate service.Orders with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'OrderID',
                Value : OrderID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CustomerID',
                Value : CustomerID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'EmployeeID',
                Value : EmployeeID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'OrderDate',
                Value : OrderDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RequiredDate',
                Value : RequiredDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShippedDate',
                Value : ShippedDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipVia',
                Value : ShipVia,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Freight',
                Value : Freight,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipName',
                Value : ShipName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipAddress',
                Value : ShipAddress,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipCity',
                Value : ShipCity,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipRegion',
                Value : ShipRegion,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipPostalCode',
                Value : ShipPostalCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ShipCountry',
                Value : ShipCountry,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'OrderID',
            Value : OrderID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CustomerID',
            Value : CustomerID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'EmployeeID',
            Value : EmployeeID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'OrderDate',
            Value : OrderDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'RequiredDate',
            Value : RequiredDate,
        },
    ],
);

