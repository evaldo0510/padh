const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument({ size: 'A4', margin: 0 });
doc.pipe(fs.createWriteStream('/mnt/documents/PCH-Brand-Guidelines.pdf'));

const W = 595.28, H = 841.89;
const VIOLET = '#8B5CF6', DEEP = '#2D1B4B', GOLD = '#F59E0B', BG = '#0F0820', SOFT = '#D6BCFA', MUTED = '#7C6BA8';

function page(title, subtitle){
  doc.rect(0,0,W,H).fill(BG);
  doc.fontSize(10).fillColor(MUTED).font('Helvetica').text('PCH · BRAND GUIDELINES', 40, 30, { characterSpacing: 3 });
  doc.fontSize(10).fillColor(GOLD).text('v1.0', W-80, 30, { align:'right', width: 40 });
  doc.moveTo(40, 50).lineTo(W-40, 50).strokeColor('#3A2E5C').lineWidth(0.5).stroke();
  doc.fontSize(36).fillColor('#F5F0FF').font('Times-Roman').text(title, 40, 80);
  if(subtitle){ doc.fontSize(13).fillColor(SOFT).font('Times-Italic').text(subtitle, 40, 130); }
  doc.fillColor(GOLD).rect(40,170,40,2).fill();
}

// === Page 1: Cover ===
doc.rect(0,0,W,H).fill(BG);
doc.circle(W/2, H/2-80, 180).fillOpacity(0.15).fill(VIOLET).fillOpacity(1);

// Feather
doc.save();
doc.translate(W/2, H/2-80).scale(2.6).translate(-32,-32);
doc.path('M32 56 C20 44 18 30 22 18 C26 8 36 6 42 12 C48 18 46 32 38 44 C36 48 34 52 32 56 Z')
   .fillAndStroke(VIOLET, DEEP);
doc.lineWidth(1.4).strokeColor(GOLD).moveTo(32,12).lineTo(32,54).stroke();
doc.circle(32,11,2).fill('#FDE68A');
doc.restore();

doc.fontSize(56).fillColor('#F5F0FF').font('Times-Roman').text('PCH', 0, H/2+140, {align:'center', width:W});
doc.fontSize(16).fillColor(SOFT).font('Times-Italic').text('Poesia Cognitiva Hipnótica', 0, H/2+210, {align:'center', width:W});
doc.moveTo(W/2-30, H/2+250).lineTo(W/2+30, H/2+250).strokeColor(GOLD).lineWidth(1).stroke();
doc.fontSize(11).fillColor(MUTED).text('GUIA DE IDENTIDADE VISUAL', 0, H/2+270, {align:'center', width:W, characterSpacing: 4});
doc.fontSize(9).fillColor(MUTED).text('Evaldo de Jesus Santana · 2026', 0, H-60, {align:'center', width:W, characterSpacing: 2});

// === Page 2: Conceito ===
doc.addPage(); page('Conceito', 'A marca como portal terapêutico');
doc.fontSize(11).fillColor('#E8DFFF').font('Helvetica').text(
  'PCH é a abreviação de Poesia Cognitiva Hipnótica — uma metodologia que une a precisão da neurociência, a profundidade da linguagem poética e o estado expandido da hipnose ericksoniana. A identidade visual reflete três pilares:',
  40, 200, {width: W-80, lineGap: 5, align:'justify'});

const pillars = [
  ['P', 'Poesia', 'O meio sensível. A palavra como portadora de imagem, ritmo e cura.'],
  ['C', 'Cognitiva', 'A racionalidade que organiza a experiência interna em estrutura.'],
  ['H', 'Hipnótica', 'A libertação integral através do estado ampliado de consciência.'],
];
let y = 320;
pillars.forEach(([k,n,d])=>{
  doc.circle(60, y+12, 18).fillOpacity(0.15).fill(GOLD).fillOpacity(1);
  doc.fontSize(18).fillColor(GOLD).font('Times-Roman').text(k, 52, y+2);
  doc.fontSize(14).fillColor('#F5F0FF').font('Times-Roman').text(n, 95, y);
  doc.fontSize(10).fillColor(SOFT).font('Helvetica').text(d, 95, y+22, {width: W-150, lineGap: 3});
  y += 75;
});

