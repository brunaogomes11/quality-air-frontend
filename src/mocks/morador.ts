import type { MoradorType } from "../types/morador";

export const MOCK_MORADORES_PAGINADO = {
  content: Array.from({ length: 20 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      nomeCompleto: `Morador ${id}`,
      cpf: String(10000000000 + id),
      status: ["ativo", "ausente", "inativo"][i % 3] as any,
      tipo: ["proprietario", "inquilino", "dependente"][i % 3] as any,
      dataInicioResidencia: new Date(2023, i % 12, 1 + (i % 28)),
      dataFimResidencia:
        i % 5 === 0 ? new Date(2024, i % 12, 1 + (i % 28)) : undefined,
      observacoes: i % 4 === 0 ? "Possui observações adicionais" : "",
      unidadeId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ativo: true,
    } as MoradorType;
  }),
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalPages: 2,
  totalElements: 10,
  first: true,
  size: 20,
  number: 0,
  sort: {
    empty: true,
    unsorted: true,
    sorted: false,
  },
  numberOfElements: 20,
  empty: false,
};
