import { Feather } from "lucide-react";
import ToolSalesLanding from "@/components/sales/ToolSalesLanding";
const VendaPoemaFunil = () => (
  <ToolSalesLanding
    seo={{
      title: "Poema-Funil — Acesse Agora",
      description:
        "Aprenda a criar jornadas internas progressivas com o Poema-Funil, a primeira ferramenta P.A.D.H. que ativa o hemisfério direito do cérebro.",
      path: "/venda/poema-funil",
    }}
    icon={<Feather className="spiritual-icon spiritual-icon-lg" />}
    toolNumber={1}
    toolName="Poema-Funil"
    tagline="A Espiral da Palavra que Desce"
    heroDescription="Aprenda a construir poemas que conduzem o leitor — ou paciente — do pensamento racional para o sentir profundo. Uma ferramenta de pré-transe poético que ativa o hemisfério direito do cérebro."
    heroVerse={
      "\u201CComeço com o que se vê. Sigo com o que se sente. Termino com o que não se diz.\u201D"
    }
    problemTitle="Você já se sentiu assim?"
    problems={[
      "Sessões terapêuticas que ficam na superfície, sem acessar emoções reais",
      "Dificuldade em criar rapport profundo com clientes resistentes",
      "Textos e palavras que não conseguem mover quem lê",
      "Sensação de que a transformação não acontece de verdade",
    ]}
    solutionTitle="A solução está na estrutura do verso"
    solutionDescription="O Poema-Funil é uma técnica de escrita progressiva que leva o leitor do mundo externo ao interno, camada por camada, criando um estado natural de abertura e receptividade — sem forçar, sem manipular."
    benefits={[
      "Domine a técnica de indução poética progressiva",
      "Crie poemas terapêuticos com estrutura neurológica precisa",
      "Ative o hemisfério direito do cérebro dos seus clientes",
      "Construa sessões mais profundas e transformadoras",
      "Aprenda a usar metáforas em camadas de profundidade",
      "Integre a ferramenta com outras técnicas terapêuticas",
    ]}
    howItWorks={[
      {
        step: "Estudo da estrutura",
        description:
          "Aprenda a anatomia do Poema-Funil: as 3 camadas de profundidade e como cada uma ativa áreas cerebrais específicas.",
      },
      {
        step: "Prática guiada",
        description:
          "Exercícios passo a passo para criar seus primeiros Poemas-Funil com feedback estrutural.",
      },
      {
        step: "Aplicação clínica",
        description:
          "Protocolos prontos para usar o Poema-Funil em sessões terapêuticas, coaching e autoconhecimento.",
      },
    ]}
    testimonials={[
      {
        name: "Dra. Mariana L.",
        role: "Psicóloga Clínica",
        text: "Mudou completamente a forma como inicio minhas sessões. Os clientes entram num estado de abertura que antes levava semanas.",
      },
      {
        name: "Carlos R.",
        role: "Coach de Vida",
        text: "Ferramenta poderosa. Meus clientes relatam insights profundos já na primeira aplicação do Poema-Funil.",
      },
      {
        name: "Ana Paula S.",
        role: "Terapeuta Holística",
        text: "A estrutura é genial. Simples de aprender e os resultados são visíveis desde o primeiro uso.",
      },
    ]}
    bonuses={[
      "Banco com 15 Poemas-Funil prontos para uso",
      "Guia de aplicação em grupo",
      "Acesso ao grupo exclusivo de praticantes",
    ]}
    price="R$ 67"
    originalPrice="R$ 127"
    ctaText="Quero acessar o Poema-Funil"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20o%20Poema-Funil"
    scientificTool="poema-funil"
  />
);
export default VendaPoemaFunil;
