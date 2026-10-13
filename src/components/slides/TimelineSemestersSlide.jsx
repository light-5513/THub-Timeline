import React from 'react';
import { Brain, Braces, ClipboardCheck, Code2, Keyboard, MessagesSquare, Terminal } from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../../utils/soundEffects';
import { SEMESTER_POPUP_DATA } from '../../data/semesterDetailsData';
import { YouTubeVideo } from '../YouTubeVideo';
import { HubHoppersGallery } from '../HubHoppersGallery';

const SEMESTERS = [
  {
    code: 'I-I',
    yearLabel: 'YEAR 1',
    color: '#064e3b',
    subtitle: 'PHASE 1',
    logos: [
      { src: '/assets/bamboo_coder_phase1.png', alt: 'Bamboo Coder Phase 1', height: 'clamp(85px, 13.5vh, 130px)' }
    ],
    delay: '0.1s'
  },
  {
    code: 'I-II',
    yearLabel: 'YEAR 1',
    color: '#0a5830',
    subtitle: 'PHASE 2',
    logos: [
      { src: '/assets/bamboo_coder_phase2.png', alt: 'Bamboo Coder Phase 2', height: 'clamp(85px, 13.5vh, 130px)' }
    ],
    delay: '0.2s'
  },
  {
    code: 'II-I',
    yearLabel: 'YEAR 2',
    color: '#047857',
    subtitle: 'SKILL UP CODER',
    logos: [
      { src: '/assets/SKILLUP CODER.png', alt: 'Skill Up Coder', height: 'clamp(70px, 10vh, 105px)' }
    ],
    delay: '0.3s'
  },
  {
    code: 'II-II',
    yearLabel: 'YEAR 2',
    color: '#065f46',
    subtitle: 'SKILL UP CODER',
    logos: [
      { src: '/assets/SKILLUP CODER.png', alt: 'Skill Up Coder', height: 'clamp(70px, 10vh, 105px)' },
      { src: '/assets/MOON CODER.png', alt: 'Moon Coders', height: 'clamp(54px, 7.5vh, 78px)' }
    ],
    delay: '0.4s'
  },
  {
    code: 'III-I',
    yearLabel: 'YEAR 3',
    color: '#0d6838',
    subtitle: 'AI READY / DRIVE READY',
    logos: [
      { src: '/assets/ai_ready_engineer.png', alt: 'AI Ready Engineer', height: 'clamp(58px, 8vh, 82px)' },
      { src: '/assets/drive-ready-logo.svg', alt: 'Drive Ready', height: 'clamp(68px, 10vh, 90px)', maxWidth: '100%' }
    ],
    delay: '0.5s'
  },
  {
    code: 'III-II',
    yearLabel: 'YEAR 3',
    color: '#15803d',
    subtitle: 'AI READY ENGINEER',
    logos: [
      { src: '/assets/ai_ready_engineer.png', alt: 'AI Ready Engineer', height: 'clamp(58px, 8vh, 82px)' },
      { src: '/assets/drive-ready-logo.svg', alt: 'Drive Ready', height: 'clamp(68px, 10vh, 90px)', maxWidth: '100%' },
      { src: '/assets/Owl Coder Gradient Mascot Logo.png', alt: 'Owl Coder', height: 'clamp(48px, 7vh, 72px)' }
    ],
    delay: '0.6s'
  },
  {
    code: 'IV-I',
    yearLabel: 'YEAR 4',
    color: '#166534',
    logos: [
      { src: '/assets/Project Space.png', alt: 'Project Space', height: 'clamp(58px, 8vh, 82px)' },
      { src: '/assets/Owl Coder Gradient Mascot Logo.png', alt: 'Owl Coder', height: 'clamp(58px, 8vh, 82px)' }
    ],
    delay: '0.7s'
  },
  {
    code: 'IV-II',
    yearLabel: 'YEAR 4',
    color: '#022c22',
    logos: [
      { src: '/assets/ai_ready_engineer.png', alt: 'AI Ready Engineer', height: 'clamp(50px, 7.5vh, 72px)' },
      { src: '/assets/Project Space.png', alt: 'Project Space', height: 'clamp(48px, 6.8vh, 68px)' }
    ],
    delay: '0.8s'
  }
];

const SELECTION_STAGE_ICONS = {
  aptitude: Brain,
  beginnerCoding: Code2,
  intermediateCoding: Braces,
  advancedCoding: Terminal,
  technicalInterview: ClipboardCheck,
  communicationInterview: MessagesSquare
};

