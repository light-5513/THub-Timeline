import test from 'node:test';
import assert from 'node:assert/strict';
import { timelineSlides } from '../data/timelineData.js';
import { getTimelineNextState } from './timelineFlow.js';
import { SEMESTER_POPUP_DATA } from '../data/semesterDetailsData.js';

test('Semester 1 collapses, then reveals Semester 2 before opening its popup', () => {
  const closedAfterLastSlide = getTimelineNextState({
    step: 1,
    activeSemester: 1,
    subSlide: 3,
    completedSemester: null
  });
  assert.deepEqual(closedAfterLastSlide, {
    step: 1,
    activeSemester: null,
    subSlide: 1,
    completedSemester: 1
  });

  const semester2Visible = getTimelineNextState(closedAfterLastSlide);
  assert.deepEqual(semester2Visible, {
    step: 2,
    activeSemester: null,
    subSlide: 1,
    completedSemester: null
  });

  const semester2Popup = getTimelineNextState(semester2Visible);
  assert.deepEqual(semester2Popup, {
    step: 2,
    activeSemester: 2,
    subSlide: 1,
    completedSemester: null
  });
});

test('Semester 2 collapses, then reveals Semester 3 before opening its popup', () => {
  const closedAfterLastSlide = getTimelineNextState({
    step: 2,
    activeSemester: 2,
    subSlide: 3,
    completedSemester: null
  });
  assert.deepEqual(closedAfterLastSlide, {
    step: 2,
    activeSemester: null,
    subSlide: 1,
    completedSemester: 2
  });

  const semester3Visible = getTimelineNextState(closedAfterLastSlide);
  assert.deepEqual(semester3Visible, {
    step: 3,
    activeSemester: null,
    subSlide: 1,
    completedSemester: null
  });

  const semester3Popup = getTimelineNextState(semester3Visible);
  assert.deepEqual(semester3Popup, {
    step: 3,
    activeSemester: 3,
    subSlide: 1,
    completedSemester: null
  });
});

test('Semester 2 advances through its fourth sub-slide before completing', () => {
  const next = state => getTimelineNextState({ ...state, totalSubSlides: 4 });
  const afterSubSlide1 = next({ step: 2, activeSemester: 2, subSlide: 1, completedSemester: null });
  assert.equal(afterSubSlide1.subSlide, 2);
  assert.equal(afterSubSlide1.activeSemester, 2);

  const afterSubSlide2 = next(afterSubSlide1);
  assert.equal(afterSubSlide2.subSlide, 3);
  assert.equal(afterSubSlide2.activeSemester, 2);

  const afterSubSlide3 = next(afterSubSlide2);
  assert.equal(afterSubSlide3.subSlide, 4);
  assert.equal(afterSubSlide3.activeSemester, 2);

  const completedSemester2 = next(afterSubSlide3);
  assert.equal(completedSemester2.activeSemester, null);
  assert.equal(completedSemester2.completedSemester, 2);
  assert.equal(next(completedSemester2).step, 3);
});

test('Semesters 3 through 7 use the same collapse, reveal, then expand sequence', () => {
  for (let semester = 3; semester <= 7; semester += 1) {
    const collapsed = getTimelineNextState({
      step: semester,
      activeSemester: semester,
      subSlide: 3,
      completedSemester: null
    });
    assert.equal(collapsed.activeSemester, null);
    assert.equal(collapsed.step, semester);
    assert.equal(collapsed.completedSemester, semester);

    const revealed = getTimelineNextState(collapsed);
    assert.equal(revealed.step, semester + 1);
    assert.equal(revealed.activeSemester, null);
    assert.equal(revealed.completedSemester, null);

    const expanded = getTimelineNextState(revealed);
    assert.equal(expanded.step, semester + 1);
    assert.equal(expanded.activeSemester, semester + 1);
  }
});

test('Semester 8 collapses and holds for the app-level next-slide transition', () => {
  const collapsed = getTimelineNextState({
    step: 8,
    activeSemester: 8,
    subSlide: 3,
    completedSemester: null
  });
  assert.deepEqual(collapsed, {
    step: 8,
    activeSemester: null,
    subSlide: 1,
    completedSemester: 8
  });
  assert.deepEqual(getTimelineNextState(collapsed), collapsed);
});

