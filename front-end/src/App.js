import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Principal from "./Pages/Principal";
import ListaDispositivos from "./Pages/ListaDispositivos";
import NavBar from "./Components/NavBar";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={() => <Principal />} />
        <Route path="/lista" Component={() => <ListaDispositivos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