// === Page 3: Paleta ===
doc.addPage(); page('Paleta', 'Roxo profundo · Violeta · Dourado');
const colors = [
  ['Obsidian Purple', '#0F0820', 'Fundo principal, imersão'],
  ['Deep Violet', '#2D1B4B', 'Superfícies, cards, profundidade'],
  ['Royal Violet', '#8B5CF6', 'Símbolo, primary, identidade'],
  ['Soft Lilac', '#D6BCFA', 'Texto secundário, acentos suaves'],
  ['Amber Gold', '#F59E0B', 'Destaque, CTA, brilho'],
  ['Light Gold', '#FDE68A', 'Highlight, faísca, aura'],
  ['Bronze Gold', '#B45309', 'Contraste profundo do dourado'],
  ['Off-White', '#F5F0FF', 'Texto principal sobre fundo escuro'],
];
y = 200;
colors.forEach(([n,h,d])=>{
  doc.roundedRect(40, y, 90, 60, 6).fill(h);
  doc.fontSize(12).fillColor('#F5F0FF').font('Times-Roman').text(n, 150, y+8);
  doc.fontSize(10).fillColor(GOLD).font('Courier').text(h, 150, y+28);
  doc.fontSize(9).fillColor(SOFT).font('Helvetica').text(d, 280, y+18, {width: 270});
  y += 70;
});

// === Page 4: Tipografia ===
doc.addPage(); page('Tipografia', 'Editorial · Terapêutica · Clara');
doc.fontSize(11).fillColor(GOLD).font('Helvetica').text('PRIMÁRIA · TÍTULOS', 40, 200, {characterSpacing:3});
doc.fontSize(48).fillColor('#F5F0FF').font('Times-Roman').text('Playfair Display', 40, 220);
doc.fontSize(10).fillColor(MUTED).font('Helvetica').text('Serif editorial · Pesos: 400, 500, 600, 700, 800 · Itálico permitido para nuance poética', 40, 290);

doc.fontSize(11).fillColor(GOLD).text('SECUNDÁRIA · CORPO', 40, 340, {characterSpacing:3});
doc.fontSize(28).fillColor('#F5F0FF').font('Helvetica').text('Source Sans 3', 40, 360);
doc.fontSize(10).fillColor(MUTED).text('Sans-serif humanista · Pesos: 300, 400, 500, 600, 700 · Para parágrafos, UI e legibilidade', 40, 400);

doc.moveTo(40,440).lineTo(W-40,440).strokeColor('#3A2E5C').lineWidth(0.5).stroke();

doc.fontSize(11).fillColor(GOLD).text('HIERARQUIA RECOMENDADA', 40, 460, {characterSpacing:3});
const hier = [
  ['H1 · Hero', '48–64px · Playfair 700'],
  ['H2 · Seção', '32–40px · Playfair 600'],
  ['H3 · Subseção', '22–28px · Playfair 500'],
  ['Body', '15–17px · Source Sans 400'],
  ['Caption', '12–13px · Source Sans 500 · uppercase tracking'],
];
y = 490;
hier.forEach(([a,b])=>{
  doc.fontSize(11).fillColor('#F5F0FF').font('Times-Roman').text(a, 40, y);
  doc.fontSize(10).fillColor(SOFT).font('Helvetica').text(b, 200, y+1);
  y += 22;
});

// === Page 5: Logo Rules ===
doc.addPage(); page('Uso do Logo', 'Regras de aplicação e zona de respiro');

