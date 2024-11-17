import React from 'react'
import 'easymde/dist/easymde.min.css'

import { Toaster } from 'sonner'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

export default Layout
