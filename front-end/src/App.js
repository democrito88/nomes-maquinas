import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Principal from "./Pages/Principal";
import ListaDispositivos from "./Pages/ListaDispositivos";
import QRScanner from "./Pages/QRScanner";
import NavBar from "./Components/NavBar";
import { useState } from "react";

function App() {
  const [computadores, setComputadores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Principal />} children={[setComputadores, setFuncionarios]} />
        <Route path="/lista" element={<ListaDispositivos children={[computadores, funcionarios]}/>} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
