import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import dayjs from 'dayjs';

const BlogCell = ({ data }) => (
  <article className="post" id="projects">
    <div className="title">
      <h2 data-testid="heading">
        <Link to={`/detail/${data.title}`}>{data.title}</Link>
      </h2>
      <p>{data.desc}</p>
    </div>
  </article>
)

BlogCell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired
  }).isRequired
}

export default BlogCell
