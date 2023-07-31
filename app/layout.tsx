import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Weather',
  description: 'Created by Raghavendra Singh',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
