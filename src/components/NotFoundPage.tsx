// components/NotFoundPage.tsx
import { ActiveTab } from '../types';

interface NotFoundPageProps {
  onNavigate: (tab: ActiveTab) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center space-y-4 px-6">
        <span className="text-5xl">🔍</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          Page Not Found
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="text-sm text-primary font-bold hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
