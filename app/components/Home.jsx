import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import VehicleReports from './VehicleReports'
import WhatWeDo from './WhatWeDo'
import StatsSection from './StatsSection'
import GlobalPresence from './GlobalPresence'
import OurTeam from './OurTeam'
import TestimonialSection from './TestimonialSection'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <VehicleReports/>
    <WhatWeDo/>
    <StatsSection/>
    <GlobalPresence/>
    <OurTeam/>
    <TestimonialSection/>
    </>
  )
}

export default Home