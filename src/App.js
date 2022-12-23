import "./App.css";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dasboard";
import Card from "./components/Card.product";
import axios from "axios";
import Order from "./components/Order";

axios.defaults.withCredentials = true;

function App() {
  
  return (
    <Routers>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/Order" element={<Order />} />
      </Routes>
    </Routers>
  );
}

export default App;
