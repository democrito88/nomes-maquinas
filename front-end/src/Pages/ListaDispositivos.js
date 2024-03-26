import { Container } from "react-bootstrap";
import TabelaComputadores from "../Components/TabelaComputadores";


export default function ListaDispositivos({computadores, funcionarios, setComputadores, setFuncionarios}){
    

    return(
        <Container>
        {computadores.length > 0 ? (
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