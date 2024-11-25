import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkTokenValidity = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    const now = Date.now();

    return now < expiry;
  };

  useEffect(() => {
    if (!checkTokenValidity()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, body: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { to, subject, body } = formData;

    if (!to || !subject || !body) {
      setError("All fields are mandatory.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You must be logged in to send an email.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/sendmail",
        {
          to,
          subject,
          body,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setSuccess("Mail sent successfully!");
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send mail.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center">Send an Email</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="email"
              name="to"
              placeholder="Recipient's email"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <ReactQuill
              theme="snow"
              value={formData.body}
              onChange={handleQuillChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Send
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Home;
