// import React, { useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import InstaBotCustomForm from "../../../components/Form/InstaBotCustomForm";
// import DMMessageScreen from "../../../components/InstagramPreview/DMMessageScreen";

// const CreateInstaBot = () => {
//   const [formData, setFormData] = useState({
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
//     emails: [],
//   });

//   return (
//     <div className="bg-white border-0 rounded-3 mb-4 rounded-top-0">
//       <Row>
//         <Col lg={6}>
//           <h3>Create InstaBot</h3>
//           <InstaBotCustomForm formData={formData} setFormData={setFormData} />
//         </Col>
//         <Col lg={6}>
//           <h5 className="text-center">Instagram DM Preview</h5>
//           <DMMessageScreen data={formData} />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default CreateInstaBot;

// import React, { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import InstaBotCustomForm from "../../../components/InstaBot/InstaBotCustomForm";
// import DMMessageScreen from "../../../components/InstagramPreview/DMMessageScreen";
// import { createInstaBot } from "../../../services/instabotService";
// import { toast } from "react-toastify";

// const CreateInstaBot = () => {
//   const [formData, setFormData] = useState({
//     message_type: "text",
//     keyword: "",
//     image: null,
//     title: "",
//     message: "",
//     button1_text: "",
//     button1_url: "",
//     ai_post_description: "",
//     public_reply_template_id: "",
//     buttons: [],
//     emails: []
//   });

//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

//   const handleImageChange = (file) => {
//     setFormData(prev => ({ ...prev, image: file }));
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreviewUrl(previewUrl);
//     }
//   };

//   const handleSubmit = async () => {
//     const form = new FormData();

//     form.append("message_type", formData.message_type);
//     form.append("keyword", formData.keyword);
//     form.append("title", formData.title);
//     form.append("message", formData.message);
//     form.append("ai_post_description", formData.ai_post_description);

//     if (formData.image) {
//       form.append("image", formData.image);
//     }

//     form.append("emails", JSON.stringify(formData.emails));

//     if (formData.public_reply_template_id) {
//       form.append("public_reply_template_id", formData.public_reply_template_id);
//     }

//     // Append up to 3 buttons
//     formData.buttons.forEach((btn, index) => {
//       form.append(`button${index + 1}_text`, btn.text || "");
//       form.append(`button${index + 1}_url`, btn.url || "");
//     });

//     try {
//       await createInstaBot(form);
//       toast.success("InstaBot created successfully!");
//       setFormData({
//         message_type: "text",
//         keyword: "",
//         image: null,
//         title: "",
//         message: "",
//         button1_text: "",
//         button1_url: "",
//         ai_post_description: "",
//         public_reply_template_id: "",
//         buttons: [],
//         emails: []
//       });
//       setImagePreviewUrl(null);
//     } catch (error) {
//       toast.error("Failed to create InstaBot");
//     }
//   };

//   return (
//     <div className="bg-white border-0 rounded-3 mb-4 rounded-top-0">
//       <Row>
//         <Col lg={6}>
//           <h3>Create InstaBot</h3>
//           <InstaBotCustomForm
//             formData={formData}
//             setFormData={setFormData}
//             onImageChange={handleImageChange}
//             onSubmit={handleSubmit}
//           />
//         </Col>
//         <Col lg={6}>
//           <h5 className="text-center">Instagram DM Preview</h5>
//           <DMMessageScreen data={{ ...formData, image_url: imagePreviewUrl }} />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default CreateInstaBot;


import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InstaBotCustomForm from "../../../components/InstaBot/InstaBotCustomForm";
import DMMessageScreen from "../../../components/InstagramPreview/DMMessageScreen";
import { Row, Col, Container } from "react-bootstrap";
import { getInstaBotById } from "../../../services/instabotService"; // Adjust the import path as needed
import { ROUTES } from "../../../config/routes";

