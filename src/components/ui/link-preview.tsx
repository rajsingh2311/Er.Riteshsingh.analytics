import React from "react";

type LinkPreviewProps = {
  href: string;
  imgSrc: string;
  label?: string;
  sizeClass?: string; // e.g. 'w-56' or 'w-48'
};

const LinkPreview: React.FC<LinkPreviewProps> = ({ href, imgSrc, label = "View", sizeClass = "w-56" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const fallbackSvg =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'>
        <defs>
          <linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0' stop-color='#0f172a' />
            <stop offset='1' stop-color='#020617' />
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' rx='16' fill='url(#g)' />
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9be7ff' font-family='monospace' font-size='28'>Preview</text>
      </svg>`
    );

  const normalizedSrc = imgSrc.startsWith("/") && import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "/"
    ? `${import.meta.env.BASE_URL}${imgSrc.slice(1)}`
    : imgSrc;

  let domain = "";
  try {
    domain = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    domain = href;
  }

  return (
    <span
      className="relative inline-block"
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") setIsOpen(true);
      }}
      onPointerLeave={() => setIsOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
        className="preview-trigger inline-flex items-center gap-1 text-primary hover:text-accent underline underline-offset-2 decoration-primary/40 hover:decoration-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
      >
        <span>{label}</span>
      </a>

      <span
        className={`preview absolute bottom-full left-0 sm:left-1/2 sm:-translate-x-1/2 pb-3 ${sizeClass} max-h-80 rounded-xl overflow-visible transition-all duration-300 ease-out z-50 ${
          isOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        }`}
        aria-hidden={!isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isOpen ? 0 : -1}
          className="block cursor-pointer shadow-2xl rounded-xl"
          aria-label={`Open ${href} in new tab`}
        >
          <span className="block p-1 rounded-xl bg-gradient-to-r from-primary via-accent to-cyan-400 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <span className="block max-w-full bg-card/95 border border-white/10 glass rounded-lg overflow-hidden">
              <span className="px-2.5 py-1.5 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="truncate max-w-[140px] text-foreground font-semibold">{domain}</span>
                </span>
                <span className="text-primary hover:underline">Visit site ↗</span>
              </span>
              <img
                src={normalizedSrc}
                alt={`Preview of ${href}`}
                className="w-full h-auto max-h-60 object-cover block"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = fallbackSvg;
                }}
              />
            </span>
          </span>
        </a>
      </span>
    </span>
  );
};

export default LinkPreview;
