import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useAuth from "../../store/useAuth";
import { ROUTES } from "../../config/routes";

const SessionExpiredModal = () => {
  const navigate = useNavigate();
  const sessionExpired = useAuth((state) => state.sessionExpired);
  const setSessionExpired = useAuth((state) => state.setSessionExpired);

  useEffect(() => {
    if (sessionExpired) {
      setTimeout(() => {
        setSessionExpired(false); // Reset flag
        navigate(ROUTES.AUTHENTICATION.SIGN_IN);
      }, 3000);
    }
  }, [sessionExpired, navigate, setSessionExpired]);

  if (!sessionExpired) return null;

  return (
    <Modal show={true} centered backdrop="static">
      <Modal.Body className="text-center">
        <h5>Session Expired</h5>
        <p>Your session has expired. Redirecting to login...</p>
        <div className="spinner-border text-primary" role="status" />
      </Modal.Body>
    </Modal>
  );
};

export default SessionExpiredModal;
