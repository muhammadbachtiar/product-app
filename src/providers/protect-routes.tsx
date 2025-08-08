"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Spin } from "antd";
import { useAuth } from "@/app/context/AuthContext";

function ProtectRoutes({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false);

  const shouldRedirect = useMemo(() => {
    const isNoToken = !user;

    if (pathname === "/") {
      return "/login";
    }

    // if (pathname === "/login" && user) return "/products";

    // if (pathname.startsWith("/") && !user && pathname !== "/login")
    //   return "/login";

    return false;
  }, [pathname]);

  useEffect(() => {
    if (shouldRedirect) {
      setRedirecting(true);
      window.location.href = shouldRedirect;
    } else {
      setRedirecting(false);
    }
  }, [shouldRedirect, router]);

  if (redirecting || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectRoutes;
