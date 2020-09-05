import React from "react";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { Food, FoodState } from "../../models/Food";
import { useHistory } from "react-router-dom";
import { Edit_FOOD } from "../../router/routes";

type Props = {
  food: Food;
};

const MenuItem: React.FC<Props> = ({ food }) => {
  const { id, name, State, category, description, photoUrl, price } = food;

  const history = useHistory();

  const handleEditPage = () => {
    history.push(`${Edit_FOOD}/${id}`);
  };

  return (
    <>
      <Card className="mb-3 text-center animate__animated animate__fadeInRight card-elevation-menu-item">
        <Card.Body>
          <Row>
            <Col xs={12} sm={12} md={3} xl={3} lg={3}>
              <Image
                width={200}
                src={photoUrl}
                rounded
                alt={name}
              />
            </Col>
            <Col xs={12} sm={12} md={9} xl={9} lg={9}>
              <h1 className="to-capitalize">{name}</h1>
              <p>{description}</p>
              <span>
                <b>Precio: ${price}</b>
              </span>
              <span className="ml-5">
                <span>Estado</span>
                <select defaultValue={State} className="ml-2">
                  <option value={FoodState.Active}>En venta</option>
                  <option value={FoodState.SoldOut}>Agotado</option>
                </select>
              </span>
              <span className="ml-5">
                Categoria:
                <span className="badge badge-secondary">{category}</span>
              </span>
              <span onClick={handleEditPage} className="ml-5">
                Editar <i className="fa fa-edit "></i>{" "}
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default MenuItem;
