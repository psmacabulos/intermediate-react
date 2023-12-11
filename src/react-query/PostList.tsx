import { useState } from 'react'
import usePost from './hooks/usePost'
import React from 'react'

const PostList = () => {
  const pageSize = 10
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = usePost({
    pageSize,
  })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) return <p>{error.message}</p>

  return (
    <>
      {data?.pageParams}
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          <ul className='list-group'>
            {page.map(post => (
              <li key={post.id} className='list-group-item'>
                {post.title}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}

      <button
        disabled={isFetchingNextPage}
        className='btn btn-primary ms-1 mt-2'
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? 'Loading' : 'LoadMore'}
      </button>
    </>
  )
}

export default PostList