test('Semesters 2, 5, and 7 have their configured slide counts', () => {
  for (let semester = 1; semester <= 8; semester += 1) {
    assert.equal(SEMESTER_POPUP_DATA[semester]?.semesterNumber, semester);
    const expectedCount = semester === 2 ? 4 : semester === 5 ? 7 : semester === 7 ? 4 : 3;
    assert.equal(SEMESTER_POPUP_DATA[semester]?.subSlides.length, expectedCount);
  }
});

test('all semester popups keep only numbered navigation and a semester logo', () => {
  for (let semester = 1; semester <= 8; semester += 1) {
    const popup = SEMESTER_POPUP_DATA[semester];
    assert.ok(popup.logoSrc);
    assert.deepEqual(popup.subSlides.map(({ num }) => num), Array.from(
      { length: semester === 2 ? 4 : semester === 5 ? 7 : semester === 7 ? 4 : 3 },
      (_, index) => index + 1
    ));
    const slidesWithoutContent = semester === 1
      ? popup.subSlides.slice(3)
      : semester === 2
        ? popup.subSlides.slice(4)
        : semester === 3
          ? popup.subSlides.slice(3)
        : semester === 4
            ? popup.subSlides.slice(3)
        : semester === 5
          ? popup.subSlides.slice(7)
        : semester === 6
            ? popup.subSlides.slice(2)
        : semester === 7
          ? popup.subSlides.slice(4)
        : popup.subSlides;
    for (const subSlide of slidesWithoutContent) {
      assert.deepEqual(Object.keys(subSlide), ['num', 'tabShort']);
    }
  }
});

test('timeline is followed by a stakeholder progress network slide', () => {
  const timelineIndex = timelineSlides.findIndex(({ type }) => type === 'semesters-timeline');
  const nextSlide = timelineSlides[timelineIndex + 1];
  assert.equal(nextSlide.type, 'student-progress-network');
  assert.deepEqual(nextSlide.platforms.map(({ name }) => name), ['mPod', 'J-Path', 'Myna', 'Owl Coder']);
  assert.deepEqual(nextSlide.stakeholders.map(({ name }) => name), [
    'Placement Department',
    'HODs & Faculty',
    'Corporate',
    'Parents'
  ]);
  assert.equal(timelineSlides[timelineIndex + 2].type, 'achievements-gallery');
});

test('Achievements slide scrolls all placement folder images', () => {
  const achievements = timelineSlides.find(({ type }) => type === 'achievements-gallery');
  assert.equal(achievements.title, 'Achievements');
  assert.equal(achievements.images.length, 12);
  assert.ok(achievements.images.every(({ src }) => src.startsWith('/assets/placements/')));
});

test('Semester 3 and 4 use the Skill Up Coder logo', () => {
  assert.equal(SEMESTER_POPUP_DATA[3].logoSrc, '/assets/SKILLUP CODER.png');
  assert.equal(SEMESTER_POPUP_DATA[4].logoSrc, '/assets/SKILLUP CODER.png');
});

test('Semester 5 offers both AI Ready Engineer and Drive Ready logos', () => {
  assert.deepEqual(SEMESTER_POPUP_DATA[5].logoOptions.map(({ alt }) => alt), [
    'AI Ready Engineer logo',
    'Drive Ready logo'
  ]);
  assert.equal(SEMESTER_POPUP_DATA[5].logoOptions[1].src, '/assets/drive-ready-logo.svg');
});

test('Semester 6 offers AI Ready Engineer, Drive Ready, and Owl Coder logos', () => {
  assert.deepEqual(SEMESTER_POPUP_DATA[6].logoOptions.map(({ alt }) => alt), [
    'AI Ready Engineer logo',
    'Drive Ready logo',
    'Owl Coder logo'
  ]);
});

test('Semester 7 uses Project Space and Owl Coder logos', () => {
  assert.deepEqual(SEMESTER_POPUP_DATA[7].logoOptions.map(({ alt }) => alt), [
    'Project Space logo',
    'Owl Coder logo'
  ]);
});

test('Semester 7 has numbered Project Space images, expert sessions, Project Street, and video slides', () => {
  const [projectSpace, expertSessions, projectStreet, projectSpaceVideo] = SEMESTER_POPUP_DATA[7].subSlides;
  assert.equal(projectSpace.featureTitle, 'Project Space');
  assert.equal(projectSpace.galleryImages.length, 8);
  assert.equal(projectSpace.showImageNumbers, true);
  assert.ok(projectSpace.galleryImages.some(({ src }) => src.endsWith('5 (1).jpg')));
  assert.equal(projectSpace.galleryImages[0].orientation, 'standard-landscape');

  assert.equal(expertSessions.featureTitle, 'Industry Expert Sessions');
  assert.equal(expertSessions.galleryImages.length, 13);
  assert.ok(expertSessions.galleryImages[12].src.endsWith('guest13.jpg'));

  assert.equal(projectStreet.featureTitle, 'Project Street');
  assert.equal(projectStreet.galleryImages.length, 12);
  assert.ok(projectStreet.galleryImages.some(({ src }) => src.endsWith('claude.jpg')));

  assert.equal(projectSpaceVideo.featureTitle, 'Project Space');
  assert.equal(projectSpaceVideo.videoId, '2YpciZnl2h8');
});

