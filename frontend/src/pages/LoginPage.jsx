import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/welcome');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-dark">
      <div className="login-card">
        <div className="brand-logo">
          <svg
            viewBox="0 0 100 14"
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

        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">
          Ingresa tus credenciales para acceder al portal.
        </p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="field-label" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              className="text-input"
              type="text"
              autoComplete="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              className="text-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`btn-primary${loading ? ' btn-loading' : ''}`}
            disabled={loading || !username || !password}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
