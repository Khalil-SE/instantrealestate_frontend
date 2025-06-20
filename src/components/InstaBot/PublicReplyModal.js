import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Row, Col } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import EmojiTextInput from "./EmojiTextInput";

const PublicReplyModal = ({
  show,
  onClose,
  onSave,
  initialData = null,
  loading = false,
}) => {
  const [name, setName] = useState("");
  const [replies, setReplies] = useState([""]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setReplies(initialData.replies?.map((r) => r.text) || [""]);
    } else {
      setName("");
      setReplies([""]);
    }
  }, [initialData]);

  const handleReplyChange = (index, value) => {
    const updated = [...replies];
    updated[index] = value;
    setReplies(updated);
  };

  const handleAddReply = () => {
    setReplies([...replies, ""]);
  };

  const handleRemoveReply = (index) => {
    setReplies(replies.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const replyObjects = replies
      .filter((t) => t.trim())
      .map((text) => ({ text }));
    onSave({ name, replies: replyObjects });
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Edit Template" : "Add Template"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmojiTextInput label="Template Name" value={name} onChange={setName} />
        <label className="label text-secondary">Replies</label>
        {replies.map((text, idx) => (
          // <div key={idx} className="mb-3 d-flex align-items-center">
          <Row key={idx}>
            <Col lg={12} className="position-relative">
              <EmojiTextInput
                value={text}
                onChange={(val) => handleReplyChange(idx, val)}
                placeholder={`Reply ${idx + 1}`}
                className="flex-grow-1"
              />

              {replies.length > 1 && (
                <Button
                  size="sm"
                  // variant="outline-danger"
                  onClick={() => handleRemoveReply(idx)}
                  className="  position-absolute rounded-circle d-flex justify-content-center align-items-center"
                  // style={{ top: '8px', right: '8px', zIndex: 2 }}
                  style={{
                    top: "8px",
                    right: "8px",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    borderBlockColor: "#fe7a36",
                    backgroundColor: "#fe7a36",
                    padding: 0,
                  }}
                >
                  <RxCrossCircled fontSize={20} color="#ffffff" fontWeight={20}/>
                  {/* <i className="ri-add-line"></i>
                Remove */}
                </Button>
              )}
            </Col>
          </Row>
          // </div>
        ))}
        <Button size="sm" variant="outline-primary" onClick={handleAddReply}>
          + Add Reply
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PublicReplyModal;

// import React, { useState, useEffect } from "react";
// import { Modal, Button, Spinner, Row, Col } from "react-bootstrap";
// import { RxCrossCircled } from "react-icons/rx";
// import EmojiTextInput from "./EmojiTextInput";

// const PublicReplyModal = ({
//   show,
//   onClose,
//   onSave,
//   initialData = null,
//   loading = false,
// }) => {
//   const [name, setName] = useState("");
//   const [replies, setReplies] = useState([""]);

//   useEffect(() => {
//     if (initialData) {
//       setName(initialData.name || "");
//       setReplies(initialData.replies?.map((r) => r.text) || [""]);
//     } else {
//       setName("");
//       setReplies([""]);
//     }
//   }, [initialData]);

//   const handleReplyChange = (index, value) => {
//     const updated = [...replies];
//     updated[index] = value;
//     setReplies(updated);
//   };

//   const handleAddReply = () => {
//     setReplies([...replies, ""]);
//   };

//   const handleRemoveReply = (index) => {
//     setReplies(replies.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     const replyObjects = replies.filter((t) => t.trim()).map((text) => ({ text }));
//     onSave({ name, replies: replyObjects });
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
//       <Modal.Header closeButton>
//         <Modal.Title>{initialData ? "Edit Template" : "Add Template"}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <EmojiTextInput label="Template Name" value={name} onChange={setName} />
//         <label className="label text-secondary">Replies</label>
//         {replies.map((text, idx) => (
//           // <div key={idx} className="mb-3 d-flex align-items-center">
//           <Row key={idx}>
//             <Col lg={10} style={{alignContent:'center', paddingRight:'0px'}}>
//             <EmojiTextInput
//               value={text}
//               onChange={(val) => handleReplyChange(idx, val)}
//               placeholder={`Reply ${idx + 1}`}
//               className="flex-grow-1"
//             />
//             </Col>
//             <Col lg={2} style={{alignContent:'center', paddingLeft:'0px'}}>
//             {replies.length > 1 && (
//               <Button
//                 size="sm"

//                 onClick={() => handleRemoveReply(idx)}
//                 className="btn "
//                 style={{ marginTop:'-1px', padding:"2px"}}
//               >
//                 <RxCrossCircled fontSize={40}/>
//                 {/* <i className="ri-add-line"></i>
//                 Remove */}
//               </Button>
//             )}
//             </Col>
//             </Row>
//           // </div>
//         ))}
//         <Button size="sm" variant="outline-primary" onClick={handleAddReply}>
//           + Add Reply
//         </Button>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose} disabled={loading}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleSubmit} disabled={loading}>
//           {loading ? <Spinner animation="border" size="sm" /> : "Save"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default PublicReplyModal;
