import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './App.css';


import AdminDashboard from './Pages/admin/Admin_dash';
import AllOrders from './Pages/admin/AllOrders';
import AllVendors from './Pages/admin/AllVendors';
import CustomerDashboard from "./Pages/customer/CustomerDashboard";
import './App.css';

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