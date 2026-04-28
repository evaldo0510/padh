import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, PRODUCT_PRISAO_INTERIOR } from "@/hooks/useAuth";
import { usePurchase } from "@/hooks/usePurchase";
import CheckoutDialog, { PLAN_OPTIONS, type PlanKey } from "@/components/checkout/CheckoutDialog";

const PLAN_FEATURES: Record<PlanKey, string[]> = {
  mensal: ["Acesso aos 5 episódios", "Progresso salvo na nuvem", "Cancele quando quiser"],
  anual: ["Tudo do mensal", "Economia de ~30%", "Suporte prioritário", "Conteúdos extras"],
  vitalicio: ["Tudo do anual", "Acesso vitalício", "Atualizações futuras", "Bônus exclusivos"],
};

const PlanosPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { hasAccess } = usePurchase(PRODUCT_PRISAO_INTERIOR);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("vitalicio");

  const choose = (plan: PlanKey) => {
    if (hasAccess) { navigate("/meu-produto"); return; }
    if (!isAuthenticated) { navigate("/login", { state: { from: "/planos" } }); return; }
    setSelectedPlan(plan);
    setOpen(true);
  };

  return (
    <PageLayout
      seo={{ title: "Planos — Prisão Interior", description: "Escolha o plano ideal: mensal, anual ou vitalício.", path: "/planos" }}
      currentPage="Planos"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-14 max-w-2xl mx-auto space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20"><Sparkles className="w-3 h-3 mr-1" /> Monetização</Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">Escolha seu plano</h1>
          <p className="text-muted-foreground text-lg">
            Mesma jornada, três formas de embarcar. Pague uma vez ou aos poucos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLAN_OPTIONS.map((opt) => {
            const featured = opt.key === "anual";
            return (
              <Card
                key={opt.key}
                className={`relative flex flex-col transition-all hover:shadow-xl ${
                  featured ? "border-primary shadow-lg md:scale-105" : "border-primary/10"
                }`}
              >
                {featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Mais popular</Badge>
                )}
                <CardHeader className="text-center pb-3">
                  <div className="text-sm uppercase tracking-widest text-muted-foreground">{opt.label}</div>
                  <div className="text-4xl font-heading font-black text-primary mt-2">{opt.priceLabel}</div>
                  <div className="text-xs text-muted-foreground mt-1">{opt.helper}</div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {PLAN_FEATURES[opt.key].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => choose(opt.key)}
                    className="w-full"
                    variant={featured ? "default" : "outline"}
                    size="lg"
                  >
                    {hasAccess ? "Acessar produto" : "Escolher " + opt.label.toLowerCase()}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Pagamento processado em modo demonstração. Integração com Stripe pode ser ativada quando desejar.
        </p>
      </div>

      <CheckoutDialog
        open={open}
        onOpenChange={setOpen}
        productId={PRODUCT_PRISAO_INTERIOR}
        productName="Prisão Interior — Jornada"
        defaultPlan={selectedPlan}
        onSuccess={() => navigate("/meu-produto")}
      />
    </PageLayout>
  );
};

export default PlanosPage;
