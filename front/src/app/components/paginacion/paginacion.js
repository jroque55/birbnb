import React from 'react';
import ReactPaginate from 'react-paginate';
import './paginacion.css'; 
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalDocuments 
}) => {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1); 
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      
      <ReactPaginate
        previousLabel="← Anterior"
        nextLabel="Siguiente →"
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage - 1} 
      />
    </div>
  );
};

export default Pagination;