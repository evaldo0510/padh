# Estúdio PCH — fase 2: animação didática

Esta entrega amplia a cena inicial para uma sequência de seis momentos da Aula 05, Unidade 1. O vídeo de prévia foi renderizado em 1280×720, 10 fps, 90 segundos, H.264, **sem narração**. O arquivo de prévia está separado do código-fonte.

## Conteúdo visual

1. Abertura: como a leitura poética acontece.
2. Verso-exemplo: texto, contexto e repertório.
3. Cinco processos em diálogo: linguagem, memória, atenção, imaginação e emoção.
4. Variação individual: associações diferentes, inclusive nenhuma associação.
5. Limites científicos: metáfora didática não é evidência; associação não é causalidade.
6. Fechamento: mapa de processos, não mapa anatômico.

## Renderização vetorial com Manim Community

Requer Python 3.10+ e dependências de sistema do Manim (Cairo, Pango e FFmpeg).

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
manim -pqh manim/lesson05_scene.py MapaProcessosPoeticos
```

No Windows, ative o ambiente com `.venv\\Scripts\\activate`.

## Áudio — controle de qualidade

A voz eSpeak do protótipo anterior foi reprovada e **não é usada** nesta entrega. O vídeo de prévia não contém narração nem trilha. O roteiro em `roteiros/aula05-unidade01-narracao.md` serve de base para gravação humana ou para avaliação futura de uma voz pt-BR. Nenhuma voz sintética deve ser sincronizada antes de uma amostra de 20–30 segundos ser ouvida e aprovada quanto à pronúncia, ritmo, naturalidade e inteligibilidade.

## Critérios e limites

- A cena deve comunicar a ideia sem depender da narração.
- Não representa regiões anatômicas nem dados de neuroimagem.
- Não promete cura, reprogramação cerebral ou efeito terapêutico.
- Associações individuais não são tratadas como diagnóstico.
- Renderização e áudio permanecem separados até a aprovação da voz.

## Reproduzir a prévia

A prévia entregue é um MP4 H.264 sem áudio. A cena Manim acima é o projeto vetorial editável; o MP4 de prévia não deve ser confundido com uma renderização Manim executada neste ambiente.
