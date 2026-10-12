import React from 'react';
import { FileText, X, Lightbulb, Clock } from 'lucide-react';

export function PresenterNotesModal({ isOpen, onClose, currentSlide, slideIndex, totalSlides }) {
  const [shouldRender, setShouldRender] = React.useState(isOpen);
  const [isExiting, setIsExiting] = React.useState(false);
  const exitTimerRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      setShouldRender(true);
      setIsExiting(false);
    } else if (shouldRender && !isExiting) {
      setIsExiting(true);
      exitTimerRef.current = setTimeout(() => {
        setShouldRender(false);
        setIsExiting(false);
      }, 280);
    }
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [isOpen, shouldRender, isExiting]);

  const handleClose = () => {
    if (isExiting) return;
    setIsExiting(true);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      setShouldRender(false);
      setIsExiting(false);
      onClose();
    }, 280);
  };

  if (!shouldRender) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '32px',
      width: '400px',
      maxWidth: 'calc(100vw - 48px)',
      borderRadius: '24px',
      padding: '24px',
      background: 'var(--bg-convex)',
      boxShadow: isExiting ? 'var(--nm-raised-sm)' : 'var(--nm-raised-lg)',
      border: 'var(--border-rim)',
      zIndex: 100,
      animation: isExiting
        ? 'presenterModalExit 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        : 'presenterModalEnter 0.38s cubic-bezier(0.34, 1.45, 0.64, 1) forwards',
      transformOrigin: 'bottom right',
      pointerEvents: isExiting ? 'none' : 'auto'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'var(--bg-well)',
            boxShadow: 'var(--nm-inset-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
            <FileText size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              PRESENTER NOTES
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Slide {slideIndex + 1} of {totalSlides}
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: 'var(--border-rim)',
            background: 'var(--bg-convex)',
            boxShadow: 'var(--nm-raised-sm)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Slide topic preview */}
      <div style={{
        padding: '10px 14px',
        borderRadius: '14px',
        background: 'var(--bg-well)',
        boxShadow: 'var(--nm-inset-sm)',
        marginBottom: '14px'
      }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
          Target Slide
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
          {currentSlide?.title}
        </div>
      </div>

      {/* Speaker talking notes */}
      <div style={{
        fontSize: '0.9rem',
        lineHeight: 1.6,
        color: 'var(--text-main)',
        background: 'var(--bg-well)',
        boxShadow: 'var(--nm-inset-sm)',
        padding: '14px',
        borderRadius: '14px',
        border: '1px dashed var(--border-subtle)',
        marginBottom: '16px'
      }}>
        {currentSlide?.presenterNotes || 'No specific notes for this slide.'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Lightbulb size={13} color="var(--accent-primary)" />
          <span>Keep pitch under 2 mins / slide</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={13} />
          <span>Auto-advances if play active</span>
        </div>
      </div>
    </div>
  );
}
