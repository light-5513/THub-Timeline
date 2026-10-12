import React, { useState } from 'react';
import { Award, BookOpen, Clock, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

export function PhaseSlide({ slide }) {
  const [activeTab, setActiveTab] = useState('programs'); // 'programs' | 'curriculum'

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Top Header Row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }} className="stagger-1">
        <div>
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
            color: slide.badgeColor || 'var(--accent-primary)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: slide.badgeColor || 'var(--accent-primary)' }} />
            {slide.phaseNumber} • {slide.timeframe}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.15
          }}>
            {slide.title}
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            marginTop: '6px'
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Tab Controls (Soft Neumorphic Inset Switch) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px',
          borderRadius: '16px',
          background: 'var(--bg-well)',
          boxShadow: 'var(--nm-inset-sm)'
        }}>
          <button
            onClick={() => setActiveTab('programs')}
            style={{
              padding: '8px 18px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'programs' ? 'var(--bg-convex)' : 'transparent',
              boxShadow: activeTab === 'programs' ? 'var(--nm-raised-sm)' : 'none',
              color: activeTab === 'programs' ? 'var(--text-main)' : 'var(--text-muted)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={15} />
            Flagship Programs & Partners
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            style={{
              padding: '8px 18px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'curriculum' ? 'var(--bg-convex)' : 'transparent',
              boxShadow: activeTab === 'curriculum' ? 'var(--nm-raised-sm)' : 'none',
              color: activeTab === 'curriculum' ? 'var(--text-main)' : 'var(--text-muted)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={15} />
            Curriculum & Hours
          </button>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      {activeTab === 'programs' ? (
        <div className="stagger-2">
          {/* Program Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            {slide.programs.map((prog, idx) => (
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
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '18px',
                      background: 'var(--bg-convex)',
                      boxShadow: 'var(--nm-raised-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
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
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: 'var(--bg-well)',
                      boxShadow: 'var(--nm-inset-sm)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: slide.badgeColor || 'var(--accent-primary)',
                      letterSpacing: '0.04em'
                    }}>
                      {prog.tag}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '8px'
                  }}>
                    {prog.name}
                  </h3>

                  <p style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    color: 'var(--text-muted)',
                    marginBottom: '16px'
                  }}>
                    {prog.description}
                  </p>
                </div>

                {/* Outcome indicator */}
                <div style={{
                  padding: '8px 14px',
                  borderRadius: '12px',
                  background: 'var(--bg-well)',
                  boxShadow: 'var(--nm-inset-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Award size={16} color={slide.badgeColor || 'var(--accent-primary)'} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {prog.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Badges Row (Specially on Year 4) */}
          {slide.aiBadges && (
            <div style={{
              borderRadius: '24px',
              padding: '20px 24px',
              background: 'var(--bg-convex)',
              boxShadow: 'var(--nm-raised)',
              border: 'var(--border-rim)',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                <Sparkles size={16} />
                Frontier GenAI Partner Credentials & Tooling Mastery
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {slide.aiBadges.map((badge, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      background: 'var(--bg-convex)',
                      boxShadow: 'var(--nm-raised-sm)',
                      border: 'var(--border-rim)'
                    }}
                  >
                    <img
                      src={badge.logo}
                      alt={badge.name}
                      style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {badge.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {badge.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="stagger-2" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {slide.curriculumTracks?.map((track, cIdx) => (
            <div
              key={cIdx}
              style={{
                borderRadius: '22px',
                padding: '24px',
                background: 'var(--bg-convex)',
                boxShadow: 'var(--nm-raised)',
                border: 'var(--border-rim)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: slide.badgeColor || 'var(--accent-primary)'
                  }}>
                    TRACK 0{cIdx + 1}
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: 'var(--bg-well)',
                    boxShadow: 'var(--nm-inset-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-main)'
                  }}>
                    <Clock size={13} color="var(--accent-primary)" />
                    {track.hours}
                  </div>
                </div>

                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.12rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '8px'
                }}>
                  {track.title}
                </h4>

                <p style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.5,
                  color: 'var(--text-muted)'
                }}>
                  {track.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Milestone Ribbon */}
      <div className="stagger-3" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 24px',
        borderRadius: '20px',
        background: 'var(--bg-convex)',
        boxShadow: 'var(--nm-raised-sm)',
        border: 'var(--border-rim)'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '12px',
          background: 'var(--bg-convex)',
          boxShadow: 'var(--nm-raised-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: slide.badgeColor || 'var(--accent-primary)',
          flexShrink: 0
        }}>
          <CheckCircle2 size={20} />
        </div>

        <div>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: slide.badgeColor || 'var(--accent-primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            STUDENT MATURITY MILESTONE
          </span>
          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', margin: '2px 0 0 0' }}>
            {slide.studentMilestone}
          </p>
        </div>
      </div>
    </div>
  );
}
