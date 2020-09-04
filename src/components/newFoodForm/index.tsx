import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Formik } from "formik";

import { Food } from "../../models/Food";
import { validationScheme } from "./utils";

const NewFoodForm = () => {
  const initialValues: Food = {
    price: 1,
    category: "",
    name: "",
    description: "",
    photoUrl: "",
  };

  const handleSubmit = (model: Food) => {
    console.log(model);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationScheme}
        onSubmit={handleSubmit}
      >
        {({ errors, values, handleSubmit, handleChange, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="ejemplo : Mi comida..."
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                <b>{errors.name}</b>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={values.price}
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="ejemplo: 2,500"
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                <b>{errors.price}</b>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                value={values.category}
                onSelect={handleChange}
                onChange={handleChange}
                onBlur={handleBlur}
                name="category"
                as="select"
                isInvalid={!!errors.category}
                custom
              >
                <option>Seleccione</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                <b>{errors.category}</b>
              </Form.Control.Feedback>
            </Form.Group>
            <label>Imagen</label>
            <Form.Group>
              <Form.File custom>
                <Form.File.Label>Seleccione un archivo</Form.File.Label>
                <Form.File.Input name="photoUrl" />
              </Form.File>
              {/* <Form.Control.Feedback type="invalid">
                <b>{errors.photoUrl}</b>
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                as="textarea"
                rows={4}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="btn acent" size="sm" block>
                Agregar
              </Button>
            </Form.Group>
          </form>
        )}
      </Formik>
    </>
  );
};

export default NewFoodForm;
