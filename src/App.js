import "./App.css";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dasboard";

function App() {
  return (
    <Routers>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Routers>
  );
}

export default App;
