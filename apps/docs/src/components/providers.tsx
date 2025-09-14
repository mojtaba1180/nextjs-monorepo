"use client"

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';

// Dynamically import ModalProvider to avoid SSR issues
const ModalProvider = dynamic(
  () => import('@workspace/custom-ui').then(mod => ({ default: mod.ModalProvider })),
  { ssr: false }
);

const ModalManager = dynamic(
  () => import('@workspace/custom-ui').then(mod => ({ default: mod.ModalManager })),
  { ssr: false }
);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ModalProvider>
        {children}
        <ModalManager />
      </ModalProvider>
    </NextThemesProvider>
  );
}
