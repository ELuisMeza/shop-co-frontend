import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SigingPage } from '../pages/SigingPage';
import { StorePage } from '../pages/StorePage';
import { MainPage } from '../pages/MainPage';
import { useUserStore } from '../stores/user.store';

/**
 * Componente para proteger rutas de invitados (login/signup)
 * Si el usuario está autenticado, redirige a /store
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useUserStore();

  if (user && token) {
    return <Navigate to="/store" replace />;
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
    ],
  }
];

