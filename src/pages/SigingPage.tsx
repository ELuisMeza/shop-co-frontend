import { Link, useSearchParams } from 'react-router-dom';
import { BuyerSignupForm } from '../components/BuyerSignupForm';
import { SellerSignupForm } from '../components/SellerSignupForm';

export const SigingPage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'buyer';

  return (
    <div className="min-h-screen flex bg-background text-text">
      {/* Left side - Visual / Illustration */}
      <div className="hidden md:flex w-1/2 bg-primary text-background items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Comienza tu viaje hoy</h2>
          <p className="text-sm opacity-80">
            {userType === 'seller' 
              ? 'Crea tu tienda y comienza a vender productos.'
              : 'Crea una cuenta y únete a nuestra comunidad.'}
          </p>
          <div className="mt-8 bg-background text-primary rounded-xl shadow-lg p-6">
            <div className="h-40 bg-neutral-100 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-semibold mb-2">
            {userType === 'seller' ? 'Crea tu Tienda' : 'Crea tu Cuenta'}
          </h1>
          <p className="text-muted mb-8">
            {userType === 'seller' 
              ? 'Regístrate como vendedor y comienza a vender tus productos.'
              : 'Regístrate para comenzar a comprar productos.'}
          </p>

          {userType === 'seller' ? <SellerSignupForm /> : <BuyerSignupForm />}

          <p className="text-sm text-muted mt-8 text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
