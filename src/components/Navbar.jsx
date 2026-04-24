import { Link } from '@tanstack/react-router'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          Catalogo de Repuestos
        </Link>

        <nav className="nav-links">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link nav-link-active' }}
          >
            Inicio
          </Link>
          <Link
            to="/repuestos"
            className="nav-link"
            activeProps={{ className: 'nav-link nav-link-active' }}
          >
            Repuestos
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
