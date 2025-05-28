// import React from "react";

// import { Row, Col, Card, Form } from "react-bootstrap";

// import { COMPANY_SIZES } from "../../config/values";


// const UserProfile = () => {        
//   return (
//     <Card className="bg-white border-0 rounded-3 mb-4 rounded-top-0">
//         <Card.Body className="p-4">
//         <div className="d-flex justify-content-between flex-wrap gap-3">
//             <div className="d-flex align-items-end">
//               <div className="flex-shrink-0 position-relative">
//                 <img
//                   src="/images/user-68.jpg"
//                   className="rounded-circle border border-2 wh-160"
//                   alt="user"
//                   width={160}
//                   height={160}
//                 />
//                 <button
//                   type="button"
//                   className="position-absolute bottom-0 end-0 btn btn-light  border-0 hover hover-bg"
//                   // className=""
                  
                  
//                 >
//                   <i className="ri-add-circle-line fw-medium fs-18 me-1"></i>
//                 </button>
//               </div>
              
//             </div>

//             <div className="d-flex align-items-center">
//               <button
//                 type="button"
//                 className="btn btn-outline-light text-body fw-medium fs-16 px-4 hover hover-bg"
//               >
//                 <i className="ri-edit-line fw-medium fs-18 me-1"></i>
//                 <span>Edit</span>
//               </button>

//               <button type="button" className="btn btn-primary fw-medium fs-16 px-4 ms-3">
//                 <i className="ri-lock-2-line fw-medium fs-18 me-1"></i>
//                 <span>Reset Password</span>
//               </button> 
//             </div>
//           </div>

//           <h4 className="fs-18 mb-4 mt-4">Personal Information</h4>

//           <Form>
//             <Row>
//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">First Name</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="text"
//                       className="text-dark ps-5 h-55"
//                       placeholder="Enter Name"
//                     />
//                     <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Last Name</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="text"
//                       className="text-dark ps-5 h-55"
//                       placeholder="Enter Name"
//                     />
//                     <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Email Address</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="email"
//                       className="text-dark ps-5 h-55"
//                       placeholder="Enter Email Address"
//                     />
//                     <i className="ri-mail-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Phone</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="number"
//                       className="text-dark ps-5 h-55"
//                       placeholder="Enter Phone Number"
//                     />
//                     <i className="ri-phone-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

              

//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Company Size</label>
//                   <Form.Group className="position-relative">
//                     <Form.Select
//                       className="form-control ps-5 h-55"
//                       aria-label="Default select example"
//                     >
//                       <option value="0" className="text-dark">
//                         XS
//                       </option>
//                       <option value="1" className="text-dark">
//                         S
//                       </option>
//                       <option value="2" className="text-dark">
//                         M
//                       </option>
//                       <option value="3" className="text-dark">
//                         L
//                       </option>
//                     </Form.Select>
//                     <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

//               <Col lg={6} className="d-flex align-items-center">
                
//                 <Form.Group disabled>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value=""
//                     id="flexCheckDefault"
//                     defaultChecked
//                     disabled
//                   />
//                   <label className="form-check-label" htmlFor="flexCheckDefault">
//                     Terms and Conditions
//                   </label>
//                 </div>
//               </Form.Group>
                  
                
//               </Col>

//               <Col lg={12}>
//                 <hr />
//                 <h4 className="fs-18 mb-4 mt-4">Integration</h4>
//               </Col>

              
              
//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">ChatBot Key</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="text"
//                       className="text-dark ps-5 h-55"
//                       placeholder="ChatBot Key"
//                     />
//                     <i className="ri-key-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

//               <Col lg={6}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">ChatBot User ID</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="text"
//                       className="text-dark ps-5 h-55"
//                       placeholder="ChatBot User ID"
//                     />
//                     <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>

//               <Col lg={12}>
//                 <hr />
                
//               </Col>
//               <Col lg={12}>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Instant Real Estate API Key</label>
//                   <Form.Group className="position-relative">
//                     <Form.Control
//                       type="text"
//                       className="text-dark ps-5 h-55"
//                       placeholder="Instant Real Estate API Key"
//                       disabled
//                     />
//                     <i className="ri-key-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                   </Form.Group>
//                 </Form.Group>
//               </Col>
              
//             </Row>
//           </Form>






         
//         </Card.Body>
//         </Card>
//   );
// }
// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
// import { COMPANY_SIZES } from "../../config/values";
// import useAuth from "../../store/useAuth";
// import { updateUserMe } from "../../services/userService";

// const UserProfile = () => {
//   const user = useAuth((state) => state.user);
//   const setUser = useAuth((state) => state.setUser);
  

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     sizeOfCompany: "",
//     chatBot_key: "",
//     chatBot_user_id: "",
//     api_key: "",
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
//         sizeOfCompany: user.sizeOfCompany || "",
//         chatBot_key: user.chatBot_key || "",
//         chatBot_user_id: user.chatBot_user_id || "",
//         api_key: user.api_key || "",
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

