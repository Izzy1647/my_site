import React from 'react'
import { Link } from 'react-router-dom'

import Main from '../layouts/Main'
// import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons'

const Contact = () => (
  <Main title="Contact" description="Contact Zhiyu">
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2 data-testid="heading">
            <Link to="/contact">Contact</Link>
          </h2>
        </div>
      </header>
      <div className="email-at">
        {/* <p>My phone number: +44 7902405064 </p> */}
        Email me at: <a href="mailto:zhouhoushu@126.com">zhouhoushu@126.com</a>
        <p>Or with any icon down there ⬇️</p>
      </div>
      <ContactIcons />
    </article>
  </Main>
)

export default Contact
