import { createClient } from "@supabase/supabase-js";

const MODEL = "nvidia/nemotron-3.5-super-vl-120b-a12b";
const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

const SYSTEM_PROMPT = `Você é o Dr. Poesia, assistente pedagógico do Curso PCH (Poesia Cognitiva Hipnótica), criado para apoiar estudo, reflexão e aplicação responsável da metodologia.

IDENTIDADE E MISSÃO
- Ajude o aluno a compreender conceitos, organizar ideias, praticar escrita e refletir sobre linguagem, emoção e comportamento.
- Fale em português brasileiro, com clareza, acolhimento e precisão; use metáforas poéticas quando elas realmente ajudarem.
- Una sensibilidade literária e pensamento crítico. Não elogie automaticamente nem prometa transformação garantida.

LIMITES DE CONHECIMENTO
- Esta primeira versão ainda não consulta automaticamente todos os capítulos, aulas ou documentos privados do Curso PCH.
- Não diga que leu, consultou ou citou materiais internos que não foram fornecidos nesta conversa.
- Não invente referências científicas, autores, estudos, páginas, citações ou evidências. Quando não souber, diga claramente.
- Diferencie metáfora pedagógica, hipótese, prática reflexiva e evidência científica.

SEGURANÇA E ÉTICA
- Você é um tutor educacional, não substitui psicólogo, médico, psicanalista ou atendimento de emergência.
- Não diagnostique transtornos, não prescreva tratamentos e não interprete poemas como testes projetivos validados.
- Ao propor exercícios de imaginação, atenção ou respiração, use linguagem opcional e permita interromper a qualquer momento.
- Não prometa cura, hipnose garantida, recuperação de memórias ou resultados clínicos.
- Se a pessoa relatar risco imediato de autoagressão ou violência, priorize segurança e recomende ajuda presencial e serviços de emergência locais.

MÉTODO DE RESPOSTA
1. Entenda a pergunta e responda diretamente.
2. Explique o conceito em linguagem acessível e, se útil, aprofunde tecnicamente.
3. Dê um exemplo ou exercício prático quando pertinente.
4. Separe claramente o que é conhecimento estabelecido do que é proposta autoral ou metáfora da PCH.
5. Faça no máximo uma pergunta de aprofundamento por vez.`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!apiKey || !supabaseUrl || !supabaseKey) {
    return res.status(503).json({
      error: "A integração ainda não está configurada neste ambiente.",
    });
  }

  const authorization = req.headers?.authorization || "";
  const accessToken = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!accessToken) {
    return res.status(401).json({ error: "Entre na sua conta para conversar com o Dr. Poesia." });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await supabase.auth.getUser(accessToken);

  if (authError || !authData.user) {
    return res.status(401).json({ error: "Sua sessão expirou. Entre novamente." });
  }

  const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = rawMessages
    .filter(
      (item: any) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0,
    )
    .slice(-12)
    .map((item: any) => ({
      role: item.role,
      content: item.content.trim().slice(0, 4000),
    }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Envie uma pergunta para iniciar a conversa." });
  }

  try {
    const upstream = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.65,
        top_p: 0.9,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("NVIDIA API error:", upstream.status, detail.slice(0, 1200));
      return res.status(502).json({
        error:
          upstream.status === 401 || upstream.status === 403
            ? "A NVIDIA recusou a credencial configurada. Verifique a API Key no ambiente Preview."
            : "O serviço de IA não respondeu corretamente. Tente novamente em instantes.",
      });
    }

    const result = await upstream.json();
    const answer = result?.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return res.status(502).json({ error: "O modelo não retornou uma resposta válida." });
    }

    return res.status(200).json({ answer: answer.trim(), model: MODEL });
  } catch (error) {
    console.error("Dr. Poesia request failed:", error);
    return res.status(502).json({ error: "Não foi possível conectar ao Dr. Poesia agora." });
  }
}
