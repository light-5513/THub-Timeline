import React, { useState } from 'react';
import { Target, Cpu, Check, Layers, Sparkles } from 'lucide-react';

export function EcosystemSlide({ slide }) {
  const [selectedPillar, setSelectedPillar] = useState(0);

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
          fontSize: '1.02rem',
          color: 'var(--text-muted)',
          maxWidth: '660px',
          margin: '6px auto 0 auto',
          lineHeight: 1.5
        }}>
          {slide.description}
        </p>
      </div>

      {/* 4 Pillars Interactive Layout */}
      <div className="stagger-2" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {slide.pillars.map((pillar, idx) => {
          const isSelected = selectedPillar === idx;

          return (
            <div
              key={idx}
              onClick={() => setSelectedPillar(idx)}
              style={{
                borderRadius: '24px',
                padding: '24px 20px',
                background: isSelected ? 'var(--bg-convex)' : 'var(--bg-convex)',
                boxShadow: isSelected ? 'var(--nm-raised-lg)' : 'var(--nm-raised)',
                border: isSelected ? '2px solid var(--accent-primary)' : 'var(--border-rim)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Mascot / Avatar in sculpted circle */}
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '22px',
                background: 'var(--bg-convex)',
                boxShadow: isSelected ? 'var(--nm-inset-sm)' : 'var(--nm-raised-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                marginBottom: '16px',
                border: 'var(--border-rim)'
              }}>
                <img
                  src={pillar.avatar}
                  alt={pillar.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              <span style={{
                padding: '3px 10px',
                borderRadius: '999px',
                background: 'var(--bg-well)',
                boxShadow: 'var(--nm-inset-sm)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                marginBottom: '8px'
              }}>
                {pillar.badge}
              </span>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '6px'
              }}>
                {pillar.name}
              </h3>

              <p style={{
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                lineHeight: 1.45,
                marginBottom: '12px'
              }}>
                {pillar.focus}
              </p>

              <div style={{
                marginTop: 'auto',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: isSelected ? 'var(--accent-primary)' : 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {isSelected ? <Check size={14} /> : null}
                {isSelected ? 'Active Pillar' : 'Click to inspect'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pillar Detailed Insight Box */}
      <div className="stagger-3" style={{
        borderRadius: '22px',
        padding: '20px 28px',
        background: 'var(--bg-convex)',
        boxShadow: 'var(--nm-raised-sm)',
        border: 'var(--border-rim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'var(--bg-well)',
            boxShadow: 'var(--nm-inset-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)',
            flexShrink: 0
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Strategic Role in Student Progression: {slide.pillars[selectedPillar].name}
            </div>
            <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
              {slide.pillars[selectedPillar].role}
            </div>
          </div>
        </div>

        <div style={{
          padding: '6px 14px',
          borderRadius: '12px',
          background: 'var(--bg-well)',
          boxShadow: 'var(--nm-inset-sm)',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-muted)'
        }}>
          Pillar {selectedPillar + 1} of {slide.pillars.length}
        </div>
      </div>
    </div>
  );
}
