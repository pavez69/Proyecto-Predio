import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/img/logo.png'


export const Navbar = () => (
  
  <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <img  className="logo bg-dark"  src={logo} alt="logoUniversidad" />
        <Link className="navbar-brand" to="/">Predio</Link>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">Nosotros</Link>
            </li>
          </ul>
        </div>
      </nav>
)