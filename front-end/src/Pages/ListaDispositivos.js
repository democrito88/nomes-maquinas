import { Container, Form} from "react-bootstrap";
import TabelaComputadores from "../Components/TabelaComputadores";
import { useState } from "react";


export default function ListaDispositivos({ computadores, funcionarios, setComputadores, setFuncionarios }) {
  const [computadoresAExibir, setComputadoresAExibir] = useState(computadores);
  
  const handleBusca = (e) => {
     setComputadoresAExibir(
      computadores.filter(
        computador =>
          computador.nome.includes(e.target.value)
          )
      );
  }

  return (
    <Container>
      <Form>
        <Form.Control type="text" placeholder="busque pelo nome" onInput={handleBusca}/>
      </Form>
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