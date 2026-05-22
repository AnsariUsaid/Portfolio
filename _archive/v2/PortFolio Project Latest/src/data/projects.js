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
  {
    id: 7,
    title: 'HinglishSarc',
    subtitle: 'Emotion Trajectory for Sarcasm Detection',
    description:
      'Research project using IndicBERT and BiLSTM to detect sarcasm in Hindi-English code-mixed text. Models emotion trajectories across conversational threads to capture sentiment-emotion mismatches.',
    tech: ['Python', 'PyTorch', 'IndicBERT', 'BiLSTM', 'NLP'],
    github: 'https://github.com/AnsariUsaid/HinglishSarc-Emotion-Trajectory',
    live: null,
  },
  {
    id: 8,
    title: 'ScalSQL',
    subtitle: 'Cloud Text-to-SQL System',
    description:
      'Scalable cloud-based Text-to-SQL query processing system deployed on AWS. Converts natural language queries into executable SQL with automatic scaling, load balancing, and high availability.',
    tech: ['JavaScript', 'AWS Lambda', 'API Gateway', 'RDS', 'Serverless'],
    github: 'https://github.com/AnsariUsaid/ScalSQL',
    live: null,
  },
  {
    id: 9,
    title: 'SalesFlow CRM',
    subtitle: 'Automobile Parts Sales CRM',
    description:
      'Custom CRM for automobile parts businesses managing call-based sales operations. Features order tracking, team assignment, payment processing via Authorize.net, and role-based access.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Clerk'],
    github: 'https://github.com/AnsariUsaid/salesflow-CRM',
    live: null,
  },
  {
    id: 10,
    title: 'Video Reconstruction',
    subtitle: 'Jumbled Frame Reordering',
    description:
      'Reconstructs jumbled video frames using YOLOv8x person detection, motion modeling, and hybrid SSIM-based optimization. Combines trajectory prediction with 2-opt search for smooth reconstruction.',
    tech: ['Python', 'YOLOv8x', 'OpenCV', 'SSIM', 'Computer Vision'],
    github: 'https://github.com/AnsariUsaid/jumbled-video-reconstruction',
    live: null,
  },
  {
    id: 11,
    title: 'Data Warehouse',
    subtitle: 'SQL Server Medallion Architecture',
    description:
      'Enterprise data warehouse implementing Bronze, Silver, Gold layers. Handles ETL from ERP/CRM CSV sources through progressive refinement to analytics-ready star schemas.',
    tech: ['T-SQL', 'SQL Server', 'Data Engineering', 'ETL'],
    github: 'https://github.com/AnsariUsaid/SQL-DataWareHouse',
    live: null,
  },
  {
    id: 12,
    title: 'React Quiz App',
    subtitle: 'Interactive Timed Quiz',
    description:
      'Interactive quiz application with timers, scoring, and progress tracking. Features 30-second countdown per question, high score persistence, and useReducer for state management.',
    tech: ['React 19', 'JSON Server', 'CSS3', 'useReducer'],
    github: 'https://github.com/AnsariUsaid/React-QuizApp',
    live: null,
  },
];

export default projects;
