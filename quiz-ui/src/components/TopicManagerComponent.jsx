import React, { useState, useEffect, useContext } from 'react';
import { getAllTopics, getTopicById, createTopic, updateTopic, deleteTopic } from '../services/topicService';
import AuthContext from '../context/AuthContext';

function TopicManagerComponent() {
  const { authenticated } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [newTopicName, setNewTopicName] = useState('');
  const [editTopicId, setEditTopicId] = useState(null);
  const [editTopicName, setEditTopicName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authenticated) {
      fetchTopics();
    }
  }, [authenticated]);

  const fetchTopics = async () => {
    try {
      const topicsList = await getAllTopics();
      setTopics(topicsList);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleAddTopic = async () => {
    if (!authenticated) {
      setErrorMessage('Please log in to add topics.');
      return;
    }
    try {
      const newTopic = await createTopic(newTopicName);
      setTopics([...topics, newTopic]);
      setNewTopicName('');
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  const handleEditTopic = async (topicId) => {
    try {
      const topic = await getTopicById(topicId);
      setEditTopicId(topicId);
      setEditTopicName(topic.name);
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  const handleUpdateTopic = async () => {
    try {
      const updatedTopic = await updateTopic(editTopicId, { name: editTopicName });
      setTopics(topics.map(topic => topic.id === editTopicId ? updatedTopic : topic));
      setEditTopicId(null);
      setEditTopicName('');
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleDeleteTopic = async (topicId) => {
    const confirmed = window.confirm("Are you sure you want to delete this topic?");
    if (confirmed) {
      try {
        await deleteTopic(topicId);
        setTopics(topics.filter(topic => topic.id !== topicId));
        setErrorMessage('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage('Cannot delete topic. There are questions linked to this topic.');
        } else {
          console.error('Error deleting topic:', error);
        }
      }
    }
  };

  if (!authenticated) {
    return <p>Please log in to manage topics.</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <h5>List of Topics</h5>
        <div className="table-responsive w-auto mx-auto">
          <table className="table table-striped w-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Topic Name</th>
                <th scope="col">Topic ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic, index) => (
                <tr key={topic.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{topic.name}</td>
                  <td>{topic.id}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditTopic(topic.id)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTopic(topic.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-2">
            {errorMessage}
          </div>
        )}
        {editTopicId && (
          <div className="mt-2">
            <h5>Edit Topic</h5>
            <div className="row mb-3">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={editTopicName}
                  onChange={(e) => setEditTopicName(e.target.value)}
                  placeholder="Topic name"
                />
              </div>
              <div className="col-md-2 pt-3 pt-md-0">
                <button className="btn btn-primary" onClick={handleUpdateTopic}>Edit Topic</button>
              </div>
              <div className="col-auto"></div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h5>Add A New Topic</h5>
        <div className="row mb-3">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control mw250"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="Topic name"
            />
          </div>
          <div className="col-md-2 pt-3 pt-md-0">
            <button className="btn btn-primary" onClick={handleAddTopic}>Add Topic</button>
          </div>
          <div className="col-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default TopicManagerComponent;
