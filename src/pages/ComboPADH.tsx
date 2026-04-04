import React, { useState } from 'react';
import { Check, Sparkles, BookOpen, GraduationCap, Target, ArrowRight, Gift, Shield, Clock, Star, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

const ComboPADH = () => {
  const heroSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
  const formSection = useScrollAnimation();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    interesse: '',
    mensagem: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.email.trim()) {
      toast.error('Preencha pelo menos nome e e-mail.');
      return;
    }
    toast.success('Inscrição enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ nome: '', email: '', telefone: '', interesse: '', mensagem: '' });
  };

  const seo = {
    title: 'Combo P.A.D.H. — Jornada Integrada Completa',
    description: 'Acesse o pacote completo: Livro-Curso + Curso PCH + Formação Profissional. A jornada integrada para quem não quer perder nada da Poesia Cognitiva Hipnótica.',
    path: '/combo-padh',
  };

  const pillars = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Livro-Curso',
      subtitle: 'Fase 1 — Vivência Pessoal',
      desc: 'Exercícios guiados, poemas terapêuticos e práticas de autoconhecimento. Comece sentindo na pele o poder da PCH.',
      features: ['12 capítulos imersivos', 'Exercícios práticos por capítulo', 'Poemas terapêuticos originais', 'Diário de reflexão integrado'],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Curso PCH',
      subtitle: 'Fase 2 — Domínio Técnico',
      desc: 'A base teórica completa da metodologia. Neurociência, hipnose ericksoniana e técnicas de linguagem em profundidade.',
      features: ['Base teórica aprofundada', 'Neurociência da leitura poética', 'Técnicas de linguagem hipnótica', 'Modelo de sessão terapêutica'],
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Formação PCH',
      subtitle: 'Fase 3 — Certificação Profissional',
      desc: 'Capacitação completa para aplicar a PCH com clientes. Supervisão, protocolos de atendimento e selo profissional.',
      features: ['Certificado de Terapeuta PCH', 'Supervisão com Evaldo PCH Master', 'Protocolos clínicos completos', 'Comunidade de terapeutas'],
    },
  ];

  return (
    <PageLayout seo={seo} currentPage="Combo P.A.D.H.">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div
          ref={heroSection.ref}
          className={`relative container mx-auto px-6 py-24 text-center transition-all duration-1000 ${
            heroSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Gift className="h-4 w-4" />
              Pacote Exclusivo
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-foreground">
              Combo <span className="text-primary italic">P.A.D.H.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
              A jornada integrada para quem não quer perder nada. Do autoconhecimento à certificação profissional — tudo num só pacote.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary/40 pl-4 text-muted-foreground italic max-w-lg mx-auto text-sm">
              "Quem percorre os três caminhos não apenas aprende —&nbsp;
              <span className="text-foreground font-medium">se transforma e transforma.</span>"
              <span className="block mt-1 text-primary not-italic text-xs">— Evaldo PCH Master</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3 Pilares */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">O que está incluído</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
                3 Pilares, <span className="text-primary italic">1 Jornada</span>
              </h2>
            </div>

            <div className="space-y-8">
              {pillars.map((pillar, i) => (
                <Card key={i} className="border border-border/50 bg-card/60 hover:border-primary/30">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">{pillar.icon}</div>
                          <div>
                            <h3 className="text-2xl font-heading font-bold text-foreground">{pillar.title}</h3>
                            <p className="text-primary text-sm font-medium">{pillar.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
                      </div>
                      <div className="md:w-1/2">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pillar.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-border/30 bg-muted/30">
        <div
          ref={pricingSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            pricingSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Investimento</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Valor <span className="text-primary italic">Especial</span> do Combo
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Adquirir os três separadamente custaria muito mais. No combo, você economiza e garante a jornada completa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Separado */}
            <Card className="border border-border/50 bg-card/40">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-heading font-semibold text-muted-foreground mb-6">Comprando Separado</h3>
                <div className="space-y-4 mb-8">
                  {[
                    { name: 'Livro-Curso', price: 'R$ 197' },
                    { name: 'Curso PCH', price: 'R$ 497' },
                    { name: 'Formação PCH', price: 'R$ 1.497' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border/30 text-sm">
                      <span className="text-foreground/70">{item.name}</span>
                      <span className="text-foreground/70 line-through">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="text-muted-foreground line-through text-2xl font-heading">R$ 2.191</div>
                <p className="text-xs text-muted-foreground mt-1">Total avulso</p>
              </CardContent>
            </Card>

            {/* Combo */}
            <Card className="relative border-2 border-primary/40 bg-card shadow-xl shadow-primary/5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold py-1.5 px-4 rounded-full flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> Melhor Oferta
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Combo P.A.D.H.</h3>
                <p className="text-xs text-primary font-medium mb-6">Jornada Integrada Completa</p>
                <div className="mb-2">
                  <span className="text-5xl font-heading font-bold text-primary">R$ 1.497</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">ou 12× de R$ 149,70</p>

                <div className="space-y-3 text-left mb-8">
                  {[
                    'Livro-Curso completo',
                    'Curso PCH (Técnica) completo',
                    'Formação PCH + Certificação',
                    'Acesso à comunidade exclusiva',
                    'Suporte direto com Evaldo',
                    'Bônus: Aula Exclusiva grátis',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <a href="#inscricao">
                  <Button variant="premium" size="lg" className="w-full text-base">
                    Quero o Combo Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-[10px] text-muted-foreground mt-3">Economia de R$ 694 em relação ao avulso</p>
              </CardContent>
            </Card>
          </div>

          {/* Garantias */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 max-w-3xl mx-auto">
            {[
              { icon: <Shield className="h-5 w-5" />, text: 'Garantia de 7 dias' },
              { icon: <Clock className="h-5 w-5" />, text: 'Acesso vitalício' },
              { icon: <Star className="h-5 w-5" />, text: 'Certificado incluso' },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">{g.icon}</span>
                {g.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Inscrição */}
      <section id="inscricao" className="py-20 border-t border-border/30">
        <div
          ref={formSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            formSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Inscrição</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Reserve sua <span className="text-primary italic">Vaga</span>
              </h2>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo e entraremos em contato com as condições de pagamento.
              </p>
            </div>

            <Card className="border border-border/50 bg-card/80">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">WhatsApp / Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        maxLength={20}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interesse">Área de interesse</Label>
                      <select
                        id="interesse"
                        name="interesse"
                        value={formData.interesse}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecione...</option>
                        <option value="autoconhecimento">Autoconhecimento pessoal</option>
                        <option value="terapeuta">Atuação como terapeuta</option>
                        <option value="educador">Uso na educação</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      placeholder="Conte-nos um pouco sobre o que te motivou a buscar a PCH..."
                      rows={4}
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      maxLength={1000}
                    />
                  </div>

                  <Button type="submit" variant="premium" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Inscrição
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    Ao enviar, você concorda em receber informações sobre o Combo P.A.D.H. Seus dados são protegidos.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default ComboPADH;
