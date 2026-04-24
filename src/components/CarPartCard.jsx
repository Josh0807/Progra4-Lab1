function CarPartCard({ part }) {
  return (
    <article className="car-part-card">
      <div className="card-image-wrapper">
        {part.image ? (
          <img className="card-image" src={part.image} alt={part.name} />
        ) : (
          <div className="card-image-placeholder">Sin imagen</div>
        )}
      </div>

      <div className="card-body">
        <p className="card-label">Repuesto</p>
        <h3>{part.name}</h3>
        <p className="card-code">{part.category}</p>

        <div className="card-footer">
          <span className="card-brand">{part.brand}</span>
          <span className="card-price">{part.price}</span>
        </div>
      </div>
    </article>
  )
}

export default CarPartCard
