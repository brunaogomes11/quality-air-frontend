export const mapearMensagemErro = (erro: any): string => {
  if (!erro.response) {
    return erro.message === "Network Error"
      ? "Network error. Check your internet connection."
      : "An unexpected error occurred.";
  }

  const { data, status } = erro.response;

  if (data?.message) {
    return typeof data.message === "string"
      ? data.message
      : data.message.join("\n");
  }

  const mensagensStatus: Record<number, string> = {
    401: "Unauthorized. Please check your credentials.",
    403: "Access forbidden. You do not have permission to access this resource.",
    404: "Resource not found. Check if the address is correct.",
    500: "Internal server error. Please try again later.",
    503: "Service unavailable. Please try again later.",
  };

  return mensagensStatus[status] || "An unexpected error occurred.";
};
