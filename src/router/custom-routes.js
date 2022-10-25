import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/common/not-found-page";
import UnAuthorizedPage from "../pages/common/unauthorized-page";
import AboutPage from "../pages/users/about-page";
import AuthPage from "../pages/users/auth-pages";
import BookDetailPage from "../pages/users/book-detail-page";
import BooksPage from "../pages/users/books-page";
import ContactPage from "../pages/users/contact-page";
import HomePage from "../pages/users/home-page";
import PrivacyPolicyPage from "../pages/users/privacy-policy-page";
import UserTemplate from "../templates/user-template";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <UserTemplate>
                <HomePage />
              </UserTemplate>
            }
          />
          <Route
            path="about"
            element={
              <UserTemplate>
                <AboutPage />
              </UserTemplate>
            }
          />
          <Route
            path="contact"
            element={
              <UserTemplate>
                <ContactPage />
              </UserTemplate>
            }
          />
          <Route
            path="privacy-policy"
            element={
              <UserTemplate>
                <PrivacyPolicyPage />
              </UserTemplate>
            }
          />
          <Route path="books">
            <Route
              index
              element={
                <UserTemplate>
                  <BooksPage />
                </UserTemplate>
              }
            />
            <Route
              path=":bookId"
              element={
                <UserTemplate>
                  <BookDetailPage />
                </UserTemplate>
              }
            />
          </Route>
          <Route
            path="auth"
            element={
              <UserTemplate>
                <AuthPage />
              </UserTemplate>
            }
          />
          <Route
            path="unauthorized"
            element={
              <UserTemplate>
                <UnAuthorizedPage />
              </UserTemplate>
            }
          />
          <Route
            path="privacy-policy"
            element={
              <UserTemplate>
                <PrivacyPolicyPage />
              </UserTemplate>
            }
          />

          <Route
            path="*"
            element={
              <UserTemplate>
                <NotFoundPage />
              </UserTemplate>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
