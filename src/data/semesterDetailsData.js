const createSemesterPopup = ({ semesterNumber, code, logoSrc, logoOptions, subSlides }) => ({
  semesterNumber,
  code,
  logoSrc,
  logoOptions: logoOptions || [{ src: logoSrc, alt: `Semester ${semesterNumber} logo` }],
  subSlides: subSlides || [1, 2, 3].map(num => ({
    num,
    tabShort: `Sub-Slide 0${num}`
  }))
});

const createSelectionShortlistingSlide = (num = 1) => ({
  num,
  tabShort: `Sub-Slide 0${num}`,
  title: 'Selection & Shortlisting Process',
  description: 'The entrance test and interview support candidate selection and shortlisting.',
  stages: [
    {
      title: 'Entrance Test',
      icon: 'entranceTest',
      description: 'An entrance assessment used as part of candidate selection and shortlisting.'
    },
    {
      title: 'Interview',
      icon: 'interview',
      description: 'An interview used alongside the entrance test to support the selection decision.'
    }
  ],
  outcome: 'The entrance test and interview together inform the selection or shortlisting outcome.'
});

const createMonthlyContestsSlide = (num) => ({
  num,
  tabShort: `Sub-Slide 0${num}`,
  title: 'Monthly Contests',
  contests: [
    { title: 'Monthly Coding Contests', icon: 'coding' },
    { title: 'Monthly Typing Contests', icon: 'typing' }
  ]
});

