'use client';
import { Download, UserPlus } from 'lucide-react';
import { downloadVCard } from '@/utils/vcard';

/**
 * "Save Contact" button that downloads a .vcf vCard file
 */
export default function SaveContactButton({ person, variant = 'primary', className = '' }) {
  const handleSave = () => {
    downloadVCard(person);
  };

  if (variant === 'primary') {
    return (
      <button
        onClick={handleSave}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] font-bold text-sm transition-all shadow-lg shadow-[#00D4AA]/25 active:scale-[0.97] ${className}`}
        aria-label="Save contact to phone"
      >
        <UserPlus className="w-4 h-4" />
        Save Contact
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all active:scale-[0.97] ${className}`}
      aria-label="Save contact to phone"
    >
      <Download className="w-4 h-4" />
      Save Contact
    </button>
  );
}
