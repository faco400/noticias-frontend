import axios from "axios";
import { Noticia } from "../types/Noticia";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export interface NoticiasResponse {
  items: Noticia[];
  total: number;
  page: number;
  limit: number;
}

export const listarNoticias = async (
  page = 1,
  limit = 10
): Promise<NoticiasResponse> => {
  const { data } = await api.get("/noticias", {
    params: { page, limit },
  });
  return data;
};

export const criarNoticia = async (
  noticia: Omit<Noticia, "id">
) => {
  const { data } = await api.post("/noticias", noticia);
  return data;
};

export const atualizarNoticia = async (
  id: number,
  noticia: Omit<Noticia, "id">
) => {
  const { data } = await api.put(`/noticias/${id}`, noticia);
  return data;
};

export const deletarNoticia = async (id: number) => {
  await api.delete(`/noticias/${id}`);
};