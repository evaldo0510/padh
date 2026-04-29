import { Link } from "react-router-dom";
import { WifiOff, Home, BookOpen, Info } from "lucide-react";

/**
 * Fallback shown when the user is offline AND the requested route was not
 * cached. Only public/allowed routes are surfaced as quick links here.
 */
const Offline = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-8">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
          <WifiOff className="w-10 h-10 text-white/40" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter text-white italic">Sem conexão</h1>
          <p className="text-white/50 italic leading-relaxed">
            Você está offline. Algumas páginas continuam acessíveis enquanto sua conexão volta.
          </p>
        </div>
        <div className="grid gap-3">
          <Link to="/" className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left">
            <Home className="w-5 h-5 text-primary" />
            <span className="text-white font-medium">Início</span>
          </Link>
          <Link to="/sobre" className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left">
            <Info className="w-5 h-5 text-primary" />
            <span className="text-white font-medium">Sobre o P.A.D.H.</span>
          </Link>
          <Link to="/livro-curso" className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-white font-medium">Livro & Curso</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offline;
