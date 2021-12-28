import React from 'react';
// import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Blog from '../components/Posts/Blog';

// import data from '../data/projects';

const Posts = () => (
  <Main
    title="Posts"
    description="My blog posts."
  >
    <Blog
      data={{
        title: '1',
        date: 'a',
        desc: 'as',
        article: 'as',
      }}
    />
  </Main>
);

export default Posts;
