import React from "react";
import { Link } from "react-router-dom";

function Pagination({ pageName, currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
          >
            <Link to={`/${pageName}/?page=${pageNumber}`}>
              <button onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