export function TimelineSemestersSlide({
  currentStep = 1,
  setStep,
  activeModalSemester: externalActiveModalSemester,
  setActiveModalSemester: externalSetActiveModalSemester,
  modalSubSlide: externalModalSubSlide,
  setModalSubSlide: externalSetModalSubSlide,
  isSem1Expanded: externalIsSem1Expanded,
  setIsSem1Expanded: externalSetIsSem1Expanded,
  sem1SubSlide: externalSem1SubSlide,
  setSem1SubSlide: externalSetSem1SubSlide,
  onNext,
  onPrev,
  soundEnabled = true
}) {
  const [internalStep, setInternalStep] = React.useState(1);
  const [internalActiveModalSemester, setInternalActiveModalSemester] = React.useState(null);
  const [internalModalSubSlide, setInternalModalSubSlide] = React.useState(1);
  const [showAll, setShowAll] = React.useState(false);
  const [replayKey, setReplayKey] = React.useState(0);
  const [selectedTracks, setSelectedTracks] = React.useState({});

  const step = setStep ? currentStep : internalStep;

  // Resolve active modal semester (1..8 or null)
  let activeModalSemester = null;
  if (externalSetActiveModalSemester !== undefined) {
    activeModalSemester = externalActiveModalSemester;
  } else if (externalSetIsSem1Expanded !== undefined) {
    activeModalSemester = externalIsSem1Expanded ? 1 : null;
  } else {
    activeModalSemester = internalActiveModalSemester;
  }

  const setActiveModalSemester = (sem) => {
    if (externalSetActiveModalSemester) {
      externalSetActiveModalSemester(sem);
    } else if (externalSetIsSem1Expanded) {
      externalSetIsSem1Expanded(sem === 1);
      setInternalActiveModalSemester(sem);
    } else {
      setInternalActiveModalSemester(sem);
    }
  };

  // State to manage smooth expansion and collapse exit lifecycle
  const [displayModalSemester, setDisplayModalSemester] = React.useState(activeModalSemester);
  const [isExiting, setIsExiting] = React.useState(false);
  const exitTimerRef = React.useRef(null);
  const semesterCardRefs = React.useRef({});
  const [modalOrigin, setModalOrigin] = React.useState('50% 60%');

  const updateModalOrigin = React.useCallback((semNum) => {
    const targetSem = semNum || displayModalSemester || activeModalSemester;
    if (targetSem && semesterCardRefs.current[targetSem]) {
      const rect = semesterCardRefs.current[targetSem].getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setModalOrigin(`${Math.round(x)}px ${Math.round(y)}px`);
    } else if (targetSem) {
      const colPercent = 9 + (targetSem - 1) * 11;
      setModalOrigin(`${colPercent}% 60%`);
    }
  }, [displayModalSemester, activeModalSemester]);

  React.useEffect(() => {
    updateModalOrigin();
    const handleResize = () => updateModalOrigin();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayModalSemester, activeModalSemester, updateModalOrigin]);

  React.useEffect(() => {
    if (activeModalSemester !== null && activeModalSemester !== undefined && activeModalSemester >= 1 && activeModalSemester <= 8) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setIsExiting(false);
      setDisplayModalSemester(activeModalSemester);
    } else if (displayModalSemester !== null) {
      // Trigger slow collapse animation when external state closes modal
      setIsExiting(true);
      exitTimerRef.current = setTimeout(() => {
        exitTimerRef.current = null;
        setDisplayModalSemester(null);
        setIsExiting(false);
      }, 1200);
    }
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
    // This lifecycle intentionally runs only when the requested semester changes;
    // including displayModalSemester would cancel the exit timer on its first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModalSemester]);

  const handleCloseModal = React.useCallback(() => {
    if (isExiting || displayModalSemester === null) return;
    if (soundEnabled) playTactileClick(soundEnabled);
    setIsExiting(true);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      setDisplayModalSemester(null);
      setIsExiting(false);
      setActiveModalSemester(null);
    }, 1200);
  }, [isExiting, displayModalSemester, soundEnabled]);

  // Global Escape key to collapse popup
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && displayModalSemester !== null && !isExiting) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayModalSemester, isExiting, handleCloseModal]);

  const modalSubSlide = externalSetModalSubSlide !== undefined
    ? externalModalSubSlide
    : (externalSetSem1SubSlide !== undefined ? externalSem1SubSlide : internalModalSubSlide);

  const setModalSubSlide = (val) => {
    if (externalSetModalSubSlide) {
      externalSetModalSubSlide(val);
    } else if (externalSetSem1SubSlide) {
      externalSetSem1SubSlide(val);
      setInternalModalSubSlide(val);
    } else {
      setInternalModalSubSlide(val);
    }
  };

  const isModalOpen = activeModalSemester !== null && activeModalSemester !== undefined && activeModalSemester >= 1 && activeModalSemester <= 8;
  const isModalVisible = displayModalSemester !== null && displayModalSemester !== undefined && displayModalSemester >= 1 && displayModalSemester <= 8;
  const isSem1Expanded = activeModalSemester === 1;
  const setIsSem1Expanded = (val) => setActiveModalSemester(val ? 1 : null);
  const sem1SubSlide = modalSubSlide;
  const setSem1SubSlide = setModalSubSlide;

  const resolvedSemesterNum = displayModalSemester || activeModalSemester;
  const currentSemData = (resolvedSemesterNum && SEMESTER_POPUP_DATA[resolvedSemesterNum]) ? SEMESTER_POPUP_DATA[resolvedSemesterNum] : null;
  const currentSubSlideData = currentSemData?.subSlides?.find(s => s.num === modalSubSlide) || currentSemData?.subSlides?.[0];
  const totalModalSubSlides = currentSemData?.subSlides?.length || 3;
  const selectedTrack = currentSemData ? selectedTracks[currentSemData.semesterNumber] : null;

  const updateStep = (newStep) => {
    if (newStep === 8 && soundEnabled) {
      playSuccessChime(soundEnabled);
    } else if (soundEnabled) {
      playTactileClick(soundEnabled);
    }
    if (setStep) setStep(newStep);
    else setInternalStep(newStep);
  };

  const handleAdvance = (e) => {
    if (e.target.closest('button') || e.target.closest('.interactive-control')) return;
    if (showAll) return;
    if (onNext) {
      onNext();
    } else {
      if (step >= 1 && step <= 8 && !isModalOpen && !isModalVisible) {
        setActiveModalSemester(step);
        setModalSubSlide(1);
        if (soundEnabled) playTactileClick(soundEnabled);
      } else if (isModalVisible) {
        if (modalSubSlide < totalModalSubSlides) {
          setModalSubSlide(prev => (typeof prev === 'number' ? prev + 1 : 2));
          if (soundEnabled) playTactileClick(soundEnabled);
        } else {
          handleCloseModal();
          setModalSubSlide(1);
          updateStep(step + 1);
        }
      } else if (step < 8) {
        updateStep(step + 1);
      }
    }
  };

  return (
    <div
      onClick={handleAdvance}
      style={{
        width: '100vw',
        height: '100vh',
        height: '100dvh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(18px, 2.8vh, 32px) clamp(24px, 3.5vw, 56px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        backgroundImage: `
          linear-gradient(rgba(13, 104, 56, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(13, 104, 56, 0.055) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        userSelect: 'none',
        cursor: (step < 8 && !showAll) ? 'pointer' : 'default'
      }}
    >
      {/* Ambient Lighting Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '42%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)',
        filter: 'blur(55px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Giant Translucent Watermark "4" */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '4%',
        fontSize: 'clamp(280px, 50vh, 500px)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 900,
        color: 'rgba(13, 104, 56, 0.06)',
        lineHeight: 1,
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none'
      }}>
        4
      </div>

      {/* Background Slide Content Container (Blurred when Semester 1 Popup Slideshow is Active) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          filter: (isModalVisible && !isExiting) ? 'blur(10px)' : 'none',
          opacity: (isModalVisible && !isExiting) ? 0.65 : 1,
          transform: (isModalVisible && !isExiting) ? 'scale(0.985)' : 'scale(1)',
          transition: 'filter 1.20s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.20s ease, transform 1.20s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isModalVisible ? 'none' : 'auto'
        }}
      >
        {/* Top Header Row with Interactive Step Controls */}
        <div style={{
          zIndex: 10,
          display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1720px',
        margin: '0 auto',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.7rem, 2.5vw, 2.7rem)',
            fontWeight: 900,
            color: '#0a5830',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            8-Semester Evolution Roadmap
          </h1>
        </div>

        {/* Step Indicator & Presentation Controls */}
        <div className="interactive-control" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* 8 Semester Step Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-well)',
            boxShadow: 'var(--nm-inset-sm)',
            padding: '5px 8px',
            borderRadius: '16px',
            border: 'var(--border-rim)'
          }}>
            {SEMESTERS.map((sem, idx) => {
              const semNum = idx + 1;
              const isPast = showAll || semNum < step;
              const isCurrent = !showAll && semNum === step;
              return (
                <button
                  key={`pill-${sem.code}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll(false);
                    updateStep(semNum);
                  }}
                  title={`Jump to Semester ${sem.code}`}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.68rem, 0.76vw, 0.82rem)',
                    fontWeight: isCurrent ? 900 : 700,
                    padding: '5px 10px',
                    borderRadius: '10px',
                    lineHeight: 1.2,
                    background: isCurrent ? 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' : isPast ? 'rgba(10, 88, 48, 0.12)' : 'transparent',
                    color: isCurrent ? '#ffffff' : isPast ? '#064e3b' : '#407a5b',
                    boxShadow: isCurrent ? 'var(--nm-raised-sm)' : 'none',
                    transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {sem.code}
                </button>
              );
            })}
          </div>

          {/* Show All Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(prev => !prev);
            }}
            title="Toggle between Step-by-Step and Full View"
            style={{
              border: 'var(--border-rim)',
              background: showAll ? 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' : 'var(--bg-convex)',
              color: showAll ? '#ffffff' : '#064e3b',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '7px 16px',
              borderRadius: '14px',
              cursor: 'pointer',
              boxShadow: 'var(--nm-raised-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            {showAll ? 'Step View' : 'Show All'}
          </button>

          {/* Replay Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(false);
              setReplayKey(k => k + 1);
              updateStep(1);
            }}
            title="Restart from Semester 1"
            style={{
              border: 'var(--border-rim)',
              background: 'var(--bg-convex)',
              color: '#064e3b',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '7px 14px',
              borderRadius: '14px',
              cursor: 'pointer',
              boxShadow: 'var(--nm-raised-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            ↺ Replay
          </button>
        </div>
      </div>

      {/* Main Roadmap Board: Connected Semesters */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 10,
        width: '100%',
        maxWidth: '1720px',
        margin: '0 auto',
        padding: 'clamp(6px, 1.5vh, 16px) 0'
      }}>
        {/* Layer 1: Stepped Platform Tracks (J-path from 3-1, Myna from 2-1, Owl Coder from 1-1 with logos on the right) */}
        <div style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(6px, 0.9vh, 10px)',
          marginBottom: 'clamp(6px, 1vh, 10px)'
        }}>
          {/* Track 4: mPod Platform (Starts at Semester 3-1 / III-I through IV-II -> Logo on Right) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 1.2vw, 18px)',
              opacity: (showAll || step >= 5) ? 1 : 0,
              transform: (showAll || step >= 5) ? 'translateY(0)' : 'translateY(-10px)',
              pointerEvents: (showAll || step >= 5) ? 'auto' : 'none',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Timeline Spine across 8 Semesters with Step-Up at 3-1 */}
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 'clamp(8px, 1.1vw, 16px)',
              alignItems: 'center'
            }}>
              {/* Col 0 to 3: Empty spacer before 3-1 */}
              <div style={{ gridColumn: 'span 4' }} />

              {/* Emerald Pipeline Cable from Col 4 through Col 7 */}
              <div style={{
                gridColumn: 'span 4',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(8px, 1.1vw, 16px)',
                alignItems: 'center'
              }}>
                {/* Emerald Pipeline Cable extending to the right logo */}
                <div
                  key={`mpod-cable-${replayKey}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(100% / 8)',
                    right: 'calc(-1 * clamp(10px, 1.2vw, 18px))',
                    height: '3.5px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                >
                  {/* Drawing Line */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #10b981 0%, #059669 60%, #047857 100%)',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px rgba(5, 150, 105, 0.45)',
                    transformOrigin: 'left center',
                    animation: (showAll || step >= 5) ? 'drawLineFromLeft 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
                  }} />

                  {/* Glowing Emerald Tracer Spark riding the tip of the line */}
                  {(showAll || step >= 5) && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '2px solid #059669',
                      boxShadow: '0 0 16px 5px rgba(5, 150, 105, 0.95), 0 0 6px #fff',
                      zIndex: 4,
                      animation: 'tracerHead 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }} />
                  )}
                </div>

                {/* 4 Nodes (III-I to IV-II) */}
                {SEMESTERS.slice(4).map((sem, sIdx) => {
                  const actualIdx = sIdx + 4;
                  const isNodeConnected = showAll || actualIdx < step;
                  return (
                    <div
                      key={`mpod-node-${sem.code}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 2,
                        minHeight: '26px',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      {isNodeConnected ? (
                        <div style={{
                          width: 'clamp(18px, 1.4vw, 24px)',
                          height: 'clamp(18px, 1.4vw, 24px)',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '2.5px solid #059669',
                          boxShadow: '0 2px 10px rgba(5, 150, 105, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          animation: 'nodeIgnite 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          transition: 'all 0.35s ease'
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                        </div>
                      ) : (
                        <div style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: 'rgba(5, 150, 105, 0.3)',
                          transition: 'all 0.35s ease'
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* mPod Logo (Official Vector Logo, Right of Screen) */}
            <div style={{
              width: 'clamp(160px, 12.5vw, 220px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexShrink: 0,
              zIndex: 3,
              animation: (showAll || step >= 5) ? 'logoPopArrival 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both' : 'none'
            }}>
              <img
                src="/assets/mpod.png"
                alt="mPod Platform"
                style={{
                  height: 'clamp(52px, 6.2vh, 64px)',
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 16px rgba(5, 150, 105, 0.28))',
                  animation: (showAll || step >= 5) ? 'pulseWaitingLogo 3.2s ease-in-out 1.6s infinite' : 'none',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          </div>

          {/* Track 3: J-path Platform (Starts at Semester 3-1 / III-I through IV-II -> Logo on Right) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 1.2vw, 18px)',
              opacity: (showAll || step >= 5) ? 1 : 0,
              transform: (showAll || step >= 5) ? 'translateY(0)' : 'translateY(-10px)',
              pointerEvents: (showAll || step >= 5) ? 'auto' : 'none',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Timeline Spine across 8 Semesters with Step-Up at 3-1 */}
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 'clamp(8px, 1.1vw, 16px)',
              alignItems: 'center'
            }}>
              {/* Col 0 to 3: Empty spacer before 3-1 */}
              <div style={{ gridColumn: 'span 4' }} />

              {/* Purple Pipeline Cable from Col 4 through Col 7 */}
              <div style={{
                gridColumn: 'span 4',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(8px, 1.1vw, 16px)',
                alignItems: 'center'
              }}>
                {/* Purple Pipeline Cable extending to the right logo */}
                <div
                  key={`jpath-cable-${replayKey}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(100% / 8)',
                    right: 'calc(-1 * clamp(10px, 1.2vw, 18px))',
                    height: '3.5px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                >
                  {/* Drawing Line */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #064e3b 0%, #0a5830 50%, #047857 100%)',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px rgba(10, 88, 48, 0.45)',
                    transformOrigin: 'left center',
                    animation: (showAll || step >= 5) ? 'drawLineFromLeft 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
                  }} />

                  {/* Glowing Purple Tracer Spark riding the tip of the line */}
                  {(showAll || step >= 5) && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '2px solid #0a5830',
                      boxShadow: '0 0 16px 5px rgba(10, 88, 48, 0.95), 0 0 6px #fff',
                      zIndex: 4,
                      animation: 'tracerHead 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }} />
                  )}
                </div>

                {/* 4 Nodes (III-I to IV-II) */}
                {SEMESTERS.slice(4).map((sem, sIdx) => {
                  const actualIdx = sIdx + 4;
                  const isNodeConnected = showAll || actualIdx < step;
                  return (
                    <div
                      key={`jpath-node-${sem.code}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 2,
                        minHeight: '26px',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      {isNodeConnected ? (
                        <div style={{
                          width: 'clamp(18px, 1.4vw, 24px)',
                          height: 'clamp(18px, 1.4vw, 24px)',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '2.5px solid #0a5830',
                          boxShadow: '0 2px 10px rgba(10, 88, 48, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          animation: 'nodeIgnite 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          transition: 'all 0.35s ease'
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0a5830' }} />
                        </div>
                      ) : (
                        <div style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: 'rgba(10, 88, 48, 0.3)',
                          transition: 'all 0.35s ease'
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* J-path Logo (Official Transparent Logo, Right of Screen) */}
            <div style={{
              width: 'clamp(160px, 12.5vw, 220px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexShrink: 0,
              zIndex: 3,
              animation: (showAll || step >= 5) ? 'logoPopArrival 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both' : 'none'
            }}>
              <img
                src="/assets/jpath.png"
                alt="J-Path Platform"
                style={{
                  height: 'clamp(54px, 6.5vh, 70px)',
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 16px rgba(4, 120, 87, 0.22))',
                  animation: (showAll || step >= 5) ? 'pulseWaitingLogo 3.2s ease-in-out 1.5s infinite' : 'none',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          </div>

          {/* Track 2: Myna Platform (Starts at Semester 2-1 / II-I through IV-II -> Logo on Right) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 1.2vw, 18px)',
              opacity: (showAll || step >= 3) ? 1 : 0,
              transform: (showAll || step >= 3) ? 'translateY(0)' : 'translateY(-10px)',
              pointerEvents: (showAll || step >= 3) ? 'auto' : 'none',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Timeline Spine across 8 Semesters with Step-Up at 2-1 */}
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 'clamp(8px, 1.1vw, 16px)',
              alignItems: 'center'
            }}>
              {/* Col 0 & Col 1: Empty spacer before 2-1 */}
              <div style={{ gridColumn: 'span 2' }} />

              {/* Cyan Pipeline Cable from Col 2 through Col 7 */}
              <div style={{
                gridColumn: 'span 6',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 'clamp(8px, 1.1vw, 16px)',
                alignItems: 'center'
              }}>
                {/* Cyan Pipeline Cable extending to the right logo */}
                <div
                  key={`myna-cable-${replayKey}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(100% / 12)',
                    right: 'calc(-1 * clamp(10px, 1.2vw, 18px))',
                    height: '3.5px',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                >
                  {/* Drawing Line */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #047857 0%, #059669 100%)',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px rgba(4, 120, 87, 0.45)',
                    transformOrigin: 'left center',
                    animation: (showAll || step >= 3) ? 'drawLineFromLeft 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
                  }} />

                  {/* Glowing Cyan Tracer Spark riding the tip of the line */}
                  {(showAll || step >= 3) && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '2px solid #047857',
                      boxShadow: '0 0 16px 5px rgba(4, 120, 87, 0.95), 0 0 6px #fff',
                      zIndex: 4,
                      animation: 'tracerHead 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }} />
                  )}
                </div>

                {/* 6 Nodes (II-I to IV-II) */}
                {SEMESTERS.slice(2).map((sem, sIdx) => {
                  const actualIdx = sIdx + 2;
                  const isNodeConnected = showAll || actualIdx < step;
                  return (
                    <div
                      key={`myna-node-${sem.code}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 2,
                        minHeight: '26px',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      {isNodeConnected ? (
                        <div style={{
                          width: 'clamp(18px, 1.4vw, 24px)',
                          height: 'clamp(18px, 1.4vw, 24px)',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '2.5px solid #047857',
                          boxShadow: '0 2px 10px rgba(4, 120, 87, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          animation: 'nodeIgnite 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          transition: 'all 0.35s ease'
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#047857' }} />
                        </div>
                      ) : (
                        <div style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: 'rgba(4, 120, 87, 0.3)',
                          transition: 'all 0.35s ease'
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Myna Logo (Clean, Transparent, Right of Screen) */}
            <div style={{
              width: 'clamp(160px, 12.5vw, 220px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexShrink: 0,
              zIndex: 3,
              animation: (showAll || step >= 3) ? 'logoPopArrival 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.05s both' : 'none'
            }}>
              <img
                src="/assets/Myna.png"
                alt="Myna Platform"
                style={{
                  height: 'clamp(54px, 6.5vh, 70px)',
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 14px rgba(4, 120, 87, 0.28))',
                  animation: (showAll || step >= 3) ? 'pulseWaitingLogo 3.2s ease-in-out 1.6s infinite' : 'none',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          </div>

          {/* Track 1: Owl Coder Platform (Continuous across all 8 Semesters -> Logo on Right) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 1.2vw, 18px)'
            }}
          >
            {/* Connected Orange Timeline Spine across all 8 Semesters */}
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 'clamp(8px, 1.1vw, 16px)',
              alignItems: 'center'
            }}>
              {/* Glowing Orange/Amber Connecting Pipeline extending all the way to right logo */}
              <div
                key={`owl-cable-${replayKey}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 'calc(100% / 16)',
                  right: 'calc(-1 * clamp(10px, 1.2vw, 18px))',
                  height: '4px',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              >
                {/* Drawing Cable */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, #0a5830 0%, #047857 25%, #059669 50%, #047857 75%, #064e3b 100%)',
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px rgba(10, 88, 48, 0.45)',
                  transformOrigin: 'left center',
                  animation: 'drawLineFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }} />

                {/* Glowing Orange Tracer Spark riding the tip of the line */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '2px solid #0a5830',
                  boxShadow: '0 0 16px 5px rgba(10, 88, 48, 0.95), 0 0 6px #fff',
                  zIndex: 4,
                  animation: 'tracerHead 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }} />
              </div>

              {/* 8 Connected Semester Nodes */}
              {SEMESTERS.map((sem, idx) => {
                const isNodeConnected = showAll || idx < step;
                return (
                  <div
                    key={`owl-node-${sem.code}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 2,
                      minHeight: '44px',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {isNodeConnected ? (
                      <>
                        <div style={{
                          width: 'clamp(22px, 1.6vw, 28px)',
                          height: 'clamp(22px, 1.6vw, 28px)',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '2.5px solid #0a5830',
                          color: '#0a5830',
                          boxShadow: '0 3px 12px rgba(10, 88, 48, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 900,
                          fontSize: 'clamp(0.62rem, 0.72vw, 0.78rem)',
                          animation: 'nodeIgnite 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          transition: 'all 0.35s ease'
                        }}>
                          {idx + 1}
                        </div>
                        <span style={{
                          fontSize: 'clamp(0.55rem, 0.6vw, 0.66rem)',
                          fontWeight: 800,
                          color: '#064e3b',
                          letterSpacing: '0.02em',
                          marginTop: '2px',
                          transition: 'all 0.35s ease'
                        }}>
                          {sem.code}
                        </span>
                      </>
                    ) : (
                      <>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'rgba(10, 88, 48, 0.35)',
                          boxShadow: '0 0 6px rgba(10, 88, 48, 0.2)',
                          transition: 'all 0.35s ease'
                        }} />
                        <span style={{
                          fontSize: 'clamp(0.55rem, 0.6vw, 0.66rem)',
                          color: 'transparent',
                          marginTop: '2px'
                        }}>
                          -
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Owl Coder Logo (Clean, Transparent, Right of Screen) */}
            <div style={{
              width: 'clamp(160px, 12.5vw, 220px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexShrink: 0,
              zIndex: 3,
              animation: 'logoPopArrival 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.15s both'
            }}>
              <img
                src="/assets/Owl Coder Gradient Mascot Logo.png"
                alt="Owl Coder Platform"
                style={{
                  height: 'clamp(58px, 7vh, 78px)',
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 16px rgba(10, 88, 48, 0.28))',
                  animation: 'pulseWaitingLogo 3.2s ease-in-out 1.7s infinite',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          </div>
        </div>

        {/* Layer 2: The 8 Semester Columns with Pure Logos */}
        <div style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          gap: 'clamp(10px, 1.2vw, 18px)'
        }}>
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 'clamp(8px, 1.1vw, 16px)',
            position: 'relative'
          }}>
          {SEMESTERS.map((sem, idx) => {
            const isRevealed = showAll || idx < step;
            const isCurrent = !showAll && (idx === step - 1);
            const isCardActive = (isModalOpen || isModalVisible) && (activeModalSemester === (idx + 1) || displayModalSemester === (idx + 1));
            const isSem1Active = idx === 0 && isCardActive;
            return (
              <div
                key={sem.code}
                ref={(el) => {
                  if (el) semesterCardRefs.current[idx + 1] = el;
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(6px, 1vh, 10px)',
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
                  pointerEvents: isRevealed ? 'auto' : 'none',
                  transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (idx < 8) {
                    setShowAll(false);
                    if ((isModalOpen || isModalVisible) && (activeModalSemester === idx + 1 || displayModalSemester === idx + 1)) {
                      handleCloseModal();
                    } else {
                      updateModalOrigin(idx + 1);
                      setActiveModalSemester(idx + 1);
                      setModalSubSlide(1);
                      if (setStep) setStep(idx + 1);
                      else setInternalStep(idx + 1);
                      if (soundEnabled) playTactileClick(soundEnabled);
                    }
                    return;
                  }
                  setShowAll(false);
                  updateStep(idx + 1);
                }}
              >
                {/* Vertical Drawn Connector from Platform Pipeline to Semester Card */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 'clamp(12px, 1.8vh, 18px)',
                  width: '100%',
                  position: 'relative',
                  pointerEvents: 'none',
                  marginBottom: '-2px'
                }}>
                  {/* Drawn Vertical Conduit Line */}
                  <div style={{
                    width: '3px',
                    height: '100%',
                    background: isRevealed
                      ? `linear-gradient(180deg, #0a5830 0%, ${sem.color} 100%)`
                      : 'rgba(203, 213, 225, 0.3)',
                    borderRadius: '2px',
                    boxShadow: isRevealed ? `0 0 10px ${sem.color}80` : 'none',
                    transformOrigin: 'top center',
                    transform: isRevealed ? 'scaleY(1)' : 'scaleY(0)',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
                    position: 'relative'
                  }}>
                    {/* Downward Drawing Tracer Spark */}
                    {isRevealed && (
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        boxShadow: `0 0 10px 3px ${sem.color}`,
                        transform: 'translateX(-50%)',
                        animation: 'dropSparkDown 0.45s ease-out forwards'
                      }} />
                    )}
                  </div>

                  {/* Terminal Beacon Dot at the top of the Semester Pill */}
                  <div style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: isRevealed ? sem.color : 'transparent',
                    border: isRevealed ? '1.5px solid #ffffff' : 'none',
                    boxShadow: isRevealed ? `0 0 8px ${sem.color}` : 'none',
                    marginTop: '-3px',
                    zIndex: 12,
                    transition: 'all 0.3s ease'
                  }} />
                </div>

                {/* Flow Connector Arrow between adjacent semester cards */}
                {idx < SEMESTERS.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: 'calc(-1 * clamp(8px, 1.1vw, 16px) / 2 - 13px)',
                    top: 'clamp(32px, 4.6vh, 46px)',
                    zIndex: 25,
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                    border: '1.5px solid rgba(13, 104, 56, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0d6838',
                    fontSize: '14px',
                    fontWeight: 900,
                    pointerEvents: 'none',
                    opacity: (showAll || idx + 1 < step) ? 1 : 0,
                    transform: (showAll || idx + 1 < step) ? 'scale(1)' : 'scale(0.5)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease'
                  }}>
                    ›
                  </div>
                )}

                {/* Semester Header Pill */}
                <div style={{
                  background: isCardActive
                    ? `linear-gradient(135deg, ${sem.color} 0%, #047857 100%)`
                    : sem.color,
                  color: '#ffffff',
                  padding: 'clamp(8px, 1.3vh, 14px) clamp(4px, 0.5vw, 8px)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: isCardActive
                    ? `0 14px 34px ${sem.color}99, 0 0 0 3px #10b981`
                    : isCurrent
                      ? `0 10px 28px ${sem.color}60`
                      : `0 8px 22px ${sem.color}35`,
                  border: isCardActive
                    ? '2px solid #10b981'
                    : isCurrent
                      ? '2px solid #ffffff'
                      : '1px solid rgba(255, 255, 255, 0.25)',
                  transform: isCardActive ? 'scale(1.06) translateY(-4px)' : isCurrent ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: 'clamp(0.64rem, 0.72vw, 0.78rem)',
                    fontWeight: 700,
                    opacity: 0.85,
                    letterSpacing: '0.08em'
                  }}>
                    {sem.yearLabel}
                  </div>
                  <div style={{
                    fontSize: 'clamp(1.1rem, 1.35vw, 1.45rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginTop: '1px'
                  }}>
                    {sem.code}
                  </div>
                  <div style={{
                    fontSize: (sem.subtitle && sem.subtitle.length > 10) ? 'clamp(0.48rem, 0.56vw, 0.64rem)' : 'clamp(0.58rem, 0.65vw, 0.72rem)',
                    fontWeight: 800,
                    opacity: 0.95,
                    letterSpacing: (sem.subtitle && sem.subtitle.length > 10) ? '0.06em' : '0.12em',
                    marginTop: '2px',
                    lineHeight: 1.15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    {isCardActive && (
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#34d399',
                        boxShadow: '0 0 6px #34d399'
                      }} />
                    )}
                    {sem.subtitle || 'SEMESTER'}
                    {idx < 8 && (
                      <span style={{
                        fontSize: '0.52rem',
                        background: isCardActive ? '#34d399' : 'rgba(255, 255, 255, 0.25)',
                        color: isCardActive ? '#064e3b' : '#ffffff',
                        padding: '1px 5px',
                        borderRadius: '6px',
                        fontWeight: 900,
                        marginLeft: '2px'
                      }}>
                        {isCardActive ? 'OPEN' : '▾'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Semester Card Body (Pure Logos, No Text) */}
                <div style={{
                  flex: 1,
                  minHeight: 'clamp(200px, 32vh, 320px)',
                  borderRadius: '24px',
                  background: 'var(--bg-convex)',
                  border: isCardActive ? '2px solid rgba(16, 185, 129, 0.6)' : 'var(--border-rim)',
                  boxShadow: isCardActive
                    ? '0 16px 36px rgba(10, 88, 48, 0.22), 0 0 0 3px rgba(16, 185, 129, 0.35)'
                    : isCurrent
                      ? 'var(--nm-raised-lg)'
                      : 'var(--nm-raised)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: sem.logos.length >= 3 ? 'clamp(4px, 0.8vh, 10px)' : 'clamp(8px, 1.4vh, 18px)',
                  padding: sem.logos.length >= 3 ? 'clamp(6px, 0.8vw, 10px) clamp(4px, 0.6vw, 8px)' : 'clamp(8px, 1.2vw, 16px) clamp(6px, 0.9vw, 12px)',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isCardActive ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border 0.5s ease'
                }}>
                  {/* Top Subtle Color Accent Line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: sem.color,
                    opacity: 0.85
                  }} />

                  {/* Pure Logos for the Semester */}
                  {sem.logos.map((logoItem) => (
                    <div
                      key={logoItem.alt}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={logoItem.src}
                        alt={logoItem.alt}
                        style={{
                          maxHeight: logoItem.height,
                          maxWidth: logoItem.maxWidth || '92%',
                          objectFit: 'contain',
                          display: 'block',
                          filter: 'drop-shadow(0 6px 14px rgba(10, 88, 48, 0.08))',
                          transition: 'transform 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                  ))}

                  {/* Expand Hint for Semesters 1 to 8 */}
                  {idx < 8 && !isCardActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      background: 'var(--bg-well)',
                      boxShadow: 'var(--nm-inset-sm)',
                      border: 'var(--border-rim)',
                      color: '#064e3b',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      pointerEvents: 'none'
                    }}>
                      <span>Events</span>
                      <span>▾</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>

          {/* Right Spacer matching the platform logos column width */}
          <div style={{
            width: 'clamp(160px, 12.5vw, 220px)',
            flexShrink: 0
          }} />
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div style={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1720px',
        margin: '0 auto',
        paddingTop: '4px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          fontWeight: 600
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
          <span>Automated Capability Architecture • Continuous Student Evolution</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.88rem',
          fontWeight: 800,
          color: '#0a5830',
          letterSpacing: '0.04em'
        }}>
          www.technicalhub.io
        </div>
      </div>
      </div>

      {/* 95% Screen Popup Modal with Blurred Background Backdrop */}
      {isModalVisible && currentSemData && (
        <div
          onClick={(e) => {
            // Clicking the backdrop outside the 95% modal collapses the popup
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            height: '100dvh',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(6, 78, 59, 0.22)',
            backdropFilter: isExiting ? 'blur(0px)' : 'blur(16px)',
            WebkitBackdropFilter: isExiting ? 'blur(0px)' : 'blur(16px)',
            boxSizing: 'border-box',
            padding: '2.5vh 2.5vw',
            userSelect: 'none',
            animation: isExiting
              ? 'backdropFadeOut 1.20s cubic-bezier(0.25, 1, 0.5, 1) forwards'
              : 'backdropFadeIn 1.20s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            pointerEvents: isExiting ? 'none' : 'auto'
          }}
        >
          {/* 95% Occupancy Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '95vw',
              maxWidth: '1780px',
              height: '95vh',
              height: '95dvh',
              maxHeight: '95vh',
              borderRadius: '28px',
              border: 'var(--border-rim)',
              boxShadow: isExiting
                ? '6px 6px 18px rgba(10, 88, 48, 0.08), -6px -6px 16px #ffffff'
                : '18px 18px 44px rgba(10, 88, 48, 0.14), -14px -14px 38px #ffffff, inset 1px 1px 2px rgba(255, 255, 255, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(14px, 1.8vh, 22px) clamp(20px, 2.4vw, 40px)',
              boxSizing: 'border-box',
              overflowY: 'auto',
              position: 'relative',
              background: 'var(--bg-primary)',
              backgroundImage: `
                linear-gradient(rgba(13, 104, 56, 0.055) 1px, transparent 1px),
                linear-gradient(90deg, rgba(13, 104, 56, 0.055) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: isExiting
                ? 'popupCollapseExit 1.20s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                : 'popupExpandEnter 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              transformOrigin: modalOrigin,
              willChange: 'transform, opacity'
            }}
          >
            {/* Ambient Lighting Glow Matching Slide */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '42%',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(10, 88, 48, 0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {/* Giant Translucent Watermark Semester Number */}
            <div style={{
              position: 'absolute',
              right: '4%',
              top: '4%',
              fontSize: 'clamp(280px, 50vh, 500px)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              color: 'rgba(10, 88, 48, 0.05)',
              lineHeight: 1,
              pointerEvents: 'none',
              zIndex: 0,
              userSelect: 'none'
            }}>
              {currentSemData.semesterNumber}
            </div>

            {/* Centered Content Wrapper */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1720px',
              height: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(10px, 1.6vh, 20px)',
              animation: isExiting
                ? 'modalContentShrinkConceal 1.10s ease-in forwards'
                : 'modalContentExpandReveal 1.15s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}>
              {/* Sub-Slide Pill Switcher Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(16px, 2vw, 32px)',
                  flexWrap: 'wrap'
                }}>
                  {(currentSubSlideData?.logoOptions || currentSemData.logoOptions).map(logo => (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      style={{
                        height: logo.height || ((currentSubSlideData?.logoOptions || currentSemData.logoOptions).length > 1
                          ? 'clamp(58px, 8vh, 88px)'
                          : 'clamp(64px, 9vh, 104px)'),
                        maxWidth: logo.maxWidth || ((currentSubSlideData?.logoOptions || currentSemData.logoOptions).length > 1
                          ? 'min(34vw, 420px)'
                          : 'min(45vw, 420px)'),
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  ))}
                </div>

                {/* 3 Clickable Sub-Slide Tab Pills */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-well)',
                  boxShadow: 'var(--nm-inset-sm)',
                  padding: '5px',
                  borderRadius: '16px',
                  border: 'var(--border-rim)'
                }}>
                  {currentSemData.subSlides.map((sub) => {
                    const isTabActive = modalSubSlide === sub.num;
                    return (
                      <button
                        key={`tab-subslide-${sub.num}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalSubSlide(sub.num);
                          if (soundEnabled) playTactileClick(soundEnabled);
                        }}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.74rem',
                          fontWeight: isTabActive ? 900 : 700,
                          background: isTabActive ? 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' : 'transparent',
                          color: isTabActive ? '#ffffff' : '#1e5a3a',
                          boxShadow: isTabActive ? 'var(--nm-raised-sm)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ opacity: 0.85 }}>0{sub.num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* No separate identity or curriculum card; semester logo is in the title row. */}

              {/* Empty content area reserved for the upcoming semester material */}
              {currentSemData && (
                <div
                  key={`subslide-content-${currentSemData.semesterNumber}-${modalSubSlide}`}
                  style={{
                    flex: 1,
                    minHeight: currentSubSlideData?.galleryImages
                      ? 'clamp(400px, 70vh, 760px)'
                      : (currentSubSlideData?.stages?.length || 0) > 4
                        ? 'clamp(520px, 64vh, 720px)'
                        : currentSubSlideData?.videoId
                          ? currentSubSlideData?.featureLogoSrc
                            ? 'clamp(560px, 78vh, 820px)'
                            : 'clamp(440px, 62vh, 700px)'
                          : currentSubSlideData?.featureLogoSrc
                            ? 'clamp(420px, 56vh, 620px)'
                      : 'clamp(220px, 38vh, 480px)',
                    background: currentSubSlideData?.galleryImages ? 'transparent' : 'var(--bg-convex)',
                    border: currentSubSlideData?.galleryImages ? 'none' : 'var(--border-rim)',
                    borderRadius: currentSubSlideData?.galleryImages ? 0 : '24px',
                    boxShadow: currentSubSlideData?.galleryImages ? 'none' : 'var(--nm-raised)',
                    position: 'relative',
                    overflow: currentSubSlideData?.galleryImages ? 'visible' : 'hidden',
                    animation: 'subSlideEnter 0.36s cubic-bezier(0.16, 1, 0.3, 1) both'
                  }}
                >
                  {!currentSubSlideData?.galleryImages && <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #064e3b 0%, #047857 50%, #059669 100%)'
                  }} />}
                  {currentSubSlideData?.stages && (
                    <div style={{
                      height: '100%',
                      padding: 'clamp(22px, 3vh, 40px) clamp(22px, 3vw, 48px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 'clamp(18px, 2.4vh, 28px)',
                      boxSizing: 'border-box'
                    }}>
                      <div>
                        <div style={{
                          color: 'var(--accent-primary)',
                          fontSize: '0.74rem',
                          fontWeight: 900,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '8px'
                        }}>
                          Semester {currentSemData.semesterNumber} • Candidate Intake
                        </div>
                        <h2 style={{
                          color: 'var(--text-main)',
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                          fontWeight: 900,
                          lineHeight: 1.15
                        }}>
                          {currentSubSlideData.title}
                        </h2>
                        {currentSubSlideData.description && (
                          <p style={{
                            color: 'var(--text-muted)',
                            fontSize: 'clamp(0.9rem, 1vw, 1.05rem)',
                            lineHeight: 1.55,
                            marginTop: '8px'
                          }}>
                            {currentSubSlideData.description}
                          </p>
                        )}
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: currentSubSlideData.stages.length > 4
                          ? 'repeat(3, minmax(0, 1fr))'
                          : 'repeat(2, minmax(0, 1fr))',
                        gap: 'clamp(12px, 1.6vw, 22px)'
                      }}>
                        {currentSubSlideData.stages.map((stage, index) => {
                          const StageIcon = SELECTION_STAGE_ICONS[stage.icon];
                          return (
                            <div key={stage.title} style={{
                              minHeight: currentSubSlideData.stages.length > 4 ? 'clamp(112px, 14vh, 150px)' : '130px',
                              padding: 'clamp(18px, 2vw, 28px)',
                              borderRadius: '18px',
                              background: stage.final ? 'var(--bg-well)' : 'var(--bg-convex)',
                              border: stage.final ? '2px solid var(--accent-primary)' : 'var(--border-rim)',
                              boxShadow: stage.final ? 'var(--nm-inset-sm)' : 'var(--nm-raised-sm)'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                {StageIcon && (
                                  <div style={{
                                    width: '48px',
                                    height: '48px',
                                    flex: '0 0 48px',
                                    borderRadius: '14px',
                                    background: 'var(--bg-well)',
                                    boxShadow: 'var(--nm-inset-sm)',
                                    color: 'var(--accent-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <StageIcon size={24} strokeWidth={1.9} aria-hidden="true" />
                                  </div>
                                )}
                                <div style={{ minWidth: 0 }}>
                                  <div style={{
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.76rem',
                                    fontWeight: 700,
                                    marginBottom: '8px'
                                  }}>
                                    {stage.final ? 'FINAL STEP' : `ROUND 0${index + 1}`}
                                  </div>
                                  <h3 style={{
                                    color: 'var(--text-main)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.05rem',
                                    fontWeight: 800,
                                    marginBottom: stage.description ? '6px' : 0
                                  }}>
                                    {stage.title}
                                  </h3>
                                  {stage.description && (
                                    <p style={{
                                      color: 'var(--text-muted)',
                                      fontSize: '0.9rem',
                                      lineHeight: 1.5
                                    }}>
                                      {stage.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {currentSubSlideData.outcome && <div style={{
                        padding: '14px 18px',
                        borderRadius: '14px',
                        background: 'var(--bg-well)',
                        boxShadow: 'var(--nm-inset-sm)',
                        color: 'var(--text-main)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        lineHeight: 1.5
                      }}>
                        {currentSubSlideData.outcome}
                      </div>}
                    </div>
                  )}
                  {currentSubSlideData?.subjects && (
                    <div style={{
                      minHeight: '100%',
                      padding: 'clamp(22px, 3vh, 40px) clamp(22px, 3vw, 48px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 'clamp(18px, 2.4vh, 28px)',
                      boxSizing: 'border-box'
                    }}>
                      <h2 style={{
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        textAlign: 'center'
                      }}>
                        {currentSubSlideData.title}
                      </h2>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                        gap: 'clamp(16px, 2vw, 28px)',
                        maxWidth: '1280px',
                        width: '100%',
                        margin: '0 auto'
                      }}>
                        {currentSubSlideData.subjects.map(subject => (
                          <div key={subject.title} style={{
                            minHeight: 'clamp(220px, 28vh, 300px)',
                            padding: 'clamp(18px, 2.4vw, 30px)',
                            borderRadius: '22px',
                            background: 'var(--bg-convex)',
                            border: 'var(--border-rim)',
                            boxShadow: 'var(--nm-raised-sm)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '14px',
                            textAlign: 'center'
                          }}>
                            <img
                              src={subject.logoSrc}
                              alt={`${subject.title} logo`}
                              style={{
                                width: 'min(100%, 240px)',
                                height: 'clamp(120px, 17vh, 168px)',
                                objectFit: 'contain',
                                display: 'block'
                              }}
                            />
                            <h3 style={{
                              color: 'var(--text-main)',
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
                              fontWeight: 800
                            }}>
                              {subject.title}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentSubSlideData?.trackChoices && (
                    <div style={{
                      minHeight: '100%',
                      padding: 'clamp(22px, 3vh, 40px) clamp(22px, 3vw, 48px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 'clamp(18px, 2.4vh, 28px)',
                      boxSizing: 'border-box'
                    }}>
                      <h2 style={{
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        textAlign: 'center'
                      }}>
                        {currentSubSlideData.title}
                      </h2>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: 'clamp(16px, 2vw, 28px)',
                        maxWidth: '1040px',
                        width: '100%',
                        margin: '0 auto'
                      }}>
                        {currentSubSlideData.trackChoices.map(track => {
                          const isSelected = selectedTrack === track.id;
                          return (
                            <button
                              key={track.id}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => setSelectedTracks(previous => ({
                                ...previous,
                                [currentSemData.semesterNumber]: track.id
                              }))}
                              style={{
                                minHeight: 'clamp(240px, 30vh, 320px)',
                                padding: 'clamp(20px, 2.5vw, 32px)',
                                borderRadius: '22px',
                                background: 'var(--bg-convex)',
                                border: isSelected ? '2px solid var(--accent-primary)' : 'var(--border-rim)',
                                boxShadow: isSelected ? 'var(--nm-raised)' : 'var(--nm-raised-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                color: 'var(--text-main)',
                                fontFamily: 'var(--font-heading)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                              }}
                            >
                              <img
                                src={track.logoSrc}
                                alt=""
                                style={{
                                  width: 'min(100%, 440px)',
                                  height: 'clamp(100px, 15vh, 160px)',
                                  objectFit: 'contain',
                                  display: 'block'
                                }}
                              />
                              <span style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', fontWeight: 800 }}>
                                {track.title}
                              </span>
                              <span style={{
                                color: 'var(--accent-primary)',
                                fontSize: '0.78rem',
                                fontWeight: 800
                              }}>
                                {isSelected ? 'Selected' : 'Select track'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {currentSubSlideData?.contests && (
                    <div style={{
                      minHeight: '100%',
                      padding: 'clamp(22px, 3vh, 40px) clamp(22px, 3vw, 48px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 'clamp(18px, 2.4vh, 28px)',
                      boxSizing: 'border-box'
                    }}>
                      <h2 style={{
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        textAlign: 'center'
                      }}>
                        {currentSubSlideData.title}
                      </h2>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                        gap: 'clamp(16px, 2vw, 28px)',
                        maxWidth: '1040px',
                        width: '100%',
                        margin: '0 auto'
                      }}>
                        {currentSubSlideData.contests.map(contest => {
                          const ContestIcon = contest.icon === 'coding' ? Code2 : Keyboard;
                          return (
                            <div key={contest.title} style={{
                              minHeight: 'clamp(220px, 28vh, 300px)',
                              padding: 'clamp(22px, 2.8vw, 36px)',
                              borderRadius: '22px',
                              background: 'var(--bg-convex)',
                              border: 'var(--border-rim)',
                              boxShadow: 'var(--nm-raised-sm)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '20px',
                              textAlign: 'center'
                            }}>
                              <div style={{
                                width: '104px',
                                height: '104px',
                                borderRadius: '28px',
                                background: 'var(--bg-well)',
                                boxShadow: 'var(--nm-inset-sm)',
                                color: 'var(--accent-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <ContestIcon size={52} strokeWidth={1.8} aria-hidden="true" />
                              </div>
                              <h3 style={{
                                color: 'var(--text-main)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
                                fontWeight: 800
                              }}>
                                {contest.title}
                              </h3>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {(currentSubSlideData?.featureTitle || currentSubSlideData?.featureLogoSrc || currentSubSlideData?.videoId) && (
                    <div style={{
                      minHeight: currentSubSlideData.galleryImages || currentSubSlideData.featureLogoSrc ? 'auto' : '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'clamp(14px, 2vh, 22px)',
                      padding: currentSubSlideData.videoId && !currentSubSlideData.featureTitle
                        ? 0
                        : currentSubSlideData.galleryImages || currentSubSlideData.featureLogoSrc
                          ? 'clamp(14px, 2vh, 24px) clamp(24px, 4vw, 56px) 0'
                          : 'clamp(24px, 4vw, 56px)',
                      boxSizing: 'border-box'
                    }}>
                      {currentSubSlideData.featureTitle && !currentSubSlideData.hideFeatureTitle && (
                        currentSubSlideData.videoId && currentSubSlideData.featureLogoSrc ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                            <img
                              src={currentSubSlideData.featureLogoSrc}
                              alt={`${currentSubSlideData.featureTitle} icon`}
                              style={{ width: 'min(16vw, 140px)', height: 'clamp(42px, 8vh, 72px)', objectFit: 'contain' }}
                            />
                            <h2 style={{
                              margin: 0,
                              color: 'var(--text-main)',
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                              fontWeight: 900,
                              letterSpacing: '-0.025em',
                              textAlign: 'center'
                            }}>
                              {currentSubSlideData.featureTitle}
                            </h2>
                          </div>
                        ) : <h2 style={{
                          margin: 0,
                          color: 'var(--text-main)',
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                          fontWeight: 900,
                          letterSpacing: '-0.025em',
                          textAlign: 'center'
                        }}>
                          {currentSubSlideData.featureTitle}
                        </h2>
                      )}
                      {currentSubSlideData.featureLogoSrc && !currentSubSlideData.videoId && (
                        <img
                          src={currentSubSlideData.featureLogoSrc}
                          alt={`${currentSubSlideData.featureTitle} logo`}
                          style={{
                            width: 'min(72vw, 760px)',
                            maxHeight: '38vh',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      )}
                      {currentSubSlideData.featureLogoSrc && currentSubSlideData.hideFeatureTitle && (
                        <img
                          src={currentSubSlideData.featureLogoSrc}
                          alt={`${currentSubSlideData.featureTitle} logo`}
                          style={{
                            width: 'min(34vw, 420px)',
                            maxHeight: '12vh',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      )}
                      {currentSubSlideData.videoId && (
                        <div style={{
                          width: 'min(100%, 1560px, 110vh)',
                          aspectRatio: '16 / 9',
                          borderRadius: '18px',
                          overflow: 'hidden',
                          background: '#022c22',
                          boxShadow: 'var(--nm-raised-lg)',
                          border: 'var(--border-rim)'
                        }}>
                          <YouTubeVideo
                            videoId={currentSubSlideData.videoId}
                            title={currentSubSlideData.featureTitle
                              ? `${currentSubSlideData.featureTitle} video`
                              : `Semester ${currentSemData.semesterNumber} training video`}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {currentSubSlideData?.galleryImages && (
                    <div style={{
                      flex: 1,
                      minHeight: 'clamp(280px, 34vh, 390px)',
                      padding: 'clamp(16px, 2vh, 24px) 0',
                      display: 'flex',
                      alignItems: 'center',
                      boxSizing: 'border-box'
                    }}>
                      <HubHoppersGallery
                        images={currentSubSlideData.galleryImages}
                        label={`${currentSubSlideData.featureTitle} image gallery`}
                        showNumbers={currentSubSlideData.showImageNumbers}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 4. Bottom Modal Navigation Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'clamp(4px, 0.8vh, 8px)',
                borderTop: '1px solid rgba(10, 88, 48, 0.12)',
                animation: 'modalNavIn 0.36s cubic-bezier(0.16, 1, 0.3, 1) 0.16s both'
              }}>
                {/* Back Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (modalSubSlide > 1) {
                      setModalSubSlide(prev => prev - 1);
                      if (soundEnabled) playTactileClick(soundEnabled);
                    } else if (currentSemData.semesterNumber > 1) {
                      const previousSemester = currentSemData.semesterNumber - 1;
                      updateModalOrigin(previousSemester);
                      setActiveModalSemester(previousSemester);
                      setModalSubSlide(SEMESTER_POPUP_DATA[previousSemester]?.subSlides.length || 3);
                      if (setStep) setStep(previousSemester);
                      else setInternalStep(previousSemester);
                      if (soundEnabled) playTactileClick(soundEnabled);
                    } else {
                      handleCloseModal();
                    }
                  }}
                  style={{
                    border: 'var(--border-rim)',
                    background: 'var(--bg-convex)',
                    color: '#064e3b',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    padding: '8px 20px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    boxShadow: 'var(--nm-raised-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--nm-raised)';
                    e.currentTarget.style.color = '#0a5830';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--nm-raised-sm)';
                    e.currentTarget.style.color = '#064e3b';
                  }}
                >
                  <span>‹</span>
                  <span>
                    {modalSubSlide > 1
                      ? `Back: Sub-Slide 0${modalSubSlide - 1}`
                      : currentSemData.semesterNumber > 1
                        ? `Back: Semester ${currentSemData.semesterNumber - 1} (${SEMESTERS[currentSemData.semesterNumber - 2]?.code})`
                        : 'Return to Timeline'}
                  </span>
                </button>

                {/* Sub-Slide Navigation Status & Stepper */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#407a5b'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {currentSemData.subSlides.map(({ num }) => (
                      <button
                        key={`stepper-dot-${num}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalSubSlide(num);
                          if (soundEnabled) playTactileClick(soundEnabled);
                        }}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          background: modalSubSlide === num ? 'linear-gradient(135deg, #064e3b, #047857)' : 'var(--bg-well)',
                          boxShadow: modalSubSlide === num ? 'var(--nm-raised-sm)' : 'var(--nm-inset-sm)',
                          color: modalSubSlide === num ? '#ffffff' : '#064e3b',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        0{num}
                      </button>
                    ))}
                  </div>

                  <span style={{
                    background: 'var(--bg-well)',
                    boxShadow: 'var(--nm-inset-sm)',
                    color: '#064e3b',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    border: 'var(--border-rim)',
                    fontFamily: 'monospace',
                    marginLeft: '4px'
                  }}>
                    [→] or [Space]
                  </span>
                  <span>Press Right Arrow or click Next to advance</span>
                </div>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNext) {
                      onNext();
                    } else if (modalSubSlide < totalModalSubSlides) {
                      setModalSubSlide(prev => prev + 1);
                      if (soundEnabled) playTactileClick(soundEnabled);
                    } else {
                      handleCloseModal();
                      setModalSubSlide(1);
                    }
                  }}
                  style={{
                    border: 'none',
                    background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 900,
                    padding: '8px 20px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    boxShadow: '6px 6px 16px rgba(10, 88, 48, 0.25), -2px -2px 8px #ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '8px 8px 20px rgba(10, 88, 48, 0.32), -3px -3px 10px #ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '6px 6px 16px rgba(10, 88, 48, 0.25), -2px -2px 8px #ffffff';
                  }}
                >
                  <span>
                    {modalSubSlide < totalModalSubSlides
                      ? `Next: ${currentSemData.subSlides[modalSubSlide]?.tabShort || `Sub-Slide 0${modalSubSlide + 1}`} (${modalSubSlide + 1}/${totalModalSubSlides})`
                      : `Finish Semester ${currentSemData.semesterNumber}`}
                  </span>
                  <span style={{ fontSize: '1rem' }}>›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineSemestersSlide;
