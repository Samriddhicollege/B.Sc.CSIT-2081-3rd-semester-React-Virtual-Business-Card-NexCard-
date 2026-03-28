import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import ToastProvider from './components/ToastProvider';
import CursorSpotlight from './components/CursorSpotlight';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyCardsPage from './pages/MyCardsPage';
import CustomizePage from './pages/CustomizePage';
import VirtualCardPage from './pages/VirtualCardPage';
import PricingPage from './pages/PricingPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <CursorSpotlight />
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
            <Route path="/customize/:id" element={<ProtectedRoute><CustomizePage /></ProtectedRoute>} />
            <Route path="/card/:slug" element={<ProtectedRoute><VirtualCardPage /></ProtectedRoute>} />
            <Route path="/my-cards" element={<ProtectedRoute><MyCardsPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
