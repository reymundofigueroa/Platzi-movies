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

// Utils

function renderMoviesList(data, container){
  container.innerHTML = ''

  data.forEach(movie => {
    const movieCOntainer = document.createElement('div')
    movieCOntainer.classList.add('movie-container')

    const img = document.createElement('img')
    img.classList.add('movie-img')
    
    img.setAttribute(
      'src', 
      'https://image.tmdb.org/t/p/w300' + movie.poster_path)
    img.setAttribute('alt', 'Nombre de la película')

    movieCOntainer.appendChild(img)
    container.appendChild(movieCOntainer)

    
  });
}

function renderCategories(categories, container){
  categoriesPreviewList.innerHTML = ''

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