import { useState } from "react";
import "./BuscarPokemon.css";

export default function BuscarPokemon() {
    const [nombre, setNombre] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState("");

    const buscarPokemon = async () => {
        if (!nombre.trim()) {
            setError("Por favor ingresa un nombre de Pokémon");
            setPokemon(null);
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
            if (!response.ok) throw new Error("Pokémon no encontrado");
            
            const data = await response.json();
            setPokemon(data);
            setError("");
        } catch (error) {
            console.error("Error al buscar pokemon:", error);
            setPokemon(null);
            setError("😔 Pokémon no encontrado. Intenta con otro nombre.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") buscarPokemon();
    };

    return (
        <div className="pokemon-wrapper">
            <div className="pokemon-container">
                <div className="pokemon-header">
                    <h1>🔴⚪ Pokédex</h1>
                    <p className="pokemon-subtitle">Encuentra tu pokémon favorito</p>
                </div>

                <div className="search-box">
                    <input 
                        type="text" 
                        className="pokemon-input"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ej: Pikachu, Dragonite..."
                    />
                    <button className="search-button" onClick={buscarPokemon}>
                        🔍 Buscar
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {pokemon && (
                    <div className="pokemon-result">
                        <div className="result-header">
                            <h2 className="result-name">{pokemon.name}</h2>
                            <span className="result-id">#{String(pokemon.id).padStart(3, '0')}</span>
                        </div>

                        <div className="image-container">
                            <img 
                                className="pokemon-img"
                                src={pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default} 
                                alt={pokemon.name}
                            />
                        </div>

                        <div className="stats-container">
                            <div className="stat-card">
                                <span className="stat-label">📏 Altura</span>
                                <span className="stat-value">{(pokemon.height * 0.1).toFixed(2)} m</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">⚖️ Peso</span>
                                <span className="stat-value">{(pokemon.weight * 0.1).toFixed(2)} kg</span>
                            </div>
                        </div>
                    </div>
                )}

                {!pokemon && !error && (
                    <div className="empty-state">
                        <p>✨ Busca un Pokémon para empezar la aventura</p>
                    </div>
                )}
            </div>
        </div>
    );
}