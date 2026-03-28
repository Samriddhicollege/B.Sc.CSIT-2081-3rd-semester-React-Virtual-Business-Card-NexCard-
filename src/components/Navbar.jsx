'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame, Menu, X, LogIn, LogOut, User as UserIcon, CreditCard, Sparkles, Wand2, Layers, Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UpgradeModal from './UpgradeModal';
import { useAuth } from './AuthProvider';
import { signOut } from '@/lib/auth';

const NAV_LINKS = [
  { label: 'AI Logo Maker', href: '#', icon: Sparkles, locked: true },
  { label: 'AI Designs', href: '#', icon: Wand2, locked: true },
  { label: 'Pricing', href: '/pricing', icon: Star },
  { label: 'My Cards', href: '/my-cards', icon: Layers },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e) => {
      if (!e.target.closest('[data-dropdown]')) setDropdownOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [dropdownOpen]);

  return (
    <>
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090b10]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-[#090b10]/80 backdrop-blur-xl border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#00b894] flex items-center justify-center shadow-md shadow-[#00D4AA]/20 group-hover:shadow-[#00D4AA]/40 group-hover:scale-105 transition-all duration-200">
            <Flame className="w-4 h-4 text-[#090b10]" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Nex<span className="bg-gradient-to-r from-[#00D4AA] to-[#00E8BC] bg-clip-text text-transparent">Card</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            if (link.locked) {
              return (
                <button
                  key={link.label}
                  onClick={() => setUpgradeFeature(link.label)}
                  className="relative text-[13px] px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium text-[#8b929e] hover:text-white group/link cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#5c6370] group-hover/link:text-white transition-colors" />
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-[13px] px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium text-[#8b929e] hover:text-white group/link"
              >
                <Icon className="w-3.5 h-3.5 text-[#5c6370] group-hover/link:text-white transition-colors" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="relative" data-dropdown>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hidden md:flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-[#141720]/80 border border-white/[0.08] hover:border-white/[0.15] hover:bg-[#1a1d26] transition-all duration-200"
              >
                <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full ring-2 ring-[#00D4AA]/20" />
                <span className="text-[13px] font-semibold text-white max-w-[90px] truncate">{user.name}</span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2.5 w-52 bg-[#111318]/95 backdrop-blur-2xl border border-white/[0.1] rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3.5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full ring-2 ring-[#00D4AA]/20" />
                        <div className="min-w-0">
                          <p className="text-white text-xs font-bold truncate">{user.name}</p>
                          <p className="text-[#8b929e] text-[10px] truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1.5">
                      <Link to="/my-cards" className="w-full text-left px-4 py-2.5 text-xs text-[#a0a8b8] hover:bg-white/[0.04] hover:text-white flex items-center gap-2.5 transition-colors">
                        <CreditCard className="w-3.5 h-3.5" /> My Cards
                      </Link>
                      <button className="w-full text-left px-4 py-2.5 text-xs text-[#a0a8b8] hover:bg-white/[0.04] hover:text-white flex items-center gap-2.5 transition-colors">
                        <UserIcon className="w-3.5 h-3.5" /> My Account
                      </button>
                    </div>

                    <div className="border-t border-white/[0.06] py-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-xs text-red-400/80 hover:bg-red-500/[0.08] hover:text-red-400 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 text-[13px] px-4 py-2 rounded-lg bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] hover:bg-[#00D4AA]/15 hover:border-[#00D4AA]/30 transition-all duration-200 font-semibold"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-[#0d0f14] border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                if (link.locked) {
                  return (
                    <button
                      key={link.label}
                      onClick={() => { setMobileOpen(false); setUpgradeFeature(link.label); }}
                      className="flex items-center gap-3 text-sm px-4 py-3 rounded-xl transition-all text-[#8b929e] hover:text-white hover:bg-white/[0.04] w-full text-left"
                    >
                      <Icon className="w-4 h-4 text-[#5c6370]" />
                      {link.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-sm px-4 py-3 rounded-xl transition-all text-[#8b929e] hover:text-white hover:bg-white/[0.04]"
                  >
                    <Icon className="w-4 h-4 text-[#5c6370]" />
                    {link.label}
                  </Link>
                );
              })}

              <div className="h-px bg-white/[0.06] my-3" />

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#111318]/50 rounded-xl mb-2">
                    <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full ring-2 ring-[#00D4AA]/20" />
                    <div>
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-[#8b929e]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="w-full text-left flex items-center gap-3 text-sm px-4 py-3 rounded-xl text-red-400/80 hover:bg-red-500/[0.08] hover:text-red-400 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] font-semibold hover:bg-[#00D4AA]/15 transition-all"
                >
                  <LogIn className="w-4 h-4" /> Sign in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={!!upgradeFeature}
        onClose={() => setUpgradeFeature(null)}
        feature={upgradeFeature || ''}
      />
    </>
  );
}
