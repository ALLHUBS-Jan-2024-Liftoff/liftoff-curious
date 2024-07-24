import React, { useState } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MdPowerSettingsNew } from 'react-icons/md';
import Accordion from 'react-bootstrap/Accordion';
import TopicManagerComponent from '../components/TopicManagerComponent';
import JumbotronComponent from '../components/JumbotronComponent';
import AddQuestionComponent from '../components/AddQuestionComponent';
import BrowseQuestionsComponent from '../components/BrowseQuestionsComponent';
import BulkAddQuestionsComponent from '../components/BulkAddQuestionsComponent';

function QuizMaster({ onLogout }) {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSelect = (eventKey) => {
    if (eventKey === '0') {
      setRefreshTrigger(prev => !prev);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Logout
    </Tooltip>
  );

  return (
    <>
      <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/3186F7/3186F7/png'} pageName={"Quiz Master"}/>
      <div className="p-lg-4" style={{ minHeight: '600px', backgroundColor: 'white'}} >
      <div className="bg-light rounded pt-3 pb-1 mb-4">
        <div className="row">
          <div className="col col-12 col-lg-11 pt-lg-1">
          <p className="text-center">Welcome, &lt;AdminName&gt;, to the Quizmaster Control!</p>
          </div>
          <div className="col col-12 col-lg-1">
          <p className="text-center text-lg-end"> 
            {/* <button onClick={onLogout}>Logout</button> */}
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <button onClick={onLogout} className="btn btn-outline-danger px-2 py-1 me-lg-3">
                <MdPowerSettingsNew size={18} /> {/* Using react-icons icon with size prop */}
              </button>
            </OverlayTrigger>
          </p>
          </div>
        </div>
      </div>
        <Accordion defaultActiveKey="0" onSelect={handleSelect}>
          <Accordion.Item eventKey="0">
            <Accordion.Header><h4>Browse Questions (View/Edit/Delete)</h4></Accordion.Header>
            <Accordion.Body>
              <BrowseQuestionsComponent refreshTrigger={refreshTrigger}/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><h4>Add A Question</h4></Accordion.Header>
            <Accordion.Body>
              <AddQuestionComponent/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><h4>Bulk Add Questions</h4></Accordion.Header>
            <Accordion.Body>
              <BulkAddQuestionsComponent/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header><h4>Manage Topics (CRUD) </h4></Accordion.Header>
            <Accordion.Body>
              <TopicManagerComponent/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header><h4>Manage Comments (CRUD) </h4></Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default QuizMaster;