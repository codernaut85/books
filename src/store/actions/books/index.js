import bookActionTypes from './actionTypes';

export const getBooks = params => ({
  type: bookActionTypes.GET_BOOKS,
  payload: {
    params
  }
});

export const getBooksSuccess = ({ books, count }) => ({
  type: bookActionTypes.GET_BOOKS_SUCCESS,
  payload: {
    books,
    count
  }
});

export const getBooksFailure = err => ({
  type: bookActionTypes.GET_BOOKS_FAILURE,
  payload: {
    err
  }
});

const bookActions = {
  getBooks,
  getBooksSuccess,
  getBooksFailure
};

export default bookActions;