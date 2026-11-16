import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Bot, BookOpen, Sparkles, UserRound } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type ChatMessage = {\n  role: "user" | "assistant";\n  content: string;\n  sources?: { title: string; section: string }[];\n};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content:
    "Olá! Eu sou o Dr. Poesia, seu companheiro de estudo da PCH.\n\nPodemos explorar conceitos, linguagem, metáforas, exercícios de escrita e aplicações responsáveis da metodologia. Por onde começamos?",
};

const suggestions = [
  "O que é Poesia Cognitiva Hipnótica?",
  "Como transformar uma ideia em exercício prático?",
  "Explique a relação entre metáfora e pensamento.",
];

const DrPoesia = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();
    const question = input.trim();
    if (!question || sending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setSending(true);

    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (sessionError || !token) {
        throw new Error("Sua sessão não foi encontrada. Entre novamente na sua conta.");
      }

      const response = await fetch("/api/dr-poesia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Não foi possível enviar sua pergunta.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: payload.answer },
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <PageLayout
      seo={{
        title: "Dr. Poesia — Tutor PCH",
        description:
          "Estude a Poesia Cognitiva Hipnótica com o apoio do Dr. Poesia, tutor educacional do Curso PCH.",
        path: "/dr-poesia",
      }}
      currentPage="Dr. Poesia"
      parentPage={{ name: "Curso PCH", path: "/curso-padh" }}
    >
      <section className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-9">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Bot size={30} />
          </div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles size={16} /> Tutor educacional PCH
          </div>
          <h1 className="mb-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Dr. Poesia
          </h1>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Um espaço para estudar, perguntar, escrever e aprofundar ideias.
            Ciência com rigor, poesia com intenção e prática com responsabilidade.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Conversa com o Dr. Poesia</h2>
              <p className="text-xs text-muted-foreground">Modelo Nemotron · NVIDIA</p>
            </div>
          </div>

          <div className="max-h-[58vh] min-h-[340px] space-y-5 overflow-y-auto p-4 md:p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${message.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary"}`}
                >
                  {message.role === "user" ? <UserRound size={18} /> : <Bot size={18} />}
                </div>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Bot size={18} className="text-primary" />
                O Dr. Poesia está organizando uma resposta...
              </div>
            )}
          </div>

          <div className="border-t border-border p-4 md:p-5">
            {messages.length === 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-auto whitespace-normal text-left"
                    disabled={sending}
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
            {error && (
              <p role="alert" className="mb-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <form onSubmit={sendMessage} className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Escreva sua pergunta sobre a PCH..."
                className="max-h-36 min-h-12 resize-y"
                disabled={sending}
                aria-label="Mensagem para o Dr. Poesia"
              />
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 shrink-0"
                disabled={!input.trim() || sending}
                aria-label="Enviar mensagem"
              >
                <ArrowUp size={19} />
              </Button>
            </form>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <BookOpen size={14} className="mt-0.5 shrink-0" />
              Tutor educacional, não substitui avaliação ou acompanhamento profissional.
              Consulta o Capítulo 5 do Curso PCH; os demais módulos ainda serão conectados gradualmente.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DrPoesia;
