import { useState, useEffect } from 'react';

interface BrowserPreviewProps {
  url: string;
  accentColor: string;
  previewImage: string;
}

export const BrowserPreview = ({ url, accentColor, previewImage }: BrowserPreviewProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, [previewImage]);

  const domain = url.replace('https://', '').replace('www.', '');

  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(10, 10, 10, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Browser Top Navigation Bar */}
      <div
        style={{
          background: 'rgba(18, 18, 18, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {/* Mock Window Controls (Mac Style) */}
        <div style={{ display: 'flex', gap: '0.45rem', flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56', opacity: 0.8 }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', opacity: 0.8 }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f', opacity: 0.8 }} />
        </div>

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: 8,
            padding: '0.45rem 1rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6875rem',
            color: '#888',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          <span style={{ color: accentColor, opacity: 0.85, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            https://
          </span>
          <span style={{ color: '#aaa', fontWeight: 500 }}>{domain}</span>
        </div>

        {/* Action icons / reload icon & popout */}
        <div style={{ display: 'flex', gap: '0.4rem', color: '#666', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 600);
            }}
            title="Reload Preview"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
              e.currentTarget.style.background = 'none';
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Open Live Site in New Tab"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
              e.currentTarget.style.background = 'none';
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Browser Viewport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '560px',
          background: '#070707',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.15) transparent',
        }}
      >
        {/* Loading Spinner Block */}
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              background: '#070707',
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.03)',
                borderTopColor: accentColor,
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.5625rem',
                color: '#555',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              connecting to secure host...
            </span>
          </div>
        )}

        {/* Preview Screenshot (Scrollable Viewport) */}
        {!loading && (
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={previewImage}
              alt={`Live preview mockup of ${domain}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            
            {/* Interactive Float Launch Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'sticky',
                  bottom: '2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  pointerEvents: 'none',
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(10, 10, 10, 0.9)',
                    border: `1px solid ${accentColor}40`,
                    borderRadius: 30,
                    padding: '0.75rem 1.5rem',
                    color: '#fff',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    pointerEvents: 'auto',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = `0 10px 35px ${accentColor}25`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${accentColor}40`;
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Open Live Site ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Browser Footer Status */}
      <div
        style={{
          background: 'rgba(12, 12, 12, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '0.65rem 1.25rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.5625rem',
          color: '#444',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.5rem', color: '#333' }}>STATIC PREVIEW MODE // ACTIVE</span>
        <span style={{ fontSize: '0.53rem', color: '#555' }}>
          Interactive scrollable mock. Click <span style={{ color: '#fff', fontWeight: 500 }}>Open Live Site</span> or popout icon <span style={{ color: accentColor }}>↗</span> above to visit
        </span>
      </div>
    </div>
  );
};
