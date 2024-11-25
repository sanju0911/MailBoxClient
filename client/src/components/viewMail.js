import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewMail = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const navigate = useNavigate();

  const fetchMails = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You must be logged in to view emails.");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/getmail", {
        headers: {
          "x-auth-token": token,
        },
      });

      setEmails(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch mails.");
    }
  };

  useEffect(() => {
    fetchMails();
  });

  const toggleEmailBody = (emailId) => {
    if (selectedEmail === emailId) {
      setSelectedEmail(null);
    } else {
      setSelectedEmail(emailId);
    }
  };

  const handleCompose = () => {
    navigate("/home");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Received Mails</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="p-4">
        <Button variant="primary" className="mb-3" onClick={handleCompose}>
          Compose
        </Button>

        {emails.length === 0 ? (
          <Alert variant="info">You have no received mails.</Alert>
        ) : (
          <ListGroup variant="flush">
            {emails.map((email) => (
              <ListGroup.Item
                key={email._id}
                onClick={() => toggleEmailBody(email._id)}
                style={{ cursor: "pointer" }}
              >
                <h5>{email.subject}</h5>
                <p>
                  <strong>From:</strong> {email.from}
                </p>

                {selectedEmail === email._id && (
                  <p>
                    <strong>Body:</strong> {email.body}
                  </p>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    </Container>
  );
};

export default ViewMail;
