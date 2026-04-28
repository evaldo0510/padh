import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Button } from "@/components/ui/button";
interface ActivityTrackerProps {
  moduleId: string;
  activityId: string;
  label: string;
}
const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  moduleId,
  activityId,
  label,
}) => {
  const { progress, completeActivity } = useCourseProgress();
  const isCompleted =
    progress.completedActivities[moduleId]?.includes(activityId);
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
        isCompleted
          ? "bg-primary/5 border-primary/20"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      {" "}
      <div className="flex items-center gap-3">
        {" "}
        {isCompleted ? (
          <CheckCircle2 className="spiritual-icon spiritual-icon-lg text-primary" />
        ) : (
          <Circle className="spiritual-icon spiritual-icon-lg text-muted-foreground" />
        )}
        <span
          className={`text-sm font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}
        >
          {" "}
          {label}
        </span>{" "}
      </div>{" "}
      {!isCompleted && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => completeActivity(moduleId, activityId)}
          className="text-xs h-8"
        >
          {" "}
          Marcar concluído{" "}
        </Button>
      )}
    </div>
  );
};
export default ActivityTracker;
