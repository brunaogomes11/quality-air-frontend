import type { Condominio } from "../types/condominio";
import type { MoradorType, StatusMorador, TipoMorador } from "../types/morador";

// Helper para criar um MoradorType completo e tipado
const createMorador = (p: {
  id: number;
  condominioId: number;
  unidadeId: number;
  nomeCompleto: string;
  status?: StatusMorador;
  tipo?: TipoMorador;
}): MoradorType => ({
  id: p.id,
  condominioId: p.condominioId,
  unidadeId: p.unidadeId,
  nomeCompleto: p.nomeCompleto, // campo de Pessoa (ajuste se sua Pessoa exigir mais)
  status: p.status ?? "ATIVO",
  tipo: p.tipo ?? "PROPRIETARIO",

  // AuditFields
  createdAt: new Date(),
  updatedAt: new Date(),

  // SoftDelete
  ativo: true,

  // opcionais de MoradorType
  preferenciasNotificacao: { app: true, email: true, sms: false },
  termosConsentimentoBiometria: {
    consentiu: true,
    dataConsentimento: new Date(),
    versaoTermo: "1.0",
  },

  // demais campos opcionais
  dataInicioResidencia: new Date(),
});

// MOCK paginado de Condomínios
export const MOCK_CONDOMINIOS_PAGINADO: {
  content: Condominio[];
  totalElements?: number;
  totalPages?: number;
} = {
  content: [
    {
      id: 1,
      nome: "Condomínio Jardim das Flores",
      nomeFantasia: "Jardim das Flores",
      razaoSocial: "Condomínio Residencial Jardim das Flores LTDA",
      cnpj: "12.345.678/0001-90",
      inscricaoMunicipal: "123456",
      descricao: "Condomínio residencial de prédios baixos",
      endereco: {
        logradouro: "Rua das Acácias",
        numero: "100",
        bairro: "Jardins",
        cidade: "São Paulo",
        uf: "SP",
        cep: "01234-567",
      },
      sindico: createMorador({
        id: 101,
        condominioId: 1,
        unidadeId: 11,
        nomeCompleto: "Carlos Alberto",
        tipo: "PROPRIETARIO",
      }),
      subsindico: createMorador({
        id: 102,
        condominioId: 1,
        unidadeId: 12,
        nomeCompleto: "Fernanda Souza",
        tipo: "INQUILINO",
      }),
      conselho: [
        createMorador({
          id: 103,
          condominioId: 1,
          unidadeId: 13,
          nomeCompleto: "João Silva",
        }),
        createMorador({
          id: 104,
          condominioId: 1,
          unidadeId: 14,
          nomeCompleto: "Maria Oliveira",
        }),
      ],
      unidades: [],

      // AuditFields
      createdAt: new Date(),
      updatedAt: new Date(),

      // SoftDelete
      ativo: true,
    },
    {
      id: 2,
      nome: "Condomínio Empresarial Alpha",
      nomeFantasia: "Alpha Offices",
      razaoSocial: "Condomínio Empresarial Alpha S/A",
      cnpj: "98.765.432/0001-11",
      inscricaoMunicipal: "654321",
      descricao: "Centro comercial moderno com várias salas",
      endereco: {
        logradouro: "Av. Central",
        numero: "2000",
        bairro: "Centro",
        cidade: "Rio de Janeiro",
        uf: "RJ",
        cep: "22222-000",
      },
      sindico: createMorador({
        id: 201,
        condominioId: 2,
        unidadeId: 21,
        nomeCompleto: "Roberto Lima",
      }),
      subsindico: createMorador({
        id: 202,
        condominioId: 2,
        unidadeId: 22,
        nomeCompleto: "Juliana Costa",
      }),
      conselho: [],
      unidades: [],

      createdAt: new Date(),
      updatedAt: new Date(),
      ativo: true,
    },
    {
      id: 3,
      nome: "Condomínio Village Verde",
      nomeFantasia: "Village Verde",
      razaoSocial: "Condomínio Village Verde LTDA",
      cnpj: "11.222.333/0001-44",
      descricao: "Condomínio de casas com área verde e lazer",
      endereco: {
        logradouro: "Rua das Palmeiras",
        numero: "50",
        bairro: "Verdejante",
        cidade: "Belo Horizonte",
        uf: "MG",
        cep: "31000-000",
      },
      sindico: createMorador({
        id: 301,
        condominioId: 3,
        unidadeId: 31,
        nomeCompleto: "Marcos Pereira",
      }),
      subsindico: undefined,
      conselho: [
        createMorador({
          id: 302,
          condominioId: 3,
          unidadeId: 32,
          nomeCompleto: "Ana Paula",
        }),
      ],
      unidades: [],

      createdAt: new Date(),
      updatedAt: new Date(),
      ativo: true,
    },
  ],
  totalElements: 25,
  totalPages: 3,
};
