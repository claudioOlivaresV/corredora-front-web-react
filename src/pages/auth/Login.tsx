import { ArrowRight, EyeOff, HelpCircle } from "lucide-react";

export const Login = () => {
  return (
    <main className="w-full max-w-[480px] mx-auto px-margin-mobile md:px-0 flex flex-col gap-section-gap">
      <header className="flex flex-col items-center gap-stack-md text-center">
        <h1 className="font-headline-lg text-headline-lg tracking-[0.2em] uppercase text-primary">
          Corredora Propiedades CAOV
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Portal Access
        </p>
      </header>

      <form className="flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-md">
          <div className="flex flex-col gap-stack-sm relative group">
            <label
              htmlFor="email"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.1em] transition-colors group-focus-within:text-primary"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="executive@domain.com"
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant/50 text-body-lg font-body-lg py-2 px-0 focus:ring-0 focus:border-primary transition-colors placeholder:text-outline/50"
            />
          </div>

          <div className="flex flex-col gap-stack-sm relative group">
            <label
              htmlFor="password"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.1em] transition-colors group-focus-within:text-primary"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant/50 text-body-lg font-body-lg py-2 px-0 focus:ring-0 focus:border-primary transition-colors placeholder:text-outline/50"
            />

            <button
              type="button"
              aria-label="Toggle password visibility"
              className="absolute right-0 bottom-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <EyeOff size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-stack-md mt-4">
          <button
            type="submit"
            className="w-full bg-primary text-on-primary rounded font-body-lg text-body-lg py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight size={20} strokeWidth={1.8} />
          </button>

          <div className="flex items-center justify-between mt-2">
            <a
              href="#"
              className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors"
            >
              Forgot Password?
            </a>

            <a
              href="#"
              className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              Contact Support
              <HelpCircle size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </form>

      <footer className="text-center pt-stack-lg border-t border-outline-variant/30 mt-auto">
        <p className="font-caption text-caption text-on-surface-variant opacity-70">
          © 2024 AESTHET Management. Secure Gateway.
        </p>
      </footer>
    </main>
  );
};
