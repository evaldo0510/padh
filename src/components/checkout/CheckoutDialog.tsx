import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

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
  productName: string;
  defaultPlan?: PlanKey;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  open,
  onOpenChange,
  productName,
  defaultPlan = "vitalicio",
}) => {
  const selected = PLAN_OPTIONS.find((plan) => plan.key === defaultPlan)!;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-destructive" /> Checkout indisponível
          </DialogTitle>
          <DialogDescription>
            {productName} — plano {selected.label.toLowerCase()} ({selected.priceLabel}).
          </DialogDescription>
        </DialogHeader>

        <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed">
          <p className="font-semibold">Nenhum pagamento será processado.</p>
          <p className="mt-2 text-muted-foreground">
            A integração segura com um provedor de pagamentos ainda não está configurada.
            Por isso, não informe dados de cartão: esta tela não coleta pagamento e não libera acesso.
          </p>
        </div>

        <Button type="button" className="w-full" onClick={() => onOpenChange(false)}>
          Fechar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
