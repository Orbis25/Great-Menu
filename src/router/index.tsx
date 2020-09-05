import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  ADMINISTRATION,
  LOGIN,
  MENU,
  ORDERS,
  PROFILE,
  NEW_FOOD,
  Edit_FOOD,
} from "./routes";

//context
import { ContextType, AuthContext } from "../store/context/AuthContext";

//pages
import HomePage from "../pages/home";
import AdministrationPage from "../pages/administration";
import LoginPage from "../pages/login";
import SideBar from "../components/shared/sideBar";
import OrdersPage from "../pages/orders";
import MenuPage from "../pages/menu";
import ProfilePage from "../pages/profile";
import ProtectedRoute from "./Protected.routes";
import NotFoundPage from "../pages/notFound";
import NewFoodPage from "../pages/newFood";

const Router = () => {
  //context
  const ctx = useContext(AuthContext);
  const { state } = ctx as ContextType;

  return (
    <BrowserRouter>
      <Row>
        {/* No side bar */}
        <Col xs={12} sm={12} md={12} xl={12} lg={12}>
          <Route exact path="/" component={HomePage} />
          <Route path={LOGIN} component={LoginPage} />
        </Col>
        {/* With side bar */}
        <Col xs={12} sm={6} md={3} lg={3} xl={3}>
          {state.isAutenticated && <SideBar />}
        </Col>
        <Col xs={12} sm={6} md={9} lg={9} xl={9}>
          <Switch>
            <ProtectedRoute
              path={ADMINISTRATION}
              component={AdministrationPage}
            />
            <ProtectedRoute path={ORDERS} component={OrdersPage} />
            <ProtectedRoute path={MENU} component={MenuPage} />
            <ProtectedRoute path={NEW_FOOD} component={NewFoodPage} />
            <ProtectedRoute path={`${Edit_FOOD}/:id`} component={NewFoodPage} />
            <ProtectedRoute path={`${PROFILE}/:id`} component={ProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Col>
      </Row>
    </BrowserRouter>
  );
};

export default Router;