const CreateEditInstaBot = () => {
  
  const { id } = useParams();  // id from /edit/:id
  const navigate = useNavigate();
  const instabotId = id || null;
  const [currentInstaBot, setCurrentInstaBot] = useState(null);
  


  const [formData, setFormData] = useState({
    keyword: "",
    message_type: "",
    image: null,
    title: "",
    message: "",
    ai_post_description: "",
    public_reply_template_id: "",
    status: "active",
  });

  const [buttons, setButtons] = useState([{ text: "", url: "" }]);
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");

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

   const fetchBotData = useCallback(async () => {
  try {
    const data = await getInstaBotById(instabotId);
    console.log(data);

    setFormData({
      keyword: data.keyword?.text || "",
      message_type: data.message_type,
      image: null,
      title: data.title,
      message: data.message,
      ai_post_description: data.ai_post_description,
      public_reply_template_id: data.public_reply_template?.id || "",
      status: data.status || "active",
    });

    let buttonArray = [];
    if (data.button1_text !== "") {
      buttonArray.push({ text: data.button1_text, url: data.button1_url });
    }
    if (data.button2_text !== "") {
      buttonArray.push({ text: data.button2_text, url: data.button2_url });
    }
    if (data.button3_text !== "") {
      buttonArray.push({ text: data.button3_text, url: data.button3_url });
    }

    setButtons(buttonArray);
    setEmails(data.recipients || []);
    setCurrentInstaBot(data);
  } catch (err) {
    console.error("Failed to fetch bot data", err);
  }
}, [instabotId]); // Make sure this depends only on what it uses


  useEffect(() => {
  const loadData = async () => {
    try {
      if (isEditMode && instabotId) {
        await fetchBotData();
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  loadData();
}, [isEditMode, instabotId, fetchBotData]); //  Clean and complete

 
    // const fetchBotData = async () => {
    //   try {
    //     const data = await getInstaBotById(instabotId);
    //     console.log(data);
        
    //     setFormData({
    //       keyword: data.keyword?.text || "",
    //       message_type: data.message_type,
    //       image: null,
    //       title: data.title,
    //       message: data.message,
    //       ai_post_description: data.ai_post_description,
    //       // public_reply_template_id: data.public_reply_template_id || "",
    //       public_reply_template_id: data.public_reply_template.id || "",
    //       status: data.status || "active",
    //     });
    //     let buttonArray = [];
    //     if (data.button1_text !== "") {
    //       buttonArray = [...buttonArray,
    //         { text: data.button1_text || "", url: data.button1_url || "" }
    //       ];
    //     }
    //     if (data.button2_text !== "") {
    //       buttonArray = [...buttonArray,
    //         { text: data.button2_text || "", url: data.button2_url || "" }
    //       ];
    //     }
    //     if (data.button3_text !== "") {
    //       buttonArray = [...buttonArray,
    //         { text: data.button3_text || "", url: data.button3_url || "" }
    //       ];
    //     }
    //     setButtons(buttonArray);
    //     // setButtons([
    //     //   { text: data.button1_text || "", url: data.button1_url || "" },
    //     //   { text: data.button2_text || "", url: data.button2_url || "" },
    //     //   { text: data.button3_text || "", url: data.button3_url || "" },
    //     // ]);
    //     setEmails(data.recipients || []);

    //     setCurrentInstaBot(data);

    //   } catch (err) {
    //     console.error("Failed to fetch bot data", err);
    //   }
    // };



  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col lg={10}>
          <div className="mb-4">
        <h4 className="fs-20 mb-1"> {isEditMode? "Update": "Create"}  InstaBots</h4>
        <p className="fs-15">You can see the live preview of your InstaBot.</p>
      </div>
        </Col>
        <Col lg={2} className="text-end">
          <button className="btn btn-secondary" onClick={() => navigate(ROUTES.USER.INSTABOT.INSTABOTS)}>Back to InstaBots</button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <InstaBotCustomForm
            instabotId={instabotId}
            instaBotObj={currentInstaBot}
            formData={formData}
            setFormData={setFormData}
            buttons={buttons}
            setButtons={setButtons}
            emails={emails}
            setEmails={setEmails}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
          />
        </Col>
        <Col md={6}>
          <DMMessageScreen
            formData={formData}
            buttons={buttons}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEditInstaBot;
