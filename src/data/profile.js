export const PROFILE = {
  name: "Ansari Usaid Anzer",
  shortName: "Ansari U. Anzer",
  role: "Computer Science Engineer",
  bio: "3rd-year B.Tech CSE at VIT Vellore. I build at the intersection of artificial intelligence, full-stack systems, and cloud infrastructure — turning research-grade ideas into things people actually use.",
  longBio: [
    "I'm an aspiring IT professional and 3rd-year B.Tech Computer Science student at VIT Vellore (CGPA 8.86), drawn to the messy intersection where machine learning meets product. I like problems that need both a model and a UI.",
    "My toolbelt spans deep learning with TensorFlow & PyTorch, full-stack work with React and FastAPI, and cloud deployments on AWS. I'm Oracle-certified in Generative AI and AI Foundations, and I read papers the way other people read novels.",
    "Currently looking for internships and collaborations in AI/ML, full-stack engineering, and cloud — particularly anything that has to ship to real users."
  ],
  location: "Vellore, Tamil Nadu — IN",
  email: "ansariusaid2005@gmail.com",
  phone: "+91 90225 43814",
  cgpa: "8.86 / 10",
  status: "Available for Summer '26",
  socials: [
    { label: "GitHub",    handle: "AnsariUsaid",    href: "https://github.com/AnsariUsaid" },
    { label: "LinkedIn",  handle: "in/ansariusaid", href: "https://www.linkedin.com/in/ansariusaid/" },
    { label: "Instagram", handle: "ansari_usaid_",  href: "https://www.instagram.com/ansari_usaid_/" },
  ],
};

export const NAV = [
  { id: "intro",     label: "Index",         n: "00" },
  { id: "about",     label: "About",         n: "01" },
  { id: "work",      label: "Selected Work", n: "02" },
  { id: "skills",    label: "Toolbelt",      n: "03" },
  { id: "education", label: "Education",     n: "04" },
  { id: "contact",   label: "Contact",       n: "05" },
];

export const LANG_DETAIL = [
  { code: "EN", name: "English",  level: "fluent"   },
  { code: "HI", name: "Hindi",    level: "native"   },
  { code: "MR", name: "Marathi",  level: "native"   },
  { code: "UR", name: "Urdu",     level: "native",  display: "mother tongue" },
  { code: "TR", name: "Turkish",  level: "learning" },
  { code: "JP", name: "Japanese", level: "learning" },
];

export const NOW_PLAYING = [
  {
    k: "Building", title: "Quant-Aware Replay", meta: "Ideation · pre-sprint",
    status: "active", viz: "progress", vizData: { value: 8, total: 100, label: "ideation" },
  },
  {
    k: "Reading", title: "To Engineer is Human", meta: "Henry Petroski · Ch. 1 / 14",
    status: "pinned", viz: "pages", vizData: { current: 1, total: 14 },
  },
  {
    k: "Learning", title: "QLoRA · PEFT · Quant", meta: "+ Turkish · + how to nap · + DSA",
    status: "looping", viz: null, vizData: null,
  },
  {
    k: "Obsessed", title: "Eval harness engineering", meta: "Art > science, allegedly",
    status: "spiking", viz: "spark", vizData: { points: [2, 5, 3, 7, 4, 9, 6, 11, 8, 14, 12, 18, 15, 22] },
  },
];
