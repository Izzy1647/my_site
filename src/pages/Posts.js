import React from 'react';
// import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Blog from '../components/Posts/BlogCell';
import posts from '../data/blog/posts';

// import data from '../data/projects';

const Posts = () => (
  <Main
    title="Posts"
    description="My blog posts."
  >
    {posts.map((item) => (
      <Blog
        data={{
          title: item.title,
          // date: 'a',
          desc: 'as',
          // article: 'as',
        }}
      />
    ))}
  </Main>
);

export default Posts;
