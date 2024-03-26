import Modal from 'react-bootstrap/Modal';

function ModalComputador({handleClose, show, computador, funcionario}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{computador.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='detalhes'>
              <h4>Detalhes do dispositivo</h4>
              <ul>
                  <li>id: {computador.id}</li>
                  <li>nome: {computador.nome}</li>
                  <li>secretaria: {computador.nomeSecretaria}</li>
                  <li>setor: {computador.nomeSetor}</li>
                  <li>classe: {computador.classe}</li>
                  <li>número: {computador.numero}</li>
                  <li>status: {computador.status === 0 ? "a entregar" : "entregue"}</li>
                  <li>IP: {computador.ip}</li>
                  <li>MAC: {computador.mac}</li>
                  <li>Nº serial do dispositivo: {computador.sn}</li>
                  <li>Nº serial do mouse: {computador.mouse_sn}</li>
                  <li>Nº serial do teclado: {computador.teclado_sn}</li>
                  <li>Nº serial do monitor: {computador.monitor_sn}</li>
              </ul>
              {
              funcionario.nome ? 
              <div>
                <hr />
                <h4>Detalhes do funcionário responsável</h4>
                <ul>
                  <li>{funcionario.nome}</li>
                  <li>{funcionario.matricula}</li>
                  <li>{funcionario.setor}</li>
                  <li>{funcionario.funcao}</li>
                </ul>
              </div>
              : 
              <p>Este dispositivo ainda não está associado a nenhum funcionario.</p>
              }
              
            </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComputador;