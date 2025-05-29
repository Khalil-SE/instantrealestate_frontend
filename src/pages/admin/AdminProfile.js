// import React, { useState, useEffect } from "react";
// import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

// import useAuth from "../../store/useAuth";
// import { updateUserMe } from "../../services/userService";

// const AdminProfile = () => {
//   const user = useAuth((state) => state.user);
//   const setUser = useAuth((state) => state.setUser);
  

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         first_name: user.first_name || "",
//         last_name: user.last_name || "",
//         email: user.email || "",
//         phone_number: user.phone_number || "",
        
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditToggle = async () => {

//     if (isEditing) {
//       setIsSaving(true);
//       try {
//         await updateUserMe(formData);
//         setIsEditing(false);
//       } catch (error) {
//         console.error("Update failed", error);
//       } finally {
//         setIsSaving(false);
//       }
//     } else {
//       setIsEditing(true);
//     }
//   };

//   return (
//     <Card className="bg-white border-0 rounded-3 mb-4 rounded-top-0">
//       {isSaving && (
//         <div
//           className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", zIndex: 0 }}
//         >
//           <Spinner animation="border" variant="primary" />
//         </div>
//       )}
//       <Card.Body className="p-4">
//         <div className="d-flex justify-content-between flex-wrap gap-3">
//           <div className="d-flex align-items-end">
//             <div className="flex-shrink-0 position-relative">
//               <img
//                 src="/images/user-68.jpg"
//                 className="rounded-circle border border-2 wh-160"
//                 alt="user"
//                 width={160}
//                 height={160}
//               />
//               <button
//                 type="button"
//                 className="position-absolute bottom-0 end-0 btn btn-light border-0 hover hover-bg"
//               >
//                 <i className="ri-add-circle-line fw-medium fs-18 me-1"></i>
//               </button>
//             </div>
//           </div>

//           <div className="d-flex align-items-center">
//             <Button
//               onClick={handleEditToggle}
//               className=  {` ${isEditing ? "btn-info": "btn-primary" } fw-medium fs-16 px-4`}
//               variant="outline-light"
//             >
//               <i className="ri-edit-line fw-medium fs-18 me-1"></i>
//               <span>{isEditing ? "Save" : "Edit"}</span>
//             </Button>

            
//           </div>
//         </div>

//         <h4 className="fs-18 mb-4 mt-4">Personal Information</h4>

//         <Form>
//           <Row>
//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">First Name</label>
//                 <Form.Control
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   disabled={!isEditing}
//                 />
//               </Form.Group>
//             </Col>

//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">Last Name</label>
//                 <Form.Control
//                   name="last_name"
//                   value={formData.last_name}
//                   onChange={handleChange}
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   disabled={!isEditing}
//                 />
//               </Form.Group>
//             </Col>

//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">Email</label>
//                 <Form.Control
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   type="email"
//                   className="text-dark ps-5 h-55"
//                   disabled={!isEditing}
//                 />
//               </Form.Group>
//             </Col>

//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">Phone</label>
//                 <Form.Control
//                   name="phone_number"
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   disabled={!isEditing}
//                 />
//               </Form.Group>
//             </Col>


//           </Row>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AdminProfile;


import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import ProfilePicture from "../../components/profile/ProfilePicture";

import useAuth from "../../store/useAuth";
import { updateUserMe } from "../../services/userService";

const AdminProfile = () => {
  const user = useAuth((state) => state.user);
  // const setUser = useAuth((state) => state.setUser);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      setIsSaving(true);
      try {
        await updateUserMe(formData);
        setIsEditing(false);
        setErrors({});
      } catch (error) {
        setErrors(error);
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Card className="bg-white border-0 rounded-3 mb-4 rounded-top-0">
      {isSaving && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", zIndex: 0 }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-end">
            {/* <div className="flex-shrink-0 position-relative">
              <img
                src={user?.picture || "/images/user-68.jpg"}
                className="rounded-circle border border-2 wh-160"
                alt="user"
                width={160}
                height={160}
              />
              



              
                
                <div className="position-absolute bottom-0 end-0">
                  <div className="product-upload">
                    <label htmlFor="file-upload" className="file-upload mb-0">
                      <i className="ri-image-add-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
                      
                    </label>
                    <input id="file-upload" type="file" />
                  </div>
                </div>
              


            </div> */}
            <ProfilePicture picture={user?.picture} />
          </div>

          <div className="d-flex align-items-center">
            <Button
              onClick={handleEditToggle}
              className={`btn ${isEditing ? "btn-success" : "btn-primary"} py-2 px-4 fw-medium fs-16`} 
              
            >
              <i className="ri-edit-line fw-medium fs-18 me-1"></i>
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>

        <h4 className="fs-18 mb-4 mt-4">Personal Information</h4>

        <Form>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">First Name</label>
                <Form.Group className="position-relative"> 
                <Form.Control
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  className={`text-dark ps-5 h-55 ${errors.first_name ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                />
                <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.first_name && <div className="invalid-feedback d-block">{errors.first_name}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">Last Name</label>
                <Form.Group className="position-relative">
                <Form.Control
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  className={`text-dark ps-5 h-55 ${errors.last_name ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                />
                <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.last_name && <div className="invalid-feedback d-block">{errors.last_name}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">Email</label>
                <Form.Group className="position-relative">
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className={`text-dark ps-5 h-55 ${errors.email ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                />
                <i className="ri-mail-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">Phone</label>
                <Form.Group className="position-relative">
                <Form.Control
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  type="text"
                  className={`text-dark ps-5 h-55 ${errors.phone_number ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                />
                <i className="ri-phone-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.phone_number && <div className="invalid-feedback d-block">{errors.phone_number}</div>}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminProfile;
