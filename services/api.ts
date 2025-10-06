export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY:"5ffb7f8dfad4f346576ab5b383385aa3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZiN2Y4ZGZhZDRmMzQ2NTc2YWI1YjM4MzM4NWFhMyIsIm5iZiI6MTc1OTU4NzgwNC4yMjU5OTk4LCJzdWIiOiI2OGUxMmRkYzk4OTU4MzZlY2YyNWE5ZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oeQ_laV0arPsWLsD6FORlYYahPjZjBwzBCJGkoTOM5k`,
  },
};

export const fetchMovies = async ({
  query,
  trending = true,
}: {
  query: string;
  trending: boolean;
}): Promise<Movie[]> => {
  let endpoint;

  if (trending) {
    endpoint = `${TMDB_CONFIG.BASE_URL}/trending/movie/day?language=en-US`;
  } else {
    endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
  }

  console.log("API Endpoint:", endpoint);
  console.log("Headers:", TMDB_CONFIG.headers);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Error response:", errorText);
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("API Response:", data);

  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
