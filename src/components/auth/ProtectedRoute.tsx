import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, hasPurchase } from "@/hooks/useAuth";
import { PageSkeleton } from "@/components/ui/page-skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: require having purchased this product id */
  requireProduct?: string;
  /** Where to send unauthenticated users */
  redirectTo?: string;
  /** Where to send authenticated users without the required product */
  salesRedirect?: string;
}

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

  if (requireProduct && !hasPurchase(requireProduct)) {
    return <Navigate to={salesRedirect} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
