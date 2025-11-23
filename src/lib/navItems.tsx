import { ArrowRight, ShoppingCart, Store, User, Settings } from "lucide-react";
import type { NavItem } from "../types/navbar.types";

interface NavItemsConfig {
  navigate: (path: string) => void;
  logout: () => void;
}

export const getNavItems = ({ navigate, logout }: NavItemsConfig): NavItem[] => [
  // Elementos para usuarios no autenticados (sin visibleFor = visible cuando no hay usuario)
  {
    id: "buyer-signup",
    label: "Soy Comprador",
    type: "link",
    to: "/signup?type=buyer",
    variant: "secondary",
  },
  {
    id: "seller-signup",
    label: "Soy Vendedor",
    icon: Store,
    type: "link",
    to: "/signup?type=seller",
    variant: "primary",
  },
  {
    id: "login",
    label: "Iniciar Sesión",
    icon: ArrowRight,
    type: "link",
    to: "/login",
    variant: "primary",
  },
  // Elementos para vendedores
  {
    id: "manage-store",
    label: "Gestionar Tienda",
    icon: Store,
    type: "link",
    to: "/seller/dashboard",
    visibleFor: ["seller"],
    variant: "primary",
  },
  // Elementos para compradores
  {
    id: "cart",
    label: "Carrito de compras",
    icon: ShoppingCart,
    type: "button",
    onClick: () => navigate("/store/cart"),
    visibleFor: ["buyer"],
    variant: "icon",
  },
  // Elementos del menú desplegable del usuario
  {
    id: "user-menu",
    label: "Perfil de usuario",
    icon: User,
    type: "dropdown",
    visibleFor: ["buyer", "seller"],
    variant: "icon",
    dropdownItems: [
      {
        id: "config",
        label: "Configuración",
        icon: Settings,
        type: "button",
        onClick: () => navigate("/user/config"),
        visibleFor: ["all"],
      },
      {
        id: "logout",
        label: "Cerrar sesión",
        type: "button",
        onClick: () => logout(),
        visibleFor: ["all"],
        variant: "danger",
      },
    ],
  },
];