import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const UiGuide = () => {
  return (
    <PageLayout
      seo={{
        title: "Guia de Interface (UI) — P.A.D.H.",
        description: "Padronização de componentes, tamanhos e raios de borda do projeto.",
        path: "/ui-guide",
      }}
      currentPage="Ajuda"
    >
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Guia de Interface (UI)</h1>
          <p className="text-lg text-muted-foreground">
            Este guia serve como referência para manter a consistência visual em todos os formulários e ações do sistema.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Technical Specs */}
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Padrões de Base</CardTitle>
              <CardDescription>Especificações técnicas compartilhadas entre componentes.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Altura Padrão</span>
                <div className="text-2xl font-bold">44px (h-11)</div>
                <p className="text-xs text-muted-foreground">Aplicado a Botões, Inputs e Selects.</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Raio de Borda</span>
                <div className="text-2xl font-bold">12px (rounded-xl)</div>
                <p className="text-xs text-muted-foreground">Padronizado em toda a interface.</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Espaçamento Interno</span>
                <div className="text-2xl font-bold">16px (px-4)</div>
                <p className="text-xs text-muted-foreground">Padding horizontal consistente.</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Ícones</span>
                <div className="text-2xl font-bold">Classe spiritual-icon</div>
                <p className="text-xs text-muted-foreground">Padronização de tamanho e cor dos ícones.</p>
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">01</span>
              Botões
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Variantes Principais</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button variant="default">Padrão (Default)</Button>
                  <Button variant="secondary">Secundário</Button>
                  <Button variant="outline">Contorno</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="premium">Premium</Button>
                  <Button variant="glass">Glass</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tamanhos</CardTitle>
                </CardHeader>
                <CardContent className="flex items-end flex-wrap gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <Badge variant="outline" className="font-mono text-[10px]">h-9 (sm)</Badge>
                    <Button size="sm">Pequeno</Button>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <Badge variant="outline" className="font-mono text-[10px]">h-11 (default)</Badge>
                    <Button size="default">Padrão</Button>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <Badge variant="outline" className="font-mono text-[10px]">h-12 (lg)</Badge>
                    <Button size="lg">Grande</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Form Fields */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">02</span>
              Campos de Formulário
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Input</CardTitle>
                  <CardDescription>h-11, px-4, rounded-xl</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Digite algo..." />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Select</CardTitle>
                  <CardDescription>h-11, px-4, rounded-xl</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Opção 1</SelectItem>
                      <SelectItem value="2">Opção 2</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Textarea</CardTitle>
                  <CardDescription>min-h-20, py-2, rounded-xl</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Mensagem longa..." />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* States */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">03</span>
              Estados de Interação
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Repouso</span>
                    <Input placeholder="Normal" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary uppercase">Foco / Hover</span>
                    <Input placeholder="Hover/Focus" className="border-primary/50 bg-background/60 ring-2 ring-ring ring-offset-2" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-destructive uppercase">Erro</span>
                    <Input placeholder="Erro" className="border-destructive/50 ring-destructive/20 focus-visible:ring-destructive" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase opacity-50">Desativado</span>
                    <Input placeholder="Desativado" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 P.A.D.H. — Sistema de Design
          </p>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            Voltar
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default UiGuide;
