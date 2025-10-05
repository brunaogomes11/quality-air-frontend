import { cn } from "../utils/cn";

export type ComboboxStatus =
  | "FINALIZADO"
  | "FINALIZADA"
  | "ANDAMENTO"
  | "ANALISE"
  | "PENDENTE"
  | "PENDENTE_EXECUCAO"
  | "PENDENTE_APROVACAO"
  | "PENDENTE_REQUISITOS"
  | "APROVADO"
  | "APROVADA"
  | "RECUSADO"
  | "CANCELADA"
  | "CANCELADO"
  | "REPROVADA"
  | "REJEITADA"
  | "ATIVO"
  | "ATIVA"
  | "DESATIVADO"
  | "DESATIVADA"
  | "NÃO_INFORMADO"
  | "NOVA"
  | "OCORRENCIA"
  | "ENTREGUE"
  | "EM_ANDAMENTO"
  | "AGUARDANDO_CHECAGEM"
  | "RESOLVIDA"
  | "CONCLUIDA"
  | "NAO_INICIADA"
  | "AUSENTE"
  | "INATIVO";

interface StatusProps {
  status?: ComboboxStatus;
}

export const statusMap: Record<
  ComboboxStatus,
  { statusName: string; wrapper: string; dot: string }
> = {
  EM_ANDAMENTO: {
    statusName: "Em andamento",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  ANALISE: {
    statusName: "Em analise",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  FINALIZADO: {
    statusName: "Finalizado",
    wrapper: "border-green-500 text-green-500 bg-green-500/10",
    dot: "bg-green-500",
  },
  FINALIZADA: {
    statusName: "Finalizada",
    wrapper: "border-green-500 text-green-500 bg-green-500/10",
    dot: "bg-green-500",
  },
  RESOLVIDA: {
    statusName: "Resolvida",
    wrapper: "border-green-500 text-green-500 bg-green-500/10",
    dot: "bg-green-500",
  },
  CONCLUIDA: {
    statusName: "Concluida",
    wrapper: "border-green-500 text-green-500 bg-green-500/10",
    dot: "bg-green-500",
  },
  ANDAMENTO: {
    statusName: "Andamento",
    wrapper: "border-yellow-500 text-yellow-600 bg-yellow-500/10",
    dot: "bg-yellow-500",
  },
  PENDENTE: {
    statusName: "Pendente",
    wrapper: "border-yellow-500 text-yellow-600 bg-yellow-500/10",
    dot: "bg-yellow-500",
  },
  PENDENTE_EXECUCAO: {
    statusName: "Pend. Execução",
    wrapper: "border-violet-500 text-violet-500 bg-violet-500/10",
    dot: "bg-violet-500",
  },
  PENDENTE_APROVACAO: {
    statusName: "Pend. Aprovação",
    wrapper: "border-violet-500 text-violet-500 bg-violet-500/10",
    dot: "bg-violet-500",
  },
  PENDENTE_REQUISITOS: {
    statusName: "Pend. Requisitos",
    wrapper: "border-violet-500 text-violet-500 bg-violet-500/10",
    dot: "bg-violet-500",
  },
  APROVADO: {
    statusName: "Aprovado",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  APROVADA: {
    statusName: "Aprovada",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  RECUSADO: {
    statusName: "Recusado",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  CANCELADA: {
    statusName: "Cancelada",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  CANCELADO: {
    statusName: "Cancelado",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  REPROVADA: {
    statusName: "Reprovada",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  REJEITADA: {
    statusName: "Rejeitada",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  ATIVO: {
    statusName: "Ativo",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  AUSENTE: {
    statusName: "Ausente",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  INATIVO: {
    statusName: "Inativo",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  ATIVA: {
    statusName: "Ativa",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  DESATIVADO: {
    statusName: "Desativado",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  DESATIVADA: {
    statusName: "Desativada",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
  NÃO_INFORMADO: {
    statusName: "Não informado",
    wrapper: "border-gray-500 text-gray-500 bg-gray-500/10",
    dot: "bg-gray-500",
  },
  NOVA: {
    statusName: "Nova",
    wrapper: "border-blue-500 text-blue-500 bg-blue-500/10",
    dot: "bg-blue-500",
  },
  OCORRENCIA: {
    statusName: "Ocorrência",
    wrapper: "border-orange-500 text-orange-500 bg-orange-500/10",
    dot: "bg-orange-500",
  },
  ENTREGUE: {
    statusName: "Entregue",
    wrapper: "border-green-500 text-green-500 bg-green-500/10",
    dot: "bg-green-500",
  },
  AGUARDANDO_CHECAGEM: {
    statusName: "Aguardando Checagem",
    wrapper: "border-yellow-500 text-yellow-500 bg-yellow-500/10",
    dot: "bg-yellow-500",
  },
  NAO_INICIADA: {
    statusName: "Não Iniciada",
    wrapper: "border-red-500 text-red-500 bg-red-500/10",
    dot: "bg-red-500",
  },
};

const Status = ({ status }: StatusProps) => {
  const mappedStatus = statusMap[status || "NÃO_INFORMADO"];

  if (!mappedStatus) {
    return <div></div>;
    // throw new Error("Status inválido. Por favor, verifique o status informado.");
  }

  const { statusName, wrapper, dot } = mappedStatus;

  return (
    <div className="flex">
      <div
        className={cn(
          "flex h-6 items-center gap-2 overflow-hidden rounded-xl border px-3 text-clip",
          wrapper
        )}
      >
        <div className={cn("h-2 w-2 rounded-full", dot)}></div>
        <p className="w-auto overflow-hidden text-xs font-medium tracking-wide text-nowrap text-clip">
          {statusName}
        </p>
      </div>
    </div>
  );
};

export default Status;
