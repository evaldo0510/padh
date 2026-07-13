import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { usePurchase } from "@/hooks/usePurchase";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: require having purchased this product id */
  requireProduct?: string;
  /** Optional: require the authenticated user to have the `admin` role */
  requireAdmin?: boolean;
  redirectTo?: string;
  salesRedirect?: string;
  /** Custom message shown when redirecting unauthenticated users */
  authMessage?: string;
}

const ProductGate: React.FC<{
  productId: string;
  salesRedirect: string;
  children: React.ReactNode;
}> = ({ productId, salesRedirect, children }) => {
  const { hasAccess, loading } = usePurchase(productId);
  if (loading) return <PageSkeleton />;
  if (!hasAccess) return <Navigate to={salesRedirect} replace />;
  return <>{children}</>;
};

const AdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, loading } = useIsAdmin();
  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Acesso restrito a administradores.", { id: "admin-required" });
    }
  }, [loading, isAdmin]);
  if (loading) return <PageSkeleton />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AuthRedirect: React.FC<{ to: string; from: string; message: string }> = ({
  to,
  from,
  message,
}) => {
  useEffect(() => {
    toast.error(message, { id: "auth-required" });
  }, [message]);
  return <Navigate to={to} replace state={{ from, message }} />;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireProduct,
  requireAdmin,
  redirectTo = "/login",
  salesRedirect = "/prisao-interior",
  authMessage = "Você precisa estar logado para acessar essa área.",
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSkeleton />;

  if (!isAuthenticated) {
    return (
      <AuthRedirect
        to={redirectTo}
        from={location.pathname + location.search}
        message={authMessage}
      />
    );
  }

  if (requireProduct) {
    return (
      <ProductGate productId={requireProduct} salesRedirect={salesRedirect}>
        {children}
      </ProductGate>
    );
  }

  if (requireAdmin) {
    return <AdminGate>{children}</AdminGate>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

