import { useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AnnouncementBanner from './components/AnnouncementBanner';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './lib/auth';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SermonsPage from './pages/SermonsPage';
import SermonDetailPage from './pages/SermonDetailPage';
import EventsPage from './pages/EventsPage';
import MinistriesPage from './pages/MinistriesPage';
import ContactPage from './pages/ContactPage';
import PrayerPage from './pages/PrayerPage';
import GivePage from './pages/GivePage';
import LivePage from './pages/LivePage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const element = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/sermons', element: <SermonsPage /> },
    { path: '/sermons/:id', element: <SermonDetailPage /> },
    { path: '/events', element: <EventsPage /> },
    { path: '/ministries', element: <MinistriesPage /> },
    { path: '/contact', element: <ContactPage /> },
    { path: '/prayer', element: <PrayerPage /> },
    { path: '/give', element: <GivePage /> },
    { path: '/live', element: <LivePage /> },
    { path: '/gallery', element: <GalleryPage /> },
    { path: '/login', element: <LoginPage /> },
    {
      path: '/admin',
      element: (
        <RequireAuth>
          <AdminPage />
        </RequireAuth>
      ),
    },
    { path: '*', element: <NotFoundPage /> },
  ]);

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{element}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
