import { Form } from "react-bootstrap";

function aplicaMarscaraIPv4(input) {
    let value = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    value = insertDots(value);

    if (value.length > 15) {
        value = value.slice(0, 15);
    }

    return value;
}

function insertDots(value) {
    const parts = [];
    for (let i = 0; i < value.length; i += 3) {
        parts.push(value.slice(i, i + 3));
    }
    return parts.join('.');
}

const handleIp = (e) => {
    document.getElementsByName("ip")[0].value = aplicaMarscaraIPv4(e.target.value);
};

export default function InputIPv4() {
    return <Form.Control name="ip" placeholder="ip" onInput={handleIp} />
}