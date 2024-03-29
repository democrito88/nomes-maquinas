import { Container} from "react-bootstrap";
import TabelaComputadores from "../Components/TabelaComputadores";
import { useEffect, useState } from "react";
import Busca from "../Components/Busca/Index";
import config from "../config";
import axios from "axios";

export default function ListaDispositivos() {
  const [computadores, setComputadores] = useState([]);
  const [computadoresAExibir, setComputadoresAExibir] = useState(computadores);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${config.serverHost}:${config.serverPort}/`)
      .then((resposta) => {
        if(resposta.data.length > 0 && resposta.data.length > computadores.length){
          setComputadores([]);

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
            
            if(computadores.filter(comp => comp.id === newComputer.id).length === 0){
              setComputadores(arrayAnterior => [...arrayAnterior, newComputer]);
            }
            
            const newFuncionario = {
              nome: computador.responsavel
            };
  
            setFuncionarios(arrayAnterior => [...arrayAnterior, newFuncionario]);
            return 0;
          });
        }
      })
      .catch((error) => console.error(error));
  }, []);
  
  const handleBusca = (e) => {
    if(e.target.value === ""){
      setComputadoresAExibir(computadores);
      return;
    }

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
        <p>Nenhum dispositivo foi encontrado.</p>
      )}
    </Container>
  );
}