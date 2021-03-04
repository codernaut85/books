import bookActionTypes from '../actions/books/actionTypes';

const initialState = {
  books: [],
  error: false,
  errorMessage: null,
  count: 0,
  isLoading: false,
};

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case bookActionTypes.GET_BOOKS: {
      return {
        ...initialState,
        error: false,
        isLoading: true,
      }
    }

    case bookActionTypes.GET_BOOKS_SUCCESS: {
      const { books, count } = action.payload;
      return {
        ...initialState,
        books,
        count,
      }
    }

    case bookActionTypes.GET_BOOKS_FAILURE: {
      const { err } = action.payload;
      return {
        ...initialState,
        error: true,
        errorMessage: err,
      }
    }

    default:
      return state;
  }
}