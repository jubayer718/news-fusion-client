import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axiosPublic/UseAxiosPublic";
import useAxiosSecure from "../useAxiosSecure/UseAxiosSecure";


const usePublisher = () => {
  const axiosSecure = useAxiosSecure();
  const {refetch, data:publisher=[] } = useQuery({
    queryKey: ['publisher'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/publisher')

      const uniquePublisher = Array.from(
        new Map(data.map((item)=>[item.publisher,item])).values()
      )
     return uniquePublisher
    }
  
  })
  return [publisher,refetch]
};

export default usePublisher;