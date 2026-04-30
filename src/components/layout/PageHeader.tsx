import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
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
}
const PageHeader: React.FC<PageHeaderProps> = ({
  currentPage,
  showBackButton = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        {showBackButton && (
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="group h-8 px-2 md:px-3">
            <ArrowLeft className="mr-1 md:mr-2 spiritual-icon transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Voltar</span>
          </Button>
        )}
        
        <div className="md:hidden flex-1 text-center pr-10">
          <h1 className="text-sm font-black uppercase tracking-[0.2em] truncate">
            {currentPage}
          </h1>
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
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
export default PageHeader;
