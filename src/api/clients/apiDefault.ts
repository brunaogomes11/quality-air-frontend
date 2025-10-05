import { mapearMensagemErro } from "@/utils/messageErrorMap";
import axios from "axios";

export const apiDefault = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
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
