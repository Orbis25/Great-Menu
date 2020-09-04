import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Formik } from "formik";

import { Food, FoodState } from "../../models/Food";
import { validationScheme, IsReadyFormSubmitEnum } from "./utils";
import { Category } from "../../models/Category";
import CategoryService from "../../services/categoryService";
import Alert from "react-bootstrap/esm/Alert";
import FoodService from "../../services/foodService";
import Spinner from "react-bootstrap/esm/Spinner";
import { showSimpleAlert } from "../../utils/alerts";
import { useHistory } from "react-router-dom";
import { MENU } from "../../router/routes";

const NewFoodForm = () => {
  //state
  const [categories, setCatetories] = useState<Category[]>([]);
  const [isReadyForSubmit, setIsReadyForSubmit] = useState<
    IsReadyFormSubmitEnum
  >(IsReadyFormSubmitEnum.Success);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //state upload image
  const [isImageUpload, setImageIsImageUpload] = useState<boolean>(false);
  const [errorImageUpload, setErrorImageUpload] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");

  //ref
  const fileUploadRef = useRef<HTMLInputElement>(null);

  //navigation
  const history = useHistory();

  const initialValues: Food = {
    price: 1,
    category: "",
    name: "",
    description: "",
    photoUrl: "",
    State: FoodState.Active,
  };

  useEffect(() => {
    (async () => await getCategories())();
  }, []);

  const getCategories = async () => {
    try {
      const results = await new CategoryService().getAll();
      setCatetories([]);

      if (results.empty) {
        setIsReadyForSubmit(IsReadyFormSubmitEnum.CategoryListEmpty);
      }

      results.forEach((doc) => {
        setCatetories((x) => [...x, doc.data() as Category]);
      });
    } catch (error) {
      setIsReadyForSubmit(IsReadyFormSubmitEnum.NetWorkError);
    }
  };

  const handleSubmit = async (model: Food) => {
    if (isImageUpload) {
      setIsLoading(true);
      try {
        model.photoUrl = photoUrl;
        await new FoodService().add(model);
        setErrorMessage("");
        setIsReadyForSubmit(IsReadyFormSubmitEnum.Success);
        showSimpleAlert("Agregado correctamente", "success");
        history.push(MENU);
      } catch (error) {
        setErrorMessage(error.message);
        setIsReadyForSubmit(IsReadyFormSubmitEnum.Error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorImageUpload("Imagen requerida");
    }
  };

  const handleUploadImage = async () => {
    const result = fileUploadRef.current?.files;
    setIsLoading(true);
    if (!!result && result !== null) {
      try {
        const imageURL = await new FoodService().uploadPhoto(result[0]);
        setPhotoUrl(imageURL);
        setErrorImageUpload("");
        setImageIsImageUpload(true);
      } catch (error) {
        setErrorImageUpload(error.message);
        setImageIsImageUpload(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderCategories = () => {
    return categories.map(({ id, name }) => (
      <option key={id} value={name}>
        {name}
      </option>
    ));
  };

  const renderButton = () => {
    switch (isReadyForSubmit) {
      case IsReadyFormSubmitEnum.NetWorkError:
        return (
          <Alert variant="danger">
            <b>
              Lo sentimos, pero presenta problemas de red. Recargue la pagina
            </b>
          </Alert>
        );
      case IsReadyFormSubmitEnum.CategoryListEmpty:
        return (
          <Alert variant="warning">
            <b>
              Lo sentimos, pero las categorias estan vacias. Agregue las
              categorias para crear un plato
            </b>
          </Alert>
        );
      case IsReadyFormSubmitEnum.Error:
        return (
          <>
            <Alert variant="danger">
              <b>{errorMessage}</b>
            </Alert>
            <Button type="submit" className="btn acent" size="sm" block>
              Intentar nuevamente
            </Button>
          </>
        );
      default:
        return (
          <Button type="submit" className="btn acent" size="sm" block>
            Agregar
          </Button>
        );
    }
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
                <option value="">Seleccione</option>
                {renderCategories()}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                <b>{errors.category}</b>
              </Form.Control.Feedback>
            </Form.Group>
            <label>Imagen</label>
            <Form.Group>
              <Form.File custom>
                <Form.File.Label>
                  {isImageUpload ? "Imagen Cargada" : "Seleccione un archivo"}
                </Form.File.Label>
                <Form.File.Input
                  ref={fileUploadRef}
                  accept="image/*"
                  name="photoUrl"
                  onChange={handleUploadImage}
                  isInvalid={errorImageUpload.length > 0}
                />

                {errorImageUpload && (
                  <Form.Control.Feedback type="invalid">
                    <b>{errorImageUpload}</b>
                  </Form.Control.Feedback>
                )}
              </Form.File>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                as="textarea"
                rows={4}
              />
            </Form.Group>
            <Form.Group>
              {isLoading ? (
                <Spinner variant="primary" animation="border" />
              ) : (
                renderButton()
              )}
            </Form.Group>
          </form>
        )}
      </Formik>
    </>
  );
};

export default NewFoodForm;
