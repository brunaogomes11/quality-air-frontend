import { ItemNavegacao } from "../types/sidebar";

export const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

export const ehAtivo = (item: ItemNavegacao, rotaAtual?: string): boolean => {
  if (!rotaAtual) return false;
  if (item.caminho && item.caminho === rotaAtual) return true;
  return !!item.filhos?.some((f) => ehAtivo(f, rotaAtual));
};

export const Chevron: React.FC<{ aberto: boolean }> = ({ aberto }) => (
  <svg
    className={cx(
      "h-4 w-4 transform transition-transform duration-200",
      aberto && "rotate-90"
    )}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
