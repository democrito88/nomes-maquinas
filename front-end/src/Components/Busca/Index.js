import "./Busca.css";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

function Busca({ handleBusca }) {
  return (
    <Form className="form-busca">
      <InputGroup className="mb-3 inputgroup-busca">
        <Form.Control
          type="text"
          placeholder="busque pelo nome"
          onInput={handleBusca}
          className="input-busca"
        />
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

export default Busca;
