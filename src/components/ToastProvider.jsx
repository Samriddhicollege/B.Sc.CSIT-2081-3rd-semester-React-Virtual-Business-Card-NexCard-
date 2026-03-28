'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

const ICONS = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: { bg: 'bg-[#00D4AA]/10', border: 'border-[#00D4AA]/25', text: 'text-[#00D4AA]', icon: 'bg-[#00D4AA]/20' },
  error: { bg: 'bg-red-500/10', border: 'border-red-500/25', text: 'text-red-400', icon: 'bg-red-500/20' },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400', icon: 'bg-amber-500/20' },
  info: { bg: 'bg-blue-400/10', border: 'border-blue-400/25', text: 'text-blue-400', icon: 'bg-blue-400/20' },
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const Icon = ICONS[t.type] || Info;
            const colors = COLORS[t.type] || COLORS.info;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl ${colors.bg} ${colors.border} border backdrop-blur-2xl shadow-2xl shadow-black/30 max-w-sm`}
              >
                <div className={`w-7 h-7 rounded-lg ${colors.icon} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                </div>
                <span className="text-white text-sm font-medium flex-1">{t.message}</span>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-[#8b929e] hover:text-white transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
