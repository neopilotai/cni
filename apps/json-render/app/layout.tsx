import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "json-render — Generative UI",
  description: "A containerized json-render generative UI showcase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-[#f5f6f2]"><body>{children}</body></html>;
}
