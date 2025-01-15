const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}` 
  },
})

// LLamados a la API

async function getTrendMoviesPreview(){
  const { data } = await api('trending/movie/week')
  const movies = data.results

  renderMoviesList(movies, trendingMoviesPreviewList) 
}

async function getCategoriesPreview(){
  const { data } = await api('genre/movie/list?language=en')
  const categories = data.genres

  renderCategories(categories, categoriesPreviewList)
}


async function getMoviesByCategory(categoryId){
  const { data } = await api('discover/movie', {
    params: {
      with_genres: categoryId
    }
  })
  const movies = data.results

  renderMoviesList(movies, genericSection)
}

async function getMoviesBySearch(query){
  const { data } = await api('search/movie', {
    params: {
      query,
    }
  })
  const movies = data.results

  renderMoviesList(movies, genericSection)
}

async function getTrendMovies(){
  const { data } = await api('trending/movie/week')
  const movies = data.results

  renderMoviesList(movies, genericSection) 
}

async function getMovieById(movieId){
  const { data: movie } = await api(`movie/${movieId}`)

  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  movieDetailTitle.textContent = movie.title
  movieDetailDescription.textContent = movie.overview
  movieDetailScore.textContent = movie.vote_average
  
  headerSection.style.background = `
  linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%
    ),
  url(${movieImgUrl})`

  renderCategories(movie.genres, movieDetailCategoriesList)
  getRelatedMovies(movieId) 
}

async function getRelatedMovies(movieId){
  const { data } = await api(`movie/${movieId}/similar`)
  const movies = data.results

  renderMoviesList(movies, relatedMoviesContainer)
}
// Utils

function renderMoviesList(data, container){
  container.innerHTML = ''

  data.forEach(movie => {
    const movieCOntainer = document.createElement('div')
    movieCOntainer.classList.add('movie-container')

    movieCOntainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })

    const img = document.createElement('img')
    img.classList.add('movie-img')
    
    img.setAttribute('data-src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path); 
    img.setAttribute('alt', movie.title); 
    img.src = 'placeholder.jpg';

    movieCOntainer.appendChild(img)
    container.appendChild(movieCOntainer)   
  });
  iniciarLazyLoading();
}

function renderCategories(categories, container){
  container.innerHTML = ''

  categories.forEach(category => {
    const categoryContainerDiv = document.createElement('div')
    categoryContainerDiv.classList.add('category-container')

    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.textContent = `${category.name}`
    categoryTitle.id = `id${category.id}`
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`
    })

    categoryContainerDiv.appendChild(categoryTitle)
    container.appendChild(categoryContainerDiv)
  })
}