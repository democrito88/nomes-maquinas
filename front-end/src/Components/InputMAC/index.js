import { useState } from "react";
import { Form } from "react-bootstrap";

function formatMAC(value) {
    let parts = [];
    value = value.split(":").join('');

    for (let i = 0; i < value.length; i += 2) {
        parts.push(value.slice(i, i + 2));
    }

    if (parts.length > 6) {
        parts = parts.slice(0, 6);
    }

    return parts.join(':');
}

export default function InputMAC() {
    const [mac, setMac] = useState("");

    const handleMACInput = (e) => {
        let value = e.target.value.toUpperCase().replace(/[^A-F0-9:]/g, ''); // Remove non-alphanumeric and non-colon characters
        setMac(formatMAC(value));
    }

    return <Form.Control name="mac" placeholder="mac" onInput={handleMACInput} value={mac}/>
}