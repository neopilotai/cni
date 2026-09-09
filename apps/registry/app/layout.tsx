import './styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Packages | cni',
  description: 'Private Docker and OCI image registry for your team.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
