import {useEffect, useState} from "react";
import './App.css';
import { Button, Form } from "react-bootstrap";
import CopyToClipboardButton from "./Components/CopyToClipboardButton";
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

  useEffect(() => {
    fetch('http://192.168.11.131:3000/json/secretarias.json')
    .then(resposta => resposta.json())
    .then(dados => setSecretarias(dados));

    fetch('http://192.168.11.131:3000/json/setores.json')
    .then(resposta => resposta.json())
    .then(dados => setTodosSetores(dados));
  }, []);

  const handleSecretaria = (e) => {
    setSecretariaSelecionada(e.target.value);
    const novosSetores = todosSetores.filter(setor => setor.idSecretaria == e.target.value);
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

  const sendNome = () => {
    let nome = document.getElementById("nome").innerHTML;
    const resposta = axios.get('http://192.168.11.131:3001/', {nome: nome})
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <main className="conteudo">
        <h2 className="conteudo__titulo">gerador de nomes de computadores</h2>
        <form className="formulario">
          <Form.Select onChange={handleSecretaria}>
            <option>Selecione a secretaria</option>
            {secretarias? secretarias.map(secretaria => <option value={secretaria.id} key={secretaria.id}>{secretaria.sigla}</option>) : ""}
          </Form.Select>
          <Form.Select onChange={handleSetor}>
            {setores? setores.map(setor => <option value={setor.id} key={setor.id}>{setor.sigla+(setor.sigla === setor.nome ? `` : ` - ${setor.nome}`)}</option>) : ""}
          </Form.Select>
          <Form.Select onChange={handleClasse}>
            <option value="PC" >Personal Computer</option>
            <option value="NTBK" >Notebook</option>
            <option value="PRT" >Impressora</option>
            <option value="STPH">Smartphone</option>
            <option value="TBLT">Tablet</option>
            <option value="FW">Firewall</option>
          </Form.Select>
          <Form.Select onChange={handlePropriedade}>
            <option value="1" >Alugado</option>
            <option value="2" >Próprio (da casa)</option>
            <option value="3" >Particular</option>
          </Form.Select>
          <Form.Control type="number" onInput={handleNumero} placeholder="quantidade"/>
        </form>
        <div className="resultado">
          <h3>O nome é:</h3>
          <h1 id="nome">{`S${secretariaSelecionada}S${setorSelecionado}${classe}${propriedade}N${numero}`}</h1>
        </div>
        <CopyToClipboardButton textToCopy={`S${secretariaSelecionada}S${setorSelecionado}${classe}${propriedade}N${numero}`} />
        <Button onClick={sendNome}>Enviar</Button>
      </main>
    </div>
  );
}

export default App;
