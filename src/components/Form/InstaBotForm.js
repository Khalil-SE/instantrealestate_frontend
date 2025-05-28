// InstaBotForm.js
import React, { useState, useEffect } from "react";
import EmojiInput from "../Form/EmojiInput";
import DMPreview from "../InstagramPreview/DMPreview";
import { fetchPublicReplyTemplates } from "../../services/instabotService";

const InstaBotForm = ({ formData, setFormData, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     message_type: "text",
//     title: "",
//     message: "",
//     image: null,
//     image_url: "", // for preview
//     button1_text: "",
//     button1_url: "",
//     button2_text: "",
//     button2_url: "",
//     button3_text: "",
//     button3_url: "",
//     ai_post_description: "",
//     keyword: "",
//     public_reply_template_id: "",
//   });

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchPublicReplyTemplates()
      .then(setTemplates)
      .catch((err) => console.error("Failed to load templates", err));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    handleChange("image", file);
    handleChange("image_url", URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...formData };
    const payload = new FormData();

    for (let key in data) {
      if (key === "image" && data.image) {
        payload.append("image", data.image);
      } else if (data[key]) {
        payload.append(key, data[key]);
      }
    }

    onSubmit(payload);
  };

  return (
    <div className="row">
      <div >
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Message Type</label>
            <select
              className="form-select"
              value={formData.message_type}
              onChange={(e) => handleChange("message_type", e.target.value)}
            >
              <option value="text">Text Only</option>
              <option value="image">With Image</option>
            </select>
          </div>

          {formData.message_type === "image" && (
            <div className="mb-3">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
          )}

          <EmojiInput
            label="Title"
            value={formData.title}
            onChange={(value) => handleChange("title", value)}
          />

          <EmojiInput
            label="Message"
            type="textarea"
            value={formData.message}
            onChange={(value) => handleChange("message", value)}
          />

          {[1, 2, 3].map((i) => (
            <div className="row mb-2" key={i}>
              <div className="col">
                <EmojiInput
                  label={`Button ${i} Text`}
                  value={formData[`button${i}_text`]}
                  onChange={(value) => handleChange(`button${i}_text`, value)}
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder={`Button ${i} URL`}
                  value={formData[`button${i}_url`]}
                  onChange={(e) => handleChange(`button${i}_url`, e.target.value)}
                />
              </div>
            </div>
          ))}

          <EmojiInput
            label="AI Post Description"
            type="textarea"
            value={formData.ai_post_description}
            onChange={(value) => handleChange("ai_post_description", value)}
          />

          <div className="mb-3">
            <label>Keyword</label>
            <input
              type="text"
              className="form-control"
              placeholder="#yourkeyword"
              value={formData.keyword}
              onChange={(e) => handleChange("keyword", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Public Reply Template</label>
            <select
              className="form-select"
              value={formData.public_reply_template_id}
              onChange={(e) => handleChange("public_reply_template_id", e.target.value)}
            >
              <option value="">-- Select Template --</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Create InstaBot
          </button>
        </form>
      </div>

      {/* <div className="col-md-6">
        <DMPreview data={formData} />
      </div> */}
    </div>
  );
};

export default InstaBotForm;




// src/components/Instabot/InstaBotForm.js

// import React, { useState, useEffect } from "react";
// import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
// import EmojiInput from "../Form/EmojiInput";
// import DMPreview from "../InstagramPreview/DMPreview";
// import { createInstaBot, fetchPublicReplyTemplates } from "../../services/instabotService";

// import { toast } from "react-toastify";

// const InstaBotForm = () => {
//   const [form, setForm] = useState({
//     keyword: "",
//     message_type: "text",
//     image: null,
//     title: "",
//     message: "",
//     button1_text: "",
//     button1_url: "",
//     button2_text: "",
//     button2_url: "",
//     button3_text: "",
//     button3_url: "",
//     ai_post_description: "",
//     public_reply_template_id: "",
//   });

//   const [previewImageUrl, setPreviewImageUrl] = useState(null);
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPublicReplyTemplates()
//       .then((data) => setTemplates(data))
//       .catch(() => toast.error("Failed to load templates"));
//   }, []);

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));

//     if (field === "image") {
//       const imageFile = value;
//       const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
//       setPreviewImageUrl(imageUrl);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("keyword", form.keyword);
//       formData.append("message_type", form.message_type);
//       formData.append("title", form.title);
//       formData.append("message", form.message);
//       formData.append("button1_text", form.button1_text);
//       formData.append("button1_url", form.button1_url);
//       formData.append("button2_text", form.button2_text);
//       formData.append("button2_url", form.button2_url);
//       formData.append("button3_text", form.button3_text);
//       formData.append("button3_url", form.button3_url);
//       formData.append("ai_post_description", form.ai_post_description);
//       if (form.public_reply_template_id)
//         formData.append("public_reply_template_id", form.public_reply_template_id);
//       if (form.image) formData.append("image", form.image);

//       await createInstaBot(formData);
//       toast.success("InstaBot created successfully!");
//       // Optionally reset form here
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to create InstaBot");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Row>
//       <Col md={6}>
//         <Form onSubmit={handleSubmit}>
//           <EmojiInput
//             label="Keyword"
//             value={form.keyword}
//             onChange={(val) => handleChange("keyword", val)}
//           />

