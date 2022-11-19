import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComp = (props) => {
  const { pagination, loadPageData } = props;

  return (
    <>
      {pagination.totalPages > 1 && (
        <Pagination>
          <Pagination.First
            onClick={() => loadPageData(0)}
            disabled={pagination.pageable.pageNumber <= 0}
          />
          <Pagination.Prev
            onClick={() => loadPageData(pagination.pageable.pageNumber - 1)}
            disabled={pagination.pageable.pageNumber <= 0}
          />

          {[...Array(pagination.totalPages)].map((item, index) => (
            <Pagination.Item
              active={index === pagination.pageable.pageNumber}
              key={index}
              onClick={() => loadPageData(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => loadPageData(pagination.pageable.pageNumber + 1)}
            disabled={
              pagination.pageable.pageNumber >= pagination.totalPages - 1
            }
          />
          <Pagination.Last
            onClick={() => loadPageData(pagination.totalPages - 1)}
            disabled={
              pagination.pageable.pageNumber >= pagination.totalPages - 1
            }
          />
        </Pagination>
      )}
    </>
  );
};

export default PaginationComp;
