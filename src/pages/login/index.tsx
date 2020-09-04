import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";

import "./styles.css";
import AuthForm from "../../components/authForm";

const LoginPage = () => {
  return (
    <Container>
      <Row className="login-container">
        <Col>
          <Card className="card-login">
            <Card.Body>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <AuthForm />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <img
                    className="animate__animated animate__zoomIn"
                    src="/images/login/Cooking-cuate.svg"
                    alt="cooking-cuate"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
