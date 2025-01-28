import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';

const useArticles = (currentPage,usersPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [],refetch } = useQuery({
    queryKey: ['articles',currentPage,usersPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles?page=${currentPage}&size=${usersPerPage}`)
      return res.data
    }
  })
  return [articles,refetch]
};

export default useArticles;