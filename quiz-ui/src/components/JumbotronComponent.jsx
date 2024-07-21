import React from 'react'

function JumbotronComponent({ backgroundImage, pageName }) {

  const jumbotronStyle = {
    backgroundImage: `url(${backgroundImage})`,
    height: '330px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div className="jumbotron" style={jumbotronStyle}>
      <h1>{pageName}</h1>
    </div>
  )
}

export default JumbotronComponent