import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Principal from "./Pages/Principal";
import ListaDispositivos from "./Pages/ListaDispositivos";
import QRScanner from "./Pages/QRScanner";
import NavBar from "./Components/NavBar";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={() => <Principal />} />
        <Route path="/lista" Component={() => <ListaDispositivos />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
