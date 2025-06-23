


// import React, { useEffect, useState } from "react";
// import { Row, Col, Form, Spinner } from "react-bootstrap";
// import { getSystemSettings, updateSystemSettings } from "../../services/systemSettingsService";

// const AdminSystemSettings = () => {
//   const [chatBotKey, setChatBotKey] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchSettings() {
//         setIsLoading(true);
//       try {
//         const data = await getSystemSettings();
//         setChatBotKey(data.admin_chatBot_key || "");
//       } catch (err) {
//         console.error("Error fetching settings", err);
//         setError("Failed to load settings.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchSettings();
//   }, []);

//   const handleToggle = async () => {
//     if (isEditing) {
//       setIsLoading(true);
//       try {
//         await updateSystemSettings({ admin_chatBot_key: chatBotKey });
//         setIsEditing(false);
//         setError(null);
//       } catch (err) {
//         setError("Failed to update settings.");
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setIsEditing(true);
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-3 mb-4 position-relative">
//       {isLoading && (
//         <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//              style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex: 1 }}>
//           <Spinner animation="border" variant="primary" />
//         </div>
//       )}

//       <Row>
//         <Col lg={8}>
//           <div className="mb-4">
//             <h4 className="fs-20 mb-1">System Settings</h4>
//             <p className="fs-15">Update your system wide settings here here.</p>
//           </div>
//         </Col>
//         <Col lg={4} className="d-flex justify-content-end align-items-center">
//           <button
//             type="button"
//             className={`btn ${isEditing ? "btn-success" : "btn-primary"} py-2 px-4 fw-medium fs-16`} 
//             disabled={isLoading}
//             // "btn btn-primary py-2 px-4 fw-medium fs-16"
//             onClick={handleToggle}
//           >
//             <i className="ri-check-line text-white fw-medium"></i>
//             {isEditing ? "Save Settings" : "Edit Settings"}
//           </button>
//         </Col>
//       </Row>

//       <Form>
//         <Row>
//           <Col lg={12}>
//             <Form.Group className="mb-4">
//               <label className="label text-secondary">ChatBot Admin Key</label>
//               <Form.Group className="position-relative">
//                 <Form.Control
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   value={chatBotKey}
//                   onChange={(e) => setChatBotKey(e.target.value)}
//                   disabled={!isEditing}
//                 />
//                 <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
//               </Form.Group>
//               {error && <div className="text-danger mt-2">{error}</div>}
//             </Form.Group>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// };

// export default AdminSystemSettings;

import React, { useEffect, useState } from "react";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import { getSystemSettings, updateSystemSettings } from "../../services/systemSettingsService";

const AdminSystemSettings = () => {
  const [settings, setSettings] = useState({
    admin_chatBot_key: "",
    chatbot_create_user_url: "",
    chatbot_create_account_url: "",
    stripe_api_key: "",
    stripe_webhook_secret: "",
    stripe_return_url: "",
    instabot_ai_prompt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const data = await getSystemSettings();
        // setSettings({ ...settings, ...data });
        setSettings((prev) => ({ ...prev, ...data }));
        setError(null);
      } catch (err) {
        console.error("Error fetching settings", err);
        setError("Failed to load settings.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleToggle = async () => {
    if (isEditing) {
      setIsLoading(true);
      try {
        await updateSystemSettings(settings);
        setIsEditing(false);
        setError(null);
      } catch (err) {
        setError("Failed to update settings.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const renderInput = (label, name, type = "text") => (
    <Form.Group className="mb-4">
      <label className="label text-secondary">{label}</label>
      <Form.Control
        type={type}
        name={name}
        className="text-dark ps-3 h-55"
        value={settings[name] || ""}
        onChange={handleChange}
        disabled={!isEditing}
      />
    </Form.Group>
  );

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm mb-4 position-relative">
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex: 1 }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Row className="align-items-center mb-4">
        <Col><h4 className="fs-20 mb-1">System Settings</h4></Col>
        <Col className="text-end">
          <button
            className={`btn ${isEditing ? "btn-success" : "btn-primary"} px-4 fw-medium fs-16`}
            onClick={handleToggle}
            disabled={isLoading}
          >
            {isEditing ? "Save Settings" : "Edit Settings"}
          </button>
        </Col>
      </Row>

      <Form>
        <Row>
          <Col md={6}>
            {renderInput("Admin ChatBot Key", "admin_chatBot_key")}
            {renderInput("Chatbot Create User URL", "chatbot_create_user_url")}
            {renderInput("Stripe API Key", "stripe_api_key")}
          </Col>
          <Col md={6}>
            {renderInput("Chatbot Create Account URL", "chatbot_create_account_url")}
            {renderInput("Stripe Webhook Secret", "stripe_webhook_secret")}
            {renderInput("Stripe Return URL", "stripe_return_url")}
          </Col>
          <Col md={12}>
            {renderInput("Instabot AI Prompt", "instabot_ai_prompt")}
          </Col>
        </Row>
        {error && <div className="text-danger">{error}</div>}
      </Form>
    </div>
  );
};

export default AdminSystemSettings;
