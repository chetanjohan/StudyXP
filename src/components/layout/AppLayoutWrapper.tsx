"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { GlobalSearchModal } from "@/components/ui/GlobalSearchModal";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans antialiased relative overflow-hidden">
        <ParticleCanvas />
        <main className="min-h-screen relative z-10">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden relative">
      <ParticleCanvas />
      <GlobalSearchModal />

      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AppLayoutWrapper;
