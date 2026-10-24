import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, ChevronDown, LogOut, Flame } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import PrefetchLink from "./PrefetchLink";
import { NAV_SECTIONS } from "@/lib/navigation";
import { supabase } from "@/integrations/supabase/client";
import { supabaseConfig } from "@/integrations/supabase/config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { useNavBadges } from "@/hooks/useNavBadges";


interface NavigationSheetProps {
  triggerClassName?: string;
  triggerLabel?: string;
  isLoggedIn?: boolean;
}

const NavigationSheet: React.FC<NavigationSheetProps> = ({
  triggerClassName,
  triggerLabel,
  isLoggedIn = false,
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const badges = useNavBadges();

  const isSectionActive = (section: (typeof NAV_SECTIONS)[number]) =>
    section.items.some(
      (it) => location.pathname === it.path || location.pathname.startsWith(it.path + "/"),
    );

  const renderBadge = (sectionId: string) => {
    if (sectionId === "jornadas" && badges.jornadasPercent > 0) {
      return (
        <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
          {badges.jornadasPercent}%
        </span>
      );
    }
    if (sectionId === "formacao") {
      return (
        <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
          {badges.formacaoCompleted}/{badges.formacaoTotal}
        </span>
      );
    }
    if (sectionId === "evolucao" && badges.streak > 0) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-warm tabular-nums">
          <Flame className="w-3 h-3" />
          {badges.streak}
        </span>
      );
    }
    return null;
  };


  const handleLogout = async () => {
    localStorage.removeItem("padh_simulated_user");
    if (supabaseConfig.isConfigured) await supabase.auth.signOut();
    toast.success("Sessão encerrada.");
    setOpen(false);
    navigate("/");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Abrir menu de navegação"
          className={
            triggerClassName ??
            "h-9 w-9 p-0 rounded-full hover:bg-accent bg-muted border border-border"
          }
        >
          <Menu className="w-4 h-4 text-foreground" aria-hidden="true" />
          {triggerLabel && (
            <span className="sr-only">{triggerLabel}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[380px] overflow-y-auto bg-background/95 backdrop-blur-2xl border-l border-border"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-left"><Logo size="sm" />Navegação</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-0.5">
          {NAV_SECTIONS.map((section) => {
            const Icon = section.icon;
            const active = isSectionActive(section);
            const badge = renderBadge(section.id);
            return (
              <Collapsible key={section.id} defaultOpen={active}>
                <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-accent transition-colors">
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span
                      className={`truncate text-sm font-semibold tracking-tight ${active ? "text-primary" : "text-foreground"}`}
                    >
                      {section.label}
                    </span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    {badge}
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="ml-7 mt-0.5 mb-1.5 flex flex-col gap-0.5 border-l border-border pl-3">

                    {section.items.map((item) => {
                      const itemActive =
                        location.pathname === item.path ||
                        location.pathname.startsWith(item.path + "/");
                      return (
                        <li key={item.path}>
                          <PrefetchLink
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                              itemActive
                                ? "text-primary bg-primary/10 font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                          >
                            {item.label}
                          </PrefetchLink>
                        </li>
                      );
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </nav>

        {isLoggedIn && (
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
