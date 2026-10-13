import React from 'react';

const MOU_PARTNERS = [
  {
    name: 'Red Hat Academy',
    logo: '/assets/RHA_Logos_Logo-Red_Hat-Academy-A-Standard-RGB-1024x257.png',
    delay: '0.12s'
  },
  {
    name: 'Cisco Networking Academy',
    logo: '/assets/Cisco_Networking_Academy.svg.webp',
    delay: '0.25s'
  },
  {
    name: 'Mile2 Cyber Security',
    logo: '/assets/mile2_authorized_training_center_8x_enhanced.png',
    delay: '0.38s'
  },
  {
    name: 'AWS Academy',
    logo: '/assets/AWS ACADEMY.png',
    delay: '0.51s'
  },
  {
    name: 'Automation Anywhere',
    logo: '/assets/Automation Anywhere.png',
    delay: '0.64s'
  },
  {
    name: 'Splunk',
    logo: '/assets/Splunk-Logo.png',
    delay: '0.77s'
  },
  {
    name: 'MongoDB University',
    logo: '/assets/mongodb university.png',
    delay: '0.9s'
  },
  {
    name: 'Oracle Academy',
    logo: '/assets/Oracle_Academy_rgb.png',
    delay: '1.03s'
  }
];

export function MousSlide() {
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
        width: '340px',
        height: '340px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10, 88, 48, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Giant Translucent Watermark "3" */}
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
        3
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
          Academic MoUs
        </h1>
      </div>

      {/* Middle Stage: Logos Slowly Visible One After Another, SIDE BY SIDE */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        width: '100%',
        margin: '0',
        padding: 'clamp(10px, 2vh, 24px) 0'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(18px, 2.3vw, 40px)',
          maxWidth: '1440px',
          width: '100%'
        }}>
          {MOU_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="animate-reveal-slow"
              style={{
                width: 'clamp(240px, 22vw, 360px)',
                height: 'clamp(110px, 14vh, 150px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                boxSizing: 'border-box',
                animationDelay: partner.delay,
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const logo = e.currentTarget.querySelector('img');
                if (logo) logo.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(-3px) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                const logo = e.currentTarget.querySelector('img');
                if (logo) logo.style.transform = 'perspective(900px) rotateY(-6deg) rotateX(2deg)';
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 14px 16px rgba(2, 44, 34, 0.2))',
                  transform: 'perspective(900px) rotateY(-6deg) rotateX(2deg)',
                  transition: 'transform 0.35s ease, filter 0.35s ease'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MousSlide;
