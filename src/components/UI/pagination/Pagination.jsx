import React from "react";
import { getPagesArray } from "../../../utils/pages.js";

//---------------------------------------------------------------------
const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          <strong>{p}</strong>
        </span>
      ))}
    </div>
  );
};

export default Pagination;
