import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Sheet, SheetContent, SheetTitle } from "../components/ui/sheet";
import { Aside } from "../components/Aside";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const PrivateLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      {/* Menu desktop */}
      <aside className="fixed left-0 top-0 z-50 hidden h-full w-72 border-r border-outline-variant/30 bg-surface-container-lowest lg:block">
        <Aside />
      </aside>

      {/* Menu mobile */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-72 border-r border-outline-variant/30 bg-surface-container-lowest p-0"
        >
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

          <Aside onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Contenido */}
      <div className="flex min-h-screen flex-col lg:pl-72">
        <Header onMenuClick={() => setMenuOpen(true)} />

        <main className="flex-1 pt-16">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
