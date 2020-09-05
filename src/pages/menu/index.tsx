import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/esm/Form";

import "./styles.css";
import { NEW_FOOD } from "../../router/routes";
import CategoryModal from "../../components/categoryModal";
import MenuItem from "../../components/menuItem";
import { Food } from "../../models/Food";
import FoodService from "../../services/foodService";

const MenuPage = () => {
  //state
  const [items, setItems] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("dsdsds");

  useEffect(() => {
    (async () => await getAllFoods())();
  }, []);

  const getAllFoods = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      setItems([]);
      (await new FoodService().getAll()).onSnapshot((response) => {
        response.forEach((result) => {
          setItems((x) => [...x, result.data() as Food]);
        });
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: any) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const results = await new FoodService().search(e.target.value);
      setItems(results as Food[]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItems = () => {
    if (items.length < 1 && !isLoading) return <h1>No hay platos para mostrar</h1>;
    return items.map((value) => <MenuItem key={value.id} food={value} />);
  };

  return (
    <Row className="animate__animated animate__fadeInUp menu-page-container">
      <Col xs={12}>
        <Container>
          <h1>Menu</h1>
          <Link to={NEW_FOOD}>
            <Button size="sm" className="acent ">
              Nuevo plato
            </Button>
          </Link>
          <CategoryModal />
          <Form.Control
            onChange={handleSearch}
            className="mt-3"
            placeholder="buscar"
          />
        </Container>
      </Col>
      <Col className="menu-page-item-container text-center">
        <Container>
          {errorMessage && (
            <Alert variant="danger">
              <p>
                <b>{errorMessage}</b>
              </p>
              <Button onClick={getAllFoods} size="sm" className="acent">
                Cargar nuevamente
              </Button>
            </Alert>
          )}

          {isLoading ? (
            <>
              <Spinner
                className="menu-page-loading"
                variant="primary"
                animation="border"
              />
              <p>Espere un momento, estamos cargando el listado...</p>
            </>
          ) : (
            renderItems()
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default MenuPage;
