import 'leaflet/dist/leaflet.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import CustomerDashboard from "./Pages/customer/CustomerDashboard";
import AdminDashboard from './Pages/admin/Admin_dash';
import AllOrders from './Pages/admin/AllOrders';
import AllVendors from './Pages/admin/AllVendors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/orders" element={<AllOrders />} />
        <Route path="/vendors" element={<AllVendors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;