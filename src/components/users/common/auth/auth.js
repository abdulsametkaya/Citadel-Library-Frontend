import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./auth.scss";
import { question } from "../../../../utils/functions/swal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/slices/auth-slice";
import secureLocalStorage from "react-secure-storage";
import { BsShieldLock } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const [defaultTab, setDefaultTab] = useState("login");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDefaultTab(searchParams.get("type") || "login");
  }, [searchParams]);

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
    <div className="user-menu">
      {isUserLogin ? (
        <Dropdown align="end">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {user.firstName} {user.lastName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {(user.roles.includes("Administrator") ||
              user.roles.includes("Staff")) && (
              <>
                <Dropdown.Item as={Link} to="/admin">
                  <BsShieldLock />
                  Admin Panel
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            )}

            <Dropdown.Item as={Link} to="/user">
              <BiUser />
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <RiLogoutCircleRLine />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="lgn">
          <Button onClick={handleShow}>Sign In | Up</Button>
        </div>
      )}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login & Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            activeKey={defaultTab}
            onSelect={(k) => setDefaultTab(k)}
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <LoginForm handleClose={handleClose} />
            </Tab>
            <Tab eventKey="register" title="Register">
              <RegisterForm setDefaultTab={setDefaultTab} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Auth;
