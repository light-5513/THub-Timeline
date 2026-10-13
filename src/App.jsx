import React, { useState, useEffect, useRef } from 'react';
import { timelineSlides } from './data/timelineData';
import { SEMESTER_POPUP_DATA } from './data/semesterDetailsData';
import { HeaderNav } from './components/HeaderNav';
import { TimelineScrubber } from './components/TimelineScrubber';
import { HeroSlide } from './components/slides/HeroSlide';
import { CoeSlide } from './components/slides/CoeSlide';
import { MousSlide } from './components/slides/MousSlide';
import { TimelineSemestersSlide } from './components/slides/TimelineSemestersSlide';
import { OverviewSlide } from './components/slides/OverviewSlide';
import { PhaseSlide } from './components/slides/PhaseSlide';
import { EcosystemSlide } from './components/slides/EcosystemSlide';
import { OutcomesSlide } from './components/slides/OutcomesSlide';
import { StakeholderFlowSlide } from './components/StakeholderFlowSlide';
import { AchievementsSlide } from './components/AchievementsSlide';
import { PresenterNotesModal } from './components/PresenterNotesModal';
import { PanoramaView } from './components/PanoramaView';
import { playTactileClick, playSlideWhoosh, playSuccessChime } from './utils/soundEffects';
import { getTimelineNextState } from './utils/timelineFlow';

class SlideErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Slide Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          color: '#064e3b',
          background: 'var(--bg-convex)',
          borderRadius: '24px',
          margin: '30px auto',
          maxWidth: '900px',
          border: 'var(--border-rim)',
          boxShadow: 'var(--nm-raised)'
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Slide Encountered an Error</h2>
          <pre style={{ background: 'var(--bg-well)', boxShadow: 'var(--nm-inset-sm)', padding: '16px', borderRadius: '14px', overflowX: 'auto', fontSize: '0.85rem', color: '#064e3b' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: 'var(--nm-raised-sm)'
            }}
          >
            Reload Slide
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('light');
  const [showNotes, setShowNotes] = useState(false);
  const [viewMode, setViewMode] = useState('slideshow'); // 'slideshow' | 'panorama'

  const [timelineStep, setTimelineStep] = useState(1);
  const [timelineActiveSemesterPopup, setTimelineActiveSemesterPopup] = useState(null); // null | 1..6
  const [timelineModalSubSlide, setTimelineModalSubSlide] = useState(1); // 1..3
  const [timelineCompletedSemester, setTimelineCompletedSemester] = useState(null);
  const [timelineCompletionReady, setTimelineCompletionReady] = useState(false);
  // Backwards compatibility helpers
  const timelineSem1Expanded = timelineActiveSemesterPopup === 1;
  const setTimelineSem1Expanded = (val) => setTimelineActiveSemesterPopup(val ? 1 : null);
  const timelineSem1SubSlide = timelineModalSubSlide;
  const setTimelineSem1SubSlide = setTimelineModalSubSlide;

  const touchStartX = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const autoPlayIntervalMs = 7000;

  // Sync theme attribute to documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!timelineCompletedSemester) return undefined;
    const timer = setTimeout(() => setTimelineCompletionReady(true), 1300);
    return () => clearTimeout(timer);
  }, [timelineCompletedSemester]);

  // Handle slide transitions with audio and direction
  const goToSlide = (newIndex, direction = 'next') => {
    if (newIndex < 0 || newIndex >= timelineSlides.length) return;
    setSlideDirection(direction);
    setCurrentSlideIndex(newIndex);
    setAutoPlayProgress(0);
    setTimelineStep(1);
    setTimelineActiveSemesterPopup(null);
    setTimelineModalSubSlide(1);
    setTimelineCompletedSemester(null);
    setTimelineCompletionReady(false);
    playSlideWhoosh(soundEnabled);
  };

  const handleNext = () => {
    const isTimelineSlide = timelineSlides[currentSlideIndex]?.type === 'semesters-timeline';
    if (isTimelineSlide) {
      if (timelineCompletedSemester && !timelineCompletionReady) return;
      if (timelineCompletedSemester === 8) {
        goToSlide(currentSlideIndex + 1, 'next');
        return;
      }
      if (timelineCompletedSemester || timelineActiveSemesterPopup || (timelineStep >= 1 && timelineStep <= 8)) {
        const totalSubSlides = SEMESTER_POPUP_DATA[timelineActiveSemesterPopup]?.subSlides.length || 3;
        const nextState = getTimelineNextState({
          step: timelineStep,
          activeSemester: timelineActiveSemesterPopup,
          subSlide: timelineModalSubSlide,
          completedSemester: timelineCompletedSemester,
          totalSubSlides
        });
        setTimelineStep(nextState.step);
        setTimelineActiveSemesterPopup(nextState.activeSemester);
        setTimelineModalSubSlide(nextState.subSlide);
        setTimelineCompletedSemester(nextState.completedSemester);
        if (nextState.completedSemester) setTimelineCompletionReady(false);
        playTactileClick(soundEnabled);
        return;
      }
      if (timelineStep < 8) {
        setTimelineStep(prev => prev + 1);
        playTactileClick(soundEnabled);
        return;
      }
    }

    if (currentSlideIndex < timelineSlides.length - 1) {
      goToSlide(currentSlideIndex + 1, 'next');
    } else {
      setIsAutoPlay(false);
    }
  };

  const handlePrev = () => {
    const isTimelineSlide = timelineSlides[currentSlideIndex]?.type === 'semesters-timeline';
    if (isTimelineSlide) {
      if (timelineActiveSemesterPopup) {
        if (timelineModalSubSlide > 1) {
          setTimelineModalSubSlide(prev => prev - 1);
          playTactileClick(soundEnabled);
          return;
        } else {
          setTimelineActiveSemesterPopup(null);
          playTactileClick(soundEnabled);
          return;
        }
      } else {
        if (timelineStep > 1) {
          const prevStep = timelineStep - 1;
          setTimelineStep(prevStep);
          setTimelineCompletedSemester(null);
          if (prevStep <= 8) {
            setTimelineActiveSemesterPopup(prevStep);
            setTimelineModalSubSlide(SEMESTER_POPUP_DATA[prevStep]?.subSlides.length || 3);
          }
          playTactileClick(soundEnabled);
          return;
        }
      }
    }

    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1, 'prev');
    }
  };

  const handleRestart = () => {
    goToSlide(0, 'prev');
    playTactileClick(soundEnabled);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      const activePopupSlide = SEMESTER_POPUP_DATA[timelineActiveSemesterPopup]
        ?.subSlides.find(subSlide => subSlide.num === timelineModalSubSlide);
      const isPopupVideoOpen = timelineSlides[currentSlideIndex]?.type === 'semesters-timeline'
        && Boolean(activePopupSlide?.videoId);
      if (e.key === ' ' && isPopupVideoOpen) {
        e.preventDefault();
        window.dispatchEvent(new Event('popup-video-toggle'));
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'p') {
        setIsAutoPlay(prev => !prev);
        playTactileClick(soundEnabled);
      } else if (e.key.toLowerCase() === 'm') {
        setViewMode(prev => prev === 'slideshow' ? 'panorama' : 'slideshow');
        playTactileClick(soundEnabled);
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes(prev => !prev);
        playTactileClick(soundEnabled);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, timelineStep, timelineActiveSemesterPopup, timelineModalSubSlide, timelineCompletedSemester, timelineCompletionReady, soundEnabled]);

  // Touch swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Auto-play timer loop
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'slideshow') {
      setAutoPlayProgress(0);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    const stepMs = 100;
    const increment = (stepMs / autoPlayIntervalMs) * 100;

    autoPlayTimerRef.current = setInterval(() => {
      setAutoPlayProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, currentSlideIndex, viewMode]);

  const currentSlide = timelineSlides[currentSlideIndex];

  // Render current slide component
  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case 'hero':
        return (
          <HeroSlide
            slide={currentSlide}
            onNext={handleNext}
            onJumpToSlide={(idx) => goToSlide(idx, idx > currentSlideIndex ? 'next' : 'prev')}
            soundEnabled={soundEnabled}
          />
        );
      case 'coe':
        return <CoeSlide slide={currentSlide} />;
      case 'mous':
        return <MousSlide slide={currentSlide} />;
      case 'semesters-timeline':
        return (
          <TimelineSemestersSlide
            slide={currentSlide}
            currentStep={timelineStep}
            setStep={setTimelineStep}
            activeModalSemester={timelineActiveSemesterPopup}
            setActiveModalSemester={setTimelineActiveSemesterPopup}
            modalSubSlide={timelineModalSubSlide}
            setModalSubSlide={setTimelineModalSubSlide}
            isSem1Expanded={timelineActiveSemesterPopup === 1}
            setIsSem1Expanded={(val) => setTimelineActiveSemesterPopup(val ? 1 : null)}
            sem1SubSlide={timelineModalSubSlide}
            setSem1SubSlide={setTimelineModalSubSlide}
            onNext={handleNext}
            onPrev={handlePrev}
            soundEnabled={soundEnabled}
          />
        );
      case 'roadmap-overview':
        return (
          <OverviewSlide
            slide={currentSlide}
            onJumpToSlide={(idx) => goToSlide(idx, idx > currentSlideIndex ? 'next' : 'prev')}
          />
        );
      case 'phase-detail':
        return <PhaseSlide slide={currentSlide} />;
      case 'ecosystem-matrix':
        return <EcosystemSlide slide={currentSlide} />;
      case 'outcomes-summary':
        return (
          <OutcomesSlide
            slide={currentSlide}
            onRestart={handleRestart}
            soundEnabled={soundEnabled}
            onPlaySuccess={() => playSuccessChime(soundEnabled)}
          />
        );
      case 'student-progress-network':
        return <StakeholderFlowSlide slide={currentSlide} />;
      case 'achievements-gallery':
        return <AchievementsSlide slide={currentSlide} />;
      default:
        return <div>Slide {currentSlideIndex}</div>;
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: viewMode === 'slideshow' ? 'hidden' : 'auto',
        background: 'var(--bg-primary)'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient Neumorphic Soft Dark Green Background Lighting */}
      <div style={{
        position: 'fixed',
        top: '-150px',
        left: '-150px',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(10, 88, 48, 0.07) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'fixed',
        bottom: '-150px',
        right: '-150px',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(6, 78, 59, 0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Full-Screen Slideshow Stage or Panorama View */}
      {viewMode === 'slideshow' ? (
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          height: '100dvh',
          overflow: 'hidden',
          padding: '0',
          zIndex: 10,
          position: 'relative'
        }}>
          {/* Active Fullscreen Slide Container */}
          <div
            key={currentSlideIndex}
            className={slideDirection === 'next' ? 'slide-enter-next' : 'slide-enter-prev'}
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <SlideErrorBoundary key={currentSlideIndex}>
              {renderSlideContent()}
            </SlideErrorBoundary>
          </div>

          {/* Minimal Floating Nav Chevrons (discreet, accessible on hover) */}
          {currentSlideIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              title="Previous Slide [←]"
              style={{
                position: 'fixed',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: 'var(--border-rim)',
                background: 'var(--bg-convex)',
                boxShadow: 'var(--nm-raised)',
                color: 'var(--accent-primary)',
                fontSize: '1.6rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 0.7,
                transition: 'all 0.25s ease',
                zIndex: 60
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; e.currentTarget.style.boxShadow = 'var(--nm-raised-lg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = 'var(--nm-raised)'; }}
            >
              ‹
            </button>
          )}

          {currentSlideIndex < timelineSlides.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              title="Next Slide [→] or [Space]"
              style={{
                position: 'fixed',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: 'var(--border-rim)',
                background: 'var(--bg-convex)',
                boxShadow: 'var(--nm-raised)',
                color: 'var(--accent-primary)',
                fontSize: '1.6rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 0.7,
                transition: 'all 0.25s ease',
                zIndex: 60
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; e.currentTarget.style.boxShadow = 'var(--nm-raised-lg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = 'var(--nm-raised)'; }}
            >
              ›
            </button>
          )}
        </main>
      ) : (
        <main style={{ flex: 1, zIndex: 10, position: 'relative' }}>
          <PanoramaView
            onSelectSlide={(idx) => {
              goToSlide(idx);
              setViewMode('slideshow');
            }}
            onSwitchToSlideshow={() => setViewMode('slideshow')}
          />
        </main>
      )}

      {/* Speaker Notes Floating Drawer */}
      <PresenterNotesModal
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        currentSlide={currentSlide}
        slideIndex={currentSlideIndex}
        totalSlides={timelineSlides.length}
      />
    </div>
  );
}

export default App;
