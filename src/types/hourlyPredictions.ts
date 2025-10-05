export interface HourlyConcentration {
  "NO2(Dióxido de Nitrogênio) - µg/m3"?: number;
}

export interface HourlyIQAr {
  "NO2(Dióxido de Nitrogênio) - µg/m3"?: number;
}

export interface HourlyPrediction {
  data_hora: string;
  iqar_geral: number;
  poluente_dominante: string;
  qualidade: string;
  concentracoes: HourlyConcentration;
  iqar_por_poluente: HourlyIQAr;
}

export interface HourlyPredictionsResponse {
  periodo: string;
  total_horas: number;
  modelo: string;
  modelos_carregados: number;
  poluentes_analisados: string[];
  predicoes: HourlyPrediction[];
}
