import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#00D4AA]/10 flex items-center justify-center mb-6">
        <span className="text-[#00D4AA] text-4xl font-bold">404</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
        Page Not Found
      </h1>
      <p className="text-[#8b929e] text-sm max-w-md mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back to creating amazing business cards.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4AA] hover:bg-[#00E8BC] text-[#090b10] text-sm font-bold rounded-lg transition-colors shadow-lg shadow-[#00D4AA]/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
