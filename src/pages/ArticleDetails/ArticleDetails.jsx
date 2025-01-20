import { useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../useAxiosSecure/UseAxiosSecure";
import { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
// import useDetails from "../../Hooks/useDetails";

const ArticleDetails = () => {
  // const [details] = useDetails(id);
  // console.log(details);
  // const detailsData = useLoaderData();
   const { id } = useParams();
  // const { loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [article, setArticle] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchArticle = async () => {
      try {
        const res = await axiosSecure.get(`/articles/${id}`);
        if (isMounted) {
          setArticle(res.data);
        }

        await axiosSecure.put(`/articles/view/${id}`);
      } catch (error) {
        console.error("Error fetching article details:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchArticle();

    return () => {
      isMounted = false;
    };
  }, [id, axiosSecure]);

  if ( isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  return (
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4"> Title: {article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-auto mb-4" />
      <p className="text-lg mb-4">
        <strong>Publisher:</strong> {article.publisher}
      </p>
      <p className="text-gray-700"><strong>Description:</strong> {article.description}</p>
      <p className="mt-4 text-sm text-gray-500">
        <strong>Views:</strong> {article.viewCount}
      </p>
    </div>
  );
};

export default ArticleDetails;