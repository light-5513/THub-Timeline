export function getTimelineNextState({ step, activeSemester, subSlide, completedSemester, totalSubSlides = 3 }) {
  if (completedSemester) {
    if (completedSemester < 8) {
      return {
        step: completedSemester + 1,
        activeSemester: null,
        subSlide: 1,
        completedSemester: null
      };
    }
    return { step: 8, activeSemester: null, subSlide: 1, completedSemester: 8 };
  }

  if (step >= 1 && step <= 8) {
    if (!activeSemester) {
      return { step, activeSemester: step, subSlide: 1, completedSemester: null };
    }

    if (subSlide < totalSubSlides) {
      return { step, activeSemester, subSlide: subSlide + 1, completedSemester: null };
    }

    return { step, activeSemester: null, subSlide: 1, completedSemester: step };
  }

  return {
    step: step < 8 ? step + 1 : step,
    activeSemester: null,
    subSlide,
    completedSemester: null
  };
}
