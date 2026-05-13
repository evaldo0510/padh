import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, AlertCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageLayout
      seo={{
        title: "Página não encontrada — PCH",
        description: "A página que você procura não existe ou foi movida.",
        path: "/404",
      }}
      currentPage="404"
    >
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <AlertCircle className="w-24 h-24 text-primary relative z-10 mx-auto" />
        </div>
        
        <div className="space-y-4 max-w-md">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">404</h1>
          <h2 className="text-2xl font-bold text-white/80">Caminho Perdido</h2>
          <p className="text-white/40 leading-relaxed font-light">
            Não encontramos a página que você procura. Talvez ela tenha se transformado em poesia e partido para outro lugar.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-glow">
            <Link to="/fundamentacao">
              <BookOpen className="w-5 h-5 mr-2" />
              Estudar Teoria
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/10 text-white/60 hover:text-white hover:bg-white/5">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;

export default NotFound;
