import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PCH_OBJECTIVES, PCHObjectiveId } from "@/types/objectives";
import { useProfile } from "@/hooks/useProfile";
import { Target, Check } from "lucide-react";

export const ObjectiveSettings: React.FC = () => {
  const { profile, updateObjective, loading } = useProfile();

  if (loading) return <div className="animate-pulse h-48 bg-white/5 rounded-2xl" />;

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Foco da Jornada</CardTitle>
        </div>
        <CardDescription>
          Escolha o objetivo principal da sua prática para personalizar as recomendações.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PCH_OBJECTIVES.map((obj) => {
          const isActive = profile?.objective === obj.id;
          return (
            <div
              key={obj.id}
              onClick={() => updateObjective(obj.id)}
              className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 group ${
                isActive 
                  ? "bg-primary/10 border-primary ring-1 ring-primary" 
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-background/50 ${obj.color}`}>
                  <obj.icon className="w-5 h-5" />
                </div>
                {isActive && (
                  <div className="bg-primary rounded-full p-1">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h4 className={`font-bold transition-colors ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                  {obj.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
