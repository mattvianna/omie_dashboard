import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
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
          <Header />
          <Sidebar />

          <main className="area-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
