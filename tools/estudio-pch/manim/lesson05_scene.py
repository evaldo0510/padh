"""Estúdio PCH — Aula 05, Unidade 1: animação didática com Manim.

Renderização:
  manim -pqh lesson05_scene.py MapaProcessosPoeticos
  manim -qh lesson05_scene.py MapaProcessosPoeticos

A cena usa metáforas visuais explicitamente identificadas como didáticas.
Não representa regiões anatômicas nem dados de neuroimagem.
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
        eyebrow.to_edge(UP, buff=0.42)
        rule = Line(LEFT * 6.1, RIGHT * 6.1, color="#40506A", stroke_width=1.5)
        rule.next_to(eyebrow, DOWN, buff=0.18)
        self.play(FadeIn(eyebrow), Create(rule), run_time=0.8)

        title = Text("Como a leitura poética acontece?", font_size=40, color=CREAM)
        title.move_to(UP * 2.0)
        self.play(Write(title), run_time=1.2)

        verse = Text(
            "“Deixei a janela aberta para o dia entrar.”",
            font_size=31, color=GOLD
        )
        verse.move_to(UP * 0.65)
        self.play(FadeIn(verse, shift=UP * 0.2), run_time=0.9)
        self.wait(0.7)

        # The verse becomes a set of interacting cognitive processes.
        labels = [
            ("LINGUAGEM", CYAN, LEFT * 4.2 + DOWN * 0.8),
            ("MEMÓRIA", LILAC, LEFT * 2.1 + DOWN * 2.0),
            ("ATENÇÃO", GOLD, RIGHT * 0 + DOWN * 2.15),
            ("IMAGINAÇÃO", CORAL, RIGHT * 2.1 + DOWN * 2.0),
            ("EMOÇÃO", CYAN, RIGHT * 4.2 + DOWN * 0.8),
        ]
        nodes = VGroup()
        for label, color, point in labels:
            circle = Circle(radius=0.63, color=color, stroke_width=3)
            circle.set_fill(color, opacity=0.12)
            text = Text(label, font_size=19, color=CREAM)
            text.next_to(circle, DOWN, buff=0.16)
            node = VGroup(circle, text).move_to(point)
            nodes.add(node)

        self.play(
            FadeOut(verse, shift=UP * 0.2),
            title.animate.scale(0.78).to_edge(UP, buff=1.15),
            run_time=0.8,
        )
        self.play(
            LaggedStart(*[GrowFromCenter(node) for node in nodes], lag_ratio=0.16),
            run_time=2.0,
        )

        # Connect the nodes as a network, not a single "poetry center".
        center = Dot(ORIGIN + DOWN * 0.3, radius=0.07, color=CREAM)
        lines = VGroup(*[
            Line(center.get_center(), node[0].get_center(), color="#64748B", stroke_width=2)
            for node in nodes
        ])
        self.play(FadeIn(center), Create(lines), run_time=1.2)

        note = Text(
            "Processos diferentes podem interagir durante a leitura.",
            font_size=25, color=CREAM
        ).to_edge(DOWN, buff=0.58)
        self.play(FadeIn(note, shift=UP * 0.15), run_time=0.8)
        self.wait(1.4)

        self.play(
            FadeOut(VGroup(nodes, lines, center, note, title, eyebrow, rule)),
            run_time=0.8,
        )

        final_title = Text("Não existe um botão cerebral chamado poesia.", font_size=34, color=GOLD)
        final_title.move_to(UP * 0.6)
        final_note = Text(
            "Este é um mapa didático de processos — não um mapa anatômico.",
            font_size=24, color=CREAM
        ).next_to(final_title, DOWN, buff=0.45)
        self.play(Write(final_title), FadeIn(final_note), run_time=1.5)
        self.wait(2)
        self.play(FadeOut(VGroup(final_title, final_note)), run_time=0.7)
