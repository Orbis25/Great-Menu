import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

import "./styles.css";
import Button from "react-bootstrap/esm/Button";
import { NEW_FOOD } from "../../router/routes";
import CategoryModal from "../../components/categoryModal";

const MenuPage = () => {
  return (
    <Row className="animate__animated animate__fadeInUp menu-page-container">
      <Col>
        <h1>Menu</h1>
        <Link to={NEW_FOOD}>
          <Button size="sm" className="acent ">
            Nuevo plato
          </Button>
        </Link>
        <CategoryModal />
      </Col>
    </Row>
  );
};

export default MenuPage;
