import React from 'react';

export function HeroSlide({ onNext }) {
  return (
    <div
      onClick={onNext}
      title="Click anywhere to continue"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(20px, 3.5vh, 40px)',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative'
      }}
    >
      {/* Opening content, with the transparent Technical Hub logo as the focal point */}
      <div
        style={{
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          padding: 'clamp(36px, 5.5vh, 64px) clamp(36px, 5vw, 76px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1100px',
          width: '100%',
          position: 'relative'
        }}
      >
        {/* Transparent logo area */}
        <div
          className="animate-float"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'clamp(20px, 3vh, 32px)',
            maxWidth: '900px',
            width: '100%'
          }}
        >
          <img
            src="/assets/Technical Hub.png"
            alt="Technical Hub"
            style={{
              maxWidth: 'min(82vw, 860px)',
              maxHeight: 'clamp(220px, 34vh, 360px)',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
            onError={(e) => {
              e.target.src = '/assets/th_logo.png';
            }}
          />
        </div>

        {/* Subtitle in Crisp Dark Green */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em',
            margin: '0 0 20px 0',
            lineHeight: 1.25
          }}
        >
          we are here to shape your future
        </h2>

        {/* Soft Tactile Chip */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 20px',
            borderRadius: '999px',
            background: 'var(--bg-well)',
            boxShadow: 'var(--nm-inset-sm)',
            color: 'var(--accent-primary)',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.04em'
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
          <span>Click anywhere to explore the 4-year evolution roadmap</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}
