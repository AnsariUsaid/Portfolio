const projects = [
  {
    id: 1,
    title: 'AI Chess Bot',
    subtitle: 'Human-like Play Engine',
    description:
      'Deep-learning chess engine trained on thousands of human games to predict natural, human-like moves. Built with a CNN that encodes board positions and outputs likely next moves based on real PGN data.',
    tech: ['Python', 'TensorFlow', 'CNN', 'NumPy'],
    github: 'https://github.com/AnsariUsaid/ML_Chess_project',
    live: null,
  },
  {
    id: 2,
    title: 'AI Interview App',
    subtitle: 'Full-Stack LLM Platform',
    description:
      'AI-powered interview platform that parses resumes, generates dynamic questions, evaluates responses, and produces automated feedback using LLM APIs. Built with React, Redux Toolkit, and FastAPI.',
    tech: ['React', 'FastAPI', 'Redux', 'Tailwind', 'LLM APIs'],
    github: 'https://github.com/AnsariUsaid/ai-interview-application',
    live: null,
  },
  {
    id: 3,
    title: 'To-Do Application',
    subtitle: 'Full-Stack Task Manager',
    description:
      'Complete task-management app with secure JWT authentication, RESTful CRUD operations, Jinja-templated pages, and responsive UI for effortless task management.',
    tech: ['Python', 'FastAPI', 'Jinja2', 'HTML/CSS', 'JWT'],
    github: 'https://github.com/AnsariUsaid',
    live: null,
  },
  {
    id: 4,
    title: 'Education Portal',
    subtitle: 'AWS Cloud Assignment System',
    description:
      'Multi-role educational platform where students upload assignments and teachers manage submissions. Integrated with AWS S3 for scalable file storage.',
    tech: ['React', 'TypeScript', 'FastAPI', 'AWS S3', 'JWT'],
    github: 'https://github.com/AnsariUsaid/Education_portal_using-s3',
    live: null,
  },
  {
    id: 5,
    title: 'Portfolio Website',
    subtitle: 'Personal Portfolio',
    description:
      'Responsive, mobile-friendly personal portfolio with smooth scrolling, custom CSS animations, and GitHub Pages hosting.',
    tech: ['React', 'Framer Motion', 'CSS', 'Vite'],
    github: 'https://github.com/AnsariUsaid/Portfolio',
    live: 'https://ansariusaid.github.io/Portfolio',
  },
  {
    id: 6,
    title: 'Healthcare System',
    subtitle: 'FHIR Interoperability',
    description:
      'Healthcare data-exchange system using FHIR standards for structured, secure communication across hospitals. Features patient-matching logic and emergency data access workflows.',
    tech: ['SQL', 'PL/SQL', 'FHIR', 'REST APIs', 'Python'],
    github: 'https://github.com/Ibrubicks/healthcare-interoperability-system',
    live: null,
  },
];

export default projects;
