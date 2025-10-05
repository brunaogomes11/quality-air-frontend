import { Sidebar } from "@/components/sidebar/sidebar";
import { MOCK_ARVORE_NAVEGACAO } from "@/mocks/arvoreNavegacao";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const larguraSidebar = useMotionValue(256);
  const larguraAnimada = useSpring(larguraSidebar, {
    stiffness: 260,
    damping: 28,
  });

  return (
    <div className="w-screen h-screen flex">
      <Sidebar
        itens={MOCK_ARVORE_NAVEGACAO}
        cabecalho={<strong>LIS</strong>}
        rodape={<small className="text-gray-500">v1.0.0</small>}
        rotaAtual={location.pathname}
        aoClicarItem={(item) => item.caminho && navigate(item.caminho)}
        aoMudarLargura={(largura) => larguraSidebar.set(largura)}
      />
      <motion.main
        className="min-w-0 p-6 flex-1"
        style={{ marginLeft: larguraAnimada }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};
