import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/Alert";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Category } from "../../models/Category";
import Spinner from "react-bootstrap/esm/Spinner";
import CategoryService from "../../services/categoryService";

const validationSchema = Yup.object<Category>().shape({
  name: Yup.string().min(3, "nombre muy corto").required("campo requerido"),
});

const NewCategory = () => {
  //state
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  //initialValues formik
  const initialValues: Category = {
    name: "",
    description: "",
  };

  const handleSubmit = async (
    model: Category,
    { resetForm }: FormikHelpers<Category>
  ) => {
    setIsLoading(true);
    setShowAlert(false);

    try {
      await new CategoryService().add(model);
      setErrorMessage("");
      resetForm({});
      setShowAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container>
      <Row>
        <Col className="list-category-container">
          {showAlert && (
            <Alert variant="success" onClose={handleCloseAlert} dismissible>
              <Spinner animation="border" size="sm" />
              <span className="ml-2">Agreado correctamente! espere un momento...</span>
            </Alert>
          )}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, handleChange, handleSubmit, handleBlur }) => (
              <form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="ejemplo: plato del dia"
                    isInvalid={!!errors.name}
                    name="name"
                  />
                  <Form.Control.Feedback type="invalid">
                    <b>{errors.name}</b>
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                    as="textarea"
                    rows={4}
                  />
                </Form.Group>
                {errorMessage && (
                  <Form.Group>
                    <b className="text-center danger-text">{errorMessage}</b>
                  </Form.Group>
                )}
                <Form.Group>
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Button type="submit" className="acent">
                      Crear
                    </Button>
                  )}
                </Form.Group>
              </form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCategory;
