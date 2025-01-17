import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../useAxiosSecure/UseAxiosSecure';

const useArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [],refetch } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await axiosSecure.get('/articles')
      return res.data
    }
  })
  return [articles,refetch]
};

export default useArticles;