import TestRenderer from 'react-test-renderer';
import ListBooks from './index';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { mockBookData } from '../../fixtures';
import PaginationComponent from '../../components/Pagination';

const mockStore = configureStore([]);

describe("ListBooks", () => {  
  it("renders correctly when there are no books in the store", () => {
    const store = mockStore({
      books: {
        books: [],
        count: 0
      }
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <ListBooks />
      </Provider>
    </Router>);
    
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it("renders correctly when there are some books in the store", () => {
    const store = mockStore({
      books: mockBookData
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <ListBooks />
      </Provider>
    </Router>);
    
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it("renders the 'no books' content when there are no books", () => {
    const store = mockStore({
      books: {
        books: [],
        count: 0
      }
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <ListBooks />
      </Provider>
    </Router>);

    const testInstance = testRenderer.root;
    const noBooksContent = testInstance.findByProps({ className: "book-list__no-books" });

    expect(noBooksContent).toBeTruthy();
  });

  it("renders as many rows in the books table as there are books in the store", () => {
    const store = mockStore({
      books: mockBookData
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <ListBooks />
      </Provider>
    </Router>);

    const testInstance = testRenderer.root;
    const tableRows = testInstance.findAllByProps({ className: "books-table__row" });

    const amountOfBooks = store.getState().books.books.length;
    expect(tableRows.length).toEqual(amountOfBooks);
  });

  it("renders the pagination controls when there are books to show", () => {
    const store = mockStore({
      books: mockBookData
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <ListBooks />
      </Provider>
    </Router>);

    const testInstance = testRenderer.root;

    expect(testInstance.findByType(PaginationComponent)).toBeTruthy();
    expect(testInstance.findByType(PaginationComponent).props.bookCount).toBe(20);
  });

  it("does not render the pagination controls when there are no books to show", () => {
    const store = mockStore({
      books: {
        books: [],
        count: 0
      }
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <ListBooks />
      </Provider>
    </Router>);

    const testInstance = testRenderer.root;

    const func = () => testInstance.findByType(PaginationComponent);
    expect(func).toThrowError("No instances found with node type: \"PaginationComponent\"");
  });

});