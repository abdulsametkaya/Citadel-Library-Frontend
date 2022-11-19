import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { settings } from "../../../../utils/settings";
import logo from "../../../../assets/img/logo/citadelLogoWhite.png";
import Auth from "../auth/auth";
import "./header.scss";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleName } from "../../../../store/slices/toggle-name-slice";

const Header = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const toggleNa = useSelector((state) => state.toggle);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const handleName = () => {
    dispatch(toggleName(ref.current.className));
  };

  

  return (
    <Navbar
      expand="lg"
      className={
        toggleNa.toggleNames === "navbar-toggler collapsed"
          ? "sticky-top main-navbar background-image"
          : "sticky-top main-navbar"
      }
    >
      <Container>
        <Navbar.Brand as={Link} to="/" title={settings.siteName}>
          <img src={logo} alt={settings.siteName} />
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={handleName}
          ref={ref}
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0">
            <Nav.Link
              as={Link}
              to="/publishers"
              className={
                splitLocation.includes("publishers") ? "active-elm" : ""
              }
            >
              Publishers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/authors"
              className={splitLocation.includes("authors") ? "active-elm" : ""}
            >
              Authors
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/books"
              className={splitLocation.includes("books") ? "active-elm" : ""}
            >
              Books
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/categories"
              className={
                splitLocation.includes("categories") ? "active-elm" : ""
              }
            >
              Categories
            </Nav.Link>
          </Nav>
          <Auth />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
