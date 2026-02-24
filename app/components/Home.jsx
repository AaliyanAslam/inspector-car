import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import VehicleReports from './VehicleReports'
import WhatWeDo from './WhatWeDo'
import StatsSection from './StatsSection'
import GlobalPresence from './GlobalPresence'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <VehicleReports/>
    <WhatWeDo/>
    <StatsSection/>
    <GlobalPresence/>
    </>
  )
}

export default Home