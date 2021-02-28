import { call, delay, put, takeLatest, all } from 'redux-saga/effects'
import bookActions from '../actions/books';
import bookServices from '../../services/books';
import bookConstants from '../../constants/books';
import bookActionTypes from '../actions/books/actionTypes';

export function* getBooks({ payload: { params } }) {

    const { defaultItemsPerPage } = bookConstants;

    const { page, itemsPerPage = defaultItemsPerPage, filters = [] } = params;

    try {
        const { books, count } = yield call(bookServices.getBooks, {
            page,
            itemsPerPage,
            filters
        });

        yield delay(250); // Add a slight deliberate delay so user can see books loading in

        yield put(bookActions.getBooksSuccess({
            books,
            count
        }));
    } catch (err) {
        yield put(bookActions.getBooksFailure({
            err: err.message
        }));
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(bookActionTypes.GET_BOOKS, getBooks)
    ])
}