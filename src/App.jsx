import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Investment from './components/Investment';
import Contact from './components/Contact';


export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Navbar />
      <Hero />
      <Experience />
      <Portfolio />
      <Investment />
      <Contact />
    </div>
  );
}
