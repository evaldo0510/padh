import { Link } from "react-router-dom";
import {
  AudioLines,
  Brain,
  BookOpenText,
  Compass,
  Eye,
  Heart,
  Lightbulb,
  Network,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  question: string;
  icon: typeof Eye;
};

const readingProcesses: ProcessStep[] = [
  {
    number: "01",
    title: "Atenção ao texto",
    description:
      "Palavras, imagens, ritmo, repetições e pausas podem orientar o foco do leitor. O que se destaca depende do texto, da tarefa e do contexto de leitura.",
    question: "Que palavra, imagem ou pausa chamou minha atenção?",
    icon: Eye,
  },
  {
    number: "02",
    title: "Emoção e corpo",
    description:
      "Uma leitura pode vir acompanhada de emoção ou sensação corporal, mas também pode ser neutra. A reação varia entre pessoas e momentos e não funciona como diagnóstico.",
    question: "O que percebo em mim, se percebo algo?",
    icon: Heart,
  },
  {
    number: "03",
    title: "Memória e associações",
    description:
      "O leitor pode relacionar o texto a conhecimentos, experiências, histórias e outras leituras. Uma associação pessoal é um ponto de reflexão, não prova de que a lembrança seja completa ou de que o poema revele um fato.",
    question: "O que veio do texto e o que estou acrescentando?",
    icon: Network,
  },
  {
    number: "04",
    title: "Imaginação",
    description:
      "Metáforas e imagens podem abrir possibilidades de interpretação. Uma imagem poética não é um fato literal nem confirma, por si só, uma explicação psicológica.",
    question: "Que possibilidade essa imagem abre — e o que ela não explica?",
    icon: Lightbulb,
  },
  {
    number: "05",
    title: "Interpretação e escolha",
    description:
      "O sentido se constrói no encontro entre as pistas do texto, o contexto e o repertório do leitor. A interpretação pode ser pessoal e, ainda assim, precisa dialogar com o que está escrito.",
    question: "Que leitura é plausível? Que outra leitura também cabe?",
    icon: Compass,
  },
];

const references = [
  {
    title: "Zeman, Milton, Smith & Rylance (2013)",
    detail:
      "Estudo de fMRI que comparou a leitura de poesia e prosa; não avaliou a eficácia terapêutica da PCH.",
    href: "https://psycnet.apa.org/record/2013-44959-008",
    source: "APA PsycNet",
  },
  {
    title: "Wassiliwizky et al. (2017)",
    detail:
      "Investigou respostas emocionais e psicofisiológicas a poemas recitados em condições específicas; não demonstra benefício clínico universal.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5597896/",
    source: "Texto integral no PubMed Central",
  },
  {
    title: "Klooster et al. (2020)",
    detail:
      "Estudou compreensão de metáforas em pessoas com degeneração hemisférica esquerda e controles; não propõe uma única “área da metáfora”.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10158586/",
    source: "Texto integral no PubMed Central",
  },
  {
    title: "Jacobs (2015)",
    detail:
      "Revisão teórica de modelos e métodos de neurocognição literária; é uma agenda interdisciplinar, não validação clínica de uma intervenção.",
    href: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2015.00186/full",
    source: "Frontiers in Human Neuroscience",
  },
  {
    title: "Menon (2023)",
    detail:
      "Revisão sobre a rede de modo padrão como sistema distribuído e multifuncional; não sustenta que poesia induza hipnose ou acesso terapêutico a memórias.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10524518/",
    source: "Texto integral no PubMed Central",
  },
  {
    title: "Lacy & Stark (2013)",
    detail:
      "Revisão de neurociência da memória que descreve a lembrança como reconstrutiva e suscetível a distorções; não é pesquisa sobre poesia.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4183265/",
    source: "Texto integral no PubMed Central",
  },
  {
    title: "Thibodeau & Boroditsky (2011)",
    detail:
      "Estudou como enquadramentos metafóricos podem influenciar o raciocínio sobre problemas sociais; não é estudo de neuroimagem ou de terapia poética.",
    href: "https://doi.org/10.1371/journal.pone.0016782",
    source: "PLOS ONE · DOI",
  },
  {
    title: "Wu et al. (2026)",
    detail:
      "Estudo exploratório de fMRI sobre apreciação de poesia clássica chinesa em uma amostra jovem específica; não clínico e não valida a PCH.",
    href: "https://www.nature.com/articles/s41599-026-07217-9",
    source: "Humanities and Social Sciences Communications",
  },
];

