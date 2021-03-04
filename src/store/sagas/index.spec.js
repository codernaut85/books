import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call, delay, put } from 'redux-saga/effects';
import { getBooks } from './index';
import bookServices from '../../services/books';
import { mockBookData } from '../../fixtures';
import bookActions from '../actions/books';

describe("getBook saga", () => {
  it("calls the books API and then dispatches a success action with a payload", () => {
    const params = { page: 1, itemsPerPage: 20, filters: [] };

    return expectSaga(getBooks, { payload: { params }})
      .provide([
        [call(bookServices.getBooks, params), mockBookData]
      ])
      .call(bookServices.getBooks, params)
      .delay(250)
      .put(bookActions.getBooksSuccess(mockBookData))
      .run();
  });

  it("calls the books API and then dispatches a success action with a payload", () => {
    const params = { page: 1, itemsPerPage: 20, filters: [] };

    return expectSaga(getBooks, { payload: { params } })
      .provide([
        [call(bookServices.getBooks, params), throwError({ message: "some error" })]
      ])
      .call(bookServices.getBooks, params)
      .put(bookActions.getBooksFailure({
        err: "some error"
      }))
      .run();
  });
});