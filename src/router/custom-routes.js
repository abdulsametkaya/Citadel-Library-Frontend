import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAuthorsPage from "../pages/admins/admin-authors-page";
import AdminBooksPage from "../pages/admins/admin-books-page";
import AdminDashboardPage from "../pages/admins/admin-dashboard-page";
import AdminPublishersPage from "../pages/admins/admin-publishers-page";
import NotFoundPage from "../pages/common/not-found-page";
import UnAuthorizedPage from "../pages/common/unauthorized-page";
import AuthPage from "../pages/users/auth-pages";
import AuthorPage from "../pages/users/author-page";
import PublishersPage from "../pages/users/publishers-page";
import BookDetailPage from "../pages/users/book-detail-page";
import BooksPage from "../pages/users/books-page";
import CategoriesPage from "../pages/users/categories-page";
import ContactPage from "../pages/users/contact-page";
import HomePage from "../pages/users/home-page";
import PrivacyPolicyPage from "../pages/users/privacy-policy-page";
import AdminTemplate from "../templates/admin-template";
import UserTemplate from "../templates/user-template";
import AdminCategoriesPage from "../pages/admins/admin-categories-page";
import AdminUsersPage from "../pages/admins/admin-users-page";
import AdminReportsPage from "../pages/admins/admin-reports-page";
import AdminBookDetailPage from "../pages/admins/admin-book-detail-page";
import AdminNewBook from "../pages/admins/admin-newbook-create";
import MyBooksPage from "../pages/users/my-books-page";
import ProfileFormPage from "../pages/users/profile-form-page";
import UserProfileTemplate from "../templates/user-profile-template";
import UserDashboardPage from "../pages/users/user-profile-dashboard-page";
import UserProfileBookDetailPage from "../pages/users/userprofile-book-detail-page";
import AccountInformationPage from "../pages/users/account-information-page";
import ProtectedRoute from "./protected-route";
import ProtectedRouteUser from "./protected-route-user";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <>
                <UserTemplate>
                  <HomePage />
                </UserTemplate>
              </>
            }
          />

          <Route
            path="authors"
            element={
              <UserTemplate>
                <AuthorPage />
              </UserTemplate>
            }
          />
          <Route
            path="bookdetail"
            element={
              <UserTemplate>
                <BookDetailPage />
              </UserTemplate>
            }
          />
          <Route
            path="categories"
            element={
              <UserTemplate>
                <CategoriesPage />
              </UserTemplate>
            }
          />
          <Route
            path="publishers"
            element={
              <UserTemplate>
                <PublishersPage />
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
              path="books/all?name=:name&cat=:cat&author=:author&publisher=:publisher&page=:page&size=:size&sort=:sort&direction=:direction"
              element={
                <UserTemplate>
                  <HomePage />
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

          <Route path="user">
            <Route
              index
              element={
                <ProtectedRouteUser>
                  <UserProfileTemplate>
                    <UserDashboardPage />
                  </UserProfileTemplate>
                </ProtectedRouteUser>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRouteUser>
                  <UserProfileTemplate>
                    <AccountInformationPage />
                  </UserProfileTemplate>
                </ProtectedRouteUser>
              }
            />
            <Route path="mybooks">
              <Route
                index
                element={
                  <ProtectedRouteUser>
                    <UserProfileTemplate>
                      <MyBooksPage />
                    </UserProfileTemplate>
                  </ProtectedRouteUser>
                }
              />
              <Route
                path=":bookdetail"
                element={
                  <ProtectedRouteUser>
                    <UserProfileTemplate>
                      <UserProfileBookDetailPage />
                    </UserProfileTemplate>
                  </ProtectedRouteUser>
                }
              />
            </Route>
            <Route
              path="information"
              element={
                <ProtectedRouteUser>
                  <UserProfileTemplate>
                    <ProfileFormPage />
                  </UserProfileTemplate>
                </ProtectedRouteUser>
              }
            />
          </Route>
        </Route>

        <Route path="admin">
          <Route
            index
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminDashboardPage />
                </AdminTemplate>
              </ProtectedRoute>
            }
          />
          <Route path="books">
            <Route
              index
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminBooksPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />
            <Route
              path=":bookdetailId"
              element={
                <ProtectedRoute admin={true} staff={true}>
                  <AdminTemplate>
                    <AdminBookDetailPage />
                  </AdminTemplate>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="newbook"
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminNewBook />
                </AdminTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="authors"
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminAuthorsPage />
                </AdminTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="publishers"
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminPublishersPage />
                </AdminTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="categories"
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminCategoriesPage />
                </AdminTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminUsersPage />
                </AdminTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute admin={true} staff={true}>
                <AdminTemplate>
                  <AdminReportsPage />
                </AdminTemplate>
              </ProtectedRoute>
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
