import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

import "./styles.css";
import { Link } from "react-router-dom";
import { LOGIN } from "../../router/routes";

const HomePage = () => {
  return (
    <Row className="justify-content-center">
      <Col xs={12}>
        <Container>
          <Row>
            <Col>
              <h1 className="title animate__animated animate__fadeInDown">
                Bienvenido a Great menu!
              </h1>
              <p className="animate__animated animate__fadeInDown animate__delay-1s">
                Donde encontraras los mejores platillos y bebidas, con un
                sevicio de calidad
              </p>
              <p className="animate__animated animate__fadeInDown animate__delay-1s">
                <a
                  href="https://github.com/Orbis25/great-menu-mobileApp/releases/download/v1.0/app-release.apk"
                  download
                  className="primary btn text-white btn-hero"
                >
                  Descarga nuesta app y comienza a pedir ya
                </a>{" "}
                <br />
                <Link to={LOGIN}>
                  <span className="admin-text text-muted-form">
                    <i>Si eres el admin pulsa aqui</i>
                  </span>
                </Link>
              </p>
            </Col>
            <Col className="animate__animated animate__fadeInDown">
              <img src="/images/landing/home-logo.svg" alt="home-logo" />
            </Col>
          </Row>
        </Container>
      </Col>

      <Col>
        <Container>
          <Row>
            <Col
              className="container-col animate__animated animate__flip animate__delay-2s"
              xs={12}
              sm={12}
              md={6}
              xl={6}
              lg={6}
            >
              <img
                className="image-app-landing"
                src="/images/landing/app.svg"
                alt="app"
              />
            </Col>
            <Col className="container-col" xs={12} sm={12} md={6} xl={6} lg={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="animate__animated animate__fadeInDown">
                  <h4>
                    <i className="fa fa-thumbs-up icon-landing"></i>Pide tus
                    platos desde nuesta app
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item className="animate__animated animate__fadeInDown animate__delay-1s">
                  <h4>
                    <i className="fa fa-hourglass icon-landing"></i>
                    Revisa en que tiempo te estaremos entregando tu comida
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item className="animate__animated animate__fadeInDown animate__delay-2s">
                  <h4>
                    <i className="fa fa-history icon-landing"></i>
                    Todo en tiempo real y en la plama de tu mano
                  </h4>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col xs={12}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#1d2e4a"
            fill-opacity="1"
            d="M0,160L30,144C60,128,120,96,180,112C240,128,300,192,360,229.3C420,267,480,277,540,277.3C600,277,660,267,720,261.3C780,256,840,256,900,218.7C960,181,1020,107,1080,106.7C1140,107,1200,181,1260,192C1320,203,1380,149,1410,122.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </Col>
      <Col style={{background:"#1D2E4A"}} className="" xs={12}>
        <img
          src="https://avatars3.githubusercontent.com/u/38229144?s=460&u=32f2de3761114b346afcfbcb090ed1b82c4690ae&v=4"
          alt="profile-creator"
          className="profile-creator"
        />
        <h3 className="text-center">
          <a
            style={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
            }}
            href="https://github.com/Orbis25"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by Orbis Alonzo Gutierrez
          </a>
        </h3>
      </Col>
    </Row>
  );
};

export default HomePage;
