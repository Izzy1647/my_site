import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

// import Cell from '../components/Projects/Cell';
// import data from '../data/projects';

const Posts = () => (
  <Main
    title="Posts"
    description="My blog posts."
  >
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/posts">Posts</Link></h2>
          <p>Blogs I&apos;ve written.</p>
        </div>
      </header>
      {/* {data.map((project) => (
        <Cell
          data={project}
          key={project.title}
        />
      ))} */}
    </article>
  </Main>
);

export default Posts;
