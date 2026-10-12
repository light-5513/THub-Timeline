import React from 'react';

export function CoeSlide() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      height: '100dvh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'clamp(24px, 4vh, 44px) clamp(32px, 5.5vw, 72px)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
      backgroundImage: `
        linear-gradient(rgba(10, 88, 48, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(10, 88, 48, 0.04) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      userSelect: 'none'
    }}>
      {/* Soft Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '42%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10, 88, 48, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Giant Translucent Watermark "2" */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '6%',
        fontSize: 'clamp(280px, 52vh, 520px)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 900,
        color: 'rgba(10, 88, 48, 0.05)',
        lineHeight: 1,
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none'
      }}>
        2
      </div>

      {/* Main Title Section */}
      <div style={{ zIndex: 10, marginTop: 'clamp(8px, 2vh, 18px)', marginBottom: '0' }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 4.8vw, 4.8rem)',
          fontWeight: 900,
          color: 'var(--text-main)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: 0,
          maxWidth: '920px'
        }}>
          Claude & OpenAI Center of Excellence
        </h1>
      </div>

      {/* Middle Stage: Logos Slowly Visible One After Another, SIDE BY SIDE */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(44px, 6vw, 95px)',
        flexWrap: 'wrap',
        zIndex: 10,
        width: '100%',
        margin: '0',
        padding: '0'
      }}>
        {/* Left: Technical Hub Logo Card + "IN ASSOCIATION WITH" */}
        <div
          className="animate-reveal-slow"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '280px',
            animationDelay: '0.2s',
            background: 'var(--bg-convex)',
            boxShadow: 'var(--nm-raised)',
            border: 'var(--border-rim)',
            borderRadius: '28px',
            padding: 'clamp(20px, 3vh, 32px) clamp(24px, 2.5vw, 36px)'
          }}
        >
          <img
            src="/assets/Technical Hub.png"
            alt="Technical Hub"
            style={{
              maxHeight: 'clamp(85px, 12vh, 120px)',
              maxWidth: '380px',
              objectFit: 'contain'
            }}
          />

          <div style={{
            marginTop: 'clamp(14px, 2vh, 22px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)',
              fontWeight: 800,
              color: 'var(--text-muted)',
              letterSpacing: '0.22em',
              lineHeight: 1.35
            }}>
              IN ASSOCIATION<br />WITH
            </div>
            <div style={{
              width: '54px',
              height: '3px',
              background: 'var(--accent-primary)',
              borderRadius: '2px',
              margin: '8px auto 0 auto',
              opacity: 0.8
            }} />
          </div>
        </div>

        {/* Right: Partner Cards SIDE BY SIDE, Revealing One After Another */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(28px, 4vw, 54px)',
          flexWrap: 'wrap'
        }}>
          {/* Card 1: Claude - Soft Neumorphic Frame */}
          <div
            className="animate-reveal-slow"
            style={{
              width: 'clamp(255px, 24vw, 345px)',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: 'var(--nm-raised-lg)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              animationDelay: '0.9s',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '16px 16px 36px rgba(10, 88, 48, 0.12), -16px -16px 36px #ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--nm-raised-lg)';
            }}
          >
            <img
              src="/assets/claude.png"
              alt="Claude Certified Services Partner"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '32px'
              }}
            />
          </div>

          {/* Card 2: OpenAI - Soft Neumorphic Frame */}
          <div
            className="animate-reveal-slow"
            style={{
              width: 'clamp(255px, 24vw, 345px)',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: 'var(--nm-raised-lg)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              animationDelay: '1.9s',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '16px 16px 36px rgba(10, 88, 48, 0.12), -16px -16px 36px #ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--nm-raised-lg)';
            }}
          >
            <img
              src="/assets/openai_square.png"
              alt="OpenAI Select Partner"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '32px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoeSlide;
