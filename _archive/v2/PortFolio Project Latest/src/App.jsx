import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Activity from './components/Activity/Activity';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Activity />
      <Contact />
    </>
  );
}

export default App;
