'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
    session,
    children
}) {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <SessionProvider session={session}>{children}</SessionProvider>
            </ThemeProvider>
        </>
    );
}
