import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import {
  RiCheckLine,
  RiBarcodeLine,
  RiQuillPenLine,
  RiTableLine,
  RiCloseLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { getAuthorById } from "../../../../api/author-service";
import { getBookImage } from "../../../../utils/functions/book-img";
import "./book-list.scss";

const BookCardList = (props) => {
  const { id, name, image_id, isbn, shelfCode, loanable, authorName } = props;


 
  return (
    <>
      <div className="card mb-5 ">
        <div className="row">
          <div className="col-md-3 img">
            <Link to={`/admin/books/${id}`}>
              <img
                src={getBookImage(image_id)}
                className="img-fluid"
                alt="..."
              />
            </Link>
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <div className="card-text-group">
                <p className="card-text">
                  <div className="row g-0">
                    <div className="col-md-6">
                      <RiQuillPenLine /> {authorName}
                    </div>
                    <div className="col-md-6">
                      <RiTableLine /> {shelfCode}
                    </div>
                  </div>
                </p>
                <p className="card-text">
                  <div className="row g-0">
                    <div className="col-md-6">
                      {" "}
                      <RiBarcodeLine /> {isbn}
                    </div>
                    <div className="col-md-6">
                      {" "}
                      {loanable ? (
                        <>
                          <RiCheckLine /> Available
                        </>
                      ) : (
                        <>
                          <RiCloseLine style={{ color: "red" }} />{" "}
                          <span style={{ color: "red" }}>Not Avaliable</span>
                        </>
                      )}
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
};

export default BookCardList;
