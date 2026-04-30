import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import PageHeader from "./PageHeader";
import { usePageLoading } from "@/hooks/usePageLoading";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import SEOHead from "@/components/seo/SEOHead";

interface PageLayoutProps {
  children: React.ReactNode;
  seo: {
    title?: string;
    description: string;
    path: string;
    jsonLd?: Record<string, unknown>;
  };
  currentPage?: string;
  showBackButton?: boolean;
  loadingDelay?: number;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideMobileNav?: boolean;
  parentPage?: { name: string; path: string };
  moduleName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  seo,
  currentPage,
  showBackButton = true,
  loadingDelay = 150,
  hideHeader = false,
  hideFooter = false,
  hideMobileNav = false,
  parentPage,
  moduleName,
}) => {
  const isLoading = usePageLoading(loadingDelay);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title={seo.title}
        description={seo.description}
        path={seo.path}
        jsonLd={seo.jsonLd}
      />
      {!hideHeader && <Header />}
      {currentPage && (
        <PageHeader 
          currentPage={currentPage} 
          showBackButton={showBackButton} 
          parentPage={parentPage}
          moduleName={moduleName}
        />
      )}
      <main className={`flex-1 ${!hideMobileNav ? "pb-24 lg:pb-0" : ""} ${currentPage ? "pt-20 md:pt-0" : ""}`}>
        {children}
      </main>
      {!hideFooter && <div className="hidden lg:block"><Footer /></div>}
      {!hideMobileNav && <MobileNav />}
    </div>
  );
};

export default PageLayout;
