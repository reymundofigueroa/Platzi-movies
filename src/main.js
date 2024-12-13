const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}` 
  },
})

async function getTrendMoviesPreview(){
  
  const { data } = await api('trending/movie/week')
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

async function getCategoriesPreview(){
  const { data } = await api('genre/movie/list?language=en')

  const categories = data.genres

  categories.forEach(category => {
    const categoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

    const categoryContainerDiv = document.createElement('div')
    categoryContainerDiv.classList.add('category-container')

    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.textContent = `${category.name}`
    categoryTitle.id = `id${category.id}`

    categoryContainerDiv.appendChild(categoryTitle)
    categoriesPreviewContainer.appendChild(categoryContainerDiv)
  })
}


