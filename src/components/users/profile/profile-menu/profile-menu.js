import { Col, Row } from "react-bootstrap";
import { Container } from "reactstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import { IoIosInformationCircle } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import "./profile-menu.scss";
import SectionHeader from "../../common/section-header/section-header";
import Spacer from "../../../common/spacer/spacer";
/* import BookCard from "../book-card/book-card"; */ 
import MyBooks from "../my-books/my-books";
import { useDispatch } from "react-redux";
import { question } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { logout } from "../../../../store/slices/auth-slice";

import AccountInformation from "../account-information/account-information"

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleLogout = () => {
     question("Are you sure to logout?").then((result) => {
       if (result.isConfirmed) {
         dispatch(logout());
         secureLocalStorage.removeItem("token");
         navigate("/");
       }
     });
   };
  return (
    <>
      <SectionHeader title="My Profile" image="header2.jpg" />
      <Spacer height={"50vh"} />
      <Container className="container-profile">
        <Row className="row-profile">
          <Col className="col-profile1" md={4} lg={3}>
            <ul className="ul-profile">
              <FaUserCircle className="user-profile" />

              <strong className="my-profile">My Profile</strong>
              <hr />
              <li>
                <IoIosInformationCircle />
                <Link className="a-profile" to="/#">
                  {" "}
                  User Information
                </Link>
              </li>
              <hr />
              <li>
                <RiAccountCircleFill />
                <Link className="a-profile" to="/#">
                  Account Information
                </Link>
              </li>
              <hr />
              <li>
                <ImBooks />
                <Link className="a-profile" to="/user/mybooks">
                  My Books
                </Link>
              </li>
              <hr />
              <li>
                <BiLogOutCircle />
                <Link className="a-profile" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
              <hr className="hr1" />
            </ul>
          </Col>

          <Col className="col-profile2" md={8} lg={9}>
           {/*  <MyBooks/> */}
           {/*  <BookCard/> */}
             {/* <ProfileForm /> */}
            <AccountInformation/>
        
            <MyBooks />
            {/*  <BookCard/> */}
            {/* <ProfileForm /> */}
            {/*  <AccountInformation/> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileMenu;
