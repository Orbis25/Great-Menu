import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useParams } from "react-router-dom";

import "./styles.css";
import NewFoodForm from "../../components/newFoodForm";

const NewFoodPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="animate__animated animate__fadeInUp menu-page-container">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="title-new-food">
            {!!id ? "Editar plato" : "Nuevo plato"}
          </h1>
        </Col>
        <Col
          className="form-new-food-container "
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
        >
          <NewFoodForm />
        </Col>
      </Row>
    </Container>
  );
};

export default NewFoodPage;
