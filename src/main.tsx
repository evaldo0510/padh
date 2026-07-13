import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import { APP_VERSION } from "./lib/changelog";
import { initWebVitals } from "./lib/web-vitals";

// Expose version for automated tests
if (typeof window !== "undefined") {
  (window as any).APP_VERSION = APP_VERSION;
}

// Guard: never run service workers inside Lovable editor preview / iframes.
// They cause stale content and break preview navigation.
// Published lovable.app domains must be allowed, otherwise the live PWA cannot update.
const isEditorPreview = (() => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  const isInIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();
  return (
    host.includes("id-preview--") ||
    host.includes("lovableproject.com") ||
    isInIframe
  );
})();

if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  if (isEditorPreview) {
    // Unregister any existing SW + nuke caches so the preview always shows latest code.
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
    if ("caches" in window) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    }
  } else {
    // Production: listen for SKIP_WAITING messages from the update banner.
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "SKIP_WAITING") {
        console.log("PWA: Received SKIP_WAITING message in main. Activating...");
        navigator.serviceWorker.getRegistration().then((reg) => {
          reg?.waiting?.postMessage({ type: "SKIP_WAITING" });
        });
      }
    });
  }
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <App />
  </ThemeProvider>,
);

// Coleta de Web Vitals (assíncrona, após load — não bloqueia render)
initWebVitals();
