import { Link } from 'react-router-dom';
import { Shield, Zap, ArrowRight } from 'lucide-react';
import { benefits, benefitsByCustomer } from '../lib/home/info-details';
import { BenefitsByCustomer } from '../components/home/BenefitsByCustomer';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <NavBar />

      {/* === Hero Section === */}
      <section className="relative flex flex-col lg:flex-row flex-1 items-center justify-center container mx-auto px-6 py-24 lg:py-32 gap-16">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-neutral-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-neutral-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="flex-1 max-w-2xl z-10 px-6">          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Compra y vende sin complicaciones
          </h2>
          <p className="text-lg text-muted mb-10 max-w-xl leading-relaxed">
            Encuentra los mejores productos, conecta con nuevos clientes y haz crecer tu negocio desde un solo lugar. Simple, seguro y efectivo.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/store" className="bg-primary text-background px-8 py-4 rounded-lg text-base font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-lg">
              Empieza ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-border">
            <div>
              <p className="text-3xl font-bold mb-1">10K+</p>
              <p className="text-sm text-muted">Usuarios</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">50K+</p>
              <p className="text-sm text-muted">Productos</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">98%</p>
              <p className="text-sm text-muted">Satisfacción</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center z-10">
          <div className="relative">
            <div className="w-96 h-96 bg-linear-to-r from-neutral-50 to-neutral-100 rounded-3xl shadow-2xl flex items-center justify-center border border-border overflow-hidden">
              {/* Mockup visual */}
              <div className="w-full h-full p-8 flex flex-col gap-4">
                <div className="bg-background rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-neutral-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-neutral-100 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-neutral-200 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-neutral-100 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm border border-border opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-neutral-200 rounded w-3/5 mb-2"></div>
                      <div className="h-2 bg-neutral-100 rounded w-2/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-background border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">100% Seguro</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold">Envío rápido</span>
            </div>
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section id="beneficios" className="bg-neutral-50 border-y border-border py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">¿Por qué elegir SHOP.CO?</h3>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Una plataforma diseñada para hacer tu experiencia más simple y efectiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((feature, idx) => (
              <div key={idx} className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Two Column Benefits === */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
          {benefitsByCustomer.map((feature, idx) => (
            <BenefitsByCustomer key={idx} {...feature} />
          ))}
        </div>
      </section>

      {/* === CTA Section === */}
      <section className="bg-neutral-900 text-white py-20 border-y border-neutral-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h3>
          <p className="text-neutral-300 text-lg mb-10 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están comprando y vendiendo en SHOP.CO
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/signup?type=buyer"
              className="bg-white text-neutral-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-neutral-100 transition"
            >
              Registrarme como Comprador
            </Link>
            <Link
              to="/signup?type=seller"
              className="border-2 border-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white hover:text-neutral-900 transition"
            >
              Registrarme como Vendedor
            </Link>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <Footer />
    </div>
  );
};