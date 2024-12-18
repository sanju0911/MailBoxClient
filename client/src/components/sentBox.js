import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SentBox = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const fetchSentMails = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You must be logged in to view sent emails.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/getSentMail",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setEmails(response.data);
      setUnreadCount(response.data.filter((email) => !email.read).length);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sent mails.");
    }
  };

  useEffect(() => {
    fetchSentMails();
  }, []);

  const toggleEmailBody = async (emailId) => {
    if (selectedEmail === emailId) {
      setSelectedEmail(null);
    } else {
      setSelectedEmail(emailId);
      try {
        const token = localStorage.getItem("authToken");
        await axios.put(
          `http://localhost:5000/api/markAsRead/${emailId}`,
          {},
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        setUnreadCount(unreadCount - 1);
      } catch (err) {
        console.error("Error marking email as read", err);
      }
    }
  };

  const handleCompose = () => {
    navigate("/home");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Sent Mails</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="p-4">
        <Button variant="primary" className="mb-3" onClick={handleCompose}>
          Compose
        </Button>
        <h5>Total Unread Mails: {unreadCount}</h5>
        {emails.length === 0 ? (
          <Alert variant="info">You have no sent mails.</Alert>
        ) : (
          <ListGroup variant="flush">
            {emails.map((email) => (
              <ListGroup.Item
                key={email._id}
                onClick={() => toggleEmailBody(email._id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: email.read ? "transparent" : "#f0f8ff",
                }}
              >
                {email.read ? null : (
                  <span style={{ color: "blue", marginRight: "10px" }}>•</span>
                )}
                <h5>{email.subject}</h5>
                <p>
                  <strong>To:</strong> {email.to}
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

export default SentBox;