//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">Company Size</label>
//                 <Form.Select
//                   name="sizeOfCompany"
//                   value={formData.sizeOfCompany}
//                   onChange={handleChange}
//                   className="form-control ps-5 h-55"
//                   disabled={!isEditing}
//                 >
//                   {Object.entries(COMPANY_SIZES).map(([key, value]) => (
//                     <option key={key} value={key}>
//                       {value}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col lg={6} className="d-flex align-items-center">
//               <Form.Group>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={true}
//                     disabled
//                   />
//                   <label className="form-check-label">Terms and Conditions</label>
//                 </div>
//               </Form.Group>
//             </Col>

//             <Col lg={12}>
//               <hr />
//               <h4 className="fs-18 mb-4 mt-4">Integration</h4>
//             </Col>

//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">ChatBot Key</label>
//                 <Form.Control
//                   name="chatBot_key"
//                   value={formData.chatBot_key}
//                   onChange={handleChange}
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   disabled={!isEditing}
//                 />
//               </Form.Group>
//             </Col>

//             <Col lg={6}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">ChatBot User ID</label>
//                 <Form.Control
//                   name="chatBot_user_id"
//                   value={formData.chatBot_user_id}
//                   onChange={handleChange}
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   disabled={!isEditing}
//                 />
//               </Form.Group>
//             </Col>

//             <Col lg={12}>
//               <Form.Group className="mb-4">
//                 <label className="label text-secondary">Instant Real Estate API Key</label>
//                 <Form.Control
//                   value={formData.api_key}
//                   type="text"
//                   className="text-dark ps-5 h-55"
//                   disabled
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { COMPANY_SIZES } from "../../config/values";
import useAuth from "../../store/useAuth";
import { updateUserMe } from "../../services/userService";
import ProfilePicture from "../../components/profile/ProfilePicture";

import ConnectLoftyButton from "../../components/LoftyRelatedComponents/ConnectLoftyButton";

const UserProfile = () => {
  const user = useAuth((state) => state.user);
  // const setUser = useAuth((state) => state.setUser);
  const subscription = useAuth((state) => state.subscription);
  console.log(subscription);
  

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    sizeOfCompany: "",
    chatBot_key: "",
    chatBot_user_id: "",
    api_key: "",
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
        sizeOfCompany: user.sizeOfCompany || "",
        chatBot_key: user.chatBot_key || "",
        chatBot_user_id: user.chatBot_user_id || "",
        api_key: user.api_key || "",
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
                src= {user?.picture || "/images/user-68.jpg"}
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

            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">Company Size</label>
                <Form.Group className="position-relative">
                <Form.Select
                  name="sizeOfCompany"
                  value={formData.sizeOfCompany}
                  onChange={handleChange}
                  className={`form-control ps-5 h-55 ${errors.sizeOfCompany ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                >
                  {Object.entries(COMPANY_SIZES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
                <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.sizeOfCompany && <div className="invalid-feedback d-block">{errors.sizeOfCompany}</div>}
              </Form.Group>
            </Col>

            <Col lg={6} className="d-flex align-items-center">
              <Form.Group>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={true}
                    disabled
                  />
                  <label className="form-check-label">Terms and Conditions</label>
                </div>
              </Form.Group>
            </Col>

            <Col lg={12}>
              <hr />
              <h4 className="fs-18 mb-4 mt-4">Integration</h4>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">ChatBot Key</label>
                <Form.Group className="position-relative"> 
                <Form.Control
                  name="chatBot_key"
                  value={formData.chatBot_key}
                  onChange={handleChange}
                  type="text"
                  className={`text-dark ps-5 h-55 ${errors.chatBot_key ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                />
                <i className="ri-key-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.chatBot_key && <div className="invalid-feedback d-block">{errors.chatBot_key}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">ChatBot User ID</label>
                <Form.Group className="position-relative"> 
                <Form.Control
                  name="chatBot_user_id"
                  value={formData.chatBot_user_id}
                  onChange={handleChange}
                  type="text"
                  className={`text-dark ps-5 h-55 ${errors.chatBot_user_id ? "is-invalid" : ""}`}
                  disabled={!isEditing}
                />
                <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
                {errors.chatBot_user_id && <div className="invalid-feedback d-block">{errors.chatBot_user_id}</div>}
              </Form.Group>
            </Col>

            <Col lg={12}>
              <Form.Group className="mb-4">
                <label className="label text-secondary">Instant Real Estate API Key</label>
                <Form.Group className="position-relative"> 
                <Form.Control
                  value={formData.api_key}
                  type="text"
                  className="text-dark ps-5 h-55"
                  disabled
                />
                <i className="ri-key-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                </Form.Group>
              </Form.Group>
            </Col>
            <Col lg={12}>
              <ConnectLoftyButton />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
