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
      {/* Soft Neumorphic Island Card */}
      <div
        style={{
          background: 'var(--bg-convex)',
          boxShadow: 'var(--nm-raised-lg)',
          border: 'var(--border-rim)',
          borderRadius: '36px',
          padding: 'clamp(36px, 5.5vh, 64px) clamp(36px, 5vw, 76px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '820px',
          width: '90%',
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '18px 18px 40px rgba(10, 88, 48, 0.11), -18px -18px 40px #ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--nm-raised-lg)';
        }}
      >
        {/* Soft Recessed Logo Well */}
        <div
          className="animate-float"
          style={{
            background: 'var(--bg-surface)',
            boxShadow: 'var(--nm-raised-sm)',
            border: 'var(--border-rim)',
            borderRadius: '24px',
            padding: '24px 38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            maxWidth: '520px',
            width: '100%'
          }}
        >
          <img
            src="/assets/Technical Hub.png"
            alt="Technical Hub"
            style={{
              maxWidth: '100%',
              maxHeight: '170px',
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
