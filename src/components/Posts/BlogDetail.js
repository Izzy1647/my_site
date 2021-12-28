import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import raw from 'raw.macro';
import ReactMarkdown from 'react-markdown';
// import dayjs from 'dayjs';

// uses babel to load contents of file
const markdown = raw('../../data/blogs/tips.md');

const BlogDetail = () => {
  useEffect(() => {

  }, []);
  return (
    <ReactMarkdown
      source={markdown}
      escapeHtml={false}
    />
  );
};

BlogDetail.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogDetail;