const MapaCerebral = () => (
  <PageLayout seo={pagesSEO.mapaCerebral} currentPage="Mapa Cerebral">
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-glow" aria-hidden="true" />
      <div className="relative container mx-auto px-6 py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">
            Leitura poética · cognição · evidência
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
            O Mapa Cerebral do <span className="text-primary italic">Leitor Poético</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Uma ferramenta didática para observar processos que podem participar da leitura —
            não um mapa anatômico individual, um exame neurológico ou uma previsão do que alguém
            vai sentir.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/livro-curso">
                <BookOpenText className="mr-2 h-4 w-4" aria-hidden="true" />
                Ler o capítulo 5
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#evidencias">Ver evidências e limites</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-6 py-10 md:py-14">
      <div className="max-w-5xl mx-auto space-y-10">
        <Card className="border-primary/20 bg-primary/[0.035]">
          <CardContent className="p-6 md:p-8 flex items-start gap-4">
            <Brain className="h-6 w-6 shrink-0 text-primary mt-1" aria-hidden="true" />
            <div className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                O que significa “mapa” neste conteúdo?
              </h2>
              <p className="text-muted-foreground leading-7">
                É uma representação pedagógica para organizar perguntas sobre a experiência de
                leitura. Os processos abaixo podem interagir de maneiras diferentes; não são etapas
                cerebrais fixas nem correspondem, um a um, a regiões específicas do cérebro. O mapa
                não identifica personalidade, trauma, inconsciente ou diagnóstico.
              </p>
            </div>
          </CardContent>
        </Card>

        <section aria-labelledby="processos-title" className="space-y-5">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-2">
              Cinco dimensões para observar
            </p>
            <h2 id="processos-title" className="text-3xl font-heading font-bold text-foreground">
              Um mapa de leitura, não de regiões cerebrais
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {readingProcesses.map((process) => {
              const Icon = process.icon;
              return (
                <Card key={process.number} className="border-border/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-primary">Dimensão {process.number}</p>
                        <CardTitle className="text-lg">{process.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm md:text-base text-muted-foreground leading-7">
                      {process.description}
                    </p>
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Pergunta para observar:</span> {process.question}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <Card className="border-border/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-primary" aria-hidden="true" />
              <CardTitle className="text-xl">Um ciclo didático, com idas e voltas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Ciclo didático da leitura poética">
              {[
                "Texto e contexto",
                "Atenção",
                "Associações e emoções",
                "Interpretação provisória",
                "Nova leitura ou escolha",
              ].map((item, index) => (
                <li key={item} className="rounded-lg border border-border/60 bg-muted/20 p-4">
                  <span className="block text-xs text-primary font-semibold mb-1">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground leading-7">
              A sequência serve para reflexão e pode ser interrompida, repetida ou adaptada. Na
              experiência real, atenção, emoção, memória e interpretação podem ocorrer ao mesmo
              tempo e influenciar-se mutuamente.
            </p>
          </CardContent>
        </Card>

        <section id="evidencias" aria-labelledby="evidencias-title" className="space-y-5 scroll-mt-24">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-2">
              Rigor científico
            </p>
            <h2 id="evidencias-title" className="text-3xl font-heading font-bold text-foreground">
              O que os estudos permitem dizer
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border/60">
              <CardHeader><CardTitle className="text-lg">O que pode ser investigado</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-7">
                Tarefas específicas de leitura, compreensão de metáforas, apreciação estética,
                recitação e respostas emocionais podem ser estudadas com métodos distintos. Cada
                resultado depende da amostra, da tarefa e das medidas usadas.
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader><CardTitle className="text-lg">O que não se conclui automaticamente</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-7">
                Um achado de neuroimagem não revela o significado pessoal de um verso, não prova
                causalidade, não identifica uma “área da poesia” e não demonstra que uma prática
                específica trate sofrimento psicológico.
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader><CardTitle className="text-lg">O status da PCH</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-7">
                A PCH é apresentada no curso como proposta autoral em desenvolvimento. Pesquisas
                gerais sobre linguagem, metáforas ou poesia não validam, por si, a metodologia
                integrada nem autorizam promessas de eficácia clínica.
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="border-border/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-primary" aria-hidden="true" />
              <CardTitle className="text-xl">Cartografia breve de um poema</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base text-muted-foreground leading-7">
            <p>Ao ler um poema curto, experimente separar quatro camadas, sem obrigação de chegar a uma resposta:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong className="text-foreground">Texto:</strong> o que está escrito, literalmente?</li>
              <li><strong className="text-foreground">Atenção:</strong> qual palavra, som ou imagem se destacou?</li>
              <li><strong className="text-foreground">Associação:</strong> o que veio da sua experiência — e o que veio do texto?</li>
              <li><strong className="text-foreground">Interpretação:</strong> que outra leitura também pode caber?</li>
            </ol>
            <p>Se a atividade causar desconforto, pare ou escolha outro texto. Não é necessário compartilhar lembranças pessoais nem transformar uma associação em conclusão sobre a própria vida.</p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AudioLines className="h-5 w-5 text-primary" aria-hidden="true" />
              <CardTitle className="text-xl">Autonomia, acesso e cuidado</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-muted-foreground leading-7">
            <p>A leitura pode ser silenciosa, em voz alta ou acompanhada por áudio. Letras maiores, pausas, textos mais curtos e formas alternativas de resposta podem tornar a atividade mais acessível.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Não pressionar ninguém a recordar ou revelar experiências dolorosas.</li>
              <li>Não diagnosticar a partir de poemas, símbolos ou reações emocionais.</li>
              <li>Não prometer cura, hipnose, “desbloqueio” ou o mesmo resultado para todas as pessoas.</li>
              <li>Permitir que o leitor discorde, adapte ou interrompa a atividade.</li>
              <li>Procurar apoio profissional qualificado quando houver sofrimento persistente ou necessidade de cuidado especializado.</li>
            </ul>
          </CardContent>
        </Card>

        <section aria-labelledby="referencias-title" className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-2">Leitura adicional</p>
            <h2 id="referencias-title" className="text-3xl font-heading font-bold text-foreground">
              Referências comentadas
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-6">
              Cada fonte responde a uma pergunta específica; nenhuma, isoladamente ou em conjunto,
              demonstra a eficácia clínica da PCH.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {references.map((reference) => (
              <Card key={reference.title} className="border-border/60">
                <CardContent className="p-5 space-y-2">
                  <h3 className="font-heading font-semibold text-foreground">{reference.title}</h3>
                  <p className="text-sm text-muted-foreground leading-6">{reference.detail}</p>
                  <a
                    className="inline-flex min-h-10 items-center text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {reference.source}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="border-primary/20 bg-primary/[0.035]">
          <CardContent className="p-6 md:p-8 space-y-4 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground">O mapa serve para fazer perguntas melhores</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground leading-7">
              O poema oferece linguagem e possibilidades; o leitor participa da construção do
              sentido. A ciência ajuda a delimitar o que podemos afirmar, e a autonomia mantém a
              experiência aberta, voluntária e singular.
            </p>
            <Button asChild>
              <Link to="/livro-curso">Estudar o Capítulo 5</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  </PageLayout>
);

export default MapaCerebral;
