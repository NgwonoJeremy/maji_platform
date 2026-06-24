import React from 'react';
import './Admin_dash.css';
import Orders from '../data/Orders.json';
import Vendors from '../data/Vendor.json';
const AdminDashboard = () => {
  return(
  <div className="admin-body"> 
    <div className="main-body">
      <h1 className="dash-title">Admin Dashboard</h1>
      <section className="orders-container">
        <h2 className="table-heading">
          ORDERS TABLE
        </h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order_ID</th>
            <th>Customer</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Total Cost</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {Orders.map((order,index) =>(
           <tr key={index} className="order-row">
             <td className="order-id">{order.ID}</td>
             <td className="customer-name">{order.Customer}</td>
             <td className="location">{order.Location}</td>
             <td className="capacity">{order.Capacity}</td>
             <td className="amount">{order.Amount}</td>
             <td className="status">{order.Status}</td>
           </tr>
          )
          )}
        </tbody>
      </table>
      </section>
      
      <section className="vendor-container">
        <h2 className="table-heading">VENDOR VERIFICATION</h2>
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Vendor ID</th>
              <th>Vendor Name</th>
              <th>Location</th>
              <th>Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {Vendors.map((vendor,index) =>(
              <tr key={index} className="vendor-row">
                <td className="vendor-id">{vendor.ID}</td>
                <td className="vendor-name">{vendor.Name}</td>
                <td className="vendor-location">{vendor.Location}</td>
                <td className="vendor-status">{vendor.Status}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </section>

      <section className="analytics-section">
       <div className="analytics-container">
         <div className="total-revenue">
          <h4>Total Revenue</h4>
          <p>KSH. 45,000</p>
         </div>
         <div className="total-orders">
          <h4>Total Orders</h4>
          <p>50</p>
         </div>
       </div>
      </section>
    </div>
    
  </div>
    
  )
};

export default AdminDashboard;