import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  FormControl,
} from 'react-bootstrap';
import { RiCameraLine, RiMicLine, RiImageLine, RiChat1Line, RiAddLine } from 'react-icons/ri';

import { IPhoneMockup } from "react-device-mockup";

const DMMessageScreen = ({ formData = {}, buttons = [] }) => {
  const {
    title = "Preview Title",
    message = "This is a message preview.",
    image = null,
  } = formData;

  return (
    <IPhoneMockup screenWidth={300}>
      <Container fluid className="d-flex flex-column p-0">
        {/* Chat Area */}
        <div className="flex-grow-1 overflow-auto p-3 bg-white">
          <Row className="justify-content-start mb-4">
            <Col xs="auto">
              <Image
                src="https://tinyurl.com/yjjasp7h"
                roundedCircle
                width={40}
                height={40}
                alt="avatar"
              />
            </Col>
            <Col xs={9}>
              <div className="p-2 rounded shadow-sm bg-white">
                {/* Image Preview */}
                {(formData.message_type === "image" && image == null ) &&
                <Image
                    src= "/images/virtual-card.png"
                    rounded
                    fluid
                    className="mb-2"
                    alt="Selected"
                  />}
                {image && (
                  <Image
                    src={typeof image === "string" ? image : URL.createObjectURL(image)}
                    rounded
                    fluid
                    className="mb-2"
                    alt="Selected"
                  />
                )}

                {/* Message Text */}
                <h6 className="mb-1 fs-6 fw-bold text-break">{title}</h6>
                <p className="mb-2 fs-7 text-break">{message}</p>

                {/* Action Buttons */}
                <div className="d-grid gap-1 mb-2">
                  {buttons.length > 0
                    ? buttons.map((btn, idx) => (
                      
                        <Button key={idx} variant="light" size="sm" className="text-start text-break">
                          {btn.text || `Button ${idx + 1}`}
                        </Button>

                      ))
                    : (
                      <Button variant="light" size="sm" className="text-start">
                        Default Button
                      </Button>
                    )}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Composer Bar */}
        <div
          className="p-2"
          style={{ background: '#ffffff', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)' }}
        >
          <div
            className="d-flex align-items-center"
            style={{
              background: '#f0f0f0',
              borderRadius: '999px',
              padding: '0.25rem 0.75rem',
            }}
          >
            <Button variant="light" size="sm" className="p-1 me-2 rounded-circle">
              <RiCameraLine size={20} />
            </Button>

            <FormControl
              size="sm"
              placeholder="Message..."
              style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '0.25rem 0',
              }}
              readOnly
            />

            <div className="d-flex align-items-center ms-3 gap-2">
              <RiMicLine size={20} style={{ cursor: 'pointer' }} />
              <RiImageLine size={20} style={{ cursor: 'pointer' }} />
              <RiChat1Line size={20} style={{ cursor: 'pointer' }} />
              <RiAddLine size={20} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </Container>
    </IPhoneMockup>
  );
};

export default DMMessageScreen;



// // DMMessageScreen.jsx
// import React from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Image,
//   Button,
//   InputGroup,
//   FormControl,
// } from 'react-bootstrap';
// import { RiSendPlane2Line, RiCameraLine, RiImageLine } from 'react-icons/ri';
// import { RiMicLine, RiChat1Line, RiAddLine } from 'react-icons/ri';

// import { IPhoneMockup } from "react-device-mockup";

// const DMMessageScreen = () => {
//   return (
//     <IPhoneMockup screenWidth={350}>
//     <Container fluid className="d-flex flex-column  p-0">
//       {/* Chat area */}
//       <div className="flex-grow-1 overflow-auto p-3" >
//         <Row className="justify-content-start mb-4">
//           <Col xs="auto">
//             <Image
//               src="https://tinyurl.com/yjjasp7h"
//               roundedCircle
//               width={40}
//               height={40}
//               alt="avatar"
//             />
//           </Col>
//           <Col xs={9} md={9} lg={9}>
//             <div
//               className="p-2 rounded"
//               style={{
//                 background: 'white',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               }}
//             >
//               {/* Header image */}
//               <Image
//                 src="https://tinyurl.com/yjjasp7h"
//                 rounded
//                 fluid
//                 className="mb-2"
//                 alt="message header"
//               />

