import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiC, SiJava,
  SiReact, SiNextdotjs, SiFastapi, SiNodedotjs, SiExpress, SiHtml5, SiCss3, SiTailwindcss, SiVite,
  SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiNumpy, SiPandas,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiSqlite,
  SiArduino, SiRaspberrypi,
  SiGit, SiGithub, SiDocker, SiAmazonwebservices, SiLinux, SiPostman, SiVisualstudiocode, SiFigma, SiVercel, SiNetlify,
  SiGnubash,
} from 'react-icons/si';

import { TbBinaryTree, TbNetwork, TbCpu } from 'react-icons/tb';
import { BsDatabaseGear } from 'react-icons/bs';
import { MdMemory } from 'react-icons/md';

const skills = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C++', icon: SiCplusplus },
      { name: 'C', icon: SiC },
      { name: 'Java', icon: SiJava },
      { name: 'Bash', icon: SiGnubash },
    ],
  },
  {
    category: 'Web Development',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    category: 'AI & Machine Learning',
    items: [
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'OpenCV', icon: SiOpencv },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'Pandas', icon: SiPandas },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Redis', icon: SiRedis },
      { name: 'SQLite', icon: SiSqlite },
    ],
  },
  {
    category: 'Hardware & Embedded',
    items: [
      { name: 'Arduino', icon: SiArduino },
      { name: 'Raspberry Pi', icon: SiRaspberrypi },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'AWS', icon: SiAmazonwebservices },
      { name: 'Linux', icon: SiLinux },
      { name: 'Postman', icon: SiPostman },
      { name: 'VS Code', icon: SiVisualstudiocode },
      { name: 'Figma', icon: SiFigma },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Netlify', icon: SiNetlify },
    ],
  },
  {
    category: 'Core CS',
    items: [
      { name: 'DSA', icon: TbBinaryTree },
      { name: 'OOP', icon: BsDatabaseGear },
      { name: 'Networking', icon: TbNetwork },
      { name: 'OS', icon: MdMemory },
      { name: 'Architecture', icon: TbCpu },
    ],
  },
];

export default skills;
