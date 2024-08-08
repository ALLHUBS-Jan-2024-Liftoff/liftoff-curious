import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from '../context/AuthContext';

const ManageAdminProfileComponent = ({ username }) => {
  const { authenticated } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // To track message type

  useEffect(() => {
    if (authenticated) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/adminprofile/${username}`);
          const data = response.data;
          setProfile({
            name: data.name || "",
            email: data.email || "",
            password: "" // Do not prefill password
          });
          setLoading(false);
        } catch (err) {
          setMessage("Error fetching profile");
          setMessageType("danger"); // Set message type to danger
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setMessage("You need to be authenticated to view this page");
      setMessageType("danger"); // Set message type to danger
      setLoading(false);
    }
  }, [username, authenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { ...profile };
      if (!updatedProfile.password) {
        delete updatedProfile.password; // Remove password field if it is empty
      }
      //console.log("Updating profile with data: ", updatedProfile);
      await axios.put(`http://localhost:8080/adminprofile/${username}`, updatedProfile);
      setMessage("Profile updated successfully");
      setMessageType("success"); // Set message type to success
    } catch (err) {
      console.error("Error updating profile: ", err.response);
      setMessage("Error updating profile: "+err?.response?.status);
      setMessageType("danger"); // Set message type to danger
    }
  };

  if (loading) return <p>Loading...</p>;
  //if (message) return <p>{message}</p>;

  return (
    <div>
      <h5>Update your profile details below:</h5>
      {message && (
        <div className={`alert alert-${messageType}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password (optional)</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default ManageAdminProfileComponent;
