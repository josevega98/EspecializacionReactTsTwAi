import { useState, useEffect } from "react";
import axios from "axios";

type Nota = { id: number; titulo: string; contenido: string };

const BASE_URL = "http://localhost:3001";
const TOKEN = "mi-token-de-ejemplo-123"; // Para el uso de producción vendría del login

// ============================================================
//  VERSIÓN FETCH  (viene incluido en el navegador)
// ============================================================
async function fetchGetNotas(): Promise<Nota[]> {
  const res = await fetch(`${BASE_URL}/notas`, {
    headers: { Authorization: `Bearer ${TOKEN}` }, // el token, a mano cada vez
  });
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`); // fetch NO lanza solo
  return res.json(); // conviertes el JSON a mano
}

async function fetchCreateNota(titulo: string): Promise<Nota> {
  const res = await fetch(`${BASE_URL}/notas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`, // otra vez el token…
    },
    body: JSON.stringify({ titulo, contenido: "contenido" }), // stringify a mano
  });
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  return res.json();
}

// ============================================================
//  VERSIÓN AXIOS  (cliente HTTP configurado UNA vez)
// ============================================================
const http = axios.create({
  baseURL: BASE_URL, // no repites la URL
  headers: { "Content-Type": "application/json" },
});

// Interceptor: pega el Bearer token a TODAS las peticiones automáticamente
http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});

async function axiosGetNotas(): Promise<Nota[]> {
  const { data } = await http.get<Nota[]>("/notas");
  return data; // ya viene convertido; sin res.ok, sin res.json()
}

async function axiosCreateNota(titulo: string): Promise<Nota> {
  const { data } = await http.post<Nota>("/notas", {
    titulo,
    contenido: "contenido",
  });
  return data; // sin stringify, sin repetir headers ni la URL
}

type PanelProps = {
  titulo: string;
  getNotas: () => Promise<Nota[]>;
  createNota: (titulo: string) => Promise<Nota>;
};

function Panel({ titulo, getNotas, createNota }: PanelProps) {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [textoTitulo, setTextoTitulo] = useState("");
  const [creando, setCreando] = useState(false);

  const cargar = async () => {
    const data = await getNotas();
    setNotas(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const crear = async () => {
    if (!textoTitulo.trim()) return;
    setCreando(true);
    try {
      const nueva = await createNota(textoTitulo);
      setNotas((prev) => [nueva, ...prev]);
      setTextoTitulo("");
    } finally {
      setCreando(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <h3 className="mb-3 text-base font-bold">{titulo}</h3>

      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-400"
          value={textoTitulo}
          onChange={(e) => setTextoTitulo(e.target.value)}
          placeholder="Título de la nota"
        />
        <button
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50 cursor-pointer"
          onClick={crear}
          disabled={creando}
        >
          {creando ? "Creando…" : "Crear"}
        </button>
      </div>

      <ul className="list-none p-0 m-0">
        {notas.map((n) => (
          <li
            key={n.id}
            className="px-3 py-2 text-sm border-b border-slate-100"
          >
            {n.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TransporteDemo() {
  return (
    <div className="font-sans text-slate-800 p-6">
      <h2 className="text-xl font-bold mb-2">
        Fetch vs Axios — misma operación, dos formas
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-5">
        Las dos columnas leen y crean notas contra la misma API REST. Abre la
        pestaña Network del navegador y verás la cabecera
        <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded mx-1">
          Authorization: Bearer …
        </code>{" "}
        en ambas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel
          titulo="🟦 Con fetch"
          getNotas={fetchGetNotas}
          createNota={fetchCreateNota}
        />
        <Panel
          titulo="🟩 Con axios"
          getNotas={axiosGetNotas}
          createNota={axiosCreateNota}
        />
      </div>
    </div>
  );
}
