import React from "react";
export default function LinhaTabela({computador}){
    return (
    <tr>
        <td>{computador.nome}</td>
        <td>{computador.nomeSecretaria}</td>
        <td>{computador.nomeSetor}</td>
        <td>{computador.classe}</td>
        <td>{computador.numero}</td>
    </tr>
    );
}