import { Condominio } from "@/types/condominio";
import { ApiRequestParams } from "@/types/system/apiRequest";
import { PaginatedApiResponse } from "@/types/system/pagination";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiDefault } from "../clients/apiDefault";
import { Unidade } from "@/types/unidade";
import { MoradorType } from "@/types/morador";
import { Endereco } from "@/types/endereco";

export type GetCondominioTableDataFilters = {
  search?: string;
};

type GetCondominioTableDataParams = ApiRequestParams<
  Condominio,
  GetCondominioTableDataFilters
>;

const getDeliveriesTableData = async (
  params?: GetCondominioTableDataParams
): Promise<PaginatedApiResponse<Condominio>> => {
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

  const url = `/condominio?${query.toString()}`;
  const { data } = await apiDefault.get(url);
  return data;
};

export const useGetDeliveriesTableData = (
  params?: GetCondominioTableDataParams,
  options?: Omit<UseQueryOptions<PaginatedApiResponse<Condominio>>, "queryKey">
) => {
  const { size, page, filter, sort } = params || {};
  return useQuery({
    queryKey: ["condominio", size, page, filter, sort],
    queryFn: () => getDeliveriesTableData(params),
    ...options,
  });
};

export type RegisterCondominioParams = {
  form: {
    id?: number;
    descricao?: string;
    nome: string;
    unidades?: Unidade[];
    nomeFantasia?: string;
    razaoSocial?: string;
    cnpj?: string;
    inscricaoMunicipal?: string;
    sindico?: MoradorType;
    subsindico?: MoradorType;
    conselho?: MoradorType[];
    endereco: Endereco;
  };
  file?: File;
};
const registerCondominio = async ({ form, file }: RegisterCondominioParams) => {
  const formData = new FormData();
  formData.append(
    "form",
    new Blob([JSON.stringify(form)], { type: "application/json" })
  );
  file && formData.append("file", file);

  const { data } = await apiDefault.post("/condominio", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const useRegisterCondominio = () => {
  return useMutation({ mutationFn: registerCondominio });
};

const getDeliveryByInvoiceId = async (
  condominioId: number
): Promise<Condominio> => {
  const { data } = await apiDefault.get(`/condominio/${condominioId}`);
  return data;
};

export const useGetDeliveryByInvoiceId = (
  id?: number,
  options?: Omit<UseQueryOptions<Condominio>, "queryKey">
) => {
  const enabled = !!id && !!options?.enabled;
  return useQuery({
    queryKey: ["condominio", id!],
    queryFn: () => getDeliveryByInvoiceId(id!),
    ...options,
    enabled,
  });
};
