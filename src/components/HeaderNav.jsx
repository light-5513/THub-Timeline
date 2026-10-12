import React from 'react';
import { Play, Pause, Volume2, VolumeX, Sun, Moon, Maximize, Minimize, FileText, LayoutGrid, MonitorPlay } from 'lucide-react';

export function HeaderNav({
  currentSlideIndex,
  totalSlides,
  currentSlide,
  isAutoPlay,
  onToggleAutoPlay,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  showNotes,
  onToggleNotes,
  viewMode,
  onToggleViewMode,
  autoPlayProgress
}) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header style={{
      width: '100%',
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      flexWrap: 'wrap',
      zIndex: 50,
      position: 'relative'
    }}>
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          borderRadius: '18px',
          background: 'var(--bg-convex)',
          boxShadow: 'var(--nm-raised-sm)',
          border: 'var(--border-rim)'
        }}>
          <img
            src="/assets/th_logo.png"
            alt="Technical Hub"
            style={{ height: '28px', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.98rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.1
            }}>
              TECHNICAL HUB
            </div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              letterSpacing: '0.06em'
            }}>
              TIMELINE PROPOSAL
            </div>
          </div>
        </div>

        {/* Current Slide Tracker */}
        {viewMode === 'slideshow' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '16px',
            background: 'var(--bg-well)',
            boxShadow: 'var(--nm-inset-sm)',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'var(--text-main)'
          }}>
            <span style={{ color: 'var(--accent-primary)' }}>0{currentSlideIndex + 1}</span>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span>0{totalSlides}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-light)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentSlide?.title}
            </span>
          </div>
        )}
      </div>

      {/* Control Tools Deck (Tactile Neumorphic Buttons) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Mode Switch: Slideshow vs Panorama */}
        <button
          onClick={onToggleViewMode}
          title={viewMode === 'slideshow' ? 'Switch to Full Roadmap Panorama' : 'Switch to Slideshow Presentation'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '14px',
            border: 'var(--border-rim)',
            background: 'var(--bg-convex)',
            boxShadow: 'var(--nm-raised-sm)',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'var(--nm-inset-sm)'; }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = 'var(--nm-raised-sm)'; }}
        >
          {viewMode === 'slideshow' ? <LayoutGrid size={15} color="var(--accent-primary)" /> : <MonitorPlay size={15} color="var(--accent-primary)" />}
          <span>{viewMode === 'slideshow' ? 'Panorama' : 'Slideshow'}</span>
        </button>

        {/* Auto Play Toggle with Progress Dial */}
        {viewMode === 'slideshow' && (
          <button
            onClick={onToggleAutoPlay}
            title={isAutoPlay ? 'Pause Auto-Play' : 'Start Auto-Play Slideshow'}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '14px',
              border: 'var(--border-rim)',
              background: isAutoPlay ? 'var(--bg-well)' : 'var(--bg-convex)',
              boxShadow: isAutoPlay ? 'var(--nm-inset-sm)' : 'var(--nm-raised-sm)',
              color: isAutoPlay ? 'var(--accent-primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              overflow: 'hidden'
            }}
          >
            {isAutoPlay && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: `${autoPlayProgress}%`,
                height: '3px',
                background: 'var(--accent-primary)',
                transition: 'width 0.1s linear'
              }} />
            )}
            {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound FX' : 'Enable Tactile Sound FX'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            border: 'var(--border-rim)',
            background: soundEnabled ? 'var(--bg-convex)' : 'var(--bg-well)',
            boxShadow: soundEnabled ? 'var(--nm-raised-sm)' : 'var(--nm-inset-sm)',
            color: soundEnabled ? 'var(--accent-primary)' : 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Presenter Notes Toggle */}
        <button
          onClick={onToggleNotes}
          title="Presenter Notes & Pitch Talking Points"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            border: 'var(--border-rim)',
            background: showNotes ? 'var(--bg-well)' : 'var(--bg-convex)',
            boxShadow: showNotes ? 'var(--nm-inset-sm)' : 'var(--nm-raised-sm)',
            color: showNotes ? 'var(--accent-primary)' : 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <FileText size={16} />
        </button>

        {/* Theme Toggle (Light / Dark Neumorphism) */}
        <button
          onClick={onToggleTheme}
          title="Toggle Neumorphic Light / Dark"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            border: 'var(--border-rim)',
            background: 'var(--bg-convex)',
            boxShadow: 'var(--nm-raised-sm)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'var(--nm-inset-sm)'; }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = 'var(--nm-raised-sm)'; }}
        >
          {theme === 'dark' ? <Sun size={17} color="var(--accent-primary)" /> : <Moon size={17} color="var(--accent-primary)" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            border: 'var(--border-rim)',
            background: 'var(--bg-convex)',
            boxShadow: 'var(--nm-raised-sm)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'var(--nm-inset-sm)'; }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = 'var(--nm-raised-sm)'; }}
        >
          <Maximize size={16} />
        </button>
      </div>
    </header>
  );
}
