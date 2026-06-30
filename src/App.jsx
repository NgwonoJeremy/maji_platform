import Home from "./pages/Home";
import Roles from "./pages/Roles";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </BrowserRouter>
import 'leaflet/dist/leaflet.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerDashboard from "./Pages/customer/CustomerDashboard";
import AdminDashboard from './Pages/admin/Admin_dash';
import AllOrders from './Pages/admin/AllOrders';
import AllVendors from './Pages/admin/AllVendors';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/vendors" element={<AllVendors />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;