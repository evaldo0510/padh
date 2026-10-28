import React, { useState } from "react";
import { BookOpen, Brain, Feather, Heart, Lightbulb, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";
import TextReader from "@/components/ui/text-reader";

type Chapter = { id: string; title: string; subtitle: string; icon: React.ElementType; sections: { title: string; paragraphs?: string[]; bullets?: string[] }[]; practice: string[]; reflection: string[] };
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
      ]},
      { title: "1.6. Roteiro comentado: da imagem à escolha", paragraphs: [
        "Considere uma atividade educativa com uma pessoa que diz: “Sinto que estou andando em círculos”. O facilitador não conclui que a pessoa tem medo de avançar nem presume uma causa escondida. Primeiro pergunta: “Quando você diz círculos, o que essa imagem descreve para você?”. A resposta pode ser repetição de tarefas, falta de informação, pressão externa ou apenas cansaço. A metáfora abre investigação; não entrega uma explicação pronta.",
        "Em seguida, a pessoa escolhe o foco: compreender a situação, organizar opções ou simplesmente encontrar palavras para o que sente. O facilitador explica que o exercício é voluntário, combina um tempo curto e reforça que é possível parar. A pessoa pode escrever, falar, desenhar ou apenas ouvir.",
        "A investigação segue em cinco movimentos: descrever a cena concreta; nomear a interpretação; reconhecer a emoção sem julgá-la; criar uma imagem alternativa que não negue os fatos; escolher uma ação possível. Se a pessoa perceber que está em um ambiente injusto ou inseguro, a resposta adequada pode ser buscar apoio ou mudar as condições, não reinterpretar o problema como falha pessoal.",
        "No encerramento, pergunta-se: “O que ficou mais claro, o que continua sem resposta e do que você precisa agora?”. Não se conclui que houve transformação profunda por causa de uma frase ou emoção momentânea. Registra-se apenas o que a pessoa relatou e qual próximo passo escolheu."
      ]},
      { title: "1.7. Glossário essencial", bullets: [
        "Poesia: organização expressiva da linguagem por imagens, ritmo, som, contraste e escolhas de forma.",
        "Cognição: processos como perceber, interpretar, lembrar, avaliar e planejar; não é sinônimo de pensamento racional perfeito.",
        "Atenção focalizada: direcionamento temporário da atenção a uma experiência, tarefa ou estímulo.",
        "Sugestão: convite ou formulação que pode influenciar a expectativa ou a interpretação; deve ser transparente e não coercitiva.",
        "Metáfora: aproximação entre domínios de experiência que pode gerar sentidos, sem possuir significado universal.",
        "Reavaliação: examinar uma interpretação e considerar alternativas compatíveis com os fatos, sem negar emoções ou condições externas.",
        "Consentimento: escolha informada, voluntária e revogável de participar de uma atividade.",
        "Evidência direta: pesquisa que investiga a própria intervenção e seus resultados, não apenas práticas parecidas."
      ]},
      { title: "1.8. Objetivos e síntese do capítulo", paragraphs: [
        "Ao concluir este capítulo, o leitor deverá conseguir explicar os três pilares da PCH, descrever uma prática educativa em etapas, distinguir metáfora de diagnóstico e identificar situações em que é necessário interromper ou encaminhar para apoio.",
        "Em síntese: a poesia oferece linguagem; a investigação cognitiva oferece perguntas; a atenção focalizada oferece uma estrutura de observação. Nenhum desses elementos autoriza impor significados ou prometer resultados. O valor da prática depende de consentimento, contexto, qualidade da condução e avaliação honesta do que aconteceu."
      ]},
      { title: "1.9. Perguntas de revisão", bullets: [
        "Por que uma metáfora não deve ser tratada como prova de uma causa psicológica?",
        "Quais são os três pilares da PCH e o que cada um acrescenta à atividade?",
        "Como o participante pode demonstrar que deseja interromper ou adaptar um exercício?",
        "Qual é a diferença entre uma experiência subjetivamente útil e uma eficácia clínica demonstrada?"
      ]},
    ],
    practice: ["Escolha uma emoção presente e descreva-a em três imagens concretas, sem tentar explicar sua causa.", "Escreva duas versões de uma frase interna: a primeira como ela surge espontaneamente; a segunda como uma pergunta curiosa, não como uma afirmação positiva forçada.", "Leia cada versão em voz baixa, se for confortável, e anote o que mudou na atenção, no corpo ou na interpretação. Não existe resposta correta.", "Descreva uma situação concreta em uma frase sem adjetivos sobre sua identidade. Depois identifique uma interpretação possível e uma informação que ainda falta.", "Escolha uma ação pequena ou decida conscientemente que, por enquanto, não precisa agir. Registre o motivo sem transformar a escolha em obrigação."],
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
      ]},
      { title: "2.6. Três estudos de caso fictícios", paragraphs: [
        "CASO A — FEEDBACK NO TRABALHO. Situação: Marina recebe uma mensagem pedindo revisão de uma apresentação. Frase interna: “Sou péssima no que faço”. Padrão observado: um pedido específico foi transformado em julgamento global de identidade. Perguntas: “O que exatamente foi solicitado?”, “Há informação de que todo o trabalho está ruim?”, “O que ainda preciso esclarecer?”. Reescrita possível: “Recebi um pedido de revisão; isso não define toda a minha competência. Vou identificar os pontos solicitados e perguntar sobre o que estiver ambíguo”. Limite: não se conclui que Marina é insegura ou perfeccionista a partir de uma frase. Próxima ação: revisar os itens e solicitar critérios claros.",
        "CASO B — INDECISÃO. Situação: Paulo precisa escolher entre dois cursos e teme desperdiçar dinheiro. Frase interna: “Se eu escolher errado, estraguei meu futuro”. Padrão observado: previsão catastrófica e linguagem definitiva. Perguntas: “Quais consequências são reversíveis?”, “Que informação falta?”, “Qual é o custo de esperar?”. Reescrita possível: “A escolha importa, mas não determina sozinha todo o meu futuro. Posso comparar custo, duração e oportunidades e decidir quando tiver informação suficiente”. Limite: a reescrita não elimina restrições financeiras reais. Próxima ação: montar uma tabela de custos e conversar com alguém experiente.",
        "CASO C — DESRESPEITO EXTERNO. Situação: Joana relata que um colega faz comentários humilhantes repetidamente. Frase interna: “Talvez eu seja sensível demais”. Padrão observado: a linguagem desloca toda a responsabilidade para si, embora haja comportamento externo concreto. Perguntas: “O que foi dito ou feito?”, “Isso se repetiu?”, “Que limites e apoios estão disponíveis?”. Reescrita possível: “Posso examinar minha reação sem minimizar o comportamento do colega. Tenho direito a respeito e posso registrar os fatos e procurar apoio”. Limite: o exercício não determina juridicamente o que ocorreu nem substitui orientação institucional. Próxima ação: documentar episódios e buscar uma pessoa ou canal confiável."
      ]},
      { title: "2.7. Modelo preenchido de diário poético", bullets: [
        "Situação: apresentei uma ideia e ninguém respondeu imediatamente.",
        "Frase automática: “Minha ideia não tem valor”.",
        "Emoção e corpo: vergonha e tensão nos ombros, conforme identificadas pela pessoa.",
        "Imagem própria: “uma carta ainda fechada”.",
        "Pergunta investigativa: “O silêncio significa rejeição ou ainda não sei o que as pessoas pensaram?”.",
        "Formulação alternativa: “Não recebi resposta ainda. Posso pedir retorno ou esperar até o momento combinado”.",
        "Próxima ação: perguntar quando a equipe poderá comentar a proposta."
      ]},
      { title: "2.8. Objetivos, síntese e revisão", paragraphs: [
        "Ao concluir este capítulo, o leitor deverá separar acontecimento de interpretação, reconhecer generalizações sem se diagnosticar, formular perguntas abertas e produzir uma alternativa crível. A escrita funciona como registro para investigação, não como veredito sobre identidade.",
        "Uma reescrita útil não precisa ser bonita nem otimista. Precisa ser mais específica, justa com os fatos e capaz de manter abertas as opções reais."
      ], bullets: [
        "Que palavras transformam um episódio em uma conclusão sobre toda a identidade?",
        "Que informação sustenta minha interpretação e que informação ainda falta?",
        "O problema depende apenas de uma interpretação ou também exige uma mudança externa?",
        "A alternativa proposta é crível e respeita a emoção que existe?"
      ]},
    ],
    practice: ["Complete: “Hoje, minha mente contou a história de que…”.", "Circule palavras absolutas e pergunte: “Isso é literalmente sempre verdadeiro? Que exceções existem? O que ainda não sei?”.", "Escreva uma versão alternativa que reconheça a dificuldade e inclua apenas uma possibilidade sob seu controle.", "Preencha o diário com situação, frase automática, emoção, metáfora escolhida, pergunta investigativa e próxima ação.", "Leia sua reescrita e avalie: ela é específica, crível, respeita os fatos e preserva o direito de sentir o que sente? Se não, ajuste-a."],
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
      ]},
      { title: "3.6. Exemplos de metáforas e interpretações alternativas", paragraphs: [
        "“Minha preocupação é um alarme que não desliga.” Uma possibilidade é que a pessoa esteja percebendo alerta constante; outra é que existam tarefas concretas sem solução; outra, ainda, é que a imagem não represente bem sua experiência. Perguntas úteis: “O que o alarme está sinalizando?”, “Existe perigo atual ou uma pendência?”, “Que recurso pode ajudar a avaliar isso?”. Não se presume que a metáfora revele um mecanismo cerebral.",
        "“Estou carregando uma montanha.” A imagem pode falar de excesso de responsabilidades, luto, cansaço, expectativa alheia ou uma dificuldade física concreta. Pergunte: “Qual parte pesa mais?”, “O que é seu e o que pode ser compartilhado?”, “Há algo que precise ser retirado do caminho?”. Não diga à pessoa que ela deve simplesmente largar a montanha: pode haver obrigações reais e limitações de escolha.",
        "“Estou diante de uma ponte.” Para uma pessoa, a ponte pode significar transição; para outra, risco, distância, oportunidade ou lembrança desagradável. O sentido vem da associação individual e do contexto. A metáfora é produtiva quando amplia perguntas, não quando fecha a interpretação."
      ]},
      { title: "3.7. Como avaliar uma fonte científica", bullets: [
        "Leia a pergunta da pesquisa e verifique se ela corresponde à afirmação que você pretende fazer.",
        "Confira o tipo de estudo: ensaio, estudo observacional, revisão sistemática, estudo qualitativo ou hipótese teórica.",
        "Observe quem participou, quantas pessoas foram estudadas, quais comparações foram feitas e por quanto tempo.",
        "Procure limitações, conflitos de interesse e se os resultados foram replicados.",
        "Não transforme mudanças em autorrelato em prova de alteração cerebral, nem associação em causalidade.",
        "Diferencie evidência sobre uma técnica específica de evidência sobre a PCH como conjunto."
      ]},
      { title: "3.8. Referências para leitura e limites da aplicação", paragraphs: [
        "As referências a seguir tratam de áreas relacionadas, não de ensaios que comprovem a eficácia clínica da PCH. Devem ser lidas conforme o desenho, a população e a intervenção estudada. A aplicação ao livro-curso é conceitual e não equivale a validação da metodologia."
      ], bullets: [
        "Pennebaker, J. W.; Beall, S. K. (1986). Confronting a traumatic event: Toward an understanding of inhibition and disease. Journal of Abnormal Psychology, 95(3), 274–281. DOI: 10.1037/0021-843X.95.3.274.",
        "Frattaroli, J. (2006). Experimental disclosure and its moderators: A meta-analysis. Psychological Bulletin, 132(6), 823–865. DOI: 10.1037/0033-2909.132.6.823.",
        "Thibodeau, P. H.; Boroditsky, L. (2011). Metaphors we think with: The role of metaphor in reasoning. PLOS ONE, 6(2), e16782. DOI: 10.1371/journal.pone.0016782.",
        "Oakley, D. A.; Halligan, P. W. (2013). Hypnotic suggestion: Opportunities for cognitive neuroscience. Nature Reviews Neuroscience, 14, 565–576. DOI: 10.1038/nrn3538.",
        "Lakoff, G.; Johnson, M. (1980). Metaphors We Live By. University of Chicago Press. Obra teórica de referência sobre metáforas conceptuais; não é, por si só, prova de eficácia terapêutica."
      ]},
      { title: "3.9. Objetivos, síntese e revisão", paragraphs: [
        "Ao concluir este capítulo, o leitor deverá explicar por que metáforas podem organizar significados sem ter sentido universal, distinguir hipótese de evidência e avaliar a qualidade de uma fonte. A linguagem poética pode ser significativa sem que cada efeito subjetivo precise ser explicado por uma afirmação cerebral.",
        "O rigor científico não diminui a poesia. Ele separa o que observamos, o que interpretamos e o que ainda precisamos investigar."
      ], bullets: [
        "Qual é a diferença entre uma hipótese plausível e uma conclusão demonstrada?",
        "Uma pesquisa sobre escrita expressiva comprova automaticamente a PCH? Por quê?",
        "Que evidência seria necessária para afirmar eficácia clínica de uma metodologia integrada?",
        "Como explicar uma metáfora sem atribuir a ela um significado universal?"
      ]},
    ],
    practice: ["Crie uma metáfora para uma preocupação cotidiana e pergunte se ela representa sua experiência com precisão.", "Escreva duas metáforas alternativas: uma que enfatize o peso e outra que destaque recursos disponíveis.", "Compare-as: qual abre uma possibilidade sem negar a realidade? Que ação pequena decorre dela?", "Escolha uma afirmação científica relacionada à linguagem ou à hipnose e procure a fonte original. Registre o tipo de estudo, a população e uma limitação.", "Reescreva a afirmação como uma frase proporcional à evidência, distinguindo o que foi observado do que ainda é hipótese."],
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
      ]},
      { title: "4.6. Jornada flexível de sete dias", bullets: [
        "Dia 1 — Chegar ao presente. Objetivo: observar sem resolver tudo. Instrução: nomeie uma palavra para o estado atual e note três coisas que vê ao redor. Pergunta: “O que merece minha atenção neste momento?”. Alternativa: diga a palavra mentalmente, sem escrever.",
        "Dia 2 — Separar fato e interpretação. Objetivo: reconhecer a diferença entre evento e conclusão. Instrução: escolha uma situação cotidiana e escreva o que uma câmera poderia registrar, depois a interpretação que você fez. Pergunta: “O que sei e o que estou supondo?”. Alternativa: conte a diferença em voz alta para si.",
        "Dia 3 — Encontrar uma imagem própria. Objetivo: dar forma à experiência sem impor significado. Instrução: escolha uma metáfora para uma preocupação e pergunte o que ela significa para você. Pergunta: “A imagem me ajuda ou me limita?”. Alternativa: escolha um objeto real que represente o momento.",
        "Dia 4 — Responder à autocrítica. Objetivo: criar linguagem específica e respeitosa. Instrução: anote uma frase julgadora e reescreva-a sem apagar a responsabilidade. Pergunta: “Como eu diria isso a alguém que respeito?”. Alternativa: imagine a resposta sem registrá-la.",
        "Dia 5 — Reconhecer recursos e limites. Objetivo: diferenciar o que depende de você e o que depende de outras condições. Instrução: faça duas listas curtas: “posso influenciar” e “não controlo sozinho”. Pergunta: “Que apoio ou limite é necessário?”. Alternativa: escolha mentalmente um item de cada grupo.",
        "Dia 6 — Escolher um próximo passo. Objetivo: transformar reflexão em ação realista. Instrução: selecione uma ação pequena, observável e possível para as próximas 24 horas. Pergunta: “Qual é o menor passo útil?”. Alternativa: peça a alguém de confiança para ajudar a definir a ação.",
        "Dia 7 — Revisar sem cobrança. Objetivo: avaliar a experiência com honestidade. Instrução: observe o que foi útil, neutro ou desconfortável e decida o que manter, adaptar ou abandonar. Pergunta: “O que aprendi sobre minhas necessidades, sem transformar isso em julgamento?”. Alternativa: faça uma revisão mental de um minuto. Não cumprir todos os dias não é falha."
      ]},
      { title: "4.7. Exemplo completo: escolher uma prática adequada", paragraphs: [
        "Se alguém chega agitado, não é obrigatório começar por uma escrita introspectiva. Pode ser mais adequado orientar a pessoa a observar o ambiente, nomear uma necessidade prática ou simplesmente interromper a atividade. Se a pessoa prefere falar, não imponha papel e caneta. Se a metáfora aumenta o desconforto, abandone-a sem tentar convencer a pessoa de que ela deveria ajudar.",
        "Ao final, pergunte se a prática foi útil, neutra ou desconfortável e o que a pessoa deseja fazer agora. A avaliação é um relato subjetivo, não uma escala clínica validada. Quando há sofrimento persistente, risco ou prejuízo importante na vida cotidiana, o livro-curso não substitui apoio profissional."
      ]},
      { title: "4.8. Objetivos, síntese e revisão", paragraphs: [
        "Ao concluir este capítulo, o leitor deverá escolher uma prática compatível com o contexto, adaptar ou interromper um exercício e identificar quando procurar apoio. Autocuidado não é uma obrigação de resolver tudo sozinho: pode incluir descanso, proteção, ajuda e mudança de condições externas.",
        "A prática poética é uma possibilidade, não uma prova de disciplina nem um substituto para cuidado especializado."
      ], bullets: [
        "Que sinais indicam que devo adaptar ou interromper um exercício?",
        "Como distinguir autocuidado educativo de atendimento clínico?",
        "Que ação realista posso escolher sem prometer um resultado?",
        "Que tipo de apoio posso procurar se o sofrimento persistir?"
      ]},
    ],
    practice: ["Durante sete dias, se isso fizer sentido para você, experimente a jornada flexível descrita neste capítulo. Registre uma palavra, uma imagem e uma ação pequena; pular um dia não é falha.", "No final da semana, observe quais práticas foram úteis, neutras ou desconfortáveis e decida o que manter, adaptar ou abandonar.", "Escreva um compromisso de autocuidado que seja específico, gentil e possível — e inclua como pedirá ajuda caso não consiga realizá-lo sozinho.", "Escolha uma das práticas para um dia agitado, um dia de autocrítica ou um dia de incerteza. Adapte-a à sua realidade e interrompa se aumentar o desconforto.", "Defina como avaliará a prática sem exigir melhora: utilidade, neutralidade, desconforto ou necessidade de apoio."],
    reflection: ["Esta prática está me apoiando ou virou mais uma exigência?", "Que sinais me mostram que preciso de pausa ou apoio?", "Qual hábito pequeno é sustentável na minha realidade atual?"]
  }
];

