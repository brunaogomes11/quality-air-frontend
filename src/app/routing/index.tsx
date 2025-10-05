import { Home } from "@/features/home/home";
import { Route, Routes } from "react-router-dom";
import { ROTAS } from "./rotas";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROTAS.HOME} element={<Home />} />
    </Routes>
  );
};
