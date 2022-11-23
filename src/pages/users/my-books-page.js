import React from "react";
import MyBooks from "../../components/users/profile/my-books/my-books";
import UserSection from "../../components/users/profile/user-section/user-section";

const MyBooksPage = () => {
  return (
    <>
      <UserSection title={"My Books"} />
      <MyBooks />
    </>
  );
};

export default MyBooksPage;
