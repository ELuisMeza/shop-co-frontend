import { Link, useSearchParams } from 'react-router-dom';
import { BuyerSignupForm } from '../components/siging/BuyerSignupForm';
import { SellerSignupForm } from '../components/siging/SellerSignupForm';
import { ShoppingBag, Store, CheckCircle, Shield, Zap } from 'lucide-react';

export const SigingPage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'buyer';

  const isSeller = userType === 'seller';

  return (
    <div className="min-h-screen lg:h-screen bg-neutral-50 flex flex-col lg:flex-row">
      {/* Left side - Visual / Illustration */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden bg-foreground text-background px-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-background/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-8 w-64 h-64 bg-background/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-background/25 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-xl w-full space-y-8">
          <div className="w-16 h-16 bg-background/15 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg shadow-background/10">
            {isSeller ? <Store className="w-8 h-8" /> : <ShoppingBag className="w-8 h-8" />}
          </div>

          <div>
            <h2 className="text-4xl font-semibold mb-4 leading-tight">
              {isSeller ? 'Empieza a vender hoy' : 'Únete a nuestra comunidad'}
            </h2>
            <p className="text-lg text-background/80">
              {isSeller
                ? 'Crea tu tienda online y llega a miles de clientes potenciales.'
                : 'Descubre productos únicos y compra con confianza.'}
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-background/15 rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isSeller ? 'Panel de control intuitivo' : 'Proceso de compra seguro'}
                </p>
                <p className="text-sm text-background/70">
                  {isSeller ? 'Gestiona tu inventario fácilmente' : 'Protegemos tu información'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-background/15 rounded-2xl flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isSeller ? 'Pagos seguros garantizados' : 'Compra con confianza'}
                </p>
                <p className="text-sm text-background/70">
                  {isSeller ? 'Recibe tus pagos sin complicaciones' : 'Garantía en todas las compras'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-background/15 rounded-2xl flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isSeller ? 'Empieza en minutos' : 'Acceso instantáneo'}
                </p>
                <p className="text-sm text-background/70">
                  {isSeller ? 'Configura tu tienda rápidamente' : 'Compra inmediatamente después del registro'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-1/2 flex flex-col lg:h-screen overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
          <div className="w-full max-w-xl">
            <div className="bg-background/90 backdrop-blur-md border border-border/70 rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-foreground text-background rounded-2xl flex items-center justify-center shadow-md">
                    {isSeller ? <Store className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="inline-flex items-center px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-text">
                      {isSeller ? 'Vendedor' : 'Comprador'}
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-text mb-2">
                    {isSeller ? 'Crea tu Tienda' : 'Crea tu Cuenta'}
                  </h1>
                  <p className="text-muted text-base">
                    {isSeller
                      ? 'Completa el formulario para comenzar a vender'
                      : 'Regístrate y empieza a comprar en minutos'}
                  </p>
                </div>
              </div>

              {/* Form Component */}
              <div className="lg:max-h-[56vh] lg:overflow-y-auto lg:pr-2 lg:-mr-2 custom-scrollbar">
                {isSeller ? <SellerSignupForm /> : <BuyerSignupForm />}
              </div>

              {/* Footer */}
              <div className="text-center border-t border-border/60 pt-6">
                <p className="text-sm text-muted">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-foreground font-medium hover:underline">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};