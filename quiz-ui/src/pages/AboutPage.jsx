import React from 'react';
import JumbotronComponent from '../components/JumbotronComponent';
import { Tab, Tabs } from 'react-bootstrap';

function AboutPage() {
  return (
    <>
      <JumbotronComponent backgroundImage={'./assets/banner-images/About_Banner.jpg'} pageName={"About"} />
      <div style={{ minHeight: '600px'}} className='p-3 p-lg-5 bg-light'>
        {/* Main container for About page content */}
        <div className='row'>
          <div className='col rounded pb-4'>
            <h4 className='mb-3'>About the App</h4>
            <p>
              Coders' Quiz is designed to help learners and new developers test and improve their coding skills through free, easy-to-take interactive quizzes. The platform provides multiple-choice questions on various programming topics, including but not limited to HTML, CSS, JavaScript, Java, Python, SQL, and more.
            </p>
            <p>
              Technically, the application is built with a React front end, with Bootstrap style classes added as needed. The back end is built with Java and Spring Boot. It uses a MySQL database to store and manage the questions. The back end supports API calls from the front end, which fetches the questions and presents them in a structured, device-responsive test environment layout, which we call the 'quiz environment' in our quiz app. We also curate the question bank that we present in this application.
            </p>
            <p>
              To break the monotony of coding topics, we also provide an option for users to play trivia on generic non-coding topics. These questions, however, are sourced from an external API (Open Trivia Database).
            </p>
            <p>
              For more information or to share your comments and feedback, please connect with us through our <a href="/contact" title="click to visit">contact page</a>, and we will get back to you as soon as possible.
            </p>
          </div>
        </div>
        
        <div className='row'>
          {/* Grid container for Meet the Team */}
          <div className='col col-12 col-lg-6 rounded order-last order-lg-first pe-2 pe-lg-4 d-flex flex-column justify-content-between'>
            <div>
            <h4 className='mb-3'>Meet the Quiz Coders</h4>
            <div className="team-member d-flex align-items-center mb-3">
              <img src="./assets/profile-images/Hector.jpg" className="rounded-circle mr-3" alt="Hector" width="100" height="100" />
              <div className='ps-3'>
                <p> <span className='me-2' style={{fontSize:'130%',fontWeight:'700'}}>Hector T.</span> GitHub: <a href="https://github.com/htrillo95">htrillo95</a></p>
                <p style={{marginTop:'-0.8rem'}}>Hector brings a nonchalant efficiency to solving backend challenges. Off the clock, he's out for a run, enjoying Philly sports, or thrifting for unique finds.</p>
              </div>
            </div>
            <div className="team-member d-flex align-items-center mb-3">
              <img src="./assets/profile-images/Molaleni.jpg" className="rounded-circle mr-3" alt="Molaleni" width="100" height="100" />
              <div className='ps-3'>
                <p> <span className='me-2' style={{fontSize:'130%',fontWeight:'700'}}>Molaleni M.</span> GitHub: <a href="https://github.com/molalenim">molalenim</a></p>
                <p style={{marginTop:'-0.8rem'}}>When Molaleni isn't being a Master of the Coderverse, specializing in both backend and frontend development, you'll find him immersed in the world of vintage cameras—some nearly a century old. He crafts seamless user experiences that blend code and creativity.</p>
              </div>
            </div>
            <div className="team-member d-flex align-items-center mb-3">
              <img src="./assets/profile-images/Niladri.jpg" className="rounded-circle mr-3" alt="Niladri" width="100" height="100" />
              <div className='ps-3'>
                <p> <span className='me-2' style={{fontSize:'130%',fontWeight:'700'}}>Niladri J.</span>GitHub: <a href="https://github.com/nil-sj">nil-sj</a></p>
                <p style={{marginTop:'-0.8rem'}}>Nil is a front-end enthusiast who crafts stunning and intuitive user interfaces. When he's not creating, he loves exploring the great outdoors for inspiration.</p>
              </div>
            </div>
            </div>
            <div>
              <img src="./assets/images/About-page-filler.png" alt="teamwork" className='img-fluid'/>
            </div>
          </div>
          {/* Grid container for How To Play */}
          <div className='col col-12 col-lg-6 rounded'>
            <h4 className='mb-3'>How to Play</h4>
            <Tabs defaultActiveKey="codingQuiz" border id="how-to-play-tabs" className="mb-3">
              <Tab eventKey="codingQuiz" title="Playing the Coding Quiz" className="text-dark px-2 pb-4 pb-lg-0">
                <p>Visit the home page, select a coding topic and the number of questions you want to attempt, and then submit the request.</p>
                <p>You will be redirected to the quiz environment page, where one question and four possible answers will be presented at a time. Select your answer by clicking on one of the answer choices.</p>
                <p>After selecting your answer, click the 'Save & Next' button to proceed.</p>
                <p>There is also a panel in the top left corner of the quiz environment that shows the current question number and provides buttons to navigate to the previous or next questions.</p>
                <p>Alternatively, you can navigate to any question from the question grid. Green indicates you have attempted the question, and yellow indicates you have marked or flagged it for review.</p>
                <p>The top right corner provides utility options: mark or unmark a question for review, toggle between dark and light modes, and listen to the question as the browser reads it aloud.</p>
                <p>The progress bar shows how much of the quiz you have completed.</p>
                <p>To help you keep track of time, there is a timer at the top that turns red when you have only one minute left of your allotted time (you get one minute per question, so for a 10-question quiz, the allotted time would be 10 minutes).</p>
                <p>When you have completed the quiz, you can submit it, or if you prefer not to continue, you can abort it at any time.</p>
              </Tab>
              <Tab eventKey="feedback" title="Getting Feedback" className="text-dark px-2 pb-4 pb-lg-0">
                <p>After submitting your quiz, you will be redirected to the feedback page.</p>
                <p>At the top of the feedback page, there is a summary table that shows the total number of questions and cumulative statistics for your overall quiz performance.</p>
                <p>Below the summary table, you can view a list of all the questions, your answers, feedback with appropriate labels, and the correct answers.</p>
                <p>You can download a PDF copy of your feedback by clicking the "Download PDF" button.</p>
                <p>You can also send an email to yourself to keep a copy of the feedback in your inbox. To do this, click the "Email Feedback" button, and in the modal that opens, enter your name and email address.</p>
                <p>Once you are done reviewing or storing your feedback, if you choose to play another quiz, visit the home page and start with your selections again.</p>
              </Tab>
              <Tab eventKey="trivia" title="Playing the Trivia" className="text-dark px-2 pb-4 pb-lg-0">
                <p>Alternatively, you can play trivia on non-coding topics. Simply visit the Trivia page and select a topic from the drop-down list.</p>
                <p>Five questions on your selected topic will be presented to you with possible answer options. Select the answers you believe are correct.</p>
                <p>Once you have selected all your answers, you can submit the trivia.</p>
                <p>The page will then display the list of questions again, this time showing your answer, the correct answer, and feedback on whether you were right or wrong for each question.</p>
                <p>A total score is also presented at the top of the feedback list.</p>
                <p>If you choose to play again, reselecting any trivia topic will provide you with a new set of five questions.</p>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;