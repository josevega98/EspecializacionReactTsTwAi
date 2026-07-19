// Componente Header con el nombre del usuario
// Props: userName (string) - nombre del usuario

interface HeaderProps {
  userName: string;
}

function Header({ userName }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="user-info">
          <span className="greeting">Hola,</span>
          <span className="user-name">{userName}</span>
        </div>
        <div className="avatar">
          {/* Mostramos la inicial del usuario */}
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Header;
