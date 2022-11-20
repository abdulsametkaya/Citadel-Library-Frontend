import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineDeviceTablet } from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { SlBookOpen } from "react-icons/sl";
import { RiContactsBook2Line } from "react-icons/ri";
import "./welcome-lib.scss";

const WelcomeLib = () => {
  return (
    <>
      <Container className="welcome-container">
        <Row className="welcome-container-row">
          <Col className="welcome-container-title">
            <span>The Citadel Library</span>
          </Col>
          <Col className="welcome-container-subtitle">
            <span>the most popular library</span>
          </Col>
          <hr />
        </Row>
        <Row>
          <Col sm={6} md={4} lg={3}>
            <div className="welcome-card">
              <Container>
                <Row className="welcome-card-row">
                  <Col>
                    <div className="welcome-card-icon">
                      <HiOutlineDeviceTablet />
                    </div>
                  </Col>
                  <Col className="welcome-card-title">E-BOOKS</Col>
                  <Col className="welcome-card-body">
                    an electronic version of a printed book that can be read on
                    a computer.
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <div className="welcome-card">
              <Container>
                <Row className="welcome-card-row">
                  <Col>
                    <div className="welcome-card-icon">
                      <ImBooks />
                    </div>
                  </Col>
                  <Col className="welcome-card-title">AUDIOBOOKS</Col>
                  <Col className="welcome-card-body">
                    an audiocassette or CD recording of a reading of a book,
                    typically a novel.
                  </Col>

                </Row>
              </Container>
            </div>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <div className="welcome-card">
              <Container>
                <Row className="welcome-card-row">
                  <Col>
                    <div className="welcome-card-icon">
                      <SlBookOpen />
                    </div>
                  </Col>
                  <Col className="welcome-card-title">MAGAZINE</Col>
                  <Col className="welcome-card-body">
                    a periodical publication containing articles and
                    illustrations information.
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <div className="welcome-card">
              <Container>
                <Row className="welcome-card-row">
                  <Col>
                    <div className="welcome-card-icon">
                      <RiContactsBook2Line />
                    </div>
                  </Col>
                  <Col className="welcome-card-title">TEENS&KIDS</Col>
                  <Col className="welcome-card-body">
                    the years of a person's age from 13 to 19 and are the kids
                    and teens.
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WelcomeLib;
