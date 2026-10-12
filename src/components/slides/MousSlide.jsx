import React from 'react';

const MOU_PARTNERS = [
  {
    name: 'Automation Anywhere',
    logo: '/assets/Automation Anywhere.png',
    delay: '0.4s'
  },
  {
    name: 'Cisco Networking Academy',
    logo: '/assets/Cisco_Networking_Academy.svg.webp',
    delay: '1.1s'
  },
  {
    name: 'Mile2 Cyber Security',
    logo: '/assets/mile2_authorized_training_center_8x_enhanced.png',
    delay: '1.8s'
  },
  {
    name: 'Red Hat Academy',
    logo: '/assets/RHA_Logos_Logo-Red_Hat-Academy-A-Standard-RGB-1024x257.png',
    delay: '2.5s'
  },
  {
    name: 'Amazon Web Services',
    logo: '/assets/aws.svg',
    delay: '3.2s'
  },
  {
    name: 'Pega Systems',
    logo: '/assets/pega.png',
    delay: '3.9s'
  },
  {
    name: 'ServiceNow',
    logo: '/assets/sno_partner-network-logo.png',
    delay: '4.6s'
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
          gap: 'clamp(24px, 3.2vw, 48px)',
          maxWidth: '1440px',
          width: '100%'
        }}>
          {MOU_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="animate-reveal-slow"
              style={{
                width: 'clamp(240px, 20vw, 330px)',
                height: 'clamp(100px, 13vh, 135px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(14px, 2vh, 22px) clamp(20px, 2vw, 32px)',
                boxSizing: 'border-box',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--nm-raised)',
                border: 'var(--border-rim)',
                borderRadius: '24px',
                animationDelay: partner.delay,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '14px 14px 32px rgba(10, 88, 48, 0.11), -14px -14px 32px #ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'var(--nm-raised)';
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block'
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
