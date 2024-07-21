import React from 'react'
import HomeCarousel from '../components/HomeCarousel'

function HomePage() {
  return (
    <div className="home">
        <HomeCarousel/>
        <div style={{ minHeight: '600px', backgroundColor: 'antiquewhite'}} />
    </div>
  )
}

export default HomePage