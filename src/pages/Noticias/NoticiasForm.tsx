import { useState } from "react";

export default function NoticiasForm() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <form>
      <h3>Nova Notícia</h3>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
