import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';


const API_KEY = '2b22d3204682430cc136cbf2d8a4ce84';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const categories = {
  novosVideos: '/movie/now_playing',
  topVideos: '/movie/top_rated',
  destaques: '/movie/popular',
  maisAcessados: '/trending/movie/week',
  series: '/tv/popular'
};

const MovieList = () => {
  const [movies, setMovies] = useState({});

  const getMovies = async () => {
    try {
      const requests = Object.entries(categories).map(async ([key, endpoint]) => {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
          params: { api_key: API_KEY, language: 'pt-BR' }
        });
        return { [key]: response.data.results };
      });

      const results = await Promise.all(requests);
      const moviesData = results.reduce((acc, data) => ({ ...acc, ...data }), {});
      setMovies(moviesData);

    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="movie-container">
      {Object.entries(movies).map(([category, movieList]) => (
        <div key={category} className="movie-category">
          <h2>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
          <ul className='movie-list'>
            {movieList?.map(movie => (
              <li key={movie.id}>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
