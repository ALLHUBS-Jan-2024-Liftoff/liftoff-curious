import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent'

import nilImage from '../profilephotos/Nil.jpeg';
import hectorImage from '../profilephotos/hector.jpeg';
import molaleniImage from '../profilephotos/Molaleni.jpeg';


function AboutPage() {
  return (
    <>
    <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/650067/650067/png'} pageName={"About"}/>
    <div style={{ minHeight: '600px'}} className='p-3 p-lg-5 bg-light' > 
    {/* Main container for About page content */}
    <div className='row'>
      <div className='col rounded pb-3'>
        <h4>About the App</h4>
        <p>Coders’ Quiz is designed to help users test and improve their coding skills through interactive quizzes. The platform focuses on HTML, CSS, and JavaScript, offering a practical way to learn and get immediate feedback.
Our goal is to make learning more engaging and effective by providing instant feedback on quiz answers, allowing users to quickly identify their strengths and areas for improvement. Whether you’re honing your web development skills or preparing for exams and interviews, Coders’ Quiz offers a fun and interactive way to enhance your knowledge.
Plus, Coders’ Quiz is free for everyone, making it an accessible resource for anyone looking to boost their coding abilities.</p>
      </div>
    </div>
    {/* Grid container for Meet the Team */}
    <div className='row'>
      <div className='col col-12 col-lg-6 rounded order-last order-lg-first'>
        <h4>Meet the Quiz Coders</h4>
                            <div className="team-member d-flex align-items-center mb-3">
                                <img src={hectorImage} className="rounded-circle mr-3" alt="Photo of Hector" width="100" height="100" />
                                <div className='ps-3'>

                                    <p> <span className='me-2' style={{fontSize:'130%',fontWeight:'700'}}>Hector</span> GitHub: <a href="https://github.com/htrillo95">htrillo95</a></p>
                                    <p style={{marginTop:'-0.8rem'}}>Hector brings a nonchalant efficiency to solving backend challenges. Off the clock, he’s out for a run, enjoying Philly sports, or thrifting for unique finds.</p>
                                </div>
                            </div>
                            <div className="team-member d-flex align-items-center mb-3">
                                <img src={molaleniImage} className="rounded-circle mr-3" alt="Photo of Molaleni" width="100" height="100" />
                                <div className='ps-3'>
                                   
                                    <p> <span className='me-2' style={{fontSize:'130%',fontWeight:'700'}}>Molaleni</span> GitHub: <a href="https://github.com/molalenim">molalenim</a></p>
                                    <p style={{marginTop:'-0.8rem'}}>When Molaleni isn’t being a Master of the Coderverse, specializing in both backend and frontend development, you’ll find him immersed in the world of vintage cameras—some nearly a century old. He crafts seamless user experiences that blend code and creativity.</p>
                                </div>
                            </div>
                            <div className="team-member d-flex align-items-center mb-3">
                                <img src={nilImage} className="rounded-circle mr-3" alt="Photo of Niladri" width="100" height="100" />
                                <div className='ps-3'>
                                   
                                    <p> <span className='me-2' style={{fontSize:'130%',fontWeight:'700'}}>Niladri</span>GitHub: <a href="https://github.com/nil-sj">nil-sj</a></p>
                                    <p style={{marginTop:'-0.8rem'}}>Nil is a front-end enthusiast who crafts stunning and intuitive user interfaces. When he's not creating, he loves exploring the great outdoors for inspiration.</p>
                                </div>
                            </div>
                        </div>

    {/* Grid container for How to Play*/}
      <div className='col col-12 col-lg-6 rounded'>
        <h4>How to Play</h4>
        <p>1. Choose a quiz from the available categories—HTML, CSS, or JavaScript. </p>
                            <p>2. Answer the questions to the best of your ability. </p>
                            <p>3. Submit your quiz to receive immediate feedback on your answers.</p>
                            <p>4. Review your results to understand your strengths and areas for improvement.</p>
                            <p>5. Retake quizzes to track your progress and improve your skills.</p>
                            <p>Enjoy a fun and interactive learning experience while enhancing your coding skills with Coders' Quiz.</p>
        </div>
    </div>
    
    </div>
    </>
  )
}

export default AboutPage