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
}) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/10 md:relative md:bg-transparent md:backdrop-blur-none md:border-none">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-auto flex flex-col justify-center">
        <div className="flex items-center justify-between gap-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="group h-10 w-10 md:h-8 md:w-auto p-0 md:px-3 rounded-full md:rounded-md"
            >
              <ArrowLeft className="h-5 w-5 md:mr-2 spiritual-icon transition-transform group-hover:-translate-x-1" />
              <span className="hidden md:inline text-sm">Voltar</span>
            </Button>
          )}
          
          <div className="md:hidden flex-1 text-center pr-10">
            <h1 className="text-[11px] font-black uppercase tracking-[0.3em] truncate text-foreground/80">
              {currentPage}
            </h1>
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
