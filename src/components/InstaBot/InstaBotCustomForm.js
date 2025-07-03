import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";

// import CustomLabel from "../Form/CustomLabel";
import ContentBlockCard from "../Form/ContentBlockCard";
import CustomSelect from "../Form/CustomSelect";
import EmojiTextInput from "./EmojiTextInput";
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
import CustomLabel from "../Form/CustomLabel";
import AnimatedSubmitButton from "../Form/AnimatedSubmitButton";

// import styles from "../Layout/DesigningBG/BgGradiants.module.css"

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
  const navigate = useNavigate();

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [buttonErrors, setButtonErrors] = useState({});

  const [templates, setTemplates] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [editTemplate, setEditTemplate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isEditMode = Boolean(instabotId);

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);
  useEffect(() => {
    if (!isEditMode) {
      setFormData({
        keyword: "",
        message_type: "image",
        image: null,
        title: "",
        message: "",
        ai_post_description: "",
        public_reply_template_id: "",
        status: "active",
      });
      setButtons([{ text: "", url: "" }]);
      setEmails([]);
      setEmailInput("");
    }
  }, [isEditMode, setFormData, setButtons, setEmails, setEmailInput]);

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
      setIsSaveLoading(true);
      setFormErrors({});
      const bot = isEditMode
        ? await updateInstaBot(instabotId, payload)
        : await createInstaBot(payload);

      if (formData.image && formData.message_type === "image") {
        const imageUrl = await uploadInstaBotImageToBunny(
          formData.image,
          bot.id
        );
        await updateInstaBot(bot.id, { image_url: imageUrl });
      }
      toast.success(
        `InstaBot ${isEditMode ? "updated" : "created"} successfully!`
      );

      setIsSaveLoading(false);

      navigate(ROUTES.USER.INSTABOT.INSTABOTS);

      // alert(`InstaBot ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (err) {

      setIsSaveLoading(false);

      if (err.response?.data) {
        setFormErrors(err.response.data);

        // Optional: extract and store button-specific errors separately
        const buttonFieldErrors = mapButtonErrors(err.response.data);
        setButtonErrors(buttonFieldErrors);
      } else {
        console.error("Save failed", err);
        // alert("Unexpected error occurred.");
        toast.error("Unexpected error occurred.");
      }
    }
  };

  const mapButtonErrors = (errors) => {
    const mapped = {};

    for (let key in errors) {
      const msg = Array.isArray(errors[key]) ? errors[key][0] : errors[key];

      if (
        key.startsWith("button") &&
        (key.includes("_text") || key.includes("_url"))
      ) {
        const match = key.match(/button(\d)_(text|url)/);
        if (match) {
          const idx = parseInt(match[1], 10) - 1; // Adjust to 0-based index
          const field = match[2] === "text" ? "Text" : "Url";
          mapped[`button${idx}${field}`] = msg;
        }
      }
    }

    return mapped;
  };

  return (
    <Container
      // className={styles.premium_light_gradient}
      className="mt-4 pb-4"
      style={{ overflow: "visible" }}
      // style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <Form onSubmit={handleSubmit}>
        <Col lg={12}>
          <Form.Group className="mb-4">
            {/* <CustomLabel text="What would you like to do?" /> */}

            <Form.Group className="position-relative">
              <ContentBlockCard>
                <CustomLabel text="What would you like to do?" />
                <CustomSelect
                  id="messageType"
                  name="message_type"
                  value={formData.message_type}
                  onChange={(e) => handleChange("message_type", e.target.value)}
                  options={[
                    { value: "text", label: "Only Text" },
                    { value: "image", label: "With Image" },
                  ]}
                />
              </ContentBlockCard>

              {/* <CustomSelect
                label="What would you like to do?"
                id="messageType"
                name="message_type"
                value={formData.message_type}
                onChange={(e) => handleChange("message_type", e.target.value)}
                options={messageTypeOptions}
              /> */}
              {/* <Form.Select
                // className="form-control ps-5 h-55"
                className="form-control h-55 rounded-4 border-3"
                style={{ fontSize: "1rem" }}
                value={formData.message_type}
                onChange={(e) => handleChange("message_type", e.target.value)}
              >
                <option value="text" className="text-dark">
                  Only Text
                </option>
                <option value="image" className="text-dark">
                  With Image
                </option>
              </Form.Select> */}
              {/* <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i> */}
            </Form.Group>
          </Form.Group>
        </Col>

        {/* {formErrors.keyword?.text && (
          <div className="text-danger small mt-1">
            {formErrors.keyword?.text[0]}
          </div>
        )} */}

        <ContentBlockCard>
          <CustomLabel text="Keyword" />
          <KeywordInput
            existingKeywordObj={instaBotObj?.keyword}
            // instaBotObj = {instaBotObj}
            value={formData.keyword}
            onChange={(val) => handleChange("keyword", val)}
            error={formErrors?.keyword} // pass server error directly
          />
        </ContentBlockCard>

        {formData.message_type === "image" && (
          <ContentBlockCard>
            <CustomLabel text="Image Upload" />
            <ImageUploader
              setImage={(file) => handleChange("image", file)}
              disabled={false}
            />
          </ContentBlockCard>
        )}

        {/* {formData.message_type === "image" && (
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
        )} */}

        {/* <Form.Group className="position-relative">   */}
        <ContentBlockCard>
          <CustomLabel text="Title" />
          <EmojiTextInput
            // label="Title"
            value={formData.title}
            onChange={(val) => handleChange("title", val)}
            placeholder="Enter title..."
            error={formErrors?.title}
            maxLength={50}
          />
        </ContentBlockCard>
        {/* </Form.Group> */}

        {/* <EmojiTextInput
          label="Title"
          labelFontClass={"fs-4"}
          value={formData.title}
          onChange={(v) => handleChange("title", v)}
        /> */}

        <ContentBlockCard>
          <CustomLabel text="Message" />
          <EmojiTextInput
            type="textarea"
            value={formData.message}
            onChange={(val) => handleChange("message", val)}
            placeholder="Enter message..."
            error={formErrors?.message}
            maxLength={300}
          />
        </ContentBlockCard>
        {/* <EmojiTextInput
          label="Message"
          labelFontClass={"fs-4"}
          type="textarea"
          value={formData.message}
          onChange={(v) => handleChange("message", v)}
        /> */}

        <ButtonsInputGroup buttons={buttons} setButtons={setButtons} errors={buttonErrors}/>

          <ContentBlockCard >
            <CustomLabel text="Public Reply" />
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
        </ContentBlockCard>

<ContentBlockCard>
        <EmojiTextInput
          label="AI Post Description"
          labelFontClass={"fs-4"}
          type="textarea"
          value={formData.ai_post_description}
          onChange={(v) => handleChange("ai_post_description", v)}
        />
        </ContentBlockCard>

<ContentBlockCard>
  <CustomLabel text="Email Recipients" />
        <EmailInputList
          emails={emails}
          setEmails={setEmails}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
        />
        </ContentBlockCard>

        <Col lg={12}>
        <AnimatedSubmitButton isAnimating={isSaveLoading}/>
        
        </Col>

        <Col lg={12} className="d-flex">
          {/* <Button
            type="submit"
            className="btn btn-primary fs-4 p-2 rounded-4  w-100 fw-semibold"
            // style={{background: `radial-gradient(circle, rgb(0, 128, 255), transparent 0%)`}}
          >
            {isEditMode ? "Update InstaBot" : "Create InstaBot"}
          </Button> */}
        </Col>
      </Form>

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
