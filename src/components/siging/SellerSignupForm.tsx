import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../../services/login.service';
import { useUserStore } from '../../stores/user.store';
import { toast } from 'react-hot-toast';
import type { CreateSeller } from '../../types/user.types';

export const SellerSignupForm = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateSeller & { logo_image: FileList | null }>({
    mode: 'onBlur',
  });

  const logoImage = watch('logo_image');

  const onSubmit = async (data: CreateSeller & { logo_image: FileList | null }) => {
    // Convertir FileList a File
    const logoFile = data.logo_image && data.logo_image.length > 0 ? data.logo_image[0] : null;
    
    // Crear el objeto CreateSeller con el File correcto
    const sellerData: CreateSeller = {
      ...data,
      logo_image: logoFile,
    };
    
    const {data: loginData, success, message} = await LoginService.registerSeller(sellerData);
    
    if (success && loginData) {
      setToken(loginData.access_token);
      setUser(loginData.user);
      toast.success('Vendedor registrado correctamente');
      navigate('/store', { replace: true });
    } else {
      toast.error(message);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Juan"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? 'border-red-500' : 'border-border'
          }`}
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="last_name_father" className="block text-sm font-medium mb-1">
            Apellido Paterno *
          </label>
          <input
            id="last_name_father"
            type="text"
            placeholder="Pérez"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.last_name_father ? 'border-red-500' : 'border-border'
            }`}
            {...register('last_name_father', { required: 'El apellido paterno es obligatorio' })}
          />
          {errors.last_name_father && (
            <p className="mt-1 text-sm text-red-500">{errors.last_name_father.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="last_name_mother" className="block text-sm font-medium mb-1">
            Apellido Materno *
          </label>
          <input
            id="last_name_mother"
            type="text"
            placeholder="Gómez"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.last_name_mother ? 'border-red-500' : 'border-border'
            }`}
            {...register('last_name_mother', { required: 'El apellido materno es obligatorio' })}
          />
          {errors.last_name_mother && (
            <p className="mt-1 text-sm text-red-500">{errors.last_name_mother.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Teléfono *
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="9999999999"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.phone ? 'border-red-500' : 'border-border'
          }`}
          {...register('phone', { required: 'El teléfono es obligatorio' })}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="type_document" className="block text-sm font-medium mb-1">
            Tipo de Documento *
          </label>
          <select
            id="type_document"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
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
            <p className="mt-1 text-sm text-red-500">{errors.type_document.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="num_document" className="block text-sm font-medium mb-1">
            Número de Documento *
          </label>
          <input
            id="num_document"
            type="text"
            placeholder="9999999999"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.num_document ? 'border-red-500' : 'border-border'
            }`}
            {...register('num_document', { required: 'El número de documento es obligatorio' })}
          />
          {errors.num_document && (
            <p className="mt-1 text-sm text-red-500">{errors.num_document.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Correo Electrónico *
        </label>
        <input
          id="email"
          type="email"
          placeholder="juan.perez@example.com"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
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
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Contraseña *
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
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
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="border-t border-border pt-5">
        <h3 className="text-lg font-semibold mb-4">Información de la Tienda</h3>
      </div>

      <div>
        <label htmlFor="shop_name" className="block text-sm font-medium mb-1">
          Nombre de la Tienda *
        </label>
        <input
          id="shop_name"
          type="text"
          placeholder="Mi Tienda"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.shop_name ? 'border-red-500' : 'border-border'
          }`}
          {...register('shop_name', { required: 'El nombre de la tienda es obligatorio' })}
        />
        {errors.shop_name && (
          <p className="mt-1 text-sm text-red-500">{errors.shop_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descripción de la Tienda *
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Describe tu tienda..."
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
            errors.description ? 'border-red-500' : 'border-border'
          }`}
          {...register('description', { required: 'La descripción de la tienda es obligatoria' })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="logo_image" className="block text-sm font-medium mb-1">
          Logo de la Tienda *
        </label>
        <input
          id="logo_image"
          type="file"
          accept="image/*"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-background hover:file:opacity-90 file:cursor-pointer ${
            errors.logo_image ? 'border-red-500' : 'border-border'
          }`}
          {...register('logo_image', {
            required: 'El logo de la tienda es obligatorio',
            validate: (value: FileList | null) => {
              if (!value || value.length === 0) {
                return 'El logo de la tienda es obligatorio';
              }
              return true;
            },
          })}
        />
        {errors.logo_image && (
          <p className="mt-1 text-sm text-red-500">{errors.logo_image.message}</p>
        )}
        {logoImage && logoImage.length > 0 && (
          <p className="mt-1 text-sm text-gray-500">Archivo seleccionado: {logoImage[0].name}</p>
        )}
      </div>

      <div>
        <label htmlFor="ruc" className="block text-sm font-medium mb-1">
          RUC de la Empresa *
        </label>
        <input
          id="ruc"
          type="text"
          placeholder="20123456789"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.ruc ? 'border-red-500' : 'border-border'
          }`}
          {...register('ruc', { required: 'El RUC es obligatorio' })}
        />
        {errors.ruc && (
          <p className="mt-1 text-sm text-red-500">{errors.ruc.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="business_address" className="block text-sm font-medium mb-1">
          Dirección del Negocio *
        </label>
        <input
          id="business_address"
          type="text"
          placeholder="Av. Principal 123, Lima"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.business_address ? 'border-red-500' : 'border-border'
          }`}
          {...register('business_address', { required: 'La dirección del negocio es obligatoria' })}
        />
        {errors.business_address && (
          <p className="mt-1 text-sm text-red-500">{errors.business_address.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-background font-medium py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta de Vendedor'}
      </button>
    </form>
  );
};

