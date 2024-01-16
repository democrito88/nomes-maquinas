import React from "react";
export default function LinhaTabela({computador}){
    return (
    <tr>
        <td>{computador.nome}</td>
        <td>{computador.secretaria}</td>
        <td>{computador.setor}</td>
        <td>{computador.classe}</td>
        <td>{computador.numero}</td>
    </tr>
    );
}