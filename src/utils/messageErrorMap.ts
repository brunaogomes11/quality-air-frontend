export const mapearMensagemErro = (erro: any): string => {
  if (!erro.response) {
    return erro.message === "Network Error"
      ? "Erro de rede. Verifique sua conexão com a internet."
      : "Ocorreu um erro inesperado.";
  }

  const { data, status } = erro.response;

  if (data?.message) {
    return typeof data.message === "string"
      ? data.message
      : data.message.join("\n");
  }

  const mensagensStatus: Record<number, string> = {
    401: "Não autorizado. Por favor, verifique suas credenciais.",
    403: "Acesso proibido. Você não tem permissão para acessar este recurso.",
    404: "Recurso não encontrado. Verifique se o endereço está correto.",
    500: "Erro interno do servidor. Por favor, tente novamente mais tarde.",
    503: "Serviço indisponível. Por favor, tente novamente mais tarde.",
  };

  return mensagensStatus[status] || "Ocorreu um erro inesperado.";
};
