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
    <div className="container mx-auto px-6 pt-6 space-y-4">
      {" "}
      {showBackButton && (
        <Button variant="ghost" onClick={() => navigate(-1)} className="group">
          {" "}
          <ArrowLeft className="mr-2 spiritual-icon transition-transform group-hover:-translate-x-1" />{" "}
          Voltar{" "}
        </Button>
      )}
      <Breadcrumb>
        {" "}
        <BreadcrumbList>
          {" "}
          <BreadcrumbItem>
            {" "}
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1">
                {" "}
                <Home className="spiritual-icon" /> Início{" "}
              </Link>
            </BreadcrumbLink>{" "}
          </BreadcrumbItem>{" "}
          <BreadcrumbSeparator />{" "}
          <BreadcrumbItem>
            {" "}
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>{" "}
          </BreadcrumbItem>{" "}
        </BreadcrumbList>{" "}
      </Breadcrumb>{" "}
    </div>
  );
};
export default PageHeader;
