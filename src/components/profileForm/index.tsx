import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

import "./styles.css";
import Button from "react-bootstrap/esm/Button";
import { AuthContext, ContextType } from "../../store/context/AuthContext";
import AuthService from "../../services/authService";
import Spinner from "react-bootstrap/esm/Spinner";

const ProfileForm = () => {
  //context
  const ctx = useContext(AuthContext);
  const { state } = ctx as ContextType;

  //state
  const [displayName, setDisplayName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setDisplayName(state.user?.displayName ?? "");
  }, [state.user]);

  const handleUpdate = async () => {
    //actualizar el usuario en el servicio
    setIsLoading(true);

    if (displayName.length) {
      try {
        await new AuthService().updateProfileName(displayName);
        setErrorMessage("");
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("Todos los campos son requeridos");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form.Group className="profile-form-container">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          type="text"
        />
      </Form.Group>
      <Form.Group className="profile-form-container">
        <Form.Label>Usuario</Form.Label>
        <Form.Control disabled type="text" defaultValue={state.user?.email} />
      </Form.Group>
      <Form.Group>
        {errorMessage && (
          <span className="danger-text text-center">{errorMessage}</span>
        )}
      </Form.Group>
      <Form.Group className="profile-form-container">
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Button
            onClick={handleUpdate}
            className="acent"
            style={{ border: "none" }}
          >
            Actualizar
          </Button>
        )}
      </Form.Group>
    </>
  );
};

export default ProfileForm;
