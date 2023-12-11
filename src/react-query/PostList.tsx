import { useState } from 'react'
import usePost from './hooks/usePost'

const PostList = () => {
  const [userId, setUserId] = useState<number>()
  const { data, error, isLoading } = usePost(userId)

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) return <p>{error.message}</p>

  return (
    <>
      <select value={userId} className='form-select' onChange={e => setUserId(+e.target.value)}>
        <option value=''></option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
      <ul className='list-group'>
        {data?.map(post => (
          <li key={post.id} className='list-group-item'>
            {post.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostList
