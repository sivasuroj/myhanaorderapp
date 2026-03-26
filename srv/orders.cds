using { cap as my } from '../db/schema';

service OrderService @(path:'/orderservice') { 
    
  entity Orders as projection on my.Orders;
  entity Order_Detail as projection on my.Order_Detail;
}