import { Anchor } from 'lucide-react';
import ToolSalesLanding from '@/components/sales/ToolSalesLanding';

const VendaVersoGatilho = () => (
  <ToolSalesLanding
    seo={{ title: 'Verso-Gatilho — Acesse Agora', description: 'Crie âncoras emocionais poderosas com o Verso-Gatilho — um verso memorável que funciona como botão de emergência emocional.', path: '/venda/verso-gatilho' }}
    icon={<Anchor className="h-5 w-5" />}
    toolNumber={2}
    toolName="Verso-Gatilho"
    tagline="A Palavra-Chave que Liberta"
    heroDescription="Aprenda a criar versos-âncora que funcionam como botões emocionais instantâneos — palavras que acalmam, fortalecem e reconectam em segundos."
    heroVerse={'\u201CEu não sou o que me prende, sou o que se solta depois.\u201D'}
    problemTitle="Reconhece alguma dessas situações?"
    problems={[
      'Crises emocionais em que você não consegue acessar seus recursos internos',
      'Clientes que precisam de ferramentas rápidas para momentos de angústia',
      'Dificuldade em criar mantras que realmente funcionem e tenham impacto',
      'Sensação de impotência diante de gatilhos emocionais recorrentes',
    ]}
    solutionTitle="Um verso que se torna escudo"
    solutionDescription="O Verso-Gatilho é uma âncora linguística precisa — criada com técnicas de hipnose ericksoniana e poesia cognitiva — que ativa estados emocionais positivos instantaneamente."
    benefits={[
      'Crie versos-âncora personalizados para cada emoção',
      'Domine a técnica de ancoragem poética ericksoniana',
      'Construa um repertório de emergência emocional',
      'Aplique em sessões individuais e em grupo',
      'Use como ferramenta de autogestão emocional',
      'Ensine seus clientes a criar seus próprios versos',
    ]}
    howItWorks={[
      { step: 'Identifique o gatilho', description: 'Mapeie os padrões emocionais que precisam de uma âncora de resgate.' },
      { step: 'Construa o verso', description: 'Use a fórmula PCH para criar versos com cadência, ritmo e impacto neurológico.' },
      { step: 'Ancore e ative', description: 'Pratique a ativação do verso em momentos controlados até que se torne automático.' },
    ]}
    testimonials={[
      { name: 'Fernanda M.', role: 'Psicanalista', text: 'Meus pacientes com ansiedade agora têm uma ferramenta real para momentos de crise. Resultados impressionantes.' },
      { name: 'Lucas T.', role: 'Educador', text: 'Uso os Versos-Gatilho com adolescentes na escola. Eles se apropriam da técnica de forma natural.' },
      { name: 'Dra. Patrícia G.', role: 'Neuropsicóloga', text: 'A base neurocientífica é sólida. A técnica de ancoragem poética tem evidências claras de eficácia.' },
    ]}
    bonuses={['20 Versos-Gatilho prontos categorizados por emoção', 'Áudio guiado de ancoragem', 'Protocolo de crise emocional']}
    price="R$ 67"
    originalPrice="R$ 127"
    ctaText="Quero acessar o Verso-Gatilho"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20o%20Verso-Gatilho"
  />
);

export default VendaVersoGatilho;
