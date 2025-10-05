import type { Documento } from "./documento";
import type { AuditFields, SoftDelete, WithCondominio } from "./utilitarios";

export interface Veiculo extends WithCondominio, AuditFields, SoftDelete {
  id: number;
  placa: string; // única
  marca: string;
  modelo: string;
  cor: string;
  status: StatusVeiculo;
  moradorId?: number;
  unidadeId?: number; // se vincular direto à unidade
  ano?: number;
  tagRfidCodigo?: string;
  foto?: Documento;
  vagaPadraoId?: number; // Vaga.id
}
type StatusVeiculo = "autorizado" | "bloqueado";
