"""Estúdio PCH — Aula 05, Unidade 1: cena vetorial didática.

Renderização:
  manim -pqh lesson05_scene.py MapaProcessosPoeticos
  manim -qh lesson05_scene.py MapaProcessosPoeticos

As formas são metáforas didáticas, não imagens anatômicas ou dados de neuroimagem.
"""
from manim import *

BG = "#0B1220"
CREAM = "#F5F2EA"
GOLD = "#E9BD70"
CYAN = "#69D1D0"
LILAC = "#AA94E8"
CORAL = "#E99AA8"
MUTED = "#AEBBD0"


class MapaProcessosPoeticos(Scene):
    def construct(self):
        self.camera.background_color = BG
        eyebrow = Text("ESTÚDIO PCH  •  AULA 05", font_size=22, color=GOLD)
        eyebrow.to_edge(UP, buff=0.38)
        rule = Line(LEFT * 6.1, RIGHT * 6.1, color="#40506A", stroke_width=1.5)
        rule.next_to(eyebrow, DOWN, buff=0.16)
        self.play(FadeIn(eyebrow), Create(rule), run_time=0.8)

        # 1. Abertura
        title = Text("Como a leitura poética acontece?", font_size=38, color=CREAM)
        title.move_to(UP * 1.65)
        subtitle = Text(
            "Uma experiência que pode envolver diferentes processos.",
            font_size=24, color=MUTED
        ).next_to(title, DOWN, buff=0.45)
        self.play(Write(title), FadeIn(subtitle), run_time=1.5)
        self.wait(1.2)

        # 2. Verso: texto, contexto e repertório
        self.play(FadeOut(VGroup(title, subtitle)), run_time=0.5)
        prompt = Text("Leia esta frase:", font_size=25, color=MUTED)
        prompt.move_to(UP * 1.1)
        verse1 = Text("“Deixei a janela aberta", font_size=39, color=CREAM)
        verse2 = Text("para o dia entrar.”", font_size=39, color=GOLD)
        verse1.move_to(UP * 0.1)
        verse2.next_to(verse1, DOWN, buff=0.22)
        window = VGroup(
            Square(side_length=2.15, color=CYAN, stroke_width=3),
            Line(UP * 1.075, DOWN * 1.075, color=CYAN, stroke_width=2),
            Line(LEFT * 1.075, RIGHT * 1.075, color=CYAN, stroke_width=2),
        ).move_to(DOWN * 1.8)
        note = Text(
            "Texto, contexto e repertório do leitor.",
            font_size=25, color=MUTED
        ).to_edge(DOWN, buff=0.42)
        self.play(FadeIn(prompt), Write(verse1), Write(verse2), run_time=1.8)
        self.play(Create(window), FadeIn(note), run_time=1.2)
        self.wait(1.5)
        self.play(FadeOut(VGroup(prompt, verse1, verse2, window, note)), run_time=0.6)

        # 3. Processos em diálogo — rede didática, não mapa anatômico
        heading = Text("Processos diferentes podem interagir", font_size=34, color=CREAM)
        heading.to_edge(UP, buff=1.05)
        specs = [
            ("LINGUAGEM", CYAN, LEFT * 4.6 + DOWN * 0.25),
            ("MEMÓRIA", LILAC, LEFT * 2.3 + DOWN * 1.55),
            ("ATENÇÃO", GOLD, DOWN * 1.75),
            ("IMAGINAÇÃO", CORAL, RIGHT * 2.3 + DOWN * 1.55),
            ("EMOÇÃO", CYAN, RIGHT * 4.6 + DOWN * 0.25),
        ]
        nodes = VGroup()
        for label, color, point in specs:
            circle = Circle(radius=0.58, color=color, stroke_width=3).set_fill(color, opacity=0.12)
            number = Text(str(len(nodes) + 1), font_size=27, color=CREAM)
            name = Text(label, font_size=17, color=CREAM)
            name.next_to(circle, DOWN, buff=0.13)
            nodes.add(VGroup(circle, number, name).move_to(point))
        center = Dot(DOWN * 0.45, radius=0.075, color=CREAM)
        links = VGroup(*[
            Line(center.get_center(), node[0].get_center(), color="#64748B", stroke_width=2)
            for node in nodes
        ])
        note = Text(
            "Não existe um único “botão da poesia” no cérebro.",
            font_size=25, color=GOLD
        ).to_edge(DOWN, buff=0.42)
        self.play(FadeIn(heading), LaggedStart(*[GrowFromCenter(n) for n in nodes], lag_ratio=0.16), run_time=2.4)
        self.play(FadeIn(center), Create(links), FadeIn(note), run_time=1.4)
        self.wait(2)
        self.play(FadeOut(VGroup(heading, nodes, center, links, note)), run_time=0.6)

        # 4. Variação individual: todas as respostas são possíveis
        heading = Text("A mesma palavra pode despertar respostas diferentes", font_size=30, color=CREAM)
        heading.to_edge(UP, buff=1.0)
        word = Text("JANELA", font_size=48, color=GOLD).move_to(UP * 1.0)
        choices = [
            ("CASA", CYAN), ("VIAGEM", LILAC), ("LUZ", GOLD),
            ("SILÊNCIO", CORAL), ("NENHUMA", MUTED)
        ]
        cards = VGroup()
        for label, color in choices:
            card = RoundedRectangle(width=2.05, height=0.9, corner_radius=0.16, color=color)
            card.set_fill(color, opacity=0.10)
            card.add(Text(label, font_size=17, color=CREAM))
            cards.add(card)
        cards.arrange(RIGHT, buff=0.16).move_to(DOWN * 0.55)
        note1 = Text(
            "Associação pessoal não é prova nem diagnóstico.",
            font_size=24, color=CREAM
        ).move_to(DOWN * 1.75)
        note2 = Text(
            "Não sentir ou não lembrar de nada específico também é válido.",
            font_size=20, color=MUTED
        ).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(heading), Write(word), run_time=1.2)
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cards], lag_ratio=0.12), run_time=1.5)
        self.play(FadeIn(note1), FadeIn(note2), run_time=0.8)
        self.wait(1.5)
        self.play(FadeOut(VGroup(heading, word, cards, note1, note2)), run_time=0.6)

        # 5. Limites da afirmação científica
        heading = Text("O que a ciência permite afirmar?", font_size=36, color=CREAM)
        heading.to_edge(UP, buff=1.0)
        left = RoundedRectangle(width=4.6, height=2.45, corner_radius=0.18, color=GOLD)
        left.set_fill(GOLD, opacity=0.10).shift(LEFT * 2.55 + DOWN * 0.25)
        right = RoundedRectangle(width=4.6, height=2.45, corner_radius=0.18, color=CYAN)
        right.set_fill(CYAN, opacity=0.10).shift(RIGHT * 2.55 + DOWN * 0.25)
        ltxt = VGroup(
            Text("METÁFORA DIDÁTICA", font_size=22, color=CREAM),
            Text("Ajuda a explicar uma ideia.", font_size=22, color=MUTED)
        ).arrange(DOWN, buff=0.35).move_to(left)
        rtxt = VGroup(
            Text("EVIDÊNCIA DE PESQUISA", font_size=22, color=CREAM),
            Text("Exige método, dados e limites.", font_size=22, color=MUTED)
        ).arrange(DOWN, buff=0.35).move_to(right)
        divider = Line(UP * 1.5, DOWN * 1.5, color="#64748B", stroke_width=2)
        warning = Text(
            "Associação não é causalidade. Atividade cerebral não prova efeito terapêutico.",
            font_size=20, color=GOLD
        ).to_edge(DOWN, buff=0.38)
        self.play(FadeIn(heading), Create(left), Create(right), Create(divider), run_time=1.4)
        self.play(FadeIn(ltxt), FadeIn(rtxt), FadeIn(warning), run_time=1.0)
        self.wait(2)
        self.play(FadeOut(VGroup(heading, left, right, ltxt, rtxt, divider, warning)), run_time=0.7)

        # 6. Fechamento
        final = Text("Um mapa de processos e perguntas.", font_size=38, color=CREAM)
        final.move_to(UP * 0.45)
        caution = Text(
            "Não é um mapa anatômico do cérebro.",
            font_size=29, color=GOLD
        ).next_to(final, DOWN, buff=0.45)
        signature = Text("ESTÚDIO PCH", font_size=22, color=MUTED).to_edge(DOWN, buff=0.5)
        self.play(Write(final), FadeIn(caution), run_time=1.5)
        self.play(FadeIn(signature), run_time=0.6)
        self.wait(2)
        self.play(FadeOut(VGroup(final, caution, signature, eyebrow, rule)), run_time=0.8)
