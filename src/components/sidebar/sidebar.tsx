import * as Accordion from "@radix-ui/react-accordion";
import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { cx } from "./utils/utils";
import { NoNavegacao } from "./noNavegacao";
import { ItemNavegacao } from "./types/sidebar";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type SidebarProps = {
  itens: ItemNavegacao[];
  cabecalho?: ReactNode;
  rodape?: ReactNode;
  rotaAtual?: string;
  aoClicarItem?: (item: ItemNavegacao) => void;
  recolhidaInicial?: boolean;
  classe?: string;
  aoMudarLargura?: (largura: number) => void;
};

export const Sidebar = ({
  itens,
  cabecalho,
  rodape,
  rotaAtual,
  aoClicarItem,
  recolhidaInicial = false,
  classe,
  aoMudarLargura,
}: SidebarProps) => {
  const [aberta, setAberta] = useState(!recolhidaInicial);
  const recolhida = !aberta;

  const largura = useMotionValue(recolhida ? 64 : 256);

  useEffect(() => {
    const novaLargura = recolhida ? 64 : 256;
    largura.set(novaLargura);
    aoMudarLargura?.(novaLargura);
  }, [recolhida]);

  return (
    <Collapsible.Root
      open={aberta}
      onOpenChange={setAberta}
      className={cx("h-full")}
    >
      <motion.aside
        aria-label="Barra de navegação lateral"
        className={cx(
          "fixed top-0 left-0 flex h-screen flex-col border-r",
          classe
        )}
        initial={false}
        animate={{
          width: recolhida ? 64 : 256,
          x: recolhida ? -4 : 0,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{ overflow: "hidden", transformOrigin: "left center" }}
      >
        <div className="flex items-center gap-2 border-b px-3 py-3">
          <Collapsible.Trigger asChild>
            <button
              className="p-1.5 hover:cursor-pointer focus:outline-none focus:ring hover:bg-muted rounded-full"
              aria-label={recolhida ? "Expandir" : "Recolher"}
              title={recolhida ? "Expandir" : "Recolher"}
            >
              {recolhida ? (
                <ChevronsRight className="h-4 w-4" />
              ) : (
                <ChevronsLeft className="h-4 w-4" />
              )}
            </button>
          </Collapsible.Trigger>
          <AnimatePresence initial={false}>
            {!recolhida && cabecalho && (
              <motion.div
                key="cab"
                className="truncate"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
              >
                {cabecalho}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <Accordion.Root type="multiple" className="space-y-1" asChild>
            <ul role="tree">
              {itens.map((item) => (
                <NoNavegacao
                  key={item.id}
                  item={item}
                  nivel={0}
                  recolhida={recolhida}
                  rotaAtual={rotaAtual}
                  aoClicarFolha={aoClicarItem}
                />
              ))}
            </ul>
          </Accordion.Root>
        </nav>

        <div className="border-t px-3 py-3">
          <AnimatePresence initial={false}>
            {!recolhida && rodape && (
              <motion.div
                key="rod"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
              >
                {rodape}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </Collapsible.Root>
  );
};
