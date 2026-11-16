# Estúdio PCH — pipeline open source

## Objetivo
Transformar aulas do Curso PCH em vídeos didáticos narrados, com linguagem visual própria, preservando o conteúdo da aula e distinguindo evidência científica, interpretação e experiência subjetiva.

## Piloto
Capítulo 5 — **O Mapa Cerebral do Leitor Poético**. O roteiro de produção começa com três microvídeos:
1. A poesia não mora em um único lugar.
2. Uma metáfora abre uma possibilidade.
3. Sentir é real. Inferir exige cuidado.

## Pipeline proposto
- **FFmpeg**: renderização, composição e codificação MP4.
- **Piper TTS**: narração local PT-BR, quando o modelo de voz estiver instalado.
- **Whisper**: transcrição/alinhamento de legendas, executado localmente.
- **ComfyUI**: geração local de imagens/quadros quando houver GPU e modelos instalados.
- **Blender ou Motion Canvas**: animações de cenas mais elaboradas.
- **Worker separado**: processamento pesado fora do navegador e da aplicação PADH.

O primeiro protótipo pode usar eSpeak como fallback local para validar o fluxo sem API paga. Isso não substitui a voz Piper prevista para a versão de produção.

## Execução local do protótipo
Requisitos: Python 3, Pillow, FFmpeg e eSpeak (voz pt-br).

```bash
python -m pip install pillow
python tools/estudio-pch/render_pilot.py --out ./dist/estudio-pch
```

Os arquivos gerados são MP4 1280×720 com áudio local. O protótipo inicial usa movimento de câmera suave; ainda não representa a animação final de personagens/cenas.

## Regras editoriais e científicas
- Não afirmar que existe um centro cerebral único da poesia.
- Não inferir ativação de regiões cerebrais a partir de relatos subjetivos.
- Não transformar metáforas em diagnóstico ou prova sobre a história do leitor.
- Diferenciar estudos sobre leitura, linguagem, metáfora e recitação de evidência direta sobre eficácia clínica da PCH.
- Manter consentimento, autonomia e direito de interromper nas práticas descritas.
