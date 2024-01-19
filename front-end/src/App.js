import {useEffect, useState} from "react";
import './App.css';
import { Button, Container, Form } from "react-bootstrap";
import CopyToClipboardButton from "./Components/CopyToClipboardButton";
import TabelaComputadores from "./Components/TabelaComputadores";
import axios from 'axios';

function App() {
  const [secretarias, setSecretarias] = useState([]);
  const [todosSetores, setTodosSetores] = useState([]);
  const [setores, setSetores] = useState([]);
  const [secretariaSelecionada, setSecretariaSelecionada] = useState(1);
  const [setorSelecionado, setSetorSelecionado] = useState(1);
  const [classe, setClasse] = useState("PC");
  const [propriedade, setPropriedade] = useState(1);
  const [numero, setNumero] = useState(0);
  const [computadores, setComputadores] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const localhost = '192.168.11.131';
  const serverPort = 3001;

  useEffect(() => {
    fetch(`http://${localhost}:3000/json/secretarias.json`)
    .then(resposta => resposta.json())
    .then(dados => setSecretarias(dados));

    fetch(`http://${localhost}:3000/json/setores.json`)
    .then(resposta => resposta.json())
    .then(dados => setTodosSetores(dados));

    axios.get(`http://${localhost}:${serverPort}/`)
    .then(resposta => {setComputadores(resposta.data); console.log(computadores);})
    .catch(error => console.error(error));
  }, [computadores]);

  const handleSecretaria = (e) => {
    setSecretariaSelecionada(e.target.value);
    const novosSetores = todosSetores.filter(setor => setor.idSecretaria === e.target.value);
    setSetores(novosSetores);
  }

  const handleSetor = (e) => {
    setSetorSelecionado(e.target.value);
  }

  const handleClasse = (e) => {
    setClasse(e.target.value);
  }

  const handlePropriedade = (e) => {
    setPropriedade(e.target.value);
  }
  
  const handleNumero = (e) => {
    setNumero(e.target.value);
  }

  const enviar = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let nome = document.getElementById("nome").innerHTML;
    axios.post(`http://${localhost}:${serverPort}/`, {
      nome: nome,
      secretaria_id: formData.get('secretaria_id'),
      setor_id: formData.get('setor_id'),
      classe: formData.get('classe'),
      numero: formData.get('numero'),
      mac: formData.get('mac'),
      ip: formData.get('ip'),
      propriedade: formData.get('propriedade'),
      sn: formData.get('sn'),
      teclado_sn: formData.get('teclado_sn'),
      mouse_sn: formData.get('mouse_sn'),
      monitor_sn: formData.get('monitor_sn'),
      responsavel: formData.get('responsavel'),
      linkTermo: formData.get('linkTermo'),
    })
    .then(data => {
      console.log(data.data);
      setComputadores(arrayAnterior => [...arrayAnterior, data.data[0]]);
      document.querySelectorAll("input").forEach(input => input.value = "");
      document.querySelectorAll("select").forEach(select => select.value = "");
    })
    .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <main className="conteudo">
        <h2 className="conteudo__titulo">gerador de nomes de computadores</h2>
        <Form className="formulario" onSubmit={enviar}>
          <Form.Select name="secretaria_id" onChange={handleSecretaria}>
            <option>Selecione a secretaria</option>
            {secretarias? secretarias.map(secretaria => <option value={secretaria.id} key={secretaria.id}>{secretaria.sigla}</option>) : ""}
          </Form.Select>
          <Form.Select name="setor_id" onChange={handleSetor}>
            {setores? setores.map(setor => <option value={setor.id} key={setor.id}>{setor.sigla+(setor.sigla === setor.nome ? `` : ` - ${setor.nome}`)}</option>) : ""}
          </Form.Select>
          <Form.Select name="classe" onChange={handleClasse}>
            <option>Classe</option>
            <option value="PC" >Personal Computer</option>
            <option value="NTBK" >Notebook</option>
            <option value="PRT" >Impressora</option>
            <option value="STPH">Smartphone</option>
            <option value="TBLT">Tablet</option>
            <option value="FW">Firewall</option>
          </Form.Select>
          <Form.Select name="propriedade" onChange={handlePropriedade}>
            <option>Propriedade</option>
            <option value="1" >Alugado</option>
            <option value="2" >Próprio (da casa)</option>
            <option value="3" >Particular</option>
          </Form.Select>
          <Form.Control name="numero" type="number" onInput={handleNumero} placeholder="número"/>
          <Form.Control name="mac" placeholder="mac"/>
          <Form.Control name="ip" placeholder="ip"/>
          <Form.Control name="sn" placeholder="número serial"/>
          <Form.Control name="tecladop_sn" placeholder="número serial do teclado"/>
          <Form.Control name="mouse_sn" placeholder="número serial do mouse"/>
          <Form.Control name="monitor_sn" placeholder="número serial do monitor"/>
          <Button type="submit">Enviar</Button>
        </Form>
        <div className="resultado">
          <h3>O nome é:</h3>
          <CopyToClipboardButton textToCopy={`S${secretariaSelecionada}S${setorSelecionado}${classe}${propriedade}N${numero}`} />
        </div>
      </main>
      <Container>
        {computadores ? <TabelaComputadores computadores={computadores} funcionarios={funcionarios}/> : <p>Ainda não foi cadastrado nenhum dispositivo</p>}
      </Container>
    </div>
  );
}

export default App;
