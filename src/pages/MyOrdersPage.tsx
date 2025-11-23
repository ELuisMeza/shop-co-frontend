import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetMyOrdersBuyer } from "../hooks/useGetMyOrdersBuyer";
import { Loader2, AlertCircle, Package } from "lucide-react";
import type { TypeMyOrdersBuyer, TypeMyOrdersSeller } from "../types/orders.types";
import { motion } from "framer-motion";
import { OrdersBuyers } from "../components/orders/OrdersBuyers";
import { OrdersSeller } from "../components/orders/OrdersSeller";

export const MyOrdersPage = () => {
  const location = useLocation();
  const userType = location.pathname.startsWith('/seller') ? 'seller' : 'buyer';
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const { orders, loading, error } = useGetMyOrdersBuyer({userType});

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[400px] gap-3"
      >
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-lg text-text">{error}</p>
      </motion.div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] gap-3"
      >
        <Package className="w-16 h-16 text-neutral-300" />
        <h2 className="text-xl font-semibold text-text">No tienes órdenes aún</h2>
        <p className="text-sm text-muted">Cuando realices una compra, aparecerá aquí.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-semibold text-text mb-6 sm:mb-8"
      >
        Mis Órdenes {userType === 'seller' && '(Vendedor)'}
      </motion.h1>

      {userType === 'buyer' ? (
        <OrdersBuyers orders={orders as TypeMyOrdersBuyer[]} expandedOrders={expandedOrders} toggleOrder={toggleOrder} />
      ) : (
        <OrdersSeller orders={orders as TypeMyOrdersSeller[]} expandedOrders={expandedOrders} toggleOrder={toggleOrder} />
      )}
    </div>
  );
}