import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, ChevronDown, LogOut } from "lucide-react";
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

  const isSectionActive = (section: (typeof NAV_SECTIONS)[number]) =>
    section.items.some(
      (it) => location.pathname === it.path || location.pathname.startsWith(it.path + "/"),
    );

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
            "h-9 w-9 p-0 rounded-full hover:bg-white/10 bg-white/5 border border-white/10"
          }
        >
          <Menu className="w-4 h-4 text-white/80" />
          {triggerLabel && (
            <span className="sr-only">{triggerLabel}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[380px] overflow-y-auto bg-background/95 backdrop-blur-2xl border-l border-white/10"
      >
        <SheetHeader>
          <SheetTitle className="text-left">Navegação</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-1">
          {NAV_SECTIONS.map((section) => {
            const Icon = section.icon;
            const active = isSectionActive(section);
            return (
              <Collapsible key={section.id} defaultOpen={active}>
                <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-white/5 transition-colors">
                  <span className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${active ? "text-primary" : "text-white/60"}`}
                    />
                    <span
                      className={`text-sm font-semibold ${active ? "text-primary" : "text-white/90"}`}
                    >
                      {section.label}
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/40 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="ml-7 mt-1 mb-2 flex flex-col gap-0.5 border-l border-white/10 pl-3">
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
                                : "text-white/70 hover:text-white hover:bg-white/5"
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
          <div className="mt-6 pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-white/70 hover:text-white"
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
