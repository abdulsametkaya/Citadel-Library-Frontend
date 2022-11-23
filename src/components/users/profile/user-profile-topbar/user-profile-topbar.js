import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./user-profile-topbar.scss";
import logo from "../../../../assets/img/logo/citadelLogoDark.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setToggleStatus } from "../../../../store/slices/admin-sidebar-toggle";
import { Link } from "react-router-dom";
import UserSideMenu from "../user-profile-sidebar/userprofilesidebar";
import UserDashboardAuth from "../user-dashboard-auth/user-dashboard-auth";

const UserProfileTopbar = () => {
  const { toggleStatus } = useSelector((state) => state.adminsidebar);
  const [collapseToggle, setCollapseToggle] = useState(true);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setToggleStatus());
  };
  const handleCollapseToggle = () => {
    setCollapseToggle(!collapseToggle);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="topbar sticky-top">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              <img src={logo} alt="User" className="navbar-logo" />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleCollapseToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Button
                className={`${
                  !collapseToggle
                    ? "d-none topbar-toggle-btn"
                    : "topbar-toggle-btn"
                }`}
                onClick={handleToggle}
              >
                {toggleStatus ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
              </Button>
            </Nav>
            <Nav className={`topbar-menu-btn`}>
              {!collapseToggle ? (
                <UserSideMenu collapseToggle />
              ) : (

                <div className={`${!collapseToggle ? "d-none" : ""}`}>
                  <UserDashboardAuth />
                </div>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default UserProfileTopbar;
