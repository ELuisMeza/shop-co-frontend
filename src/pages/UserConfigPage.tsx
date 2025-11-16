import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetMyProfile } from "../hooks/useGetMyProfile";
import { UsersService } from "../services/users.service";
import { User, Mail, Phone, CreditCard, Calendar, Shield, Edit2, Check, X, AlertCircle } from "lucide-react";
import type { UpdateUserProfile } from "../types/user.types";

export const UserConfigPage = () => {
  const { profile, loading, error, setProfile } = useGetMyProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserProfile>({
    defaultValues: {
      name: "",
      last_name_father: "",
      last_name_mother: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        last_name_father: profile.last_name_father,
        last_name_mother: profile.last_name_mother,
        phone: profile.phone,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: UpdateUserProfile) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const { success, message, data: updatedProfile } = await UsersService.updateMyProfile(data);
    
    if (success && updatedProfile) {
      setProfile(updatedProfile);
      setSuccessMessage(message);
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setErrorMessage(message);
    }
  };

  const handleCancel = () => {
    if (profile) {
      reset({
        name: profile.name,
        last_name_father: profile.last_name_father,
        last_name_mother: profile.last_name_mother,
        phone: profile.phone,
      });
    }
    setIsEditing(false);
    setErrorMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted text-lg">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Error al cargar el perfil</h3>
              <p className="text-red-700">{error || "No se pudo cargar la información del perfil"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getRoleLabel = (roleName: string) => {
    const roles: Record<string, string> = {
      buyer: "Comprador",
      seller: "Vendedor",
      admin: "Administrador",
    };
    return roles[roleName] || roleName;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con avatar y acciones */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-foreground to-neutral-700 flex items-center justify-center shadow-lg ring-4 ring-white">
                <span className="text-3xl font-bold text-white">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text mb-1">
                  {profile.name} {profile.last_name_father}
                </h1>
                <p className="text-muted flex items-center gap-2">
                  <User className="w-4 h-4" />
                  @{profile.username}
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
            )}
          </div>

          {/* Badges de estado y rol */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-semibold text-text">
              <Shield className="w-4 h-4" />
              {getRoleLabel(profile.role.name)}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-muted">
              <Calendar className="w-4 h-4" />
              Miembro desde {new Date(profile.created_at).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Mensajes de éxito/error */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-800 font-medium">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Información Personal */}
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </h2>
              <p className="text-sm text-muted mt-1">Actualiza tus datos personales</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "El nombre es requerido" })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-all ${
                      isEditing 
                        ? 'bg-white border-neutral-300 focus:ring-2 focus:ring-foreground/20 focus:border-foreground' 
                        : 'bg-neutral-50 border-neutral-200 cursor-not-allowed text-muted'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Apellido Paterno */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    {...register("last_name_father", { required: "El apellido paterno es requerido" })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-all ${
                      isEditing 
                        ? 'bg-white border-neutral-300 focus:ring-2 focus:ring-foreground/20 focus:border-foreground' 
                        : 'bg-neutral-50 border-neutral-200 cursor-not-allowed text-muted'
                    }`}
                  />
                  {errors.last_name_father && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.last_name_father.message}
                    </p>
                  )}
                </div>

                {/* Apellido Materno */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    {...register("last_name_mother", { required: "El apellido materno es requerido" })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-all ${
                      isEditing 
                        ? 'bg-white border-neutral-300 focus:ring-2 focus:ring-foreground/20 focus:border-foreground' 
                        : 'bg-neutral-50 border-neutral-200 cursor-not-allowed text-muted'
                    }`}
                  />
                  {errors.last_name_mother && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.last_name_mother.message}
                    </p>
                  )}
                </div>

                {/* Nombre de Usuario (solo lectura) */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Nombre de Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type="text"
                      value={profile.username}
                      disabled
                      className="w-full pl-11 pr-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed text-muted"
                    />
                  </div>
                  <p className="text-xs text-muted mt-1">El nombre de usuario no se puede modificar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Información de Contacto
              </h2>
              <p className="text-sm text-muted mt-1">Mantén actualizada tu información de contacto</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isEditing ? 'text-muted' : 'text-neutral-400'}`} />
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full pl-11 pr-4 py-3 border rounded-lg bg-neutral-50 cursor-not-allowed text-muted"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isEditing ? 'text-muted' : 'text-neutral-400'}`} />
                    <input
                      type="tel"
                      {...register("phone", { required: "El teléfono es requerido" })}
                      disabled={!isEditing}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg transition-all ${
                        isEditing 
                          ? 'bg-white border-neutral-300 focus:ring-2 focus:ring-foreground/20 focus:border-foreground' 
                          : 'bg-neutral-50 border-neutral-200 cursor-not-allowed text-muted'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Información de Documento (solo lectura) */}
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Información de Documento
              </h2>
              <p className="text-sm text-muted mt-1">Esta información no se puede modificar</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Tipo de Documento
                  </label>
                  <input
                    type="text"
                    value={profile.type_document}
                    disabled
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    value={profile.num_document}
                    disabled
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed text-muted"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información de Cuenta (solo lectura) */}
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Información de Cuenta
              </h2>
              <p className="text-sm text-muted mt-1">Detalles de tu cuenta en el sistema</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Rol en el Sistema
                  </label>
                  <input
                    type="text"
                    value={profile.role.description}
                    disabled
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Fecha de Registro
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      value={new Date(profile.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      disabled
                      className="w-full pl-11 pr-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed text-muted"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción (solo visible en modo edición) */}
          {isEditing && (
            <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-300 text-text rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};