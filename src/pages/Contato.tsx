import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/layout/PageHeader';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const isLoading = usePageLoading(600);
  if (isLoading) return <PageSkeleton />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio do formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Contato" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spiritual opacity-20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent">
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Conecte-se conosco e explore mais sobre a P.A.D.H.
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interessado em saber mais sobre a P.A.D.H. ou agendar uma sessão? Para se conectar com <strong>Evaldo PCH Master</strong> e explorar mais sobre essa abordagem, você pode nos encontrar nas redes sociais abaixo, ou enviar uma mensagem direta!
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Formulário de Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-2">
                  <Send className="h-6 w-6" />
                  Envie sua Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome:</Label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem:</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      placeholder="Sua mensagem..."
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-spiritual-violet hover:bg-spiritual-violet/90"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <div className="space-y-6">
              
              {/* Informações Gerais */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    Informações de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contato@padh.com.br</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>São Paulo, SP - Brasil</span>
                  </div>
                </CardContent>
              </Card>

              {/* Redes Sociais */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    Redes Sociais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Siga-nos nas redes sociais para acompanhar conteúdos exclusivos sobre P.A.D.H. e Poesia Cognitiva Hipnótica:
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Facebook className="mr-2 h-5 w-5" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Instagram className="mr-2 h-5 w-5" />
                      Instagram
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sobre Evaldo PCH Master */}
              <Card className="border-spiritual-violet/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-spiritual-violet">
                    Evaldo PCH Master
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Criador da metodologia P.A.D.H. (Protocolo Avançado de Desenvolvimento Humano) e especialista em Poesia Cognitiva Hipnótica.
                  </p>
                  <p className="text-muted-foreground">
                    Com anos de experiência integrando poesia, psicologia e neurociência, Evaldo desenvolve técnicas inovadoras para transformação pessoal e autoconhecimento através do poder terapêutico da palavra.
                  </p>
                </CardContent>
              </Card>

              {/* Horários de Atendimento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    Horários de Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Segunda a Sexta:</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado:</span>
                      <span>09:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo:</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Atendimentos também disponíveis online via videoconferência
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;