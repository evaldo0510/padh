import { Wind, Brain, PenTool, Sparkles } from "lucide-react";

export type PCHObjectiveId = "ansiedade" | "foco" | "escrita" | "reprogramacao";

export interface PCHObjective {
  id: PCHObjectiveId;
  label: string;
  icon: any;
  color: string;
  description: string;
}

export const PCH_OBJECTIVES: PCHObjective[] = [
  { 
    id: "ansiedade", 
    label: "Aliviar Ansiedade", 
    icon: Wind, 
    color: "text-blue-400",
    description: "Práticas voltadas para o relaxamento, respiração e presença no agora."
  },
  { 
    id: "foco", 
    label: "Mais Foco e Presença", 
    icon: Brain, 
    color: "text-amber-400",
    description: "Exercícios para reduzir o ruído mental e aumentar a concentração."
  },
  { 
    id: "escrita", 
    label: "Expressão pela Escrita", 
    icon: PenTool, 
    color: "text-purple-400",
    description: "Cura através da palavra escrita e da reescrita poética da própria história."
  },
  { 
    id: "reprogramacao", 
    label: "Reprogramação Mental", 
    icon: Sparkles, 
    color: "text-emerald-400",
    description: "Mudança de padrões automáticos e fortalecimento da identidade."
  },
];

export const isValidObjective = (obj: any): obj is PCHObjectiveId => {
  return PCH_OBJECTIVES.some(o => o.id === obj);
};
