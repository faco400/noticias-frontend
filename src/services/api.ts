import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://viacep.com.br',
  timeout: 5000,
});
