import React from 'react'
import { Link } from 'react-router-dom'

import Hamburger from './Hamburger'
import routes from '../../data/routes'

// Websites Navbar, displays routes defined in 'src/data/routes'
const Navigation = () => (
  <header id="header">
    <h1 className="index-link">
      {routes
        .filter(l => l.index)
        .map(l => (
          <Link key={l.label} to={l.path}>
            {l.label}
          </Link>
        ))}
    </h1>
    <nav className="links">
      <ul>
        {routes
          .filter(l => !l.index)
          .map(l => (
            <li key={l.label}>
              {l.newTab ? (
                <a
                  target={'_blank'}
                  rel="noopener noreferrer"
                  href="https://blog-zhiyu-zhou.vercel.app/"
                >
                  {l.label}
                </a>
              ) : (
                <Link to={l.path}>{l.label}</Link>
              )}
            </li>
          ))}
      </ul>
    </nav>
    <Hamburger />
  </header>
)

export default Navigation
