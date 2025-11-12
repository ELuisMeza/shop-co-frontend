import { Package, Shield, TrendingUp, Users, Zap } from "lucide-react";

export const benefits = [
  {
    icon: Shield,
    title: 'Pagos Seguros',
    description: 'Protección total en cada transacción con encriptación de nivel bancario'
  },
  {
    icon: TrendingUp,
    title: 'Crece tu negocio',
    description: 'Herramientas analíticas para optimizar tus ventas y alcance'
  },
  {
    icon: Users,
    title: 'Comunidad activa',
    description: 'Miles de compradores y vendedores verificados en la plataforma'
  },
  {
    icon: Zap,
    title: 'Gestión rápida',
    description: 'Administra productos, pedidos y pagos desde un solo dashboard'
  }
]

export const benefitsByCustomer = [
  {
    icon: Package,
    title: 'Para Compradores',
    description: 'Accede a miles de productos verificados, ofertas exclusivas y un sistema de pago seguro. Compra con confianza.',
    benefits: ['Productos verificados', 'Ofertas exclusivas', 'Compra protegida', 'Envío rastreado'],
    isSeller: false
  },
  {
    icon: TrendingUp,
    title: 'Para Vendedores',
    description: 'Publica fácilmente tus productos, gestiona tus ventas y recibe pagos rápidos sin intermediarios. Todo en un solo lugar.',
    benefits: ['Dashboard completo', 'Sin comisiones ocultas', 'Pagos instantáneos', 'Soporte 24/7'],
    isSeller: true
  }
]