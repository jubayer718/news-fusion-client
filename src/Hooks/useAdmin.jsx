import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';
import UseAuth from './UseAuth';

const useAdmin = () => {
  const axiosSecure = useAxiosSecure()
  const {user}=UseAuth()
  const { data: isAdmin,isPending:isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin
    }
  
  })
  return [isAdmin,isAdminLoading]
};

export default useAdmin;