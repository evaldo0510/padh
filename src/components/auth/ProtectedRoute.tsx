import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePurchase } from "@/hooks/usePurchase";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: require having purchased this product id */
  requireProduct?: string;
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

  return <>{children}</>;
};

export default ProtectedRoute;
