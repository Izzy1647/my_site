import React from 'react';
import { useParams } from 'react-router-dom';
import Main from '../layouts/Main';
import BlogDetail from '../components/Posts/BlogDetail';

const Detail = () => {
  const { title } = useParams();
  return (
    <Main
      title="Article"
      description="Read blog"
    >
      <BlogDetail title={title} />
    </Main>
  );
};

export default Detail;
