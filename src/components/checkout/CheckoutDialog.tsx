import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Lock, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { recordPurchase } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export type PlanKey = "mensal" | "anual" | "vitalicio";

interface PlanOption {
  key: PlanKey;
  label: string;
  priceCents: number;
  priceLabel: string;
  helper: string;
}

export const PLAN_OPTIONS: PlanOption[] = [
  { key: "mensal", label: "Mensal", priceCents: 4700, priceLabel: "R$ 47/mês", helper: "Cancele quando quiser" },
  { key: "anual", label: "Anual", priceCents: 39700, priceLabel: "R$ 397/ano", helper: "Economize ~30%" },
  { key: "vitalicio", label: "Vitalício", priceCents: 79700, priceLabel: "R$ 797 uma vez", helper: "Acesso para sempre" },
];

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
  defaultPlan?: PlanKey;
  onSuccess?: () => void;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  open,
  onOpenChange,
  productId,
  productName,
  defaultPlan = "vitalicio",
  onSuccess,
}) => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<PlanKey>(defaultPlan);
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const selected = PLAN_OPTIONS.find((p) => p.key === plan)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para concluir a compra.");
      return;
    }
    setProcessing(true);
    // Simulated payment processing — production would call Stripe checkout here.
    await new Promise((r) => setTimeout(r, 1400));
    const result = await recordPurchase({
      userId: user.id,
      productId,
      plan,
      amountCents: selected.priceCents,
    });
    setProcessing(false);
    if (!result) {
      toast.error("Não foi possível concluir a compra.");
      return;
    }
    toast.success("Compra confirmada!", {
      description: `Acesso ${selected.label.toLowerCase()} liberado.`,
    });
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Finalizar compra
          </DialogTitle>
          <DialogDescription>
            {productName} — escolha seu plano e simule o pagamento.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Plano</Label>
            <RadioGroup value={plan} onValueChange={(v) => setPlan(v as PlanKey)} className="grid gap-2">
              {PLAN_OPTIONS.map((opt) => (
                <label
                  key={opt.key}
                  htmlFor={`plan-${opt.key}`}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                    plan === opt.key
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={opt.key} id={`plan-${opt.key}`} />
                    <div>
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.helper}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{opt.priceLabel}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="rounded-xl bg-muted/30 p-4 space-y-3 border border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> Pagamento simulado — nenhum valor será cobrado.
            </div>
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="card-name" className="text-xs">Nome no cartão</Label>
                <Input
                  id="card-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como aparece no cartão"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="card-number" className="text-xs">Número do cartão</Label>
                <Input
                  id="card-number"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="text-sm">
              <div className="text-muted-foreground">Total</div>
              <div className="text-2xl font-bold text-primary">{selected.priceLabel}</div>
            </div>
            <Button type="submit" size="lg" disabled={processing} className="gap-2">
              {processing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Processando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Pagar e liberar acesso
                </>
              )}
            </Button>
          </div>

          <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 justify-center">
            <ShieldCheck className="w-3 h-3" /> Modo demonstração — integração Stripe pode ser ativada quando desejar.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
