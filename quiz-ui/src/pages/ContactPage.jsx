import React from "react";
import JumbotronComponent from "../components/JumbotronComponent";

function ContactPage() {
  return (
    <>
      <JumbotronComponent
        backgroundImage={"https://placehold.co/1600x400/008F67/008F67/png"}
        pageName={"Contact"}
      />
      <div style={{ minHeight: "600px", backgroundColor: "antiquewhite" }}>
      {/* Main container for contact page content */}
      <div className="row">
        <div className="col rounded pb-3">
          <h4>Contact Us</h4>
          <p>
            Get in touch with us
          </p>
        </div>
      </div>
      {/* Grid container for Contact */}
      <div className="row">
        <div className="col col-12 col-lg-6 rounded order-last order-lg-first">
          <h4>Have some feedback/Comments?</h4>
          <div className="team-member d-flex align-items-center mb-3">
            
            <div className="ps-3">
      Form
              
            </div>
          </div>
        </div>

        {/* Grid container for How to Play*/}
        <div className="col col-12 col-lg-6 rounded">
          <h4>Comment by - some name</h4>
          
        </div>
      </div>
      </div>
    </>
  );
}

export default ContactPage;


