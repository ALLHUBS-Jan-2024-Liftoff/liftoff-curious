import React from 'react'
import JumbotronComponent from '../components/JumbotronComponent'

function AdminPage() {
  return (
    <>
    <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/65679A/65679A/png'} pageName={"Admin"}/>
    <div style={{ minHeight: '600px', backgroundColor: 'antiquewhite'}} />
    </>
  )
}

export default AdminPage