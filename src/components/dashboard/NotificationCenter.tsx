import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, Info, Sparkles } from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { ScrollArea } from "@/components/ui/scroll-area";
const NotificationCenter = () => {
  const { progress, markNotificationRead } = useCourseProgress();
  const unreadCount = progress.notifications.filter((n) => !n.read).length;
  return (
    <Popover>
      {" "}
      <PopoverTrigger asChild>
        {" "}
        <Button variant="ghost" size="icon" className="relative">
          {" "}
          <Bell className="spiritual-icon spiritual-icon-lg" />{" "}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          )}
        </Button>{" "}
      </PopoverTrigger>{" "}
      <PopoverContent className="w-80 p-0 border-primary/10" align="end">
        {" "}
        <div className="p-4 border-b border-border bg-primary/5">
          {" "}
          <h3 className="font-heading font-bold text-sm">Notificações</h3>{" "}
        </div>{" "}
        <ScrollArea className="h-80">
          {" "}
          {progress.notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {" "}
              <Info className="h-8 w-8 mx-auto mb-2 opacity-20" />{" "}
              <p className="text-xs">Nenhuma notificação por enquanto.</p>{" "}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {" "}
              {progress.notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 transition-colors hover:bg-muted/50 cursor-pointer ${!notif.read ? "bg-primary/[0.02]" : ""}`}
                  onClick={() => markNotificationRead(notif.id)}
                >
                  {" "}
                  <div className="flex gap-3">
                    {" "}
                    <div className="mt-1">
                      {" "}
                      {notif.title.includes("Concluído") ? (
                        <CheckCircle2 className="spiritual-icon text-primary" />
                      ) : (
                        <Sparkles className="spiritual-icon text-secondary" />
                      )}
                    </div>{" "}
                    <div className="flex-1">
                      {" "}
                      <p className="text-xs font-bold leading-none mb-1">
                        {notif.title}
                      </p>{" "}
                      <p className="text-[10px] text-muted-foreground leading-tight mb-2">
                        {notif.message}
                      </p>{" "}
                      <p className="text-[9px] text-muted-foreground opacity-60">
                        {" "}
                        {new Date(notif.date).toLocaleDateString()}
                        {new Date(notif.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>{" "}
      </PopoverContent>{" "}
    </Popover>
  );
};
export default NotificationCenter;
