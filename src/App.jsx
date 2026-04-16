import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminHome from './pages/AdminHome'
import AdminEvents from './pages/AdminEvents'
import AdminEventForm from './pages/AdminEventForm'
import AdminGallery from './pages/AdminGallery'
import AdminGalleryForm from './pages/AdminGalleryForm'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminEventForm />} />
          <Route path="events/edit/:id" element={<AdminEventForm />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="gallery/new" element={<AdminGalleryForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
