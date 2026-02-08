import { ReactNode } from 'react';

interface ValentineLayoutProps {
  children: ReactNode;
}

export function ValentineLayout({ children }: ValentineLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="valentine-card rounded-3xl bg-white/90 p-6 shadow-2xl backdrop-blur-sm dark:bg-pink-950/80 sm:p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
