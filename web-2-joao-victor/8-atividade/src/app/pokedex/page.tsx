"use client"
import Head from 'next/head'
import { useEffect, useState } from 'react';
import './pokemon-styles.css';
import './searchBar.css'
import './pokemon-type-styles.css'
import Header from '../components/Header';



interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

const PokemonPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritePokemonList, setFavoritePokemonList] = useState<number[]>([]);



  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const maxPokemons: number = 200;

        const api: string = "https://pokeapi.co/api/v2/pokemon";

        const res = await fetch(`${api}/?limit=${maxPokemons}`);
        const data: { results: { name: string, url: string }[] } = await res.json();

        const updatedPokemonList: Pokemon[] = await Promise.all(
          data.results.map(async (pokemonData) => {
            const pokemonRes = await fetch(pokemonData.url);
            const pokemonDetails = await pokemonRes.json();

            const types = pokemonDetails.types.map(
              (type: { type: { name: string } }) => type.type.name
            );

            return {
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              imageUrl: pokemonDetails.sprites.front_default,
              types: types
            };
          })
        );

        setPokemonList(updatedPokemonList);
      } catch (error) {
        console.log('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    
  };

  const toggleFavorite = (pokemonId: number) => {
    if (favoritePokemonList.includes(pokemonId)) {

      setFavoritePokemonList(favoritePokemonList.filter((id) => id !== pokemonId));
    } else {
      setFavoritePokemonList([...favoritePokemonList, pokemonId]);
    }
  };

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className='header'>
        <Header />
      </div>
      <ul>
        <div className="search-bar">
          <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Pesquisar pokémon" />
        </div>
        <h1 className='pokedex-title'>Pokédex</h1>
        <div className='pokemon-list'>
          {filteredPokemonList.map((pokemon) => (
            <li key={pokemon.id}>
              <div className={`pokemon-container pokemon-card ${pokemon.types[0].toLowerCase()} ${favoritePokemonList.includes(pokemon.id) ? 'favorite' : ''}`}>
                <div className='pokemon-nametype-container'>
                  <div className='pokemon-name'>
                    <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
                  </div>
                  <div className="pokemon-types">
                    {pokemon.types.map((type, index) => (
                      <span key={index} className={`pokemon-type ${type.toLowerCase()}`}>
                        {type.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <button className='favorite-button' onClick={() => toggleFavorite(pokemon.id)}>
                    {favoritePokemonList.includes(pokemon.id) ? 'Remove Favorite' : 'Add Favorite'}
                  </button>
                  <img src={pokemon.imageUrl} alt={pokemon.name} className='pokemon-image' />
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}



export default PokemonPage;
