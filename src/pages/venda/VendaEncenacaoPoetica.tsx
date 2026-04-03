import { Drama } from 'lucide-react';
import ToolSalesLanding from '@/components/sales/ToolSalesLanding';

const VendaEncenacaoPoetica = () => (
  <ToolSalesLanding
    seo={{ title: 'Encenação Poética — Acesse Agora', description: 'Viva o poema com o corpo inteiro — a performance poética como ferramenta de desbloqueio emocional e expressão.', path: '/venda/encenacao-poetica' }}
    icon={<Drama className="h-5 w-5" />}
    toolNumber={5}
    toolName="Encenação Poética"
    tagline="O Corpo que Fala em Versos"
    heroDescription="Transforme poemas em experiência corporal. A Encenação Poética usa a performance como ponte entre o sentir e o expressar — desbloqueando emoções presas no corpo."
    heroVerse={'\u201CNão leia o poema. Seja o poema.\u201D'}
    problemTitle="Reconhece esses bloqueios?"
    problems={[
      'Emoções travadas que a fala sozinha não consegue liberar',
      'Clientes desconectados do corpo e das sensações',
      'Dificuldade em expressar sentimentos profundos verbalmente',
      'Sessões que ficam apenas no campo intelectual, sem integração corporal',
    ]}
    solutionTitle="O poema vivido é o poema curado"
    solutionDescription="A Encenação Poética integra voz, corpo e emoção através da performance de poemas. O verso deixa de ser lido e passa a ser vivido — ativando processos de cura que a mente sozinha não alcança."
    benefits={[
      'Desbloqueie emoções presas no corpo através da performance',
      'Integre técnicas de psicodrama com poesia terapêutica',
      'Conduza vivências poéticas em grupo com segurança',
      'Acesse protocolos de aquecimento e fechamento',
      'Use com diferentes públicos: adultos, adolescentes, idosos',
      'Desenvolva presença e expressividade terapêutica',
    ]}
    howItWorks={[
      { step: 'Aquecimento corporal', description: 'Exercícios de conexão corpo-voz que preparam para a experiência poética.' },
      { step: 'Encenação do poema', description: 'O participante incorpora o poema com gestos, voz e movimento — vivendo cada verso.' },
      { step: 'Integração e partilha', description: 'Processamento da experiência com técnicas de contenção e elaboração emocional.' },
    ]}
    testimonials={[
      { name: 'Renata F.', role: 'Psicodramatista', text: 'A fusão de psicodrama com poesia é genial. Meus grupos nunca viveram algo tão profundo e transformador.' },
      { name: 'Pedro H.', role: 'Ator e Terapeuta', text: 'Como ator, sempre soube do poder das palavras no corpo. Agora tenho método para usar isso terapeuticamente.' },
      { name: 'Dra. Beatriz M.', role: 'Arte-terapeuta', text: 'Complementa perfeitamente o trabalho com artes expressivas. Os resultados são visíveis e duradouros.' },
    ]}
    bonuses={['10 roteiros de encenação prontos', 'Vídeo-aula de aquecimento corporal', 'Guia de segurança emocional em grupo']}
    price="R$ 67"
    originalPrice="R$ 127"
    ctaText="Quero acessar a Encenação Poética"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20a%20Encenação%20Poética"
  />
);

export default VendaEncenacaoPoetica;
