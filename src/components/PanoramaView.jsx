import React, { useState } from 'react';
import { timelineSlides } from '../data/timelineData';
import { ArrowRight, MonitorPlay, Calendar, Award, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export function PanoramaView({ onSelectSlide, onSwitchToSlideshow }) {
  const [filterYear, setFilterYear] = useState('all');

  const phaseSlides = timelineSlides.filter(s => s.type === 'phase-detail');

  const filteredPhases = filterYear === 'all'
    ? phaseSlides
    : phaseSlides.filter(s => {
        if (filterYear === 'year1') return s.id === 'year1';
        if (filterYear === 'year2') return s.id === 'year2';
        if (filterYear === 'year3') return s.id === 'year3';
        if (filterYear === 'year4') return s.id === 'year4';
        return true;
      });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px 20px 80px 20px',
      width: '100%'
    }}>
      {/* Panorama Header Banner */}
      <div style={{
        borderRadius: '32px',
        padding: '36px 32px',
        background: 'var(--bg-convex)',
        boxShadow: 'var(--nm-raised)',
        border: 'var(--border-rim)',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'var(--bg-well)',
            boxShadow: 'var(--nm-inset-sm)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-primary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            PANORAMIC TIMELINE ARCHITECTURE
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.15
          }}>
            Technical Hub Master Roadmap
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            marginTop: '8px',
            maxWidth: '650px'
          }}>
            Explore the complete 4-year, 8-semester student skilling trajectory on an uninterrupted interactive canvas. Click any stage to present it in cinematic slideshow mode.
          </p>
        </div>

        {/* Back to slideshow CTA */}
        <button
          onClick={onSwitchToSlideshow}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 26px',
            borderRadius: '18px',
            border: 'none',
            background: 'linear-gradient(135deg, #064e3b, #047857)',
            color: '#ffffff',
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '6px 6px 18px rgba(10, 88, 48, 0.28), -4px -4px 12px #ffffff',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <MonitorPlay size={18} />
          Return to Slideshow
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '36px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '8px' }}>
          <Filter size={16} />
          Filter Timeline:
        </div>

        {[
          { key: 'all', label: 'All 4 Years (Full Arc)' },
          { key: 'year1', label: 'Year 1: Foundations' },
          { key: 'year2', label: 'Year 2: Systems & Cloud' },
          { key: 'year3', label: 'Year 3: Enterprise Automation' },
          { key: 'year4', label: 'Year 4: Frontier AI' }
        ].map((tab) => {
          const isActive = filterYear === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilterYear(tab.key)}
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                border: 'var(--border-rim)',
                background: isActive ? 'var(--bg-well)' : 'var(--bg-convex)',
                boxShadow: isActive ? 'var(--nm-inset-sm)' : 'var(--nm-raised-sm)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-main)',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Continuous Connected Timeline Pathway */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
        {filteredPhases.map((phase, pIdx) => {
          const originalSlideIndex = timelineSlides.findIndex(s => s.id === phase.id);

          return (
            <div
              key={phase.id}
              style={{
                borderRadius: '32px',
                padding: '36px',
                background: 'var(--bg-convex)',
                boxShadow: 'var(--nm-raised)',
                border: 'var(--border-rim)',
                position: 'relative'
              }}
            >
              {/* Phase Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '28px',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '20px'
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 14px',
                    borderRadius: '999px',
                    background: 'var(--bg-well)',
                    boxShadow: 'var(--nm-inset-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: phase.badgeColor || 'var(--accent-primary)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    {phase.phaseNumber} • {phase.timeframe}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    lineHeight: 1.2
                  }}>
                    {phase.title}
                  </h3>

                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {phase.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => onSelectSlide(originalSlideIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '14px',
                    border: 'var(--border-rim)',
                    background: 'var(--bg-convex)',
                    boxShadow: 'var(--nm-raised-sm)',
                    color: 'var(--text-main)',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <span>Open in Slideshow</span>
                  <ArrowRight size={15} color="var(--accent-primary)" />
                </button>
              </div>

              {/* Programs and Partners in this Phase */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '28px'
              }}>
                {phase.programs.map((prog, prIdx) => (
                  <div
                    key={prIdx}
                    style={{
                      padding: '22px',
                      borderRadius: '20px',
                      background: 'var(--bg-convex)',
                      boxShadow: 'var(--nm-raised-sm)',
                      border: 'var(--border-rim)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: 'var(--bg-convex)',
                          boxShadow: 'var(--nm-raised-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          border: 'var(--border-rim)'
                        }}>
                          <img
                            src={prog.logo}
                            alt={prog.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>

                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: 'var(--bg-well)',
                          boxShadow: 'var(--nm-inset-sm)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: phase.badgeColor || 'var(--accent-primary)'
                        }}>
                          {prog.tag}
                        </span>
                      </div>

                      <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.12rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        marginBottom: '6px'
                      }}>
                        {prog.name}
                      </h4>

                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                        {prog.description}
                      </p>
                    </div>

                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: 'var(--bg-well)',
                      boxShadow: 'var(--nm-inset-sm)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Award size={14} color={phase.badgeColor || 'var(--accent-primary)'} />
                      {prog.metrics}
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestone Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderRadius: '16px',
                background: 'var(--bg-well)',
                boxShadow: 'var(--nm-inset-sm)'
              }}>
                <CheckCircle2 size={18} color={phase.badgeColor || 'var(--accent-primary)'} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {phase.studentMilestone}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
