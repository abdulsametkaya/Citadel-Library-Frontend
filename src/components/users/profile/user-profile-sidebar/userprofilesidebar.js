import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user-profile-sidebar.scss";
import {
  RiDashboardLine,
  RiFileList3Line,
  RiHome3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { BsFilePersonFill, BsPeopleFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/slices/auth-slice";

const UserSideMenu = (props) => {
  const { toggleStatus } = useSelector((state) => state.adminsidebar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {collapseToggle} = props;
 

  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
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
    <div
      className={`${toggleStatus ? "side-short sidebar-div" : " sidebar-div"} `}

    >
      <Navbar className={`user-sidebar`} expand="lg">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/user"
                className={splitLocation.length === 2 ? "active-elm" : ""}
              >
                <RiDashboardLine />
                <span>Dashboard</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/user/information"
                className={
                  splitLocation.includes("information") ? "active-elm" : ""
                }
              >
                <RiFileList3Line />
                <span>User Information</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/user/account"
                className={
                  splitLocation.includes("account") ? "active-elm" : ""
                }
              >
                <BsFilePersonFill />
                <span>Account Information</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/user/mybooks"
                className={
                  splitLocation.includes("mybooks") ? "active-elm" : ""
                }
              >
                <ImBooks />
                <span>My Books</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <RiHome3Line />
                <span>Home</span>
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="btn-logout">
                <RiLogoutCircleRLine />
                <span>Logout</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserSideMenu;
