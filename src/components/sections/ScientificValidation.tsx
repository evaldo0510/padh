import React from "react";
import { FlaskConical, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  type ToolTag,
  type ScientificStudy,
  getStudiesForTool,
  categoryColors,
} from "@/lib/scientific-studies";
interface ScientificValidationProps {
  tool: ToolTag;
  maxStudies?: number;
  showLink?: boolean;
}
const ScientificValidation: React.FC<ScientificValidationProps> = ({
  tool,
  maxStudies = 3,
  showLink = true,
}) => {
  const studies = getStudiesForTool(tool).slice(0, maxStudies);
  if (studies.length === 0) return null;
  return (
    <section className="py-16 border-t border-border/30">
      {" "}
      <div className="container mx-auto px-6 max-w-4xl">
        {" "}
        <div className="text-center mb-10">
          {" "}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
            {" "}
            <FlaskConical className="spiritual-icon spiritual-icon-sm" /> Base
            Científica{" "}
          </div>{" "}
          <h2 className="text-3xl font-heading font-bold text-foreground">
            {" "}
            Validação Científica{" "}
          </h2>{" "}
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            {" "}
            Estudos publicados em revistas internacionais que fundamentam esta
            ferramenta.{" "}
          </p>{" "}
        </div>{" "}
        <div className="space-y-4">
          {" "}
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} compact />
          ))}
        </div>{" "}
        {showLink && (
          <div className="text-center mt-8">
            {" "}
            <Link to="/ciencia-da-poesia">
              {" "}
              <Button variant="outline" className="gap-2">
                {" "}
                Ver todos os estudos científicos{" "}
                <ExternalLink className="spiritual-icon" />{" "}
              </Button>{" "}
            </Link>{" "}
          </div>
        )}
      </div>{" "}
    </section>
  );
};
export const StudyCard: React.FC<{
  study: ScientificStudy;
  compact?: boolean;
}> = ({ study, compact = false }) => (
  <Card className="border-border/50">
    {" "}
    <CardContent className={compact ? "p-5" : "p-6"}>
      {" "}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {" "}
        <span className="text-xs font-mono text-primary font-semibold">
          {study.year}
        </span>{" "}
        {study.categories.map((cat) => (
          <Badge
            key={cat}
            variant="outline"
            className={`text-[10px] ${categoryColors[cat]}`}
          >
            {" "}
            {cat}
          </Badge>
        ))}
      </div>{" "}
      <h3
        className={`font-heading font-semibold text-foreground ${compact ? "text-base" : "text-lg"}`}
      >
        {" "}
        {study.title}
      </h3>{" "}
      <p className="text-xs text-muted-foreground mt-1">
        {" "}
        {study.authors}— <em>{study.journal}</em>{" "}
      </p>{" "}
      <p className={`text-muted-foreground mt-3 ${compact ? "text-sm" : ""}`}>
        {" "}
        {study.summary}
      </p>{" "}
      {!compact && (
        <div className="mt-4 space-y-3">
          {" "}
          <div>
            {" "}
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">
              Metodologia
            </p>{" "}
            <p className="text-sm text-muted-foreground">
              {study.methodology}
            </p>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">
              Resultados
            </p>{" "}
            <p className="text-sm text-muted-foreground">
              {study.results}
            </p>{" "}
          </div>{" "}
        </div>
      )}
      {study.link && (
        <a
          href={study.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-3"
        >
          {" "}
          Acessar publicação <ExternalLink className="h-3 w-3" />{" "}
        </a>
      )}
    </CardContent>{" "}
  </Card>
);
export default ScientificValidation;
