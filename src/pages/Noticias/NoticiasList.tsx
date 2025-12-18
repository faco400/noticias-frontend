import { useEffect, useState } from "react";
import { Noticia } from '../../types/Noticia'
import { listarNoticias } from "../../services/noticias.service";
import './styles.css';

export default function NoticiasList() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    carregarNoticias();
  }, [page]);

  const carregarNoticias = async () => {
    setLoading(true);

    try {
      const res = await listarNoticias(page, limit);
      setNoticias(res.items);
      setTotal(res.total);
    } catch (error) {
      alert("Erro ao carregar notícias");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="Noticias">
      <h2>Notícias</h2>

      {loading && <p>Carregando...</p>}

      {!loading && noticias.length === 0 && (
        <p>Nenhuma notícia encontrada</p>
      )}

      <ul>
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            <div className="Noticia">
              <strong>{noticia.titulo}</strong>
              <p>{noticia.descricao}</p>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
