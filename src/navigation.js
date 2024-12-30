searchFormBtn.addEventListener('click', () => {
  const search = searchFormInput.value
  location.hash = '#search=' + search
})

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends'
})

arrowBtn.addEventListener('click', () => {
  window.history.go(-2);
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator (){
  console.log({location})

  if (location.hash.startsWith('#trends')){
    trendPage()
  } else if (location.hash.startsWith('#search=')){
    searchPage()
  }
  else if (location.hash.startsWith('#movie=')){
    moviePage()  
  }
  else if (location.hash.startsWith('#category=')){
    categoryPage()
  } else {
    homePage()
  }
}

function homePage(){

  console.log('Home!!')
  
  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.add('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerCategoryTitle.classList.add('inactive')
  headerTitle.classList.remove('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')

  getCategoriesPreview()
  getTrendMoviesPreview()
}
function trendPage(){
  console.log('Trends!!')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerCategoryTitle.classList.remove('inactive')
  headerTitle.classList.add('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  headerCategoryTitle.textContent = 'Tendencias'
  getTrendMovies()
}
function searchPage(){
  console.log('Search!!')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerCategoryTitle.classList.add('inactive')
  headerTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  const [_, searchValue] = location.hash.split('=')
  getMoviesBySearch(searchValue)

}
function moviePage(){
  console.log('Movie!!')

  headerSection.classList.add('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerCategoryTitle.classList.add('inactive')
  headerTitle.classList.add('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive')

}
function categoryPage(){

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerCategoryTitle.classList.remove('inactive')
  headerTitle.classList.add('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  const [_, categoryData] = location.hash.split('=')
  const [categoryId, categoryName] = categoryData.split('-')

  headerCategoryTitle.textContent = categoryName
  getMoviesByCategory(categoryId)
  console.log('Categories!!')
}