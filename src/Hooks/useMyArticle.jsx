import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/UseAxiosSecure";
import UseAuth from "./UseAuth";


const useMyArticle = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=UseAuth()
  const { data: myArticles = [] } = useQuery({
    queryKey: ['article'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myArticles/${user.email}`);
      return res.data
    }
  })
  return [myArticles]
};

export default useMyArticle;