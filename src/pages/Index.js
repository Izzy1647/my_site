import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={"Michael D'Angelo's personal website. New York based Stanford ICME graduate, "
    + 'co-founder and CTO of Arthena, and YC Alumni.'}
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/">About this site</Link></h2>
          <p>Great source by <a target="_blank" rel="noreferrer" href="https://github.com/mldangelo/personal-site">MICHAEL D&apos;ANGELO</a>👏</p>
        </div>
      </header>
      <p>
        I intend to build a site where my resume and blogs and projects can be displayed.
      </p>
      <p>
        This begins at 2021/08/15⌚️.
      </p>
      {/* <p> Welcome to my website. Please
        feel free to read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link>, {' '}
        <Link to="/projects">projects</Link>, {' '}
        view <Link to="/stats">site statistics</Link>, {' '}
        or <Link to="/contact">contact</Link> me.
      </p> */}
      {/* <p> Source available <a href="https://github.com/mldangelo/personal-site">here</a>.</p> */}
    </article>
  </Main>
);

export default Index;
