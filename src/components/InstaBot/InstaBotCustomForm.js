import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Form, Button, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import EmojiTextInput from "../Form/EmojiTextInput";
import KeywordInput from "./KeywordInput";
import ButtonsInputGroup from "./ButtonsInputGroup";
import ImageUploader from "./ImageUploader";
import PublicReplySelector from "./PublicReplySelector";
import EmailInputList from "./EmailInputList";
import PublicReplyModal from "./PublicReplyModal";
import ConfirmModal from "../Modal/ConfirmModal";
import {
  createInstaBot,
  updateInstaBot,
  
  fetchPublicReplyTemplates,
  deletePublicReplyTemplate,
  updatePublicReplyTemplate,
  createPublicReplyTemplate,
} from "../../services/instabotService";
import { uploadInstaBotImageToBunny } from "../../services/bunnyCdnService";
import { ROUTES } from "../../config/routes";


const InstaBotCustomForm = ({
  instabotId = null, // optional for edit mode
  instaBotObj = null,
  formData,
  setFormData,
  buttons,
  setButtons,
  emails,
  setEmails,
  emailInput,
  setEmailInput,
}) => {
  // const [formData, setFormData] = useState({
  //   keyword: "",
  //   message_type: "text",
  //   image: null,
  //   title: "",
  //   message: "",
  //   ai_post_description: "",
  //   public_reply_template_id: "",
  // });

  // const [buttons, setButtons] = useState([{ text: "", url: "" }]);
  // const [emails, setEmails] = useState([]);
  // const [emailInput, setEmailInput] = useState("");


  // console.log("P R T ->" + formData.public_reply_template_id);
  
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});


  const [templates, setTemplates] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [editTemplate, setEditTemplate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isEditMode = Boolean(instabotId);
  


//   useEffect(() => {
//   const loadData = async () => {
//     try {
//       // await fetchTemplates(); // Fetches templates once
//       if (isEditMode && instabotId) {
//         await fetchBotData(); // Fetches InstaBot data if in edit mode
//       }
//     } catch (error) {
//       console.error("Failed to load data", error);
//     }
//   };

//   loadData();
// }, [instabotId]); // Runs only when instabotId changes (or once if null)

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);
  useEffect(() => {
    
    if(!isEditMode){
      setFormData({
        keyword: "",
        message_type: "image",
        image: null,
        title: "This is a test title",
        message: "This message is related to instabot description.",
        ai_post_description: "Description for AI post.",
        public_reply_template_id: "",
        status: "active",
      });
      setButtons([{ text: "", url: "" }]);
      setEmails([]);
      setEmailInput("");
    }
  },[isEditMode, setFormData, setButtons, setEmails, setEmailInput]);

  const fetchTemplates = async () => {
    try {
      const data = await fetchPublicReplyTemplates();
      setTemplates(data);
    } catch (err) {
      console.error("Failed to fetch templates", err);
    }
  };
  const handleSaveTemplate = async (data) => {
    try {
      if (editTemplate?.id) {
        await updatePublicReplyTemplate(editTemplate.id, data);
      } else {
        await createPublicReplyTemplate(data);
      }
      await fetchTemplates();
      setShowReplyModal(false);
      setEditTemplate(null);
    } catch (err) {
      console.error("Failed to save template", err);
    }
  };


  // const fetchBotData = async () => {
  //   try {
  //     const data = await getInstaBotById(instabotId);
  //     setFormData({
  //       keyword: data.keyword?.text || "",
  //       message_type: data.message_type,
  //       image: null,
  //       title: data.title,
  //       message: data.message,
  //       ai_post_description: data.ai_post_description,
  //       public_reply_template_id: data.public_reply_template_id || "",
  //       status: data.status || "active",
  //     });
  //     setButtons([
  //       { text: data.button1_text || "", url: data.button1_url || "" },
  //       { text: data.button2_text || "", url: data.button2_url || "" },
  //       { text: data.button3_text || "", url: data.button3_url || "" },
  //     ]);
  //     setEmails(data.recipients || []);
  //   } catch (err) {
  //     console.error("Failed to fetch bot data", err);
  //   }
  // };


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // if (field  === "image") {
    //   console.log(`Selected file: ${value.name}`);
    // }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      status: formData.status,
      message_type: formData.message_type,
      title: formData.title,
      message: formData.message,
      ai_post_description: formData.ai_post_description,
      keyword: { text: formData.keyword.trim() },
      public_reply_template_id: formData.public_reply_template_id || null,
      button1_text: buttons[0]?.text || "",
      button1_url: buttons[0]?.url || "",
      button2_text: buttons[1]?.text || "",
      button2_url: buttons[1]?.url || "",
      button3_text: buttons[2]?.text || "",
      button3_url: buttons[2]?.url || "",
      email_recipients: emails,
    };

    try {
      setFormErrors({});
      const bot = isEditMode
        ? await updateInstaBot(instabotId, payload)
        : await createInstaBot(payload);

      if (formData.image && formData.message_type === "image") {
        const imageUrl = await uploadInstaBotImageToBunny(formData.image, bot.id);
        await updateInstaBot(bot.id, {image_url:imageUrl});
      }
      toast.success(`InstaBot ${isEditMode ? "updated" : "created"} successfully!`);
      
      navigate(ROUTES.USER.INSTABOT.INSTABOTS);

      // alert(`InstaBot ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (err) {
      if (err.response?.data) {
        setFormErrors(err.response.data);
      } else {
        console.error("Save failed", err);
        // alert("Unexpected error occurred.");
        toast.error("Unexpected error occurred.")
      }
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // 1. Prepare raw JSON payload
  //   const payload = {
  //     status: formData.status,
  //     message_type: formData.message_type,
  //     title: formData.title,
  //     message: formData.message,
  //     ai_post_description: formData.ai_post_description,
  //     keyword: { text: formData.keyword.trim() },
  //     public_reply_template_id: formData.public_reply_template_id || null,
  //     button1_text: buttons[0]?.text || "",
  //     button1_url: buttons[0]?.url || "",
  //     button2_text: buttons[1]?.text || "",
  //     button2_url: buttons[1]?.url || "",
  //     button3_text: buttons[2]?.text || "",
  //     button3_url: buttons[2]?.url || "",
  //     recipients: emails,
      
  //   };

  //   console.log(formData.image);

  //   try {
  //     // 2. Create InstaBot (without image)
  //     const createdBot = await createInstaBot(payload); // Should return the created object

  //     setFormErrors({});

  //     // 3. Upload image if provided
  //     if (formData.image && formData.message_type === "image") {
  //       const imageUrl = await uploadInstaBotImageToBunny(
  //         formData.image,
  //         createdBot.id
  //       );
  //       await updateInstaBotImageUrl(createdBot.id, imageUrl);
  //     }

  //     alert("InstaBot created successfully!");
  //     // Optionally: resetForm()
  //   } catch (err) {

  //     if (err.response?.data) {
  //       setFormErrors(err.response.data);  // Set errors like { keyword: ["This field is required."] }
  //     } else {
  //       console.error("InstaBot creation failed", err);
  //       alert("Unexpected error occurred.");
  //     }

  //     // console.error("InstaBot creation failed", err);
  //     // alert("Failed to create InstaBot.");
  //   }
  // };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // 1. Prepare payload without image
  //   const payload = new FormData();
  //   payload.append("message_type", formData.message_type);
  //   payload.append("title", formData.title);
  //   payload.append("message", formData.message);
  //   payload.append("ai_post_description", formData.ai_post_description);

  //   // Important: keyword must be nested JSON object
  //   if (formData.keyword?.trim()) {
  //     payload.append("keyword", JSON.stringify({ text: formData.keyword.trim() }));
  //   }

  //   if (formData.public_reply_template_id) {
  //     payload.append("public_reply_template_id", formData.public_reply_template_id);
  //   }

  //   buttons.forEach((btn, idx) => {
  //     payload.append(`button${idx + 1}_text`, btn.text);
  //     payload.append(`button${idx + 1}_url`, btn.url);
  //   });

  //   emails.forEach((email, idx) => {
  //     payload.append(`recipients[${idx}]`, email);
  //   });

  //   try {
  //     // 2. Create InstaBot WITHOUT image
  //     const createdBot = await createInstaBot(payload); // Should return full instabot object with ID

  //     // 3. If image is provided, upload to BunnyCDN and patch
  //     if (formData.image && formData.message_type === "image") {
  //       const imageUrl = await uploadInstaBotImageToBunny(formData.image, createdBot.id);

  //       // 4. Patch the instabot with image_url
  //       await updateInstaBotImageUrl(createdBot.id, imageUrl);
  //     }

  //     alert("InstaBot created successfully!");
  //     // Optional: resetForm();
  //   } catch (err) {
  //     console.error("InstaBot creation failed", err);
  //     alert("Something went wrong while creating InstaBot.");
  //   }
  // };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // STEP 1: Create InstaBot without image
  //     const botPayload = {
  //       message_type: formData.message_type,
  //       title: formData.title,
  //       message: formData.message,
  //       ai_post_description: formData.ai_post_description,
  //       keyword: { text: formData.keyword.trim() },
  //       public_reply_template_id: formData.public_reply_template_id || null,
  //       button1_text: buttons[0]?.text || "",
  //       button1_url: buttons[0]?.url || "",
  //       button2_text: buttons[1]?.text || "",
  //       button2_url: buttons[1]?.url || "",
  //       button3_text: buttons[2]?.text || "",
  //       button3_url: buttons[2]?.url || "",
  //       recipients: emails,
  //     };

  //     const botRes = await createInstaBot(botPayload);
  //     const instabotId = botRes.id;

  //     let finalImageUrl = null;

  //     // STEP 2: Upload image to BunnyCDN if applicable
  //     if (formData.image && formData.message_type === "image") {
  //       const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
  //       const imageName = `instabot${instabotId}_${timestamp}.jpg`;
  //       const uploadRes = await uploadInstaBotImage(formData.image, imageName);

  //       finalImageUrl = uploadRes.publicUrl;

  //       // STEP 3: PATCH InstaBot with image_url
  //       await updateInstaBot(instabotId, {
  //         image_url: finalImageUrl,
  //       });
  //     }

  //     alert("InstaBot created successfully!");
  //   } catch (err) {
  //     console.error("Failed to create InstaBot:", err);
  //     alert("Something went wrong while creating the InstaBot.");
  //   }
  // };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   const payload = new FormData();
  //   payload.append("message_type", formData.message_type);
  //   payload.append("title", formData.title);
  //   payload.append("message", formData.message);
  //   payload.append("ai_post_description", formData.ai_post_description);
  //   if (formData.keyword?.trim()) {
  //     payload.append("keyword", JSON.stringify({ text: formData.keyword.trim() }));
  //   }
  //   if (formData.public_reply_template_id) {
  //     payload.append("public_reply_template_id", formData.public_reply_template_id);
  //   }
  //   if (formData.image && formData.message_type === "image") {
  //     payload.append("image", formData.image);
  //   }

  //   buttons.forEach((btn, idx) => {
  //     payload.append(`button${idx + 1}_text`, btn.text);
  //     payload.append(`button${idx + 1}_url`, btn.url);
  //   });

  //   emails.forEach((email, idx) => {
  //     payload.append(`recipients[${idx}]`, email);
  //   });

  //   for (const [key, value] of payload.entries()) {
  //     console.log(`${key}: ${value}`);
  //   }

  //   try {
  //     await createInstaBot(payload);
  //     alert("InstaBot created!");
  //   } catch (err) {
  //     console.error("Creation failed", err);
  //   }
  // };

  return (
    <Container
      className="mt-4"
      // style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <Form onSubmit={handleSubmit}>
        <Col lg={12}>
          <Form.Group className="mb-4">
            <label className="label">
              <h6 >
              Message Type
              </h6>
              </label>
            <Form.Group className="position-relative">
              <Form.Select
                className="form-control ps-5 h-55"
                value={formData.message_type}
                onChange={(e) => handleChange("message_type", e.target.value)}
              >
                <option value="text" className="text-dark">
                  Only Text
                </option>
                <option value="image" className="text-dark">
                  With Image
                </option>
              </Form.Select>
              <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
            </Form.Group>
          </Form.Group>
        </Col>

{formErrors.keyword?.text && <div className="text-danger small mt-1">{formErrors.keyword?.text[0]}</div>}

        <KeywordInput
          instaBotObj = {instaBotObj}
          value={formData.keyword}
          onChange={(val) => handleChange("keyword", val)}
        />

        {formData.message_type === "image" && (
          <ImageUploader
            setImage={(file) => {
              handleChange("image", file);
              // console.log(`Selected file: ${file ? file.name : "None"}`);
            }}
          />
          // <ImageUploader
          //   visible
          //   image={formData.image}
          //   setImage={(file) => handleChange("image", file)}
          // />
        )}

        <EmojiTextInput
          label="Title"
          value={formData.title}
          onChange={(v) => handleChange("title", v)}
        />
        <EmojiTextInput
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={(v) => handleChange("message", v)}
        />

        <ButtonsInputGroup buttons={buttons} setButtons={setButtons} />

        <PublicReplySelector
          templates={templates}
          selectedTemplateId={formData.public_reply_template_id}
          onChange={(val) => handleChange("public_reply_template_id", val)}
          onView={() => {
            setEditTemplate(null);
            setShowReplyModal(true);
          }}
          onEdit={() => {
            const selected = templates.find(
              (t) => t.id === parseInt(formData.public_reply_template_id)
            );
            if (selected) {
              setEditTemplate(selected);
              setShowReplyModal(true);
            }
          }}
          onDelete={() => setShowDeleteModal(true)}
        />

        <EmojiTextInput
          label="AI Post Description"
          type="textarea"
          value={formData.ai_post_description}
          onChange={(v) => handleChange("ai_post_description", v)}
        />

        <EmailInputList
          emails={emails}
          setEmails={setEmails}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
        />

        <Form.Group className="mb-4">
          <label className="label text-secondary">Status</label>
          <Form.Group className="position-relative">
            <Form.Select
              className="form-control ps-5 h-55"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="active" className="text-dark">
                Active
              </option>
              <option value="inactive" className="text-dark">
                Inactive
              </option>
            </Form.Select>
            <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
          </Form.Group>
        </Form.Group>

        <Col lg={12} className="d-flex">
        
          <Button type="submit" className="btn btn-primary w-100 fw-semibold">
            {isEditMode ? "Update InstaBot" : "Create InstaBot"}
          </Button>
        </Col>
      </Form>

      {/* <PublicReplyModal
        show={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        onSuccess={() => {
          fetchTemplates();
          setShowReplyModal(false);
          setEditTemplate(null);
        }}
        template={editTemplate}
        
      /> */}
      <PublicReplyModal
        show={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setEditTemplate(null);
        }}
        onSave={handleSaveTemplate}
        initialData={editTemplate}
      />

      <ConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          try {
            await deletePublicReplyTemplate(formData.public_reply_template_id);
            setFormData((prev) => ({ ...prev, public_reply_template_id: "" }));
            fetchTemplates();
          } catch (err) {
            console.error("Delete failed", err);
          } finally {
            setShowDeleteModal(false);
          }
        }}
        title="Delete Template"
        body="Are you sure you want to delete this template?"
        confirmText="Delete"
      />
    </Container>
  );
};

