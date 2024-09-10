import Formulario from "../Components/Formulario";
import { useEffect, useState } from "react";
import config from "./../config.json";

export default function Principal({setComputadores, setFuncionarios}) {
    const [secretarias, setSecretarias] = useState([]);
    const [todosSetores, setTodosSetores] = useState([]);

    useEffect(() => {
        fetch(`http://${config.serverHost}:${config.serverPort}/json/secretarias.json`)
            .then((resposta) => resposta.json())
            .then((dados) => setSecretarias(dados))
            .catch(error => {
                console.error(error);
                setSecretarias([
                    {
                        id: 0,
                        codigo: 0,
                        sigla: "não foi possível estabelecer conexão com o servidor"
                    }
                ]);
            });

        fetch(`http://${config.serverHost}:${config.serverPort}/json/setores.json`)
            .then((resposta) => resposta.json())
            .then((dados) => setTodosSetores(dados))
            .catch(error => {
                console.error(error);
                setTodosSetores([
                    {
                        id: 0,
                        codigo: 0,
                        sigla: "não foi possível estabelecer conexão com o servidor",
                        nome: "não foi possível estabelecer conexão com o servidor",
                    }
                ]);
            });
    }, []);

    return (
        <main>
            <Formulario
                todosSetores={todosSetores}
                serverHost={config.serverHost}
                serverPort={config.serverPort}
                secretarias={secretarias}
                setComputadores={setComputadores}
                setFuncionarios={setFuncionarios}
            />
        </main>
    );
}