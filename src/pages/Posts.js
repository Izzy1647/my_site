import React from 'react'
import dayjs from 'dayjs'
import Main from '../layouts/Main'
import Blog from '../components/Posts/BlogCell'
import posts from '../data/blog/posts'

const Posts = () => (
  <Main title="Posts" description="My blog posts.">
    {posts
      .sort((a, b) => {
        dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
      })
      .map(item => (
        <Blog
          data={{
            title: item.title,
            date: item.date,
            desc: item.desc
          }}
        />
      ))}
  </Main>
)

export default Posts