export const SEMESTER_POPUP_DATA = {
  1: createSemesterPopup({
    semesterNumber: 1,
    code: 'I-I',
    logoSrc: '/assets/bamboo_coder_phase1.png',
    subSlides: [
      createSelectionShortlistingSlide(),
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        title: 'Subjects',
        subjects: [
          { title: 'C Programming', logoSrc: '/assets/c-programming-logo.svg' },
          { title: 'AI Literacy', logoSrc: '/assets/ai-literacy-logo.svg' }
        ]
      },
      {
        num: 3,
        tabShort: 'Sub-Slide 03',
        featureTitle: 'T-Connect',
        videoId: 'vpBMPKUCvuY'
      },
      createMonthlyContestsSlide(4)
    ]
  }),
  2: createSemesterPopup({
    semesterNumber: 2,
    code: 'I-II',
    logoSrc: '/assets/bamboo_coder_phase2.png',
    subSlides: [
      createSelectionShortlistingSlide(),
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        title: 'Subjects',
        subjects: [
          { title: 'C++', logoSrc: '/assets/cpp-programming-logo.svg' },
          { title: 'Prompt Engineering', logoSrc: '/assets/prompt-engineering-logo.svg' }
        ]
      },
      createMonthlyContestsSlide(3),
      {
        num: 4,
        tabShort: 'Sub-Slide 04',
        featureTitle: 'Hub Hoppers',
        galleryImages: [
          { src: '/assets/Hub Hoppers 1.jpg', alt: 'Hub Hoppers ceremony poster' },
          { src: '/assets/Hub Hoppers 2.jpg', alt: 'Hub Hoppers team and award presentations' },
          { src: '/assets/hub hoppers 3.jpg', alt: 'Hub Hoppers award recipients' },
          { src: '/assets/Hub Hoppers 4.jpg', alt: 'Hub Hoppers ceremony highlights' },
          { src: '/assets/hub hoppwers 5.jpg', alt: 'Hub Hoppers audience at the ceremony', orientation: 'landscape' },
          { src: '/assets/hub hoppersd 6.jpg', alt: 'Hub Hoppers community photo' }
        ]
      }
    ]
  }),
  3: createSemesterPopup({
    semesterNumber: 3,
    code: 'II-I',
    logoSrc: '/assets/SKILLUP CODER.png',
    subSlides: [
      createSelectionShortlistingSlide(),
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        title: 'Subjects',
        subjects: [
          { title: 'Operating Systems (OS)', logoSrc: '/assets/operating-systems-logo.svg' },
          { title: 'Data Structures & Algorithms (DSA)', logoSrc: '/assets/dsa-logo.svg' },
          { title: 'Algorithmic Prompting & Edge-Case Synthesis', logoSrc: '/assets/algorithmic-prompting-logo.svg' }
        ]
      },
      {
        num: 3,
        tabShort: 'Sub-Slide 03',
        featureTitle: 'T-Square',
        galleryImages: [
          { src: '/assets/t-square-clean-01.jpg', alt: 'T Square event group photo', orientation: 'landscape' },
          { src: '/assets/t-square-clean-02.jpg', alt: 'T Square students at the event', orientation: 'wide' },
          { src: '/assets/t-square-clean-03.jpg', alt: 'T Square event group photo', orientation: 'wide' },
          { src: '/assets/t-square-clean-04.jpg', alt: 'T Square audience at an exhibit', orientation: 'wide' },
          { src: '/assets/t-square-clean-05.jpg', alt: 'T Square students gathered at a presentation', orientation: 'wide' },
          { src: '/assets/t-square-clean-06.jpg', alt: 'T Square event audience', orientation: 'wide' },
          { src: '/assets/t-square-clean-07.jpg', alt: 'Students viewing a T Square demonstration', orientation: 'wide' },
          { src: '/assets/t-square-clean-08.jpg', alt: 'T Square presentation audience', orientation: 'landscape' }
        ]
      },
      createMonthlyContestsSlide(4)
    ]
  }),
  4: createSemesterPopup({
    semesterNumber: 4,
    code: 'II-II',
    logoSrc: '/assets/SKILLUP CODER.png',
    subSlides: [
      createSelectionShortlistingSlide(),
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        title: 'Subjects',
        subjects: [
          { title: 'Computer Networking', logoSrc: '/assets/computer-networking-logo.svg' },
          { title: 'DBMS', logoSrc: '/assets/dbms-logo.svg' },
          { title: 'AI Tool Evaluation and Integration', logoSrc: '/assets/ai-tool-integration-logo.svg' }
        ]
      },
      {
        num: 3,
        tabShort: 'Sub-Slide 03',
        featureTitle: 'Moon Coders',
        hideFeatureTitle: true,
        featureLogoSrc: '/assets/MOON CODER.png',
        videoId: 'W95j8i1LnbA',
        logoOptions: [
          { src: '/assets/SKILLUP CODER.png', alt: 'Skill Up Coder logo' },
          { src: '/assets/MOON CODER.png', alt: 'Moon Coders logo' }
        ]
      },
      createMonthlyContestsSlide(4)
    ]
  }),
  5: createSemesterPopup({
    semesterNumber: 5,
    code: 'III-I',
    logoSrc: '/assets/ai_ready_engineer.png',
    logoOptions: [
      { src: '/assets/ai_ready_engineer.png', alt: 'AI Ready Engineer logo' },
      {
        src: '/assets/drive-ready-logo.svg',
        alt: 'Drive Ready logo',
        height: 'clamp(100px, 11vh, 126px)',
        maxWidth: 'min(40vw, 480px)'
      }
    ],
    subSlides: [
      {
        num: 1,
        tabShort: 'Sub-Slide 01',
        title: 'Choose a learning track',
        trackChoices: [
          { id: 'ai-ready-engineer', title: 'AI Ready Engineer', logoSrc: '/assets/ai_ready_engineer.png' },
          { id: 'drive-ready', title: 'Drive Ready', logoSrc: '/assets/drive-ready-logo.svg' }
        ]
      },
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        featureTitle: 'Training',
        videoId: 'J7rIcZ-YoRg'
      },
      {
        num: 3,
        tabShort: 'Sub-Slide 03',
        title: 'Selection Process',
        description: 'Complete the five rounds, then submit the undertaking form.',
        stages: [
          { title: 'Aptitude & Logic Test', icon: 'aptitude', description: 'Round 1 of the selection process.' },
          { title: 'Beginner Coding', icon: 'beginnerCoding', description: 'Round 2 of the selection process.' },
          { title: 'Advanced Coding', icon: 'advancedCoding', description: 'Round 3 of the selection process.' },
          { title: 'Technical Interview', icon: 'technicalInterview', description: 'Round 4 of the selection process.' },
          { title: 'Communication Interview', icon: 'communicationInterview', description: 'Round 5 of the selection process.' },
          {
            title: 'Undertaking Form Submission',
            icon: 'undertaking',
            description: 'Submit the undertaking form.'
          }
        ],
        outcome: 'The student must submit the undertaking form after completing the five rounds.'
      },
      {
        num: 4,
        tabShort: 'Sub-Slide 04',
        logoOptions: [
          { src: '/assets/drive-ready-logo.svg', alt: 'Drive Ready logo' }
        ]
      },
      {
        num: 5,
        tabShort: 'Sub-Slide 05',
        logoOptions: [
          { src: '/assets/ai_ready_engineer.png', alt: 'AI Ready Engineer logo' }
        ]
      },
      {
        num: 6,
        tabShort: 'Sub-Slide 06',
        featureTitle: 'Project Week',
        galleryImages: [
          { src: '/assets/project-week-gallery/project-week-01.jpg', alt: 'Project Week activity 1', orientation: 'photo-landscape' },
          { src: '/assets/project-week-gallery/project-week-02.jpg', alt: 'Project Week activity 2', orientation: 'photo-landscape' },
          { src: '/assets/project-week-gallery/project-week-03.jpg', alt: 'Project Week activity 3', orientation: 'photo-landscape' },
          { src: '/assets/project-week-gallery/project-week-04.jpg', alt: 'Project Week activity 4', orientation: 'photo-landscape' },
          { src: '/assets/project-week-gallery/project-week-05.jpg', alt: 'Project Week activity 5', orientation: 'photo-landscape' },
          { src: '/assets/project-week-gallery/project-week-06.jpg', alt: 'Project Week activity 6', orientation: 'standard-landscape' },
          { src: '/assets/project-week-gallery/project-week-07.jpg', alt: 'Project Week activity 7', orientation: 'standard-landscape' },
          { src: '/assets/project-week-gallery/project-week-08.jpg', alt: 'Project Week activity 8', orientation: 'standard-landscape' }
        ]
      },
      {
        num: 7,
        tabShort: 'Sub-Slide 07',
        featureTitle: 'Owl Coder Selections',
        featureLogoSrc: '/assets/Owl Coder Gradient Mascot Logo.png'
      },
      createMonthlyContestsSlide(8)
    ]
  }),
  6: createSemesterPopup({
    semesterNumber: 6,
    code: 'III-II',
    logoSrc: '/assets/ai_ready_engineer.png',
    logoOptions: [
      { src: '/assets/ai_ready_engineer.png', alt: 'AI Ready Engineer logo' },
      {
        src: '/assets/drive-ready-logo.svg',
        alt: 'Drive Ready logo',
        height: 'clamp(100px, 11vh, 126px)',
        maxWidth: 'min(40vw, 480px)'
      },
      { src: '/assets/Owl Coder Gradient Mascot Logo.png', alt: 'Owl Coder logo' }
    ],
    subSlides: [
      {
        num: 1,
        tabShort: 'Sub-Slide 01',
        title: 'Selection Process',
        stages: [
          { title: 'Aptitude & Logic Test', icon: 'aptitude' },
          { title: 'Beginner Coding', icon: 'beginnerCoding' },
          { title: 'Intermediate Coding', icon: 'intermediateCoding' },
          { title: 'Advanced Coding', icon: 'advancedCoding' },
          { title: 'Technical Interview', icon: 'technicalInterview' },
          { title: 'Communication Interview', icon: 'communicationInterview' }
        ]
      },
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        videoId: 't9aB4kHGk0w'
      },
      createMonthlyContestsSlide(3)
    ]
  }),
  7: createSemesterPopup({
    semesterNumber: 7,
    code: 'IV-I',
    logoSrc: '/assets/Project Space.png',
    logoOptions: [
      { src: '/assets/Project Space.png', alt: 'Project Space logo' },
      { src: '/assets/Owl Coder Gradient Mascot Logo.png', alt: 'Owl Coder logo' }
    ],
    subSlides: [
      {
        num: 1,
        tabShort: 'Sub-Slide 01',
        featureTitle: 'Project Space',
        showImageNumbers: true,
        galleryImages: [
          { src: '/assets/project space/1.jpg', alt: 'Project Space event photo 1', orientation: 'standard-landscape' },
          { src: '/assets/project space/2.jpg', alt: 'Project Space event photo 2' },
          { src: '/assets/project space/3.jpg', alt: 'Project Space event photo 3' },
          { src: '/assets/project space/4.jpg', alt: 'Project Space event photo 4', orientation: 'standard-landscape' },
          { src: '/assets/project space/5.jpg', alt: 'Project Space event photo 5' },
          { src: '/assets/project space/5 (1).jpg', alt: 'Project Space event photo 6' },
          { src: '/assets/project space/6.jpg', alt: 'Project Space event photo 7' },
          { src: '/assets/project space/7.jpg', alt: 'Project Space event photo 8' }
        ]
      },
      {
        num: 2,
        tabShort: 'Sub-Slide 02',
        featureTitle: 'Industry Expert Sessions',
        galleryImages: Array.from({ length: 13 }, (_, index) => ({
          src: `/assets/project space/guest${index + 1}.jpg`,
          alt: `Project Space guest session ${index + 1}`,
          ...(index === 5 ? { orientation: 'standard-landscape' } : {})
        }))
      },
      {
        num: 3,
        tabShort: 'Sub-Slide 03',
        featureTitle: 'Project Street',
        galleryImages: [
          ...Array.from({ length: 11 }, (_, index) => ({
            src: `/assets/project space/street${index + 1}.jpg`,
            alt: `Project Street event photo ${index + 1}`,
            ...([1, 5].includes(index + 1) ? { orientation: 'standard-landscape' } : {})
          })),
          { src: '/assets/project space/claude.jpg', alt: 'Claude display at Project Street', orientation: 'standard-landscape' }
        ]
      },
      {
        num: 4,
        tabShort: 'Sub-Slide 04',
        featureTitle: 'Project Space',
        videoId: '2YpciZnl2h8'
      },
    ]
  }),
  8: createSemesterPopup({
    semesterNumber: 8,
    code: 'IV-II',
    logoSrc: '/assets/ai_ready_engineer.png'
  })
};
