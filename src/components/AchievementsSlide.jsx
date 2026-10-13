import React from 'react';
import { HubHoppersGallery } from './HubHoppersGallery';

export function AchievementsSlide({ slide }) {
  return (
    <section style={{
      width: '100%',
      height: '100%',
      padding: 'clamp(24px, 3.5vh, 44px) clamp(28px, 4vw, 68px)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      background: 'var(--bg-primary)'
    }}>
      <header style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h1 style={{
          color: 'var(--text-main)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
          fontWeight: 900,
          letterSpacing: '-0.035em'
        }}>
          {slide.title}
        </h1>
      </header>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}>
        <HubHoppersGallery images={slide.images} label="Student achievements gallery" />
      </div>
    </section>
  );
}
