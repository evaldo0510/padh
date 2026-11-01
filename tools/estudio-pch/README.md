# Estúdio PCH — fase 2: animação de cenas

Esta etapa substitui o protótipo de slides com zoom por cenas vetoriais animadas, compostas quadro a quadro com [Manim Community](https://github.com/ManimCommunity/manim).

## Escopo desta entrega

- Primeira cena animada da Aula 05, Unidade 1.
- Texto, nós, conexões e transições entram em sequência.
- O mapa representa **processos cognitivos distribuídos**, não áreas anatômicas.
- Não contém alegações de ativação cerebral individual ou efeito terapêutico.
- Narração não é embutida nesta etapa: a voz anterior foi reprovada pelo usuário e não deve ser reutilizada como padrão.

## Renderizar localmente

Requer Python 3.10+ e dependências de sistema do Manim (Cairo, Pango e FFmpeg).

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
manim -pqh manim/lesson05_scene.py MapaProcessosPoeticos
```

No Windows, ative o ambiente com `.venv\\Scripts\\activate`.

## Pipeline de áudio — decisão de qualidade

Não usar eSpeak como voz final. A narração deve ser uma faixa independente e aprovada antes da montagem:

1. Roteiro em português brasileiro revisado por pessoa.
2. Piper TTS com modelo explicitamente pt_BR, quando a licença e a qualidade do modelo forem verificadas.
3. Exportar WAV separado.
4. Ouvir amostra de 20–30 segundos e avaliar pronúncia, ritmo, naturalidade e inteligibilidade.
5. Só sincronizar com a animação após aprovação.

Se o modelo pt_BR não passar no teste, interromper a etapa de voz sintética e oferecer narração humana gravada. Não mascarar voz ruim com equalização.

## Próximas cenas

- Memória autobiográfica e semântica: associação pessoal sem inferência diagnóstica.
- Atenção, imaginação e emoção: respostas possíveis, não universais.
- DMN: rede distribuída, não “centro da poesia”.
- Limites da neuroimagem: associação não é causalidade.

## Critérios de aceite

- A cena comunica a ideia sem depender da narração.
- Tipografia legível em 1080p e em tela de celular.
- Movimento com propósito didático, sem excesso de efeitos.
- Nenhum desenho é apresentado como imagem real do cérebro.
- A faixa de áudio passa por aprovação de inteligibilidade em português brasileiro.
- Renderização final e arquivo de áudio permanecem separados até a aprovação.
