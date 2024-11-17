import React from 'react'

type StudioLayoutProps = {
  children: React.ReactNode
}

const StudioLayout = ({ children }: StudioLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default StudioLayout
