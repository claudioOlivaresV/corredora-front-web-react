import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { useLoginForm } from "../../hooks/useLoginForm";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formik, isLoading, isError } = useLoginForm();

  return (
    <main className="w-full max-w-[480px] mx-auto px-margin-mobile md:px-0 flex flex-col gap-section-gap">
      <header className="flex flex-col items-center gap-stack-md text-center mt-4">
        <h1 className="font-headline-lg text-headline-lg tracking-[0.2em] uppercase text-primary">
          Corredora Propiedades CAOV
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Portal Access
        </p>
      </header>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-stack-lg"
      >
        <div className="flex flex-col gap-stack-md">
          {/* EMAIL */}
          <div className="flex flex-col gap-stack-sm relative group">
            <label
              htmlFor="email"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.1em] transition-colors group-focus-within:text-primary"
            >
              Correo
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="executive@domain.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant/50 text-body-lg font-body-lg py-2 px-0 focus:ring-0 focus:border-primary transition-colors placeholder:text-outline/50 disabled:opacity-50"
            />

            {formik.touched.email && formik.errors.email && (
              <span className="text-sm text-error">{formik.errors.email}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-stack-sm">
            <label
              htmlFor="password"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.1em] transition-colors group-focus-within:text-primary"
            >
              Contraseña
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant/50 text-body-lg font-body-lg py-2 px-0 pr-8 focus:ring-0 focus:border-primary transition-colors placeholder:text-outline/50 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoading}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                className="absolute right-0 bottom-2 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={1.8} />
                ) : (
                  <Eye size={20} strokeWidth={1.8} />
                )}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <span className="text-sm text-error">
                {formik.errors.password}
              </span>
            )}
          </div>

          {/* API ERROR */}
          {isError && (
            <p className="text-sm text-error text-center">
              Credenciales incorrectas. Verifica tu correo y contraseña.
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <div className="flex flex-col gap-stack-md mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary rounded font-body-lg text-body-lg py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}

            {!isLoading && <ArrowRight size={20} strokeWidth={1.8} />}
          </button>
        </div>
      </form>

      <footer className="text-center pt-stack-lg border-t border-outline-variant/30 mt-auto">
        <p className="font-caption text-caption text-on-surface-variant opacity-70">
          © 2024 Claudio Olivares Videla.
        </p>
      </footer>
    </main>
  );
};
