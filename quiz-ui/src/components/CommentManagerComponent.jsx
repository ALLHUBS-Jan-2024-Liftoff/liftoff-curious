import React, { useState, useEffect } from "react";
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

function CommentManagerComponent() {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/comments/all");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/comments/${id}`);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== id)
        );   
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setUpdatedStatus(comment.status);
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value === "true");
  };

  const handleSave = async (comment) => {
    const updatedComment = {
      ...comment,
      status: updatedStatus,
    };
  
    try {
      const response = await axios.put(`http://localhost:8080/comments/${comment.id}`, updatedComment, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        setComments(comments.map(c => c.id === comment.id ? updatedComment : c));
        setEditCommentId(null);
      } else {
        console.error("Failed to update approval status");
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  return (
    <div>
      <h5>Review, Approve/Unapprove Comments below: </h5>
      {comments.length > 0 ? (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Author Name</th>
              <th>Email</th>
              <th>Content</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td className="text-wrap text-break">{comment.authorName}</td>
                <td className="text-wrap text-break">{comment.email}</td>
                <td className="text-wrap text-break">{comment.content}</td>
                <td className="text-wrap text-break">
                  {editCommentId === comment.id ? (
                    <select class="form-control" value={updatedStatus} onChange={handleStatusChange}>
                      <option value="true">Approved</option>
                      <option value="false">Not Approved</option>
                    </select>
                  ) : (
                    comment.status ? "Approved" : "Not Approved"
                  )}
                </td>
                <td>
                  {editCommentId === comment.id ? (
                    <Button 
                      className="btn btn-success"
                      onClick={() => handleSave(comment)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button 
                      className="btn btn-primary"
                      onClick={() => handleEdit(comment)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button 
                    className="btn btn-danger ms-lg-2 mt-2 mt-lg-0"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No comments to manage.</p>
      )}
    </div>
  );
}

export default CommentManagerComponent;