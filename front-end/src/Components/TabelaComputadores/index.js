import { Table } from "react-bootstrap";
import LinhaTabela from "./../LinhaTabela";

export default function TabelaComputadores({computadores}){
    return (
    <Table striped bordered hover>
        <thead>
            <tr>
                <td>Nome</td>
                <td>Secretaria</td>
                <td>Setor</td>
                <td>Classe</td>
                <td>#</td>
            </tr>
        </thead>
        <tbody>
            {computadores.map(computador => <LinhaTabela key={computador.nome} computador={computador} />)}
        </tbody>
    </Table>
    );
}