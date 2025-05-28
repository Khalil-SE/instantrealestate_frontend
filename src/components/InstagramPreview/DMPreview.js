// DMPreview.js
import React, {useState} from "react";
import { IPhoneMockup } from "react-device-mockup";

import { Container, Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { RiCameraLine, RiMicLine, RiImageLine, RiSendPlane2Line } from "react-icons/ri";


const DMPreview = ({ data }) => {
const [messages, setMessages] = useState([
    { text: "Hey! How are you?", isSender: false },
    { text: "I'm good! What about you?", isSender: true },
    { text: "Doing great! Let's catch up soon.", isSender: false },
    { text: "Yes, definitely! 😊", isSender: true }
  ]);

  if (!data) return null; // or a placeholder like <p>Waiting for input...</p>

  const {
    message_type,
    image_url,
    title,
    message,
    button1_text,
    button2_text,
    button3_text,
  } = data;




  return (
    <IPhoneMockup screenWidth={350}>
      
      <>


      <Container fluid className="d-flex flex-column justify-content-bottom p-2" style={{ height: "100vh", width: "100%", backgroundColor: "#fff" }}>
      
      {/* Chat Messages */}
      {/* <Container className="flex-grow-1 overflow-auto p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`d-flex ${msg.isSender ? "justify-content-end" : "justify-content-start"} mb-2`}>
            <Card className="p-2" style={{
              maxWidth: "75%",
              backgroundColor: msg.isSender ? "#0084ff" : "#e5e5ea",
              color: msg.isSender ? "#fff" : "#000",
              borderRadius: "20px"
            }}>
              <Card.Text>{msg.text}</Card.Text>
            </Card>
          </div>
        ))}
      </Container> */}

      <Card style={{ width: "22rem", textAlign: "center" }}>
        <Card.Img variant="top" src="path_to_your_image.jpg" alt="Real Estate Guide" />
        <Card.Body>
          <Card.Title>❤️ Thanks so much for your interest!</Card.Title>
          <Card.Text>✅ I look forward to seeing how I can assist you & your family!</Card.Text>
          <Card.Text>👉 Click below to access my Buyer or Seller Guide...</Card.Text>
          <div className="d-grid gap-2">
            <Button variant="primary">🏡 Buyer's Guide</Button>
            <Button variant="secondary">💰 Seller's Guide</Button>
          </div>
        </Card.Body>
      </Card>


      {/* Message Input Area */}
      <InputGroup className="p-2 border-top">
        <Button variant="outline-secondary"><RiCameraLine size={24} /></Button>
        <Button variant="outline-secondary"><RiImageLine size={24} /></Button>
        <FormControl placeholder="Type a message..." />
        <Button variant="outline-secondary"><RiMicLine size={24} /></Button>
        <Button variant="primary"><RiSendPlane2Line size={24} /></Button>
      </InputGroup>
    </Container>
      
{/*       
      <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: "22rem", textAlign: "center" }}>
        <Card.Img variant="top" src="path_to_your_image.jpg" alt="Real Estate Guide" />
        <Card.Body>
          <Card.Title>❤️ Thanks so much for your interest!</Card.Title>
          <Card.Text>✅ I look forward to seeing how I can assist you & your family!</Card.Text>
          <Card.Text>👉 Click below to access my Buyer or Seller Guide...</Card.Text>
          <div className="d-grid gap-2">
            <Button variant="primary">🏡 Buyer's Guide</Button>
            <Button variant="secondary">💰 Seller's Guide</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
      
        <div className="card mx-auto text-center" style={{ width: "22rem" }}>
          <img
            src="path_to_your_image.jpg"
            className="card-img-top"
            alt="Real Estate Guide"
          />
          <div className="card-body">
            <h5 className="card-title">❤️ Thanks so much for your interest!</h5>
            <p className="card-text">
              ✅ I look forward to seeing how I can assist you & your family!
            </p>
            <p className="card-text">
              👉 Click below to access my Buyer or Seller Guide...
            </p>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button">
                🏡 Buyer's Guide
              </button>
              <button className="btn btn-secondary" type="button">
                💰 Seller's Guide
              </button>
            </div>
          </div>
        </div>

        <div className="mb-2">
          {message_type === "image" && (
            <img
              src={image_url}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "8px",
              }}
            />
          )}
          {title && (
            <strong style={{ display: "block", marginBottom: 4 }}>
              {title}
            </strong>
          )}
          <p style={{ marginBottom: 8 }}>{message}</p>
          {button1_text && (
            <button className="btn btn-primary btn-sm mb-1">
              {button1_text}
            </button>
          )}
          {button2_text && (
            <button className="btn btn-secondary btn-sm mb-1">
              {button2_text}
            </button>
          )}
          {button3_text && (
            <button className="btn btn-outline-light btn-sm">
              {button3_text}
            </button>
          )}
          
        </div> */}
        
      </>
    </IPhoneMockup>
  );
};

export default DMPreview;

// import React from "react";
// import { IPhoneMockup } from "react-device-mockup";
// import { Card, Image, Button } from "react-bootstrap";
// import "./DMPreview.css";

// const DMPreview = ({ data }) => {
//   const {
//     message_type,
//     image,
//     title,
//     message,
//     button1_text,
//     button2_text,
//     button3_text,
//   } = data;

//   return (
//     <IPhoneMockup width="100%" orientation="portrait" color="black">
//       <div className="dm-preview-content">
//         {message_type === "image" && image && (
//           <Image src={URL.createObjectURL(image)} fluid className="dm-preview-image" />
//         )}

//         {title && <h5 className="dm-preview-title">{title}</h5>}
//         {message && <p className="dm-preview-text">{message}</p>}

//         <div className="dm-preview-buttons">
//           {button1_text && (
//             <Button variant="primary" size="sm" className="w-100 mb-2">
//               {button1_text}
//             </Button>
//           )}
//           {button2_text && (
//             <Button variant="secondary" size="sm" className="w-100 mb-2">
//               {button2_text}
//             </Button>
//           )}
//           {button3_text && (
//             <Button variant="success" size="sm" className="w-100">
//               {button3_text}
//             </Button>
//           )}
//         </div>
//       </div>
//     </IPhoneMockup>
//   );
// };

// export default DMPreview;

// import React from "react";
// import { Card } from "react-bootstrap";
// import "./DMPreview.css"; // We'll add custom styles here

// function DMPreview({
//   messageType,
//   imageUrl,
//   title,
//   message,
//   button1,
//   button2,
//   button3,
// }) {
//   return (
//     <div className="dm-phone-frame">
//       <div className="dm-screen">
//         {messageType === "image" && imageUrl && (
//           <img src={imageUrl} alt="preview" className="dm-image" />
//         )}

//         {title && <h5 className="dm-title">{title}</h5>}

//         {message && <p className="dm-message">{message}</p>}

//         <div className="dm-buttons">
//           {button1?.text && (
//             <a href={button1.url || "#"} className="dm-button">
//               {button1.text}
//             </a>
//           )}
//           {button2?.text && (
//             <a href={button2.url || "#"} className="dm-button">
//               {button2.text}
//             </a>
//           )}
//           {button3?.text && (
//             <a href={button3.url || "#"} className="dm-button">
//               {button3.text}
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DMPreview;

// .dm-phone-frame {
//   width: 100%;
//   max-width: 320px;
//   border: 16px solid #333;
//   border-radius: 30px;
//   padding: 20px 10px;
//   background-color: #fff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
//   margin: auto;
// }

// .dm-screen {
//   background-color: #f0f0f0;
//   padding: 15px;
//   border-radius: 12px;
//   height: auto;
//   min-height: 400px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// }

// .dm-image {
//   width: 100%;
//   height: auto;
//   border-radius: 8px;
//   margin-bottom: 12px;
// }

// .dm-title {
//   font-weight: bold;
//   margin-bottom: 8px;
// }

// .dm-message {
//   margin-bottom: 12px;
//   white-space: pre-wrap;
// }

// .dm-buttons a.dm-button {
//   display: block;
//   margin-bottom: 6px;
//   background-color: #3897f0;
//   color: #fff;
//   text-align: center;
//   padding: 8px 12px;
//   border-radius: 6px;
//   text-decoration: none;
//   font-size: 14px;
// }
