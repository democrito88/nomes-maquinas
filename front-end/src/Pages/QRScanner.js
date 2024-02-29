import { Stack } from "react-bootstrap";
import Scanner from "../Components/Scanner";
import WebcamCapture from "../Components/WebcamCapture";

export default function QRScanner() {


    return (
        <Stack gap={3}>
            <Scanner />
            <WebcamCapture />
        </Stack>
    );
}