import React from 'react'

import '../App.css';
import Navbar  from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import About from '../Components/About/About';
import Main from '../Components/Main/Main'
import Footer from '../Components/Footer/Footer'


const WelcomePage = () => {
  return (
    <div className='dashboard'>
        <Navbar/>
        <Home/>
      <About/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default WelcomePage