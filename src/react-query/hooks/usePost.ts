import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PostQuery {
  userId: number | undefined
}
const usePost = (userId: number | undefined) =>
  useQuery<Post[], Error>({
    queryKey: userId ? ['users', userId, 'posts'] : ['posts'],
    queryFn: () =>
      axios
        .get<Post[]>(`https://jsonplaceholder.typicode.com/posts/`, { params: { userId } })
        .then(res => res.data),
    staleTime: 60 * 1000,
  })

export default usePost
