import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';

const API_KEY = '2b22d3204682430cc136cbf2d8a4ce84';
const API_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjIyZDMyMDQ2ODI0MzBjYzEzNmNiZjJkOGE0Y2U4NCIsIm5iZiI6MTcwMjY4ODg1MC44NSwic3ViIjoiNjU3Y2Y4NTI2YjVmYzIwNzBiYTdjZWRlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.da4WbAvndleh2PkvmHmRkKJoc9WOHUDiali3C5GSI70'
  }
}


const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR'
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <ul className='movie-list'>
      {movies.map(movie => (
        <li key={movie.id}>
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
