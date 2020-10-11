import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.css";
import OrderItem from "../../components/orderItem";
import { Order } from "../../models/Order";
import OrderService from "../../services/orderService";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      await getOrders();
    })();
  }, []);

  const getOrders = async () => {
    try {
      (await new OrderService().getAll()).onSnapshot((response) => {
        setOrders([]);
        response.forEach((result) => {
          setOrders((x) => [...x, result.data() as Order]);
        });
      });
    } catch (error) {}
  };

  const renderOrders = () => {
    return orders.map((value, index) => (
      <Col
        key={index}
        className="order-page-container-orders"
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
      >
        <OrderItem order={value} />
      </Col>
    ));
  };

  if (!orders.length) {
    return (
      <Col xs={12} className="order-page-title">
        <h1>No hay ordenes en este momento</h1>
        <img height={400} src="images/orderPage/no_orders.svg" alt="no-orders-img" />
      </Col>
    );
  }

  return (
    <Row className="animate__animated animate__fadeInUp">
      <Col xs={12} className="order-page-title">
        <h1>Ordenes</h1>
      </Col>
      {renderOrders()}
    </Row>
  );
};

export default OrdersPage;
