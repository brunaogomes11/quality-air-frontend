import { ROTAS } from "@/app/routing/rotas";
import { ItemNavegacao } from "@/components/sidebar/types/sidebar";
import {
  Car,
  CrossIcon,
  HandPlatter,
  Home,
  HousePlus,
  PersonStanding,
  ScanEye,
  UsersRound,
} from "lucide-react";

export const MOCK_ARVORE_NAVEGACAO: ItemNavegacao[] = [
  { id: "1", rotulo: "Dashboards" },
  {
    id: "2",
    rotulo: "Cadastros",
    filhos: [
      {
        id: "20",
        rotulo: "Sistema",
        icone: <CrossIcon className="w-4 h-4" />,
        filhos: [
          {
            id: "27",
            rotulo: "Condomínio",
            caminho: ROTAS.CONDOMINIO,
            icone: <Home className="w-4 h-4" />,
          },
        ],
      },
      {
        id: "21",
        rotulo: "Dispositivos de Acesso",
        caminho: "/dispositivos-acesso",
        icone: <ScanEye className="w-4 h-4" />,
      },
      {
        id: "22",
        rotulo: "Moradia",
        caminho: ROTAS.UNIDADE,
        icone: <HousePlus className="w-4 h-4 " />,
      },
      {
        id: "23",
        rotulo: "Morador",
        caminho: ROTAS.MORADOR,
        icone: <UsersRound className="w-4 h-4" />,
      },
      {
        id: "24",
        rotulo: "Prestador de Serviço",
        caminho: "/prestador-servico",
        icone: <HandPlatter className="w-4 h-4" />,
      },
      {
        id: "25",
        rotulo: "Veículo",
        caminho: "/veiculo",
        icone: <Car className="w-4 h-4" />,
      },
      {
        id: "26",
        rotulo: "Visitante",
        caminho: "/visitante",
        icone: <PersonStanding className="w-4 h-4" />,
      },
    ],
  },
  { id: "3", rotulo: "Relatórios" },
];
