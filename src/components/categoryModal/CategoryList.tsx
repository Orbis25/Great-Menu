import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Table from "react-bootstrap/Table";

import "./styles.css";
import { Category } from "../../models/Category";
import CategoryService from "../../services/categoryService";
import Spinner from "react-bootstrap/esm/Spinner";
import Alert from "react-bootstrap/esm/Alert";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      await getAll();
    })();
  }, []);

  const getAll = async () => {
    try {
      await new CategoryService().getAll().then((response) => {
        setCategories([]);
        response.forEach((result) => {
          setCategories((x) => [...x, result.data() as Category]);
        });
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setIsLoading(true);
    try {
      await new CategoryService().remove(id);
      setErrorMessage("");
      await getAll();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderData = () => {
    return categories.map((values) => (
      <tr key={values.id}>
        <td>{values.name}</td>
        <td>{values.description}</td>
        <td>
          <i
            className="fa fa-trash list-item-remove"
            onClick={() => handleRemove(values.id ?? "")}
          ></i>
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} className="list-category-container text-center">
          {errorMessage && (
            <Alert variant="danger">
              <b>{errorMessage}</b>
            </Alert>
          )}

          {isLoading ? (
            <>
              <Spinner animation="grow" color="primary" />
              <p>Cargando...</p>
            </>
          ) : (
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryList;
