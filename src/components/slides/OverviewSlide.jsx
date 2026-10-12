import React from 'react';
import { Code, Server, Workflow, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function OverviewSlide({ slide, onJumpToSlide }) {
  const iconMap = {
    Code: Code,
    Server: Server,
    Workflow: Workflow,
    Sparkles: Sparkles
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }} className="stagger-1">
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
          marginBottom: '12px'
        }}>
          {slide.phaseLabel} • {slide.timeframe}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
          lineHeight: 1.2,
          marginBottom: '8px'
        }}>
          {slide.title}
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.55
        }}>
          {slide.description}
        </p>
      </div>

      {/* 4 Connected Phases Grid */}
      <div className="stagger-2" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        position: 'relative'
      }}>
        {slide.phases.map((phase, idx) => {
          const IconComponent = iconMap[phase.icon] || Code;
          const targetSlideIndex = idx + 2; // Year 1 is index 2, Year 2 is index 3, etc.

          return (
            <div
              key={idx}
              onClick={() => onJumpToSlide(targetSlideIndex)}
              style={{
                borderRadius: '26px',
                padding: '28px 24px',
                background: 'var(--bg-convex)',
                boxShadow: 'var(--nm-raised)',
                border: 'var(--border-rim)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--nm-raised-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--nm-raised)';
              }}
            >
              {/* Year Badge & Number */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'var(--bg-convex)',
                    boxShadow: 'var(--nm-raised-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: phase.color,
                    border: 'var(--border-rim)'
                  }}>
                    <IconComponent size={22} />
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--text-light)',
                    opacity: 0.6
                  }}>
                    0{idx + 1}
                  </span>
                </div>

                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: phase.color,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  {phase.year}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  lineHeight: 1.25,
                  marginBottom: '16px'
                }}>
                  {phase.theme}
                </h3>

                {/* Programs pill list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {phase.programs.map((prog, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-well)',
                        boxShadow: 'var(--nm-inset-sm)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: phase.color }} />
                      {prog}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Target Highlight */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px'
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {phase.highlight}
                </span>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--bg-convex)',
                  boxShadow: 'var(--nm-raised-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: phase.color
                }}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
