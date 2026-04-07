import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '5x5 Tic Tac Toe',
  description: 'A fun 5x5 Tic Tac Toe game',
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