test('Semester 5 first popup slide offers both tracks as selectable choices', () => {
  const tracks = SEMESTER_POPUP_DATA[5].subSlides[0].trackChoices;
  assert.deepEqual(tracks.map(({ title }) => title), ['AI Ready Engineer', 'Drive Ready']);
  assert.ok(tracks.every(({ logoSrc }) => logoSrc.startsWith('/assets/')));
});

test('Semester 5 second popup slide is Training with the supplied video', () => {
  const trainingSlide = SEMESTER_POPUP_DATA[5].subSlides[1];
  assert.equal(trainingSlide.featureTitle, 'Training');
  assert.equal(trainingSlide.videoId, 'J7rIcZ-YoRg');
});

test('Semester 5 third popup slide includes five selection rounds and the undertaking form', () => {
  const selectionSlide = SEMESTER_POPUP_DATA[5].subSlides[2];
  assert.deepEqual(selectionSlide.stages.map(({ title }) => title), [
    'Aptitude & Logic Test',
    'Beginner Coding',
    'Advanced Coding',
    'Technical Interview',
    'Communication Interview',
    'Undertaking Form Submission'
  ]);
  assert.equal(selectionSlide.stages[5].final, true);
  assert.match(selectionSlide.outcome, /undertaking form/i);
});

test('Semester 5 slides 4 and 5 reserve content space with their respective logos', () => {
  assert.equal(SEMESTER_POPUP_DATA[5].subSlides[3].logoOptions[0].alt, 'Drive Ready logo');
  assert.equal(SEMESTER_POPUP_DATA[5].subSlides[4].logoOptions[0].alt, 'AI Ready Engineer logo');
});

test('Semester 5 sixth popup slide scrolls the Project Week images without logos', () => {
  const projectWeekSlide = SEMESTER_POPUP_DATA[5].subSlides[5];
  assert.equal(projectWeekSlide.featureTitle, 'Project Week');
  assert.equal(projectWeekSlide.galleryImages.length, 8);
  assert.ok(projectWeekSlide.galleryImages.every(({ src }) => src.startsWith('/assets/project-week-gallery/')));
});

test('Semester 5 seventh popup slide shows only Owl Coder selections and its logo', () => {
  const selectionSlide = SEMESTER_POPUP_DATA[5].subSlides[6];
  assert.equal(selectionSlide.featureTitle, 'Owl Coder Selections');
  assert.equal(selectionSlide.featureLogoSrc, '/assets/Owl Coder Gradient Mascot Logo.png');
  assert.equal('logoOptions' in selectionSlide, false);
  assert.deepEqual(SEMESTER_POPUP_DATA[5].logoOptions.map(({ alt }) => alt), [
    'AI Ready Engineer logo',
    'Drive Ready logo'
  ]);
  assert.equal('stages' in selectionSlide, false);
  assert.equal('levels' in selectionSlide, false);
});

test('Semester 6 first popup slide has the six requested selection rounds', () => {
  const stages = SEMESTER_POPUP_DATA[6].subSlides[0].stages;
  assert.deepEqual(stages.map(({ title }) => title), [
    'Aptitude & Logic Test',
    'Beginner Coding',
    'Intermediate Coding',
    'Advanced Coding',
    'Technical Interview',
    'Communication Interview'
  ]);
  assert.deepEqual(stages.map(({ icon }) => icon), [
    'aptitude',
    'beginnerCoding',
    'intermediateCoding',
    'advancedCoding',
    'technicalInterview',
    'communicationInterview'
  ]);
});

test('Semester 6 second popup slide embeds the supplied YouTube video', () => {
  assert.equal(SEMESTER_POPUP_DATA[6].subSlides[1].videoId, 't9aB4kHGk0w');
});

