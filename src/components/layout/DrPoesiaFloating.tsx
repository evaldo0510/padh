import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bot, X, Send, Maximize2, Sparkles, LoaderCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; section: string }[];
};

const greeting: Message = {
  role: "assistant",
  content: "Olá! Sou o Dr. Poesia. Estou aqui para ajudar você a compreender a PCH, aprofundar os conteúdos do curso e transformar dúvidas em aprendizado. O que vamos explorar?",
};

export default function DrPoesiaFloating() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (loading || !isAuthenticated || ["/dr-poesia", "/login"].includes(location.pathname)) return null;

  const send = async (event?: FormEvent) => {
    event?.preventDefault();
    const question = draft.trim();
    if (!question || sending) return;
    const history: Message[] = [...messages, { role: "user", content: question }];
    setMessages(history);
    setDraft("");
    setError("");
    setSending(true);
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (sessionError || !token) throw new Error("Sua sessão expirou. Entre novamente na sua conta.");
      const response = await fetch("/api/dr-poesia", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Não foi possível enviar sua pergunta.");
      setMessages((current) => [...current, {
        role: "assistant",
        content: payload.answer,
        sources: payload.sources || [],
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {open && (
        <section
          aria-label="Conversa com o Dr. Poesia"
          className="fixed bottom-24 right-4 z-[90] flex h-[min( min(680px, calc(100dvh-8rem)), 680px)] w-[min( calc(100vw-2rem), 390px)] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-2xl sm:bottom-24 sm:right-6"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Bot size={22} /></div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Dr. Poesia</p>
                <p className="text-xs text-muted-foreground">Tutor educacional PCH</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => navigate("/dr-poesia")} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Abrir conversa em tela completa" title="Tela completa"><Maximize2 size={17} /></button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Fechar Dr. Poesia"><X size={18} /></button>
            </div>
          </header>
          <div className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 border-t border-border/60 pt-2 text-xs text-muted-foreground">
                      <p className="mb-1 font-medium">Conteúdo consultado</p>
                      {message.sources.map((source, i) => <p key={i}>{source.title} · {source.section}</p>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {sending && <div className="flex items-center gap-2 text-xs text-muted-foreground"><LoaderCircle size={15} className="animate-spin" /> O Dr. Poesia está preparando a resposta…</div>}
          </div>
          <div className="border-t border-border bg-card p-3">
            {error && <p role="alert" className="mb-2 text-xs text-destructive">{error}</p>}
            <form onSubmit={send} className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(); } }}
                placeholder="Pergunte sobre a PCH…"
                aria-label="Mensagem para o Dr. Poesia"
                rows={2}
                disabled={sending}
                className="max-h-28 min-h-11 flex-1 resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button type="submit" disabled={!draft.trim() || sending} aria-label="Enviar mensagem" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"><Send size={17} /></button>
            </form>
            <p className="mt-2 text-[11px] text-muted-foreground">Tutor educacional. Não substitui avaliação ou acompanhamento profissional.</p>
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fechar Dr. Poesia" : "Conversar com o Dr. Poesia"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-[91] flex h-14 w-14 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:bottom-6 sm:right-6"
      >
        {open ? <X size={23} /> : <span className="relative"><Bot size={25} /><Sparkles size={12} className="absolute -right-2 -top-2" /></span>}
      </button>
    </>
  );
}
