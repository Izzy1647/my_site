import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';

const Blog = ({ data }) => (
  <article className="post" id="projects">
    <div className="title">
      <h2 data-testid="heading">
        <Link to="/posts">{data.title}</Link>
      </h2>
      <p>{data.desc}</p>
      <div>
        <Link to={`/detail?title=${data.title}`}>Read more</Link>
      </div>
    </div>
  </article>
);

Blog.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
