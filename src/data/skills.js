export const SKILLS = [
  {
    group: "Languages", n: "01",
    items: [
      { name: "C",          level: 5, since: 2023, note: "Where the abstractions stop lying.",      usedIn: [] },
      { name: "Java",       level: 4, since: 2024, note: "OOP principles and coursework.",           usedIn: [] },
      { name: "JavaScript", level: 5, since: 2024, note: "Browser, Node, and everything between.",  usedIn: ["01","05"] },
      { name: "TypeScript", level: 4, since: 2025, note: "Strict mode or it didn't happen.",        usedIn: ["01","02","03","05"] },
      { name: "Python",     level: 3, since: 2023, note: "Scripting, data work, and ML pipelines.", usedIn: ["02","03","04","06"] },
      { name: "C++",        level: 3, since: 2023, note: "Comfort zone for systems & DSA.",          usedIn: [] },
    ],
  },
  {
    group: "Frontend", n: "02",
    items: [
      { name: "React",         level: 5, since: 2025, note: "Hooks-first, component-thinking.",   usedIn: ["01","02","03","05"] },
      { name: "Tailwind",      level: 5, since: 2025, note: "Utility-first, with restraint.",     usedIn: ["01","02"] },
      { name: "Redux Toolkit", level: 4, since: 2025, note: "Slices, RTK Query, no boilerplate.", usedIn: ["02"] },
      { name: "Next.js",       level: 4, since: 2025, note: "App router, RSCs, server actions.",  usedIn: ["01"] },
      { name: "Figma",         level: 3, since: 2023, note: "Wireframe → high-fidelity flow.",    usedIn: [] },
    ],
  },
  {
    group: "Backend & Data", n: "03",
    items: [
      { name: "FastAPI",  level: 5, since: 2024, note: "Async, typed, ships in a weekend.",        usedIn: ["02","03"] },
      { name: "REST",     level: 5, since: 2024, note: "Versioned routes, sensible status codes.", usedIn: ["02","03","05"] },
      { name: "SQL",      level: 5, since: 2024, note: "Schemas, joins, indexes that matter.",     usedIn: ["01","03"] },
      { name: "GraphQL",  level: 4, since: 2024, note: "Apollo Server + Prisma, typed resolvers.", usedIn: ["01"] },
      { name: "JWT Auth", level: 4, since: 2024, note: "Refresh tokens, role-based access.",       usedIn: ["01","03"] },
      { name: "Node.js",  level: 4, since: 2024, note: "Express + tooling scripts.",               usedIn: ["01","05"] },
    ],
  },
  {
    group: "AI / ML", n: "04",
    items: [
      { name: "Deep Learning",     level: 4, since: 2024, note: "Backprop, batch norm, attention — theory and implementation.",      usedIn: ["04"] },
      { name: "CNNs",              level: 4, since: 2024, note: "Feature maps, pooling, residual connections, custom architectures.", usedIn: [] },
      { name: "Foundation Models", level: 5, since: 2024, note: "Structured prompting, function calling, evals, fine-tuning APIs.",  usedIn: ["02","05"] },
      { name: "PyTorch",           level: 3, since: 2025, note: "Custom training loops, autograd, checkpoint serialisation.",        usedIn: ["04"] },
      { name: "TensorFlow",        level: 4, since: 2025, note: "Keras high-level API, transfer learning, model export.",            usedIn: [] },
      { name: "RAG",               level: 3, since: 2025, note: "Dense retrieval, vector stores, context-grounded generation.",      usedIn: ["02"] },
    ],
  },
  {
    group: "Cloud & Infra", n: "05",
    items: [
      { name: "AWS",        level: 4, since: 2024, note: "S3, Lambda, SageMaker, RDS, EC2 — designed and deployed end-to-end.", usedIn: ["03","05"] },
      { name: "Docker",     level: 3, since: 2024, note: "Containerised services, compose for local full-stack stacks.",        usedIn: ["01"] },
      { name: "OCI",        level: 4, since: 2025, note: "Oracle Cloud certified — Gen-AI and compute services.",               usedIn: [] },
      { name: "Vercel",     level: 3, since: 2025, note: "Edge deployments, preview environments, serverless functions.",       usedIn: ["05"] },
      { name: "Git/GitHub", level: 5, since: 2021, note: "Rebase, squash, protected main — no cowboy pushes.",                  usedIn: ["01","02","03","04","05","06"] },
    ],
  },
  {
    group: "Embedded", n: "06",
    items: [
      { name: "Arduino",  level: 4, since: 2023, note: "Sensor fusion, PWM control, real-time interrupt handling.", usedIn: [] },
      { name: "Sensors",  level: 4, since: 2023, note: "IR, ultrasonic, IMU — noise filtering and calibration.",    usedIn: [] },
      { name: "Verilog",  level: 3, since: 2024, note: "Combinational + sequential logic, ALU and FSM design.",     usedIn: [] },
      { name: "Assembly", level: 3, since: 2024, note: "MIPS ISA — register allocation, memory addressing, traps.", usedIn: [] },
    ],
  },
];
