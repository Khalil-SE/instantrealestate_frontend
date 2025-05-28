import React, {useState} from "react";

import { Container, Card, Col, Form, Button } from "react-bootstrap";
import EmojiTextInput from "./EmojiTextInput"; // Adjust the import path as necessary

const InstaBotCustomForm = ({ formData, setFormData, onSubmit }) => {
    const [emails, setEmails] = React.useState([]);
const [emailInput, setEmailInput] = React.useState("");

const handleEmailKeyDown = (e) => {
  if ((e.key === "Enter" || e.key === ",") && emailInput.trim()) {
    e.preventDefault();
    if (
      /\S+@\S+\.\S+/.test(emailInput.trim()) &&
      !emails.includes(emailInput.trim())
    ) {
      setEmails([...emails, emailInput.trim()]);
    }
    setEmailInput("");
  } else if (e.key === "Backspace" && !emailInput && emails.length) {
    setEmails(emails.slice(0, -1));
  }
};

const handleRemoveEmail = (idx) => {
  setEmails(emails.filter((_, i) => i !== idx));
};

  return (
    <Container className="mt-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <Col lg={12}>
        <Form.Group className="mb-4">
          <label className="label text-secondary">Message Type</label>
          <Form.Group className="position-relative">
            <Form.Select
              className="form-control ps-5 h-55"
              aria-label="Default select example"
            >
              <option value="0" className="text-dark">
                Only Text
              </option>
              <option value="1" className="text-dark">
                With Image
              </option>
            </Form.Select>
            <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
          </Form.Group>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group className="mb-4">
          <label className="label text-secondary">Keyword</label>

          <Form.Group className="position-relative">
            <Form.Control
              type="text"
              className="text-dark ps-5 h-55"
              placeholder="Keyword"
            />
            <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
            <span className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
              <i className="ri-tick fs-24 position-relative top-1 text-primary"></i>
              <i className="ri-cross fs-24 position-relative top-1 text-primary"></i>
            </span>
          </Form.Group>
        </Form.Group>
      </Col>

      <Col lg={12}>
        <Form.Group className="mb-4">
          <label className="label text-secondary">Image Upload</label>

          <Form.Group className="position-relative">
            <div className="form-group mb-4">
              <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
                <div className="product-upload">
                  <label htmlFor="file-upload" className="file-upload mb-0">
                    <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>

                    <span className="d-block text-body fs-14">
                      Drag and drop an image or{" "}
                      <span className="text-primary text-decoration-underline">
                        Browse
                      </span>
                    </span>
                  </label>

                  <input id="file-upload" type="file" />
                </div>
              </div>
            </div>
          </Form.Group>
        </Form.Group>
      </Col>

      <Col lg={12}>
        <EmojiTextInput
          label="Title"
        // value={formData.title}
        // onChange={(value) => handleChange("title", value)}
        />
        {/* <Form.Group className="mb-4">
          <label className="label text-secondary">Title</label>

          <Form.Group className="position-relative">
            <Form.Control
              type="text"
              className="text-dark ps-5 h-55"
              placeholder="Keyword"
            />
            <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
            <Button className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
              <i className="ri-search-line fs-24 position-relative top-1 text-primary"></i>
            </Button>
          </Form.Group>
        </Form.Group> */}
      </Col>

      <Col lg={12}>
        <EmojiTextInput label="Message" type="textarea" />
      </Col>

      <Col lg={12}>
        <div className="d-flex justify-content-between align-items-center">
          {/* Left‐aligned text */}
          <label className="label text-secondary">Buttons</label>
          {/* Right‐aligned button */}
          <Button variant="primary">
            <i className="ri-add-line"></i> Add Button
          </Button>{" "}
        </div>
        <Card className="p-4 mt-3">
          <Card.Body>
            <>
              <div className="d-flex justify-content-between align-items-center">
                {/* Left‐aligned text */}
                <label className="label text-secondary">Button 1</label>
                {/* Right‐aligned button */}
                {/* Following button will use to delete the button */}
                <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                  <span className="material-symbols-outlined fs-16 text-danger">
                    delete
                  </span>
                </button>
              </div>
              <EmojiTextInput label="" type="text" placeholder="Button Title" />

              <Form.Group className="mb-4">
                <label className="label text-secondary">Destination Url</label>

                <Form.Group className="position-relative">
                  <Form.Control
                    type="text"
                    className="text-dark ps-5 h-55"
                    placeholder="Destination Url"
                  />
                  <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                  <span className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
                    <i className="ri-search-line fs-24 position-relative top-1 text-primary"></i>
                  </span>
                </Form.Group>
              </Form.Group>
            </>

            <>
              <div className="d-flex justify-content-between align-items-center">
                {/* Left‐aligned text */}
                <label className="label text-secondary">Button 2</label>
                {/* Right‐aligned button */}
                {/* Following button will use to delete the button */}
                <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                  <span className="material-symbols-outlined fs-16 text-danger">
                    delete
                  </span>
                </button>
              </div>
              <EmojiTextInput label="" type="text" placeholder="Button Title" />

              <Form.Group className="mb-4">
                <label className="label text-secondary">Destination Url</label>

                <Form.Group className="position-relative">
                  <Form.Control
                    type="text"
                    className="text-dark ps-5 h-55"
                    placeholder="Destination Url"
                  />
                  <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                  <span className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
                    <i className="ri-search-line fs-24 position-relative top-1 text-primary"></i>
                  </span>
                </Form.Group>
              </Form.Group>
            </>
            <>
              <div className="d-flex justify-content-between align-items-center">
                {/* Left‐aligned text */}
                <label className="label text-secondary">Button 3</label>
                {/* Right‐aligned button */}
                {/* Following button will use to delete the button */}
                <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                  <span className="material-symbols-outlined fs-16 text-danger">
                    delete
                  </span>
                </button>
              </div>
              <EmojiTextInput label="" type="text" placeholder="Button Title" />

              <Form.Group className="mb-4">
                <label className="label text-secondary">Destination Url</label>

                <Form.Group className="position-relative">
                  <Form.Control
                    type="text"
                    className="text-dark ps-5 h-55"
                    placeholder="Destination Url"
                  />
                  <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
                  <span className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
                    <i className="ri-search-line fs-24 position-relative top-1 text-primary"></i>
                  </span>
                </Form.Group>
              </Form.Group>
            </>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={12}>
        <Form.Group className="mb-4">
          <label className="label text-secondary">Public Reply</label>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Group className="position-relative">
              <Form.Select
                className="form-control ps-5 h-55"
                aria-label="Default select example"
              >
                <option value="0" className="text-dark">
                  Template 1
                </option>
                <option value="1" className="text-dark">
                  Another Template
                </option>
              </Form.Select>
              <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
            </Form.Group>
            <div className="d-flex align-items-center gap-1">
                          <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                            <span className="material-symbols-outlined fs-16 text-primary">
                              visibility
                            </span>
                          </button>

                          <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                            <span className="material-symbols-outlined fs-16 text-body">
                              edit
                            </span>
                          </button>

                          <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                            <span className="material-symbols-outlined fs-16 text-danger">
                              delete
                            </span>
                          </button>
                        </div>
          </div>
        </Form.Group>
      </Col>

      <Col lg={12}>
        <EmojiTextInput label="AI Post Description" type="textarea" />
      </Col>
      <Col lg={12}>
      
      <Form.Group className="mb-4">
    <label className="label text-secondary">Email Addresses</label>
    <div className="form-control d-flex flex-wrap align-items-center" style={{ minHeight: 55, maxHeight: 120, // Set your preferred max height
        overflowY: "auto", gap: 4,}}>
      {emails.map((email, idx) => (
        <span key={idx} className="badge bg-primary me-2 mb-1">
          {email}
          <button
            type="button"
            className="btn-close btn-close-white btn-sm ms-2"
            aria-label="Remove"
            style={{ fontSize: 10 }}
            onClick={() => handleRemoveEmail(idx)}
          />
        </span>
      ))}
      <input
        type="email"
        className="border-0 flex-grow-1"
        placeholder="Add email and press Enter"
        value={emailInput}
        onChange={e => setEmailInput(e.target.value)}
        onKeyDown={handleEmailKeyDown}
        style={{ minWidth: 150, outline: "none" }}
      />
    </div>
  </Form.Group>
        
      </Col>
      
        <Col lg={12} className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
            Crete InstaBot
          </button>
        </Col>

      {/* <Card className="p-4">
        <h3>InstaBot Custom Form</h3>
        <form>
          
          <div className="mb-3">
            <label htmlFor="keyword" className="form-label">
              Keyword
            </label>
            <input type="text" className="form-control" id="keyword" />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Card> */}
    </Container>
  );
};
export default InstaBotCustomForm;
