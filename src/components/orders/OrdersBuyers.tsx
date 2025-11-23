import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Calendar, CreditCard, Hash, ChevronUp, Package, Store } from "lucide-react";
import { formatDate, formatDateTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import type { TypeMyOrdersBuyer } from "../../types/orders.types";

export interface Props {
  orders: TypeMyOrdersBuyer[];
  expandedOrders: Set<string>;
  toggleOrder: (orderId: string) => void;
}

export const OrdersBuyers = ({ orders, expandedOrders, toggleOrder }: Props) => {
  return (
    <div className="space-y-3 sm:space-y-4">
    {orders.map((order: TypeMyOrdersBuyer, index: number) => {
      const isExpanded = expandedOrders.has(order.order_id);
      return (
        <motion.div
          key={order.order_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white border border-neutral-200 rounded-lg sm:rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggleOrder(order.order_id)}
            className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between hover:bg-neutral-50/50 transition-colors text-left group"
          >
            <div className="flex items-center gap-3 sm:gap-8 flex-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                <div>
                  <p className="text-xs sm:text-sm text-muted mb-0.5">Fecha</p>
                  <p className="text-sm sm:text-base font-medium text-text">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <div>
                  <p className="text-xs sm:text-sm text-muted mb-0.5">Total</p>
                  <p className="text-lg sm:text-xl font-semibold text-text">
                    {formatPrice(order.total_amount)}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ml-3 sm:ml-6"
            >
              <ChevronUp className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden border-t border-neutral-200"
              >
                <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
                  {/* Grid de información de pago */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                    <div className="flex items-start gap-2 sm:gap-2.5">
                      <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 mt-1" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">ID de Pago</p>
                        <p className="text-xs sm:text-sm font-medium text-text truncate">{order.payment_id}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-2.5">
                      <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 mt-1" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">PayPal ID</p>
                        <p className="text-xs sm:text-sm font-medium text-text truncate">{order.paypal_id}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-2.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 mt-1" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">Pagado</p>
                        <p className="text-xs sm:text-sm font-medium text-text">{formatDateTime(order.paid_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-2.5">
                      <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 mt-1" />
                      <div>
                        <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">Productos</p>
                        <p className="text-xs sm:text-sm font-medium text-text">
                          {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sección de productos */}
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-text mb-2 sm:mb-3">Productos</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.order_item_id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="bg-neutral-50 rounded-lg p-3 sm:p-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm sm:text-base text-text mb-1 sm:mb-1.5">
                                {item.product_name}
                              </h4>
                              <div className="flex items-center gap-1.5 mb-2">
                                <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted shrink-0" />
                                <p className="text-xs sm:text-sm text-muted truncate">{item.seller_name}</p>
                              </div>
                              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted">
                                <span>
                                  Cant: <span className="font-medium text-text">{item.quantity}</span>
                                </span>
                                <span>
                                  Precio: <span className="font-medium text-text">{formatPrice(item.unit_price)}</span>
                                </span>
                              </div>
                            </div>
                            <div className="text-right sm:ml-6 shrink-0">
                              <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">Subtotal</p>
                              <p className="text-lg sm:text-xl font-semibold text-text">
                                {formatPrice(item.total_price)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-neutral-200">
                    <p className="text-sm sm:text-base font-medium text-text">Total de la Orden</p>
                    <p className="text-2xl sm:text-3xl font-semibold text-text">
                      {formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    })}
  </div>
  );
}