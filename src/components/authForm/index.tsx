import React, { useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "./styles.css";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useHistory } from "react-router-dom";

import { MENU } from "../../router/routes";
import AuthService from "../../services/authService";
import { AuthContext, ContextType } from "../../store/context/AuthContext";
import { AuthLevel, CurrentUser, User } from "../../models/User";

const AuthForm = () => {
  //context
  const ctx = useContext(AuthContext);
  const context = ctx as ContextType;

  //state
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //history router
  const history = useHistory();

  const handleSubmit = async () => {
    setErrorMessage("");
    setIsLoading(true);
    if (userName.length && password.length) {
      try {
        const service = new AuthService();
        const result = await service.login({ userName, password });
        if (result?.user !== null) {
          const usr = result?.user;

          const response = await service.getUserByUid(usr.uid);
          const userModel = response.docs[0].data() as User;
          if (userModel.rol === AuthLevel.Admin) {
            context.setState({
              user: (usr as unknown) as CurrentUser,
              isAutenticated: true,
            });
            localStorage.setItem("auth", "true");
            history.push(MENU);
          } else {
            setErrorMessage("No autorizado");
          }
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("Todos los campos son requeridos");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="form-auth-container">
          <h1 className="title-auth">GREAT MENU</h1>

          {errorMessage && <p className="danger-text">{errorMessage}</p>}

          <Form.Group controlId="email">
            <Form.Label>
              <h5>Usuario </h5>
            </Form.Label>
            <Form.Control
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="email"
              placeholder="user@example.com"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>
              <h5>Contraseña</h5>
            </Form.Label>

            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="******"
            />
          </Form.Group>

          <Form.Group>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status"
                aria-hidden="true"
                variant="primary"
              />
            ) : (
              <Button
                onClick={handleSubmit}
                className="primary btn-hero btn-auth"
              >
                ENTRAR <i className="fa fa-arrow-right icon-auth-enter"></i>
              </Button>
            )}
          </Form.Group>
        </Col>
        <Col className="footer-auth-form" xs={12}>
          <Link className="text-muted-form" to="/">
            Regresar
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
