import { Form } from "react-bootstrap";

function Busca({handleBusca}) {
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="busque pelo nome"
        onInput={handleBusca}
      />
    </Form>
  );
}

export default Busca;
