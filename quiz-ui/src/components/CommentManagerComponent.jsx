import React, { useState, useEffect } from "react";
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

function CommentManagerComponent() {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editableComment, setEditableComment] = useState(null);

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
    setEditableComment({ ...comment });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableComment((prevComment) => ({
      ...prevComment,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/comments/${editableComment.id}`, editableComment, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setComments(comments.map(c => c.id === editableComment.id ? editableComment : c));
        setEditCommentId(null);
        setEditableComment(null);
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div>
      <h5>Review, Approve/Deny Comments below: </h5>
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
                <td className="text-wrap text-break">
                  {editCommentId === comment.id ? (
                    <input
                      type="text"
                      className="form-control"
                      name="authorName"
                      value={editableComment.authorName}
                      onChange={handleChange}
                    />
                  ) : (
                    comment.authorName
                  )}
                </td>
                <td className="text-wrap text-break">
                  {editCommentId === comment.id ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editableComment.email}
                      onChange={handleChange}
                    />
                  ) : (
                    comment.email
                  )}
                </td>
                <td className="text-wrap text-break" style={{ minWidth: "200px"}}>
                  {editCommentId === comment.id ? (
                    <input
                      type="text"
                      className="form-control"
                      name="content"
                      value={editableComment.content}
                      onChange={handleChange}
                    />
                  ) : (
                    comment.content
                  )}
                </td>
                <td className="text-wrap">
                  {editCommentId === comment.id ? (
                    <select
                      className="form-control"
                      name="status"
                      value={editableComment.status}
                      onChange={handleChange}
                    >
                      <option value="true">Approved</option>
                      <option value="false">Denied</option>
                    </select>
                  ) : (
                    comment.status ? "Approved" : "Denied"
                  )}
                </td>
                <td className="actions-column">
                  {editCommentId === comment.id ? (
                    <Button
                      className="btn btn-success"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-primary"
                      onClick={() => handleEdit(comment)}
                    >
                      <i className="fas fa-edit text-white text-center" style={{ minWidth: "20px"}}></i><span className="d-none d-lg-inline"> Edit</span>
                    </Button>
                  )}
                  <Button
                    className="btn btn-danger ms-lg-2 mt-2 mt-lg-0"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <i className="fas fa-trash-alt text-white text-center" style={{ minWidth: "20px"}}></i><span class="d-none d-lg-inline"> Delete</span>
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
