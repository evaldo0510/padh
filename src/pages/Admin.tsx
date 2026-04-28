import React from "react";
import PageLayout from "@/components/layout/PageLayout";

const Admin = () => {
  return (
    <PageLayout
      seo={{
        title: "Admin",
        description: "Painel administrativo P.A.D.H.",
        path: "/admin",
      }}
      currentPage="Admin"
    >
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-8">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground mb-8">
            Bem-vindo ao painel de administração da plataforma P.A.D.H.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Conteúdo
              </h3>
              <p className="text-sm text-muted-foreground">
                Gerenciar páginas e publicações
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Ferramentas
              </h3>
              <p className="text-sm text-muted-foreground">
                Configurar ferramentas P.A.D.H.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Estatísticas
              </h3>
              <p className="text-sm text-muted-foreground">
                Visualizar métricas e acessos
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Admin;
