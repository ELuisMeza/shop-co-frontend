
import { Outlet, Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useUserStore } from "../stores/user.store";

export const MainPage = () => {
  const { user, logout } = useUserStore();

  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      {/* === NavBar === */}
      <nav className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/store" className="text-2xl font-bold text-text hover:opacity-80 transition-opacity">
            SHOP.CO
          </Link>

          {/* Navegación central (oculta en móviles) */}
          <ul className="hidden md:flex gap-6 text-sm">
            <li>
              <Link to="/store" className="hover:text-primary transition-colors">
                Tienda
              </Link>
            </li>
          </ul>

          {/* Iconos de acción */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {/* Badge de cantidad (opcional) */}
              {/* <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span> */}
            </button>
            
            <div className="relative group">
              <button
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Perfil de usuario"
              >
                <User className="w-6 h-6" />
              </button>
              
              {/* Menú desplegable del usuario */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 border-b border-border">
                  <p className="font-semibold text-sm">{user?.name || 'Usuario'}</p>
                  <p className="text-xs text-muted">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded-lg transition-colors text-red-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* === Main Content === */}
      <main className="flex-1 container mx-auto px-4 py-10"><Outlet /></main>

      {/* === Footer === */}
      <footer className="w-full border-t border-border bg-background text-muted text-sm">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2025 MyApp Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
