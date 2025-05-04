import { useEffect, useState } from "react";
import NewsCard from "../../shared/newCard/NewsCard";
import useAxiosPublic from "../../axiosPublic/UseAxiosPublic";
import { Link } from "react-router-dom";



const RecentNews = () => {
  const [hotNews, setHotNews] = useState([]);
  const axiosPublic=useAxiosPublic()
  useEffect(() => {
    // fetch("http://localhost:9000/news/recent")
    //     .then(res => res.json())
    //     .then(data => setHotNews(data));
    const faceData = async () => {
      try {
        const { data } = await axiosPublic.get('/news/recent');
        setHotNews(data.slice(0,4))
      } catch (error) {
        console.log(error);
      }
    }
    faceData()
}, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {
          hotNews.map(news =>
            <NewsCard
              key={news._id}
              id={news?._id}
       title={news?.title}
        image={ news?.image}
              description={news?.description}
              

      ></NewsCard>)
        }
      </div>

     <div className="flex items-center justify-center mt-5"><Link to={'/allArticle'}><button className="btn btn-lg">See All news</button></Link></div>

    </div>
  );
};

export default RecentNews;