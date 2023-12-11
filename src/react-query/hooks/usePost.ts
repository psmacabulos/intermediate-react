import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PostQuery {
  page: number
  pageSize: number
}

const usePost = (query: PostQuery) =>
  useQuery<Post[], Error>({
    queryKey: ['users', query],
    queryFn: () =>
      axios
        .get<Post[]>(`https://jsonplaceholder.typicode.com/posts/`, {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then(res => res.data),
    placeholderData: keepPreviousData,
  })

export default usePost
