import React, { useMemo } from "react";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageHeaderProps {
  currentPage: string;
  showBackButton?: boolean;
  parentPage?: { name: string; path: string };
  moduleName?: string;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  currentPage,
  showBackButton = true,
  parentPage,
  moduleName,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Persist navigation state
  React.useEffect(() => {
    localStorage.setItem("padh_last_path", location.pathname);
  }, [location.pathname]);

  const handleBack = () => {
    if (parentPage) {
      navigate(parentPage.path);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:relative md:top-auto md:mt-14 md:bg-transparent md:backdrop-blur-none md:border-none pt-safe">
      <div className="container mx-auto px-4 md:px-6 h-14 md:h-auto flex flex-col justify-center">
        <div className="flex items-center justify-between gap-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack} 
              aria-label="Voltar"
              className="group h-10 w-10 md:h-8 md:w-auto p-0 md:px-3 rounded-full md:rounded-md active:scale-90 transition-transform"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5 md:mr-2 spiritual-icon transition-transform group-hover:-translate-x-1" />
              <span className="hidden md:inline text-sm">Voltar</span>
            </Button>
          )}
          
          <div className="md:hidden flex-1 text-center pr-10">
            <div className="flex flex-col items-center">
              {parentPage && (
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/60 -mb-1">
                  {parentPage.name}
                </span>
              )}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] truncate text-foreground/90 max-w-[180px]">
                {moduleName ? `${moduleName} › ${currentPage}` : currentPage}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-1">
                      <Home className="spiritual-icon" /> Início
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {parentPage && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={parentPage.path}>{parentPage.name}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
