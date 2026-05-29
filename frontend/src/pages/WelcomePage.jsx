import { useNavigate } from 'react-router-dom';
import { logout, getUser } from '../services/auth';

export default function WelcomePage() {
  const navigate = useNavigate();
  const username = getUser();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="page-dark">
      <nav className="primary-nav">
        <div className="nav-brand">
          <svg
            viewBox="0 0 110 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="PlayStation"
          >
            <text
              x="0"
              y="12"
              fill="#ffffff"
              fontFamily="'PlayStation SST', sst, Arial, Helvetica, sans-serif"
              fontSize="13"
              fontWeight="700"
              letterSpacing="2"
            >
              PlayStation
            </text>
          </svg>
        </div>
        <div className="nav-actions">
          <span className="nav-user">
            <span className="user-avatar" aria-hidden="true">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </span>
            <span className="nav-username">{username}</span>
          </span>
          <button className="btn-secondary-dark" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="welcome-main">
        <section className="hero-band-blue">
          <div className="hero-content">
            <p className="caption-label">Portal de bienvenida</p>
            <h1 className="display-xl">
              Bienvenido,{' '}
              <span className="hero-username">{username}</span>
            </h1>
            <p className="body-md hero-body">
              Has iniciado sesión correctamente en el sistema de autenticación
              JWT. Tu sesión es válida y estás autorizado para acceder a los
              recursos del portal.
            </p>
          </div>
        </section>

        <section className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <span className="info-card-icon" aria-hidden="true">🔐</span>
              <h2 className="info-card-title">Sesión activa</h2>
              <p className="info-card-body">
                Tu token JWT está almacenado en la sesión del navegador y se
                usa para autenticar tus solicitudes al backend.
              </p>
            </div>

            <div className="info-card">
              <span className="info-card-icon" aria-hidden="true">⚡</span>
              <h2 className="info-card-title">Acceso seguro</h2>
              <p className="info-card-body">
                Esta página solo es accesible para usuarios autenticados.
                Cualquier intento de acceso sin sesión redirige al login.
              </p>
            </div>

            <div className="info-card">
              <span className="info-card-icon" aria-hidden="true">🕹️</span>
              <h2 className="info-card-title">Servicio backend</h2>
              <p className="info-card-body">
                El backend FastAPI gestiona los tokens, verificaciones y el
                ciclo de vida de la autenticación en tiempo real.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-section">
        <p className="footer-text">
          © 2024 PlayStation — JWT Auth Demo
        </p>
      </footer>
    </div>
  );
}
