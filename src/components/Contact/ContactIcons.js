import React from 'react'
import data from '../../data/contact'

const ContactIcons = () => (
  <ul className="icons">
    {data.map(s => {
      return (
        <li key={s.label}>
          <a href={s.link} target={'_blank'}>
            {s.icon}
          </a>
        </li>
      )
    })}
  </ul>
)

export default ContactIcons
