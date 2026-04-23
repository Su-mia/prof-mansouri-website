import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Designs from './components/Designs';
import Videos from './components/Videos';
import Teaching from './components/Teaching';
import Societies from './components/Societies';
import Contact from './components/Contact';
import Footer from './components/Footer';

import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

function SiteLayout() {
  return (
    <div className="site-layout">
      <Navbar />
      <div className="site-main">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="research" element={<Research />} />
        <Route path="designs" element={<Designs />} />
        <Route path="videos" element={<Videos />} />
        <Route path="teaching" element={<Teaching />} />
        <Route path="societies" element={<Societies />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
