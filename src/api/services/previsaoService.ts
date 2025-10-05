import { apiDefault } from "@/api/clients/apiDefault";
import type {
  PrevisaoDiaRequest,
  PrevisaoDiaResponse,
  PrevisaoPeriodoRequest,
  PrevisaoPeriodoResponse,
} from "@/types/previsao";

/**
 * Serviço para requisições relacionadas a previsões da qualidade do ar
 */
export const previsaoService = {
  /**
   * Faz uma predição para um dia e hora específicos
   * @param data - Data e hora no formato "DD/MM/YYYY HH:mm"
   * @returns Resposta com a previsão da qualidade do ar
   */
  async obterPrevisaoDia(
    data: string
  ): Promise<PrevisaoDiaResponse> {
    const body: PrevisaoDiaRequest = { data };
    const response = await apiDefault.post<PrevisaoDiaResponse>(
      "/previsao/dia",
      body
    );
    return response.data;
  },

  /**
   * Faz uma predição para um período de tempo (múltiplas horas)
   * @param dataInicio - Data e hora de início no formato "DD/MM/YYYY HH:mm"
   * @param dataFim - Data e hora de fim no formato "DD/MM/YYYY HH:mm"
   * @returns Resposta com as previsões horárias do período
   */
  async obterPrevisaoPeriodo(
    dataInicio: string,
    dataFim: string
  ): Promise<PrevisaoPeriodoResponse> {
    const body: PrevisaoPeriodoRequest = {
      data_inicio: dataInicio,
      data_fim: dataFim,
    };
    const response = await apiDefault.post<PrevisaoPeriodoResponse>(
      "/previsao/periodo",
      body
    );
    return response.data;
  },
};
