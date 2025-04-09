import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');
let lightbox;

export function createGallery(images, isNewSearch = false) {
  const markup = images.map(image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" loading="lazy">
        <div class="image-info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </a>
    </li>
  `).join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  }
  lightbox.refresh();

  if (!isNewSearch && images.length > 0) {
    smoothScroll();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
  hideEndMessage();
}

export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}

export function showLoadMoreBtn() {
  loadMoreBtn.hidden = false;
  endMessage.hidden = true;
}

export function hideLoadMoreBtn() {
  loadMoreBtn.hidden = true;
}

export function showEndMessage() {
  endMessage.hidden = false;
}

function hideEndMessage() {
  endMessage.hidden = true;
}

export function checkEndOfCollection(totalHits) {
  return galleryContainer.children.length >= totalHits;
}