export default InstaBotCustomForm;

// import React, { useEffect, useState } from "react";
// import { Form, Button, Col, Container } from "react-bootstrap";
// import EmojiTextInput from "../Form/EmojiTextInput";
// import KeywordInput from "./KeywordInput";
// import ButtonsInputGroup from "./ButtonsInputGroup";
// import ImageUploader from "./ImageUploader";
// import PublicReplySelector from "./PublicReplySelector";
// import EmailInputList from "./EmailInputList";
// import { createInstaBot } from "../../services/instabotService";

// const InstaBotCustomForm = () => {
//   const [formData, setFormData] = useState({
//     keyword: "",
//     message_type: "text",
//     image: null,
//     title: "",
//     message: "",
//     ai_post_description: "",
//     public_reply_template_id: "",
//   });

//   const [buttons, setButtons] = useState([{ text: "", url: "" }]);
//   const [emails, setEmails] = useState([]);
//   const [emailInput, setEmailInput] = useState("");

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // const handleAddButton = () => {
//   //   if (buttons.length < 3) {
//   //     setButtons([...buttons, { text: "", url: "" }]);
//   //   }
//   // };

//   // const handleRemoveButton = (index) => {
//   //   setButtons(buttons.filter((_, i) => i !== index));
//   // };

//   // const handleButtonChange = (index, key, value) => {
//   //   const updated = [...buttons];
//   //   updated[index][key] = value;
//   //   setButtons(updated);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = new FormData();
//     payload.append("message_type", formData.message_type);
//     payload.append("title", formData.title);
//     payload.append("message", formData.message);
//     payload.append("ai_post_description", formData.ai_post_description);
//     payload.append("keyword", formData.keyword);
//     if (formData.public_reply_template_id) {
//       payload.append(
//         "public_reply_template_id",
//         formData.public_reply_template_id
//       );
//     }
//     if (formData.image && formData.message_type === "image") {
//       payload.append("image", formData.image);
//     }

