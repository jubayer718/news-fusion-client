import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axiosPublic/UseAxiosPublic";


const useApprovedArticles = (filter, search,tags) => {
  const axiosPublic = useAxiosPublic();
  const { data: approvedArticles = [], refetch } = useQuery({
    queryKey: ['approvedData',filter,search,tags],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allArticle/approved?filter=${filter}&search=${search}&tags=${JSON.stringify(tags)}`)
      // console.log(res.data);
      return res.data
    }
  })
  return [approvedArticles,refetch]
};

export default useApprovedArticles;