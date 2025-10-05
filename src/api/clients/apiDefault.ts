import { mapearMensagemErro } from "@/utils/messageErrorMap";
import axios from "axios";

export const apiDefault = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiDefault.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const mensagemErro = mapearMensagemErro(erro);
    return Promise.reject({
      mensagemErro,
      erro,
    });
  }
);
