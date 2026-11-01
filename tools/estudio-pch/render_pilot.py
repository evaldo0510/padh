#!/usr/bin/env python3
"""Renderiza três microvídeos didáticos do piloto PCH usando ferramentas locais."""
import argparse, math, os, subprocess, wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

CLIPS = [
("01_leitura_e_redes","A poesia não mora\\nem um único lugar","A leitura poética envolve redes e processos distribuídos.",
 "A poesia não mora em um único lugar do cérebro. Ler um poema pode envolver linguagem, atenção, memória, emoção e autorreferência. Esses processos trabalham em redes distribuídas, e sua participação varia conforme a pessoa, a tarefa e o contexto.",
 ["LINGUAGEM","ATENÇÃO","MEMÓRIA","EMOÇÃO"],"Não existe um único centro cerebral da poesia."),
("02_metafora_e_sentido","Uma metáfora abre\\ uma possibilidade","Ela convida à interpretação — não entrega um diagnóstico.",
 "Quando uma imagem poética toca o leitor, ela pode despertar associações pessoais. Mas uma associação não é uma prova sobre a história, a personalidade ou o inconsciente de alguém. A pergunta responsável é: o que essa imagem significa para você?",
 ["IMAGEM","ASSOCIAÇÃO","PERGUNTA"],"A pessoa constrói o sentido. O facilitador não o impõe."),
("03_experiencia_e_evidencia","Sentir é real.\\nInferir exige cuidado.","A experiência subjetiva não revela, sozinha, a atividade cerebral.",
 "Ao ler um poema, você pode notar imagens mentais, emoções, sensações ou lembranças. Essas observações descrevem sua experiência subjetiva. Elas não identificam, por si só, quais áreas do cérebro foram ativadas. Para estudar atividade cerebral, são necessários métodos próprios de pesquisa.",
 ["O QUE EU LI","O QUE EU SENTI","O QUE A PESQUISA MEDE"],"Distinguir vivência, interpretação e evidência.")
]
W, H = 1280, 720
BG=(12,18,34); WHITE=(245,245,250); MUTED=(180,190,210)
GOLD=(235,190,105); CYAN=(91,205,210); PURPLE=(164,139,225); PINK=(235,145,170)

def center(draw, text, y, font, color):
    lines=text.split("\\n")
    metrics=[draw.textbbox((0,0),s,font=font)[3] for s in lines]
    yy=y-(sum(metrics)+8*(len(lines)-1))//2
    for line,h in zip(lines,metrics):
        box=draw.textbbox((0,0),line,font=font)
        draw.text(((W-(box[2]-box[0]))//2,yy),line,font=font,fill=color)
        yy += h+8

def render_card(out, clip, idx):
    slug,title,subtitle,narration,labels,footer=clip
    regular="/usr/share/fonts/truetype/lato/Lato-Medium.ttf"
    bold="/usr/share/fonts/truetype/lato/Lato-Bold.ttf"
    if not os.path.exists(regular): regular="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    if not os.path.exists(bold): bold=regular
    title_font=ImageFont.truetype(bold,56)
    body_font=ImageFont.truetype(regular,30)
    small_font=ImageFont.truetype(regular,22)
    image=Image.new("RGB",(W,H),BG); d=ImageDraw.Draw(image)
    d.text((72,48),"ESTÚDIO PCH  •  AULA 05",font=small_font,fill=GOLD)
    d.line((72,94,1208,94),fill=(80,95,125),width=2)
    center(d,title,190,title_font,WHITE); center(d,subtitle,300,body_font,MUTED)
    xs=[260,520,780,1040] if len(labels)==4 else [300,640,980]
    ys=[430,350,350,430] if len(labels)==4 else [440,385,440]
    colors=[CYAN,PURPLE,GOLD,PINK]
    for i,(label,x,y) in enumerate(zip(labels,xs,ys)):
        c=colors[i]; r=57
        d.ellipse((x-r,y-r,x+r,y+r),fill=tuple(int(v*.18) for v in c),outline=c,width=4)
        box=d.textbbox((0,0),label,font=small_font)
        d.text((x-(box[2]-box[0])/2,y+78),label,font=small_font,fill=WHITE)
        if i<len(labels)-1: d.line((x+65,y,xs[i+1]-65,ys[i+1]),fill=(120,145,180),width=3)
    d.rounded_rectangle((72,620,1208,680),radius=16,fill=(27,37,59),outline=(90,110,145),width=2)
    box=d.textbbox((0,0),footer,font=body_font)
    d.text(((W-(box[2]-box[0]))/2,635),footer,font=body_font,fill=GOLD)
    png=out/(slug+".png"); image.save(png)
    wav=out/(slug+".wav")
    if subprocess.call(["bash","-lc","command -v espeak >/dev/null"]) == 0:
        subprocess.run(["espeak","-v","pt-br","-s","145","-p","42","-a","165","-w",str(wav),narration],check=True)
    else:
        raise RuntimeError("Instale Piper TTS ou eSpeak com voz pt-br para gerar a narração.")
    with wave.open(str(wav),"rb") as f: duration=f.getnframes()/f.getframerate()
    mp4=out/(slug+".mp4")
    vf="zoompan=z='1.0+0.012*sin(2*PI*on/240)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=24,format=yuv420p"
    subprocess.run(["ffmpeg","-y","-loop","1","-i",str(png),"-i",str(wav),"-vf",vf,"-t",f"{duration:.2f}","-r","24","-c:v","libx264","-preset","ultrafast","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-shortest","-movflags","+faststart",str(mp4)],check=True)
    return mp4

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--out",default="./dist/estudio-pch")
    args=parser.parse_args()
    out=Path(args.out); out.mkdir(parents=True,exist_ok=True)
    for i,clip in enumerate(CLIPS,1):
        print(f"[{i}/{len(CLIPS)}] Renderizando {clip[0]}...")
        print(render_card(out,clip,i))
if __name__=="__main__": main()
