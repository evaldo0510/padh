import { Eye } from 'lucide-react';
import ToolSalesLanding from '@/components/sales/ToolSalesLanding';

const VendaPoemadiagnostico = () => (
  <ToolSalesLanding
    seo={{ title: 'Poemadiagnóstico — Acesse Agora', description: 'Use a escolha espontânea de poemas como espelho emocional — o inconsciente revela sem constrangimento.', path: '/venda/poemadiagnostico' }}
    icon={<Eye className="h-5 w-5" />}
    toolNumber={3}
    toolName="Poemadiagnóstico"
    tagline="O Espelho Emocional"
    heroDescription="Uma ferramenta de avaliação emocional sutil e não invasiva que usa a escolha espontânea de poemas para revelar o estado interior — sem questionários, sem resistência."
    heroVerse=""Qual desses poemas te escolhe hoje?""
    problemTitle="Já passou por isso?"
    problems={[
      'Clientes que não conseguem verbalizar o que sentem',
      'Questionários frios que não captam a verdadeira paisagem emocional',
      'Resistência do paciente a se abrir no início da sessão',
      'Dificuldade em acessar conteúdos inconscientes de forma ética',
    ]}
    solutionTitle="O poema escolhe por você"
    solutionDescription="O Poemadiagnóstico apresenta conjuntos de poemas cuidadosamente selecionados. A escolha espontânea revela padrões emocionais inconscientes de forma natural e sem defesas."
    benefits={[
      'Acesse conteúdos emocionais sem resistência do paciente',
      'Substitua questionários por uma experiência poética',
      'Identifique padrões emocionais em segundos',
      'Crie conjuntos diagnósticos personalizados',
      'Use em sessões individuais, grupos e workshops',
      'Integre com abordagens psicológicas tradicionais',
    ]}
    howItWorks={[
      { step: 'Apresente os poemas', description: 'Use os conjuntos temáticos prontos ou crie os seus — cada poema representa uma paisagem emocional.' },
      { step: 'Observe a escolha', description: 'A seleção espontânea do paciente revela seu estado interior sem necessidade de verbalização.' },
      { step: 'Interprete e conduza', description: 'Use o guia de interpretação para conduzir a sessão a partir do que foi revelado.' },
    ]}
    testimonials={[
      { name: 'Dr. Roberto S.', role: 'Psiquiatra', text: 'Surpreendente como a escolha de um poema revela mais que 30 minutos de anamnese. Ferramenta brilhante.' },
      { name: 'Juliana C.', role: 'Terapeuta Ocupacional', text: 'Uso com idosos e crianças. A universalidade da poesia quebra barreiras que a fala não consegue.' },
      { name: 'Marcos A.', role: 'Psicólogo Organizacional', text: 'Apliquei em dinâmicas de equipe e os resultados foram reveladores. Recomendo fortemente.' },
    ]}
    bonuses={['30 poemas diagnósticos organizados por tema', 'Guia de interpretação completo', 'Modelo de relatório emocional']}
    price="R$ 67"
    originalPrice="R$ 127"
    ctaText="Quero acessar o Poemadiagnóstico"
    ctaLink="https://wa.me/5500000000000?text=Quero%20acessar%20o%20Poemadiagnóstico"
  />
);

export default VendaPoemadiagnostico;
