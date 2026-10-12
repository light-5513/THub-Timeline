import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TimelineScrubber({
  currentSlideIndex,
  totalSlides,
  slides,
  onPrev,
  onNext,
  onJumpToSlide
}) {
  const progressPercent = ((currentSlideIndex) / (totalSlides - 1)) * 100;

  return (
    <footer style={{
      width: '100%',
      padding: '16px 28px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      zIndex: 50
    }}>
      {/* Top Floating Control Dock */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '8px 16px',
        borderRadius: '24px',
        background: 'var(--bg-convex)',
        boxShadow: 'var(--nm-raised)',
        border: 'var(--border-rim)',
        maxWidth: '900px',
        width: '100%',
        justifyContent: 'space-between'
      }}>
        {/* Prev Button */}
        <button
          onClick={onPrev}
          disabled={currentSlideIndex === 0}
          title="Previous Slide (Arrow Left)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '16px',
            border: 'var(--border-rim)',
            background: currentSlideIndex === 0 ? 'var(--bg-well)' : 'var(--bg-convex)',
            boxShadow: currentSlideIndex === 0 ? 'var(--nm-inset-sm)' : 'var(--nm-raised-sm)',
            color: currentSlideIndex === 0 ? 'var(--text-light)' : 'var(--text-main)',
            fontSize: '0.86rem',
            fontWeight: 700,
            cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: currentSlideIndex === 0 ? 0.6 : 1
          }}
          onMouseDown={(e) => {
            if (currentSlideIndex > 0) e.currentTarget.style.boxShadow = 'var(--nm-inset-sm)';
          }}
          onMouseUp={(e) => {
            if (currentSlideIndex > 0) e.currentTarget.style.boxShadow = 'var(--nm-raised-sm)';
          }}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        {/* Slide Indicators Scrubber */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          padding: '4px'
        }}>
          {slides.map((s, idx) => {
            const isActive = currentSlideIndex === idx;

            return (
              <button
                key={s.id}
                onClick={() => onJumpToSlide(idx)}
                title={`${s.phaseLabel} — ${s.title}`}
                style={{
                  height: '32px',
                  padding: isActive ? '0 14px' : '0 10px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' : 'var(--bg-well)',
                  boxShadow: isActive ? '0 4px 14px rgba(10, 88, 48, 0.35)' : 'var(--nm-inset-sm)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>0{idx + 1}</span>
                {isActive && (
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {s.phaseNumber || s.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentSlideIndex === totalSlides - 1}
          title="Next Slide (Arrow Right or Space)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            borderRadius: '16px',
            border: 'none',
            background: currentSlideIndex === totalSlides - 1 ? 'var(--bg-well)' : 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
            boxShadow: currentSlideIndex === totalSlides - 1 ? 'var(--nm-inset-sm)' : '0 6px 18px rgba(10, 88, 48, 0.35)',
            color: '#ffffff',
            fontSize: '0.86rem',
            fontWeight: 700,
            cursor: currentSlideIndex === totalSlides - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: currentSlideIndex === totalSlides - 1 ? 0.6 : 1
          }}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slim Connected Timeline Bar with Keyboard Hints */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '900px',
        padding: '0 8px'
      }}>
        <div style={{
          flex: 1,
          height: '6px',
          borderRadius: '999px',
          background: 'var(--bg-well)',
          boxShadow: 'var(--nm-inset-sm)',
          position: 'relative',
          overflow: 'hidden',
          marginRight: '20px'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #064e3b, #0a5830, #047857)',
            borderRadius: '999px',
            transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 12px rgba(10, 88, 48, 0.45)'
          }} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.72rem',
          color: 'var(--text-light)',
          fontFamily: 'var(--font-mono)'
        }}>
          <span>[←] Previous</span>
          <span>•</span>
          <span>[→] / [Space] Next</span>
        </div>
      </div>
    </footer>
  );
}
