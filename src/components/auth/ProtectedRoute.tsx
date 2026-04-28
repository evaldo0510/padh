import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePurchase } from "@/hooks/usePurchase";
import { PageSkeleton } from "@/components/ui/page-skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: require having purchased this product id */
  requireProduct?: string;
  redirectTo?: string;
  salesRedirect?: string;
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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireProduct,
  redirectTo = "/login",
  salesRedirect = "/prisao-interior",
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSkeleton />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname + location.search }}
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
