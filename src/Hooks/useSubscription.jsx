import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/UseAxiosSecure";
import UseAuth from "./UseAuth";


const useSubscription = () => {
 const {user}=UseAuth()
  const axiosSecure=useAxiosSecure()
  const { data: hasSubscription=[],refetch } = useQuery({
    queryKey: ['hasSubscription'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      const isPremiumUser = res.data.find(item => item.email===user.email)
      return isPremiumUser
    }
  })
  return [ hasSubscription,refetch ]
};

export default useSubscription ;