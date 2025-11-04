import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      {/* === Header === */}
      <header className="w-full border-b border-border py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">SHOP.CO</h1>
        <div className="flex gap-3">
          <Link 
            to="/signup?type=buyer" 
            className="border border-border rounded-lg px-4 py-2 hover:bg-neutral-100 transition"
          >
            Regístrate como Comprador
          </Link>
          <Link 
            to="/signup?type=seller" 
            className="bg-primary text-background rounded-lg px-4 py-2 hover:opacity-90 transition"
          >
            Regístrate como Vendedor
          </Link>
        </div>
      </header>

      {/* === Hero Section === */}
      <section className="flex flex-col lg:flex-row flex-1 items-center justify-center text-center lg:text-left container mx-auto px-6 py-20 gap-10">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">Compra y vende sin complicaciones</h2>
          <p className="text-muted mb-8 max-w-md">
            Encuentra los mejores productos, conecta con nuevos clientes y haz crecer tu negocio desde un solo lugar.
          </p>
          <button className="bg-primary text-background px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
            Empieza ahora
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-80 h-56 bg-neutral-100 rounded-xl shadow-inner flex items-center justify-center">
            <span className="text-muted">[Vista previa del Marketplace]</span>
          </div>
        </div>
      </section>

      {/* === Benefits Section === */}
      <section className="bg-neutral-50 border-t border-border py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Para Compradores</h3>
            <p className="text-muted">
              Accede a miles de productos verificados, ofertas exclusivas y un sistema de pago seguro.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Para Vendedores</h3>
            <p className="text-muted">
              Publica fácilmente tus productos, gestiona tus ventas y recibe pagos rápidos sin intermediarios.
            </p>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="mt-auto border-t border-border py-6 text-center text-sm text-muted">
        © 2025 MarketPro. Todos los derechos reservados.
      </footer>
    </div>
  );
};
