import { Pessoa } from "./pessoa";
import type {
  AuditFields,
  SoftDelete,
  WithCondominio
} from "./utilitarios";
import { Veiculo } from "./veiculo";

export interface Visitante
  extends WithCondominio,
    AuditFields,
    SoftDelete,
    Pessoa {
  id: number;

  tipo: TipoVisitante;
  autorizadoPor?: number; // Morador.id
  autorizacoes?: [
    {
      autorizadoPor: number;
      vigenciaAutorizacao: Date;
    }
  ];
  veiculos?: Veiculo[];
  observacoes?: string;
}

type TipoVisitante = "visitante" | "prestador" | "delivery";
