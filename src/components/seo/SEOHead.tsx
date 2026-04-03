import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://padhpoesia.lovable.app';
const SITE_NAME = 'P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const breadcrumbLabels: Record<string, string> = {
  '/': 'Início',
  '/livro-curso': 'Livro-Curso PCH',
  '/formacao': 'Formação em PCH',
  '/mapa-cerebral': 'Mapa Cerebral',
  '/aula-exclusiva': 'Aula Exclusiva',
  '/sobre': 'Sobre',
  '/contato': 'Contato',
  '/curso-pch': 'Curso PCH',
  '/ferramentas': 'Ferramentas P.A.D.H.',
  '/ferramentas/poema-funil': 'Poema-Funil',
  '/ferramentas/verso-gatilho': 'Verso-Gatilho',
  '/ferramentas/poemadiagnostico': 'Poemadiagnóstico',
  '/ferramentas/caderno-voz-interna': 'Caderno da Voz Interna',
  '/ferramentas/encenacao-poetica': 'Encenação Poética',
  '/ferramentas/reescrita-poetica': 'Reescrita Poética',
  '/ferramentas/ritual-silencio': 'Ritual do Silêncio',
  '/ferramentas/poesia-hipnotica': 'Poesia Hipnótica',
  '/venda/poema-funil': 'Poema-Funil',
  '/venda/verso-gatilho': 'Verso-Gatilho',
  '/venda/poemadiagnostico': 'Poemadiagnóstico',
  '/venda/caderno-voz-interna': 'Caderno da Voz Interna',
  '/venda/encenacao-poetica': 'Encenação Poética',
  '/venda/reescrita-poetica': 'Reescrita Poética',
  '/venda/ritual-silencio': 'Ritual do Silêncio',
  '/venda/poesia-hipnotica': 'Poesia Hipnótica',
  '/ciencia-da-poesia': 'Ciência da Poesia',
};

function buildBreadcrumbJsonLd(path: string) {
  if (path === '/') return null;

  const segments = path.split('/').filter(Boolean);
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
  ];

  let accumulated = '';
  for (let i = 0; i < segments.length; i++) {
    accumulated += '/' + segments[i];
    const label = breadcrumbLabels[accumulated] || segments[i];
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: label,
      item: `${SITE_URL}${accumulated}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

const SEOHead = ({
  title,
  description = 'Descubra a Poesia Cognitiva Hipnótica (PCH) — metodologia que une neurociência, hipnose ericksoniana e linguagem poética para transformação interior. Por Evaldo PCH Master.',
  path = '/',
  type = 'website',
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title
    ? `${title} | P.A.D.H. — Evaldo PCH Master`
    : 'P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano | Evaldo PCH Master';
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description,
    author: {
      '@type': 'Person',
      name: 'Evaldo PCH Master',
    },
    publisher: {
      '@type': 'Organization',
      name: 'P.A.D.H.',
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(path);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Evaldo PCH Master" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>

      {/* Breadcrumb JSON-LD */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
