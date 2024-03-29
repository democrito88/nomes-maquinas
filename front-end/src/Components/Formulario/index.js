import { Button, Form } from "react-bootstrap";
import styles from "./Formulario.module.css";
import InputIPv4 from "../InputIPv4";
import InputMAC from "../InputMAC";
import CopyToClipboardButton from "../CopyToClipboardButton";
import { useState } from "react";
import axios from "axios";

export default function Formulario({todosSetores, serverHost, serverPort, secretarias}) {
    const [setores, setSetores] = useState([]);
    const [secretariaSelecionada, setSecretariaSelecionada] = useState(1);
    const [setorSelecionado, setSetorSelecionado] = useState(1);
    const [classe, setClasse] = useState("PC");
    const [propriedade, setPropriedade] = useState(1);
    const [numero, setNumero] = useState(0);

    const handleSecretaria = (e) => {
        setSecretariaSelecionada(e.target.value);
        setSetorSelecionado(1);
        const novosSetores = todosSetores.filter(
            (setor) => Number(setor.idSecretaria) === Number(e.target.value)
        );
        setSetores(novosSetores);
    };

    const handleSetor = (e) => {
        setSetorSelecionado(e.target.value);
    };

    const handleClasse = (e) => {
        setClasse(e.target.value);
    };

    const handlePropriedade = (e) => {
        setPropriedade(e.target.value);
    };

    const handleNumero = (e) => {
        setNumero(e.target.value);
    };

    const enviar = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let nome = document.getElementById("nome").innerHTML;
        axios
            .post(`http://${serverHost}:${serverPort}/`, {
                nome: nome,
                secretaria_id: formData.get("secretaria_id"),
                setor_id: formData.get("setor_id"),
                classe: formData.get("classe"),
                numero: formData.get("numero"),
                mac: formData.get("mac"),
                ip: formData.get("ip"),
                propriedade: formData.get("propriedade"),
                sn: formData.get("sn"),
                teclado_sn: formData.get("teclado_sn"),
                mouse_sn: formData.get("mouse_sn"),
                monitor_sn: formData.get("monitor_sn"),
                responsavel: formData.get("responsavel"),
                linkTermo: formData.get("linkTermo"),
            })
            .then((data) => {
                /*const newComputer = {
                    id: data.data[0].id,
                    nome: data.data[0].nome,
                    nomeSecretaria: data.data[0].nomeSecretaria,
                    nomeSetor: data.data[0].nomeSetor,
                    classe: data.data[0].classe,
                    numero: data.data[0].numero,
                    ip: data.data[0].ip,
                    mac: data.data[0].mac,
                    sn: data.data[0].sn,
                    mouse_sn: data.data[0].mouse_sn,
                    teclado_sn: data.data[0].teclado_sn,
                    monitor_sn: data.data[0].monitor_sn
                };*/

                console.log(data);
                /*const newFuncionario = {
                    nome: data.data[0].responsavel,
                };*/

                //setComputadores((arrayAnterior) => [...arrayAnterior, newComputer]);
                //setFuncionarios((arrayAnterior) => [...arrayAnterior, newFuncionario]);
                document
                    .querySelectorAll("input")
                    .forEach((input) => (input.value = ""));
                document
                    .querySelectorAll("select")
                    .forEach((select) => (select.value = ""));
                setSetores([]);
                setSecretariaSelecionada(1);
                setSetorSelecionado(1);
                setClasse("PC");
                setPropriedade(1);
                setNumero(0);
            })
            .catch((error) => console.error(error));
    };

    return (
        <main className={styles.conteudo}>
            <h2 className={styles.conteudo__titulo}>gerador de nomes de computadores</h2>
            <Form className={styles.formulario} onSubmit={enviar}>
                <Form.Select name="secretaria_id" onChange={handleSecretaria}>
                    <option>Selecione a secretaria</option>
                    {secretarias
                        ? secretarias.map((secretaria) => (
                            <option value={secretaria.codigo} key={secretaria.id}>
                                {secretaria.sigla}
                            </option>
                        ))
                        : ""}
                </Form.Select>
                <Form.Select name="setor_id" onChange={handleSetor}>
                    {setores
                        ? setores.map((setor) => (
                            <option value={setor.codigo} key={setor.id}>
                                {setor.sigla +
                                    (setor.sigla === setor.nome ? `` : ` - ${setor.nome}`)}
                            </option>
                        ))
                        : ""}
                </Form.Select>
                <Form.Select name="classe" onChange={handleClasse}>
                    <option>Dispositivo</option>
                    <option value="PC">Personal Computer</option>
                    <option value="NTBK">Notebook</option>
                    <option value="PRT">Impressora</option>
                    <option value="STPH">Smartphone</option>
                    <option value="TBLT">Tablet</option>
                    <option value="FW">Firewall</option>
                </Form.Select>
                <Form.Select name="propriedade" onChange={handlePropriedade}>
                    <option>Propriedade</option>
                    <option value="1">Alugado</option>
                    <option value="2">Próprio (da casa)</option>
                    <option value="3">Particular</option>
                </Form.Select>
                <Form.Control
                    name="numero"
                    type="number"
                    onInput={handleNumero}
                    placeholder="número da máquina"
                />
                <InputMAC />
                <InputIPv4 />
                <Form.Control name="sn" placeholder="número serial da máquina" />
                <Form.Control
                    name="teclado_sn"
                    placeholder="número serial do teclado"
                />
                <Form.Control name="mouse_sn" placeholder="número serial do mouse" />
                <Form.Control
                    name="monitor_sn"
                    placeholder="número serial do monitor"
                />
                <Button type="submit">Enviar</Button>
            </Form>
            <div className={styles.resultado}>
                <h3>O nome é:</h3>
                <CopyToClipboardButton
                    textToCopy={`S${secretariaSelecionada}S${setorSelecionado}${classe}${propriedade}N${numero}`}
                />
            </div>
        </main>
    );
}