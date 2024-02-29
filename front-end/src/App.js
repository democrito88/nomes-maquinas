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
        <Route path="/" Component={() => <Principal setComputadores={setComputadores} setFuncionarios={setFuncionarios}/>} />
        <Route path="/lista" Component={() => <ListaDispositivos 
                                                computadores={computadores} 
                                                funcionarios={funcionarios}
                                                setComputadores={setComputadores}
                                                setFuncionarios={setFuncionarios}
                                                />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
