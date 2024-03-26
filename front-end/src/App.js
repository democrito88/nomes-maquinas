import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Principal from "./Pages/Principal";
import ListaDispositivos from "./Pages/ListaDispositivos";
import QRScanner from "./Pages/QRScanner";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [computadores, setComputadores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const serverHost = "192.168.11.131";
  const serverPort = 3001;

  useEffect(() => {

    axios
      .get(`http://${serverHost}:${serverPort}/`)
      .then((resposta) => {
        if (resposta.data.length > 0) {
          const newComputer = {
            id: resposta.data[0].id,
            nome: resposta.data[0].nome,
            nomeSecretaria: resposta.data[0].nomeSecretaria,
            nomeSetor: resposta.data[0].nomeSetor,
            classe: resposta.data[0].classe,
            numero: resposta.data[0].numero,
            ip: resposta.data[0].ip,
            mac: resposta.data[0].mac,
            sn: resposta.data[0].sn,
            mouse_sn: resposta.data[0].mouse_sn,
            teclado_sn: resposta.data[0].teclado_sn,
            monitor_sn: resposta.data[0].monitor_sn
          };
          setComputadores((arrayAnterior) => [...arrayAnterior, newComputer]);

          const newFuncionario = {
            nome: resposta.data[0].responsavel
          };

          setFuncionarios(arrayAnterior => [...arrayAnterior, newFuncionario]);
        }
      })
      .catch((error) => console.error(error));
  }, [])
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
