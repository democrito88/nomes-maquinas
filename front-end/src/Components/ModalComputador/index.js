import Modal from 'react-bootstrap/Modal';

function ModalComputador({handleClose, show, computador}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{computador.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <li>id: {computador.id}</li>
                <li>nome: {computador.nome}</li>
                <li>secretaria: {computador.nomeSecretaria}</li>
                <li>setor: {computador.nomeSetor}</li>
                <li>classe: {computador.classe}</li>
                <li>número: {computador.numero}</li>
                <li>status: {computador.status === 0 ? "a entregar" : "entregue"}</li>
                <li>status: {computador.sn}</li>
                <li>IP: {computador.ip}</li>
                <li>MAC: {computador.mac}</li>
                <li>Nº serial do dispositivo: {computador.sn}</li>
                <li>Nº serial do mouse: {computador.mouse_sn}</li>
                <li>Nº serial do teclado: {computador.teclado_sn}</li>
                <li>Nº serial do monitor: {computador.monitor_sn}</li>
            </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComputador;