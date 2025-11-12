import {
  ShoppingBag,
  ArrowRight,
  Menu,
  X,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/user.store";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useUserStore();

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" />
          <h1 className="text-2xl font-bold">SHOP.CO</h1>
        </div>
        <div className="hidden md:flex gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-6 h-6" />
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
                    <p className="font-semibold text-sm">
                      {user?.name || "Usuario"}
                    </p>
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
          ) : (
            <>
              <Link
                to="/signup?type=buyer"
                className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition"
              >
                Soy Comprador
              </Link>
              <Link
                to="/signup?type=seller"
                className="bg-primary text-background rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                Soy Vendedor
              </Link>
              <Link
                to="/login"
                className="bg-primary text-background rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                Iniciar Sesión
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-50 transition focus:outline-none focus:ring-2 focus:ring-primary"
            aria-haspopup="true"
            aria-expanded={isMobileMenuOpen}
          >
            <span>Empezar</span>
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
          {isMobileMenuOpen && (
            <div className="absolute right-6 top-full mt-3 w-48 rounded-xl border border-border bg-background shadow-lg flex flex-col overflow-hidden">
              <Link
                to="/signup?type=buyer"
                className="px-4 py-3 text-sm hover:bg-neutral-50 transition"
                onClick={handleCloseMobileMenu}
              >
                Soy Comprador
              </Link>
              <Link
                to="/signup?type=seller"
                className="px-4 py-3 text-sm hover:bg-neutral-50 transition"
                onClick={handleCloseMobileMenu}
              >
                Soy Vendedor
              </Link>
              <Link
                to="/login"
                className="px-4 py-3 text-sm hover:bg-neutral-50 transition flex items-center justify-between"
                onClick={handleCloseMobileMenu}
              >
                <span>Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
