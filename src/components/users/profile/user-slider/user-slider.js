import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user-slider.scss";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { BsFilePersonFill } from "react-icons/bs";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/slices/auth-slice";

const UserSlider = (props) => {
  const { toggleStatus } = useSelector((state) => state.adminsidebar);
  const [activeMenu, setActiveMenu] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Loged Out!", "", "success");
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className={`${toggleStatus ? "side-short" : " "} `}>
        <Navbar className={"user-sidebar"} expand="lg">
          <Container className="container-user">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/user"
                  className={splitLocation.length === 2 ? "active-elm" : ""}
                  onClick={() => {
                    setActiveMenu("Dashboard");
                  }}
                >
                  <FaUserCircle className="user-profile" />

                  <strong className="my-profile">My Profile</strong>
                </Nav.Link>
                <hr />
                <Nav.Link
                  as={Link}
                  to="/user/profileform"
                  className={
                    splitLocation.includes("profileform") ? "active-elm" : ""
                  }
                  onClick={() => {
                    setActiveMenu("profileform");
                  }}
                >
                  <BsFilePersonFill />
                  <span>User Profile</span>
                </Nav.Link>
                <hr />
                <Nav.Link
                  as={Link}
                  to="/user/account"
                  className={
                    splitLocation.includes("account") ? "active-elm" : ""
                  }
                  onClick={() => {
                    setActiveMenu("account");
                  }}
                >
                  <BsFilePersonFill />
                  <span>Account Information</span>
                </Nav.Link>
                <hr />
                <Nav.Link
                  as={Link}
                  to="/user/mybooks"
                  className={
                    splitLocation.includes("mybooks") ? "active-elm" : ""
                  }
                  onClick={() => {
                    setActiveMenu("mybooks");
                  }}
                >
                  <ImBooks />
                  <span>My Books</span>
                </Nav.Link>
                <hr />
                <Nav.Link onClick={handleLogout} className="btn-logout">
                  <RiLogoutCircleRLine />
                  <span>Logout</span>
                </Nav.Link>
                <hr />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default UserSlider;
