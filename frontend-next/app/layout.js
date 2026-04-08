import './globals.css';

export const metadata = {
  title: 'CRUD Next.js',
  description: 'Exemplo de CRUD em Next.js consumindo API Express'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
