import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

import BuscaCep from "./pages/BuscaCep";
import NoticiasList from "./pages/Noticias/NoticiasList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Choices">
          <h1>Prova Técnica</h1>

          {/* MENU */}
          <nav style={{ marginBottom: 20 }}>
            <Link to="/cep" style={{ marginRight: 16 }}>
              Buscar CEP
            </Link>

            <Link to="/noticias">
              Notícias
            </Link>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/cep" />} />
          <Route path="/cep" element={<BuscaCep />} />
          <Route path="/noticias" element={<NoticiasList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
