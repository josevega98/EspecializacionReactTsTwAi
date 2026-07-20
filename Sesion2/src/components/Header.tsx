// Componente Header con el nombre del usuario
// Props: userName (string) - nombre del usuario

interface HeaderProps {
  userName: string;
}

function Header({ userName }: HeaderProps) {
  return (
    <header className="rounded-2xl bg-linear-to-r from-emerald-400 to-green-900 p-5 shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="user-info">
          <span className="text-sm text-slate-500">Hola, </span>
          <span className="text-2xl font-semibold text-slate-900">
            {userName}
          </span>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-300 text-lg font-semibold text-emerald-950">
          {/* Mostramos la inicial del usuario */}
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Header;
