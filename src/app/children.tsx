'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://graphqlzero.almansi.me/api',
    cache: new InMemoryCache(),
  });

export default function ChildrenLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <ApolloProvider client={client}>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </ApolloProvider>
    );
  }