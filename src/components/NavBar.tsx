import {
  ShoppingBag,
  ArrowRight,
  Menu,
  X,
  User
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user.store";
import type { NavItem } from "../types/navbar.types";
import { getNavItems } from "../lib/navItems";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  
  const isSeller = user?.role?.name?.toLowerCase() === "seller" || user?.role?.name?.toLowerCase() === "vendedor";
  const isBuyer = !isSeller && user;
  const isGuest = !user;

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (to?: string, onClick?: () => void) => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick();
    }
    handleCloseMobileMenu();
  };

  // Obtener elementos del menú con las dependencias necesarias
  const navItems = getNavItems({ navigate, logout });

  // Filtrar elementos según el rol del usuario
  const getVisibleItems = (items: NavItem[]): NavItem[] => {
    return items.filter((item) => {
      // Si no tiene visibleFor, solo se muestra cuando NO hay usuario (usuarios no autenticados)
      if (!item.visibleFor) {
        return isGuest;
      }
      
      // Si hay usuario, verificar según su rol
      if (isGuest) return false; // Si es guest, no mostrar elementos con visibleFor
      
      if (isSeller) {
        return item.visibleFor.includes("seller") || item.visibleFor.includes("admin") || item.visibleFor.includes("all");
      }
      
      if (isBuyer) {
        return item.visibleFor.includes("buyer") || item.visibleFor.includes("admin") || item.visibleFor.includes("all");
      }
      
      return false;
    });
  };

  const visibleNavItems = getVisibleItems(navItems);
  const userMenuItems = visibleNavItems.find((item) => item.id === "user-menu");
  const mainNavItems = visibleNavItems.filter((item) => item.id !== "user-menu");

  const renderNavItem = (item: NavItem, isMobile: boolean = false) => {
    const baseClasses = isMobile
      ? "px-4 py-3 text-sm hover:bg-neutral-50 transition text-left flex items-center gap-2"
      : "";

    const variantClasses = {
      primary: isMobile
        ? baseClasses
        : "bg-primary text-background rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition flex items-center gap-2",
      secondary: isMobile
        ? baseClasses
        : "border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition",
      icon: isMobile
        ? baseClasses
        : "p-2 hover:bg-neutral-100 rounded-lg transition-colors relative",
      danger: isMobile
        ? `${baseClasses} text-red-600`
        : "w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded-lg transition-colors text-red-600",
    };

    const className = variantClasses[item.variant || "secondary"] || baseClasses;

    if (item.type === "link") {
      return (
        <Link
          key={item.id}
          to={item.to || "#"}
          className={className}
          onClick={isMobile ? handleCloseMobileMenu : undefined}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{item.label}</span>
          {item.icon === ArrowRight && !isMobile && (
            <ArrowRight className="w-4 h-4" />
          )}
        </Link>
      );
    }

    if (item.type === "button") {
      return (
        <button
          key={item.id}
          onClick={() => handleNavigation(item.to, item.onClick)}
          className={className}
          aria-label={item.label}
        >
          {item.icon && <item.icon className={isMobile ? "w-4 h-4" : "w-6 h-6"} />}
          {(!item.variant || item.variant !== "icon" || isMobile) && (
            <span>{item.label}</span>
          )}
        </button>
      );
    }

    return null;
  };

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/store')}>
          <ShoppingBag className="w-6 h-6" />
          <h1 className="text-2xl font-bold">SHOP.CO</h1>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex gap-3">
          <div className="flex items-center gap-4">
            {mainNavItems.map((item) => renderNavItem(item, false))}
            
            {/* Menú desplegable del usuario (solo desktop) */}
            {userMenuItems && (
              <div className="relative group">
                <button
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Perfil de usuario"
                >
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold text-sm">
                      {user?.name || "Usuario"}
                    </p>
                    <p className="text-xs text-muted">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    {userMenuItems.dropdownItems?.map((dropdownItem) => {
                      const visibleDropdownItems = getVisibleItems([dropdownItem]);
                      return visibleDropdownItems.map((item) => {
                        const dropdownClassName = item.variant === "danger"
                          ? "w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2 text-red-600"
                          : "w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2";
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (item.onClick) item.onClick();
                            }}
                            className={dropdownClassName}
                          >
                            {item.icon && <item.icon className="w-4 h-4" />}
                            <span>{item.label}</span>
                          </button>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menú Mobile */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-50 transition focus:outline-none focus:ring-2 focus:ring-primary"
            aria-haspopup="true"
            aria-expanded={isMobileMenuOpen}
          >
            <span>Menú</span>
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
          
          {isMobileMenuOpen && (
            <div className="absolute right-6 top-full mt-3 w-56 rounded-xl border border-border bg-background shadow-lg flex flex-col overflow-hidden z-50">
              {/* Información del usuario si está autenticado */}
              {user && (
                <div className="p-4 border-b border-border bg-neutral-50">
                  <p className="font-semibold text-sm">
                    {user?.name || "Usuario"}
                  </p>
                  <p className="text-xs text-muted">{user?.email}</p>
                </div>
              )}
              
              {/* Elementos principales del menú */}
              <div className="flex flex-col">
                {mainNavItems.map((item) => renderNavItem(item, true))}
                
                {/* Elementos del menú desplegable del usuario (en mobile se muestran directamente) */}
                {userMenuItems?.dropdownItems?.map((dropdownItem) => {
                  const visibleDropdownItems = getVisibleItems([dropdownItem]);
                  return visibleDropdownItems.map((item) => renderNavItem(item, true));
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
