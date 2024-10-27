"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumbs from "@components/Breadcrumbs";
import DashBoard from "@components/DashBoard";
import LandingPage from "@components/LandingPage";
import { useAuth } from "@context/AuthContext";
import Loader from "@components/Loader";

export default function ResponsiveDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [initialCheckCompleted, setInitialCheckCompleted] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dashboardRef.current &&
      !dashboardRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isLoading && !isAuthenticated()) {
        if (
          pathname !== "/" &&
          pathname !== "/login" &&
          pathname !== "/signup"
        ) {
          router.replace("/login");
        }
      }
      setInitialCheckCompleted(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading || !initialCheckCompleted) {
    return <Loader />;
  }

  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  if (pathname === "/" && !isLoading && !isAuthenticated()) {
    return <LandingPage />;
  }

  return (
    <div className="relative flex flex-col md:flex-row">
      <Breadcrumbs onMenuClick={handleMenuClick} />
      <div
        ref={dashboardRef}
        className={`fixed md:fixed top-0 md:top-auto w-4/5 md:w-1/6 h-screen bg-green-400 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-20`}
      >
        <DashBoard onLinkClick={() => setMenuOpen(false)} />
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden z-10`}
      />
      <div
        className={`mt-12 md:mt-0 ml-0 md:ml-[16.6667%] w-full md:w-[83.3333%] overflow-scroll ${
          menuOpen ? "filter blur-sm" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
