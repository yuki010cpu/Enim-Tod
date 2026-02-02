import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import LoadingScreen from './components/LoadingScreen';
import NotFoundPage from './pages/NotFoundPage';
import OngoingPage from './pages/OngoingPage';
import AnimeListPage from './pages/AnimeListPage';

/* ================= ABOUT PAGE ================= */
const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto text-gray-300 leading-relaxed">
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#00ffc6]">
      Tentang ENIM TOD
    </h1>

    <div className="space-y-8 bg-gray-800/50 p-6 md:p-8 rounded-lg">
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-white">
          Selamat Datang di ENIM TOD
        </h2>
        <p>
          ENIM TOD lahir dari kecintaan kami terhadap dunia anime dan keinginan
          untuk menciptakan platform yang fungsional serta membuka{' '}
          <a
            href="https://money.kompas.com/read/2025/09/26/152000626/pemerintahan-prabowo-janji-buka-19-juta-lapangan-kerja-kemenaker-optimistis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ffc6] hover:underline"
          >
            19 juta lapangan pekerjaan
          </a>.
        </p>
      </section>
    </div>
  </div>
);

/* ================= APP ================= */
const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) return <LoadingScreen />;

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/anime/:id" element={<DetailPage />} />
            <Route path="/ongoing" element={<OngoingPage />} />
            <Route path="/list" element={<AnimeListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
