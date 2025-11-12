import { Link, useNavigate } from 'react-router-dom';
import { LoginService } from '../services/login.service';
import { useState } from 'react';
import { useUserStore } from '../stores/user.store';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShoppingBag, TrendingUp, Users, Loader2 } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setToken, setUser } = useUserStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const {data, success, message} = await LoginService.login(email, password);
    if (success && data) {      
      setToken(data.access_token);
      setUser(data.user);
      toast.success('Inicio de sesión exitoso');
      navigate('/store', { replace: true });
    } else {
      toast.error(message);
    }
    setIsLoading(false);
  }
  
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-20 xl:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Logo or Brand */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-background" />
            </div>
            <h1 className="text-4xl font-bold text-text mb-2">Bienvenido</h1>
            <p className="text-muted text-base">Ingresa tus credenciales para continuar</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-text">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-text">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 border border-border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full bg-foreground text-background font-semibold py-3.5 rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              Iniciar Sesión
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted">¿No tienes una cuenta?</span>
            </div>
          </div>

          {/* Sign Up Links */}
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/signup?type=buyer" 
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border rounded-xl text-text font-medium hover:border-foreground hover:bg-neutral-50 transition-all group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Comprador</span>
            </Link>
            <Link 
              to="/signup?type=seller" 
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border rounded-xl text-text font-medium hover:border-foreground hover:bg-neutral-50 transition-all group"
            >
              <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Vendedor</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Visual / Illustration */}
      <div className="hidden lg:flex w-1/2 bg-foreground text-background items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-background rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-background rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-lg relative z-10">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Gestiona tu negocio en un solo lugar
          </h2>
          <p className="text-lg opacity-90 mb-12 leading-relaxed">
            Accede a herramientas profesionales para administrar productos, clientes y ventas de manera eficiente.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4">
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-5 border border-background/20 hover:bg-background/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-background/20 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Analíticas en tiempo real</h3>
                  <p className="text-sm opacity-80">Monitorea el rendimiento de tus ventas al instante</p>
                </div>
              </div>
            </div>

            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-5 border border-background/20 hover:bg-background/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-background/20 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Gestión de equipo</h3>
                  <p className="text-sm opacity-80">Colabora y administra usuarios fácilmente</p>
                </div>
              </div>
            </div>

            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-5 border border-background/20 hover:bg-background/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-background/20 rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Control de inventario</h3>
                  <p className="text-sm opacity-80">Mantén tus productos organizados y actualizados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};