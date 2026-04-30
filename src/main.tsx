import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import { APP_VERSION } from "./lib/changelog";

// Expose version for automated tests
if (typeof window !== "undefined") {
  (window as any).APP_VERSION = APP_VERSION;
}

// Guard: never run service workers inside Lovable editor preview / iframes.
// They cause stale content and break preview navigation.
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("id-preview--") ||
    window.location.hostname.includes("lovableproject.com") ||
    window.location.hostname.includes("lovable.app") === false &&
      window.location.hostname.includes("lovable") );

if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  if (isPreviewHost || isInIframe) {
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