test('Semesters 1 through 4 first popup slides cover entrance test and interview shortlisting', () => {
  for (const semester of [1, 2, 3, 4]) {
    const firstSubSlide = SEMESTER_POPUP_DATA[semester].subSlides[0];
    assert.equal(firstSubSlide.title, 'Selection & Shortlisting Process');
    assert.deepEqual(firstSubSlide.stages.map(({ title }) => title), ['Entrance Test', 'Interview']);
    assert.match(firstSubSlide.outcome, /selection or shortlisting/i);
  }
});

test('Semester 1 second popup slide presents C Programming and AI Literacy with logos', () => {
  const subjects = SEMESTER_POPUP_DATA[1].subSlides[1].subjects;
  assert.deepEqual(subjects.map(({ title }) => title), ['C Programming', 'AI Literacy']);
  for (const subject of subjects) {
    assert.match(subject.logoSrc, /^\/assets\/.*\.svg$/);
  }
});

test('Semester 2 second popup slide presents C++ and Prompt Engineering with logos', () => {
  const subjects = SEMESTER_POPUP_DATA[2].subSlides[1].subjects;
  assert.deepEqual(subjects.map(({ title }) => title), ['C++', 'Prompt Engineering']);
  for (const subject of subjects) {
    assert.match(subject.logoSrc, /^\/assets\/.*\.svg$/);
  }
});

test('Semester 3 second popup slide presents OS, DSA, and algorithmic prompting with logos', () => {
  const subjects = SEMESTER_POPUP_DATA[3].subSlides[1].subjects;
  assert.deepEqual(subjects.map(({ title }) => title), [
    'Operating Systems (OS)',
    'Data Structures & Algorithms (DSA)',
    'Algorithmic Prompting & Edge-Case Synthesis'
  ]);
  for (const subject of subjects) {
    assert.match(subject.logoSrc, /^\/assets\/.*\.svg$/);
  }
});

test('Semester 4 second popup slide presents networking, DBMS, and AI tool integration with logos', () => {
  const subjects = SEMESTER_POPUP_DATA[4].subSlides[1].subjects;
  assert.deepEqual(subjects.map(({ title }) => title), [
    'Computer Networking',
    'DBMS',
    'AI Tool Evaluation and Integration'
  ]);
  for (const subject of subjects) {
    assert.match(subject.logoSrc, /^\/assets\/.*\.svg$/);
  }
});

test('Semester 4 third popup slide is Moon Coders with its video', () => {
  const moonCodersSlide = SEMESTER_POPUP_DATA[4].subSlides[2];
  assert.equal(moonCodersSlide.featureTitle, 'Moon Coders');
  assert.equal(moonCodersSlide.featureLogoSrc, '/assets/MOON CODER.png');
  assert.ok(moonCodersSlide.logoOptions.some(({ src }) => src === '/assets/MOON CODER.png'));
  assert.equal(moonCodersSlide.videoId, 'W95j8i1LnbA');
});

test('Semester 3 third popup slide scrolls eight T-Square images with logo-trimmed copies', () => {
  const gallerySlide = SEMESTER_POPUP_DATA[3].subSlides[2];
  assert.equal(gallerySlide.featureTitle, 'T-Square');
  assert.equal(gallerySlide.galleryImages.length, 8);
  assert.ok(gallerySlide.galleryImages.every(({ src }) => src.includes('t-square-clean-')));
});

test('Semester 2 third popup slide includes monthly coding and typing contests', () => {
  const contests = SEMESTER_POPUP_DATA[2].subSlides[2].contests;
  assert.deepEqual(contests.map(({ title }) => title), [
    'Monthly Coding Contests',
    'Monthly Typing Contests'
  ]);
  assert.deepEqual(contests.map(({ icon }) => icon), ['coding', 'typing']);
});

test('Semester 2 fourth popup slide is Hub Hoppers', () => {
  const hubHoppersSlide = SEMESTER_POPUP_DATA[2].subSlides[3];
  assert.equal(hubHoppersSlide.featureTitle, 'Hub Hoppers');
  assert.equal(hubHoppersSlide.galleryImages.length, 6);
  assert.ok(hubHoppersSlide.galleryImages.every(({ src }) => src.startsWith('/assets/')));
  assert.equal(hubHoppersSlide.galleryImages[4].orientation, 'landscape');
});

test('Semester 1 third popup slide is titled T-Connect', () => {
  const thirdSubSlide = SEMESTER_POPUP_DATA[1].subSlides[2];
  assert.equal(thirdSubSlide.featureTitle, 'T-Connect');
  assert.equal(thirdSubSlide.videoId, 'vpBMPKUCvuY');
});
