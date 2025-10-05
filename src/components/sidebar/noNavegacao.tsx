import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { Chevron, cx, ehAtivo } from "./utils/utils";
import { ItemNavegacao } from "./types/sidebar";

type NoNavegacaoProps = {
  item: ItemNavegacao;
  nivel: number;
  recolhida: boolean;
  rotaAtual?: string;
  aoClicarFolha?: (item: ItemNavegacao) => void;
};

export const NoNavegacao = ({
  item,
  nivel,
  recolhida,
  rotaAtual,
  aoClicarFolha,
}: NoNavegacaoProps) => {
  const ativo = ehAtivo(item, rotaAtual);
  const temFilhos = (item.filhos?.length ?? 0) > 0;

  const conteudoRotulo = (
    <div className="flex min-w-0 items-center gap-2">
      <span className="truncate">{item.rotulo}</span>
      {item.selo !== undefined && (
        <span className="ml-auto rounded-full border px-2 text-xs">
          {item.selo}
        </span>
      )}
    </div>
  );

  if (!temFilhos) {
    return (
      <button
        className={cx(
          "group flex w-full items-center gap-2 rounded px-2 py-2 text-left focus:outline-none focus:ring",
          ativo ? "bg-muted" : "hover:bg-muted",
          item.desabilitado && "opacity-50 cursor-not-allowed"
        )}
        style={{ paddingLeft: recolhida ? 8 : 8 + nivel * 16 }}
        onClick={() => !item.desabilitado && aoClicarFolha?.(item)}
        aria-disabled={item.desabilitado || undefined}
      >
        {item.icone ? (
          <span className="shrink-0">{item.icone}</span>
        ) : (
          <span className="w-4 shrink-0" />
        )}
        <AnimatePresence initial={false}>
          {!recolhida && (
            <motion.span
              key="rotulo"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="flex-1 min-w-0"
            >
              {conteudoRotulo}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <Accordion.Item value={item.id} asChild>
      <li>
        <Accordion.Header asChild>
          <Accordion.Trigger asChild>
            <button
              className={cx(
                "group flex w-full items-center gap-2 rounded px-2 py-2 text-left focus:outline-none focus:ring",
                ativo ? "bg-muted" : "hover:bg-muted"
              )}
              style={{ paddingLeft: recolhida ? 8 : 8 + nivel * 16 }}
            >
              {item.icone ? (
                <span className="shrink-0">{item.icone}</span>
              ) : (
                <span className="w-4 shrink-0" />
              )}

              <AnimatePresence initial={false}>
                {!recolhida && (
                  <motion.span
                    key="rotulo"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 min-w-0"
                  >
                    {conteudoRotulo}
                  </motion.span>
                )}
              </AnimatePresence>

              {!recolhida && (
                <span
                  className="ml-auto opacity-60 group-hover:opacity-80"
                  aria-hidden
                >
                  <Accordion.Item value="_" asChild>
                    <Chevron aberto={false} />
                  </Accordion.Item>
                </span>
              )}
            </button>
          </Accordion.Trigger>
        </Accordion.Header>
        {!recolhida && (
          <Accordion.Content asChild>
            <ul className="mt-1 space-y-1" role="group">
              {item.filhos?.map((filho) => (
                <NoNavegacao
                  key={filho.id}
                  item={filho}
                  nivel={nivel + 1}
                  recolhida={recolhida}
                  rotaAtual={rotaAtual}
                  aoClicarFolha={aoClicarFolha}
                />
              ))}
            </ul>
          </Accordion.Content>
        )}
      </li>
    </Accordion.Item>
  );
};
