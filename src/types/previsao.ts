// New types for the updated API
export interface PrevisaoDia {
  data_hora: string;
  iqar_geral: number;
  poluente_dominante: string;
  qualidade: string;
  concentracoes: Record<string, number>;
  iqar_por_poluente: Record<string, number>;
}

export interface PrevisaoDiaRequest {
  data: string; // formato: "DD/MM/YYYY HH:mm"
}

export interface PrevisaoDiaResponse {
  sucesso: boolean;
  data_hora: string;
  previsao: PrevisaoDia;
  modelo: string;
  poluentes_analisados: string[];
}

export interface PrevisaoPeriodoRequest {
  data_inicio: string; // formato: "DD/MM/YYYY HH:mm"
  data_fim: string; // formato: "DD/MM/YYYY HH:mm"
}

export interface PrevisaoPeriodoResponse {
  sucesso: boolean;
  periodo: string;
  total_horas: number;
  modelo: string;
  modelos_carregados: number;
  poluentes_analisados: string[];
  predicoes: PrevisaoDia[];
}