import React, { useState, useMemo } from 'react';
import { FlaskConical, Calendar, Tag, Wrench, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';
import { StudyCard } from '@/components/sections/ScientificValidation';
import heroImage from '@/assets/hero-ciencia-poesia.jpg';
import {
  scientificStudies,
  getAllCategories,
  getAllYears,
  toolLabels,
  categoryColors,
  type StudyCategory,
  type ToolTag,
} from '@/lib/scientific-studies';

const CienciaPoesia = () => {
  const [activeCategory, setActiveCategory] = useState<StudyCategory | 'all'>('all');
  const [activeTool, setActiveTool] = useState<ToolTag | 'all'>('all');
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');

  const categories = getAllCategories();
  const years = getAllYears();
  const tools = Object.keys(toolLabels) as ToolTag[];

  const filteredStudies = useMemo(() => {
    return scientificStudies.filter((s) => {
      if (activeCategory !== 'all' && !s.categories.includes(activeCategory)) return false;
      if (activeTool !== 'all' && !s.tools.includes(activeTool)) return false;
      if (activeYear !== 'all' && s.year !== activeYear) return false;
      return true;
    });
  }, [activeCategory, activeTool, activeYear]);

  const clearFilters = () => {
    setActiveCategory('all');
    setActiveTool('all');
    setActiveYear('all');
  };

  const hasFilters = activeCategory !== 'all' || activeTool !== 'all' || activeYear !== 'all';

  return (
    <PageLayout
      seo={{
        title: 'Ciência da Poesia — Estudos Científicos',
        description: 'Mais de 11 estudos publicados em revistas como Science, WHO e NeuroImage validam o uso terapêutico da poesia. Conheça a base científica do P.A.D.H.',
        path: '/ciencia-da-poesia',
      }}
      currentPage="Ciência da Poesia"
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <FlaskConical className="h-3.5 w-3.5" />
              Base Científica P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              A <span className="text-primary italic">Ciência</span> por Trás da Poesia
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {scientificStudies.length} estudos publicados em revistas internacionais como <em>Science</em>, <em>WHO</em> e <em>NeuroImage</em> fundamentam 
              o uso terapêutico da poesia — e validam cada ferramenta P.A.D.H.
            </p>
            <div className="mx-auto w-full max-w-lg mt-6">
              <img src={heroImage} alt="Ciência da Poesia — neurociência e linguagem poética" className="w-full rounded-xl shadow-lg opacity-90" width={1920} height={768} />
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <Tabs defaultValue="category" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="bg-card border border-border/50">
                <TabsTrigger value="category" className="gap-1.5 text-xs">
                  <Tag className="h-3 w-3" /> Por Categoria
                </TabsTrigger>
                <TabsTrigger value="year" className="gap-1.5 text-xs">
                  <Calendar className="h-3 w-3" /> Por Ano
                </TabsTrigger>
                <TabsTrigger value="tool" className="gap-1.5 text-xs">
                  <Wrench className="h-3 w-3" /> Por Ferramenta
                </TabsTrigger>
              </TabsList>

              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs gap-1">
                  <Filter className="h-3 w-3" /> Limpar filtros
                </Button>
              )}
            </div>

            {/* Category Filter */}
            <TabsContent value="category" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={activeCategory === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory('all')}
                >
                  Todas
                </Badge>
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className={`cursor-pointer ${activeCategory === cat ? categoryColors[cat] + ' font-semibold' : ''}`}
                    onClick={() => setActiveCategory(cat === activeCategory ? 'all' : cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            {/* Year Filter */}
            <TabsContent value="year" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={activeYear === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setActiveYear('all')}
                >
                  Todos
                </Badge>
                {years.map((year) => (
                  <Badge
                    key={year}
                    variant="outline"
                    className={`cursor-pointer ${activeYear === year ? 'bg-primary/10 text-primary border-primary/20 font-semibold' : ''}`}
                    onClick={() => setActiveYear(year === activeYear ? 'all' : year)}
                  >
                    {year}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            {/* Tool Filter */}
            <TabsContent value="tool" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={activeTool === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setActiveTool('all')}
                >
                  Todas
                </Badge>
                {tools.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className={`cursor-pointer ${activeTool === t ? 'bg-primary/10 text-primary border-primary/20 font-semibold' : ''}`}
                    onClick={() => setActiveTool(t === activeTool ? 'all' : t)}
                  >
                    {toolLabels[t]}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Results */}
          <div className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              {filteredStudies.length} {filteredStudies.length === 1 ? 'estudo encontrado' : 'estudos encontrados'}
            </p>
            {filteredStudies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
            {filteredStudies.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Nenhum estudo encontrado com os filtros selecionados.</p>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-2">
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CienciaPoesia;