//     buttons.forEach((btn, idx) => {
//       payload.append(`button${idx + 1}_text`, btn.text);
//       payload.append(`button${idx + 1}_url`, btn.url);
//     });

//     emails.forEach((email, idx) => {
//       payload.append(`recipients[${idx}]`, email);
//     });

//     try {
//       await createInstaBot(payload);
//       alert("InstaBot created!");
//       // reset state if needed
//     } catch (err) {
//       console.error("Creation failed", err);
//     }
//   };

//   return (
//     <Container
//       className="mt-4"
//       style={{ maxHeight: "80vh", overflowY: "auto" }}
//     >
//       <Form onSubmit={handleSubmit}>
//         <Col lg={12}>
//           <Form.Group className="mb-4">
//             <label className="label text-secondary">Message Type</label>
//             <Form.Group className="position-relative">
//               <Form.Select
//                 className="form-control ps-5 h-55"
//                 value={formData.message_type}
//                 onChange={(e) => handleChange("message_type", e.target.value)}
//               >
//                 <option value="text" className="text-dark">
//                   Only Text
//                 </option>
//                 <option value="image" className="text-dark">
//                   With Image
//                 </option>
//               </Form.Select>
//               <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//             </Form.Group>
//           </Form.Group>
//         </Col>

//         <KeywordInput
//           value={formData.keyword}
//           onChange={(val) => handleChange("keyword", val)}
//         />

