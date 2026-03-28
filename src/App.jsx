import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import ToastProvider from './components/ToastProvider';
import CursorSpotlight from './components/CursorSpotlight';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const MyCardsPage = lazy(() => import('./pages/MyCardsPage'));
const CustomizePage = lazy(() => import('./pages/CustomizePage'));
const VirtualCardPage = lazy(() => import('./pages/VirtualCardPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00D4AA]/30 border-t-[#00D4AA] rounded-full animate-spin" />
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const isCardPage = location.pathname.startsWith('/card/');

  return (
    <>
      {!isCardPage && <CursorSpotlight />}
      {!isCardPage && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/customize/:id" element={<ProtectedRoute><CustomizePage /></ProtectedRoute>} />
          <Route path="/card/:slug" element={<VirtualCardPage />} />
          <Route path="/my-cards" element={<ProtectedRoute><MyCardsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {!isCardPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppShell />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
