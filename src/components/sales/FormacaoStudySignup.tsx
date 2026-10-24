import { ArrowRight, GraduationCap, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FIRST_MODULE_PATH = "/formacao/modulo/modulo-1";
const CREATE_ACCOUNT_PATH = `/login?mode=signup&next=${encodeURIComponent(FIRST_MODULE_PATH)}`;
const SIGN_IN_PATH = `/login?next=${encodeURIComponent(FIRST_MODULE_PATH)}`;

export function FormacaoStudySignup() {
  return (
    <div className="glass-card rounded-3xl border border-primary/20 bg-background/50 p-8 shadow-2xl backdrop-blur-xl md:p-10">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <GraduationCap className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mb-3 text-2xl font-heading font-bold">Entre na trilha PCH</h3>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        Crie uma conta gratuita no PADH para abrir o Módulo 1. Esta etapa é um cadastro de acesso; nenhum pagamento é processado aqui.
      </p>

      <Button asChild size="lg" className="w-full gap-2">
        <Link to={CREATE_ACCOUNT_PATH}>
          Criar conta e iniciar o Módulo 1
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link to={SIGN_IN_PATH} className="font-semibold text-primary underline-offset-4 hover:underline">
          <LogIn className="mr-1 inline h-4 w-4" aria-hidden="true" />
          Entrar e continuar
        </Link>
      </p>

      <p className="mt-5 border-t border-border/50 pt-4 text-xs leading-relaxed text-muted-foreground">
        O progresso do curso é salvo neste dispositivo por enquanto; ainda não sincroniza entre aparelhos.
      </p>
    </div>
  );
}
