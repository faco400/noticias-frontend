import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BuscaCep from './index';
import { api } from '../../services/api';

jest.mock('../../services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('Busca de CEP', () => {
  it('dado um usuário logado, ao informar um CEP válido, deve buscar e exibir endereço', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        cep: '68455709',
        logradouro: 'Bloco H',
        bairro: 'Vila Permanente',
        localidade: 'Tucuruí',
        uf: 'PA',
        estado: 'Pará',
        regiao: 'Norte',
        ibge: '1508100'
      },
    });

    render(<BuscaCep />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP'), {
      target: { value: '68455709' },
    });

    fireEvent.click(screen.getByText('Buscar'));

    await waitFor(() => {
      expect(screen.getByText('Bloco H')).toBeInTheDocument();
      expect(screen.getByText('Vila Permanente')).toBeInTheDocument();
      expect(screen.getByText('Tucuruí')).toBeInTheDocument();
      expect(screen.getByText('PA')).toBeInTheDocument();
      expect(screen.getByText('Pará')).toBeInTheDocument();
      expect(screen.getByText('Norte')).toBeInTheDocument();
      expect(screen.getByText('1508100')).toBeInTheDocument();
    });
  });

  it('dado um usuário logado, ao informar um CEP incompleto, não deve buscar na api e exibir erro da quantidade de digitos insuficientes', async () => {

    render(<BuscaCep />);

    fireEvent.change(screen.getByPlaceholderText('Digite o CEP'), {
      target: { value: '684' },
    });

    fireEvent.click(screen.getByText('Buscar'));

    
    expect(screen.getByText('CEP deve conter 8 dígitos')).toBeInTheDocument();

    expect(api.get).not.toHaveBeenCalled();
    

  });
});