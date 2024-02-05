import { useState } from "react";
import ModalComputador from "../ModalComputador";

export default function LinhaTabela({computador, funcionario}){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <tr>
                <td>{computador.id}</td>
                <td>{computador.nome}</td>
                <td>{computador.nomeSecretaria}</td>
                <td>{computador.nomeSetor}</td>
                <td>{computador.classe}</td>
                <td>{computador.numero}</td>
                <td>{computador.status ? `entregue` : "a entregar"}</td>
                <td>{funcionario ? funcionario.responsavel : "-"}</td>
                <td>{computador.linkTermo ?? "-"}</td>
                <td>
                    <button alt="detalhes..." onClick={handleShow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z"/>
                        </svg>
                    </button>
                </td>
            </tr>
            <ModalComputador handleClose={handleClose} handleShow={handleShow} show={show} computador={computador} funcionario={funcionario}/>
        </>
    );
}