//               {/* Message text with smaller font */}
//               <h6 className="mb-1" style={{ fontSize: '0.75rem' }}>
                
//                 Title -- ❤️ Thanks so much for your interest in my Buyer -or- Seller Guide!
//               </h6>
//               <p className="mb-1" style={{ fontSize: '0.7rem' }}>
//                 multi line summary
//                 ✅ I look forward to seeing how I can assist you &amp; your family!
//               </p>
//               {/* <p className="mb-2" style={{ fontSize: '0.7rem' }}>
//                 👉 Click below to access my Buyer or Seller Guide…
//               </p> */}

//               {/* Action buttons, small size */}
//               {/* Following buttons are for instabot */}
//               <div className="d-grid gap-1 mb-2">
//                 <Button variant="light" size="sm" className="text-start">
//                   🏡 <span style={{ fontSize: '0.7rem' }}>Buyer’s Guide</span>
//                 </Button>
//                 <Button variant="light" size="sm" className="text-start">
//                   💰 <span style={{ fontSize: '0.7rem' }}>Seller’s Guide</span>
//                 </Button>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       {/* Composer bar */}
//       {/* <div
//         className="p-1 border-top"
//         style={{ background: 'white', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)' }}
//       >
//         <InputGroup>
//           <Button variant="outline-secondary" size="sm">
//             <RiCameraLine size={16} />
//           </Button>
//           <Button variant="outline-secondary" size="sm">
//             <RiImageLine size={16} />
//           </Button>
//           <FormControl size="sm" placeholder="Message…" />
//           <Button variant="primary" size="sm">
//             <RiSendPlane2Line size={16} />
//           </Button>
//         </InputGroup>
//       </div> */}


// <div
//         className="p-2"
//         style={{ background: '#ffffff', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)' }}
//       >
//         <div
//           className="d-flex align-items-center"
//           style={{
//             background: '#f0f0f0',
//             borderRadius: '999px',
//             padding: '0.25rem 0.75rem',
//           }}
//         >
//           {/* Camera button */}
//           <Button variant="light" size="sm" className="p-1 me-2 rounded-circle">
//             <RiCameraLine size={20} />
//           </Button>

//           {/* Text input */}
//           <FormControl
//             size="sm"
//             placeholder="Message..."
//             style={{
//               background: 'transparent',
//               border: 'none',
//               boxShadow: 'none',
//               padding: '0.25rem 0',
//             }}
//           />

//           {/* Action icons */}
//           <div className="d-flex align-items-center ms-3 gap-2">
//             <RiMicLine size={20} style={{ cursor: 'pointer' }} />
//             <RiImageLine size={20} style={{ cursor: 'pointer' }} />
//             <RiChat1Line size={20} style={{ cursor: 'pointer' }} />
//             <RiAddLine size={20} style={{ cursor: 'pointer' }} />
//           </div>
//         </div>
//       </div>


//     </Container>
//     </IPhoneMockup>
//   );
// };

// export default DMMessageScreen;




// DMMessageScreen.jsx
// import React from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Image,
//   Button,
//   InputGroup,
//   FormControl,
// } from 'react-bootstrap';
// import { RiSendPlane2Line, RiCameraLine, RiImageLine } from 'react-icons/ri';

// import { IPhoneMockup } from "react-device-mockup";

// const DMMessageScreen = () => {
//   return (
//     <IPhoneMockup screenWidth={350}>
//     <Container fluid className="d-flex flex-column vh-100 p-0">
//       {/* Chat area */}
//       <div className="flex-grow-1 overflow-auto p-3" style={{ background: '#f0f0f0' }}>
//         <Row className="justify-content-start mb-4">
//           <Col xs="auto">
//             <Image
//               src="https://tinyurl.com/yjjasp7h"
//               roundedCircle
//               width={45}
//               height={45}
//               alt="avatar"
//             />
//           </Col>
//           <Col xs={9} md={8} lg={7}>
//             <div
//               className="p-3 rounded"
//               style={{
//                 background: 'white',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               }}
//             >
//               {/* Header image */}
//               <Image
//                 src="https://tinyurl.com/yjjasp7h"
//                 rounded
//                 fluid
//                 className="mb-3"
//                 alt="message header"
//               />

