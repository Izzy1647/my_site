import React from 'react'
import { Link } from 'react-router-dom'

import Main from '../layouts/Main'

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/">About this site</Link>
          </h2>
          <p>
            Adapted from{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/mldangelo/personal-site"
            >
              MICHAEL D&apos;ANGELO
            </a>{' '}
            &apos;s website. 🤙
          </p>
        </div>
      </header>
      {/* <p>
        I intend to build a site where my resume and blogs and projects can be displayed.
      </p>
      <p>
        This begins at 2021/08/15⌚️.
      </p> */}
      <p>
        {' '}
        For now this website contains my <Link to="/resume">resume</Link>; some
        snapshots of my <Link to="/projects">projects</Link>; some of my{' '}
        <Link to="/posts">posts</Link>; and my{' '}
        <Link to="/contact">contact details</Link> .
      </p>
      {/* <p> Source available <a href="https://github.com/mldangelo/personal-site">here</a>.</p> */}
    </article>
  </Main>
)

export default Index
