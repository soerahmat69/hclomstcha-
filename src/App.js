import "./App.css";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";//library react router dom
import { useState,useEffect } from "react";
//component main file
import Login from "./components/Login";
import Dashboard from "./components/Dasboard";
import axios from "axios";
import Order from "./components/Order";
import DashboardA from "./components/admin/Admin.dashboard";
import ProductA from "./components/admin/Admin.product";
import Profile from "./components/Profile";
import Booking from "./components/Booking";
import AdminReq from "./components/admin/Admin.request";
import AdmProfile from "./components/admin/Profile";
import AdmChat from "./components/admin/Admin.chat";
import UsrChat from "./components/User.chat";
import RiwayatOrd from "./components/Riwayat.order";
import SignUp from "./components/Signup";
import Biodata from "./components/admin/Admin.biodata";
import AdminAcc from "./components/admin/Admin.accept";
import OrderAcc from "./components/admin/Admin.order.acc";
import IncAcessories from "./components/admin/Admin.include";
import User from "./components/admin/Admin.user";
import ChatList from "./components/admin/Admin.chat.list";
import OrderRejc from "./components/admin/Admin.order.rejected";

//session 
axios.defaults.withCredentials = true;

function App() {
  let  [validUser, setValidUser] = useState(localStorage.getItem('user'));
  let  [validAdmin, setValidAdmin] = useState(localStorage.getItem('admin'));


  return (
    //router unutk melakukan dan aksesing page url link 
    
    <Routers>
      <Routes>
        <Route exact path="/" element={<Login admin={(id)=>setValidAdmin(id)} user={(id)=>setValidUser(id)} />} />
        <Route path="/dashboard" element={<Dashboard user={validUser}/>} />
        <Route path="/order/:id" element={<Order user={validUser}/>} />
        <Route path="/profile" element={<Profile user={validUser}/>} />
        <Route path="/signup" element={<SignUp user={validUser}/>} />
        <Route path="/booking" element={<Booking user={validUser}/>} />
        <Route path="/chat" element={<UsrChat user={validUser}/>} />
        <Route path="/riwayat" element={<RiwayatOrd user={validUser}/>} />

        <Route path="/admin/dashboard" element={<DashboardA admin={validAdmin}/>} />
        <Route path="/admin/product" element={<ProductA admin={validAdmin}/>} />
        <Route path="/admin/request" element={<AdminReq admin={validAdmin}/>} />
        <Route path="/admin/accept" element={<AdminAcc admin={validAdmin}/>} />
        <Route path="/admin/accept/list" element={<OrderAcc admin={validAdmin}/>} />
        <Route path="/admin/accept/detail/:order_id" element={<OrderAcc admin={validAdmin}/>} />
        <Route path="/admin/profile" element={<AdmProfile admin={validAdmin}/>} />
        <Route path="/admin/chat" element={<ChatList admin={validAdmin}/>} />
        <Route path="/admin/chat/:id" element={<AdmChat admin={validAdmin}/>} />
        <Route path="/admin/include/:id" element={<IncAcessories admin={validAdmin}/>} />
        <Route path="/admin/biodata/:id" element={<Biodata admin={validAdmin}/>} />
        <Route path="/admin/user" element={<User admin={validAdmin}/>} />
        <Route path="/admin/reject" element={<OrderRejc admin={validAdmin}/>} />
        
      </Routes>
    </Routers>
  );
}

export default App;