// Logo at top
doc.save();
doc.translate(120, 240).scale(1.5).translate(-32,-32);
doc.path('M32 56 C20 44 18 30 22 18 C26 8 36 6 42 12 C48 18 46 32 38 44 C36 48 34 52 32 56 Z').fill(VIOLET);
doc.lineWidth(1.4).strokeColor(GOLD).moveTo(32,12).lineTo(32,54).stroke();
doc.circle(32,11,2).fill('#FDE68A');
doc.restore();
// Clear space dashed box
doc.dash(3,{space:3}).rect(80,200,80,80).strokeColor(GOLD).lineWidth(0.5).stroke().undash();

doc.fontSize(13).fillColor('#F5F0FF').font('Times-Roman').text('Zona de respiro', 200, 210);
doc.fontSize(10).fillColor(SOFT).font('Helvetica').text('Mantenha sempre uma margem mínima equivalente à altura da faísca dourada ao redor do símbolo. Nunca aglomere com outros elementos visuais.', 200, 232, {width: W-240, lineGap: 3});

doc.fontSize(11).fillColor(GOLD).font('Helvetica').text('PERMITIDO', 40, 320, {characterSpacing:3});
const ok = [
  '✓ Usar sobre fundos escuros (#0F0820, #2D1B4B)',
  '✓ Variação monocromática quando necessário (apenas violeta)',
  '✓ Tamanho mínimo: 24px (digital) / 12mm (impresso)',
  '✓ Animar suavemente a faísca dourada em estados especiais',
];
y = 345;
ok.forEach(t=>{ doc.fontSize(10).fillColor(SOFT).font('Helvetica').text(t, 50, y); y += 18; });

doc.fontSize(11).fillColor('#F87171').font('Helvetica').text('EVITAR', 40, 445, {characterSpacing:3});
const no = [
  '✗ Distorcer, esticar ou rotacionar o símbolo',
  '✗ Trocar as cores fora da paleta oficial',
  '✗ Aplicar sobre fotos com ruído visual sem fundo escuro',
  '✗ Adicionar sombras pesadas ou efeitos 3D',
  '✗ Posicionar próximo demais a outros logos',
];
y = 470;
no.forEach(t=>{ doc.fontSize(10).fillColor('#FCA5A5').font('Helvetica').text(t, 50, y); y += 18; });

// === Page 6: Voz e Manifesto ===
doc.addPage(); page('Voz da Marca', 'Como a PCH fala e silencia');
const tone = [
  ['Terapêutica', 'Acolhe sem diagnosticar. Convida ao invés de instruir.'],
  ['Poética', 'Privilegia a imagem, o ritmo, o silêncio entre as palavras.'],
  ['Cognitiva', 'Apoia-se em evidência, sem perder a sensibilidade.'],
  ['Hipnótica', 'Conduz com cadência. Cria estados, não apenas mensagens.'],
];
y = 200;
tone.forEach(([k,d])=>{
  doc.fontSize(16).fillColor(GOLD).font('Times-Italic').text(k, 40, y);
  doc.fontSize(11).fillColor(SOFT).font('Helvetica').text(d, 40, y+24, {width:W-80, lineGap:3});
  y += 70;
});

doc.moveTo(40,490).lineTo(W-40,490).strokeColor('#3A2E5C').lineWidth(0.5).stroke();
doc.fontSize(11).fillColor(GOLD).font('Helvetica').text('MANIFESTO', 40, 510, {characterSpacing:4});
doc.fontSize(15).fillColor('#F5F0FF').font('Times-Italic').text(
  '"Há uma poesia que não decora a dor — ela a atravessa. A PCH é o lugar onde a palavra deixa de ser ornamento e volta a ser cura."',
  40, 540, {width:W-80, lineGap:6, align:'center'});
doc.fontSize(10).fillColor(MUTED).font('Helvetica').text('— Evaldo de Jesus Santana', 0, 640, {width:W, align:'center'});

doc.end();
