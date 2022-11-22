import React from "react";
import Books from "../../components/users/books/books";
import Spacer from "../../components/common/spacer/spacer";
import SectionHeader from "../../components/users/common/section-header/section-header";

const BooksPage = () => {
  return (
    <>
      <SectionHeader title="Books" image="header2.jpg" />
      <Spacer height={"50vh"} />
      <Books />
      <Spacer height={"5vh"} />
    </>
  );
};

export default BooksPage;
