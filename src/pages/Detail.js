import React from 'react';
import Main from '../layouts/Main';
import BlogDetail from '../components/Posts/BlogDetail';

const Detail = () => (
  <Main
    title="Blog detail"
    description="Read blog"
  >
    <BlogDetail title="2020年的第一场雪" />
  </Main>
);

export default Detail;
