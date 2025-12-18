import { useState } from 'react';
import { api } from '../../services/api';
import './styles.css';

interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
}

export default function BuscaCep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarCep = async () => {
    if (cep.length !== 8) {
      setErro('CEP deve conter 8 dígitos');
      return;
    }

    try {
      setLoading(true);
      setErro('');
      setEndereco(null);

      const response = await api.get(`/ws/${cep}/json/`);

      if (response.data.erro) {
        setErro('CEP não encontrado');
        return;
      }

      setEndereco(response.data);
    } catch {
      setErro('Erro ao buscar o CEP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Busca de Endereço por CEP</h1>

      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
        maxLength={8}
      />

      <button onClick={buscarCep} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {erro && <p className="erro">{erro}</p>}

      {endereco && (
        <div className="resultado">
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>UF:</strong> {endereco.uf}</p>
          <p><strong>Estado:</strong> {endereco.estado}</p>
          <p><strong>Região:</strong> {endereco.regiao}</p>
          <p><strong>IBGE:</strong> {endereco.ibge}</p>
        </div>
      )}
    </div>
  );
}