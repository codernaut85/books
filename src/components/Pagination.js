import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from "react-bootstrap";
import bookConstants from '../constants/books';
import {
  add,
  ceil,
  divide,
  max,
  min,
  pipe,
  subtract
} from '../utils';

function PaginationComponent({ bookCount, page }) {

  const { defaultItemsPerPage, paginationItemsToShow } = bookConstants;

  const pageCount = pipe(
    divide(defaultItemsPerPage),
    ceil
  )(bookCount);

  const pageStart = pipe(
    subtract(paginationItemsToShow),
    max(1)
  )(page);

  const pageEnd = pipe(
    add(paginationItemsToShow),
    min(pageCount)
  )(page);

  let items = [];

  for (let number = pageStart; number <= pageEnd; number++) {
    items.push(
      <Pagination.Item 
        key={number}
        active={number === page}
        href={`/books/page/${number}`}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (<div className="pagination-controls">
    <Pagination>
      <Pagination.First href={`/books/page/1`}/>
      {page > 1 && <Pagination.Prev href={`/books/page/${page - 1}`} />}
      {items}
      {page < pageCount && <Pagination.Next href={`/books/page/${page + 1}`} />}
      <Pagination.Last href={`/books/page/${pageCount}`}/>
    </Pagination>
  </div>);
};

PaginationComponent.propTypes = {
  bookCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

export default PaginationComponent;