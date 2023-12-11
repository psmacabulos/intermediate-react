import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PostQuery {
  pageSize: number
}

const usePost = (query: PostQuery) => {
  return useInfiniteQuery<Post[]>({
    queryKey: ['posts'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      axios
        .get<Post[]>(`https://jsonplaceholder.typicode.com/posts/`, {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then(res => res.data),
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  })
}

export default usePost
