import React, { useState } from "react";
import { Brain, FlaskConical, PenLine, RotateCcw, BookOpen, ArrowRight, Eye, Heart, Lightbulb, Network, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

const poem = "A tarde guarda um silêncio\nna dobra azul da janela;\num pensamento passa devagar\ne deixa luz sobre a mesa.";

const prompts = [
  { id: "imagem", label: "Imagem mental", question: "Que imagem, cena ou lembrança apareceu — se alguma apareceu?" },
  { id: "emocao", label: "Emoção ou sensação", question: "Que emoção ou sensação você notou? Também vale não ter percebido nada específico." },
  { id: "palavra", label: "Palavra marcante", question: "Qual palavra ou verso chamou sua atenção? Por quê, se houver um motivo?" },
];

const readingProcesses = [
  { title: "Atenção ao texto", icon: Eye, description: "Palavras, imagens, ritmo, repetições e pausas podem orientar o foco. O que se destaca depende do texto, da tarefa e do contexto.", question: "Que palavra, imagem ou pausa chamou minha atenção?" },
  { title: "Emoção e corpo", icon: Heart, description: "Uma leitura pode vir acompanhada de emoção ou sensação corporal, mas também pode ser neutra. A reação varia entre pessoas e momentos e não funciona como diagnóstico.", question: "O que percebo em mim, se percebo algo?" },
  { title: "Memória e associações", icon: Network, description: "O leitor pode relacionar o texto a conhecimentos, experiências, histórias e outras leituras. Uma associação pessoal não prova que uma lembrança esteja completa nem que o poema revele um fato.", question: "O que veio do texto e o que estou acrescentando?" },
  { title: "Imaginação", icon: Lightbulb, description: "Metáforas e imagens podem abrir possibilidades de interpretação. Uma imagem poética não é um fato literal nem confirma, por si só, uma explicação psicológica.", question: "Que possibilidade essa imagem abre — e o que ela não explica?" },
  { title: "Interpretação e escolha", icon: Compass, description: "O sentido se constrói no encontro entre pistas do texto, contexto e repertório do leitor. A interpretação pode ser pessoal e ainda precisa dialogar com o que está escrito.", question: "Que leitura é plausível? Que outra leitura também cabe?" },
];

const references = [
  { title: "Zeman, Milton, Smith & Rylance (2013)", detail: "Estudo de fMRI que comparou a leitura de poesia e prosa, incluindo poemas favoritos ou autoselecionados; não valida a eficácia terapêutica da PCH.", href: "https://psycnet.apa.org/record/2013-44959-008", source: "APA PsycNet" },
  { title: "Wassiliwizky et al. (2017)", detail: "Investigou respostas emocionais e psicofisiológicas à poesia recitada em condições experimentais específicas; não demonstra benefício clínico universal.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5597896/", source: "Texto integral no PubMed Central" },
  { title: "Klooster et al. (2020)", detail: "Estudo sobre compreensão de metáforas em grupos e tarefas específicos; não propõe uma única “área da metáfora”.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10158586/", source: "Texto integral no PubMed Central" },
  { title: "Jacobs (2015)", detail: "Revisão teórica de modelos e métodos de neurocognição literária; é uma agenda interdisciplinar, não validação clínica de uma intervenção.", href: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2015.00186/full", source: "Frontiers in Human Neuroscience" },
  { title: "Menon (2023)", detail: "Revisão da rede de modo padrão como sistema distribuído e multifuncional; não sustenta que poesia induza hipnose ou acesso terapêutico a memórias.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10524518/", source: "Texto integral no PubMed Central" },
  { title: "Lacy & Stark (2013)", detail: "Revisão de neurociência da memória que descreve a lembrança como reconstrutiva e sujeita a distorções; não é pesquisa sobre poesia.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4183265/", source: "Texto integral no PubMed Central" },
  { title: "Thibodeau & Boroditsky (2011)", detail: "Estudo sobre como enquadramentos metafóricos podem influenciar o raciocínio; não é estudo de terapia poética.", href: "https://doi.org/10.1371/journal.pone.0016782", source: "PLOS ONE · DOI" },
  { title: "Wu et al. (2026)", detail: "Estudo exploratório de fMRI sobre apreciação de poesia clássica chinesa em amostra específica; não clínico e não valida a PCH.", href: "https://www.nature.com/articles/s41599-026-07217-9", source: "Humanities and Social Sciences Communications" },
];

const MapaCerebral = () => {
  const [respostas, setRespostas] = useState({ imagem: "", emocao: "", palavra: "", poema: "", reflexao: "" });
  const [etapa, setEtapa] = useState(0);
  const update = (key: string, value: string) => setRespostas((atual) => ({ ...atual, [key]: value }));
  const limpar = () => { setRespostas({ imagem: "", emocao: "", palavra: "", poema: "", reflexao: "" }); setEtapa(0); };
  const hasNotes = Object.values(respostas).some((value) => value.trim().length > 0);

  return (
    <PageLayout
      seo={{ title: "Laboratório Cerebral — Experimentos de Leitura Poética | Curso PCH", description: "Laboratório prático de leitura e escrita poética para observar imagens, associações e respostas pessoais sem diagnóstico ou promessas neurocientíficas.", path: "/mapa-cerebral" }}
      currentPage="Laboratório Cerebral"
    >
      <main className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-16 space-y-10">
        <header className="max-w-3xl mx-auto text-center space-y-4">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center"><FlaskConical className="h-7 w-7 text-primary" /></div>
          <Badge variant="outline">Curso PCH · Espaço de experimentação</Badge>
          <h1 className="text-3xl md:text-5xl font-heading font-bold">Laboratório <span className="text-primary italic">Cerebral</span></h1>
          <p className="text-lg text-muted-foreground">Aqui você não assiste à aula novamente: experimenta uma leitura, registra o que percebe e transforma uma impressão em escrita própria.</p>
          <div className="flex justify-center flex-wrap gap-3"><Button asChild variant="outline"><Link to="/aula-exclusiva"><BookOpen className="h-4 w-4 mr-2" />Voltar à Aula Exclusiva</Link></Button><Button asChild variant="outline"><Link to="/biblioteca-exercicios">Abrir Biblioteca</Link></Button></div>
        </header>

        <Card className="border-primary/20">
          <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />Experimento: ler, perceber, escrever</CardTitle><p className="text-sm text-muted-foreground">Reserve de 8 a 12 minutos. Você pode pular qualquer pergunta ou parar quando quiser.</p></CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl bg-muted/50 p-5 md:p-7"><p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Poema para observar</p><p className="whitespace-pre-line font-heading text-lg md:text-xl leading-relaxed">{poem}</p></div>
            <div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">Etapa {etapa + 1} de 3</p><div className="flex gap-1" aria-label={`Etapa ${etapa + 1} de 3`}>{[0,1,2].map((item) => <span key={item} className={`h-1.5 w-8 rounded-full ${item <= etapa ? "bg-primary" : "bg-muted"}`} />)}</div></div>

            {etapa === 0 && <div className="space-y-4"><h3 className="text-lg font-semibold">1. Observe sem procurar uma resposta certa</h3><p className="text-sm text-muted-foreground">Leia o poema uma vez, devagar. Note o que surgir espontaneamente — ou note que nada em especial surgiu.</p>{prompts.map((prompt) => <div key={prompt.id} className="space-y-2"><label htmlFor={prompt.id} className="text-sm font-medium">{prompt.question}</label><Textarea id={prompt.id} value={respostas[prompt.id as keyof typeof respostas]} onChange={(event) => update(prompt.id, event.target.value)} placeholder="Anote livremente (opcional)..." rows={3} /></div>)}</div>}

            {etapa === 1 && <div className="space-y-4"><h3 className="text-lg font-semibold">2. Transforme a percepção em linguagem</h3><p className="text-sm text-muted-foreground">Escolha uma palavra, imagem ou sensação anotada. Escreva de duas a quatro linhas sem se preocupar com rima ou acabamento.</p><label htmlFor="poema-autoral" className="text-sm font-medium">Seu poema (opcional)</label><Textarea id="poema-autoral" value={respostas.poema} onChange={(event) => update("poema", event.target.value)} placeholder={"Comece com: “Na minha janela...”\nOu escreva de um jeito totalmente diferente."} rows={6} /><div className="rounded-lg border p-4 text-sm text-muted-foreground"><strong className="text-foreground">Experimente:</strong> troque um substantivo por uma imagem concreta; leia as duas versões e observe qual combina mais com o que você quer expressar.</div></div>}

            {etapa === 2 && <div className="space-y-4"><h3 className="text-lg font-semibold">3. Registre o que você leva</h3><p className="text-sm text-muted-foreground">Não existe resultado obrigatório. Registre uma descoberta, uma dúvida ou simplesmente “não percebi mudança”.</p><label htmlFor="reflexao-final" className="text-sm font-medium">Sua reflexão final (opcional)</label><Textarea id="reflexao-final" value={respostas.reflexao} onChange={(event) => update("reflexao", event.target.value)} placeholder="O que percebi ao ler e escrever? O que quero guardar?" rows={5} /><div className="rounded-xl bg-muted/50 p-4 space-y-2"><p className="font-semibold text-sm">Resumo das suas anotações</p><p className="text-sm text-muted-foreground">Imagem: {respostas.imagem.trim() || "não registrada"}</p><p className="text-sm text-muted-foreground">Emoção ou sensação: {respostas.emocao.trim() || "não registrada"}</p><p className="text-sm text-muted-foreground">Palavra marcante: {respostas.palavra.trim() || "não registrada"}</p><p className="text-sm text-muted-foreground">Texto criado: {respostas.poema.trim() || "não registrado"}</p></div></div>}

            <div className="flex flex-wrap justify-between gap-3 border-t pt-4"><Button variant="outline" onClick={() => setEtapa((atual) => Math.max(0, atual - 1))} disabled={etapa === 0}>Voltar</Button>{etapa < 2 ? <Button onClick={() => setEtapa((atual) => Math.min(2, atual + 1))}>Próxima etapa <ArrowRight className="h-4 w-4 ml-2" /></Button> : <Button variant="outline" onClick={limpar}><RotateCcw className="h-4 w-4 mr-2" />Recomeçar</Button>}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 md:p-6 flex gap-3 items-start"><Brain className="h-5 w-5 text-primary shrink-0 mt-1" /><div className="space-y-2"><h2 className="font-semibold">O que este laboratório pode — e não pode — dizer</h2><p className="text-sm text-muted-foreground leading-relaxed">As respostas são relatos pessoais, não medidas de atividade cerebral. Este exercício não identifica áreas ativadas, não faz diagnóstico e não comprova um efeito terapêutico. Pesquisas sobre leitura envolvem processos complexos e distribuídos; a experiência individual varia.</p>{hasNotes && <p className="text-xs text-muted-foreground">Suas anotações estão nesta sessão do navegador e não são enviadas nem salvas em uma conta por este exercício.</p>}</div></CardContent>
        </Card>

        <section aria-labelledby="mapa-cerebral-title" className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <Badge variant="outline">Modelo didático · não anatômico</Badge>
            <h2 id="mapa-cerebral-title" className="text-2xl md:text-3xl font-heading font-bold">O Mapa Cerebral do Leitor Poético</h2>
            <p className="text-muted-foreground leading-7">“Mapa cerebral” é uma metáfora para organizar perguntas sobre a leitura, não um diagrama que localiza cada emoção em uma região. Linguagem, atenção, memória, imaginação e interpretação podem interagir; nenhuma etapa é obrigatória, e o percurso pode voltar, pausar ou terminar.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {readingProcesses.map((process, index) => {
              const Icon = process.icon;
              return <Card key={process.title} className="border-border/60">
                <CardHeader className="pb-3"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs uppercase tracking-widest text-primary">Dimensão {String(index + 1).padStart(2, "0")}</p><CardTitle className="text-lg">{process.title}</CardTitle></div></div></CardHeader>
                <CardContent className="space-y-3"><p className="text-sm md:text-base text-muted-foreground leading-7">{process.description}</p><p className="text-sm text-foreground"><strong>Pergunta para observar:</strong> {process.question}</p></CardContent>
              </Card>;
            })}
          </div>

          <Card className="border-primary/20 bg-primary/[0.035]">
            <CardHeader><CardTitle>O que a pesquisa permite — e não permite — concluir</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base text-muted-foreground leading-7">
              <p>Estudos de leitura, recitação, metáfora, memória e neuroimagem investigam tarefas e amostras específicas. Eles podem ajudar a formular hipóteses sobre processos distribuídos, mas não demonstram que uma reação individual identifique uma área cerebral, revele uma lembrança exata ou comprove a eficácia clínica da Poesia Cognitivo-Hipnótica.</p>
              <p>A memória é reconstrutiva; associações despertadas por um poema devem ser tratadas como experiências subjetivas, não como confirmação de fatos biográficos. Uma interpretação útil continua sendo uma hipótese do leitor, que pode ser revista, recusada ou deixada em aberto.</p>
              <p>Para afirmações sobre eficácia da PCH, são necessárias pesquisas diretas sobre a própria metodologia, com objetivos, medidas, comparações, amostras e limitações claramente descritos.</p>
            </CardContent>
          </Card>

          <Card id="mapa-cerebral-referencias">
            <CardHeader><CardTitle>Referências comentadas</CardTitle><p className="text-sm text-muted-foreground">Fontes para aprofundamento; cada estudo deve ser lido conforme sua tarefa, amostra e limites.</p></CardHeader>
            <CardContent><ul className="space-y-4">{references.map((reference) => <li key={reference.title} className="border-b border-border/60 pb-4 last:border-0">
              <a className="font-semibold text-primary underline underline-offset-2" href={reference.href} target="_blank" rel="noreferrer">{reference.title}<span className="sr-only"> (abre em nova aba)</span></a>
              <p className="mt-1 text-sm text-muted-foreground leading-6">{reference.detail}</p>
              <p className="mt-1 text-xs text-muted-foreground">{reference.source}</p>
            </li>)}</ul></CardContent>
          </Card>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 justify-center"><Button asChild><Link to="/biblioteca-exercicios"><PenLine className="h-4 w-4 mr-2" />Explorar mais práticas</Link></Button><Button asChild variant="outline"><Link to="/livro-curso">Continuar no Curso PCH</Link></Button></div>
      </main>
    </PageLayout>
  );
};

export default MapaCerebral;
