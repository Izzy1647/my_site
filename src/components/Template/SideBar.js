import React from 'react'
import { Link } from 'react-router-dom'

import ContactIcons from '../Contact/ContactIcons'

const { PUBLIC_URL } = process.env // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/projects/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Zhiyu Zhou</h2>
        {/* <p>+44 7902405064</p> */}
        <p>
          <a href="mailto:zhouhoushu@126.com">zhouhoushu@126.com</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Zhiyu. I am a{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.cs.manchester.ac.uk/"
        >
          University of Manchester (ACS: Software Engineering)
        </a>{' '}
        and{' '}
        <a target="_blank" rel="noreferrer" href="https://cs.shu.edu.cn/">
          {' '}
          Shanghai University (Computer Science)
        </a>{' '}
        graduate; a current <a href="https://www.huawei.com/en/">Huawei</a> software engineer, and once the co-founder of Genial(unfortunately shut down
        already). Before Genial I was at{' '}
        <a href="https://www.qiniu.com/">Qiniu Ltd.</a>,{' '}and{' '}
        <a target="_blank" rel="noreferrer" href="https://www.stec.net/">
          STEC
        </a>
        .
      </p>
      {/* <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume')
            ? <Link to="/resume" className="button">Learn More</Link>
            : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul> */}
    </section>

    <section id="footer">
      <ContactIcons />
    </section>
  </section>
)

export default SideBar
