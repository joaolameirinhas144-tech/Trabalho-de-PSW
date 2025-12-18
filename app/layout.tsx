import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { HeroesProvider } from "./context/HeroesContext";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "League of Heroes - nº33481",
    description: "Projeto de PSW",
};


export default function RootLayout({children, header, footer}: Readonly<{
    children: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}>) {
    return (
        <html lang="pt">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroesProvider>
            <div className="page-wrapper">

                {header}

                <main className="page-content">
                    {children}
                </main>

                {footer}

            </div>
        </HeroesProvider>
        </body>
        </html>
    );
}