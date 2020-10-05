import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import { Order } from "../../models/Order";
import AuthService from "../../services/authService";
import { User } from "../../models/User";
import OrderService from "../../services/orderService";
import Spinner from "react-bootstrap/esm/Spinner";

type Props = {
  order: Order;
};

const OrderItem: React.FC<Props> = ({ order }) => {
  //state
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [time, setTime] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await getUser();
    })();
    // eslint-disable-next-line
  }, [order.uidUser]);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const result = await new AuthService().getUserByUid(order.uidUser ?? "");
      const user = result.docs[0].data() as User;
      setUser(user);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const setTimeOrder = async () => {
    setIsLoading(true);
    try {
      await new OrderService().updateOrder(order.id ?? "", time);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setComplete = async () => {
    try {
      await new OrderService().setComplete(order.id ?? "");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const renderDetail = () => {
    return order.orders.map((value, index) => (
      <p key={index}>
        {value.qyt} {value.food.name}
      </p>
    ));
  };

  const handleChangeTime = (event: React.ChangeEvent<any>) => {
    setTime(event.target.value);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {isLoading ? (
          <Spinner className="text-center" animation="border" role="status" />
        ) : (
          <>
            <Card.Title>{user?.fullName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Mesa #<b>{order.tableNumber}</b>
            </Card.Subtitle>
            <Card.Text>
              Total: $<b>{order.total}</b> <br />
              {order.time > 0 && (
                <span>Tiempo de entrega : {order.time} minutos</span>
              )}
            </Card.Text>
            <Card.Text></Card.Text>
            {showDetail && renderDetail()}
            <Card.Link href="#" onClick={handleShowDetail}>
              {showDetail ? "Ocultar" : "Ver detalle"}
            </Card.Link>
            <Form.Group>
              <Form.Control
                value={time}
                onChange={handleChangeTime}
                min="1"
                max="60"
                onKeyPress={(e: any) => {
                  e.preventDefault();
                }}
                placeholder="Tiempo en minutos"
                type="number"
              />
            </Form.Group>
            <Button className="btn-sm" onClick={setTimeOrder}>
              {!order.time ? "Procesar" : "Actualizar tiempo"}
            </Button>

            <Button className="btn-success ml-2 btn-sm" onClick={setComplete}>
              Completar
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderItem;
