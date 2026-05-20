import '../app/globals.css'

export const metadata = {
  title: 'Limitless Robotics',
  description: 'Next.js migration of the Limitless Robotics frontend experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
