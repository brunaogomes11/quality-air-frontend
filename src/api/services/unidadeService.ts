import { ApiRequestParams } from "@/types/system/apiRequest";
import { PaginatedApiResponse } from "@/types/system/pagination";
import { SituacaoUnidade, TipoUnidade, Unidade } from "@/types/unidade";
import { VagasVeiculos } from "@/types/vagasVeiculos";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiDefault } from "../clients/apiDefault";

export type GetUnidadesTableDataFilters = {
  search?: string;
};

type GetUnidadesTableDataParams = ApiRequestParams<
  Unidade,
  GetUnidadesTableDataFilters
>;

const getUnidadesTableData = async (
  params?: GetUnidadesTableDataParams
): Promise<PaginatedApiResponse<Unidade>> => {
  const { size, page, filter, sort } = params || {};
  const query = new URLSearchParams();

  if (page !== undefined) query.append("page", String(page));
  if (size !== undefined) query.append("size", String(size));

  if (filter) {
    const { search } = filter;

    if (search) query.append("search", search);
  }

  if (!!sort?.length) {
    sort.forEach((sortItem) => {
      query.append("sort", `${sortItem.by},${sortItem.direction}`);
    });
  }

  const url = `/unidade?${query.toString()}`;
  const { data } = await apiDefault.get(url);
  return data;
};

export const useGetUnidadesTableData = (
  params?: GetUnidadesTableDataParams,
  options?: Omit<UseQueryOptions<PaginatedApiResponse<Unidade>>, "queryKey">
) => {
  const { size, page, filter, sort } = params || {};
  return useQuery({
    queryKey: ["unidade", size, page, filter, sort],
    queryFn: () => getUnidadesTableData(params),
    ...options,
  });
};

export type RegisterUnidadeParams = {
  form: {
    id?: number;
    descricao?: string;
    numeroUnidade: string;
    tipoUnidade: TipoUnidade;
    situacao: SituacaoUnidade;
    proprietarioId?: number;
    vagasVeiculos?: VagasVeiculos[];
    metragemM2?: number;
    observacoes?: string;
    parent?: Unidade;
  };
  file?: File;
};
const registerUnidade = async ({ form, file }: RegisterUnidadeParams) => {
  const formData = new FormData();
  formData.append(
    "form",
    new Blob([JSON.stringify(form)], { type: "application/json" })
  );
  file && formData.append("file", file);

  const { data } = await apiDefault.post("/unidade", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const useRegisterUnidade = () => {
  return useMutation({ mutationFn: registerUnidade });
};

const getDeliveryByInvoiceId = async (unidadeId: number): Promise<Unidade> => {
  const { data } = await apiDefault.get(`/unidade/${unidadeId}`);
  return data;
};

export const useGetDeliveryByInvoiceId = (
  id?: number,
  options?: Omit<UseQueryOptions<Unidade>, "queryKey">
) => {
  const enabled = !!id && !!options?.enabled;
  return useQuery({
    queryKey: ["unidade", id!],
    queryFn: () => getDeliveryByInvoiceId(id!),
    ...options,
    enabled,
  });
};
