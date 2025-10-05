type Andar = { andar: string; unidades: string[] };
type Torre = { nome: string; andares: Andar[] };

export type Bloco =
  | { label: string; torres: undefined; andares: Andar[] }
  | { label: string; torres: Torre[]; andares?: undefined };

export const blocos: Bloco[] = [
  {
    label: "Bloco A",
    torres: undefined,
    andares: [
      { andar: "Térreo", unidades: ["01", "02", "03", "04"] },
      { andar: "1º", unidades: ["101", "102", "103", "104"] },
      { andar: "2º", unidades: ["201", "202", "203", "204"] },
      { andar: "3º", unidades: ["301", "302", "303", "304"] },
    ],
  },
  {
    label: "Bloco B",
    torres: undefined,
    andares: [
      { andar: "Térreo", unidades: ["01", "02", "03"] },
      { andar: "1º", unidades: ["101", "102", "103"] },
      { andar: "2º", unidades: ["201", "202", "203"] },
    ],
  },
  {
    label: "Bloco C",
    torres: [
      {
        nome: "Torre 1",
        andares: [
          { andar: "1º", unidades: ["101", "102"] },
          { andar: "2º", unidades: ["201", "202"] },
          { andar: "3º", unidades: ["301", "302"] },
        ],
      },
      {
        nome: "Torre 2",
        andares: [
          { andar: "1º", unidades: ["101", "102", "103"] },
          { andar: "2º", unidades: ["201", "202", "203"] },
        ],
      },
    ],
  },
];
