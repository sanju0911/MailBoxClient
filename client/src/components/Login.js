import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are mandatory.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      setSuccess("User has successfully logged in.");
      navigate("/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="p-4"
        style={{
          width: "350px",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Login
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100 mt-3">
            Submit
          </Button>
        </Form>
        <div className="text-center mt-3">
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Don't have an account? Sign Up
          </a>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
