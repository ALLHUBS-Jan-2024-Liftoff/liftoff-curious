import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent'

function AboutPage() {
  return (
    <>
    <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/650067/650067/png'} pageName={"About"}/>
    <div style={{ minHeight: '600px', backgroundColor: 'antiquewhite'}} />
    </>
  )
}

export default AboutPage