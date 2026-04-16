import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Designs from './components/Designs';
import Videos from './components/Videos';
import Teaching from './components/Teaching';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Designs />
        <Videos />
        <Teaching />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
