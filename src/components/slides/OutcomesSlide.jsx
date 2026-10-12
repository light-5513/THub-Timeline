import React from 'react';
import { Award, TrendingUp, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function OutcomesSlide({ slide, onRestart, soundEnabled, onPlaySuccess }) {
  const triggerConfetti = () => {
    onPlaySuccess?.();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    } catch (e) {
      // Confetti fallback
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }} className="stagger-1">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '999px',
          background: 'var(--bg-convex)',
          boxShadow: 'var(--nm-raised-sm)',
          border: 'var(--border-rim)',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--accent-primary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          {slide.phaseLabel} • {slide.timeframe}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
          lineHeight: 1.15
        }}>
          {slide.title}
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '6px auto 0 auto',
          lineHeight: 1.5
        }}>
          {slide.subtitle}
        </p>
      </div>

      {/* 4 Outcome Metrics Grid */}
      <div className="stagger-2" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {slide.outcomesList.map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: '24px',
              padding: '24px',
              background: 'var(--bg-convex)',
              boxShadow: 'var(--nm-raised)',
              border: 'var(--border-rim)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.1rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #064e3b, #047857)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              marginBottom: '8px'
            }}>
              {item.metric}
            </div>

            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: '8px'
            }}>
              {item.title}
            </h4>

            <p style={{
              fontSize: '0.86rem',
              lineHeight: 1.5,
              color: 'var(--text-muted)'
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Global Partner Logo Ribbon */}
      <div className="stagger-3" style={{
        borderRadius: '24px',
        padding: '20px 28px',
        background: 'var(--bg-convex)',
        boxShadow: 'var(--nm-raised-sm)',
        border: 'var(--border-rim)',
        marginBottom: '24px'
      }}>
        <div style={{
          fontSize: '0.76rem',
          fontWeight: 700,
          color: 'var(--text-light)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '14px',
          textAlign: 'center'
        }}>
          Certified Multi-Vendor Credentials Integrated in Proposal
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          {slide.partnersDisplay.map((p, idx) => (
            <div
              key={idx}
              style={{
                height: '38px',
                padding: '4px 12px',
                borderRadius: '12px',
                background: 'var(--bg-convex)',
                boxShadow: 'var(--nm-raised-sm)',
                border: 'var(--border-rim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              title={p.name}
            >
              <img
                src={p.logo}
                alt={p.name}
                style={{ height: '24px', maxWidth: '80px', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="stagger-4" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={triggerConfetti}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 30px',
            borderRadius: '18px',
            border: 'none',
            background: 'linear-gradient(135deg, #064e3b, #047857)',
            color: '#ffffff',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '6px 6px 18px rgba(10, 88, 48, 0.28), -4px -4px 12px #ffffff',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Sparkles size={18} />
          Endorse & Launch Proposal
        </button>

        <button
          onClick={onRestart}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 24px',
            borderRadius: '18px',
            border: 'var(--border-rim)',
            background: 'var(--bg-convex)',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.98rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: 'var(--nm-raised-sm)',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <RotateCcw size={16} />
          Restart Presentation
        </button>
      </div>
    </div>
  );
}
