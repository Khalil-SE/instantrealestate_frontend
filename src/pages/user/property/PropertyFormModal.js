"property/PropertyFormModal.js"
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import {
  createProperty,
  updateProperty,
} from "../../../services/propertyService";
import { markLoftyPropertyImported } from "../../../services/loftyService"
import { toast } from "react-toastify";
import KeywordInput from "../../../components/InstaBot/KeywordInput";
import EmailInputList from "../../../components/InstaBot/EmailInputList";

const PropertyFormModal = ({
  show,
  onHide,
  initialData = null,
  onSubmitSuccess,
  mode = "add",
  
}) => {
  const [formData, setFormData] = useState({
    keyword: "",
    url: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    price: "",
    home_type: "",
    beds: "",
    baths: "",
    sqft: "",
    lot_size: "",
    description: "",
    image_url: "",
    button1_text: "",
    button1_url: "",
    button2_text: "",
    button2_url: "",
    email_recipients: [],
  });

  const [emailInput, setEmailInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const cleanData = {
        listing_id: initialData?.listing_id || null,  //This listing_id will be only present when the data is coming from loftyProperty
        keyword: initialData.keyword?.text || initialData.keyword || "",
        url: initialData.url || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        zip_code: initialData.zip_code || "",
        price: initialData.price || "",
        home_type: initialData.home_type || "",
        beds: initialData.beds || "",
        baths: initialData.baths || "",
        sqft: initialData.sqft || "",
        lot_size: initialData.lot_size || "",
        description: initialData.description || "",
        image_url: initialData.image_url || "",
        button1_text: initialData.button1_text || "",
        button1_url: initialData.button1_url || "",
        button2_text: initialData.button2_text || "",
        button2_url: initialData.button2_url || "",
        email_recipients: initialData.email_recipients || [],
      };
      setFormData(cleanData);
      setEmailInput("");
    } else {
      setFormData({
        keyword: "",
        url: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        price: "",
        home_type: "",
        beds: "",
        baths: "",
        sqft: "",
        lot_size: "",
        description: "",
        image_url: "",
        button1_text: "",
        button1_url: "",
        button2_text: "",
        button2_url: "",
        email_recipients: [],
      });
      setEmailInput("");
    }
    setErrors({});
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeywordChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      keyword: value,
    }));
  };

  const handleSubmit = async () => {
    // console.log("PropertFormModal");
    
    // console.log(formData);
    
    setSubmitting(true);
    setErrors({});
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price || 0),
        beds: parseInt(formData.beds || 0),
        baths: parseInt(formData.baths || 0),
        sqft: parseInt(formData.sqft || 0),
        lot_size: parseFloat(formData.lot_size || 0),
        keyword: { text: formData.keyword },
      };

      if (mode === "edit") {
        await updateProperty(initialData.id, payload);
        toast.success("Property updated");
      } else {
        await createProperty(payload);
        if (payload.listing_id != null){
            // mark imported successfully
            await markLoftyPropertyImported(payload.listing_id)
        }

        toast.success("Property created");
      }

      onSubmitSuccess?.();
      onHide();
    } catch (error) {
      toast.error("Failed to submit property");
      if (error.response?.data) {
        setErrors(error.response.data);
      }
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "edit" ? "Edit" : "Create"} Property
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <KeywordInput
              existingKeywordObj={initialData?.keyword}
                value={formData.keyword}
                onChange={handleKeywordChange}
              />
              {errors.keyword && (
                <div className="text-danger">{errors.keyword}</div>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  isInvalid={!!errors.zip_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zip_code}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Home Type</Form.Label>
                <Form.Control
                  type="text"
                  name="home_type"
                  value={formData.home_type}
                  onChange={handleChange}
                  isInvalid={!!errors.home_type}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.home_type}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Beds</Form.Label>
                <Form.Control
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  isInvalid={!!errors.beds}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.beds}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Baths</Form.Label>
                <Form.Control
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  isInvalid={!!errors.baths}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.baths}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Square Feet</Form.Label>
                <Form.Control
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                  isInvalid={!!errors.sqft}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sqft}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lot Size</Form.Label>
                <Form.Control
                  type="number"
                  name="lot_size"
                  value={formData.lot_size}
                  onChange={handleChange}
                  isInvalid={!!errors.lot_size}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lot_size}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                />
                {errors.image_url && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {errors.image_url[0]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
                {errors.url && (
                  <Form.Control.Feedback type="invalid">
                    {errors.url[0]}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Button 1 Text</Form.Label>
            <Form.Control
              type="text"
              name="button1_text"
              value={formData.button1_text}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Button 1 URL</Form.Label>
            <Form.Control
              type="url"
              name="button1_url"
              value={formData.button1_url}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Button 2 Text</Form.Label>
            <Form.Control
              type="text"
              name="button2_text"
              value={formData.button2_text}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Button 2 URL</Form.Label>
            <Form.Control
              type="url"
              name="button2_url"
              value={formData.button2_url}
              onChange={handleChange}
            />
          </Form.Group>

          <EmailInputList
            emails={formData.email_recipients}
            setEmails={(emails) =>
              setFormData((prev) => ({ ...prev, email_recipients: emails }))
            }
            emailInput={emailInput}
            setEmailInput={setEmailInput}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : mode === "edit" ? (
            "Update Property"
          ) : (
            "Create Property"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertyFormModal;

// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
// import { createProperty, updateProperty } from "../../../services/propertyService";
// import { toast } from "react-toastify";
// import KeywordInput from "../../../components/InstaBot/KeywordInput";

// const initialFormState = {
//   keyword: "",
//   url: "",
//   address: "",
//   city: "",
//   state: "",
//   zip_code: "",
//   price: "",
//   home_type: "",
//   beds: "",
//   baths: "",
//   sqft: "",
//   lot_size: "",
//   description: "",
//   image_url: "",
//   button1_text: "",
//   button1_url: "",
//   button2_text: "",
//   button2_url: "",
//   email_recipients: [],
// };

// const PropertyFormModal = ({ show, onHide, initialData = null, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   // Populate form when editing
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         keyword: initialData.keyword?.text || "",
//         url: initialData.url || "",
//         address: initialData.address || "",
//         city: initialData.city || "",
//         state: initialData.state || "",
//         zip_code: initialData.zip_code || "",
//         price: initialData.price || "",
//         home_type: initialData.home_type || "",
//         beds: initialData.beds || "",
//         baths: initialData.baths || "",
//         sqft: initialData.sqft || "",
//         lot_size: initialData.lot_size || "",
//         description: initialData.description || "",
//         image_url: initialData.image_url || "",
//         button1_text: initialData.button1_text || "",
//         button1_url: initialData.button1_url || "",
//         button2_text: initialData.button2_text || "",
//         button2_url: initialData.button2_url || "",
//         email_recipients: initialData.email_recipients || [],
//       });
//       setErrors({});
//     } else {
//       setFormData(initialFormState);
//       setErrors({});
//     }
//   }, [initialData, show]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({ ...prev, [name]: null }));
//   };

//   const handleKeywordChange = (value) => {
//     setFormData((prev) => ({ ...prev, keyword: value }));
//     setErrors((prev) => ({ ...prev, keyword: null }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.keyword?.trim()) newErrors.keyword = "Keyword is required";
//     if (!formData.address?.trim()) newErrors.address = "Address is required";
//     if (!formData.city?.trim()) newErrors.city = "City is required";
//     if (!formData.state?.trim()) newErrors.state = "State is required";
//     if (!formData.zip_code?.trim()) newErrors.zip_code = "Zip code is required";
//     if (!formData.price) newErrors.price = "Price is required";
//     return newErrors;
//   };

//   const handleSubmit = async () => {
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast.error("Please fix the validation errors.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const payload = {
//         ...formData,
//         keyword: { text: formData.keyword },
//         price: parseFloat(formData.price || 0),
//         beds: parseInt(formData.beds || 0),
//         baths: parseInt(formData.baths || 0),
//         sqft: parseInt(formData.sqft || 0),
//         lot_size: parseFloat(formData.lot_size || 0),
//       };

//       if (initialData?.id) {
//         await updateProperty(initialData.id, payload);
//         toast.success("Property updated");
//       } else {
//         await createProperty(payload);
//         toast.success("Property created");
//       }

//       onSubmitSuccess?.();
//       onHide();
//     } catch (error) {
//       toast.error("Failed to submit property");
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{initialData?.id ? "Edit" : "Create"} Property</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Row>
//             <Col md={6}>
//               <KeywordInput value={formData.keyword} onChange={handleKeywordChange} />
//               {errors.keyword && <div className="text-danger small mb-2">{errors.keyword}</div>}

//               <Form.Group className="mb-3">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   isInvalid={!!errors.address}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   isInvalid={!!errors.city}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   isInvalid={!!errors.state}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Zip Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="zip_code"
//                   value={formData.zip_code}
//                   onChange={handleChange}
//                   isInvalid={!!errors.zip_code}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.zip_code}</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Price</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   isInvalid={!!errors.price}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Home Type</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="home_type"
//                   value={formData.home_type}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Beds</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="beds"
//                   value={formData.beds}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Baths</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="baths"
//                   value={formData.baths}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Square Feet</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="sqft"
//                   value={formData.sqft}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Lot Size</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="lot_size"
//                   value={formData.lot_size}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Image URL</Form.Label>
//                 <Form.Control
//                   type="url"
//                   name="image_url"
//                   value={formData.image_url}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>URL</Form.Label>
//                 <Form.Control
//                   type="url"
//                   name="url"
//                   value={formData.url}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
//           {submitting ? <Spinner as="span" animation="border" size="sm" /> : initialData?.id ? "Update" : "Create"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PropertyFormModal;

// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
// import { createProperty, updateProperty } from "../../../services/propertyService";
// import { toast } from "react-toastify";
// import KeywordInput from "../../../components/InstaBot/KeywordInput";

// const initialFormState = {
//   keyword: "",
//   url: "",
//   address: "",
//   city: "",
//   state: "",
//   zip_code: "",
//   price: "",
//   home_type: "",
//   beds: "",
//   baths: "",
//   sqft: "",
//   lot_size: "",
//   description: "",
//   image_url: "",
//   button1_text: "",
//   button1_url: "",
//   button2_text: "",
//   button2_url: "",
//   email_recipients: [],
// };

// const PropertyFormModal = ({ show, onHide, initialData = null, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (show) {
//       if (initialData) {
//         setFormData({
//           keyword: initialData.keyword?.text || "",
//           url: initialData.url || "",
//           address: initialData.address || "",
//           city: initialData.city || "",
//           state: initialData.state || "",
//           zip_code: initialData.zip_code || "",
//           price: initialData.price || "",
//           home_type: initialData.home_type || "",
//           beds: initialData.beds || "",
//           baths: initialData.baths || "",
//           sqft: initialData.sqft || "",
//           lot_size: initialData.lot_size || "",
//           description: initialData.description || "",
//           image_url: initialData.image_url || "",
//           button1_text: initialData.button1_text || "",
//           button1_url: initialData.button1_url || "",
//           button2_text: initialData.button2_text || "",
//           button2_url: initialData.button2_url || "",
//           email_recipients: initialData.email_recipients || [],
//         });
//       } else {
//         setFormData(initialFormState);
//       }
//       setErrors({});
//     }
//   }, [show, initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: null }));
//   };

//   const handleKeywordChange = (val) => {
//     setFormData((prev) => ({ ...prev, keyword: val }));
//     setErrors((prev) => ({ ...prev, keyword: null }));
//   };

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     setErrors({});
//     try {
//       const payload = {
//         ...formData,
//         keyword: { text: formData.keyword },
//         price: parseFloat(formData.price || 0),
//         beds: parseInt(formData.beds || 0),
//         baths: parseInt(formData.baths || 0),
//         sqft: parseInt(formData.sqft || 0),
//         lot_size: parseFloat(formData.lot_size || 0),
//       };

//       if (initialData?.id) {
//         await updateProperty(initialData.id, payload);
//         toast.success("Property updated");
//       } else {
//         await createProperty(payload);
//         toast.success("Property created");
//       }

//       onSubmitSuccess?.();
//       onHide();
//     } catch (error) {
//       if (error.response?.data) {
//         setErrors(error.response.data);
//       } else {
//         toast.error("Failed to submit property");
//         console.error(error);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{initialData?.id ? "Edit" : "Create"} Property</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <KeywordInput value={formData.keyword} onChange={handleKeywordChange} />
//           {errors.keyword && <div className="text-danger small mb-2">{errors.keyword}</div>}

//           <Row>
//             <Col md={6}>
//               {["address", "city", "state", "zip_code", "price", "home_type"].map((field) => (
//                 <Form.Group className="mb-3" key={field}>
//                   <Form.Label>{field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Form.Label>
//                   <Form.Control
//                     type={field === "price" ? "number" : "text"}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                   />
//                   {errors[field] && <div className="text-danger small">{errors[field]}</div>}
//                 </Form.Group>
//               ))}
//             </Col>

//             <Col md={6}>
//               {["beds", "baths", "sqft", "lot_size", "image_url", "url"].map((field) => (
//                 <Form.Group className="mb-3" key={field}>
//                   <Form.Label>{field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Form.Label>
//                   <Form.Control
//                     type={["image_url", "url"].includes(field) ? "url" : "number"}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                   />
//                   {errors[field] && <div className="text-danger small">{errors[field]}</div>}
//                 </Form.Group>
//               ))}
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//             />
//             {errors.description && <div className="text-danger small">{errors.description}</div>}
//           </Form.Group>
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
//           {submitting ? (
//             <Spinner as="span" animation="border" size="sm" />
//           ) : initialData?.id ? (
//             "Update Property"
//           ) : (
//             "Create Property"
//           )}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PropertyFormModal;

// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
// import { createProperty, updateProperty } from "../../../services/propertyService";
// import { toast } from "react-toastify";
// import KeywordInput from "../../../components/InstaBot/KeywordInput";

// const PropertyFormModal = ({ show, onHide, initialData = null, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState({
//     keyword: "",
//     url: "",
//     address: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     price: "",
//     home_type: "",
//     beds: "",
//     baths: "",
//     sqft: "",
//     lot_size: "",
//     description: "",
//     image_url: "",
//     button1_text: "",
//     button1_url: "",
//     button2_text: "",
//     button2_url: "",
//     email_recipients: [],
//   });

//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       const cleanData = {
//         keyword: initialData.keyword?.text || "",
//         url: initialData.url || "",
//         address: initialData.address || "",
//         city: initialData.city || "",
//         state: initialData.state || "",
//         zip_code: initialData.zip_code || "",
//         price: initialData.price || "",
//         home_type: initialData.home_type || "",
//         beds: initialData.beds || "",
//         baths: initialData.baths || "",
//         sqft: initialData.sqft || "",
//         lot_size: initialData.lot_size || "",
//         description: initialData.description || "",
//         image_url: initialData.image_url || "",
//         button1_text: initialData.button1_text || "",
//         button1_url: initialData.button1_url || "",
//         button2_text: initialData.button2_text || "",
//         button2_url: initialData.button2_url || "",
//         email_recipients: initialData.email_recipients || [],
//       };
//       setFormData(cleanData);
//     } else {
//       setFormData((prev) => ({ ...prev, keyword: "" }));
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     try {
//       const payload = {
//         ...formData,
//         keyword: { text: formData.keyword },
//         price: parseFloat(formData.price || 0),
//         beds: parseInt(formData.beds || 0),
//         baths: parseInt(formData.baths || 0),
//         sqft: parseInt(formData.sqft || 0),
//         lot_size: parseFloat(formData.lot_size || 0),
//       };

//       if (initialData?.id) {
//         await updateProperty(initialData.id, payload);
//         toast.success("Property updated");
//       } else {
//         await createProperty(payload);
//         toast.success("Property created");
//       }

//       onSubmitSuccess?.();
//       onHide();
//     } catch (error) {
//       toast.error("Failed to submit property");
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{initialData?.id ? "Edit" : "Create"} Property</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Row>
//             <Col md={6}>
//               <KeywordInput
//                 value={formData.keyword}
//                 onChange={(val) => setFormData((prev) => ({ ...prev, keyword: val }))}
//               />
//               <Form.Group className="mb-3">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Zip Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="zip_code"
//                   value={formData.zip_code}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Price</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Home Type</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="home_type"
//                   value={formData.home_type}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Beds</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="beds"
//                   value={formData.beds}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Baths</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="baths"
//                   value={formData.baths}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Square Feet</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="sqft"
//                   value={formData.sqft}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Lot Size</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="lot_size"
//                   value={formData.lot_size}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Image URL</Form.Label>
//                 <Form.Control
//                   type="url"
//                   name="image_url"
//                   value={formData.image_url}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>URL</Form.Label>
//                 <Form.Control
//                   type="url"
//                   name="url"
//                   value={formData.url}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
//           {submitting ? (
//             <Spinner as="span" animation="border" size="sm" />
//           ) : initialData?.id ? (
//             "Update Property"
//           ) : (
//             "Create Property"
//           )}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PropertyFormModal;

// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
// import { createProperty, updateProperty } from "../../../services/propertyService";
// import { toast } from "react-toastify";

// const PropertyFormModal = ({ show, onHide, initialData = null, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState({
//     keyword: "",
//     url: "",
//     address: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     price: "",
//     home_type: "",
//     beds: "",
//     baths: "",
//     sqft: "",
//     lot_size: "",
//     description: "",
//     image_url: "",
//     button1_text: "",
//     button1_url: "",
//     button2_text: "",
//     button2_url: "",
//     email_recipients: [],
//   });

//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       const cleanData = {
//         keyword: initialData.keyword?.text || "",
//         url: initialData.url || "",
//         address: initialData.address || "",
//         city: initialData.city || "",
//         state: initialData.state || "",
//         zip_code: initialData.zip_code || "",
//         price: initialData.price || "",
//         home_type: initialData.home_type || "",
//         beds: initialData.beds || "",
//         baths: initialData.baths || "",
//         sqft: initialData.sqft || "",
//         lot_size: initialData.lot_size || "",
//         description: initialData.description || "",
//         image_url: initialData.image_url || "",
//         button1_text: initialData.button1_text || "",
//         button1_url: initialData.button1_url || "",
//         button2_text: initialData.button2_text || "",
//         button2_url: initialData.button2_url || "",
//         email_recipients: initialData.email_recipients || [],
//       };
//       setFormData(cleanData);
//     } else {
//       setFormData((prev) => ({ ...prev, keyword: "" }));
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     try {
//       const payload = {
//         ...formData,
//         price: parseFloat(formData.price || 0),
//         beds: parseInt(formData.beds || 0),
//         baths: parseInt(formData.baths || 0),
//         sqft: parseInt(formData.sqft || 0),
//         lot_size: parseFloat(formData.lot_size || 0),
//       };

//       if (initialData?.id) {
//         await updateProperty(initialData.id, payload);
//         toast.success("Property updated");
//       } else {
//         await createProperty(payload);
//         toast.success("Property created");
//       }

//       onSubmitSuccess?.();
//       onHide();
//     } catch (error) {
//       toast.error("Failed to submit property");
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{initialData?.id ? "Edit" : "Create"} Property</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Keyword</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="keyword"
//                   value={formData.keyword}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Zip Code</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="zip_code"
//                   value={formData.zip_code}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Price</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Home Type</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="home_type"
//                   value={formData.home_type}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Beds</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="beds"
//                   value={formData.beds}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Baths</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="baths"
//                   value={formData.baths}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Square Feet</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="sqft"
//                   value={formData.sqft}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Lot Size</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="lot_size"
//                   value={formData.lot_size}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Image URL</Form.Label>
//                 <Form.Control
//                   type="url"
//                   name="image_url"
//                   value={formData.image_url}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>URL</Form.Label>
//                 <Form.Control
//                   type="url"
//                   name="url"
//                   value={formData.url}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
//           {submitting ? (
//             <Spinner as="span" animation="border" size="sm" />
//           ) : initialData?.id ? (
//             "Update Property"
//           ) : (
//             "Create Property"
//           )}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PropertyFormModal;
