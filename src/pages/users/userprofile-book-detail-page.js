import React from "react";
import UsersBookDetails from "../../components/users/profile/book-details/users-book-details";
import UserSection from "../../components/users/profile/user-section/user-section";

const UserProfileBookDetailPage = () => {
  return (
    <>
      <UserSection title={"Book Details"} />
      <UsersBookDetails />
    </>
  );
};

export default UserProfileBookDetailPage;
