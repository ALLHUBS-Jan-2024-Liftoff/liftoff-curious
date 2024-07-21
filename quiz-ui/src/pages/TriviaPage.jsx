import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent'

function TriviaPage() {
  return (
    <>
    <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/6F7F6F/6F7F6F/png'} pageName={'Trivia'}/>
    <div style={{ minHeight: '600px', backgroundColor: 'antiquewhite'}} />
    </>
  )
}

export default TriviaPage