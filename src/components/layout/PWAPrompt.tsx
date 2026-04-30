import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

const isEditorPreview = () => {
  if (typeof window === "undefined") return true;
  return (
    window.location.hostname.includes("id-preview--") ||
    window.location.hostname.includes("lovableproject.com") ||
    window.self !== window.top
  );
};

const PWAPromptRegistration = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });
  useEffect(() => {
    if (offlineReady) {
      toast.success("App pronto para uso offline!", {
        duration: 5000,
      });
    }
  }, [offlineReady]);
  useEffect(() => {
    if (needRefresh) {
      toast("Nova versão disponível!", {
        description:
          "Clique em atualizar para obter as melhorias mais recentes.",
        action: {
          label: "Atualizar",
          onClick: () => updateServiceWorker(true),
        },
        duration: Infinity,
        icon: <RefreshCw className="spiritual-icon animate-spin-slow" />,
      });
    }
  }, [needRefresh, updateServiceWorker]);
  return null;
};

const PWAPrompt = () => {
  if (isEditorPreview()) return null;
  return <PWAPromptRegistration />;
};

export default PWAPrompt;
