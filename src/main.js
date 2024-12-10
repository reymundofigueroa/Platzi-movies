async function getTrendMoviesPreview(){
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', Authorization: `Bearer ${API_KEY}`}
  };
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/week', options)
  const data = await res.json()
  const movies = data.results

  console.log('tamaño array' + movies.length)

  movies.forEach(movie => {
    const trendingArticle = document.querySelector('#trendingPreview .trendingPreview-movieList')
    const movieCOntainer = document.createElement('div')
    movieCOntainer.classList.add('movie-container')

    const img = document.createElement('img')
    img.classList.add('movie-img')
    
    img.setAttribute(
      'src', 
      'https://image.tmdb.org/t/p/w300' + movie.poster_path)
    img.setAttribute('alt', 'Nombre de la película')

    movieCOntainer.appendChild(img)
    trendingArticle.appendChild(movieCOntainer)

    
  });
}
getTrendMoviesPreview()
