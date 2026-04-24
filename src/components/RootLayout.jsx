import { Outlet } from '@tanstack/react-router'
import Navbar from './Navbar'
import Footer from './Footer'

function RootLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
