import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import raw from 'raw.macro';
import ReactMarkdown from 'react-markdown';
// import dayjs from 'dayjs';

const BlogDetail = () => {
  // uses babel to load contents of file
  const markdown = raw('../../data/blog/posts/tips.md');
  return (
    <ReactMarkdown
      source={markdown}
      escapeHtml={false}
    />
  );
};

// BlogDetail.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default BlogDetail;
