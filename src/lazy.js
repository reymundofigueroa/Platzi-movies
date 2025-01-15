function getObserverOptions() { 
  return { 
    root: null, rootMargin: '0px', threshold: 0 
  }; 
}
// Función para cargar la imagen 
function loadImage(entries, observer) { 
  entries.forEach(entry => { 
    if (entry.isIntersecting) { 
      const img = entry.target; 
      img.src = img.getAttribute("data-src"); 
      img.removeAttribute("data-src"); 
      observer.unobserve(img); 
    } 
  }); 
} 

// Inicializar el observador y observar las imágenes 
function iniciarLazyLoading() { 
  const options = getObserverOptions(); 
  const observer = new IntersectionObserver(loadImage, options); 
  const lazyImages = document.querySelectorAll('img[data-src]'); 

  lazyImages.forEach(img => observer.observe(img)); 
}