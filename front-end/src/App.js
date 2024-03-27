import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Principal from "./Pages/Principal";
import ListaDispositivos from "./Pages/ListaDispositivos";
import QRScanner from "./Pages/QRScanner";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

function App() {
  const [computadores, setComputadores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${config.serverHost}:${config.serverPort}/`)
      .then((resposta) => {
        if(resposta.data.length > 0 && resposta.data.length > computadores.length){
          resposta.data.map(computador => {
            const newComputer = {
              id: computador.id,
              nome: computador.nome,
              nomeSecretaria: computador.nomeSecretaria,
              nomeSetor: computador.nomeSetor,
              classe: computador.classe,
              numero: computador.numero,
              ip: computador.ip,
              mac: computador.mac,
              sn: computador.sn,
              mouse_sn: computador.mouse_sn,
              teclado_sn: computador.teclado_sn,
              monitor_sn: computador.monitor_sn
            };
            setComputadores((arrayAnterior) => [...arrayAnterior, newComputer]);
  
            const newFuncionario = {
              nome: computador.responsavel
            };
  
            setFuncionarios(arrayAnterior => [...arrayAnterior, newFuncionario]);
          });
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={() => <Principal setComputadores={setComputadores} setFuncionarios={setFuncionarios} />} />
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
