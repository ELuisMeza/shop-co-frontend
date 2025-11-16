import { CartService } from "../services/cart.service";
import toast from "react-hot-toast";
import { useGetCartItems } from "../hooks/useGetCartItems";
import { Trash2, Plus, Minus, ShoppingCart, X, AlertCircle } from "lucide-react";
import { loadImage } from "../utils/loadImage";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";

export const CartPage = () => {
  const { cartItems, loading, error, setCartItems } = useGetCartItems();
  const [showClearModal, setShowClearModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calcular el total del carrito
  useEffect(() => {
    setTotalAmount(cartItems.reduce((total, item) => {
      const price = parseFloat(item.product_price);
      return total + (price * item.quantity);
    }, 0));
  }, [cartItems]);

  // Eliminar un item del carrito
  const handleDeleteCartItem = async (productId: string) => {
    
    const { success, message, data } = await CartService.deleteCartItem(productId);
    
    
    if (success && data) {
      toast.success(message);
      setCartItems(cartItems.filter(item => item.product_id !== productId));
    } else {
      toast.error(message);
    }
  };

  // Actualizar cantidad de un item
  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    
    const { success, message } = await CartService.updateCartItem(productId, newQuantity);
    
    if (success) {
      toast.success(message);
      setCartItems(cartItems.map(item => item.product_id === productId ? { ...item, quantity: newQuantity } : item));
    } else {
      toast.error(message);
    }
  };

  // Limpiar todo el carrito
  const handleClearCart = async () => {
    const { success, message } = await CartService.clearCart();
    
    if (success) {
      toast.success(message);
      setCartItems([]);
      setShowClearModal(false);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Carrito de Compras</h1>
          <p className="text-muted">
            {cartItems.length > 0 
              ? `${cartItems.length} ${cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito`
              : 'Tu carrito está vacío'
            }
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-foreground mb-4"></div>
              <p className="text-muted text-lg">Cargando carrito de compras...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error al cargar el carrito</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {/* Botón limpiar carrito */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowClearModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar carrito
                </button>
              </div>

              {/* Items del carrito */}
              {cartItems.map((item) => {
                
                return (
                  <div
                    key={item.product_id}
                    className={`bg-white border border-neutral-200 rounded-xl p-4 sm:p-6 transition-all ${
                      'hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Imagen del producto */}
                      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
                        {item.file_path ? (
                          <img
                            src={loadImage(item.file_path)}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300">
                            <ShoppingCart className="w-12 h-12" />
                          </div>
                        )}
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-text mb-1 truncate">
                              {item.product_name}
                            </h3>
                            <p className="text-sm text-muted">
                              Stock disponible: {item.product_stock}
                            </p>
                          </div>
                          
                          {/* Botón eliminar */}
                          <button
                            onClick={() => handleDeleteCartItem(item.product_id)}
                            className="p-2 h-fit text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Eliminar del carrito"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Precio y controles */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Precio unitario y total */}
                          <div className="space-y-1">
                            <p className="text-sm text-muted">
                              Precio: {formatPrice(item.product_price)}
                            </p>
                            <p className="text-xl font-bold text-text">
                              {formatPrice(parseFloat(item.product_price) * item.quantity)}
                            </p>
                          </div>

                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-9 h-9 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            
                            <span className="w-12 text-center font-semibold text-lg">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                              disabled={item.quantity >= item.product_stock}
                              className="w-9 h-9 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-neutral-200 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-text mb-6">Resumen del pedido</h2>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium text-text">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Envío</span>
                    <span className="font-medium text-text">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg font-semibold text-text">Total</span>
                  <span className="text-2xl font-bold text-text">{formatPrice(totalAmount)}</span>
                </div>

                <button className="w-full px-6 py-3.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold text-base shadow-sm">
                  Proceder al pago
                </button>

                <p className="text-xs text-muted text-center mt-4">
                  Los impuestos se calcularán en el checkout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-neutral-400" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">Tu carrito está vacío</h2>
              <p className="text-muted mb-8">
                Agrega productos a tu carrito para comenzar tu compra
              </p>
              <a
                href="/store"
                className="inline-block px-8 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold"
              >
                Explorar productos
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación para limpiar carrito */}
      {showClearModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowClearModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text mb-2">¿Limpiar carrito?</h3>
                  <p className="text-muted text-sm">
                    Se eliminarán todos los productos de tu carrito. Esta acción no se puede deshacer.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};