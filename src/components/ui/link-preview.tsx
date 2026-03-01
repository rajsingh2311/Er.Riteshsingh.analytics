import React from "react";

type LinkPreviewProps = {
  href: string;
  imgSrc: string;
  label?: string;
  sizeClass?: string; // e.g. 'w-56' or 'w-48'
};

const LinkPreview: React.FC<LinkPreviewProps> = ({ href, imgSrc, label = "View", sizeClass = "w-56" }) => {
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

  return (
    <span className="relative inline-block group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="preview-trigger inline-flex items-center text-primary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
      >
        {label}
      </a>

      <span
        className={`preview pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto absolute bottom-full left-1/2 -translate-x-1/2 mb-3 ${sizeClass} max-h-64 rounded-xl overflow-visible opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out z-50`}
        aria-hidden="true"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block cursor-pointer"
          aria-label={`Open ${href} in new tab`}
        >
          <span className="inline-block p-1 rounded-xl bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-300">
            <span className="inline-block max-w-full max-h-64 bg-gradient-to-b from-white/3 to-black/10 border border-white/5 glass rounded-lg overflow-hidden">
              <img
                src={imgSrc}
                alt={`Preview of ${href}`}
                className="w-auto h-auto max-w-[22rem] max-h-64 object-contain block"
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
