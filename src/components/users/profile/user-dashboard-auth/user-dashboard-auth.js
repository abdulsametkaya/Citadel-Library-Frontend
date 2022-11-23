import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import RegisterForm from "../../common/auth/register-form";
import LoginForm from "../../common/auth/login-form";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./user-dashboard-auth.scss"

const UserDashboardAuth = () => {
  const [searchParams] = useSearchParams();
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const [defaultTab, setDefaultTab] = useState("login");


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDefaultTab(searchParams.get("type") || "login");
  }, [searchParams]);

  return (
    <div className="user-dashboard-menu">
      {isUserLogin ? (
        <div className="profile-name">
            {user.firstName} {user.lastName}
        </div>
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

export default UserDashboardAuth;
