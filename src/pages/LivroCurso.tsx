import React, { useState } from "react";
import { BookOpen, Brain, Feather, Heart, Lightbulb, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";
import TextReader from "@/components/ui/text-reader";

type Chapter = { id: string; title: string; subtitle: string; icon: React.ElementType; sections: { title: string; paragraphs: string[]; bullets?: string[] }[]; practice: string[]; reflection: string[] };
const chapters: Chapter[] = [
  {
    id: "capitulo-1", title: "Capítulo 1 — O que é a Poesia Cognitivo-Hipnótica?", subtitle: "Conceitos, pilares, limites e postura de trabalho", icon: BookOpen,
    sections: [
      { title: "1.1. Uma definição de trabalho", paragraphs: [
        "A Poesia Cognitivo-Hipnótica (PCH) é uma proposta estruturada de exploração da experiência por meio da linguagem poética, da reflexão sobre pensamentos e crenças e de recursos de atenção focalizada e imaginação guiada. A palavra “hipnótica” descreve aqui o uso cuidadoso de ritmo, repetição, imagens e foco atencional; não significa controle da mente, leitura do inconsciente ou garantia de mudança.",
        "O poema funciona como um objeto de observação: torna visíveis imagens, emoções, interpretações e possibilidades de resposta. A pessoa continua sendo autora dos sentidos que atribui ao texto. Uma metáfora pode abrir uma pergunta, mas não prova uma causa psicológica nem estabelece um diagnóstico.",
        "A PCH deve ser apresentada como uma metodologia de trabalho em desenvolvimento, cujas atividades precisam ser avaliadas por seus objetivos, adequação, segurança e resultados observáveis. Não se deve afirmar que a combinação específica PCH está clinicamente validada sem estudos diretos e apropriados sobre essa metodologia."
      ]},
      { title: "1.2. Os três pilares: poesia, cognição e atenção hipnótica", paragraphs: [
        "P — Poesia: usa ritmo, imagem, som, contraste, símbolo e condensação para expressar experiências que às vezes são difíceis de dizer em prosa. A tarefa do facilitador é escutar sem impor significados, perguntar o que cada imagem representa para a própria pessoa e permitir que o texto permaneça ambíguo quando essa ambiguidade for útil.",
        "C — Cognitiva: investiga a relação entre situação, interpretação, emoção, corpo e ação. Em vez de tratar uma frase como verdade absoluta, examina evidências, exceções, custos, funções e alternativas. A reescrita poética pode ajudar a experimentar uma formulação mais flexível, mas não substitui avaliação clínica nem demonstra por si só que uma crença mudou.",
        "H — Hipnótica: organiza a atenção por meio de pausas, respiração confortável, leitura ritmada, imaginação e linguagem permissiva. A pessoa deve poder interromper, abrir os olhos, mudar de posição ou recusar qualquer exercício. Não se promete transe, regressão, recuperação de memórias ou resposta involuntária."
      ]},
      { title: "1.3. Como uma prática pode funcionar", paragraphs: [
        "A escrita expressiva pode apoiar organização narrativa e elaboração de experiências; a reavaliação cognitiva pode ampliar interpretações; a leitura ritmada pode orientar atenção; e a imaginação pode permitir ensaiar respostas possíveis. Esses mecanismos são hipóteses plausíveis apoiadas por áreas de pesquisa distintas, mas seus efeitos variam entre pessoas, contextos e tarefas.",
        "A sequência proposta é simples: observar, nomear, investigar, criar alternativa e revisar o efeito. O objetivo não é produzir um poema bonito nem substituir sofrimento por positividade. É aumentar a capacidade de reconhecer a experiência e escolher o próximo passo com mais consciência."
      ]},
      { title: "1.4. Para quem e em quais condições", paragraphs: [
        "Em atividades educativas ou de autocuidado, use exercícios breves, voluntários e de baixa intensidade. Em contexto clínico, a indicação depende da formação e do escopo profissional, do consentimento, da avaliação individual e da possibilidade de acompanhamento. Não existe um poema universalmente adequado.",
        "Se a escrita elevar intensamente o sofrimento, causar desorientação ou ativar lembranças difíceis, interrompa a atividade, retorne ao ambiente presente e priorize estabilização e apoio. Em risco imediato de autoagressão, suicídio, violência ou incapacidade de se manter em segurança, procure atendimento de emergência ou serviço de crise local."
      ]},
      { title: "1.5. Princípios éticos essenciais", bullets: [
        "Consentimento informado, linguagem transparente e direito de parar sem justificar.",
        "Confidencialidade e armazenamento seguro dos textos; não compartilhar poemas identificáveis sem autorização específica.",
        "Não diagnosticar por símbolos, palavras isoladas ou “tom” do poema.",
        "Não induzir memórias, não afirmar que imagens são lembranças reais e não sugerir interpretações como fatos.",
        "Distinguir educação, autocuidado e intervenção clínica; encaminhar quando a demanda exceder a competência.",
        "Registrar objetivo, procedimento, resposta observada e próximos passos, sem prometer cura."
      ]}
    ],
    practice: ["Escolha uma emoção presente e descreva-a em três imagens concretas, sem tentar explicar sua causa.", "Escreva duas versões de uma frase interna: a primeira como ela surge espontaneamente; a segunda como uma pergunta curiosa, não como uma afirmação positiva forçada.", "Leia cada versão em voz baixa, se for confortável, e anote o que mudou na atenção, no corpo ou na interpretação. Não existe resposta correta."],
    reflection: ["Qual é a diferença entre explorar uma metáfora e interpretar a pessoa por ela?", "Que sinal me indicaria diminuir a intensidade ou interromper a prática?", "Como explicaria a PCH sem prometer efeitos que não foram demonstrados?"]
  },
  {
    id: "capitulo-2", title: "Capítulo 2 — A Escrita como Espelho", subtitle: "Autobservação, padrões de linguagem e reescrita consciente", icon: Feather,
    sections: [
      { title: "2.1. O texto como registro, não como veredito", paragraphs: [
        "Escrever cria uma distância útil entre a pessoa e o fluxo de pensamentos. Ao ver uma frase no papel, torna-se possível observá-la, relê-la e perguntar se ela descreve um fato, uma previsão, uma interpretação, uma lembrança ou um julgamento. O texto é um recorte de um momento, não um retrato completo da identidade.",
        "A metáfora do espelho deve ser usada com cuidado: o escrito pode refletir aspectos da experiência, mas também é influenciado pelo contexto, pelo vocabulário disponível, pela cultura, pelo cansaço e pela pergunta feita. Nenhum elemento isolado permite inferir transtorno, trauma ou estrutura de personalidade."
      ]},
      { title: "2.2. Quatro camadas de leitura", bullets: [
        "Cena: o que aconteceu, de modo observável? Separe acontecimentos de conclusões.",
        "Voz interna: quais palavras a pessoa usa para falar consigo? Observe “sempre”, “nunca”, “tenho que”, “não posso” e rótulos globais sem presumir que sejam patológicos.",
        "Emoção e corpo: o que a pessoa identifica, com as palavras dela? Se não souber, ofereça opções sem exigir uma resposta.",
        "Necessidade e possibilidade: o que parece importante proteger, pedir, compreender ou fazer a seguir?"
      ]},
      { title: "2.3. Perguntas que ampliam em vez de conduzir", paragraphs: [
        "Prefira perguntas abertas: “O que esta imagem significa para você?”, “Que parte parece mais próxima da sua experiência?”, “Há outra leitura possível?” e “O que você gostaria que eu não presumisse?”. Evite perguntas que insinuem uma resposta, como “Essa porta representa sua infância, não é?”.",
        "A leitura compartilhada deve ser colaborativa. O profissional pode oferecer uma hipótese como hipótese — “Será que pode haver uma relação com…?” — e convidar a pessoa a discordar. A discordância é informação legítima, não resistência que precise ser vencida."
      ]},
      { title: "2.4. Da frase rígida à formulação flexível", paragraphs: [
        "A reescrita cognitiva não exige trocar uma frase negativa por uma positiva. Uma formulação útil tende a ser crível, específica e aberta à evidência. “Eu falho em tudo” pode virar “Estou decepcionado com este resultado; preciso identificar o que não funcionou e o que ainda posso tentar”. A segunda frase não apaga a dor nem garante sucesso: ela separa um evento de uma identidade total.",
        "Uma boa reescrita preserva a emoção, reconhece limites reais e inclui agência possível. Se a frase original descreve uma situação de abuso, discriminação ou perigo concreto, não a transforme em “pensamento distorcido”; a prioridade pode ser segurança, apoio e mudança das condições externas."
      ]},
      { title: "2.5. Diário poético de observação", paragraphs: [
        "Use uma entrada curta com cinco campos: situação, frase automática, emoção percebida, imagem ou metáfora escolhida pela pessoa e uma pergunta para continuar a investigação. Termine com uma ação pequena e realista, se houver. O registro deve ser voluntário; não é necessário escrever sobre eventos traumáticos nem entregar o texto a outra pessoa.",
        "Releia procurando padrões com curiosidade, não para vigiar a si mesmo. Se a atividade se tornar ruminação repetitiva, autocrítica intensa ou obrigação, faça uma pausa e considere uma alternativa menos introspectiva."
      ]}
    ],
    practice: ["Complete: “Hoje, minha mente contou a história de que…”.", "Circule palavras absolutas e pergunte: “Isso é literalmente sempre verdadeiro? Que exceções existem? O que ainda não sei?”.", "Escreva uma versão alternativa que reconheça a dificuldade e inclua apenas uma possibilidade sob seu controle."],
    reflection: ["Que diferença existe entre um fato e a história que construí sobre ele?", "Que interpretações eu estava prestes a impor ao texto de outra pessoa?", "A reescrita ficou crível ou apenas positiva?"]
  },
  {
    id: "capitulo-3", title: "Capítulo 3 — Metáforas e Neurociência", subtitle: "Linguagem, emoção, memória, atenção e limites das evidências", icon: Brain,
    sections: [
      { title: "3.1. Por que metáforas importam", paragraphs: [
        "Metáforas relacionam uma experiência a outra: “estou carregando uma montanha”, “minha preocupação é um alarme que não desliga”. Elas condensam significado e podem facilitar a comunicação de estados complexos. Seu valor depende da pessoa: uma imagem acolhedora para alguém pode ser estranha, culturalmente inadequada ou angustiante para outra.",
        "A metáfora não é um código universal nem uma janela direta para o inconsciente. Pergunte sempre o que a imagem quer dizer para quem a criou e aceite que ela possa não ter um significado definido."
      ]},
      { title: "3.2. O que a neurociência permite dizer — e o que não permite", paragraphs: [
        "Compreender linguagem, imaginar cenas, recuperar memórias e regular emoções envolve redes cerebrais distribuídas que interagem com atenção, aprendizagem, contexto e estado corporal. Não há um único “centro da poesia” nem uma região exclusiva responsável por cura emocional. A experiência depende de múltiplos sistemas e diferenças individuais.",
        "Estudos sobre escrita expressiva, leitura, música, imaginação, reavaliação cognitiva e hipnose investigam tarefas diferentes, com protocolos e populações diferentes. Resultados de uma dessas áreas não comprovam automaticamente a eficácia da PCH como conjunto. Evite frases como “o poema reprograma o cérebro”, “a metáfora apaga traumas” ou “a hipnose acessa a verdade inconsciente”.",
        "A plasticidade neural descreve mudanças na organização e no funcionamento do sistema nervoso relacionadas à experiência e à aprendizagem; não significa que qualquer exercício produza mudanças previsíveis, rápidas ou permanentes. O resultado deve ser observado na experiência e na vida da pessoa, não inferido de uma metáfora."
      ]},
      { title: "3.3. Atenção, ritmo e imaginação", paragraphs: [
        "Repetição, cadência e pausas podem ajudar algumas pessoas a sustentar a atenção. A leitura lenta pode criar uma oportunidade para notar sensações e associações. Isso não exige transe e não prova que a pessoa esteja mais sugestionável. Ofereça escolha de ritmo, postura, olhos abertos ou fechados e possibilidade de interromper.",
        "Na imaginação guiada, use linguagem permissiva: “Se for confortável, imagine…”, “Você pode adaptar a cena” e “Também pode apenas ouvir”. Evite instruções autoritárias, conteúdos de regressão, imagens que imponham medo e sugestões que pretendam recuperar lembranças."
      ]},
      { title: "3.4. Como formular e avaliar uma metáfora", bullets: [
        "Relevância pessoal: a imagem veio da pessoa ou foi oferecida com permissão?",
        "Segurança: a imagem regula, neutraliza ou aumenta o desconforto?",
        "Flexibilidade: a metáfora abre alternativas ou aprisiona a pessoa em um rótulo?",
        "Agência: existe uma ação concreta e realista associada à imagem?",
        "Verificação: pergunte o que mudou e o que não mudou, sem sugerir a resposta.",
        "Revisão: se a metáfora não ajuda, abandone-a ou peça que a pessoa crie outra."
      ]},
      { title: "3.5. Alfabetização científica para a prática", paragraphs: [
        "Ao ler um estudo, confira população, tamanho da amostra, grupo de comparação, medida usada, duração do acompanhamento, limitações e conflitos de interesse. Diferencie associação de causalidade, resultado estatístico de relevância clínica e estudo preliminar de evidência replicada.",
        "Na comunicação pública, diga com precisão qual intervenção foi estudada. Se não houver ensaio específico da PCH, descreva-a como uma proposta que combina princípios de campos relacionados e que necessita de avaliação direta. A transparência fortalece a metodologia e protege o público."
      ]}
    ],
    practice: ["Crie uma metáfora para uma preocupação cotidiana e pergunte se ela representa sua experiência com precisão.", "Escreva duas metáforas alternativas: uma que enfatize o peso e outra que destaque recursos disponíveis.", "Compare-as: qual abre uma possibilidade sem negar a realidade? Que ação pequena decorre dela?"],
    reflection: ["Qual afirmação sobre cérebro ou hipnose eu precisaria de evidência direta para sustentar?", "Estou tratando uma metáfora como hipótese ou como diagnóstico?", "Como explicaria os limites científicos sem desvalorizar a experiência subjetiva?"]
  },
  {
    id: "capitulo-4", title: "Capítulo 4 — A Prática do Autocuidado Poético", subtitle: "Rituais breves, autonomia, adaptação e acompanhamento", icon: Heart,
    sections: [
      { title: "4.1. Autocuidado sem cobrança de desempenho", paragraphs: [
        "O autocuidado poético é uma prática voluntária de atenção à experiência por meio de palavras, imagens e reflexão. Não precisa resultar em um poema elaborado. Uma linha, uma palavra ou a decisão de não escrever podem ser suficientes. O objetivo é apoiar presença e escolha, não produzir uma obrigação adicional.",
        "Escolha um horário e uma duração compatíveis com sua rotina. Comece com cinco a dez minutos, ajuste conforme a resposta e não transforme a regularidade em medida de valor pessoal. Interromper uma prática que não ajuda também é uma forma de autocuidado."
      ]},
      { title: "4.2. Ritual breve em cinco movimentos", bullets: [
        "Chegar: observe o ambiente e escolha uma postura confortável. Mantenha os olhos abertos se preferir.",
        "Nomear: escolha uma palavra para o estado presente, sem precisar justificá-la.",
        "Imaginar: associe uma imagem própria à experiência. Se não surgir imagem, use uma sensação ou um objeto concreto.",
        "Reescrever: formule uma frase mais cuidadosa e realista, preservando a verdade da situação.",
        "Fechar: identifique uma ação pequena para agora — beber água, descansar, pedir ajuda, organizar uma tarefa ou simplesmente encerrar."
      ]},
      { title: "4.3. Três práticas para dias diferentes", paragraphs: [
        "Para um dia agitado: escreva três linhas — “O que me chama atenção”, “O que pode esperar” e “Qual é o próximo passo possível”. Respire de modo natural; não force inspirações profundas nem retenha o ar.",
        "Para um dia de autocrítica: anote a frase julgadora e responda como responderia a alguém querido, sem negar responsabilidade ou consequência. Procure uma linguagem respeitosa e específica.",
        "Para um dia de incerteza: complete “Ainda não sei…”, “Posso investigar…” e “Por enquanto, escolho…”. A prática não precisa resolver a incerteza; pode ajudar a tolerá-la e agir dentro do que é conhecido."
      ]},
      { title: "4.4. Monitorar sem se diagnosticar", paragraphs: [
        "Antes e depois, se desejar, registre intensidade do desconforto de 0 a 10, sensação predominante e se a atividade foi útil, neutra ou desconfortável. Esses números são observações pessoais, não um teste clínico validado nem uma medida diagnóstica. Uma única mudança não demonstra causalidade.",
        "Se os exercícios aumentarem repetidamente a angústia, interrompa-os e procure uma prática de aterramento ou apoio profissional. Não use a escrita para forçar exposição a memórias dolorosas. Pessoas em sofrimento intenso podem precisar de acompanhamento individualizado."
      ]},
      { title: "4.5. Quando procurar apoio", paragraphs: [
        "A poesia pode complementar o cuidado, mas não substitui psicoterapia, avaliação médica ou outros serviços indicados. Procure ajuda qualificada se sintomas persistirem, afetarem sono, trabalho, relações ou autocuidado, ou se houver sensação de perda de controle. Em perigo imediato, busque o serviço de emergência local e uma pessoa de confiança.",
        "Se você conduz atividades com outras pessoas, explique os limites do exercício, proteja a privacidade, evite promessas terapêuticas e saiba como encaminhar. Não recolha textos íntimos sem necessidade e consentimento."
      ]}
    ],
    practice: ["Durante sete dias, se isso fizer sentido para você, registre uma palavra, uma imagem e uma ação pequena. Pular um dia não é falha.", "No final da semana, observe quais práticas foram úteis, neutras ou desconfortáveis e decida o que manter, adaptar ou abandonar.", "Escreva um compromisso de autocuidado que seja específico, gentil e possível — e inclua como pedirá ajuda caso não consiga realizá-lo sozinho."],
    reflection: ["Esta prática está me apoiando ou virou mais uma exigência?", "Que sinais me mostram que preciso de pausa ou apoio?", "Qual hábito pequeno é sustentável na minha realidade atual?"]
  }
];

const LivroCurso = () => {
  const [expanded, setExpanded] = useState<string[]>(["capitulo-1"]);
  const [completed, setCompleted] = useState<string[]>([]);
  const toggle = (id: string) => setExpanded(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const toggleComplete = (id: string) => setCompleted(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const allText = chapters.map(ch => ch.title + ". " + ch.sections.map(s => s.title + ". " + (s.paragraphs || []).join(" ") + (s.bullets || []).join(" ")).join(" ")).join(" ");
  return (
    <PageLayout seo={pagesSEO.livroCurso} currentPage="Livro-Curso">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Livro-Curso PCH · Trilha de aprendizado</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">Poesia Cognitivo-<span className="text-primary italic">Hipnótica</span></h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Quatro capítulos para estudar a linguagem poética, observar padrões de pensamento, compreender metáforas com rigor científico e praticar autocuidado com autonomia e segurança.</p>
            <div className="poem-block max-w-md mx-auto my-8"><p className="poem-text text-sm text-muted-foreground">Quando se olha no espelho, o que é que você vê?\nEu vi grades onde havia janelas.\nAté que um verso abriu a porta\nque eu mesmo havia trancado por dentro.</p><cite className="text-xs text-primary/70 mt-2 block not-italic">— Prisão Interior</cite></div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => { setExpanded(chapters.map(c => c.id)); document.getElementById("trilha-aprendizado")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-primary text-primary-foreground hover:bg-primary-dark"><BookOpen className="mr-2 h-5 w-5" /> Estudar os capítulos</Button>
              <TextReader text={allText} label="Ouvir narração" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">Conteúdo educativo. Não substitui avaliação, diagnóstico ou tratamento profissional.</p>
          </div>
        </div>
      </section>
      <section id="trilha-aprendizado" className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-border/50">
            <CardHeader><CardTitle className="text-2xl font-heading">Como usar este livro-curso</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Estude um capítulo por vez. Leia a teoria, faça a prática apenas se for confortável e responda às perguntas de reflexão. Não é necessário compartilhar textos pessoais. A trilha é uma estrutura educativa e não uma certificação de competência clínica.</p>
              <p><strong className="text-foreground">Objetivos de aprendizagem:</strong> explicar os três pilares da PCH; observar linguagem sem transformar metáforas em diagnósticos; distinguir evidência científica de hipótese; e montar uma rotina de autocuidado flexível e segura.</p>
              <div className="flex items-center gap-3"><div className="h-2 rounded-full bg-muted flex-1 overflow-hidden"><div className="h-full bg-primary transition-all" style={{ width: ((completed.length / chapters.length) * 100) + "%" }} /></div><span className="text-xs whitespace-nowrap">{completed.length} de {chapters.length} capítulos concluídos</span></div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              const isOpen = expanded.includes(chapter.id);
              const isDone = completed.includes(chapter.id);
              return <Card key={chapter.id} className="border-border/60 overflow-hidden">
                <button type="button" onClick={() => toggle(chapter.id)} aria-expanded={isOpen} className="w-full text-left p-5 md:p-6 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon className="h-5 w-5" /></div>
                  <div className="flex-1"><p className="text-xs uppercase tracking-widest text-primary mb-1">Capítulo {index + 1}</p><h2 className="font-heading font-semibold text-lg md:text-xl text-foreground">{chapter.title}</h2><p className="text-sm text-muted-foreground mt-1">{chapter.subtitle}</p></div>
                  {isDone && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}<ChevronDown className={"h-5 w-5 text-muted-foreground shrink-0 transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                {isOpen && <CardContent className="pt-0 pb-7 px-5 md:px-8 space-y-7">
                  {chapter.sections.map((section, sectionIndex) => <section key={section.title} className="space-y-3">
                    <h3 className="text-lg font-heading font-semibold text-foreground">{section.title}</h3>
                    {section.paragraphs.map((paragraph, i) => <p key={i} className="text-sm md:text-base text-muted-foreground leading-7">{paragraph}</p>)}
                    {section.bullets && <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-muted-foreground leading-7">{section.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}</ul>}
                    {sectionIndex < chapter.sections.length - 1 && <Separator className="mt-5 opacity-50" />}
                  </section>)}
                  <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5 space-y-4">
                    <h3 className="font-heading font-semibold text-foreground flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Prática guiada</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground leading-6">{chapter.practice.map((item, i) => <li key={i}>{item}</li>)}</ol>
                    <h4 className="font-semibold text-foreground pt-2">Perguntas de reflexão</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-6">{chapter.reflection.map((item, i) => <li key={i}>{item}</li>)}</ul>
                    <Button variant={isDone ? "outline" : "default"} onClick={() => toggleComplete(chapter.id)} className="gap-2">{isDone ? "Marcar como não concluído" : "Marcar capítulo como concluído"}</Button>
                  </div>
                </CardContent>}
              </Card>;
            })}
          </div>
          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardContent className="p-6 md:p-8 space-y-3">
              <h2 className="text-xl font-heading font-bold text-foreground">Encerramento da trilha</h2>
              <p className="text-sm text-muted-foreground leading-7">A prática poética pode oferecer linguagem para observar e elaborar experiências, mas não precisa resolver tudo. Preserve curiosidade, consentimento, senso crítico e a liberdade de adaptar ou interromper. A mudança significativa costuma depender de contexto, recursos, relações e, quando necessário, cuidado profissional.</p>
              <p className="text-xs text-muted-foreground">Nota de responsabilidade: este material é educativo. Não constitui protocolo clínico validado nem substitui formação, supervisão, avaliação individual ou tratamento. Profissionais devem atuar dentro de sua habilitação e das normas aplicáveis.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
};
export default LivroCurso;
