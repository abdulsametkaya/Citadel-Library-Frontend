import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import BookDetails from "../../components/users/books/book-details/book-details";
import SectionHeader from "../../components/users/common/section-header/section-header";

const BookDetailPage = () => {
  return (
    <>
      <SectionHeader title="Book Details" image="header2.jpg" />
      <Spacer height={"50vh"} />
      <BookDetails />
      <Spacer />
    </>
  );
};

export default BookDetailPage;