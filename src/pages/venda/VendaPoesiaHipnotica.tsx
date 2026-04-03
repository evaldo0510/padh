import { Sparkles } from 'lucide-react';
import ToolSalesLanding from '@/components/sales/ToolSalesLanding';

const VendaPoesiaHipnotica = () => (
  <ToolSalesLanding
    seo={{ title: 'Poesia Hipnótica — Acesse Agora', description: 'A Poesia Cognitiva Hipnótica usa a palavra com propósito para reestruturar pensamentos e emoções.', path: '/venda/poesia-hipnotica' }}
    icon={<Sparkles className="h-5 w-5" />}
    toolNumber={8}
    toolName="Poesia Cognitiva Hipnótica"
    tagline="O Poder das Palavras que Transformam"
    heroDescription="A ferramenta-mestre da metodologia P.A.D.H. — onde neurociência, hipnose ericksoniana e linguagem poética se encontram para criar transformação profunda e duradoura."
    heroVerse={'\u201CA palavra certa no momento certo muda o cérebro para sempre.\u201D'}
    problemTitle="Você sente que falta algo?"
    problems={[
      'Conhece várias técnicas mas sente que nenhuma integra mente, emoção e linguagem',
      'Quer usar a poesia terapeuticamente mas não sabe por onde começar',
      'Busca uma abordagem que una ciência e arte de forma prática',
      'Deseja se diferenciar no mercado com uma metodologia inovadora',
    ]}
    solutionTitle="A integração que você buscava"
    solutionDescription="A Poesia Cognitiva Hipnótica é a síntese das 7 ferramentas P.A.D.H. — um sistema completo que usa a palavra como instrumento de reestruturação neurológica, emocional e comportamental."
    benefits={[
      'Domine o sistema completo de Poesia Cognitiva Hipnótica',
      'Integre todas as 7 ferramentas P.A.D.H. num fluxo coerente',
      'Compreenda a neurociência por trás de cada técnica',
      'Crie protocolos personalizados para diferentes casos',
      'Acesse a coleção completa de poemas hipnóticos',
      'Diferencie-se no mercado com uma abordagem única',
      'Aplique em contextos clínicos, educacionais e corporativos',
      'Receba certificado de praticante PCH',
    ]}
    howItWorks={[
      { step: 'Fundamentos teóricos', description: 'Compreenda as bases neurocientíficas, a hipnose ericksoniana e a linguística cognitiva por trás da PCH.' },
      { step: 'Prática das 7 ferramentas', description: 'Domine cada ferramenta P.A.D.H. individualmente com exercícios progressivos.' },
      { step: 'Integração e criação', description: 'Aprenda a combinar ferramentas e criar protocolos personalizados para cada caso.' },
      { step: 'Supervisão e certificação', description: 'Receba feedback sobre seus casos e obtenha o certificado de praticante PCH.' },
    ]}
    testimonials={[
      { name: 'Dr. Eduardo P.', role: 'Psiquiatra e Hipnoterapeuta', text: 'A PCH é a evolução natural da hipnose clínica. Mais acessível, mais poética, mais humana. Revolucionário.' },
      { name: 'Isabela K.', role: 'Psicóloga e Poetisa', text: 'Finalmente uma abordagem que honra tanto a ciência quanto a arte. Minha prática clínica nunca mais será a mesma.' },
      { name: 'Prof. Ricardo M.', role: 'Neurocientista', text: 'As bases neurológicas são consistentes. A poesia realmente ativa circuitos cerebrais de forma única e mensurável.' },
    ]}
    bonuses={['Acesso a todas as 7 ferramentas P.A.D.H.', 'Coleção de 50 poemas hipnóticos', 'Supervisão de 3 casos clínicos', 'Certificado de Praticante PCH']}
    price="R$ 197"
    originalPrice="R$ 397"
    ctaText="Quero acessar a Poesia Cognitiva Hipnótica"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20a%20Poesia%20Cognitiva%20Hipnótica"
    scientificTool="poesia-hipnotica"
  />
);

export default VendaPoesiaHipnotica;
