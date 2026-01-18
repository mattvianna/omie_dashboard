import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Omie Dashboard",
  description: "A dashboard layout challenge using Next.js and SCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="dashboard-grid">
          <header className="area-header">
            Header (Logo | Busca | User)
          </header>

          <aside className="area-sidebar">
            Sidebar (Navegação)
          </aside>

          <main className="area-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
