import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Lock, Unlock, PlayCircle, CheckCircle2, Sparkles, ShieldCheck,
  Feather, Star, Heart, BookOpen, ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, PRODUCT_PRISAO_INTERIOR } from "@/hooks/useAuth";
import { usePurchase } from "@/hooks/usePurchase";
import CheckoutDialog from "@/components/checkout/CheckoutDialog";

export { PRODUCT_PRISAO_INTERIOR };

const benefits = [
  { icon: Unlock, title: "Liberte-se da prisão interior", desc: "Identifique e dissolva os padrões emocionais que mantêm você preso." },
  { icon: Feather, title: "Método poético validado", desc: "Baseado no PCH e no livro Prisão Interior." },
  { icon: PlayCircle, title: "Experiência imersiva tipo streaming", desc: "5 episódios com exercícios guiados e modo foco." },
  { icon: ShieldCheck, title: "Progresso salvo na sua conta", desc: "Continue de onde parou em qualquer dispositivo." },
  { icon: Heart, title: "Acolhimento terapêutico", desc: "Linguagem suave, ritmo respeitoso, profundidade clínica." },
  { icon: BookOpen, title: "Acesso vitalício à jornada", desc: "Refaça os exercícios sempre que precisar." },
];

const episodes = [
  { n: 1, titulo: "O Reconhecimento das Grades", desc: "Onde a prisão começa." },
  { n: 2, titulo: "A Voz do Carcereiro Interno", desc: "Quem fala dentro de você." },
  { n: 3, titulo: "A Chave Esquecida", desc: "Resgatando o que você é." },
  { n: 4, titulo: "A Travessia da Porta", desc: "O ato poético da libertação." },
  { n: 5, titulo: "O Lado de Fora", desc: "Viver depois da liberdade." },
];

const PrisaoInteriorVenda: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { hasAccess } = usePurchase(PRODUCT_PRISAO_INTERIOR);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleBuy = () => {
    if (hasAccess) { navigate("/jornada"); return; }
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/prisao-interior" } });
      return;
    }
    setCheckoutOpen(true);
  };

  return (
    <PageLayout
      seo={{
        title: "Prisão Interior — Só Você Pode Sair | Jornada P.A.D.H.",
        description: "Jornada poético-terapêutica em 5 episódios imersivos. Liberte-se dos padrões internos que aprisionam sua vida.",
        path: "/prisao-interior",
      }}
      currentPage="Prisão Interior"
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-2" /> Jornada principal P.A.D.H.
            </Badge>

            <h1 className="text-4xl md:text-7xl font-heading font-black tracking-tighter leading-[1.05]">
              Prisão Interior:
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mt-2">
                só você pode sair.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Uma jornada terapêutica imersiva em 5 episódios, no estilo de uma série, para libertar você de dentro para fora — pela poesia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button onClick={handleBuy} size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl group">
                {hasAccess ? (
                  <>Continuar minha jornada<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                ) : (
                  <><Unlock className="w-5 h-5 mr-2" />Liberar meu acesso agora</>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/planos")} className="rounded-full">
                Ver planos
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Star className="w-3 h-3 text-primary" /> 5 episódios</span>
              <span className="flex items-center gap-2"><Feather className="w-3 h-3 text-primary" /> 15 exercícios poéticos</span>
              <span className="flex items-center gap-2"><PlayCircle className="w-3 h-3 text-primary" /> Modo streaming imersivo</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="prose prose-lg dark:prose-invert mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">A porta da sua cela está destrancada.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A maioria das pessoas vive presa em padrões que aprendeu cedo demais para questionar. Esta jornada é um convite — e um método — para você atravessar a porta. Não com força. Com poesia.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">O que você recebe</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">A série</Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">5 episódios. Uma travessia.</h2>
        </div>
        <div className="space-y-3">
          {episodes.map((ep) => (
            <Card key={ep.n} className="border-primary/10 hover:border-primary/30 transition-all group">
              <CardContent className="p-5 flex items-center gap-5">
                <div className="text-4xl font-heading font-black text-primary/30 group-hover:text-primary/60 transition-colors w-14 text-center">
                  {String(ep.n).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{ep.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{ep.desc}</p>
                </div>
                {hasAccess ? <PlayCircle className="w-6 h-6 text-primary" /> : <Lock className="w-5 h-5 text-muted-foreground/40" />}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10 rounded-3xl p-10 md:p-16 border border-primary/20 shadow-2xl">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Você passou tempo demais lá dentro.</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Comece hoje. A jornada espera por você — e ninguém pode atravessá-la em seu lugar.
          </p>
          <Button onClick={handleBuy} size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl">
            {hasAccess ? "Acessar a jornada" : "Liberar meu acesso agora"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-primary/10 text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1"><CheckCircle2 className="w-5 h-5 text-primary" /> Acesso vitalício</div>
            <div className="flex flex-col items-center gap-1"><CheckCircle2 className="w-5 h-5 text-primary" /> Progresso salvo</div>
            <div className="flex flex-col items-center gap-1"><CheckCircle2 className="w-5 h-5 text-primary" /> Suporte poético</div>
          </div>
        </div>
      </section>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        productId={PRODUCT_PRISAO_INTERIOR}
        productName="Prisão Interior — Jornada"
        onSuccess={() => navigate("/jornada")}
      />
    </PageLayout>
  );
};

export default PrisaoInteriorVenda;
