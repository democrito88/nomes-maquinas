import { Col, Container, Row, Table } from "react-bootstrap";
import LinhaTabela from "./../LinhaTabela";

export default function TabelaComputadores({computadores}){
    return (
        <Container direction="column" className="justify-content-center">
            <Row className="justify-content-center">
                <Col className="mx-auto">
                    <h3>Dispositivos já cadastrados</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mx-auto">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Nome</td>
                                <td>Secretaria</td>
                                <td>Setor</td>
                                <td>Classe</td>
                                <td>#</td>
                                <td>Status</td>
                                <td>Responsável</td>
                                <td>Link para o Termo</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {computadores.map(computador => <LinhaTabela key={computador.id} computador={computador} />)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}