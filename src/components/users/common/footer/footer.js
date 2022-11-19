import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./footer.scss";
import {settings} from "../../../../utils/settings";
import logo from "../../../../assets/img/logo/citadelLogoWhite.png";
import ContactInfo from "../../../users/contact/contact-info/contact-info";
import { SocialIcon } from "react-social-icons";


const Footer = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  
  return (
    <Container fluid className="footer">
      <Container>
        <Row className="f-5">
          <Col md={6} lg={3} className="a-2">
            <Link to="/">
              <img
                src={logo}
                alt={settings.siteName}
                className="img-fluid footer-logo"
              />
            </Link>
            <p className="g-87">
              The mind that does not think and does not produce is like a
              library without visitors. Libraries are the only reliable memory
              of humanity.
            </p>
          </Col>
          <Col md={6} lg={3}>
            <h2 className="qq">Quick Links</h2>
            <ul className="k1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </Col>
          <Col className="social-media" md={6} lg={3}>
            <h2>Social Media</h2>
            <ul>
              <li>
                <a href="https://facebook.com/" target="_blank">
                  <SocialIcon
                    className="g1"
                    url="https://facebook.com/jaketrent"
                  />{" "}
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank">
                  <SocialIcon
                    className="g1"
                    url="https://instagram.com/jaketrent"
                  />
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank">
                  <SocialIcon className="g1" url="https://twitter.com/" />
                  Twitter
                </a>
              </li>
            </ul>
          </Col>
          <Col md={6} lg={3}>
            <h2>Contact us</h2>
            <ContactInfo />
          </Col>
        </Row>
        <Row>
          <p className="copyBar">
            All rights reserved © 2022 | This site has been prepared by the <b>Cosmos</b> Developer Team.
          </p>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;