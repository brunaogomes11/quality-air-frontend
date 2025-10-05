export type ItemNavegacao = {
  id: string;
  rotulo: string;
  caminho?: string;
  icone?: React.ReactNode;
  selo?: string | number;
  filhos?: ItemNavegacao[];
  desabilitado?: boolean;
};
