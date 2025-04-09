import axios from 'axios';

const API_KEY = '49618570-65d81de6e7a9899840c4a7811';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  const params = {
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits
    };
  } catch (error) {
    throw new Error('Failed to fetch images. Please try again later.');
  }
}