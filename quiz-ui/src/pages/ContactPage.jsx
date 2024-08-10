import React, { useState, useEffect } from "react";
import JumbotronComponent from "../components/JumbotronComponent";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null); // New state for submission status

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

  const truncateEmail = (inputEmail, numChars = 3) => {
    let resultEmail = "";
    let firstPart = "";
    let secondPart = "";
    let textLength = inputEmail.length;
    let indexOfSymbol = inputEmail.indexOf('@');
    secondPart = inputEmail.slice(indexOfSymbol, textLength);
    firstPart = inputEmail.slice(0, indexOfSymbol);
    let maskedFirstPart = firstPart.slice(0,numChars);
    maskedFirstPart = maskedFirstPart.concat("***");
    resultEmail = maskedFirstPart.concat(secondPart);
    return resultEmail;
  }

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
        setSubmissionStatus("success"); // Set submission status to success
        fetchApprovedComments();
      } else {
        setSubmissionStatus("failure"); // Set submission status to failure
        console.error("Failed to submit comment");
      }
    } catch (error) {
      setSubmissionStatus("failure"); // Set submission status to failure
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <JumbotronComponent
        backgroundImage={"./assets/banner-images/Contact_Banner.jpg"}
        pageName={"Contact"}
      />
      <div style={{ minHeight: "600px" }} className="p-3 p-lg-5 bg-light">
        <div className="row">
          <div className="col rounded pb-4">
            <h4 className="mb-4">We'd Love to Hear From You!</h4>
            <p>
                Whether you have a question, feedback, or simply want to share your thoughts, our team is here to listen. Your input is invaluable in helping us improve and provide the best possible service. Don't hesitate to connect with us for any of the following reasons:
            </p>
            <ul>
                <li><strong>General Inquiries:</strong> For any general questions or comments, feel free to drop us a message. We'll get back to you as soon as possible.</li>
                <li><strong>Technical Support:</strong> Experiencing any issues with our service? Our support team is ready to assist you with any technical difficulties or concerns you might have.</li>
                <li><strong>Feedback and Suggestions:</strong> Have ideas on how we can improve? We appreciate your suggestions and are always looking for ways to enhance our offerings.</li>
                <li><strong>Partnership Opportunities:</strong> Interested in collaborating with us? Let's explore how we can work together to achieve great things.</li>
            </ul>
            <p>
                Please fill out the contact form below. Curated comments or words of appreciation will be published after review. We will also address any concerns you may have. Alternatively, you can send an email to us at <a href="mailto:quizcoders@gmail.com?subject=Coders%20Quiz%20Web%20Application" title="Send an email to us">quizcoders@gmail.com</a> for a faster response.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-lg-6 pe-lg-5 d-flex flex-column justify-content-between">
            <div>
            <h4 className="mb-4">Have Some Feedback/Comments?</h4>
            {submissionStatus === "success" && (
              <div className="alert alert-success" role="alert">
                Your comment has been submitted successfully!<br/>We will review it soon, and may decide to publish it too. 
              </div>
            )}
            {submissionStatus === "failure" && (
              <div className="alert alert-danger" role="alert">
                Failed to submit your comment. Please try again later.
              </div>
            )}
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
            {comments.length >= 5 ? (
            <div className="d-none d-lg-block">
              <img src="./assets/images/Contact-Page-Filler.png" alt="Words of Appreciation" title="Thank you all for the comments and feedback" className="img-fluid" style={{ maxWidth: '300px'}}/>
            </div>) : (<div style={{ lineHeight: '0px', fontSize: '0px'}}>&nbsp;</div>)}
          </div>
          <div className="col col-12 col-lg-6 rounded pb-4">
            <h4 className="mb-4">What Others Said</h4>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-3 border rounded p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
                  <h6>Message from: {comment.authorName} ({truncateEmail(comment.email, 3)})</h6>
                  <p>{comment.content}</p>
                  {/* <small>{comment.email}</small> */}
                </div>
              ))
            ) : (
              <div className="text-center border rounded">
              <img src='./assets/images/messages-list-filler.png' alt="New messages will come"/>
              <p>Check this space out for published comments.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;