//         {formData.message_type === "image" && (
//           <ImageUploader
//             visible={formData.message_type === "image"}
//             image={formData.image}
//             setImage={(file) => handleChange("image", file)}
//           />
//         )}

//         <EmojiTextInput
//           label="Title"
//           value={formData.title}
//           onChange={(v) => handleChange("title", v)}
//         />
//         <EmojiTextInput
//           label="Message"
//           type="textarea"
//           value={formData.message}
//           onChange={(v) => handleChange("message", v)}
//         />

//         {/* <ButtonsInputGroup
//           buttons={buttons}
//           onAdd={handleAddButton}
//           onRemove={handleRemoveButton}
//           onChange={handleButtonChange}
//         /> */}
//         <ButtonsInputGroup
//           buttons={buttons}
//           setButtons={setButtons}
//         />

//         <PublicReplySelector
//           value={formData.public_reply_template_id}
//           onChange={(v) => handleChange("public_reply_template_id", v)}
//         />

//         <EmojiTextInput
//           label="AI Post Description"
//           type="textarea"
//           value={formData.ai_post_description}
//           onChange={(v) => handleChange("ai_post_description", v)}
//         />

//         <EmailInputList
//           emails={emails}
//           setEmails={setEmails}
//           emailInput={emailInput}
//           setEmailInput={setEmailInput}
//         />

//         <Col lg={12} className="d-flex justify-content-center">
//           <Button type="submit" className="btn btn-primary">
//             Create InstaBot
//           </Button>
//         </Col>
//       </Form>
//     </Container>
//   );
// };

// export default InstaBotCustomForm;
