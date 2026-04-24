import './App.css'

function App() {
  return (
    <main className="document-page">
      <section className="hero-panel">
        <p className="eyebrow">Documento digitalizado</p>
        <h1>Visualizador del documento</h1>
        <p className="hero-copy">
          El archivo fue integrado al proyecto para que podas abrirlo y revisarlo
          directamente desde la aplicacion en Visual Studio Code.
        </p>

        <div className="hero-actions">
          <a className="primary-action" href="/documento.pdf" target="_blank" rel="noreferrer">
            Abrir en una pestaña
          </a>
          <a className="secondary-action" href="/documento.pdf" download>
            Descargar PDF
          </a>
        </div>
      </section>

      <section className="content-grid">
        <article className="info-card">
          <h2>Como usarlo</h2>
          <p>
            Si ejecutas el proyecto con Vite, el documento se muestra abajo
            embebido dentro de la interfaz. Tambien queda disponible en la ruta
            <code>/documento.pdf</code>.
          </p>
        </article>

        <article className="info-card">
          <h2>Archivo agregado</h2>
          <p>
            El PDF original fue copiado al directorio <code>public/</code> para
            que el navegador pueda servirlo sin modificar su contenido.
          </p>
        </article>
      </section>

      <section className="viewer-shell" aria-label="Vista previa del PDF">
        <div className="viewer-header">
          <div>
            <p className="viewer-label">Vista previa</p>
            <h2>documento.pdf</h2>
          </div>
          <a className="text-action" href="/documento.pdf" target="_blank" rel="noreferrer">
            Ver completo
          </a>
        </div>

        <iframe
          className="pdf-frame"
          src="/documento.pdf"
          title="Documento PDF"
        />
      </section>
    </main>
  )
}

export default App
