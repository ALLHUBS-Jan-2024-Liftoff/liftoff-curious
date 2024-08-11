import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent';
import { useRouteError } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Error() {
    const error = useRouteError();
    const location = useLocation();
    
    // Logging the error for debugging
    console.error(error);
  
    return (
      <>
        <JumbotronComponent backgroundImage={'./assets/banner-images/Error_Banner.jpg'} pageName={""} />
        <div style={{ minHeight: '600px'}} className='p-3 p-lg-5 bg-light'>
          <div className='row'>
            <div className='col rounded pb-4'>
              <h4 className='mb-3'>Oops!</h4>
              <p>
                It seems that either some information is missing or something went wrong.
              </p>
              <p>
                <i>{`Error occurred at ${location.pathname}`}</i>
                &nbsp; | &nbsp;
                <i>{error?.statusText || error?.message || 'Error: not found!'}</i>
              </p>
              <p>
                Why don't you navigate back to our home page?
                <br/><br/>
                <a href="/" className="btn btn-success">Home Page</a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  

export default Error