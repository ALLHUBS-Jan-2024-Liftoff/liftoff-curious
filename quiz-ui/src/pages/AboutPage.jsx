import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent'

function AboutPage() {
  return (
    <>
    <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/650067/650067/png'} pageName={"About"}/>
    <div style={{ minHeight: '600px'}} className='p-3 p-lg-5 bg-light' > 
    {/* Main container for About page content */}
    <div className='row'>
      <div className='col border'>
        <h4>About the App</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    {/* Grid container for Team and How to Play sections */}
    <div className='row'>
      <div className='col col-12 col-lg-6 border order-last order-lg-first'>
        <h4>Meet the Team</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      <div className='col col-12 col-lg-6 border'>
        <h4>How to Play</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    
    </div>
    </>
  )
}

export default AboutPage