import React, { useContext } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import "./styles.css";
import { AuthContext, ContextType } from "../../store/context/AuthContext";
import ProfileForm from "../../components/profileForm";
import Card from "react-bootstrap/esm/Card";

const ProfilePage = () => {
  //context
  const ctx = useContext(AuthContext);
  const { state } = ctx as ContextType;
  const { user } = state;

  const renderName = () => {
    return user?.displayName ?? user?.email;
  };

  return (
    <div className="animate__animated animate__fadeInUp">
      <Card className="profile-page-container">
        <Card.Body>
          <Row className=" justify-content-center">
            <Col xs={12}>
              <img
                src="/images/profile/user.svg"
                className="profile-avatar"
                alt="profile"
              />
              <h1 className="text-center text-name">{renderName()}</h1>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <ProfileForm />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
