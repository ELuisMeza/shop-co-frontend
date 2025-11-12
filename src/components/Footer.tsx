import { ShoppingBag } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6" />
              <h4 className="text-xl font-bold">SHOP.CO</h4>
            </div>
            <p className="text-muted text-sm">
              Tu marketplace de confianza para comprar y vender productos de
              calidad.
            </p>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted">
          © {new Date().getFullYear()} SHOP.CO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
