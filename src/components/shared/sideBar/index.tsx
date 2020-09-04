import React, { useEffect, useContext } from "react";

import { useLocation, Link, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { LOGIN, MENU, ORDERS, PROFILE } from "../../../router/routes";
import "./styles.css";
import { initialize as firebase } from "../../../firebase";
import { CurrentUser } from "../../../models/User";
import AuthService from "../../../services/authService";
import { AuthContext, ContextType } from "../../../store/context/AuthContext";

const SideBar = () => {
  //context
  const ctx = useContext(AuthContext);
  const { setState, state } = ctx as ContextType;

  //router
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = () => {
    firebase.auth().onAuthStateChanged(function (user: unknown) {
      setState({ ...state, user: user as CurrentUser });
    });
  };

  const handleLogout = () => {
    new AuthService().logout().then(() => {
      history.push(LOGIN);
    });
  };

  const renderName = () => {
    const { user } = state;
    return user?.displayName ?? user?.email;
  };

  if (pathname === "/" || pathname === LOGIN) return null;

  return (
    <Row>
      <Col>
        <div className="sidebar acent">
          <a className="animate__animated animate__heartBeat" href="#/">
            <Image
              className="image"
              src="/images/administration/food-side.svg"
            />
            <h1 className="text-center ">GREAT MENU</h1>
            <span className="text-center">Administra tus platos y ordenes</span>
          </a>
          <Link to={`${PROFILE}/${state.user?.email}`}>
            <i className="fa fa-user-circle"></i>
            <span> {renderName()}</span>
          </Link>
          <Link to={MENU}>
            <i className="fa fa-leanpub"></i>
            <span> Menu</span>
          </Link>
          <Link to={ORDERS}>
            <i className="fa fa-calendar"></i>
            <span> Ordenes</span>
          </Link>
          <a onClick={handleLogout} href="#/">
            <i className="fa fa-close"></i>
            <span> Cerrar sesión</span>
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default SideBar;
