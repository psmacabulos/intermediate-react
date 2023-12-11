import { useState } from 'react'
import usePost from './hooks/usePost'

const PostList = () => {
  const pageSize = 10
  const [page, setPage] = useState<number>(1)
  const { data, error, isLoading, isPlaceholderData } = usePost({ page, pageSize })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) return <p>{error.message}</p>

  return (
    <>
      <ul className='list-group'>
        {data?.map(post => (
          <li key={post.id} className='list-group-item'>
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page == 1}
        className='btn btn-primary mt-2'
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <button className='btn btn-primary ms-1 mt-2' onClick={() => setPage(page + 1)}>
        Next
      </button>
    </>
  )
}

export default PostList
