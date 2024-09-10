import { Container} from "react-bootstrap";
import TabelaComputadores from "../Components/TabelaComputadores";
import { useEffect, useState } from "react";
import Busca from "../Components/Busca/Index";
import config from "./../config.json";
import axios from "axios";

export default function ListaDispositivos() {
  const [computadores, setComputadores] = useState([]);
  const [computadoresAExibir, setComputadoresAExibir] = useState(computadores);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${config.serverHost}:${config.serverPort}/dispositivos`)
      .then((resposta) => {
        if (resposta.data.length > 0 && resposta.data.length > computadores.length) {
          const novosComputadores = []; // Temporary array to store new computers
          const novosFuncionarios = []; // Temporary array to store new employees
          console.log(resposta);
          resposta.data.forEach(computador => {
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
            
            if (!computadores.some(comp => comp.id === newComputer.id)) {
              novosComputadores.push(newComputer);
            }
  
            const newFuncionario = { nome: computador.responsavel };
            novosFuncionarios.push(newFuncionario);
          });

          setComputadores([...computadores, ...novosComputadores]); // Update state once
          setFuncionarios([...funcionarios, ...novosFuncionarios]); // Update state once
        }
      })
      .catch((error) => console.error(error));
  }, [computadores, funcionarios]); // Add dependencies to useEffect
  
  
  const handleBusca = (e) => {
    if(e.target.value === ""){
      setComputadoresAExibir(computadores);
      return;
    }
    console.log(e.target.value);
    setComputadoresAExibir(() => computadores.filter(computador => computador.nome.includes(e.target.value)));
  }

  return (
    <Container>
      <Busca handleBusca={handleBusca}/>
      {computadoresAExibir.length > 0 ? (
        <TabelaComputadores
          computadores={computadores}
          funcionarios={funcionarios}
        />
      ) : (
        computadores.length > 0 ?
        <TabelaComputadores
          computadores={computadores}
          funcionarios={funcionarios}
        />
        :
        <p>Nenhum dispositivo foi encontrado.</p>
      )}
    </Container>
  );
}