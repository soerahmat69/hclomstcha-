import "./App.css";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dasboard";
import Card from "./components/Card.product";
import axios from "axios";
import Order from "./components/Order";
import DashboardA from "./components/admin/Admin.dashboard";
import ProductA from "./components/admin/Admin.product";
import Profile from "./components/Profile";
import Booking from "./components/Booking";
import AdminReq from "./components/admin/Admin.request";


axios.defaults.withCredentials = true;

function App() {
  
  return (
    <Routers>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/card" element={<Card />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/admin/dashboard" element={<DashboardA />} />
        <Route path="/admin/product" element={<ProductA />} />
        <Route path="/admin/request" element={<AdminReq />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Routers>
  );
}

export default App;