//               {/* Message text */}
//               <p>
//                 <strong>❤️ Thanks so much for your interest in my Buyer -or- Seller Guide!</strong>
//                 ❤️ Thanks so much for your interest in my Buyer -or- Seller Guide!
//               </p>
//               <p className="mb-2">
//                 ✅ I look forward to seeing how I can assist you &amp; your family!
//               </p>
//               <p className="mb-3">👉 Click below to access my Buyer or Seller Guide…</p>

//               {/* Action buttons */}
//               <div className="d-grid gap-2 mb-2">
//                 <Button variant="light" size="lg" className="text-start">
//                   🏡 Buyer&rsquo;s Guide
//                 </Button>
//                 <Button variant="light" size="lg" className="text-start">
//                   💰 Seller&rsquo;s Guide
//                 </Button>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       {/* Composer bar */}
//       <div
//         className="p-2 border-top"
//         style={{ background: 'white', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)' }}
//       >
//         <InputGroup>
//           <Button variant="outline-secondary">
//             <RiCameraLine size={20} />
//           </Button>
//           <Button variant="outline-secondary">
//             <RiImageLine size={20} />
//           </Button>
//           <FormControl placeholder="Message…" />
//           <Button variant="primary">
//             <RiSendPlane2Line size={20} />
//           </Button>
//         </InputGroup>
//       </div>
//     </Container>
//     </IPhoneMockup>
//   );
// };

// export default DMMessageScreen;

// // DMMessageScreen.jsx
// import React from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Image,
//   Button,
//   InputGroup,
//   FormControl,
// } from 'react-bootstrap';
// import { Send, Camera, Image as ImageIcon } from 'react-bootstrap-icons';

// const DMMessageScreen = () => {
//   return (
//     <Container fluid className="d-flex flex-column vh-100 p-0">
//       {/* Chat area */}
//       <div className="flex-grow-1 overflow-auto p-3" style={{ background: '#f0f0f0' }}>
//         <Row className="justify-content-start mb-4">
//           <Col xs="auto">
//             <Image
//               src="https://via.placeholder.com/45"
//               roundedCircle
//               width={45}
//               height={45}
//               alt="avatar"
//             />
//           </Col>
//           <Col xs={9} md={8} lg={6}>
//             <div
//               className="p-3 rounded"
//               style={{
//                 background: 'white',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//               }}
//             >
//               {/* Header image */}
//               <Image
//                 src="https://via.placeholder.com/600x300"
//                 rounded
//                 fluid
//                 className="mb-3"
//                 alt="message header"
//               />

//               {/* Message text */}
//               <h6>
//                 ❤️ Thanks so much for your interest in my Buyer -or- Seller Guide!
//               </h6>
//               <p className="mb-2">
//                 ✅ I look forward to seeing how I can assist you &amp; your family!
//               </p>
//               <p className="mb-3">👉 Click below to access my Buyer or Seller Guide…</p>

//               {/* Action buttons */}
//               <div className="d-grid gap-2 mb-2">
//                 <Button variant="light" size="lg" className="text-start">
//                   🏡 Buyer&rsquo;s Guide
//                 </Button>
//                 <Button variant="light" size="lg" className="text-start">
//                   💰 Seller&rsquo;s Guide
//                 </Button>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       {/* Composer bar */}
//       <div
//         className="p-2 border-top"
//         style={{ background: 'white', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)' }}
//       >
//         <InputGroup>
//           <Button variant="outline-secondary">
//             <Camera />
//           </Button>
//           <Button variant="outline-secondary">
//             <ImageIcon />
//           </Button>
//           <FormControl placeholder="Message…" />
//           <Button variant="primary">
//             <Send />
//           </Button>
//         </InputGroup>
//       </div>
//     </Container>
//   );
// };

// export default DMMessageScreen;
