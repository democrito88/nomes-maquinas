import Formulario from "../Components/Formulario";
import { useEffect, useState } from "react";

export default function Principal({setComputadores, setFuncionarios}) {
    const [secretarias, setSecretarias] = useState([]);
    const [todosSetores, setTodosSetores] = useState([]);
    const serverHost = "192.168.11.131";
    const serverPort = 3001;

    useEffect(() => {
        fetch(`http://${serverHost}:${serverPort}/json/secretarias.json`)
            .then((resposta) => resposta.json())
            .then((dados) => setSecretarias(JSON.parse(dados)))
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

        fetch(`http://${serverHost}:${serverPort}/json/setores.json`)
            .then((resposta) => resposta.json())
            .then((dados) => setTodosSetores(JSON.parse(dados)))
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
                serverHost={serverHost}
                serverPort={serverPort}
                secretarias={secretarias}
                setComputadores={setComputadores}
                setFuncionarios={setFuncionarios}
            />
        </main>
    );
}