const LivroCurso = () => {
  const [expanded, setExpanded] = useState<string[]>(["capitulo-1"]);
  const [completed, setCompleted] = useState<string[]>([]);
  const toggle = (id: string) => setExpanded(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const toggleComplete = (id: string) => setCompleted(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const safeChapters = Array.isArray(chapters) ? chapters : [];
  const allText = safeChapters.map(ch => `${ch.title || ""}. ${(Array.isArray(ch.sections) ? ch.sections : []).map(s => `${s.title || ""}. ${(Array.isArray(s.paragraphs) ? s.paragraphs : []).join(" ")} ${(Array.isArray(s.bullets) ? s.bullets : []).join(" ")}`).join(" ")} Prática guiada. ${(Array.isArray(ch.practice) ? ch.practice : []).map((item, i) => `Etapa ${i + 1}. ${item}`).join(" ")} Perguntas de reflexão. ${(Array.isArray(ch.reflection) ? ch.reflection : []).map((item, i) => `Pergunta ${i + 1}. ${item}`).join(" ")}`).join(" ");
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
              <Button size="lg" onClick={() => { setExpanded(safeChapters.map(c => c.id)); document.getElementById("trilha-aprendizado")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-primary text-primary-foreground hover:bg-primary-dark"><BookOpen className="mr-2 h-5 w-5" /> Estudar os capítulos</Button>
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
              <div className="flex items-center gap-3"><div className="h-2 rounded-full bg-muted flex-1 overflow-hidden"><div className="h-full bg-primary transition-all" style={{ width: ((completed.length / Math.max(safeChapters.length, 1)) * 100) + "%" }} /></div><span className="text-xs whitespace-nowrap">{completed.length} de {safeChapters.length} capítulos concluídos</span></div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {safeChapters.map((chapter, index) => {
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
                  {(Array.isArray(chapter.sections) ? chapter.sections : []).map((section, sectionIndex, safeSections) => <section key={section.title} className="space-y-3">
                    <h3 className="text-lg font-heading font-semibold text-foreground">{section.title}</h3>
                    {(Array.isArray(section.paragraphs) ? section.paragraphs : []).map((paragraph, i) => <p key={i} className="text-sm md:text-base text-muted-foreground leading-7">{paragraph}</p>)}
                    {Array.isArray(section.bullets) && section.bullets.length > 0 && <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-muted-foreground leading-7">{(Array.isArray(section.bullets) ? section.bullets : []).map((bullet, i) => <li key={i}>{bullet}</li>)}</ul>}
                    {sectionIndex < safeSections.length - 1 && <Separator className="mt-5 opacity-50" />}
                  </section>)}
                  <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5 space-y-4">
                    <h3 className="font-heading font-semibold text-foreground flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Prática guiada</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground leading-6">{(Array.isArray(chapter.practice) ? chapter.practice : []).map((item, i) => <li key={i}>{item}</li>)}</ol>
                    <h4 className="font-semibold text-foreground pt-2">Perguntas de reflexão</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-6">{(Array.isArray(chapter.reflection) ? chapter.reflection : []).map((item, i) => <li key={i}>{item}</li>)}</ul>
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
