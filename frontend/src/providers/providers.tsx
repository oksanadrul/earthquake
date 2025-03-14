'use client';

import { ApolloProvider } from '@apollo/client';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import { client } from '@lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <HeroUIProvider>
        <ToastProvider />
        {children}
      </HeroUIProvider>
    </ApolloProvider>
  );
}
