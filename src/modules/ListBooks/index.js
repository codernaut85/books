import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  InputGroup,
  FormControl,
  Spinner, 
  Table 
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import bookActions from '../../store/actions/books/';
import PaginationComponent from '../../components/Pagination';

function renderEmptyBookList() {
  return <div className="book-list__no-books"><p>No books found</p></div>
}

function renderLoading() {
  return <div className="book-list__loading">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
}

function renderBookList(bookList = []) {
  return (<Table striped bordered hover className="book-list__table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Author</th>
        <th>Title</th>
        <th>Publication Year</th>
        <th>Publication Country</th>
        <th>Publication City</th>
        <th>Pages</th>
      </tr>
    </thead>
    <tbody>
      {
        bookList.map((book, idx) => (<tr key={idx} className="books-table__row">
          <td>{book.id}</td>
          <td>{book.book_author}</td>
          <td>{book.book_title}</td>
          <td>{book.book_publication_year}</td>
          <td>{book.book_publication_country}</td>
          <td>{book.book_publication_city}</td>
          <td>{book.book_pages}</td>
        </tr>))
      }
    </tbody>
  </Table>);
}

function ListBooks() {
  const { page } = useParams();

  const dispatch = useDispatch();

  const { books, count, isLoading } = useSelector(state => state.books);

  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    dispatch(bookActions.getBooks({
      page: Number(page),
      filters: [{ type: "all", values: [searchFilter] }]
    }));
  }, [dispatch, page, searchFilter]);

  const hasBooks = count > 0;

  return <section className="wrapper book-list">
    <h2 className="heading-level-two">Book Archives</h2>

    <div className="row">
      <InputGroup className="mb-3 col-md-6">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Filter books by wildcard</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder=""
          aria-label="filter"
          aria-describedby="basic-addon1"
          onChange={e => setSearchFilter(e.target.value)}
          value={searchFilter}
        />
      </InputGroup>
    </div>

    {hasBooks && renderBookList(books)}
    {isLoading && renderLoading()}
    {(!isLoading && !hasBooks) && renderEmptyBookList()}
    {hasBooks && <PaginationComponent page={Number(page)} bookCount={count} />}
  </section>
};

export default ListBooks;