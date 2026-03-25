import type { Metadata } from 'next'
import localFont from 'next/font/local'
import DevShiftLoader from '@/components/ui/DevShiftLoader/DevShiftLoader'
import '@/styles/globals.css'
import '@/styles/typography.css'

const monaSans = localFont({
  src: [
    {
      path: '../../public/fonts/MonaSans-VariableFont_wdth,wght.woff2',
      style: 'normal',
    },
    {
      path: '../../public/fonts/MonaSans-Italic-VariableFont_wdth,wght.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-mona',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'DevShift',
  description: 'Marketing orientat firmelor de constructii',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={monaSans.variable}>
      <body>
        <DevShiftLoader />
        {children}
      </body>
    </html>
  )
}
