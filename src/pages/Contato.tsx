import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/PageLayout';
import { pagesSEO } from '@/lib/seo-config';

const Contato = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <PageLayout seo={pagesSEO.contato} currentPage="Contato">
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Conecte-se</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Entre em <span className="text-primary italic">Contato</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Interessado em saber mais sobre a P.A.D.H. ou agendar uma sessão? 
              Conecte-se com <strong className="text-foreground">Evaldo de Jesus Santana</strong> e 
              explore as possibilidades da Poesia Aplicada ao Desenvolvimento Humano.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Formulário */}
            <div className="lg:col-span-3">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Envie sua Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="nome" className="text-sm">Nome</Label>
                      <Input id="nome" name="nome" placeholder="Seu nome" value={formData.nome} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="mensagem" className="text-sm">Mensagem</Label>
                      <Textarea id="mensagem" name="mensagem" placeholder="Conte-nos sobre seu interesse na P.A.D.H..." value={formData.mensagem} onChange={handleInputChange} required rows={5} className="resize-none" />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary-dark">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info lateral */}
            <div className="lg:col-span-2 space-y-5">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-heading">Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: <Mail className="h-4 w-4 text-primary" />, text: 'contato@padh.com.br' },
                    { icon: <Phone className="h-4 w-4 text-primary" />, text: '(11) 99999-9999' },
                    { icon: <MapPin className="h-4 w-4 text-primary" />, text: 'São Paulo, SP — Brasil' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-heading">Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Acompanhe conteúdos exclusivos sobre P.A.D.H. e desenvolvimento humano:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: <Facebook className="h-4 w-4" />, name: 'Facebook' },
                      { icon: <Instagram className="h-4 w-4" />, name: 'Instagram' },
                      { icon: <Linkedin className="h-4 w-4" />, name: 'LinkedIn' },
                    ].map((social, i) => (
                      <Button key={i} variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5 text-xs">
                        {social.icon}
                        <span className="ml-1.5">{social.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/[0.02]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-heading text-primary">Evaldo de Jesus Santana</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Criador da metodologia P.A.D.H. e especialista em Poesia Cognitiva Hipnótica. 
                    Integra poesia, psicologia e neurociência em técnicas inovadoras 
                    para transformação pessoal.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-heading">Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Seg — Sex</span><span>09:00 — 18:00</span></div>
                    <div className="flex justify-between"><span>Sábado</span><span>09:00 — 14:00</span></div>
                    <div className="flex justify-between"><span>Domingo</span><span>Fechado</span></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    * Também disponível online via videoconferência
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contato;
