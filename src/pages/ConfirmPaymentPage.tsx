import { useSearchParams, useNavigate } from "react-router-dom";
import { useConfirmPayment } from "../hooks/useConfirmPayment";
import { Loader2, CheckCircle2, XCircle, ArrowLeft, CreditCard, AlertCircle } from "lucide-react";

export const ConfirmPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const { loading, error } = useConfirmPayment({ token });

  // Si no hay token, mostrar error
  if (!token) {
    return (
      <div className="flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-md w-full bg-white border border-yellow-200 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-full mb-3">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-text mb-2">Token de pago no encontrado</h1>
          <p className="text-muted text-sm mb-5">
            No se encontró un token de confirmación de pago válido en la URL.
          </p>
          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/store')}
              className="w-full px-6 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold text-sm shadow-sm"
            >
              Volver a la tienda
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="w-full px-6 py-2.5 bg-white border border-neutral-300 text-text rounded-lg hover:bg-neutral-50 [98] transition-all font-semibold text-sm"
            >
              Ver mi carrito
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className=" bg-neutral-50 flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-text mb-2">Confirmando pago</h1>
          <p className="text-muted text-sm mb-4">
            Estamos procesando tu pago. Por favor, espera un momento...
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text mb-3">Error al confirmar el pago</h1>
          <p className="text-muted text-sm sm:text-base mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/store')}
              className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold text-base shadow-sm"
            >
              Volver a la tienda
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="w-full px-6 py-3 bg-white border border-neutral-300 text-text rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all font-semibold text-base"
            >
              Ver mi carrito
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-4 animate-in zoom-in-95 duration-500">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          ¡Pago confirmado!
        </h1>
        <p className="text-muted text-sm sm:text-base mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Tu pago ha sido procesado exitosamente. Recibirás un correo de confirmación con los detalles de tu pedido.
        </p>
        
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6 animate-in fade-in duration-500 delay-200">
          <div className="flex items-center justify-center gap-2 text-muted text-sm">
            <CreditCard className="w-4 h-4" />
            <span>Transacción completada</span>
          </div>
        </div>

        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <button
            onClick={() => navigate('/store')}
            className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold text-base shadow-sm"
          >
            Continuar comprando
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-white border border-neutral-300 text-text rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all font-semibold text-base inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}