import { Link } from 'react-router-dom';
import { LoginService } from '../services/login.service';
import { useState } from 'react';
import { useUserStore } from '../stores/user.store';
import { toast } from 'react-hot-toast';

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setToken, setUser } = useUserStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await LoginService.login(email, password);
    if (response.success && response.data) {
      setToken(response.data.access_token);
      setUser(response.data.user);
      // Usar window.location.href para asegurar que el store se haya persistido
      setTimeout(() => {
        window.location.href = '/store';
      }, 100);
    } else {
      toast.error(response.message);
    }
  }
  
  return (
    <div className="min-h-screen flex bg-background text-text">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-semibold mb-2">Bienvenido de Nuevo</h1>
          <p className="text-muted mb-8">Ingresa tu correo y contraseña para acceder a tu cuenta.</p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-background font-medium py-2 rounded-lg hover:opacity-90 transition-all"
            >
              Iniciar Sesión
            </button>
          </form>


          <p className="text-sm text-muted mt-8 text-center">
            ¿No tienes una cuenta?{" "}
          </p>
          <div className="text-sm text-muted mt-8 text-center">
            <Link to="/signup?type=buyer" className="text-primary hover:underline">
              Regístrate como Comprador
            </Link>
            {" o "}
            <Link to="/signup?type=seller" className="text-primary hover:underline">
              Regístrate como Vendedor
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Visual / Illustration */}
      <div className="hidden md:flex w-1/2 bg-primary text-background items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Gestiona tu equipo y operaciones sin esfuerzo</h2>
          <p className="text-sm opacity-80">
            Inicia sesión para acceder a tu panel de CRM y gestionar tu equipo.
          </p>
          <div className="mt-8 bg-background text-primary rounded-xl shadow-lg p-6">
            <div className="h-40 bg-neutral-100 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
