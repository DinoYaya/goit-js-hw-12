import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreBtn, 
  hideLoadMoreBtn,
  showEndMessage,
  checkEndOfCollection
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    showError('Please enter a search term');
    return;
  }

  currentPage = 1;
  currentQuery = searchQuery;
  showLoader();
  hideLoadMoreBtn();
  clearGallery();

  try {
    const { hits, totalHits: newTotalHits } = await getImagesByQuery(currentQuery, currentPage);
    totalHits = newTotalHits;
    
    if (hits.length === 0) {
      showError('No images found. Please try a different search term.');
      return;
    }
    
    createGallery(hits, true);
    
    if (hits.length === 15 && hits.length < totalHits) {
      showLoadMoreBtn();
    } else if (checkEndOfCollection(totalHits)) {
      showEndMessage();
    }
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  loadMoreBtn.disabled = true;

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    createGallery(hits);
    
    if (hits.length < 15 || checkEndOfCollection(totalHits)) {
      hideLoadMoreBtn();
      showEndMessage();
    }
  } catch (error) {
    currentPage--;
    showError(error.message);
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
});

function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight'
  });
}