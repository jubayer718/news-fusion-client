import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';



const usePremiumArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { data: premiumData=[] } = useQuery({
    queryKey: ['premium'],
    queryFn:async () => {
      const res = await axiosSecure.get('/premiumArticles')
      return res.data
    }
  })
  return [premiumData]
};

export default usePremiumArticle;