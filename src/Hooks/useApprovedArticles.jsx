import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axiosPublic/UseAxiosPublic";


const useApprovedArticles = (filter, search) => {
  console.log(search);
  const axiosPublic = useAxiosPublic();
  const { data: approvedArticles = [], refetch } = useQuery({
    queryKey: ['approvedData',filter,search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allArticle/approved?filter=${filter}&search=${search}`)
      console.log(res.data);
      return res.data
    }
  })
  return [approvedArticles,refetch]
};

export default useApprovedArticles;