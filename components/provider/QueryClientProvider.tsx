// components/provider/QueryClientProvider.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider as TanstackProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Ensures QueryClient is created once per client instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <TanstackProvider client={queryClient}>
      {children}
    </TanstackProvider>
  );
}