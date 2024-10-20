import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import axios from 'axios';

function MovieCarousel() {
  const API_KEY = 'c59086531f209ac2717b0e50f8c6ef59';
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const genresResponse = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: API_KEY,
              language: 'pt-BR',
            },
          }
        );

        const genres = genresResponse.data.genres;

        const promises = genres.map(async (genre) => {
          const moviesResponse = await axios.get(
            'https://api.themoviedb.org/3/discover/movie',
            {
              params: {
                api_key: API_KEY,
                language: 'pt-BR',
                with_genres: genre.id,
              },
            }
          );

          return {
            name: genre.name,
            movies: moviesResponse.data.results.map((movie) => ({
              id: movie.id,
              title: movie.title,
              image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            })),
          };
        });

        const categoriesData = await Promise.all(promises);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-gray-800">{category.name}</h2>
          <Carousel slides={category.movies} />
        </div>
      ))}
    </div>
  );
}

export default MovieCarousel;
