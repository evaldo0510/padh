import { PenTool } from "lucide-react";
import ToolSalesLanding from "@/components/sales/ToolSalesLanding";
const VendaCadernoVozInterna = () => (
  <ToolSalesLanding
    seo={{
      title: "Caderno de Voz Interna — Acesse Agora",
      description:
        "Transforme a escrita poética em espelho terapêutico diário com o Caderno de Voz Interna da metodologia P.A.D.H.",
      path: "/venda/caderno-voz-interna",
    }}
    icon={<PenTool className="spiritual-icon spiritual-icon-lg" />}
    toolNumber={4}
    toolName="Caderno de Voz Interna"
    tagline="O Diário do Oráculo"
    heroDescription="Use a escrita poética diária como ferramenta de autoconhecimento e revelação de padrões emocionais. Seu inconsciente fala — você aprende a ouvir."
    heroVerse={
      "\u201CO que você escreveu hoje é o que seu silêncio gritou por anos?\u201D"
    }
    problemTitle="Isso soa familiar?"
    problems={[
      "Pensamentos repetitivos que nunca se resolvem apenas pensando",
      "Dificuldade em manter uma prática de autoconhecimento consistente",
      "Diários tradicionais que se tornam mera repetição de queixas",
      "Sensação de desconexão com sua própria voz interior",
    ]}
    solutionTitle="Escrever para se ouvir"
    solutionDescription="O Caderno de Voz Interna transforma a escrita em escuta ativa do inconsciente. Com estímulos poéticos diários, você descobre padrões que a mente racional esconde."
    benefits={[
      "Desenvolva uma prática diária de escuta interior",
      "Identifique padrões emocionais recorrentes pela escrita",
      "Transforme queixas em insights poéticos",
      "Use com seus clientes como tarefa entre sessões",
      'Acesse o programa completo"7 Dias de Voz Interna"',
      "Aprenda a interpretar sua própria escrita terapêutica",
    ]}
    howItWorks={[
      {
        step: "Receba o estímulo",
        description:
          "Cada dia traz um gatilho poético diferente — uma pergunta, uma imagem, um verso incompleto.",
      },
      {
        step: "Escreva sem censura",
        description:
          "A escrita livre guiada permite que o inconsciente se expresse sem filtros racionais.",
      },
      {
        step: "Releia e descubra",
        description:
          "O processo de releitura revela padrões, símbolos e mensagens que sua mente consciente não percebia.",
      },
    ]}
    testimonials={[
      {
        name: "Camila R.",
        role: "Escritora e Terapeuta",
        text: "Em 7 dias de prática, descobri padrões que 3 anos de terapia não revelaram. Transformador.",
      },
      {
        name: "André L.",
        role: "Coach Existencial",
        text: "Uso como tarefa entre sessões. Os clientes voltam com insights profundos e prontos para trabalhar.",
      },
      {
        name: "Dra. Silvia N.",
        role: "Psicóloga Junguiana",
        text: "O método ativa símbolos arquetípicos de forma orgânica. Complementa perfeitamente a análise de sonhos.",
      },
    ]}
    bonuses={[
      'Programa"7 Dias de Voz Interna" completo',
      "Caderno digital com 30 estímulos",
      "Guia de interpretação simbólica",
    ]}
    price="R$ 67"
    originalPrice="R$ 127"
    ctaText="Quero acessar o Caderno de Voz Interna"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20o%20Caderno%20de%20Voz%20Interna"
    scientificTool="caderno-voz-interna"
  />
);
export default VendaCadernoVozInterna;
