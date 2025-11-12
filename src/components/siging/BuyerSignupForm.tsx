import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../../services/login.service';
import { useUserStore } from '../../stores/user.store';
import { toast } from 'react-hot-toast';
import type { CreateUser } from '../../types/user.types';
import { User, Phone, CreditCard, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const BuyerSignupForm = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUser>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: CreateUser) => {
    const {data: loginData, success, message} = await LoginService.register(data);
    
    if (success && loginData) {
      setToken(loginData.access_token);
      setUser(loginData.user);
      toast.success('Usuario registrado correctamente');
      navigate('/store', { replace: true });
    } else {
      toast.error(message);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <section className="rounded-2xl border border-border/70 bg-neutral-50/80 p-6 shadow-sm backdrop-blur-sm space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-text">
            Nombre <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              id="name"
              type="text"
              placeholder="Juan"
              className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.name ? 'border-red-500' : 'border-border'
              }`}
              {...register('name', { required: 'El nombre es obligatorio' })}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Last Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="last_name_father" className="block text-sm font-medium text-text">
              Apellido Paterno <span className="text-red-500">*</span>
            </label>
            <input
              id="last_name_father"
              type="text"
              placeholder="Pérez"
              className={`w-full px-4 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.last_name_father ? 'border-red-500' : 'border-border'
              }`}
              {...register('last_name_father', { required: 'El apellido paterno es obligatorio' })}
            />
            {errors.last_name_father && (
              <p className="text-sm text-red-500">{errors.last_name_father.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name_mother" className="block text-sm font-medium text-text">
              Apellido Materno <span className="text-red-500">*</span>
            </label>
            <input
              id="last_name_mother"
              type="text"
              placeholder="Gómez"
              className={`w-full px-4 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.last_name_mother ? 'border-red-500' : 'border-border'
              }`}
              {...register('last_name_mother', { required: 'El apellido materno es obligatorio' })}
            />
            {errors.last_name_mother && (
              <p className="text-sm text-red-500">{errors.last_name_mother.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-text">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              id="phone"
              type="tel"
              placeholder="999 999 999"
              className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.phone ? 'border-red-500' : 'border-border'
              }`}
              {...register('phone', { required: 'El teléfono es obligatorio' })}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Document */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type_document" className="block text-sm font-medium text-text">
              Tipo de Documento <span className="text-red-500">*</span>
            </label>
            <select
              id="type_document"
              className={`w-full px-4 py-3 border rounded-xl bg-background text-text focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.type_document ? 'border-red-500' : 'border-border'
              }`}
              {...register('type_document', { required: 'El tipo de documento es obligatorio' })}
            >
              <option value="">Seleccionar</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carné de Extranjería</option>
              <option value="PASS">Pasaporte</option>
            </select>
            {errors.type_document && (
              <p className="text-sm text-red-500">{errors.type_document.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="num_document" className="block text-sm font-medium text-text">
              Número <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                id="num_document"
                type="text"
                placeholder="99999999"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                  errors.num_document ? 'border-red-500' : 'border-border'
                }`}
                {...register('num_document', { required: 'El número de documento es obligatorio' })}
              />
            </div>
            {errors.num_document && (
              <p className="text-sm text-red-500">{errors.num_document.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-text">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-border'
              }`}
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'El correo electrónico no es válido',
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-text">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full pl-11 pr-12 py-3 border rounded-xl bg-background text-text placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all ${
                errors.password ? 'border-red-500' : 'border-border'
              }`}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </section>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full bg-foreground text-background font-semibold py-3.5 rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta de Comprador'}
        {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
};