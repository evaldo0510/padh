import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PageHeader from './PageHeader';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import SEOHead from '@/components/seo/SEOHead';

interface PageLayoutProps {
  children: React.ReactNode;
  seo: { title?: string; description: string; path: string; jsonLd?: Record<string, unknown> };
  currentPage?: string;
  showBackButton?: boolean;
  loadingDelay?: number;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  seo,
  currentPage,
  showBackButton = true,
  loadingDelay = 150,
}) => {
  const isLoading = usePageLoading(loadingDelay);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={seo.title} description={seo.description} path={seo.path} jsonLd={seo.jsonLd} />
      <Header />
      {currentPage && <PageHeader currentPage={currentPage} showBackButton={showBackButton} />}
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
