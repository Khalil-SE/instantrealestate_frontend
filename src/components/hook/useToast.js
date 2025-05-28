import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Ensures Bootstrap styles are loaded

const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    body: "",
    header: "Notification",
    delay: 3000,
  });

  // ✅ Function to trigger toast with dynamic values
  const triggerToast = (body, header = "Notification", delay = 10000) => {
    setToast({ show: true, body, header, delay });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));  // ✅ Proper state update
    }, delay);
  };

  // ✅ Toast Component (kept ready for rendering)
  const ToastComponent = (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={toast.show} onClose={() => setToast((prev) => ({ ...prev, show: false }))} delay={toast.delay} autohide>
        <Toast.Header>
          <strong className="me-auto">{toast.header}</strong>
        </Toast.Header>
        <Toast.Body>{toast.body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );

  return { triggerToast, ToastComponent };
};

export default useToast;
