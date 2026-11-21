import { type ReactNode, useMemo, useState } from "react";
import { ExternalLink, Globe, Laptop, RefreshCw } from "lucide-react";

const LIVE_SITE_URL = "https://riteshsingh.is-a.dev/";

interface LiveGitPreviewFrameProps {
  children: ReactNode;
}

/**
 * Only activates inside the AI Studio preview host (*.run.app) so the live
 * GitHub Pages deployment (https://riteshsingh.is-a.dev/) can be inspected
 * directly in the preview pane without ever affecting production deploys.
 */
const LiveGitPreviewFrame = ({ children }: LiveGitPreviewFrameProps) => {
  const isPreviewHost = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.location.hostname.endsWith(".run.app");
  }, []);

  const [mode, setMode] = useState<"live" | "local">("local");
  const [reloadNonce, setReloadNonce] = useState(0);

  if (!isPreviewHost) {
    return <>{children}</>;
  }

  return (
    <>
      {mode === "live" ? (
        <div className="fixed inset-0 z-40 bg-background">
          <iframe
            key={reloadNonce}
            src={reloadNonce === 0 ? LIVE_SITE_URL : `${LIVE_SITE_URL}?cache=${reloadNonce}`}
            title="Live GitHub Pages Portfolio — riteshsingh.is-a.dev"
            className="w-full h-full border-0 block"
            allow="accelerometer; autoplay; clipboard-write; fullscreen"
          />
        </div>
      ) : (
        children
      )}

      {/* Compact preview mode switcher (only visible on preview host) */}
      <div className="fixed bottom-3 right-3 z-[90] flex items-center gap-1 rounded-xl border border-border bg-card/95 px-2 py-1.5 shadow-lg text-xs font-mono">
        <button
          type="button"
          onClick={() => setMode("live")}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mode === "live"
              ? "bg-primary text-primary-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Globe className="w-3.5 h-3.5 shrink-0" />
          <span>Live Git</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("local")}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mode === "local"
              ? "bg-primary text-primary-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Laptop className="w-3.5 h-3.5 shrink-0" />
          <span>Local</span>
        </button>
        {mode === "live" && (
          <>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
              title="Reload live site"
              aria-label="Reload live site"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={LIVE_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              title="Open riteshsingh.is-a.dev in new tab"
              aria-label="Open live site in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default LiveGitPreviewFrame;
