import { Container } from "react-bootstrap";
import TabelaComputadores from "../Components/TabelaComputadores";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ListaDispositivos(){
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

    return(
        <Container>
        {computadores ? (
          <TabelaComputadores
            computadores={computadores}
            funcionarios={funcionarios}
          />
        ) : (
          <p>Ainda não foi cadastrado nenhum dispositivo</p>
        )}
      </Container>
    );
}