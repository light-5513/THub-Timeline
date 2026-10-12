export const timelineSlides = [
  {
    id: 'intro',
    type: 'hero',
    phaseNumber: '00',
    phaseLabel: 'EXECUTIVE PROPOSAL',
    title: 'Next-Gen Transformation Timeline',
    subtitle: 'A 4-Year Strategic Industry Capability & Global Certification Roadmap',
    institution: 'Technical Hub × VVIT Collaboration',
    timeframe: 'Academic Journey • 2026 – 2030',
    description:
      'Empowering engineering students with an uninterrupted pipeline from algorithmic foundations to Fortune 500 credentials and generative AI engineering. Designed for holistic student excellence, tier-1 placements, and high-impact innovation.',
    keyStats: [
      { label: 'Academic Span', value: '4 Years', sub: '8 Semesters of Skilling' },
      { label: 'Flagship Tracks', value: '4 Pillars', sub: 'Owl Coder, AI Ready, etc.' },
      { label: 'Global Certifications', value: '10+ Badges', sub: 'Red Hat, Cisco, Pega, Mile2' },
      { label: 'Placement Target', value: '100% Ready', sub: 'High Package Product Focus' }
    ],
    logos: [
      { name: 'Technical Hub', src: '/assets/Technical Hub.png', badge: 'Core Innovator' },
      { name: 'VVIT', src: '/assets/vvit_logo.png', badge: 'Partner Institute' }
    ],
    presenterNotes:
      'Welcome everyone. This timeline proposal represents a structured, outcome-driven roadmap crafted by Technical Hub for engineering students. It ensures every graduate has a portfolio of verified global credentials and real-world AI projects.'
  },
  {
    id: 'coe',
    type: 'coe',
    phaseNumber: 'COE',
    phaseLabel: 'CENTRE OF EXCELLENCE',
    title: 'Frontier AI Centre of Excellence',
    subtitle: 'Anthropic Claude & OpenAI Advanced Engineering Lab',
    timeframe: 'Advanced AI Infrastructure',
    description: 'Empowering students with hands-on capabilities across Claude and OpenAI ecosystems, from Prompt Engineering to Agentic Workflows.'
  },
  {
    id: 'mous',
    type: 'mous',
    phaseNumber: '03',
    phaseLabel: 'ACADEMIC MOUS',
    title: 'Academic MoUs',
    subtitle: 'Global Industry Partnerships & Training Accreditations',
    timeframe: 'Industry Collaboration',
    description: 'Premier academic partnerships with global tech leaders including Automation Anywhere, Cisco, Red Hat, AWS, Mile2, Pega, and ServiceNow.'
  },
  {
    id: 'semesters-timeline',
    type: 'semesters-timeline',
    phaseNumber: '04',
    phaseLabel: 'ACADEMIC ROADMAP',
    title: '8-Semester Career Roadmap',
    subtitle: 'From Day 1 Algorithmic Foundations to Live Industry Deployment',
    timeframe: '8 Semesters • 4 Academic Years',
    description: 'Structured 8-semester roadmap covering coding fundamentals, systems & networking, enterprise automation, and full live deployment.'
  },
  {
    id: 'overview',
    type: 'roadmap-overview',
    phaseNumber: '01-04',
    phaseLabel: 'THE MASTER BLUEPRINT',
    title: 'The 4-Year Student Evolution Arc',
    subtitle: 'From Day 1 Algorithmic Thinker to Enterprise AI Engineer',
    timeframe: 'Semester 1 through Semester 8',
    description:
      'Every semester builds upon the previous one. We eliminate fragmented workshops and replace them with a coherent, progressive multi-year developmental curriculum.',
    phases: [
      {
        year: 'Year 1 (Sems 1-2)',
        theme: 'Coding DNA & Foundations',
        color: '#064e3b',
        icon: 'Code',
        programs: ['Owl Coder Phase 1', 'Java Foundations', 'Myna Platform'],
        highlight: 'Algorithmic Problem Solving & Associate Certification'
      },
      {
        year: 'Year 2 (Sems 3-4)',
        theme: 'Systems, Cloud & Infrastructure',
        color: '#0a5830',
        icon: 'Server',
        programs: ['Red Hat Academy', 'Cisco Academy', 'DevOps & Networks'],
        highlight: 'RHCSA & CCNA Global Credentialing'
      },
      {
        year: 'Year 3 (Sems 5-6)',
        theme: 'Enterprise Scale & Automation',
        color: '#047857',
        icon: 'Workflow',
        programs: ['Pega Systems', 'Automation Anywhere RPA', 'ServiceNow', 'Mile2 Security'],
        highlight: 'Multi-Cloud Architecture & Enterprise Bot Engineering'
      },
      {
        year: 'Year 4 (Sems 7-8)',
        theme: 'Frontier AI & Product Incubator',
        color: '#065f46',
        icon: 'Sparkles',
        programs: ['AI Ready Engineer', 'OpenAI & Claude LLMs', 'GitHub Copilot', 'Project Space'],
        highlight: 'Live Capstone Incubation & Tier-1 Placement Readiness'
      }
    ],
    presenterNotes:
      'Walk the audience through the four progressive stages. Notice how each stage introduces industry partners at the exact right academic maturity point.'
  },
  {
    id: 'year1',
    type: 'phase-detail',
    phaseNumber: 'PHASE 01',
    phaseLabel: 'YEAR 1 • SEMESTERS 1 & 2',
    title: 'Foundational Excellence & Coding DNA',
    subtitle: 'Instilling Competitive Programming Discipline & Object-Oriented Mastery',
    timeframe: 'Months 1 to 12 • 1st & 2nd Semesters',
    badgeColor: '#064e3b',
    primaryHeroAsset: '/assets/Owl Coder Gradient Mascot Logo.png',
    programs: [
      {
        name: 'Owl Coder Initiation',
        logo: '/assets/Owl Coder Gradient Mascot Logo.png',
        tag: 'Signature Program',
        description: 'T-Hub flagship competitive programming bootcamp. Daily problem solving, time-complexity analysis, and data structures mastery.',
        metrics: '250+ Algorithmic Challenges Solved'
      },
      {
        name: 'Java Foundations Associate',
        logo: '/assets/02a_Java_Foundations_Associate.png',
        tag: 'Global Certification',
        description: 'Oracle-aligned foundational Java curriculum validating OOP design, memory management, exception handling, and robust typing.',
        metrics: 'Oracle Industry Associate Badge'
      },
      {
        name: 'Myna Learning Platform',
        logo: '/assets/Myna.png',
        tag: 'Continuous Evaluation',
        description: 'Gamified coding practice, real-time leaderboard, weekly hack battles, and adaptive automated test suite evaluation.',
        metrics: '24/7 Practice Environment'
      }
    ],
    curriculumTracks: [
      { title: 'Core Logic & C Programming', hours: '60 hrs', desc: 'Pointers, arrays, recursion, control flow' },
      { title: 'Object-Oriented Programming (Java)', hours: '80 hrs', desc: 'Classes, polymorphism, interfaces, collections' },
      { title: 'Basic Data Structures', hours: '60 hrs', desc: 'Stacks, queues, linked lists, sorting algorithms' },
      { title: 'Myna Weekly Code Sprints', hours: '40 hrs', desc: 'Timed mock contests with automated judging' }
    ],
    studentMilestone: 'Students develop algorithmic grit and earn their first global certification before entering Year 2.',
    presenterNotes:
      'Phase 1 focuses on eliminating fear of coding. Owl Coder instills a high-performance culture backed by the Java Foundations Associate credential.'
  },
  {
    id: 'year2',
    type: 'phase-detail',
    phaseNumber: 'PHASE 02',
    phaseLabel: 'YEAR 2 • SEMESTERS 3 & 4',
    title: 'Systems, Cloud & Infrastructure',
    subtitle: 'Mastering Enterprise Linux, TCP/IP Networking & Cloud Foundations',
    timeframe: 'Months 13 to 24 • 3rd & 4th Semesters',
    badgeColor: '#0a5830',
    primaryHeroAsset: '/assets/redhat.png',
    programs: [
      {
        name: 'Red Hat Academy (RHA)',
        logo: '/assets/RHA_Logos_Logo-Red_Hat-Academy-A-Standard-RGB-1024x257.png',
        tag: 'Enterprise OS Track',
        description: 'Hands-on training in Red Hat Enterprise Linux (RHEL), shell scripting, system security, systemd services, and file systems.',
        metrics: 'RHCSA Readiness Milestone'
      },
      {
        name: 'Cisco Networking Academy',
        logo: '/assets/Cisco_Networking_Academy.svg.webp',
        tag: 'Networking Backbone',
        description: 'Packet Tracer simulation, IP subnetting, routing protocols (OSPF, BGP), switching, VLANs, and cyber threat defense fundamentals.',
        metrics: 'CCNA Aligned Certification'
      },
      {
        name: 'Infrastructure & Containerization',
        logo: '/assets/tag.png',
        tag: 'Modern DevOps',
        description: 'Docker fundamentals, container deployment, Linux permission models, and continuous integration pipeline introduction.',
        metrics: 'Production-grade Sandbox'
      }
    ],
    curriculumTracks: [
      { title: 'Enterprise Linux Administration', hours: '75 hrs', desc: 'Shell scripting, user permissions, networking tools' },
      { title: 'Cisco Routing & Switching Lab', hours: '65 hrs', desc: 'Topology design, NAT, DHCP, enterprise protocols' },
      { title: 'Advanced Algorithms & Trees/Graphs', hours: '70 hrs', desc: 'Dynamic programming, greedy algorithms, graph search' },
      { title: 'Cyber Essentials & Hygiene', hours: '30 hrs', desc: 'Network defense, firewalls, threat monitoring' }
    ],
    studentMilestone: 'Every student understands the full stack below the application layer: the operating system and network topology.',
    presenterNotes:
      'Year 2 equips students with foundational infrastructure competence through global leaders: Red Hat and Cisco.'
  },
  {
    id: 'year3',
    type: 'phase-detail',
    phaseNumber: 'PHASE 03',
    phaseLabel: 'YEAR 3 • SEMESTERS 5 & 6',
    title: 'Enterprise Platforms & Automation',
    subtitle: 'Accelerating Industry Value with Low-Code, RPA, ServiceNow & Cybersecurity',
    timeframe: 'Months 25 to 36 • 5th & 6th Semesters',
    badgeColor: '#047857',
    primaryHeroAsset: '/assets/pega.png',
    programs: [
      {
        name: 'Pega Systems Academy',
        logo: '/assets/pega.png',
        tag: 'CRM & Case Lifecycle',
        description: 'Pega Certified System Architect (CSA) track. Case design, business rules engine, data transforms, and enterprise decisioning.',
        metrics: 'Certified System Architect (CSA)'
      },
      {
        name: 'Automation Anywhere (RPA)',
        logo: '/assets/Automation Anywhere.png',
        tag: 'Robotic Automation',
        description: 'Bot building, intelligent document processing, automation workflow orchestration, and unattended bot deployment.',
        metrics: 'RPA Certified Professional'
      },
      {
        name: 'ServiceNow Partner Network',
        logo: '/assets/sno_partner-network-logo.png',
        tag: 'Enterprise Workflow',
        description: 'IT Service Management, ServiceNow scripting, Client Scripts, Business Rules, and Service Portal application building.',
        metrics: 'ServiceNow Certified Associate'
      },
      {
        name: 'Mile2 Cyber Security',
        logo: '/assets/mile2_authorized_training_center_8x_enhanced.png',
        tag: 'Authorized Security Center',
        description: 'Vulnerability assessment, penetration testing methodology, threat hunting, and certified ethical hacking lab simulations.',
        metrics: 'Mile2 ATC Certified Hacker'
      }
    ],
    curriculumTracks: [
      { title: 'Pega Case Lifecycle Management', hours: '60 hrs', desc: 'Flow actions, data propagation, SLA rules' },
      { title: 'Automation Anywhere Bot Development', hours: '50 hrs', desc: 'Workflow recorder, API integration, error recovery' },
      { title: 'ServiceNow Application Design', hours: '60 hrs', desc: 'Schema architecture, GlideRecord API, client scripts' },
      { title: 'Mile2 Hands-on PenTesting Range', hours: '50 hrs', desc: 'Network exploitation, web attack vectors, forensics' }
    ],
    studentMilestone: 'Students become enterprise-ready with credentials that directly match Fortune 500 hiring requisitions.',
    presenterNotes:
      'In Year 3, students unlock massive placement leverage. Pega, Automation Anywhere, ServiceNow, and Mile2 are high-demand enterprise specializations.'
  },
  {
    id: 'year4',
    type: 'phase-detail',
    phaseNumber: 'PHASE 04',
    phaseLabel: 'YEAR 4 • SEMESTERS 7 & 8',
    title: 'Frontier AI & Product Incubator',
    subtitle: 'Deploying Modern LLMs, Agentic Workflows & Live Industry Capstones',
    timeframe: 'Months 37 to 48 • 7th & 8th Semesters',
    badgeColor: '#065f46',
    primaryHeroAsset: '/assets/AI Ready Engineer AI Logo.png',
    programs: [
      {
        name: 'AI Ready Engineer Program',
        logo: '/assets/AI Ready Engineer AI Logo.png',
        tag: 'Flagship AI Initiative',
        description: 'Comprehensive Generative AI curriculum covering transformer architectures, prompt engineering, fine-tuning, embeddings, and RAG.',
        metrics: 'AI Engineer Certification'
      },
      {
        name: 'Project Space Incubator',
        logo: '/assets/Project Space.png',
        tag: 'Hands-on Product Lab',
        description: 'Student incubator where teams build real-world SaaS apps, industry sponsor projects, patentable prototypes, and production AI tools.',
        metrics: 'Production Deployment'
      },
      {
        name: 'Frontier LLM & Tooling Badges',
        logo: '/assets/claude cert.png',
        tag: 'OpenAI + Claude + Copilot',
        description: 'Certified in prompt crafting, Anthropic Claude SDK, OpenAI Function Calling, vector search (Chroma/Pinecone), and GitHub Copilot.',
        metrics: 'Trained on 3 Tier-1 AI Stacks'
      }
    ],
    aiBadges: [
      { name: 'Anthropic Claude', logo: '/assets/claude.png', desc: 'Prompt architecture & system design' },
      { name: 'OpenAI', logo: '/assets/openai_square.png', desc: 'Embeddings, GPT-4o APIs & Function Calling' },
      { name: 'GitHub Copilot', logo: '/assets/badge-copilot-CXyQbEb_.png', desc: 'AI-assisted velocity & test generation' },
      { name: 'Claude Certified', logo: '/assets/claude cert.png', desc: 'Official mastery certification badge' }
    ],
    studentMilestone: 'Students graduate not just as job seekers, but as published developers with production AI portfolios.',
    presenterNotes:
      'Year 4 bridges academia to tier-1 tech careers. The combination of AI Ready Engineer and Project Space produces industry-differentiating resumes.'
  },
  {
    id: 'ecosystem',
    type: 'ecosystem-matrix',
    phaseNumber: '05',
    phaseLabel: 'THE T-HUB ADVANTAGE',
    title: 'Integrated Skilling Engine',
    subtitle: 'How Technical Hub Synergy Multiplies Student Capability',
    timeframe: 'Continuous All 4 Years',
    description:
      'Unlike isolated training vendors, Technical Hub provides an intertwined ecosystem where practice, evaluation, global credentials, and product incubation feed into one another.',
    pillars: [
      {
        name: 'Owl Coder',
        badge: 'Algorithmic Mastery',
        avatar: '/assets/Owl Coder Gradient Mascot Logo.png',
        focus: 'DSA, competitive contests, interview coding rounds',
        role: 'Builds core mathematical & logic stamina from Year 1'
      },
      {
        name: 'Myna Platform',
        badge: 'Evaluation Engine',
        avatar: '/assets/Myna.png',
        focus: 'Automated test runner, leaderboards, daily streaks',
        role: 'Provides verifiable metrics on student commitment'
      },
      {
        name: 'Global Academies',
        badge: 'Industry Credentials',
        avatar: '/assets/redhat.png',
        focus: 'Red Hat, Cisco, Pega, Mile2, ServiceNow, Oracle',
        role: 'Guarantees resume credibility with Fortune 500 vendors'
      },
      {
        name: 'Project Space & AI',
        badge: 'Innovation Incubator',
        avatar: '/assets/Project Space.png',
        focus: 'AI Ready Engineer, Claude, OpenAI, Full-stack SaaS',
        role: 'Converts theoretical know-how into deployed production apps'
      }
    ],
    presenterNotes:
      'Highlight how the four pillars complement one another. A student with strong Owl Coder scores and a Pega or Red Hat certification and an AI capstone is practically unbeatable in recruitment interviews.'
  },
  {
    id: 'outcomes',
    type: 'outcomes-summary',
    phaseNumber: '06',
    phaseLabel: 'STRATEGIC OUTCOMES',
    title: 'Transformational Value & ROI',
    subtitle: 'Institutional Impact, Placement Milestones & Accreditation Lift',
    timeframe: 'Graduation & Placement Impact',
    outcomesList: [
      {
        metric: '300%+',
        title: 'Higher Package Trajectory',
        description: 'Direct pipeline for students into Product MNCs and specialized enterprise roles offering premium salary packages.'
      },
      {
        metric: '100%',
        title: 'Verified Global Credentials',
        description: 'Every student walks out with authentic credentials from Red Hat, Oracle, Cisco, Pega, Mile2, or ServiceNow.'
      },
      {
        metric: 'Tier-1',
        title: 'NAAC & NBA Accreditation Boost',
        description: 'Extensive industry-academia collaboration metrics, live patents, and documented student innovation rubrics.'
      },
      {
        metric: 'GenAI Ready',
        title: 'Future-Proof Skill Readiness',
        description: 'Graduates enter the workforce as native AI orchestrators proficient in modern LLM architecture and GitHub Copilot.'
      }
    ],
    partnersDisplay: [
      { name: 'Red Hat', logo: '/assets/redhat.webp' },
      { name: 'Cisco', logo: '/assets/Cisco_Networking_Academy.svg.webp' },
      { name: 'Pega', logo: '/assets/pega.png' },
      { name: 'ServiceNow', logo: '/assets/sno_partner-network-logo.png' },
      { name: 'Automation Anywhere', logo: '/assets/Automation Anywhere.png' },
      { name: 'Mile2', logo: '/assets/mile2_authorized_training_center_8x_enhanced.png' },
      { name: 'OpenAI', logo: '/assets/openai_square.png' },
      { name: 'Anthropic Claude', logo: '/assets/claude.png' }
    ],
    callToAction: 'Ready to approve and launch the next generation of engineering excellence.',
    presenterNotes:
      'Conclude by emphasizing the return on investment for the institution and the profound career trajectory change for students. Open for Q&A.'
  }
];
