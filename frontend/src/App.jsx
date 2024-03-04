import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { About } from './components/About'
import {Users} from './components/Users'
import {Navbar} from './components/Navbar'
import { LoginButton } from './components/Auth'




export function App() {
  return (


    
    <Router>
      <LoginButton/>
      <Navbar/>
      <div className='container p-2'>
        <Routes>
          <Route path="/About"Component={About} />
          <Route path="/"Component={Users} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App

