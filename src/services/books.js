import api from '../services/api';
import urls from '../constants/urls';

const {
  baseURL,
  books
} = urls;

const getBooks = params => api.post(baseURL, books, params);

const bookServices = {
  getBooks
};

export default bookServices;

