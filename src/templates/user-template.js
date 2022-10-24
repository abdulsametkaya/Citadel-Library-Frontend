import React from "react";
import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";

const UserTemplate = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserTemplate;
