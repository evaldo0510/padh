import React, { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { usePurchase } from "@/hooks/usePurchase";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { toast } from "sonner";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProduct?: string;
  requireAdmin?: boolean;
  redirectTo?: string;
  salesRedirect?: string;
  authMessage?: string;
}

const ProductGate: React.FC<{ productId: string; salesRedirect: string; children: React.ReactNode }> = ({ productId, salesRedirect, children }) => {
  const { hasAccess, loading } = usePurchase(productId);
  if (loading) return <PageSkeleton />;
  if (!hasAccess) return <Navigate to={salesRedirect} replace />;
  return <>{children}</>;
};

const AdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, loading, error } = useIsAdmin();
  useEffect(() => {
    if (!loading && !isAdmin) toast.error("Acesso restrito a administradores.", { id: "admin-required" });
  }, [loading, isAdmin]);

  if (loading) return <PageSkeleton />;
  if (!isAdmin) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-12">
        <section className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-7 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive"><ShieldAlert className="h-7 w-7" /></div>
          <h1 className="text-2xl font-bold">Área administrativa restrita</h1>
          <p className="text-sm text-muted-foreground">{error ? "Não foi possível validar sua permissão administrativa. Tente novamente mais tarde." : "Sua conta não possui a autorização necessária para acessar o painel administrativo."}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild variant="outline"><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao site</Link></Button>
            <Button asChild><Link to="/login"><LogIn className="mr-2 h-4 w-4" /> Entrar com outra conta</Link></Button>
          </div>
        </section>
      </main>
    );
  }
  return <>{children}</>;
};

const AuthRedirect: React.FC<{ to: string; from: string; message: string }> = ({ to, from, message }) => {
  useEffect(() => { toast.error(message, { id: "auth-required" }); }, [message]);
  return <Navigate to={to} replace state={{ from, message }} />;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children, requireProduct, requireAdmin, redirectTo = "/login",
  salesRedirect = "/prisao-interior", authMessage = "Você precisa estar logado para acessar essa área.",
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageSkeleton />;
  if (!isAuthenticated) return <AuthRedirect to={redirectTo} from={location.pathname + location.search} message={authMessage} />;
  if (requireProduct) return <ProductGate productId={requireProduct} salesRedirect={salesRedirect}>{children}</ProductGate>;
  if (requireAdmin) return <AdminGate>{children}</AdminGate>;
  return <>{children}</>;
};

export default ProtectedRoute;
