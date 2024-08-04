import React, { useState, useEffect } from "react";
import JumbotronComponent from "../components/JumbotronComponent";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchApprovedComments();
  }, []);

  const fetchApprovedComments = async () => {
    try {
      const response = await fetch("http://localhost:8080/comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { content, authorName: name, email };

    try {
      const response = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (response.ok) {
        setName("");
        setEmail("");
        setContent("");
        fetchApprovedComments();
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <JumbotronComponent
        backgroundImage={"https://placehold.co/1600x400/008F67/008F67/png"}
        pageName={"Contact"}
      />
      <div style={{ minHeight: "600px", backgroundColor: "antiquewhite" }}>
        <div className="row">
          <div className="col rounded pb-3">
            <h4>Contact Us</h4>
            <p>
              We'd Love to Hear From You!<br/>
              Whether you have a question, feedback, or simply want to share your thoughts, our team is here to listen. Your input is invaluable in helping us improve and provide the best possible service.
            </p>
            <p>
              <strong>General Inquiries:</strong> For any general questions or comments, feel free to drop us a message. We'll get back to you as soon as possible.<br/>
              <strong>Technical Support:</strong> Experiencing any issues with our service? Our support team is ready to assist you with any technical difficulties or concerns you might have.<br/>
              <strong>Feedback and Suggestions:</strong> Have ideas on how we can improve? We appreciate your suggestions and are always looking for ways to enhance our offerings.<br/>
              <strong>Partnership Opportunities:</strong> Interested in collaborating with us? Let's explore how we can work together to achieve great things.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-lg-6 rounded order-last order-lg-first">
            <h4>Have some feedback/Comments?</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-4 col-form-label">Your Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-4 col-form-label">Your Email</label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="content" className="col-sm-4 col-form-label">Comments</label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    id="content"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your comments"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-8 offset-sm-4">
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col col-12 col-lg-6 rounded">
            <h4>Approved Comments</h4>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-3">
                  <h5>{comment.authorName}</h5>
                  <p>{comment.content}</p>
                  {/* <small>{comment.email}</small> */}
                </div>
              ))
            ) : (
              <p>No approved comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;