import { Flame } from 'lucide-react';
import ToolSalesLanding from '@/components/sales/ToolSalesLanding';

const VendaRitualSilencio = () => (
  <ToolSalesLanding
    seo={{ title: 'Ritual do Silêncio Poético — Acesse Agora', description: 'Descubra o poder terapêutico do silêncio entre versos — a pausa como instrumento de integração e profundidade.', path: '/venda/ritual-silencio' }}
    icon={<Flame className="h-5 w-5" />}
    toolNumber={7}
    toolName="Ritual do Silêncio Poético"
    tagline="A Pausa que Cura"
    heroDescription="O silêncio entre dois versos é onde a transformação acontece. Aprenda a usar a pausa como ferramenta terapêutica — o não-dito que diz tudo."
    heroVerse={'\u201CEntre um verso e outro, mora o infinito.\u201D'}
    problemTitle="Você reconhece esses padrões?"
    problems={[
      'Sessões preenchidas com palavras demais, sem espaço para integração',
      'Desconforto com o silêncio — seu e dos seus clientes',
      'Falta de técnicas para usar a pausa como instrumento terapêutico',
      'Dificuldade em criar momentos de profundidade contemplativa',
    ]}
    solutionTitle="O silêncio é o verso mais poderoso"
    solutionDescription="O Ritual do Silêncio Poético ensina a usar pausas estratégicas entre versos como ferramenta de integração emocional, aprofundamento e cura. O silêncio deixa de ser vazio e se torna presença."
    benefits={[
      'Domine a arte da pausa terapêutica intencional',
      'Crie rituais de silêncio para abertura e fechamento de sessões',
      'Use o silêncio como ferramenta de aprofundamento emocional',
      'Aprenda protocolos de meditação poética guiada',
      'Integre contemplação com técnicas de mindfulness',
      'Desenvolva presença terapêutica através do não-dizer',
    ]}
    howItWorks={[
      { step: 'Prepare o espaço', description: 'Crie as condições ambientais e emocionais para que o silêncio seja acolhido, não temido.' },
      { step: 'Conduza o ritual', description: 'Alterne versos e silêncios com intencionalidade — cada pausa tem duração e propósito definidos.' },
      { step: 'Integre a experiência', description: 'Guie o retorno ao verbal com suavidade, permitindo que o silêncio continue ecoando.' },
    ]}
    testimonials={[
      { name: 'Dra. Lúcia V.', role: 'Psicóloga Transpessoal', text: 'O Ritual do Silêncio transformou minha prática. Aprendi que as maiores curas acontecem quando paro de falar.' },
      { name: 'Thiago R.', role: 'Facilitador de Grupos', text: 'Uso em retiros e workshops. O silêncio coletivo cria uma conexão que nenhuma dinâmica verbal consegue.' },
      { name: 'Irmã Clarice M.', role: 'Orientadora Espiritual', text: 'A integração entre poesia e silêncio contemplativo é profundamente espiritual. Um presente para a alma.' },
    ]}
    bonuses={['5 roteiros de rituais completos', 'Áudio com pausas guiadas cronometradas', 'Guia de ambientação sensorial']}
    price="R$ 67"
    originalPrice="R$ 127"
    ctaText="Quero acessar o Ritual do Silêncio"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20o%20Ritual%20do%20Silêncio"
  />
);

export default VendaRitualSilencio;
