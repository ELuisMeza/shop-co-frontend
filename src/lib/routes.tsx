import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SigingPage } from '../pages/SigingPage';
import { StorePage } from '../pages/StorePage';
import { MainPage } from '../pages/MainPage';
import { useUserStore } from '../stores/user.store';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SellerDashboardPage } from '../pages/SellerDashboardPage';
import { CartPage } from '../pages/CartPage';
import { UserConfigPage } from '../pages/UserConfigPage';
import { ConfirmPaymentPage } from '../pages/ConfirmPaymentPage';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useUserStore();

  if (user && token) {
    return <Navigate to="/store" replace />;
  }

  return <>{children}</>;
};


const UserProtectedRoute = ({ children, typeUser, allUsers = false }: { children: React.ReactNode, typeUser?: "buyer" | "seller", allUsers?: boolean }) => {
  const { user, token } = useUserStore();

  if(allUsers) {
    if (!user || !token) return <Navigate to="/store" replace />;
  }

  if(typeUser === "buyer") {
    if (!user || !token || user?.role?.name?.toLowerCase() !== "buyer") return <Navigate to="/store" replace />;
  } else if(typeUser === "seller") {
    if (!user || !token || user?.role?.name?.toLowerCase() !== "seller") return <Navigate to="/store" replace />;
  }

  return <>{children}</>;
};



/**
 * Configuración de rutas de la aplicación
 */

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute>
        <SigingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/store',
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <StorePage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailsPage />,
      }
    ],
  },
  {
    path: '/seller/dashboard',
    element: (
      <UserProtectedRoute typeUser="seller">
        <MainPage />
      </UserProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SellerDashboardPage />,
      },
    ],
  },
  {
    path: '/store/cart',
    element: (
      <UserProtectedRoute typeUser="buyer">
        <MainPage />
      </UserProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CartPage />,
      },
      {
        path: 'order',
        element: <ConfirmPaymentPage />,
      },
    ],
  },
  {
    path: '/user/config',
    element: (
      <UserProtectedRoute allUsers={true}>
        <MainPage />
      </UserProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserConfigPage />,
      },
    ],
  }
];

