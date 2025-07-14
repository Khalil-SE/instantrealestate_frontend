

import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../../store/useAuth";
import axiosInstance from "../../../services/axiosInstance";


const ContactUs = () => {

    const { user } = useAuth();


  const [formData, setFormData] = useState({
    // fullName: "",
    // email: "",
    // phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResponseMessage("");

  try {
    const response = await axiosInstance.post("/system/contact-us/", {
      subject: formData.subject,
      message: formData.message,
    });
    toast.success(response.detail || "Message sent successfully!");
    setResponseMessage(" Message sent successfully!");
    setFormData({ subject: "", message: "" });
  } catch (err) {
    toast.error("Failed to send message. Try again later.");
    setResponseMessage(" Failed to send message. Try again later.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="shadow-sm bg-white border-0 rounded-4 mb-4 pt-4 pb-4">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="contact-us-img mb-4 mb-lg-0">
              <img
                src="/images/landing/contact-us.jpg"
                alt="contact-us"
                width={1084}
                height={1444}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="contact-us-form ms-xl-4">
              <span className="top-title">
                <span>Contact Us</span>
              </span>

              <h2>
                Introducing Our Exceptional Team. Meet the Minds Driving Our
                Success
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Full Name</label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={user?.first_name + " " + user?.last_name}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Your full name"
                    disabled={true}
                    required
                  />
                </Form.Group>

                {/* <Form.Group className="mb-4">
                  <label className="label text-secondary">Email Address</label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Your email address"
                    required
                  />
                </Form.Group> */}

                {/* <Form.Group className="mb-4">
                  <label className="label text-secondary">Phone Number</label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Your phone number"
                    required
                  />
                </Form.Group> */}

                {/* <Form.Group className="mb-4">
                  <label className="label text-secondary">Subject</label>
                  <Form.Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control bg-transparent h-55"
                    required
                  >
                    <option value="">Select your subject</option>
                    <option value="Help Desk">Help Desk</option>
                    <option value="LMS">LMS</option>
                    <option value="CRM">CRM</option>
                  </Form.Select>
                </Form.Group> */}

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Subject</label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Enter subject"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control bg-transparent"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </Form.Group>

                {responseMessage && (
                  <div className="mb-3 text-secondary">{responseMessage}</div>
                )}

                <Form.Group className="mb-0">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 px-4 w-100 d-flex align-items-center justify-content-center gap-1"
                    disabled={loading}
                  >
                    <i
                      className={`ri-refresh-line fs-18 text-white ${
                        loading ? "spin-animation" : ""
                      }`}
                    ></i>
                    <span>{loading ? "Sending..." : "Send"}</span>
                  </button>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
