export const JOURNEY = [
  { kind: "banner", variant: "depart", km: "KM 000", year: "2021", label: "Departed" },
  {
    kind: "stop", side: "left", km: "KM 014",
    when: "2021 — 2023", title: "GMVV School",
    sub: "Higher Secondary · PCM + CS",
    notes: ["75% aggregate", "Math · Physics · Computer Science"],
  },
  {
    kind: "stop", side: "right", km: "KM 042", featured: true,
    when: "2023 — 2027", title: "Vellore Institute of Technology",
    sub: "B.Tech · Computer Science & Engineering",
    notes: ["CGPA 8.72 / 10", "DSA · OOP · System Design · Computer Architecture", "Projects: ALU Design, Maze Solver Bot, this portfolio"],
  },
  { kind: "sign", side: "left",  km: "KM 058", year: "2025", title: "OCI · Generative AI Professional", sub: "Oracle — Certification" },
  { kind: "sign", side: "right", km: "KM 061", year: "2025", title: "OCI · AI Foundations Associate",   sub: "Oracle — Certification" },
  { kind: "banner", variant: "here",    km: "KM 076", year: "2026", label: "You are here" },
  { kind: "banner", variant: "arrival", km: "KM 094", year: "2027", label: "Graduation · expected" },
];
