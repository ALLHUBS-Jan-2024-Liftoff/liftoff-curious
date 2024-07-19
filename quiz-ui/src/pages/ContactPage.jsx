import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent'

function ContactPage() {
  return (
    <>
    <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/008F67/008F67/png'} pageName={"Contact"}/>
    <div style={{ minHeight: '600px', backgroundColor: 'antiquewhite'}} />
    </>
  )
}

export default ContactPage