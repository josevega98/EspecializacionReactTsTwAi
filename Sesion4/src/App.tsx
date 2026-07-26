import FetchVsAxios from "./components/FetchVsAxios";
import TanStackQueryDemo from "./components/TanStackQueryDemo";

// ============================================================
//  UNIDAD 4: CONSUMO PROFESIONAL DE APIs
// ============================================================

const demos = {
  fetchVsAxios: FetchVsAxios, // Comparación Fetch vs Axios
  tanstack: TanStackQueryDemo, // TanStack Query + cache + invalidación
};

//const ActiveDemo = demos.fetchVsAxios;
const ActiveDemo = demos.fetchVsAxios;

function App() {
  return <ActiveDemo />;
}

export default App;
