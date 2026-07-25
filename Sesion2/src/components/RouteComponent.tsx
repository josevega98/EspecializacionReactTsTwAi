import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>

      <button onClick={() => navigate("/home")}>Ir al Home</button>
    </div>
  );
}

function Home() {
  return <h2>🏠 Bienvenido al Home</h2>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const autenticado = true;

  return autenticado ? children : <Navigate to="/" />;
}

function RouteComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default RouteComponent;
