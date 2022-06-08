import React from 'react'
import Main from '../layouts/Main'
import Blog from '../components/Posts/BlogCell'
import posts from '../data/blog/posts'

const Posts = () => (
  <Main title="Posts" description="My blog posts.">
    {/* {posts.map(item => (
      <Blog
        data={{
          title: item.title,
          date: item.date,
          desc: item.desc
        }}
      />
    ))} */}
    My posts are now moved to a seperated site:{' '}
    <a href="https://blog-zhiyu-zhou.vercel.app/" target="_blank">👉CLICK HERE</a>
  </Main>
)

export default Posts
