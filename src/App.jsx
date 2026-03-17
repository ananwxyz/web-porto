import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Investment from './components/Investment';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Portfolio />
      <Investment />
      <Contact />
    </div>
  );
}
