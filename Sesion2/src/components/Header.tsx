// Componente Header con el nombre del usuario
// Props: userName (string) - nombre del usuario

interface HeaderProps {
  userName: string;
}

function Header({ userName }: HeaderProps) {
  return (
    <header className="rounded-2xl bg-linear-to-r from-emerald-500 to-green-600 p-5 text-white shadow-md dark:from-slate-800 dark:to-slate-900 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-emerald-50 dark:text-slate-300">
            Hola,
          </span>
          <span className="text-2xl font-semibold text-white">{userName}</span>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-semibold text-white dark:bg-slate-700 dark:text-slate-100">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Header;
