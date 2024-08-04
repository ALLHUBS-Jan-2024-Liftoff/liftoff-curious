import React, { useState, useEffect } from "react";

function CommentManagerComponent() {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:8080/comments/all");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/comments/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        console.error("Failed to delete comment");
      }
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
      const response = await fetch(`http://localhost:8080/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });
      if (response.ok) {
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
      <h4>Manage Comments</h4>
      {comments.length > 0 ? (
        <table className="table">
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
                <td>{comment.authorName}</td>
                <td>{comment.email}</td>
                <td>{comment.content}</td>
                <td>
                  {editCommentId === comment.id ? (
                    <select value={updatedStatus} onChange={handleStatusChange}>
                      <option value="true">Approved</option>
                      <option value="false">Not Approved</option>
                    </select>
                  ) : (
                    comment.status ? "Approved" : "Not Approved"
                  )}
                </td>
                <td>
                  {editCommentId === comment.id ? (
                    <button 
                      className="btn btn-success"
                      onClick={() => handleSave(comment)}
                    >
                      Save
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleEdit(comment)}
                    >
                      Edit
                    </button>
                  )}
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No comments to manage.</p>
      )}
    </div>
  );
}

export default CommentManagerComponent;