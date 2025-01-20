// import React from 'react';
// import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import UseAuth from './UseAuth';

// const useDetails = (id) => {
//   const axiosSecure = useAxiosSecure();
//   const {loading}=UseAuth()
//   const { data:details,isPending } = useQuery({
//     queryKey: ['details'],
//     isPending:loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/articles/${id}`);
//       return res.data
//     }
//   })
//   return [ details ]
// };

// export default useDetails;