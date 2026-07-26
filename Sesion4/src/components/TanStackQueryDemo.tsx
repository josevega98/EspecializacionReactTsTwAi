import { useState } from "react";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Nota = { id: number; titulo: string; contenido: string };
type Opciones = { vacio: boolean; fallar: boolean };

const BASE_URL = "http://localhost:3001";
const TOKEN = "mi-token-de-ejemplo-123";

// --- cliente HTTP con Bearer token
const http = axios.create({ baseURL: BASE_URL });
http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});

// --- funciones de la API REST (axios) ---
async function getNotas({ vacio, fallar }: Opciones): Promise<Nota[]> {
  if (fallar) {
    // Forzar error 404
    const { data } = await http.get<Nota[]>("/ruta-que-no-existe");
    return data;
  }
  if (vacio) {
    // Simular lista vacía
    return [];
  }
  // Caso normal
  const { data } = await http.get<Nota[]>("/notas");
  return data;
}

async function createNota(titulo: string): Promise<Nota> {
  const { data } = await http.post<Nota>("/notas", {
    titulo,
    contenido: "contenido",
  });
  return data;
}

// ============================================================
//  HOOK REUTILIZABLE con TanStack Query
// ============================================================
function useNotas(opciones: Opciones) {
  const qc = useQueryClient();

  const consulta = useQuery({
    queryKey: ["notas", opciones], // cada combinación = su propio cache
    queryFn: () => getNotas(opciones),
    staleTime: 1000 * 20, // 20s "fresco": no vuelve a pedir de más → CACHE
    retry: false, // sin reintentos, para ver el error al instante
  });

  const crear = useMutation({
    mutationFn: createNota,
    // al crear, marca "notas" como viejo → refetch automático (INVALIDACIÓN)
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notas"] }),
  });

  return { consulta, crear };
}

// ============================================================
//  COMPONENTE: pinta los CUATRO estados
// ============================================================
function ListaNotas() {
  const [vacio, setVacio] = useState(false);
  const [fallar, setFallar] = useState(false);
  const [titulo, setTitulo] = useState("");

  const { consulta, crear } = useNotas({ vacio, fallar });

  return (
    <div className="max-w-xl mx-auto p-6 font-sans text-slate-800">
      <h2 className="text-xl font-bold mb-4">Estados con TanStack Query</h2>

      {/* interruptores para forzar empty y error */}
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={vacio}
            onChange={(e) => setVacio(e.target.checked)}
          />
          Simular lista vacía
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={fallar}
            onChange={(e) => setFallar(e.target.checked)}
          />
          Simular error de red
        </label>
      </div>

      {/* crear + feedback visual */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-400"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la nota"
        />
        <button
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50 cursor-pointer"
          disabled={crear.isPending || !titulo.trim()}
          onClick={() =>
            crear.mutate(titulo, { onSuccess: () => setTitulo("") })
          }
        >
          {crear.isPending ? "Creando…" : "Crear"}
        </button>
      </div>

      {/* ---------- LOS CUATRO ESTADOS ---------- */}
      <div className="min-h-[150px] bg-white border border-slate-200 rounded-xl p-4">
        {consulta.isLoading ? (
          // 1) LOADING
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-500">Cargando notas…</span>
          </div>
        ) : consulta.isError ? (
          // 2) ERROR
          <div className="text-center py-6 px-4 bg-red-50 rounded-lg">
            <p className="font-semibold text-red-700">No se pudieron cargar</p>
            <p className="text-sm text-red-500 mt-1">
              {consulta.error.message}
            </p>
            <button
              className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 cursor-pointer"
              onClick={() => consulta.refetch()}
            >
              Reintentar
            </button>
          </div>
        ) : consulta.data && consulta.data.length === 0 ? (
          // 3) EMPTY
          <p className="flex items-center justify-center py-8">
            <span className="text-sm text-slate-500">
              No hay notas para mostrar.
            </span>
          </p>
        ) : (
          // 4) SUCCESS
          <ul className="list-none p-0 m-0">
            {consulta.data?.map((n) => (
              <li
                key={n.id}
                className="px-3 py-2 text-sm border-b border-slate-100 last:border-b-0"
              >
                {n.titulo}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ============================================================
//  El Provider envuelve todo (aquí vive el cache) + Devtools
//  para VER el cache en vivo. Así el archivo es autosuficiente.
// ============================================================
const queryClient = new QueryClient();

export default function TanStackQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListaNotas />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
