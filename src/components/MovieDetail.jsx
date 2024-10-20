import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const API_KEY = 'c59086531f209ac2717b0e50f8c6ef59';
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
              language: 'pt-BR',
            },
          }
        );

        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-gray-500 dark:text-gray-400">Carregando...</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-gray-500 dark:text-gray-400">Filme não encontrado.</span>
      </div>
    );
  }

  const formattedDate = new Date(movie.release_date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-700 dark:bg-gray-300 p-8 rounded-lg shadow-2xl">
      <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
        &larr; Voltar
      </Link>
      <div className="mt-4 flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded"
            loading="lazy"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 md:w-2/3">
          <h1 className="text-3xl font-bold text-white dark:text-gray-800">{movie.title}</h1>
          <p className="mt-2 text-gray-300 dark:text-gray-700">{movie.overview}</p>
          <div className="mt-4">
            <span className="font-semibold text-white dark:text-gray-800">Lançamento:</span>{' '}
            <span className="text-gray-300 dark:text-gray-700">{formattedDate}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold text-white dark:text-gray-800">Duração:</span>{' '}
            <span className="text-gray-300 dark:text-gray-700">{movie.runtime} minutos</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold text-white dark:text-gray-800">Gêneros:</span>{' '}
            {movie.genres.map((genre) => (
              <span key={genre.id} className="text-gray-300 dark:text-gray-700 mr-2">
                {genre.name}
              </span>
            ))}
          </div>
          <div className="mt-2">
            <span className="font-semibold text-white dark:text-gray-800">Avaliação:</span>{' '}
            <span className="text-gray-300 dark:text-gray-700">{movie.vote_average} / 10</span>
          </div>
          {movie.videos && movie.videos.results.length > 0 && (
            <div className="mt-4">
              <a
                href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-indigo-600 dark:bg-indigo-400 text-white dark:text-black rounded hover:bg-indigo-700 dark:hover:bg-indigo-500"
              >
                Assistir Trailer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
