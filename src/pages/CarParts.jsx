import { useEffect, useState } from 'react'
import CarPartCard from '../components/CarPartCard'

const INITIAL_VISIBLE_ITEMS = 10

function formatPrice(value, fallbackValue) {
  if (value === undefined || value === null || value === '') {
    return fallbackValue || 'Sin precio'
  }

  if (typeof value === 'number') {
    return `$${value}`
  }

  return String(value)
}

function normalizePart(item, index) {
  return {
    id: item.id || item.articleId || item.partId || index,
    name:
      item.name ||
      item.articleProductName ||
      item.partName ||
      item.title ||
      `Repuesto ${index + 1}`,
    brand:
      item.brand ||
      item.supplierName ||
      item.manufacturer ||
      'Marca no disponible',
    category:
      item.category ||
      item.articleNo ||
      item.type ||
      'Codigo no disponible',
    price: formatPrice(item.price || item.cost, item.supplierId ? `#${item.supplierId}` : ''),
    image: item.image || item.s3image || item.photo || item.thumbnail || '',
  }
}

function getItemsFromResponse(data) {
  if (Array.isArray(data?.record?.items)) {
    return data.record.items
  }

  if (Array.isArray(data?.record?.articles)) {
    return data.record.articles
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  return []
}

function CarParts() {
  const [parts, setParts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(import.meta.env.VITE_API_URL, {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': import.meta.env.VITE_JSONBIN_ACCESS_KEY,
          },
        })

        if (!response.ok) {
          throw new Error('No se pudieron obtener los repuestos.')
        }

        const data = await response.json()
        const items = getItemsFromResponse(data)
        const normalizedParts = items.map((item, index) =>
          normalizePart(item, index),
        )

        setParts(normalizedParts)
      } catch (fetchError) {
        setError(fetchError.message || 'Ocurrio un error inesperado.')
      } finally {
        setLoading(false)
      }
    }

    fetchParts()
  }, [])

  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const visibleParts = filteredParts.slice(0, visibleCount)
  const remainingItems = filteredParts.length - visibleCount
  const canLoadMore = remainingItems > 0

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setVisibleCount(INITIAL_VISIBLE_ITEMS)
  }

  const handleLoadMore = () => {
    setVisibleCount((currentValue) => currentValue + INITIAL_VISIBLE_ITEMS)
  }

  return (
    <section className="page-section">
      <div className="catalog-shell container">
        <div className="catalog-intro">
          <p className="catalog-kicker">Catalogo</p>
          <h1>Repuestos</h1>
          {!loading && !error && (
            <p className="catalog-count">
              Mostrando {visibleParts.length} de {filteredParts.length} articulos
            </p>
          )}
        </div>

        {loading && (
          <div className="loading-panel">
            <div className="loader-ring"></div>
            <p>Cargando repuestos desde la API...</p>
          </div>
        )}

        {!loading && (
          <>
            <div className="search-box">
              <input
                id="search"
                type="text"
                placeholder="Buscar por nombre o codigo..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {error && <p className="status-message error-message">{error}</p>}

            {!error && filteredParts.length === 0 && (
              <p className="status-message">No hay resultados para mostrar.</p>
            )}

            {!error && filteredParts.length > 0 && (
              <>
                <div className="parts-grid">
                  {visibleParts.map((part) => (
                    <CarPartCard key={part.id} part={part} />
                  ))}
                </div>

                {canLoadMore && (
                  <div className="load-more-wrapper">
                    <button
                      type="button"
                      className="load-more-button"
                      onClick={handleLoadMore}
                    >
                      Ver mas ({Math.min(INITIAL_VISIBLE_ITEMS, remainingItems)} de {remainingItems} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default CarParts