//           <Form.Group controlId="messageType" className="mb-3">
//             <Form.Label>Message Type</Form.Label>
//             <Form.Select
//               value={form.message_type}
//               onChange={(e) => handleChange("message_type", e.target.value)}
//             >
//               <option value="text">Text Only</option>
//               <option value="image">With Image</option>
//             </Form.Select>
//           </Form.Group>

//           {form.message_type === "image" && (
//             <Form.Group controlId="image" className="mb-3">
//               <Form.Label>Upload Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleChange("image", e.target.files[0])}
//               />
//             </Form.Group>
//           )}

//           <EmojiInput
//             label="Title"
//             value={form.title}
//             onChange={(val) => handleChange("title", val)}
//           />

//           <EmojiInput
//             label="Message"
//             as="textarea"
//             rows={3}
//             value={form.message}
//             onChange={(val) => handleChange("message", val)}
//           />

//           <EmojiInput
//             label="Button 1 Text"
//             value={form.button1_text}
//             onChange={(val) => handleChange("button1_text", val)}
//           />
//           <Form.Control
//             className="mb-2"
//             placeholder="Button 1 URL"
//             value={form.button1_url}
//             onChange={(e) => handleChange("button1_url", e.target.value)}
//           />

//           <EmojiInput
//             label="Button 2 Text"
//             value={form.button2_text}
//             onChange={(val) => handleChange("button2_text", val)}
//           />
//           <Form.Control
//             className="mb-2"
//             placeholder="Button 2 URL"
//             value={form.button2_url}
//             onChange={(e) => handleChange("button2_url", e.target.value)}
//           />

//           <EmojiInput
//             label="Button 3 Text"
//             value={form.button3_text}
//             onChange={(val) => handleChange("button3_text", val)}
//           />
//           <Form.Control
//             className="mb-3"
//             placeholder="Button 3 URL"
//             value={form.button3_url}
//             onChange={(e) => handleChange("button3_url", e.target.value)}
//           />

//           <EmojiInput
//             label="AI Post Description"
//             as="textarea"
//             rows={3}
//             value={form.ai_post_description}
//             onChange={(val) => handleChange("ai_post_description", val)}
//           />

//           <Form.Group controlId="publicReplyTemplate" className="mb-3">
//             <Form.Label>Public Reply Template</Form.Label>
//             <Form.Select
//               value={form.public_reply_template_id}
//               onChange={(e) => handleChange("public_reply_template_id", e.target.value)}
//             >
//               <option value="">-- Select Template --</option>
//               {templates.map((template) => (
//                 <option key={template.id} value={template.id}>
//                   {template.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Button type="submit" disabled={loading}>
//             {loading ? <Spinner size="sm" animation="border" /> : "Create InstaBot"}
//           </Button>
//         </Form>
//       </Col>

//       <Col md={6}>
//         <DMPreview
//           messageType={form.message_type}
//           image={previewImageUrl}
//           title={form.title}
//           message={form.message}
//           buttons={[
//             { text: form.button1_text },
//             { text: form.button2_text },
//             { text: form.button3_text },
//           ]}
//         />
//       </Col>
//     </Row>
//   );
// };

// export default InstaBotForm;



// // components/InstaBot/InstaBotForm.js
// import React from "react";
// import { Form, Row, Col } from "react-bootstrap";
// import EmojiInput from "./EmojiInput";

// function InstaBotForm({ formData, onChange, onImageChange }) {
//   return (
//     <>
//       <Form.Group className="mb-3">
//         <Form.Label>Message Type</Form.Label>
//         <Form.Select
//           name="message_type"
//           value={formData.message_type}
//           onChange={onChange}
//         >
//           <option value="text">Text Only</option>
//           <option value="image">With Image</option>
//         </Form.Select>
//       </Form.Group>

//       {formData.message_type === "image" && (
//         <Form.Group className="mb-3">
//           <Form.Label>Upload Image</Form.Label>
//           <Form.Control
//             type="file"
//             accept="image/*"
//             onChange={onImageChange}
//           />
//         </Form.Group>
//       )}

//       <EmojiInput
//         label="Title"
//         name="title"
//         value={formData.title}
//         onChange={onChange}
//       />

//       <EmojiInput
//         label="Message"
//         name="message"
//         as="textarea"
//         value={formData.message}
//         onChange={onChange}
//       />

//       <Row>
//         <Col md={6}>
//           <EmojiInput
//             label="Button 1 Text"
//             name="button1_text"
//             value={formData.button1_text}
//             onChange={onChange}
//           />
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Button 1 URL</Form.Label>
//             <Form.Control
//               type="url"
//               name="button1_url"
//               value={formData.button1_url}
//               onChange={onChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <EmojiInput
//             label="Button 2 Text"
//             name="button2_text"
//             value={formData.button2_text}
//             onChange={onChange}
//           />
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Button 2 URL</Form.Label>
//             <Form.Control
//               type="url"
//               name="button2_url"
//               value={formData.button2_url}
//               onChange={onChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <EmojiInput
//             label="Button 3 Text"
//             name="button3_text"
//             value={formData.button3_text}
//             onChange={onChange}
//           />
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Button 3 URL</Form.Label>
//             <Form.Control
//               type="url"
//               name="button3_url"
//               value={formData.button3_url}
//               onChange={onChange}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <EmojiInput
//         label="AI Post Description"
//         name="ai_post_description"
//         as="textarea"
//         value={formData.ai_post_description}
//         onChange={onChange}
//       />
//     </>
//   );
// }

// export default InstaBotForm;
