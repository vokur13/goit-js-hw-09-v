// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

const container = document.querySelector('.gallery');
const pictureMap = createImgGalleryMap(galleryItems);

container.insertAdjacentHTML('beforeend', pictureMap);

function createImgGalleryMap(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
  <img loading="lazy" class="gallery__image lazyload" data-src="${original}" alt="${description}" />
</a>`;
    })
    .join('');
}

if ('loading' in HTMLImageElement.prototype) {
  onLazySizesLoad();
} else {
  // Dynamically import the LazySizes library
  onLazySizesLibraryAdd();
}

function onLazySizesLoad() {
  const lazyImg = document.querySelectorAll('img[loading="lazy"]');
  lazyImg.forEach(img => {
    img.src = img.dataset.src;
  });
}

function onLazySizesLibraryAdd() {
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';
  script.referrerpolicy = 'no-referrer';
  document.body.appendChild(script);
}

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});
