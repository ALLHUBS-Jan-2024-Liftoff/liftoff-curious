import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MdPowerSettingsNew } from 'react-icons/md';
import Accordion from 'react-bootstrap/Accordion';
import TopicManagerComponent from '../components/TopicManagerComponent';
import JumbotronComponent from '../components/JumbotronComponent';
import AddQuestionComponent from '../components/AddQuestionComponent';
import BrowseQuestionsComponent from '../components/BrowseQuestionsComponent';
import BulkAddQuestionsComponent from '../components/BulkAddQuestionsComponent';
import CommentManagerComponent from '../components/CommentManagerComponent';
import AuthContext from '../context/AuthContext';
import ManageAdminProfileComponent from '../components/ManageAdminProfileComponent';

function QuizMaster() {
  const { authenticated, username, logout } = useContext(AuthContext);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated, navigate]);

  const handleSelect = (eventKey) => {
    if (eventKey === '1') {
      setRefreshTrigger((prev) => !prev);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Logout
    </Tooltip>
  );

  return (
    <>
      <JumbotronComponent backgroundImage={'./assets/banner-images/Admin_Banner.jpg'} pageName={"Quiz Master"} />
      <div className="p-1 p-lg-4" style={{ minHeight: '600px', backgroundColor: 'white' }}>
        <div className="bg-light rounded pt-3 pb-1 mb-4">
          <div className="row">
            <div className="col col-12 col-lg-11 pt-lg-1">
              <p className="text-center">Welcome, {username}, to the Quizmaster Control!</p>
            </div>
            <div className="col col-12 col-lg-1">
              <p className="text-center text-lg-end">
                <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                  <button onClick={logout} className="btn btn-outline-danger px-2 py-1 me-lg-3">
                    <MdPowerSettingsNew size={18} />
                  </button>
                </OverlayTrigger>
              </p>
            </div>
          </div>
        </div>
        <Accordion defaultActiveKey="1" onSelect={handleSelect}>
        <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h4>Manage My Admin Profile</h4>
            </Accordion.Header>
            <Accordion.Body className="p-1 p-lg-4">
              <ManageAdminProfileComponent username={username}/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h4>Browse Questions (View/Edit/Delete)</h4>
            </Accordion.Header>
            <Accordion.Body className="p-1 p-lg-4">
              <BrowseQuestionsComponent refreshTrigger={refreshTrigger} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h4>Add A Question</h4>
            </Accordion.Header>
            <Accordion.Body>
              <AddQuestionComponent />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h4>Bulk Add Questions</h4>
            </Accordion.Header>
            <Accordion.Body>
              <BulkAddQuestionsComponent />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h4>Manage Topics (CRUD)</h4>
            </Accordion.Header>
            <Accordion.Body>
              <TopicManagerComponent />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <h4>Manage Comments (View/Edit/Delete)</h4>
            </Accordion.Header>
            <Accordion.Body>
              <CommentManagerComponent/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default QuizMaster;
