import { AirQualityView } from "@/features/home/home";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      ''
      <Route index element={<AirQualityView  />} />
      {/* <Route path={ROTAS.HOME} element={<Home />} /> */}
      {/* </Route> */}
    </Routes>
  );
};
